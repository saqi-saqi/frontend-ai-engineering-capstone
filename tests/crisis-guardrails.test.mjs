import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/**
 * Deterministic crisis patterns mirrored from MindGuard safety architecture
 * (adapted from Tier 1 deterministic engine).
 */
const CRISIS_PATTERNS = [
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

function classifyIntent(text) {
  const isCrisis = CRISIS_PATTERNS.some((pattern) => pattern.test(text));
  if (isCrisis) {
    return { intent: 'crisis_acute_distress', isCrisis: true, confidence: 0.99 };
  }
  if (/anxious|panic|worry|stress|overwhelm/i.test(text)) {
    return { intent: 'anxiety_support', isCrisis: false, confidence: 0.94 };
  }
  if (/sad|depress|hopeless|lonely|down/i.test(text)) {
    return { intent: 'depressive_affect', isCrisis: false, confidence: 0.91 };
  }
  if (/sleep|insomnia|tired|exhaust/i.test(text)) {
    return { intent: 'somatic_insomnia', isCrisis: false, confidence: 0.89 };
  }
  return { intent: 'general_inquiry', isCrisis: false, confidence: 0.85 };
}

describe('MindGuard Tier 1 Crisis Guardrails & Intent Classification', () => {
  it('triggers immediate crisis flag for explicit suicidal ideation', () => {
    const acuteQueries = [
      'I want to die, nothing is getting better',
      'I feel like I should kill myself tonight',
      'I want to end my life',
      'Everyone would be better off dead without me',
      'I am going to hurt myself',
      'I can not take this anymore',
    ];

    for (const query of acuteQueries) {
      const result = classifyIntent(query);
      assert.strictEqual(result.isCrisis, true, `Expected crisis for: "${query}"`);
      assert.strictEqual(result.intent, 'crisis_acute_distress');
      assert.strictEqual(result.confidence, 0.99);
    }
  });

  it('correctly classifies non-crisis distress without false-positive emergency lock', () => {
    const nonCrisisQueries = [
      { text: 'I am feeling so overwhelmed with my upcoming final exam', expected: 'anxiety_support' },
      { text: 'Having a severe panic attack right now', expected: 'anxiety_support' },
      { text: 'I have been so sad and lonely all week', expected: 'depressive_affect' },
      { text: 'I have not slept in three days and feel exhausted', expected: 'somatic_insomnia' },
      { text: 'Can you guide me through a 4-7-8 breathing exercise?', expected: 'general_inquiry' },
    ];

    for (const { text, expected } of nonCrisisQueries) {
      const result = classifyIntent(text);
      assert.strictEqual(result.isCrisis, false, `Did not expect crisis flag for: "${text}"`);
      assert.strictEqual(result.intent, expected);
      assert.ok(result.confidence >= 0.85);
    }
  });

  it('handles empty or whitespace strings safely without throwing', () => {
    assert.doesNotThrow(() => classifyIntent(''));
    assert.doesNotThrow(() => classifyIntent('    '));
    const res = classifyIntent('');
    assert.strictEqual(res.isCrisis, false);
    assert.strictEqual(res.intent, 'general_inquiry');
  });
});
