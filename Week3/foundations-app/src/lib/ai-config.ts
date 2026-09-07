/**
 * MindGuard AI - Central Model Configuration & System Prompt
 * ==========================================================
 * This module defines the model settings, inference hyperparameters,
 * system instructions, and safety guardrails for the streaming chat interface.
 *
 * NOTE: This module is used strictly by server-side Route Handlers to ensure
 * that the API key, model hyperparameters, and safety prompts are never leaked
 * into client-side JavaScript bundles.
 */

export interface ModelConfig {
  provider: 'anthropic' | 'fallback';
  model: string;
  maxTokens: number;
  temperature: number;
  topP: number;
}

/**
 * Default Claude model configuration for streaming conversation.
 * Using Claude 3.5 Sonnet (20241022) for high emotional intelligence,
 * clinical safety distinction, and low-latency token generation.
 */
export const CLAUDE_MODEL_CONFIG: ModelConfig = {
  provider: 'anthropic',
  model: 'claude-3-5-sonnet-20241022',
  maxTokens: 1024,
  temperature: 0.7,
  topP: 0.9,
};

/**
 * MindGuard AI System Prompt
 * --------------------------
 * Core guidelines:
 * 1. Role: Empathetic, supportive conversational companion for mental wellbeing.
 * 2. Non-Clinical Boundary: Always maintain that MindGuard is an informative AI companion,
 *    not a doctor, clinical psychologist, or crisis hotline.
 * 3. Acute Distress & Suicidal Ideation: If a user expresses passive or active suicidal thoughts,
 *    self-harm, or extreme distress, prioritize immediate human safety, provide the 988 Suicide
 *    & Crisis Lifeline (call/text 988) and Crisis Text Line (Text HOME to 741741).
 * 4. Tone: Calm, warm, validating, active listening, and structured.
 */
export const MINDGUARD_SYSTEM_PROMPT = `You are MindGuard AI, an empathetic, supportive conversational companion designed to help users navigate daily stress, emotional challenges, and mental wellbeing in a safe, judgment-free space.

Core Operating Guidelines:
1. Warmth & Active Listening: Validate the user's feelings genuinely without being dismissive or overly clinical. Reflect back what you hear and offer gentle grounding techniques (e.g., box breathing, sensory grounding).
2. Clear Boundaries: You are an AI companion, not a licensed therapist or psychiatrist. Do not diagnose conditions or prescribe medications.
3. Crisis Protocol: If the user indicates self-harm, suicidal ideation, or acute psychiatric distress:
   - Remain calm, compassionate, and direct.
   - Reassure them that they do not have to carry this alone.
   - Immediately provide free, 24/7 confidential crisis resources:
     • National Suicide & Crisis Lifeline: Call or text 988 (US & Canada).
     • Crisis Text Line: Text HOME to 741741.
     • The Trevor Project (LGBTQ+ youth): Call 1-866-488-7386 or text START to 678-678.
     • International Emergency Services: Advise contacting local emergency services (911, 999, 112).
4. Response Style: Keep responses concise, supportive, and conversational (2-4 paragraphs). Use short paragraphs for high readability.`;

/**
 * Keyword patterns for acute distress / crisis detection.
 * Used for fast server-side intent classification before inference.
 */
export const CRISIS_PATTERNS = [
  /suicid/i,
  /kill\s+(myself|me)/i,
  /end\s+(my\s+life|it\s+all)/i,
  /want\s+to\s+die/i,
  /no\s+point\s+in\s+living/i,
  /better\s+off\s+dead/i,
  /hurt\s+myself/i,
  /self[\s-]harm/i,
  /can'?t\s+take\s+this\s+anymore/i,
];

/**
 * Helper to classify user message intent.
 */
export function classifyIntent(text: string): { intent: string; isCrisis: boolean; confidence: number } {
  const isCrisis = CRISIS_PATTERNS.some((pattern) => pattern.test(text));
  if (isCrisis) {
    return {
      intent: 'crisis_acute_distress',
      isCrisis: true,
      confidence: 0.99,
    };
  }

  if (/anxious|panic|worry|stress|overwhelm/i.test(text)) {
    return {
      intent: 'anxiety_support',
      isCrisis: false,
      confidence: 0.94,
    };
  }

  if (/sad|depress|hopeless|lonely|down/i.test(text)) {
    return {
      intent: 'depressive_affect',
      isCrisis: false,
      confidence: 0.92,
    };
  }

  return {
    intent: 'supportive_listening',
    isCrisis: false,
    confidence: 0.88,
  };
}
