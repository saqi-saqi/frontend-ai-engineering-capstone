export type Role = 'user' | 'bot' | 'system';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: string;
  intent?: string;
  confidence?: number;
  isStreaming?: boolean;
}

export interface TelemetryMetrics {
  ttft: number; // Time to First Token in ms
  tokensPerSec: number;
  totalTokens: number;
  currentIntent: string;
  confidenceScore: number;
  lastUpdated: string;
}

export interface ModelSettings {
  displayName: string;
  email: string;
  apiKey: string;
  model: string;
  temperature: number;
  simulationSpeed: 'fast' | 'realistic' | 'instant';
  enableSafetyGuardrails: boolean;
}

export interface HealthCheckData {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptimeSeconds: number;
  version: string;
  environment: string;
  system: {
    nodeVersion: string;
    platform: string;
    memoryUsageMB: number;
  };
  services: {
    apiGateway: { status: 'operational' | 'down'; latencyMs: number };
    llmInferenceBridge: { status: 'operational' | 'degraded'; latencyMs: number };
    crisisGuardrailEngine: { status: 'operational'; latencyMs: number };
  };
  envConfigured: {
    hasApiUrl: boolean;
    hasApiKey: boolean;
    appEnv: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  description: string;
  iconName: string;
  badge?: string;
  isEmergency?: boolean;
}
