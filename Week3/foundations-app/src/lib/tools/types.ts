/**
 * Week 5: Generative UI & Server-Side Tool Types (FE-07)
 * MindGuard AI — Triage Assessment & Crisis Intervention Tools
 */

export type ToolPartState =
  | 'input-streaming'   // 1. Model is streaming argument tokens
  | 'input-available'   // 2. Arguments complete; tool running on server
  | 'output-available'   // 3. Execution succeeded; rendered as Generative UI component
  | 'output-error';      // 4. Execution failed; rendered as designed error recovery state

export interface ToolPart<TArgs = any, TResult = any> {
  toolCallId: string;
  toolName: string;
  state: ToolPartState;
  args: TArgs;
  rawInput?: string;
  result?: TResult;
  error?: string;
  errorCode?: string;
  latencyMs?: number;
  timestamp: string;
}

export type SeverityLevel = 'mild' | 'moderate' | 'severe' | 'acute';
export type RiskTier = 'low' | 'moderate' | 'elevated' | 'critical';

export interface TriageAssessmentInput {
  patientQuery: string;
  severityLevel: SeverityLevel;
  symptoms: string[];
  affectiveTension: number;    // 0-100
  cognitiveOverload: number;   // 0-100
  somaticInsomnia: number;     // 0-100
  immediateHarmRisk: boolean;
  clinicalNotes?: string;
}

export interface TriageAssessmentResult {
  assessmentId: string;
  timestamp: string;
  overallScore: number;         // 0-100
  riskTier: RiskTier;
  radarScores: {
    affective: number;
    cognitive: number;
    somatic: number;
    crisis: number;
  };
  identifiedMarkers: string[];
  protocol: {
    code: string;
    title: string;
    description: string;
    emergencyRequired: boolean;
    actionLabel: string;
    actionUrl?: string;
  };
  confidence: number;
  executionDurationMs: number;
}

export interface EmergencyEscalationInput {
  sessionContext: string;
  detectedTriggers: string[];
  urgencyLevel: 'urgent' | 'immediate';
  requiresDirectConsent: boolean;
}

export interface EmergencyEscalationResult {
  confirmed: boolean;
  escalationId: string;
  timestamp: string;
  hotline: string;
  routingSummary: string;
  safePlanSteps: string[];
}
