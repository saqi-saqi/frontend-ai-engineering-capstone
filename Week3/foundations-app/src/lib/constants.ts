import { NavItem, ModelSettings } from './types';

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Overview',
    href: '/',
    description: 'System dashboard and architecture status',
    iconName: 'LayoutDashboard',
  },
  {
    label: 'Live Chat',
    href: '/chat',
    description: 'Real-time conversational companion & token streaming',
    iconName: 'MessageSquare',
    badge: 'Interactive',
  },
  {
    label: 'Crisis Triage',
    href: '/crisis',
    description: 'Hick\'s Law 3-Action Emergency intervention',
    iconName: 'ShieldAlert',
    isEmergency: true,
  },
  {
    label: 'Telemetry',
    href: '/telemetry',
    description: 'TTFT, token generation throughput & metrics',
    iconName: 'Activity',
  },
  {
    label: 'Settings',
    href: '/settings',
    description: 'Model drawer, API keys & WCAG AA validation',
    iconName: 'Settings',
  },
  {
    label: 'Health Check',
    href: '/health',
    description: 'Live server data fetching & runtime diagnostics',
    iconName: 'HeartPulse',
    badge: 'Live Data',
  },
  {
    label: 'Dev Log',
    href: '/devlog',
    description: 'AI prompting logs and human code diffs',
    iconName: 'FileCode',
  },
];

export const DEFAULT_SETTINGS: ModelSettings = {
  displayName: 'Saqib Tariq',
  email: 'engineer@mindguard.ai',
  apiKey: 'sk-ant-api03-99887766554433221100aa',
  model: 'claude-3-5-sonnet-20241022',
  temperature: 0.7,
  simulationSpeed: 'fast',
  enableSafetyGuardrails: true,
};

export const CRISIS_HOTLINES = [
  {
    name: 'National Suicide & Crisis Lifeline',
    country: 'United States & Canada',
    number: '988',
    type: 'Call or Text 24/7',
    description: 'Free and confidential support for people in distress and prevention resources.',
  },
  {
    name: 'Crisis Text Line',
    country: 'US, UK, Canada',
    number: '741741',
    actionText: 'Text HOME to 741741',
    type: 'SMS Only 24/7',
    description: 'Connect with a volunteer crisis counselor 24/7.',
  },
  {
    name: 'The Trevor Project (LGBTQ+ Youth)',
    country: 'United States',
    number: '1-866-488-7386',
    type: 'Call & Text 24/7',
    description: 'Suicide prevention and crisis intervention for LGBTQ young people.',
  },
  {
    name: 'Samaritans Helpline',
    country: 'United Kingdom',
    number: '116 123',
    type: 'Free call 24/7',
    description: 'Whatever you\'re going through, a Samaritan will face it with you.',
  },
  {
    name: 'Umang Mental Health Helpline',
    country: 'Pakistan',
    number: '0311-7786264',
    type: 'Call Mon-Sun',
    description: 'Licensed clinical psychologist support and crisis counseling in Pakistan.',
  },
];
