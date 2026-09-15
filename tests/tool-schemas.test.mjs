import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/**
 * Zod-compatible schema validator mirrored from Week5/tools/schema.ts
 */
function validateTriageInput(data) {
  const errors = [];
  if (typeof data.patientQuery !== 'string' || !data.patientQuery.trim()) {
    errors.push('patientQuery must be a non-empty string');
  }
  const validSeverities = ['mild', 'moderate', 'severe', 'acute'];
  if (!validSeverities.includes(data.severityLevel)) {
    errors.push(`severityLevel must be one of: ${validSeverities.join(', ')}`);
  }
  if (!Array.isArray(data.symptoms) || data.symptoms.length === 0) {
    errors.push('symptoms must be a non-empty array of strings');
  }
  for (const field of ['affectiveTension', 'cognitiveOverload', 'somaticInsomnia']) {
    const val = data[field];
    if (typeof val !== 'number' || isNaN(val) || val < 0 || val > 100) {
      errors.push(`${field} must be a number between 0 and 100`);
    }
  }
  if (typeof data.immediateHarmRisk !== 'boolean') {
    errors.push('immediateHarmRisk must be a boolean');
  }
  return { success: errors.length === 0, errors };
}

describe('MindGuard FE-07 Zod Tool Schema Validation', () => {
  it('validates a compliant clinical triage input payload', () => {
    const validPayload = {
      patientQuery: 'I feel completely overwhelmed by work burnout and insomnia',
      severityLevel: 'severe',
      symptoms: ['burnout', 'insomnia', 'racing thoughts'],
      affectiveTension: 75,
      cognitiveOverload: 85,
      somaticInsomnia: 80,
      immediateHarmRisk: false,
    };

    const result = validateTriageInput(validPayload);
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.errors.length, 0);
  });

  it('rejects payloads with out-of-range dimensional scores', () => {
    const invalidPayload = {
      patientQuery: 'Severe distress',
      severityLevel: 'acute',
      symptoms: ['panic'],
      affectiveTension: 140, // Out of bounds (>100)
      cognitiveOverload: -10, // Out of bounds (<0)
      somaticInsomnia: 50,
      immediateHarmRisk: true,
    };

    const result = validateTriageInput(invalidPayload);
    assert.strictEqual(result.success, false);
    assert.ok(result.errors.some((e) => e.includes('affectiveTension')));
    assert.ok(result.errors.some((e) => e.includes('cognitiveOverload')));
  });

  it('rejects invalid enum values for severityLevel', () => {
    const badEnumPayload = {
      patientQuery: 'Test query',
      severityLevel: 'extreme_danger', // Invalid enum
      symptoms: ['anxiety'],
      affectiveTension: 50,
      cognitiveOverload: 50,
      somaticInsomnia: 50,
      immediateHarmRisk: false,
    };

    const result = validateTriageInput(badEnumPayload);
    assert.strictEqual(result.success, false);
    assert.ok(result.errors.some((e) => e.includes('severityLevel')));
  });

  it('rejects missing or empty symptoms array', () => {
    const noSymptomsPayload = {
      patientQuery: 'Test query',
      severityLevel: 'moderate',
      symptoms: [],
      affectiveTension: 50,
      cognitiveOverload: 50,
      somaticInsomnia: 50,
      immediateHarmRisk: false,
    };

    const result = validateTriageInput(noSymptomsPayload);
    assert.strictEqual(result.success, false);
    assert.ok(result.errors.some((e) => e.includes('symptoms')));
  });
});
