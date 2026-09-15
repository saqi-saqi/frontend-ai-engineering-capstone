import { NextRequest, NextResponse } from 'next/server';
import {
  MINDGUARD_SYSTEM_PROMPT,
  CLAUDE_MODEL_CONFIG,
  classifyIntent,
} from '@/lib/ai-config';
import {
  TOOL_NAMES,
  executeTriageAssessment,
  executeEmergencyEscalation,
} from '../../tools/triage-tool';
import { ToolPart } from '../../types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface IncomingMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: IncomingMessage[] } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: messages array is required.' },
        { status: 400 }
      );
    }

    const latestMessage = messages[messages.length - 1];
    const userQuery = (latestMessage?.content || '').toLowerCase();
    const intentAnalysis = classifyIntent(userQuery);

    const clientSignal = req.signal;

    // Determine whether this prompt triggers a server tool call
    const isErrorTest = userQuery.includes('test-error') || userQuery.includes('test error') || userQuery.includes('fail');
    const isEscalationConfirmation = userQuery.includes('988') || userQuery.includes('emergency counselor') || userQuery.includes('dispatch');
    const isAssessmentRequest =
      userQuery.includes('triage') ||
      userQuery.includes('assessment') ||
      userQuery.includes('assess') ||
      userQuery.includes('panic') ||
      userQuery.includes('burnout') ||
      userQuery.includes('overwhelmed') ||
      intentAnalysis.isCrisis ||
      isErrorTest;

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        const emitPart = (type: string, data: any) => {
          const payload = JSON.stringify({ type, ...data }) + '\n';
          controller.enqueue(encoder.encode(payload));
        };

        try {
          // 1. If tool is triggered, emit the 4 lifecycle states
          if (isAssessmentRequest || isEscalationConfirmation) {
            const toolCallId = `call-${Date.now()}`;
            const toolName = isEscalationConfirmation
              ? TOOL_NAMES.CONFIRM_EMERGENCY_ESCALATION
              : TOOL_NAMES.ASSESS_CRISIS_RISK;

            // State 1: Input Streaming
            // Simulates model generating the tool call parameters token by token
            emitPart('tool_call_start', {
              toolCallId,
              toolName,
              state: 'input-streaming',
              rawInput: `${toolName}({ query: "${userQuery.slice(0, 35)}..." })`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });

            await new Promise((r) => setTimeout(r, 450));
            if (clientSignal.aborted) {
              controller.close();
              return;
            }

            // State 2: Input Available
            // Completed parameters parsed and validated against Zod schema
            const args = isEscalationConfirmation
              ? {
                  sessionContext: 'User requested direct emergency counselor escalation during distress.',
                  detectedTriggers: ['acute distress', 'hotline escalation request'],
                  urgencyLevel: 'immediate',
                  requiresDirectConsent: true,
                }
              : {
                  patientQuery: userQuery,
                  severityLevel: isErrorTest
                    ? 'moderate'
                    : intentAnalysis.isCrisis
                    ? 'acute'
                    : userQuery.includes('panic')
                    ? 'severe'
                    : 'moderate',
                  symptoms: userQuery.includes('insomnia')
                    ? ['insomnia', 'panic', 'emotional exhaustion']
                    : ['racing thoughts', 'anxiety', 'decision paralysis'],
                  affectiveTension: intentAnalysis.isCrisis ? 92 : userQuery.includes('panic') ? 78 : 55,
                  cognitiveOverload: userQuery.includes('burnout') ? 85 : 64,
                  somaticInsomnia: userQuery.includes('insomnia') ? 88 : 42,
                  immediateHarmRisk: intentAnalysis.isCrisis,
                };

            emitPart('tool_call_ready', {
              toolCallId,
              toolName,
              state: 'input-available',
              args,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });

            await new Promise((r) => setTimeout(r, 600));
            if (clientSignal.aborted) {
              controller.close();
              return;
            }

            // Execute the tool logic
            try {
              if (isEscalationConfirmation) {
                // For confirmation tool, present confirmation state (output-available with prompt)
                emitPart('tool_result', {
                  toolCallId,
                  toolName,
                  state: 'output-available',
                  args,
                  result: null, // pending user confirmation
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                });
              } else {
                const result = await executeTriageAssessment(args);

                // State 3: Output Available (Success -> Generative UI Component)
                emitPart('tool_result', {
                  toolCallId,
                  toolName,
                  state: 'output-available',
                  args,
                  result,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                });
              }
            } catch (toolErr: any) {
              // State 4: Output Error (Designed error state, not a crash!)
              emitPart('tool_error', {
                toolCallId,
                toolName,
                state: 'output-error',
                errorCode: toolErr.code || 'ERR_TRIAGE_FAILED',
                error: toolErr.message || 'Clinical evaluation gateway timed out.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              });
            }

            await new Promise((r) => setTimeout(r, 300));
          }

          // 2. Stream Conversational Text Guidance alongside tool parts
          let textResponse = '';
          if (isErrorTest) {
            textResponse =
              "I encountered an interruption while reaching the clinical evaluation node, but please rest assured that our conversation remains safe and private. You can tap 'Retry' above or let me know how I can best support you right now.";
          } else if (isEscalationConfirmation) {
            textResponse =
              "I have queued the 988 emergency escalation protocol. Please review the confirmation prompt above so we can connect you immediately with a confidential counselor.";
          } else if (intentAnalysis.isCrisis) {
            textResponse =
              "I hear how much pain you are carrying. I have generated your immediate clinical triage profile above, highlighting direct, confidential crisis resources. You do not have to walk through this alone.";
          } else {
            textResponse =
              "I've evaluated your distress markers using our clinical triage engine above. Your results and recommended stabilization protocol are displayed in the interactive score card.";
          }

          const words = textResponse.split(' ');
          for (let i = 0; i < words.length; i++) {
            if (clientSignal.aborted) {
              controller.close();
              return;
            }
            emitPart('text_delta', { text: (i === 0 ? '' : ' ') + words[i] });
            await new Promise((r) => setTimeout(r, 28));
          }

          controller.close();
        } catch (streamErr: any) {
          if (streamErr.name !== 'AbortError') {
            controller.error(streamErr);
          }
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'application/x-ndjson; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-MindGuard-Tools-Enabled': 'true',
      },
    });
  } catch (error: any) {
    console.error('[Route Handler Error]:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
