'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Send,
  Square,
  Sparkles,
  ShieldAlert,
  Bot,
  User,
  Activity,
  RotateCcw,
  AlertTriangle,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { ThinkingIndicator } from '@/components/chat/ThinkingIndicator';
import { ScrollToBottom } from '@/components/chat/ScrollToBottom';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  intent?: string;
  confidence?: number;
  isPartial?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome',
    role: 'assistant',
    content:
      "Hello, I'm MindGuard AI. I'm here to listen, support your emotional wellbeing, and help you navigate stress in a safe, judgment-free space. How are you feeling today?",
    timestamp: 'Just now',
    intent: 'supportive_listening',
    confidence: 0.98,
  },
];

const SUGGESTIONS = [
  "I'm feeling overwhelmed with exam deadlines and burnout.",
  'Can you guide me through a quick 4-7-8 breathing exercise?',
  "I'm having a really hard day and don't know where to start.",
  "Test crisis alert: I'm feeling hopeless and can't go on.",
];

const STORAGE_KEY = 'mindguard_streaming_chat_v2';

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Could not load chat from localStorage', e);
      }
    }
    return INITIAL_MESSAGES;
  });

  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [detectedCrisis, setDetectedCrisis] = useState(false);

  // References
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [messages]);

  // Handle user scroll detection: release pin if user scrolls up
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const threshold = 40; // px from bottom
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    const atBottom = distanceFromBottom <= threshold;
    setIsAtBottom(atBottom);
  }, []);

  // Auto-scroll ONLY when pinned to bottom
  useEffect(() => {
    if (isAtBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isThinking, isAtBottom]);

  const scrollToBottom = () => {
    setIsAtBottom(true);
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Check crisis keywords for proactive UI banner
  const checkCrisisKeywords = (text: string) => {
    const patterns = [/suicid/i, /end\s+it\s+all/i, /hopeless/i, /can'?t\s+go\s+on/i, /kill\s+myself/i, /hurt\s+myself/i];
    return patterns.some((p) => p.test(text));
  };

  // Stop button handler: cancels HTTP stream and preserves partial state
  const handleStop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsGenerating(false);
    setIsThinking(false);

    // Mark current assistant message as stopped/partial if it was generating
    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === prev.length - 1 && msg.role === 'assistant'
          ? { ...msg, isPartial: true }
          : msg
      )
    );

    // Re-focus input
    textareaRef.current?.focus();
  }, []);

  // Send message and stream response
  const handleSendMessage = async (customQuery?: string) => {
    const query = (customQuery || input).trim();
    if (!query || isGenerating) return;

    if (checkCrisisKeywords(query)) {
      setDetectedCrisis(true);
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Update message state with user message
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsGenerating(true);
    setIsThinking(true);
    setIsAtBottom(true); // pin when sending a new message

    // Create AbortController for stream cancellation
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Placeholder bot message for streaming handoff
    const botMessageId = `bot-${Date.now()}`;
    let hasReceivedFirstToken = false;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content,
          })),
        }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Extract server intent headers
      const intentHeader = response.headers.get('X-MindGuard-Intent') || 'supportive_listening';
      const confidenceHeader = parseFloat(response.headers.get('X-MindGuard-Confidence') || '0.95');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        streamedContent += chunk;

        // Smooth handoff: as soon as first token arrives, dismiss thinking indicator
        if (!hasReceivedFirstToken) {
          hasReceivedFirstToken = true;
          setIsThinking(false);

          // Insert the bot message container seamlessly
          setMessages((prev) => [
            ...prev,
            {
              id: botMessageId,
              role: 'assistant',
              content: streamedContent,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              intent: intentHeader,
              confidence: confidenceHeader,
            },
          ]);
        } else {
          // Stream subsequent tokens into the message
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId ? { ...msg, content: streamedContent } : msg
            )
          );
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // Stream aborted by user via Stop button — already handled in handleStop
      } else {
        console.error('Chat stream error:', err);
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: 'assistant',
            content:
              'I experienced a momentary connection interruption. Please feel free to try again or reach out if you need immediate support.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } finally {
      setIsGenerating(false);
      setIsThinking(false);
      abortControllerRef.current = null;
    }
  };

  const handleResetConversation = () => {
    if (isGenerating) handleStop();
    setMessages(INITIAL_MESSAGES);
    setDetectedCrisis(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col h-[calc(100vh-8rem)] relative">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-400" />
              <span>MindGuard AI · Streaming Companion</span>
            </h1>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Server-Sent Streaming</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Streaming via Next.js 15 Route Handler with token-by-token rendering & mid-stream stop.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            href="/crisis"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>988 Crisis Triage</span>
          </Link>

          <button
            type="button"
            onClick={handleResetConversation}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white bg-slate-900 border border-white/10 hover:bg-slate-800 transition-colors"
            title="Reset conversation history"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Acute Crisis Warning Banner */}
      {detectedCrisis && (
        <div className="mt-3 p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in shadow-glow-crisis flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 animate-bounce" />
            <div className="text-xs">
              <strong className="font-bold">Acute Distress Detected:</strong> Free, 24/7 confidential crisis support is available.
            </div>
          </div>
          <Link
            href="/crisis"
            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-colors whitespace-nowrap"
          >
            Open 3-Action Crisis Modal →
          </Link>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto my-3 pr-1 sm:pr-2 space-y-4 relative"
      >
        {messages.map((message) => {
          const isUser = message.role === 'user';

          return (
            <div
              key={message.id}
              className={`flex items-start gap-2.5 sm:gap-3 ${
                isUser ? 'justify-end' : 'justify-start'
              } animate-fade-in`}
            >
              {!isUser && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0 mt-1 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[88%] sm:max-w-xl rounded-2xl p-3.5 sm:p-4 shadow-sm ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-900/90 text-slate-100 border border-white/10 rounded-tl-none glass-panel'
                }`}
              >
                {/* Intent Tag Header for bot */}
                {!isUser && message.intent && (
                  <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/10 text-[10px] text-indigo-300 font-mono">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      intent: {message.intent}
                    </span>
                    <span>conf: {Math.round((message.confidence || 0.95) * 100)}%</span>
                  </div>
                )}

                {/* Message Content */}
                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
                  {message.content}
                </p>

                {/* Partial indicator if stopped */}
                {message.isPartial && (
                  <div className="mt-2 text-[10px] text-amber-400 font-mono flex items-center gap-1">
                    <Square className="w-2.5 h-2.5 fill-current" />
                    <span>Generation stopped by user</span>
                  </div>
                )}

                {/* Timestamp */}
                <div
                  className={`mt-2 text-[10px] ${
                    isUser ? 'text-indigo-200 text-right' : 'text-slate-400'
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 flex-shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Smooth Thinking Indicator Handoff */}
        {isThinking && (
          <div className="flex items-start gap-3 justify-start animate-fade-in">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0 mt-1">
              <Bot className="w-4 h-4" />
            </div>
            <ThinkingIndicator isVisible={true} />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Floating Jump to Latest Button (Appears when user scrolls up) */}
      <ScrollToBottom
        isVisible={!isAtBottom}
        onClick={scrollToBottom}
        hasUnreadTokens={isGenerating}
      />

      {/* Suggestion Chips */}
      <div className="mb-2 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar flex-shrink-0">
        <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap pl-1">Suggested:</span>
        {SUGGESTIONS.map((sug, idx) => (
          <button
            key={idx}
            type="button"
            disabled={isGenerating}
            onClick={() => handleSendMessage(sug)}
            className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 hover:border-indigo-500/40 text-slate-300 hover:text-white text-xs whitespace-nowrap transition-colors flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Chat Input Bar & Stop Button */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="relative flex items-center gap-2 bg-slate-900/90 border border-white/15 rounded-2xl p-2 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all shadow-glass flex-shrink-0"
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder={
            isGenerating
              ? 'MindGuard is streaming... Click Stop to halt generation.'
              : "Share how you're feeling... (Press Enter to send)"
          }
          className="flex-1 bg-transparent border-0 px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none resize-none max-h-32"
          disabled={isGenerating}
        />

        {/* Dynamic Send / Stop Button ("Stop is a state problem") */}
        {isGenerating ? (
          <button
            type="button"
            onClick={handleStop}
            className="px-3.5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-glow-crisis transition-all duration-150 animate-fade-in"
            aria-label="Stop generation"
            title="Stop streaming response"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Stop</span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-glow-primary transition-all duration-150 flex items-center justify-center flex-shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Footer Status Indicators */}
      <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500 flex-shrink-0">
        <span className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isGenerating ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
          <span>{isGenerating ? 'Streaming active (SSE)' : 'Idle · Multi-turn memory saved'}</span>
        </span>
        <span className="hidden sm:inline">Auto-scroll releases on upward scroll</span>
      </div>

    </main>
  );
}
