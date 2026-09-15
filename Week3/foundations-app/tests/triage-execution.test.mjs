import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';

function executeTriageAssessment(input) {
  if (input.simulateFailure) {
    const error = new Error('Clinical evaluation gateway timed out.');
    error.code = 'ERR_TRIAGE_TIMEOUT';
    throw error;
  }

  const crisisScore = input.immediateHarmRisk ? 98 : Math.round((input.affectiveTension + input.cognitiveOverload) / 3);
  const overallScore = Math.min(
    100,
    Math.round(
      input.affectiveTension * 0.35 +
      input.cognitiveOverload * 0.25 +
      input.somaticInsomnia * 0.2 +
      crisisScore * 0.2
    )
  );

  let riskTier = 'low';
  if (overallScore >= 80 || input.immediateHarmRisk) riskTier = 'critical';
  else if (overallScore >= 65) riskTier = 'elevated';
  else if (overallScore >= 45) riskTier = 'moderate';

  let protocol;
  if (riskTier === 'critical') {
    protocol = {
      code: 'PROTOCOL_CRISIS_ESCALATION',
      title: 'Immediate Crisis Escalation',
      emergencyRequired: true,
      actionLabel: 'Connect to 988 Lifeline',
    };
  } else if (input.somaticInsomnia > 70) {
    protocol = {
      code: 'PROTOCOL_SOMATIC_SLEEP_HYGIENE',
      title: 'Circadian Sleep Reset Protocol',
      emergencyRequired: false,
      actionLabel: 'View Wind-Down Steps',
    };
  } else {
    protocol = {
      code: 'PROTOCOL_ACUTE_ANXIETY_RESET',
      title: 'Parasympathetic Grounding Protocol',
      emergencyRequired: false,
      actionLabel: 'Start 4-7-8 Breathing',
    };
  }

  return {
    overallScore,
    riskTier,
    radarScores: {
      affective: input.affectiveTension,
      cognitive: input.cognitiveOverload,
      somatic: input.somaticInsomnia,
      crisis: crisisScore,
    },
    protocol,
  };
}

describe('MindGuard FE-07 Triage Assessment Execution Logic', () => {
  it('calculates critical risk tier and assigns crisis protocol when immediateHarmRisk is true', () => {
    const res = executeTriageAssessment({
      affectiveTension: 60,
      cognitiveOverload: 50,
      somaticInsomnia: 40,
      immediateHarmRisk: true,
    });

    assert.strictEqual(res.riskTier, 'critical');
    assert.strictEqual(res.protocol.code, 'PROTOCOL_CRISIS_ESCALATION');
    assert.strictEqual(res.protocol.emergencyRequired, true);
    assert.strictEqual(res.radarScores.crisis, 98);
  });

  it('assigns sleep hygiene protocol when somatic insomnia is predominant', () => {
    const res = executeTriageAssessment({
      affectiveTension: 40,
      cognitiveOverload: 45,
      somaticInsomnia: 85,
      immediateHarmRisk: false,
    });

    assert.strictEqual(res.protocol.code, 'PROTOCOL_SOMATIC_SLEEP_HYGIENE');
    assert.strictEqual(res.protocol.emergencyRequired, false);
    assert.ok(res.overallScore < 80);
  });

  it('handles simulated failure cleanly throwing ERR_TRIAGE_TIMEOUT for error state rendering', () => {
    assert.throws(
      () => {
        executeTriageAssessment({ simulateFailure: true });
      },
      (err) => {
        return err.code === 'ERR_TRIAGE_TIMEOUT' && err.message.includes('timed out');
      }
    );
  });
});
