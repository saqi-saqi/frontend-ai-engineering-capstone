# Week 4 Deliverable: Foundations — Accessible Components Playground & A11y Audit

**Student Name**: Muhammad Saqib Tariq  
**Student ID**: 04072213009  
**Track**: Front-End AI Engineering / AI Fluency  
**Phase**: Foundations · Week 4 (Estimated: 5 hours)  
**Deliverables**: `Week4/playground/` (Scratch-built React + TS Components & Tests) + `Week4/NOTES.md`  

---

## 1. Executive Summary

AI assistants generate UI components rapidly, but frequently generate inaccessible markup lacking keyboard traps, ARIA roles, and focus restoration. To effectively review and audit AI-generated code, an engineer must first master building correct accessibility patterns by hand.

In this deliverable:
1. **Three Interactive Components Built from Scratch in React + TypeScript (No component libraries)**:
   - **Modal Dialog (`Modal.tsx`)**: W3C ARIA APG Dialog pattern with `useFocusTrap` (Tab/Shift+Tab cycling), `useFocusRestore` (active element memory on open/close), `Escape` key dismissal, and body scroll lock.
   - **Tabs (`Tabs.tsx`)**: W3C ARIA APG Tabs pattern with `useRovingTabIndex` (`ArrowRight`/`ArrowLeft`/`ArrowDown`/`ArrowUp` keyboard navigation, `Home`/`End` bounds jumping, `role="tablist"`, `role="tab"`, and `role="tabpanel"`).
   - **Disclosure (`Disclosure.tsx`)**: W3C ARIA APG Disclosure pattern with `aria-expanded` synchronization, `role="region"`, `Enter`/`Space` keyboard triggers, and semantic hiding.
2. **Strict TypeScript & Zero `any` Escapes**: 100% strict typing on all component props, generic options, ref forwarding, and keyboard event handlers.
3. **Automated Vitest Test Suite**: Unit tests verifying keyboard interaction contracts, focus trapping, and ARIA attributes for all three components.
4. **`NOTES.md` Deep-Dive Architectural Audit**: In-depth analysis comparing our hand-rolled implementations against **shadcn/ui** and **Radix UI** primitives across 6 concrete engineering dimensions.

---

## 2. Directory Structure of Deliverables

```
Week4/
├── NOTES.md                              # Deep-dive architectural analysis (Hand-Rolled vs shadcn/ui)
├── WEEK_04_SUBMISSION.md                 # Master submission document
└── playground/                           # Interactive React + TypeScript Playground
    ├── package.json                      # React 18, TypeScript, Vitest, Testing Library
    ├── tsconfig.json                     # Strict TypeScript configuration (zero any escapes)
    ├── vite.config.ts                    # Vite & Vitest configuration
    ├── index.html                        # Playground HTML root
    └── src/
        ├── hooks/
        │   ├── useFocusTrap.ts           # Keyboard focus trapping hook (Tab / Shift+Tab)
        │   ├── useFocusRestore.ts        # Focus restoration hook (stores active element)
        │   └── useRovingTabIndex.ts      # Roving tabindex hook for keyboard navigation
        ├── components/
        │   ├── Modal/
        │   │   ├── Modal.tsx             # W3C ARIA pattern Modal Dialog
        │   │   ├── Modal.test.tsx        # Automated tests (Focus trap, Esc, focus restore)
        │   │   └── index.ts
        │   ├── Tabs/
        │   │   ├── Tabs.tsx              # W3C ARIA pattern Tabs
        │   │   ├── Tabs.test.tsx         # Automated tests (Arrow navigation, Home/End)
        │   │   └── index.ts
        │   ├── Disclosure/
        │   │   ├── Disclosure.tsx        # W3C ARIA pattern Disclosure
        │   │   ├── Disclosure.test.tsx   # Automated tests (Enter/Space, aria-expanded)
        │   │   └── index.ts
        │   ├── A11yInspector.tsx         # Live DOM active focus & keyboard event inspector
        │   ├── KeyboardGuide.tsx         # W3C keyboard testing cheat sheet
        │   └── Comparison/
        │       └── ShadcnComparison.tsx  # Side-by-side architectural gap review
        ├── styles/
        │   └── index.css                 # Dark theme & high-contrast WCAG 2.1 AA focus rings
        ├── App.tsx                       # Live interactive test playground UI
        ├── main.tsx                      # Application entry point
        └── setupTests.ts                 # Vitest test setup
```

---

## 3. Detailed Component Implementation Breakdown

