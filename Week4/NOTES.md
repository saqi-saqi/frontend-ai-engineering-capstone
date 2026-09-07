# Week 4 Technical Notes: Hand-Rolled ARIA Components vs. shadcn/ui (Radix UI)

**Author**: Muhammad Saqib Tariq (Student ID: 04072213009)  
**Track**: Front-End AI Engineering / AI Fluency · Phase: Foundations  
**Topic**: Deep-Dive Architectural Comparison of Scratch-Built W3C ARIA Components vs. Production Primitives (shadcn/ui & Radix UI)  
**Deliverable Artifact**: `Week4/NOTES.md`  

---

## 1. Executive Summary

Building accessible components from scratch in React + TypeScript (Modal Dialog, Tabs with Roving Tabindex, and Disclosures) reveals the vast difference between implementing the *surface* W3C ARIA pattern and handling real-world production browser edge cases.

While our hand-rolled implementations successfully meet all core W3C ARIA Authoring Practices Guide (APG) requirements (keyboard traps, roving tabindex, `aria-expanded`, focus restoration), inspecting the open-source implementation of **shadcn/ui** (which packages **Radix UI** primitives like `@radix-ui/react-dialog`, `@radix-ui/react-tabs`, and `@radix-ui/react-accordion`) highlights critical architectural subtleties required for production-grade reliability.

---

## 2. Concrete Architectural Gaps: What shadcn/ui (Radix) Handled

Below is an in-depth analysis of **six concrete gaps** between our hand-rolled implementation and shadcn/ui's underlying Radix architecture.

---

### Gap 1: Scrollbar Width Measurement & Layout Shift Compensation

#### What We Implemented:
```typescript
// Our hand-rolled implementation:
document.body.style.overflow = 'hidden';
```
Setting `overflow: hidden` on `document.body` locks the page from scrolling when the modal opens. However, when the vertical browser scrollbar disappears, the entire background webpage shifts 15–17px to the right, causing a jarring visual layout jitter.

#### How shadcn/ui (Radix UI) Solves It:
Radix utilizes `@radix-ui/react-scroll-lock` which computes the exact platform scrollbar width before locking and injects dynamic compensating padding to `document.body` and any fixed-position headers:
```typescript
// Radix scroll lock mechanism:
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
document.body.style.paddingRight = `${scrollbarWidth}px`;
document.body.style.overflow = 'hidden';
```
Furthermore, Radix handles iOS mobile Safari bounce overscroll by intercepting `touchmove` events with `overscroll-behavior: contain` and preventing background rubber-banding.

---

### Gap 2: The `DismissableLayer` Architecture & Multi-Layer Stacking Contexts

#### What We Implemented:
```tsx
// Our hand-rolled implementation:
<div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
```
Our hand-rolled modal listens to click events directly on the backdrop container.

#### How shadcn/ui (Radix UI) Solves It:
Radix decouples floating layers into a dedicated **`DismissableLayer`** architecture with pointer capture:
1. **Pointer Down vs. Pointer Up Separation**: Radix distinguishes whether the mouse pointer initiated *inside* the dialog and released *outside* (e.g., selecting text inside the modal and dragging outside). A naive click listener falsely closes the modal on text drag; Radix only dismisses if both `pointerdown` and `pointerup` occur outside.
2. **Nested Layer Stacking**: When a user opens a Dropdown Menu or Select component *inside* a Modal Dialog, clicking outside the dropdown must only close the dropdown, not the parent modal. Radix maintains a global layer stack where only the topmost layer captures outside interactions.
3. **Event Bleeding Prevention**: Radix captures outside pointer events before they trigger click actions on underlying page buttons (`pointer-events: none` on background).

---

### Gap 3: Background Subtree Inactivation (`aria-hidden` / Native `inert` Attribute)

#### What We Implemented:
```tsx
// Our hand-rolled implementation:
<div role="dialog" aria-modal="true">
```
Our modal renders via React Portal (`createPortal`) to `document.body` and specifies `aria-modal="true"`.

#### How shadcn/ui (Radix UI) Solves It:
While `aria-modal="true"` instructs desktop screen readers (NVDA, JAWS) to restrict virtual navigation to the dialog, mobile screen readers (specifically **Apple VoiceOver on iOS**) frequently ignore `aria-modal="true"` during swipe gestures, allowing users to accidentally swipe focus to background headers and links.

Radix resolves this by automatically walking the root DOM and applying `aria-hidden="true"` (or the native browser `inert` attribute) to all DOM siblings outside the portal tree while the dialog is mounted:
```typescript
// Radix aria-hidden subtree walker:
import { hideOthers } from 'aria-hidden';
useEffect(() => {
  if (isOpen && dialogNode) {
    const unhide = hideOthers(dialogNode);
    return () => unhide();
  }
}, [isOpen]);
```
This guarantees that screen readers on any platform cannot navigate outside the modal.

---

### Gap 4: The Polymorphic `asChild` Pattern via Radix Slot Architecture

