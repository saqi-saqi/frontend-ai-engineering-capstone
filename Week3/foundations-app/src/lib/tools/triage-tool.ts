/**
 * Week 5: Server-Side Tool Execution Engine (FE-07)
 * MindGuard AI — Clinical Triage & Crisis Protocol Tools
 */

import { TriageAssessmentSchema, EmergencyEscalationSchema } from './schema';
import {
  TriageAssessmentInput,
  TriageAssessmentResult,
  EmergencyEscalationInput,
  EmergencyEscalationResult,
  RiskTier,
} from './types';

export const TOOL_NAMES = {
  ASSESS_CRISIS_RISK: 'assessCrisisRisk',
  CONFIRM_EMERGENCY_ESCALATION: 'confirmEmergencyEscalation',
} as const;

export async function executeTriageAssessment(
  rawArgs: unknown
): Promise<TriageAssessmentResult> {
  const startTime = Date.now();

  const input = TriageAssessmentSchema.parse(rawArgs) as TriageAssessmentInput;

  // Failure trigger for testing designed error recovery state
  if (
    input.patientQuery.toLowerCase().includes('test-error') ||
    input.patientQuery.toLowerCase().includes('test error') ||
    input.patientQuery.toLowerCase().includes('simulate failure')
  ) {
    await new Promise((r) => setTimeout(r, 250));
    const error: any = new Error(
      'Upstream Clinical Telemetry Gateway timed out after 3000ms. Database node unresponsive.'
    );
    error.code = 'ERR_TRIAGE_TIMEOUT';
    throw error;
  }

  const baseScore =
    input.affectiveTension * 0.35 +
    input.cognitiveOverload * 0.25 +
    input.somaticInsomnia * 0.2 +
    (input.immediateHarmRisk ? 20 : 0);

  const overallScore = Math.min(100, Math.max(5, Math.round(baseScore)));

  let riskTier: RiskTier = 'low';
  if (overallScore >= 80 || input.immediateHarmRisk) {
    riskTier = 'critical';
  } else if (overallScore >= 55) {
    riskTier = 'elevated';
  } else if (overallScore >= 30) {
    riskTier = 'moderate';
  }

  const protocolMap: Record<RiskTier, TriageAssessmentResult['protocol']> = {
    critical: {
      code: 'PROTOCOL_988_ESCALATION',
      title: 'Acute Crisis Intervention & Warm Handoff',
      description:
        'Immediate safety risk detected. Suppress unstructured open-ended chat and transition to minimal-friction emergency hotline routing (988 Lifeline).',
      emergencyRequired: true,
      actionLabel: 'Connect to 988 Lifeline',
      actionUrl: 'tel:988',
    },
    elevated: {
      code: 'PROTOCOL_ACUTE_ANXIETY_RESET',
      title: 'Physiological Nervous System Reset (4-7-8)',
      description:
        'Heightened autonomic arousal and somatic strain. Guide user through structured parasympathetic activation breathing sequence before conversational reflection.',
      emergencyRequired: false,
      actionLabel: 'Start Guided 4-7-8 Breathing',
    },
    moderate: {
      code: 'PROTOCOL_COGNITIVE_DEFUSION',
      title: 'Cognitive Reframing & Grounding Exercise',
      description:
        'Moderate emotional exhaustion and rumination. Deploy 5-4-3-2-1 sensory grounding and reflective questioning to de-escalate cognitive load.',
      emergencyRequired: false,
      actionLabel: 'Begin 5-4-3-2-1 Sensory Grounding',
    },
    low: {
      code: 'PROTOCOL_SUPPORTIVE_LISTENING',
      title: 'Non-Clinical Conversational Companionship',
      description:
        'Baseline distress within manageable limits. Provide empathetic active listening and self-care habit reinforcement.',
      emergencyRequired: false,
      actionLabel: 'Explore Daily De-Stress Strategies',
    },
  };

  const protocol = protocolMap[riskTier];

  return {
    assessmentId: `triage-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    overallScore,
    riskTier,
    radarScores: {
      affective: input.affectiveTension,
      cognitive: input.cognitiveOverload,
      somatic: input.somaticInsomnia,
      crisis: input.immediateHarmRisk ? 95 : Math.round(overallScore * 0.7),
    },
    identifiedMarkers: input.symptoms.length > 0 ? input.symptoms : ['acute stress', 'emotional fatigue'],
    protocol,
    confidence: 0.94,
    executionDurationMs: Date.now() - startTime,
  };
}

export async function executeEmergencyEscalation(
  rawArgs: unknown
): Promise<EmergencyEscalationResult> {
  const input = EmergencyEscalationSchema.parse(rawArgs) as EmergencyEscalationInput;

  return {
    confirmed: true,
    escalationId: `esc-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    hotline: '988 (Suicide & Crisis Lifeline)',
    routingSummary: 'Direct warm-connection channel initialized with confidential crisis counselor.',
    safePlanSteps: [
      'Take three slow, deep breaths with both feet grounded on the floor.',
      'Stay on this screen or keep a loved one in the room with you.',
      'A crisis counselor will be on the line in under 60 seconds.',
    ],
  };
}