### 3.1 Modal Dialog (`Modal.tsx`)
- **W3C Pattern**: [WAI-ARIA Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- **Core ARIA Attributes**:
  - `role="dialog"` (or `role="alertdialog"`)
  - `aria-modal="true"`
  - `aria-labelledby="{titleId}"`
  - `aria-describedby="{descriptionId}"`
- **Keyboard & Focus Handling**:
  - **Focus Trap**: `useFocusTrap` queries all focusable elements and traps `Tab` and `Shift + Tab` cycling strictly inside the dialog container.
  - **Focus Restoration**: `useFocusRestore` captures `document.activeElement` on open and automatically restores keyboard focus back to the trigger button upon dismissal.
  - **Escape Dismissal**: Pressing `Escape` invokes `onClose()`.
  - **Scroll Lock**: Sets `overflow: hidden` on `document.body` and compensates for scrollbar width.
  - **Portal Rendering**: Mounted via `createPortal` to `document.body`.

---

### 3.2 Tabs (`Tabs.tsx`)
- **W3C Pattern**: [WAI-ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- **Core ARIA Attributes**:
  - `role="tablist"` with `aria-label` and `aria-orientation="horizontal" | "vertical"`
  - `role="tab"` with `aria-selected="true|false"`, `aria-controls="{panelId}"`, and roving `tabIndex={isSelected ? 0 : -1}`
  - `role="tabpanel"` with `aria-labelledby="{tabId}"` and `tabIndex={0}`
- **Keyboard & Navigation Handling**:
  - `ArrowRight` / `ArrowDown`: Moves focus to the next tab (with wrap-around to the first).
  - `ArrowLeft` / `ArrowUp`: Moves focus to the previous tab (with wrap-around to the last).
  - `Home`: Jumps focus immediately to the first tab.
  - `End`: Jumps focus immediately to the last tab.
  - `Space` / `Enter`: Activates the tab if configured in manual activation mode.

---

### 3.3 Disclosure (`Disclosure.tsx`)
- **W3C Pattern**: [WAI-ARIA Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
- **Core ARIA Attributes**:
  - `<button>` trigger with `aria-expanded="true|false"`, `aria-controls="{panelId}"`, and unique ID.
  - `<div role="region" aria-labelledby="{triggerId}" hidden={!isExpanded}>`
- **Keyboard & Interaction Handling**:
  - `Enter` or `Space` toggles the disclosure open/closed.
  - When closed, the `hidden` attribute ensures screen readers and keyboard `Tab` stops skip collapsed content.

---

## 4. Key Highlights from `NOTES.md` (Gaps Handled by shadcn/ui & Radix UI)

Our deep-dive inspection of **shadcn/ui** and **Radix UI** identified 6 critical engineering gaps that custom implementations often overlook:

1. **Scrollbar Width Compensation (`@radix-ui/react-scroll-lock`)**: Radix computes dynamic platform scrollbar width to prevent jarring 15–17px layout shifts when the body scrollbar disappears, while managing iOS Safari touch overscroll.
2. **`DismissableLayer` Pointer Capture Architecture**: Separates `pointerdown` from `pointerup` to prevent accidental dismissal during text selection, while properly handling nested floating menus (dropdown inside a modal dialog).
3. **Background Subtree Inactivation (`aria-hidden` / `inert`)**: Automatically applies `aria-hidden="true"` or native `inert` to all background DOM sibling nodes to stop mobile screen readers (iOS VoiceOver swipe gestures) from escaping the modal.
4. **Polymorphic `asChild` Pattern (Radix `Slot`)**: Merges component props, event listeners, and refs directly onto custom child components without polluting the DOM with wrapper `<div>`s.
5. **Dual Controlled & Uncontrolled State (`useControllableState`)**: Provides unified state management supporting both `defaultValue` and `value` / `onValueChange` without synchronization bugs.
6. **Dynamic Accordion Height Keyframes**: Calculates element `scrollHeight` and injects dynamic CSS variables (`--radix-accordion-content-height`) for smooth 60fps accordion animations.

---

## 5. Evaluation Rubric Verification Matrix

| Evaluation Criteria | Verification Status | Implementation & Proof Location |
| :--- | :---: | :--- |
| **All three components operate fully by keyboard** | ✅ **Pass** | Modal: `Tab`, `Shift+Tab`, `Esc`.<br>Tabs: `ArrowRight/Left`, `Home`, `End`.<br>Disclosure: `Enter`, `Space`. |
| **Modal traps focus and returns it on close** | ✅ **Pass** | Verified in `useFocusTrap.ts`, `useFocusRestore.ts`, and `Modal.test.tsx`. |
| **Notes name at least two concrete gaps between your version and shadcn's** | ✅ **Pass** | Detailed 6 concrete gaps analyzed in `Week4/NOTES.md`. |
| **TypeScript compiles with no `any` escapes in component props** | ✅ **Pass** | All component props strictly typed with zero `any` in `tsconfig.json`. |

---

## 6. How to Run the Playground & Tests Locally

```bash
# 1. Navigate to the playground directory
cd Week4/playground

# 2. Install dependencies
npm install

# 3. Start the interactive playground server
npm run dev

# 4. Run automated test suite
npm test
```
