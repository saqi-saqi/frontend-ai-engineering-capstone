'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Send,
  Sparkles,
  ShieldAlert,
  Bot,
  User,
  Activity,
  Zap,
  RotateCcw,
  AlertTriangle,
  Flame,
} from 'lucide-react';
import { ChatMessage } from '@/lib/types';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'bot',
    content:
      "Hello Saqib. I'm MindGuard AI, your supportive companion. I'm here to listen, provide coping strategies, and support your emotional wellbeing in a safe, judgment-free space. How are you feeling today?",
    timestamp: '10:00 AM',
    intent: 'greeting_support',
    confidence: 0.98,
  },
];

const SUGGESTIONS = [
  "I'm feeling overwhelmed with exam pressure and coding deadlines.",
  'Can you guide me through a 2-minute 4-7-8 breathing exercise?',
  "I'm feeling really hopeless and don't know who to turn to.",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentTTFT, setCurrentTTFT] = useState(120);
  const [tokensPerSec, setTokensPerSec] = useState(38);
  const [detectedCrisis, setDetectedCrisis] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  // Check for crisis trigger words
  const checkCrisisKeywords = (text: string) => {
    const crisisPatterns = [
      /suicid/i,
      /end\s+it\s+all/i,
      /hopeless/i,
      /can'?t\s+go\s+on/i,
      /hurt\s+myself/i,
      /kill\s+myself/i,
      /no\s+point\s+in\s+living/i,
    ];
    return crisisPatterns.some((pattern) => pattern.test(text));
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isStreaming) return;

    const isCrisis = checkCrisisKeywords(query);
    if (isCrisis) {
      setDetectedCrisis(true);
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsStreaming(true);

    // Simulated Bot streaming response
    const botResponseText = isCrisis
      ? "I hear how much pain and distress you are experiencing right now. Please know that you do not have to carry this alone. I want to make sure you are safe. Free, confidential support is available right this second with compassionate crisis counselors."
      : `Thank you for sharing that with me. Acknowledging these feelings is a meaningful first step. Let's break this down together so it feels manageable. When you notice these overwhelming feelings arising, where do you physically feel the tension in your body?`;

    const botMessageId = `bot-${Date.now()}`;
    const initialBotMessage: ChatMessage = {
      id: botMessageId,
      role: 'bot',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      intent: isCrisis ? 'crisis_acute_distress' : 'active_listening_empathy',
      confidence: isCrisis ? 0.99 : 0.94,
      isStreaming: true,
    };

    setMessages((prev) => [...prev, initialBotMessage]);

    // Token streaming simulation
    const words = botResponseText.split(' ');
    let currentText = '';

    for (let i = 0; i < words.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 35));
      currentText += (i === 0 ? '' : ' ') + words[i];

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, content: currentText, isStreaming: i < words.length - 1 }
            : msg
        )
      );
    }

    setIsStreaming(false);
  };

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col h-[calc(100vh-8rem)]">
      
      {/* Header bar with crisis quick alert */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-400" />
              <span>MindGuard AI Companion Chat</span>
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Streaming Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time SSE token streaming simulation with Time to First Token (TTFT) tracking.
          </p>
        </div>

        {/* Action pills */}
        <div className="flex items-center gap-2">
          <Link
            href="/crisis"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-colors"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Emergency 988 Triage</span>
          </Link>
          <Link
            href="/telemetry"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-colors"
          >
            <Activity className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Telemetry</span>
          </Link>
        </div>
      </div>

      {/* Crisis Warning Banner if triggered */}
      {detectedCrisis && (
        <div className="mt-4 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in shadow-glow-crisis">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 animate-bounce" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold">Acute Distress / Crisis Intent Detected.</span> Immediate support is ready for you.
            </div>
          </div>
          <Link
            href="/crisis"
            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition-colors whitespace-nowrap"
          >
            Open 3-Action Crisis Support →
          </Link>
        </div>
      )}

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto my-4 pr-1 sm:pr-2 space-y-4">
        {messages.map((message) => {
          const isUser = message.role === 'user';

          return (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-xl rounded-2xl p-4 shadow-sm ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-900/90 text-slate-200 border border-white/10 rounded-tl-none glass-panel'
                }`}
              >
                {/* Intent Badge for bot messages */}
                {!isUser && message.intent && (
                  <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/10 text-[10px] text-indigo-300 font-mono">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      intent: {message.intent}
                    </span>
                    <span>conf: {Math.round((message.confidence || 0.95) * 100)}%</span>
                  </div>
                )}

                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                  {message.isStreaming && (
                    <span className="inline-block w-1.5 h-4 ml-1 bg-indigo-400 animate-pulse align-middle" />
                  )}
                </p>

                <div
                  className={`mt-2 text-[10px] ${
                    isUser ? 'text-indigo-200 text-right' : 'text-slate-400'
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 flex-shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">Suggested:</span>
        {SUGGESTIONS.map((suggestion, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(suggestion)}
            className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 hover:border-indigo-500/40 text-slate-300 hover:text-white text-xs whitespace-nowrap transition-colors flex-shrink-0"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input Control Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="relative flex items-center gap-2 bg-slate-900/90 border border-white/15 rounded-2xl p-2 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all shadow-glass"
      >
        <textarea
          rows={1}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Share how you're feeling... (e.g. Try typing crisis test words or asking for coping techniques)"
          className="flex-1 bg-transparent border-0 px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none resize-none"
          disabled={isStreaming}
        />

        <button
          type="submit"
          disabled={!inputValue.trim() || isStreaming}
          className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-glow-primary transition-all flex items-center justify-center flex-shrink-0"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Status Bar */}
      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          TTFT: ~120ms streaming simulation
        </span>
        <span className="hidden sm:inline">WCAG 2.1 AA Screen Reader Accessible</span>
      </div>

    </main>
  );
}
