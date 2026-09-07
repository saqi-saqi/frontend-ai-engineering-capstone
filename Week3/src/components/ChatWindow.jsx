import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';

export default function ChatWindow({ onMessageSent, settings, onTriggerCrisis }) {
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      role: 'bot',
      text: "Hello. I'm MindGuard, an AI conversational assistant designed to provide supportive, judgment-free listening. How are you feeling today?",
      timestamp: '12:00 PM',
      intent: 'CASUAL',
    },
  ]);

  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    { label: 'Casual Greeting', text: "Hey! How does MindGuard work?" },
    { label: 'Somatic Distress (Sub-Acute)', text: "I've been feeling so exhausted and overwhelmed with exams lately." },
    { label: '⚠️ Acute Crisis Trigger', text: "I just can't do this anymore, everything feels completely pointless tonight." },
    { label: 'Pseudo-Negation Test', text: "I'm not saying I'll do anything stupid, but I don't see any reason to stay." },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || isStreaming) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsStreaming(true);

    // Analyze intent & trigger metrics
    const lower = query.toLowerCase();
    const isCrisis = lower.includes("pointless tonight") || lower.includes("can't do this anymore") || lower.includes("reason to stay") || lower.includes("stupid");
    const isSubAcute = lower.includes("exhausted") || lower.includes("overwhelmed") || lower.includes("stress");

    const analysis = {
      intent_category: isCrisis ? 'ACUTE_CRISIS' : isSubAcute ? 'SUB_ACUTE_DISTRESS' : 'CASUAL',
      crisis_flag: isCrisis,
      confidence_score: isCrisis ? 0.94 : isSubAcute ? 0.88 : 0.95,
      negation_detected: lower.includes("not saying"),
      temporal_urgency: isCrisis ? 'IMMINENT' : 'NONE',
    };

    const startTime = performance.now();
    const isFast = settings.simulationSpeed !== 'slow';
    const ttftDelay = isFast ? 120 : 1800;

    setTimeout(() => {
      const ttft = Math.round(performance.now() - startTime);

      let responseText = '';
      if (isCrisis) {
        responseText = "I hear how much pain you're in, and I want you to be safe. Because your safety matters most, I'm opening our immediate care resources right now so you can connect with a trained counselor.";
      } else if (isSubAcute) {
        responseText = "It sounds like you are carrying a very heavy load right now. Feeling exhausted and overwhelmed can take a deep emotional and physical toll. What part of your day felt hardest today?";
      } else {
        responseText = "MindGuard uses NLP intent classification and real-time token streaming to deliver responsive, empathetic conversational support with continuous safety triage.";
      }

      const botMsgId = `bot-${Date.now()}`;
      const botMsg = {
        id: botMsgId,
        role: 'bot',
        text: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        intent: analysis.intent_category,
      };

      setMessages((prev) => [...prev, botMsg]);

      // Stream tokens incrementally
      const words = responseText.split(' ');
      let currentWordIndex = 0;

      const tokenInterval = setInterval(() => {
        if (currentWordIndex < words.length) {
          const chunk = words[currentWordIndex] + ' ';
          setMessages((prev) =>
            prev.map((m) => (m.id === botMsgId ? { ...m, text: m.text + chunk } : m))
          );
          currentWordIndex++;
        } else {
          clearInterval(tokenInterval);
          setIsStreaming(false);

          onMessageSent({
            ttft: ttft,
            tokensPerSec: Math.round((words.length / (words.length * 0.05 + 0.12))),
            totalTokens: words.length * 2,
            lastAnalysis: analysis,
          });

          if (isCrisis) {
            onTriggerCrisis(query);
          }
        }
      }, isFast ? 40 : 120);

    }, ttftDelay);
  };

  return (
    <div className="chat-layout">
      
      {/* Messages Scroll Area */}
      <div className="messages-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-row ${msg.role}`}>
            {msg.role === 'bot' && (
              <div className="message-avatar bot">
                <Bot size={18} />
              </div>
            )}

            <div className="message-bubble-wrapper">
              <div className={`message-bubble ${msg.role}`}>
                {msg.text || (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                    <Sparkles size={14} className="animate-spin" /> Generating stream...
                  </span>
                )}
              </div>

              <div className="message-meta">
                <span>{msg.timestamp}</span>
                {msg.intent && (
                  <span className={`badge ${msg.intent === 'ACUTE_CRISIS' ? 'badge-crisis' : msg.intent === 'SUB_ACUTE_DISTRESS' ? 'badge-subacute' : 'badge-casual'}`}>
                    {msg.intent}
                  </span>
                )}
              </div>
            </div>

            {msg.role === 'user' && (
              <div className="message-avatar user">
                <User size={18} />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar & Quick Prompts */}
      <div className="chat-input-bar">
        <div className="input-container">
          
          {/* Quick Prompts Strip */}
          <div className="quick-prompts-bar">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                type="button"
                className="quick-pill"
                onClick={() => handleSend(p.text)}
                disabled={isStreaming}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Textarea Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="input-box-wrapper"
          >
            <textarea
              className="chat-textarea"
              rows="1"
              placeholder="Type a message or click a test scenario above..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isStreaming}
            />
            <button
              type="submit"
              className="send-btn"
              disabled={!input.trim() || isStreaming}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}
