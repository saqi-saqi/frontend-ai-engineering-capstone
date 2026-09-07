import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import CrisisModal from './components/CrisisModal';
import SettingsDrawer from './components/SettingsDrawer';
import MetricsInspector from './components/MetricsInspector';
import AIDevelopmentLog from './components/AIDevelopmentLog';
import { MessageSquare, Settings, BookOpen, ShieldAlert, Cpu, HeartHandshake } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'devlog'
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [crisisTriggerText, setCrisisTriggerText] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [settings, setSettings] = useState({
    displayName: 'Saqib',
    email: 'engineer@mindguard.ai',
    apiKey: 'sk-ant-api03-99887766554433221100aa',
    model: 'claude-3-5-sonnet',
    simulationSpeed: 'fast',
  });

  const [telemetry, setTelemetry] = useState({
    ttft: 120,
    tokensPerSec: 38,
    totalTokens: 142,
    lastAnalysis: null,
  });

  const handleMessageMetrics = (data) => {
    setTelemetry((prev) => ({
      ...prev,
      ttft: data.ttft,
      tokensPerSec: data.tokensPerSec,
      totalTokens: prev.totalTokens + data.totalTokens,
      lastAnalysis: data.lastAnalysis,
    }));
  };

  const handleTriggerCrisis = (text) => {
    setCrisisTriggerText(text);
    setIsCrisisModalOpen(true);
  };

  return (
    <div className="app-shell">
      
      {/* Top Navbar */}
      <header className="top-navbar">
        <div className="brand-section">
          <div className="logo-badge">MG</div>
          <div className="brand-title">
            <h1>MindGuard AI · Companion & Triage Interface</h1>
            <p>Front-End AI Engineering Capstone · Week 3 Independent Build</p>
          </div>
        </div>

        <nav className="nav-controls">
          <button
            className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare size={16} /> Live Chat & Triage
          </button>
          
          <button
            className={`tab-btn ${activeTab === 'devlog' ? 'active' : ''}`}
            onClick={() => setActiveTab('devlog')}
          >
            <BookOpen size={16} /> AI Dev Log & Prompts
          </button>

          <button
            className="tab-btn"
            style={{ color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.3)' }}
            onClick={() => handleTriggerCrisis("Manual Emergency Test Override")}
          >
            <ShieldAlert size={16} /> Test Crisis Modal
          </button>

          <button
            className="tab-btn"
            onClick={() => setIsSettingsOpen(true)}
            aria-label="Open model settings"
          >
            <Settings size={16} /> Model Settings
          </button>
        </nav>
      </header>

      {/* Main Workspace */}
      <main className="main-workspace">
        {activeTab === 'chat' ? (
          <>
            <ChatWindow
              onMessageSent={handleMessageMetrics}
              settings={settings}
              onTriggerCrisis={handleTriggerCrisis}
            />
            <MetricsInspector
              metrics={telemetry}
              lastAnalysis={telemetry.lastAnalysis}
            />
          </>
        ) : (
          <AIDevelopmentLog />
        )}
      </main>

      {/* Crisis Triage Modal Overlay */}
      <CrisisModal
        isOpen={isCrisisModalOpen}
        onClose={() => setIsCrisisModalOpen(false)}
        triggerText={crisisTriggerText}
      />

      {/* Model & Config Settings Drawer */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSaveSettings={(newSettings) => setSettings(newSettings)}
        initialSettings={settings}
      />

    </div>
  );
}
