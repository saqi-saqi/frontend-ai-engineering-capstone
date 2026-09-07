import React, { useState } from 'react';

export const ShadcnComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dialog' | 'tabs' | 'disclosure'>('dialog');

  const comparisonData = {
    dialog: {
      title: 'Modal Dialog: Hand-Rolled vs shadcn/ui (Radix Dialog)',
      gaps: [
        {
          feature: '1. Scrollbar Shift Prevention (Scroll Locking)',
          handRolled: 'Locks overflow: hidden on body, basic scrollbar width calculation.',
          shadcn: 'Radix Dialog uses @radix-ui/react-scroll-lock, measuring window scrollbar width and injecting dynamic padding-right compensation on body to eliminate horizontal content jumping. Also disables mobile Safari bounce/pull-to-refresh.',
        },
        {
          feature: '2. DismissableLayer & Outside Pointer Interactions',
          handRolled: 'Basic backdrop click listener on wrapper div.',
          shadcn: 'Radix uses DismissableLayer architecture with pointer capture. Distinguishes between pointer-down vs pointer-up outside, handles nested layered menus (e.g. dropdown open inside dialog), and prevents event bleeding to underlying buttons.',
        },
        {
          feature: '3. Background Subtree Inactivation (inert / aria-hidden)',
          handRolled: 'Renders in Portal; relies on aria-modal="true" for screen readers.',
          shadcn: 'Radix automatically applies aria-hidden="true" or native inert attribute to all background sibling nodes in root DOM, preventing mobile screen readers (VoiceOver virtual swipe) from escaping the dialog.',
        },
        {
          feature: '4. Polymorphic asChild Pattern (Slot Architecture)',
          handRolled: 'Hardcoded <button> trigger and wrapper elements.',
          shadcn: 'Uses Radix Slot primitive allowing <DialogTrigger asChild>, cleanly merging props, event handlers, and refs onto any custom component without wrapper <div> markup pollution.',
        },
      ],
    },
    tabs: {
      title: 'Tabs: Hand-Rolled vs shadcn/ui (Radix Tabs)',
      gaps: [
        {
          feature: '1. Dual Controlled / Uncontrolled Synchronization',
          handRolled: 'Requires either activeTabId or internal state with conditional checks.',
          shadcn: 'Uses useControllableState custom hook, seamlessly supporting both defaultValue (uncontrolled) and value + onValueChange (controlled) without sync bugs.',
        },
        {
          feature: '2. Dynamic DOM Mutation & Tab Registration',
          handRolled: 'Expects static array of tabs [{ id, label, content }] passed as props.',
          shadcn: 'Uses React Context collection system (<TabsList><TabsTrigger value="a"/><TabsTrigger value="b"/></TabsList><TabsContent value="a">...</TabsContent>), allowing dynamic triggers and tab panels anywhere in the sub-tree.',
        },
        {
          feature: '3. Directional Flow (LTR / RTL) & Vertical Orientation',
          handRolled: 'Handles ArrowRight/Left and ArrowDown/Up with manual flags.',
          shadcn: 'Radix automatically reads document dir="rtl" and flips horizontal arrow key navigation (ArrowLeft becomes next, ArrowRight becomes prev), ensuring true international accessibility.',
        },
      ],
    },
    disclosure: {
      title: 'Disclosure / Accordion: Hand-Rolled vs shadcn/ui (Radix Accordion)',
      gaps: [
        {
          feature: '1. Single vs Multiple Collapsible Modes',
          handRolled: 'Single standalone disclosure container with binary boolean open/close state.',
          shadcn: 'Radix Accordion supports type="single" (collapsible: true|false) where opening one accordion item automatically closes siblings, as well as type="multiple" for independent multi-item toggling.',
        },
        {
          feature: '2. CSS Keyframe Height Animation Handling',
          handRolled: 'Uses binary hidden attribute with basic CSS opacity fade.',
          shadcn: 'Injects dynamic CSS variables (--radix-accordion-content-height) to enable buttery smooth zero-to-auto height CSS accordion animations without fixed pixel heights.',
        },
      ],
    },
  };

  const current = comparisonData[activeTab];

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span>🔍</span> Architectural Deep Dive: Hand-Rolled vs shadcn/ui
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            What production component primitives (Radix UI) handle that custom implementations miss.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          {(['dialog', 'tabs', 'disclosure'] as const).map((tabKey) => (
            <button
              key={tabKey}
              type="button"
              onClick={() => setActiveTab(tabKey)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                activeTab === tabKey
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tabKey}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-bold text-indigo-300">{current.title}</h4>

        <div className="grid grid-cols-1 gap-4">
          {current.gaps.map((gap, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs"
            >
              <div className="font-bold text-slate-200 text-sm">{gap.feature}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <span className="text-amber-400 font-semibold block mb-1">Our Hand-Rolled Version:</span>
                  <span className="text-slate-300 leading-relaxed">{gap.handRolled}</span>
                </div>
                <div className="bg-indigo-950/30 p-3 rounded-lg border border-indigo-500/30">
                  <span className="text-indigo-300 font-semibold block mb-1">shadcn/ui (Radix Primitive):</span>
                  <span className="text-slate-200 leading-relaxed">{gap.shadcn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
