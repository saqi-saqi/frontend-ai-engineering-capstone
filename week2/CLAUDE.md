# Project Rules & Development Guidelines: Week 2 AI Prompting Drill

## Form Implementation & Validation Rules
1. **WCAG 2.1 AA Form Accessibility**: Every interactive input element MUST be explicitly bound to a `<label htmlFor="fieldId">` matching `id="fieldId"`. When in an error state, inputs MUST include `aria-invalid="true"` and `aria-describedby="fieldId-error"`, and error text containers MUST feature `role="alert"`.
2. **Schema & Input Sanitization**: All user-supplied string inputs MUST undergo `.trim()` before validation and submit dispatch. Input validation MUST execute real-time on `blur` (`handleBlur`) and on `submit`. Email fields MUST validate against strict RFC regex (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), and API keys MUST match key pattern prefixes (`^sk-ant-api[0-9a-zA-Z_-]{20,}$`).

## Testing & Quality Gate Rules
3. **Mandatory Test Verification**: Every component handling state or user interaction MUST have a corresponding Vitest/Testing Library test suite in `src/components/__tests__/[ComponentName].test.jsx`. Code changes are NOT complete until `npm test` runs with 100% test pass rate.
4. **Error Alert Focus Management**: Form components with submit validation failure MUST include an error summary container with `role="alert"` and automatically shift DOM focus to the summary box (`ref.current.focus()`) on failed submit.
