import { NextRequest, NextResponse } from 'next/server';
import {
  TOOL_NAMES,
  executeTriageAssessment,
  executeEmergencyEscalation,
} from '../../tools/triage-tool';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface IncomingMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MINDGUARD_SYSTEM_PROMPT = `You are MindGuard AI, an empathetic, supportive conversational companion designed to help users navigate daily stress, emotional challenges, and mental wellbeing in a safe, judgment-free space.
If a user expresses acute suicidal thoughts, self-harm, or severe distress, prioritize immediate human safety with 988 Lifeline and Crisis Text Line 741741.`;

function generateContextualResponse(userQuery: string): string {
  const query = userQuery.toLowerCase().trim();

  // 1. Acute crisis
  if (/suicid|kill myself|end my life|want to die|hurt myself|self-harm/i.test(query)) {
    return (
      "I hear how much pain you are carrying right now, and I want you to know that you are not alone. " +
      "What you are feeling is serious, and your safety is the most important thing. Please reach out to someone who can help right now:\n\n" +
      "• **National Suicide & Crisis Lifeline**: Call or text **988** (Free, confidential, 24/7 in US & Canada)\n" +
      "• **Crisis Text Line**: Text **HOME** to **741741**\n" +
      "• **The Trevor Project** (LGBTQ+ youth): Call **1-866-488-7386**\n\n" +
      "I have also prepared the 988 Emergency Escalation card above. Please take a gentle breath and let a trained professional walk with you through this."
    );
  }

  // 2. Greetings
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

  // 3. Guided Breathing
  if (/4-7-8|breath|grounding|5-4-3-2-1|calm down|unwind|relax|panic exercise/i.test(query)) {
    return (
      "Let's take a pause together and try the **4-7-8 calming breathing technique**. " +
      "This rhythm stimulates your vagus nerve and activates your body's parasympathetic relaxation response:\n\n" +
      "1. **Inhale quietly through your nose** for a slow count of **4 seconds**.\n" +
      "2. **Hold your breath gently** for **7 seconds**.\n" +
      "3. **Exhale completely through your mouth** with a steady 'whoosh' sound for **8 seconds**.\n\n" +
      "Let's repeat this 3 to 4 times. Concentrate solely on the sensation of air entering and leaving your body."
    );
  }

  // 4. Sleep & Insomnia
  if (/sleep|insomnia|can't sleep|cannot sleep|trouble sleeping|tired|exhausted|night|awake/i.test(query)) {
    return (
      "Restlessness at night can be deeply exhausting, especially when racing thoughts keep your nervous system alert.\n\n" +
      "• **Soft Lights & Screen Curfew**: Dim your room and set screens aside.\n" +
      "• **Cognitive Brain Dump**: Write down circling worries on paper.\n" +
      "• **Progressive Muscle Relaxation**: Tense for 3 seconds, then release, working up from feet to face.\n\n" +
      "If sleeplessness has been persistent or paired with high anxiety, feel free to ask me to run a clinical assessment so we can review your somatic distress markers."
    );
  }

  // 5. Burnout & Stress
  if (/work|burnout|job|deadline|boss|school|exam|studying|overworked|pressure/i.test(query)) {
    return (
      "It sounds like you are carrying a tremendous amount of weight right now. Chronic cognitive overload often accumulates quietly until even small demands feel overwhelming.\n\n" +
      "Remember that needing rest is not a personal failure—it is a biological necessity. " +
      "When pressure builds up, try setting one small micro-boundary today. What is the heaviest single expectation weighing on you today?"
    );
  }

  // 6. Positive Reflections
  if (/good day|great day|happy|excited|proud|feeling good|better today|wonderful|grateful|joy|smile/i.test(query)) {
    return (
      "I'm so glad to hear that! Taking a moment to pause, acknowledge, and savor positive feelings is one of the most powerful ways to build long-term emotional resilience. " +
      "What contributed to making today feel brighter? I'd love to hear about it!"
    );
  }

  // 7. Sadness & Loneliness
  if (/sad|depressed|lonely|alone|crying|down|empty|hopeless|unhappy|hurting/i.test(query)) {
    return (
      "I hear you, and I want to validate that whatever you are feeling right now is completely real and understandable. " +
      "Feeling down or disconnected can make the world feel quiet, heavy, and exhausting.\n\n" +
      "You don't have to force yourself to 'look on the bright side' right now. Just taking things one moment at a time is enough. I'm right here with you."
    );
  }

  // 8. Default
  return (
    "Thank you for sharing that with me. When navigating daily thoughts and feelings, it can often help to take a step back and explore what is beneath the surface.\n\n" +
    "Whether you'd like to explore this topic further, try a guided mindfulness exercise, or run a structured clinical triage assessment to check in on stress markers, I'm right here with you. What would feel most supportive right now?"
  );
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

    const clientSignal = req.signal;

    // Detection for tool triggers
    const isErrorTest =
      userQuery.includes('test-error') ||
      userQuery.includes('test error') ||
      userQuery.includes('simulate failure');

    const isEscalationConfirmation =
      userQuery.includes('988') ||
      userQuery.includes('emergency counselor') ||
      userQuery.includes('dispatch');

    const isCrisis = /suicid|kill myself|end my life|want to die|hurt myself|self-harm/i.test(userQuery);

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
      (isCrisis && !isEscalationConfirmation) ||
      isErrorTest;

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        const emitPart = (type: string, data: any) => {
          const payload = JSON.stringify({ type, ...data }) + '\n';
          controller.enqueue(encoder.encode(payload));
        };

        try {
          // Tool execution lifecycle
          if (isAssessmentRequest || isEscalationConfirmation) {
            const toolCallId = `call-${Date.now()}`;
            const toolName = isEscalationConfirmation
              ? TOOL_NAMES.CONFIRM_EMERGENCY_ESCALATION
              : TOOL_NAMES.ASSESS_CRISIS_RISK;

            // State 1: Input Streaming
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

            // State 2: Input Available
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
                    : isCrisis
                    ? 'acute'
                    : userQuery.includes('panic')
                    ? 'severe'
                    : 'moderate',
                  symptoms: userQuery.includes('insomnia') || userQuery.includes('slept')
                    ? ['insomnia', 'acute anxiety', 'somatic fatigue']
                    : userQuery.includes('burnout')
                    ? ['cognitive overload', 'emotional burnout', 'decision fatigue']
                    : ['racing thoughts', 'affective tension', 'stress'],
                  affectiveTension: isCrisis ? 92 : userQuery.includes('panic') ? 78 : 58,
                  cognitiveOverload: userQuery.includes('burnout') ? 86 : 62,
                  somaticInsomnia: userQuery.includes('insomnia') || userQuery.includes('slept') ? 85 : 44,
                  immediateHarmRisk: isCrisis,
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

            // State 3 / State 4: Execute or Error
            try {
              if (isEscalationConfirmation) {
                emitPart('tool_result', {
                  toolCallId,
                  toolName,
                  state: 'output-available',
                  args,
                  result: null,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                });
              } else {
                const result = await executeTriageAssessment(args);
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

          // Conversational text stream
          let textResponse = '';
          if (isErrorTest) {
            textResponse =
              "I encountered a simulated connection timeout (`ERR_TRIAGE_TIMEOUT`) while contacting the clinical evaluation node. " +
              "Rest assured that our conversation remains safe and private. You can tap 'Retry Assessment' on the error card above to re-attempt.";
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
            textResponse = generateContextualResponse(rawQuery);
          }

          const words = textResponse.split(' ');
          for (let i = 0; i < words.length; i++) {
            if (clientSignal.aborted) {
              controller.close();
              return;
            }
            emitPart('text_delta', { text: (i === 0 ? '' : ' ') + words[i] });
            await new Promise((r) => setTimeout(r, 24));
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
