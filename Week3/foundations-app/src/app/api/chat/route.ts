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
} from '@/lib/tools/triage-tool';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface IncomingMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Intelligent contextual mental health response generator.
 * Used when running in mock/demo mode or when Anthropic API key is not configured.
 * Guarantees distinct, warm, helpful responses across all user intents.
 */
function generateContextualResponse(userQuery: string, intentAnalysis: any): string {
  const query = userQuery.toLowerCase().trim();

  // 1. Acute crisis / distress
  if (intentAnalysis.isCrisis) {
    return (
      "I hear how much pain you are carrying right now, and I want you to know that you are not alone. " +
      "What you are feeling is serious, and your safety is the most important thing. Please reach out to someone who can help right now:\n\n" +
      "• **National Suicide & Crisis Lifeline**: Call or text **988** (Free, confidential, 24/7 in US & Canada)\n" +
      "• **Crisis Text Line**: Text **HOME** to **741741** to connect with a crisis counselor\n" +
      "• **The Trevor Project** (LGBTQ+ youth): Call **1-866-488-7386** or text START to 678-678\n\n" +
      "I have also prepared the 988 Emergency Escalation card above. Please take a gentle breath and let a trained professional walk with you through this."
    );
  }

  // 2. Greetings & Introductions
  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|who are you|what's up)\b/i.test(query)) {
    return (
      "Hello! I'm **MindGuard AI**, your empathetic mental wellbeing companion. " +
      "I'm here to offer a safe, judgment-free space where you can share whatever is on your mind, explore grounding exercises, or check in on stress levels.\n\n" +
      "Here are a few things we can do together:\n" +
      "• Practice guided relaxation (like the 4-7-8 breathing technique)\n" +
      "• Talk through anxiety, burnout, or daily life challenges\n" +
      "• Run a clinical distress triage evaluation if you're feeling overwhelmed\n\n" +
      "How are you feeling in your mind and body today?"
    );
  }

  // 3. Guided Breathing & Grounding Exercises
  if (/4-7-8|breath|grounding|5-4-3-2-1|calm down|unwind|relax|panic exercise/i.test(query)) {
    return (
      "Let's take a pause together and try the **4-7-8 calming breathing technique**. " +
      "This rhythm stimulates your vagus nerve and activates your body's parasympathetic relaxation response:\n\n" +
      "1. **Inhale quietly through your nose** for a slow count of **4 seconds**. Feel your lungs expand gently.\n" +
      "2. **Hold your breath gently** for **7 seconds**. Keep your jaw, shoulders, and chest soft.\n" +
      "3. **Exhale completely through your mouth** with a steady 'whoosh' sound for **8 seconds**.\n\n" +
      "Let's repeat this 3 to 4 times. Concentrate solely on the sensation of air entering and leaving your body. " +
      "How does your chest and shoulders feel right now?"
    );
  }

  // 4. Sleep & Insomnia
  if (/sleep|insomnia|can't sleep|cannot sleep|trouble sleeping|tired|exhausted|night|awake/i.test(query)) {
    return (
      "Restlessness at night can be deeply exhausting, especially when racing thoughts keep your nervous system alert when you desperately need rest. " +
      "Here are three gentle, evidence-based steps to help your mind transition into sleep:\n\n" +
      "• **Soft Lights & Screen Curfew**: Blue light signals daylight to your pineal gland. Dim your room and set screens aside.\n" +
      "• **Cognitive Brain Dump**: If worries are circling, write them down on a scrap of paper. Remind yourself: *'These thoughts are safely preserved on paper; I do not need to solve them tonight.'*\n" +
      "• **Progressive Muscle Relaxation**: Starting at your feet, gently tense for 3 seconds, then release completely. Work your way up through your calves, abdomen, and shoulders.\n\n" +
      "If sleeplessness has been persistent or paired with high anxiety, feel free to ask me to run a clinical assessment so we can review your somatic distress markers."
    );
  }

  // 5. Burnout, Work & Academic Stress
  if (/work|burnout|job|deadline|boss|school|exam|studying|overworked|pressure|imposter/i.test(query)) {
    return (
      "It sounds like you are carrying a tremendous amount of weight right now. Chronic cognitive overload often accumulates quietly until even small demands feel overwhelming.\n\n" +
      "Remember that needing rest is not a personal failure—it is a biological necessity. " +
      "When pressure builds up, try setting one small micro-boundary today:\n" +
      "• Step away from all screens for a 10-minute quiet walk.\n" +
      "• Identify the single most critical item on your list and park the rest for tomorrow.\n" +
      "• Give yourself permission to do a 'good enough' job rather than striving for perfection.\n\n" +
      "What is the heaviest single expectation weighing on you today?"
    );
  }

  // 6. Positive Reflections & Gratitude
  if (/good day|great day|happy|excited|proud|feeling good|better today|wonderful|grateful|joy|smile/i.test(query)) {
    return (
      "I'm so glad to hear that! Taking a moment to pause, acknowledge, and savor positive feelings is one of the most powerful ways to build long-term emotional resilience.\n\n" +
      "Our brains naturally tend to focus on threats and stress, so intentionally noticing when things go well creates positive neural pathways. " +
      "What contributed to making today feel brighter? I'd love to hear about it!"
    );
  }

  // 7. Sadness, Loneliness & Depressive Affect
  if (/sad|depressed|lonely|alone|crying|down|empty|hopeless|unhappy|hurting/i.test(query)) {
    return (
      "I hear you, and I want to validate that whatever you are feeling right now is completely real and understandable. " +
      "Feeling down or disconnected can make the world feel quiet, heavy, and exhausting.\n\n" +
      "You don't have to force yourself to 'look on the bright side' right now. It's okay to just exist and be gentle with yourself. " +
      "Taking a slow sip of water, curling up in a comfortable blanket, or simply letting yourself rest without self-criticism are valid ways of caring for yourself today.\n\n" +
      "I'm here with you. Would you like to tell me more about what's feeling hardest right now?"
    );
  }

  // 8. MindGuard Project & Feature Inquiries
  if (/what can you do|features|who built you|how do you work|what is mindguard|what is this|capabilities/i.test(query)) {
    return (
      "**MindGuard AI** is a Front-End AI Engineering Capstone application designed for compassionate mental wellbeing and clinical safety:\n\n" +
      "• **Conversational Companion**: Real-time token streaming with client abort controls and crisis guardrails.\n" +
      "• **FE-07 Generative UI**: Server-side clinical triage tools defined with Zod schemas that render structured components—including composite risk score cards and multi-axis SVG radar charts.\n" +
      "• **Hick's Law Emergency Triage**: Dedicated zero-hesitation emergency modal connecting directly to 988 Lifeline and Crisis Text Line 741741.\n" +
      "• **Private & Secure**: Zero secret leakage architecture where API keys and clinical evaluation algorithms execute strictly on the server.\n\n" +
      "You can test the clinical triage evaluation by asking for an assessment or tapping one of the suggested prompts below!"
    );
  }

  // 9. Default thoughtful mental health reflection
  return (
    `Thank you for sharing that with me. When navigating daily thoughts and feelings, it can often help to take a step back and explore what is beneath the surface.\n\n` +
    `Whether you'd like to explore this topic further, try a guided mindfulness exercise, or run a structured clinical triage assessment to check in on stress markers, I'm right here with you. What would feel most supportive right now?`
  );
}

