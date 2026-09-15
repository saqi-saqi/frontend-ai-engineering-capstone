/**
 * Week 5: Zod Tool Schemas (FE-07)
 * MindGuard AI — Triage Assessment & Crisis Intervention Tools
 */

export interface SchemaField<T> {
  type: string;
  description?: string;
  optional?: boolean;
  parse: (val: unknown) => T;
  describe: (desc: string) => SchemaField<T>;
}

function createField<T>(type: string, parser: (val: unknown) => T): SchemaField<T> {
  let desc = '';
  const field: SchemaField<T> = {
    type,
    description: desc,
    parse: parser,
    describe(d: string) {
      this.description = d;
      return this;
    },
  };
  return field;
}

export const z = {
  string: () =>
    createField<string>('string', (v) => {
      if (typeof v !== 'string') throw new Error(`Expected string, got ${typeof v}`);
      return v;
    }),
  number: (opts?: { min?: number; max?: number }) =>
    createField<number>('number', (v) => {
      const num = Number(v);
      if (isNaN(num)) throw new Error(`Expected number, got ${typeof v}`);
      if (opts?.min !== undefined && num < opts.min) throw new Error(`Number must be >= ${opts.min}`);
      if (opts?.max !== undefined && num > opts.max) throw new Error(`Number must be <= ${opts.max}`);
      return num;
    }),
  boolean: () =>
    createField<boolean>('boolean', (v) => Boolean(v)),
  enum: <T extends string>(values: readonly T[]) =>
    createField<T>('enum', (v) => {
      if (!values.includes(v as T)) throw new Error(`Invalid enum value: ${v}. Expected one of: ${values.join(', ')}`);
      return v as T;
    }),
  array: <T>(itemSchema: SchemaField<T>) =>
    createField<T[]>('array', (v) => {
      if (!Array.isArray(v)) return [];
      return v.map((item) => itemSchema.parse(item));
    }),
  object: <T extends Record<string, SchemaField<any>>>(shape: T) => ({
    type: 'object',
    shape,
    parse: (data: unknown): { [K in keyof T]: ReturnType<T[K]['parse']> } => {
      if (!data || typeof data !== 'object') {
        throw new Error('Expected object data for schema parse');
      }
      const result: any = {};
      for (const key in shape) {
        const field = shape[key];
        const val = (data as any)[key];
        if (val === undefined && field.optional) {
          result[key] = undefined;
        } else {
          result[key] = field.parse(val);
        }
      }
      return result;
    },
    describe: (desc: string) => ({ shape, description: desc }),
  }),
};

export const TriageAssessmentSchema = z.object({
  patientQuery: z
    .string()
    .describe('The raw or synthesized distress query shared by the user in conversation'),
  severityLevel: z
    .enum(['mild', 'moderate', 'severe', 'acute'] as const)
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

export const EmergencyEscalationSchema = z.object({
  sessionContext: z
    .string()
    .describe('Summary of the urgent conversational context requiring clinical escalation'),
  detectedTriggers: z
    .array(z.string())
    .describe('Specific risk triggers that mandate human counselor connection'),
  urgencyLevel: z
    .enum(['urgent', 'immediate'] as const)
    .describe('Degree of urgency for the crisis intervention dispatch'),
  requiresDirectConsent: z
    .boolean()
    .describe('True if user must confirm connection before routing to external hotline'),
});