#### What We Implemented:
```tsx
// Our hand-rolled implementation:
<button onClick={() => setIsModalOpen(true)}>Open Modal</button>
```
In our hand-rolled code, trigger elements are hardcoded as `<button>` elements, or require custom wrapper `<div>`s that pollute the DOM and break flex/grid layouts.

#### How shadcn/ui (Radix UI) Solves It:
shadcn/ui leverages Radix's **`Slot`** primitive (`asChild` pattern):
```tsx
// shadcn/ui composable usage:
<DialogTrigger asChild>
  <Link href="/dashboard" className="custom-button">Dashboard</Link>
</DialogTrigger>
```
The `Slot` component clones the child element and merges its `ref`, event handlers (`onClick`, `onKeyDown`), and ARIA attributes (`aria-haspopup`, `aria-expanded`, `aria-controls`) directly onto the child without rendering an extra DOM wrapper.

---

### Gap 5: Dual Controlled & Uncontrolled State Synchronization (`useControllableState`)

#### What We Implemented:
```typescript
// Our hand-rolled Tabs:
const selectedIndex = activeTabId !== undefined
  ? tabs.findIndex((t) => t.id === activeTabId)
  : internalActiveIndex;
```
Our hand-rolled components use basic conditional checks to switch between internal state and controlled props.

#### How shadcn/ui (Radix UI) Solves It:
Radix standardizes state management across all components using a hardened internal hook: `useControllableState`.
```typescript
// Radix state management pattern:
const [value, setValue] = useControllableState({
  prop: controlledValue,
  defaultProp: defaultValue,
  onChange: onValueChange,
});
```
This enables users to use components as **uncontrolled by default** (`<Tabs defaultValue="overview">`) for simplicity, while seamlessly switching to **controlled mode** (`<Tabs value={activeTab} onValueChange={setActiveTab}>`) with zero synchronization lag or state bifurcation bugs.

---

### Gap 6: Smooth Zero-to-Auto Accordion Animations via CSS Variable Injection

#### What We Implemented:
```tsx
// Our hand-rolled Disclosure:
<div hidden={!isExpanded} className={isExpanded ? 'block' : 'hidden'}>
```
Our hand-rolled disclosure uses the standard HTML `hidden` attribute with basic CSS opacity transitions.

#### How shadcn/ui (Radix UI) Solves It:
CSS cannot natively animate `height: 0` to `height: auto`. Radix Accordion dynamically measures the scrollHeight of the inner content DOM node using a `ResizeObserver` and injects dynamic CSS custom properties:
```css
/* shadcn/ui Tailwind accordion animation: */
@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}
```
This delivers smooth, GPU-accelerated 60fps accordion expand/collapse animations without requiring fixed pixel heights.

---

## 3. Comparative Synthesis Table

| Architectural Feature | Hand-Rolled Implementation | shadcn/ui (Radix UI Primitives) | Engineering Significance |
| :--- | :--- | :--- | :--- |
| **Keyboard Trapping** | `useFocusTrap` (DOM query selector loop) | `@radix-ui/react-focus-scope` | Both trap Tab/Shift+Tab; Radix supports autofocus priority. |
| **Focus Restoration** | `useFocusRestore` (`document.activeElement`) | Automatic tracking via FocusGuards | Guarantees screen reader focus returns to trigger on Esc. |
| **Scroll Lock Layout Shift** | Basic `overflow: hidden` on body | Measures scrollbar width + dynamic padding-right | Eliminates 17px horizontal layout snap on modal open. |
| **Outside Pointer Handling** | Basic backdrop wrapper `onClick` | `DismissableLayer` with pointer capture | Prevents text drag dismissal & handles nested floating menus. |
| **Inert Subtree Management** | Relies on `aria-modal="true"` | Dynamic `aria-hidden` / `inert` on DOM siblings | Prevents iOS VoiceOver virtual cursor escape. |
| **DOM Polymorphism** | Fixed wrapper elements | `asChild` with Radix `Slot` primitive | Zero wrapper DOM pollution; clean props/ref merging. |
| **State Synchronization** | Manual conditional checks | `useControllableState` | Seamless support for both `value` and `defaultValue`. |
| **RTL Internationalization** | Hardcoded horizontal arrow keys | Reads `document.dir` & inverts ArrowLeft/Right | True bidirectional keyboard accessibility for Arabic/Hebrew. |

---

## 4. Key Takeaways & Decision Framework

1. **Why we build by hand first**: Building components from scratch gives engineers the mental model to understand ARIA roles (`role="dialog"`, `role="tab"`, `role="tabpanel"`, `role="region"`), keyboard contracts (roving tabindex, arrow navigation, Tab cycles), and focus lifecycles. Without this understanding, an engineer cannot effectively audit AI-generated code.
2. **Why we adopt shadcn/ui in production**: shadcn/ui provides the best of both worlds: unstyled, bulletproof, battle-tested accessibility primitives (Radix UI) paired with open, copy-pasteable Tailwind code that remains 100% transparent and customizable.
