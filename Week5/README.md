# Week 5: Tool Results and Structured Output in the UI (FE-07)
**Track**: Frontend AI Engineering · Phase: Build (Core)  
**Student Name**: Muhammad Saqib Tariq (`04072213009`)  
**Capstone Application**: MindGuard AI (Conversational Companion & Crisis Triage Engine)  
**Live Preview URL**: [https://prismatic-dodol-61734a.netlify.app/chat](https://prismatic-dodol-61734a.netlify.app/chat)

---

## 1. Overview & Architecture

FE-07 transforms a conversational AI chat wrapper into a true generative UI application by coupling server-side tools with structured client component rendering. In MindGuard AI, the model calls clinical triage tools that parse multi-dimensional mental health markers and render interactive score cards, SVG risk charts, and crisis escalation gateways.

### The 4-State Tool Lifecycle State Machine
```
[User Prompt] 
      │
      ▼
1. input-streaming  ──► Model dynamically streams tool arguments
      │
      ▼
2. input-available  ──► Arguments parsed and validated against Zod schema; server tool starts
      │
      ├───────────────────────────────┐
      ▼ (Success)                     ▼ (Failure / Timeout)
3. output-available             4. output-error
   - Renders TriageScoreCard       - Renders ToolErrorCard
   - Hand-rolled SVG Radar Chart   - Recovery action: [Retry Tool Execution]
   - Interactive Action Protocol   - Preserves conversational context
```

---

## 2. Server-Side Tool Contracts & Zod Schemas

### Tool 1: `assessCrisisRisk`
* **Purpose**: Evaluates linguistic affect markers from conversational transcripts, computes multi-dimensional risk scores, and returns an evidence-based clinical stabilization protocol.
* **Definition File**: [`Week5/tools/triage-tool.ts`](file:///c:/Users/user/Desktop/Front_end_Ai_engineering/Week5/tools/triage-tool.ts)
* **Schema File**: [`Week5/tools/schema.ts`](file:///c:/Users/user/Desktop/Front_end_Ai_engineering/Week5/tools/schema.ts)

#### Input Zod Schema:
```typescript
export const TriageAssessmentSchema = z.object({
  patientQuery: z
    .string()
    .describe('The raw or synthesized distress query shared by the user in conversation'),
  severityLevel: z
    .enum(['mild', 'moderate', 'severe', 'acute'])
    .describe('Primary psychiatric risk tier based on linguistic affect markers'),
  symptoms: z
    .array(z.string())
    .describe('List of extracted distress symptoms (e.g. insomnia, panic, hopelessness, withdrawal)'),
  affectiveTension: z
    .number({ min: 0, max: 100 })
    .describe('Calculated emotional/affective tension index from 0 (calm) to 100 (extreme distress)'),
  cognitiveOverload: z
    .number({ min: 0, max: 100 })
    .describe('Mental fatigue, racing thoughts, or decision paralysis index from 0 to 100'),
  somaticInsomnia: z
    .number({ min: 0, max: 100 })
    .describe('Physical distress or circadian sleep disruption index from 0 to 100'),
  immediateHarmRisk: z
    .boolean()
    .describe('Flag indicating whether immediate self-harm ideation or intent was detected'),
});
```

#### Output Return Shape (`TriageAssessmentResult`):
```typescript
interface TriageAssessmentResult {
  assessmentId: string;           // e.g. "triage-1726418800000-a8f3b"
  timestamp: string;              // e.g. "04:45 PM"
  overallScore: number;           // 0 to 100 composite severity score
  riskTier: 'low' | 'moderate' | 'elevated' | 'critical';
  radarScores: {
    affective: number;            // 0 to 100
    cognitive: number;            // 0 to 100
    somatic: number;              // 0 to 100
    crisis: number;               // 0 to 100
  };
  identifiedMarkers: string[];    // e.g. ["#insomnia", "#panic", "#burnout"]
  protocol: {
    code: string;                 // e.g. "PROTOCOL_ACUTE_ANXIETY_RESET"
    title: string;                // e.g. "Physiological Nervous System Reset (4-7-8)"
    description: string;          // Actionable clinical guidance
    emergencyRequired: boolean;   // Flag requiring 988 emergency escalation
    actionLabel: string;          // Button text: "Start Guided 4-7-8 Breathing"
    actionUrl?: string;           // e.g. "tel:988"
  };
  confidence: number;             // e.g. 0.94
  executionDurationMs: number;    // Latency benchmark in milliseconds
}
```

---

### Tool 2: `confirmEmergencyEscalation` (User-Interaction Tool)
* **Purpose**: Generative UI confirmation card requiring explicit user agreement before connecting to external crisis hotlines (988 Lifeline).
* **Definition File**: [`Week5/tools/triage-tool.ts`](file:///c:/Users/user/Desktop/Front_end_Ai_engineering/Week5/tools/triage-tool.ts)

#### Input Zod Schema:
```typescript
export const EmergencyEscalationSchema = z.object({
  sessionContext: z
    .string()
    .describe('Summary of the urgent conversational context requiring clinical escalation'),
  detectedTriggers: z
    .array(z.string())
    .describe('Specific risk triggers that mandate human counselor connection'),
  urgencyLevel: z
    .enum(['urgent', 'immediate'])
    .describe('Degree of urgency for the crisis intervention dispatch'),
  requiresDirectConsent: z
    .boolean()
    .describe('True if user must confirm connection before routing to external hotline'),
});
```

#### Output Return Shape (`EmergencyEscalationResult`):
```typescript
interface EmergencyEscalationResult {
  confirmed: boolean;
  escalationId: string;
  timestamp: string;
  hotline: string;                // "988 (Suicide & Crisis Lifeline)"
  routingSummary: string;         // Confidential connection details
  safePlanSteps: string[];        // 3 immediate stabilization steps
}
```

---

## 3. Four Distinct Tool Part Visual Treatments

| Tool Part State | User Question Answered | Visual Treatment in UI |
| :--- | :--- | :--- |
| **1. `input-streaming`** | *What is the AI doing?* | Cyan glowing card with animated pulse and code typewriter cursor rendering live JSON argument tokens. |
| **2. `input-available`** | *With what input is it running?* | Indigo card showing parsed parameters, a spinner, and status *"Running MindGuard Clinical Evaluation Engine..."*. |
| **3. `output-available`** | *What came back?* | **TriageScoreCard Component** with severity badge, hand-rolled SVG multi-axis risk radar chart, symptom tags, and protocol buttons (smooth 200ms crossfade). |
| **4. `output-error`** | *What went wrong?* | **ToolErrorCard Component** (amber/rose border, error diagnosis code `ERR_TRIAGE_TIMEOUT`, empathetic fallback explanation, and interactive **"Retry Tool Execution"** button). |

---

## 4. How to Test & Review

1. **Trigger Successful Tool Call & Generative UI**:
   - Send: *"Run a clinical triage assessment on my severe anxiety and sleep issues."*
   - Watch State 1 (`input-streaming`) $\rightarrow$ State 2 (`input-available`) $\rightarrow$ State 3 (`output-available` with SVG Radar Chart).
2. **Trigger Interactive Confirmation Tool**:
   - Send: *"I need emergency 988 counselor connection."*
   - Review confirmation prompt with `[Yes, Connect to 988]` and `[I'm in a safe space]` buttons.
3. **Trigger Designed Error Recovery State**:
   - Send: *"Test tool error state"* or *"simulate failure"*.
   - Watch State 4 (`output-error`) render the styled recovery card with the `Retry` button.