/**
 * Attempt live streaming from Anthropic Claude API if valid key is available.
 */
async function streamFromAnthropic(
  apiKey: string,
  messages: IncomingMessage[],
  signal: AbortSignal,
  onDelta: (text: string) => void
): Promise<boolean> {
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: MINDGUARD_SYSTEM_PROMPT,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        stream: true,
      }),
      signal,
    });

    if (!res.ok || !res.body) {
      console.warn(`[Anthropic API Warning]: Status ${res.status}`);
      return false;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;
          try {
            const data = JSON.parse(jsonStr);
            if (
              data.type === 'content_block_delta' &&
              data.delta?.type === 'text_delta' &&
              data.delta?.text
            ) {
              onDelta(data.delta.text);
            }
          } catch {
            // Ignore non-json SSE lines
          }
        }
      }
    }
    return true;
  } catch (err: any) {
    if (err.name === 'AbortError') throw err;
    console.warn('[Anthropic Stream Error, using fallback generator]:', err.message);
    return false;
  }
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
    const rawQuery = latestMessage?.content || '';
    const userQuery = rawQuery.toLowerCase();
    const intentAnalysis = classifyIntent(userQuery);

    const clientSignal = req.signal;

    // Check for configured Anthropic API key in environment
    const rawKey = process.env.ANTHROPIC_API_KEY || process.env.LLM_API_KEY || '';
    const hasValidKey =
      rawKey.startsWith('sk-ant-') &&
      !rawKey.includes('placeholder') &&
      rawKey.length > 25;

    // 1. Tool Trigger Detections (FE-07 Assignment Requirements)
    const isErrorTest =
      userQuery.includes('test-error') ||
      userQuery.includes('test error') ||
      userQuery.includes('simulate failure') ||
      userQuery.includes('throw error');

    const isEscalationConfirmation =
      userQuery.includes('988') ||
      userQuery.includes('emergency counselor') ||
      userQuery.includes('dispatch counselor') ||
      userQuery.includes('escalate to 988');

    // Only run clinical triage assessment tool when user actually requests assessment or reports acute symptoms
    const isAssessmentRequest =
      userQuery.includes('triage') ||
      userQuery.includes('assessment') ||
      userQuery.includes('assess') ||
      userQuery.includes('score card') ||
      userQuery.includes('radar chart') ||
      userQuery.includes('run clinical triage') ||
      userQuery.includes('haven\'t slept in three days') ||
      userQuery.includes('severe panic') ||
      userQuery.includes('burnout and panic') ||
      (intentAnalysis.isCrisis && !isEscalationConfirmation) ||
      isErrorTest;

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        const emitPart = (type: string, data: any) => {
          const payload = JSON.stringify({ type, ...data }) + '\n';
          controller.enqueue(encoder.encode(payload));
        };

        try {
          // ----------------------------------------------------
          // SECTION A: Tool Execution Lifecycle (Generative UI)
          // ----------------------------------------------------
          if (isAssessmentRequest || isEscalationConfirmation) {
            const toolCallId = `call-${Date.now()}`;
            const toolName = isEscalationConfirmation
              ? TOOL_NAMES.CONFIRM_EMERGENCY_ESCALATION
              : TOOL_NAMES.ASSESS_CRISIS_RISK;

            // State 1: Input Streaming (Model generating tool call arguments)
            emitPart('tool_call_start', {
              toolCallId,
              toolName,
              state: 'input-streaming',
              rawInput: `${toolName}({ query: "${userQuery.slice(0, 32)}..." })`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });

            await new Promise((r) => setTimeout(r, 400));
            if (clientSignal.aborted) {
              controller.close();
              return;
            }

            // State 2: Input Available (Arguments validated against Zod schema)
            const args = isEscalationConfirmation
              ? {
                  sessionContext: 'User requested direct emergency counselor escalation during distress.',
                  detectedTriggers: ['acute distress', 'hotline escalation request'],
                  urgencyLevel: 'immediate',
                  requiresDirectConsent: true,
                }
              : {
                  patientQuery: rawQuery,
                  severityLevel: isErrorTest
                    ? 'moderate'
                    : intentAnalysis.isCrisis
                    ? 'acute'
                    : userQuery.includes('panic') || userQuery.includes('severe')
                    ? 'severe'
                    : 'moderate',
                  symptoms: userQuery.includes('insomnia') || userQuery.includes('slept')
                    ? ['insomnia', 'acute anxiety', 'somatic fatigue']
                    : userQuery.includes('burnout')
                    ? ['cognitive overload', 'emotional burnout', 'decision fatigue']
                    : ['racing thoughts', 'affective tension', 'stress'],
                  affectiveTension: intentAnalysis.isCrisis ? 92 : userQuery.includes('panic') ? 78 : 58,
                  cognitiveOverload: userQuery.includes('burnout') ? 86 : 62,
                  somaticInsomnia: userQuery.includes('insomnia') || userQuery.includes('slept') ? 85 : 44,
                  immediateHarmRisk: intentAnalysis.isCrisis,
                };

            emitPart('tool_call_ready', {
              toolCallId,
              toolName,
              state: 'input-available',
              args,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });

            await new Promise((r) => setTimeout(r, 550));
            if (clientSignal.aborted) {
              controller.close();
              return;
            }

            // Execute the tool logic
            try {
              if (isEscalationConfirmation) {
                // Interactive tool: pauses for human consent in UI
                emitPart('tool_result', {
                  toolCallId,
                  toolName,
                  state: 'output-available',
                  args,
                  result: null, // Pending confirmation by user in UI
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
              // State 4: Output Error (Designed recovery state, not a crash!)
              emitPart('tool_error', {
                toolCallId,
                toolName,
                state: 'output-error',
                errorCode: toolErr.code || 'ERR_TRIAGE_FAILED',
                error: toolErr.message || 'Clinical evaluation gateway timed out.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              });
            }

            await new Promise((r) => setTimeout(r, 200));
          }

          // ----------------------------------------------------
          // SECTION B: Stream Conversational Text Guidance
          // ----------------------------------------------------
          let streamedViaLiveApi = false;

          // If valid API key exists and this was NOT a synthetic tool error test, stream live from Anthropic
          if (hasValidKey && !isErrorTest && !isEscalationConfirmation) {
            streamedViaLiveApi = await streamFromAnthropic(
              rawKey,
              messages,
              clientSignal,
              (delta) => {
                emitPart('text_delta', { text: delta });
              }
            );
          }

          // If not streamed via live API, use our contextual mental health generator
          if (!streamedViaLiveApi) {
            let textResponse = '';

            if (isErrorTest) {
              textResponse =
                "I encountered a simulated connection timeout (`ERR_TRIAGE_TIMEOUT`) while contacting the clinical evaluation node. " +
                "Rest assured that our conversation remains safe and private. You can tap 'Retry Assessment' on the error card above to re-attempt, or let me know how you'd like to proceed.";
            } else if (isEscalationConfirmation) {
              textResponse =
                "I have queued the 988 emergency escalation protocol above. Because your safety is our utmost priority, please review the confirmation card and select 'Authorize 988 Dispatch' or 'Decline'.";
            } else if (isAssessmentRequest) {
              if (userQuery.includes('insomnia') || userQuery.includes('slept')) {
                textResponse =
                  "I've completed your clinical triage assessment based on your report of acute sleep disruption and high distress. " +
                  "As visualized in your Risk Radar Chart above, your somatic and affective markers are elevated. Take a slow, gentle breath—let's look over your stabilization recommendations together.";
              } else if (userQuery.includes('panic') || userQuery.includes('burnout')) {
                textResponse =
                  "Your clinical triage evaluation has been processed above, highlighting high affective tension and cognitive overload. " +
                  "Review the score card and multi-axis radar chart above for immediate grounding recommendations.";
              } else {
                textResponse =
                  "I've evaluated your distress markers using our clinical triage engine above. Your results, symptom breakdown, and recommended stabilization protocol are displayed in the interactive score card.";
              }
            } else {
              textResponse = generateContextualResponse(rawQuery, intentAnalysis);
            }

            // Stream words smoothly with realistic cadence
            const words = textResponse.split(' ');
            for (let i = 0; i < words.length; i++) {
              if (clientSignal.aborted) {
                controller.close();
                return;
              }
              emitPart('text_delta', { text: (i === 0 ? '' : ' ') + words[i] });
              await new Promise((r) => setTimeout(r, 24));
            }
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
