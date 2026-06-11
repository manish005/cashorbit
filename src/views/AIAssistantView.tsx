import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AIAssistantView() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your CashOrbit financial assistant. How can I help you manage your wealth today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: "I analyzed your transactions and current market trends. It looks like you're on track to meet your savings goal this month!", 
        sender: 'ai' 
      }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-h-[800px] glass-card rounded-3xl border border-white/5 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-brand-border bg-brand-surface/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent-purple to-accent-blue flex items-center justify-center p-0.5 shadow-lg">
             <div className="w-full h-full bg-brand-bg rounded-2xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-accent-purple" />
             </div>
          </div>
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              Orbit AI <Sparkles className="w-4 h-4 text-accent-blue" />
            </h2>
            <p className="text-sm text-brand-muted">Your intelligent financial companion</p>
          </div>
        </div>
        <div className="hidden sm:flex gap-2">
           <span className="text-xs font-medium px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-1">
             <Brain className="w-3 h-3 text-accent-blue"/> GPT-4o Powered
           </span>
           <span className="text-xs font-medium px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-1">
             <Sparkles className="w-3 h-3 text-accent-green"/> Live Data
           </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-white text-black' : 'bg-gradient-to-tr from-accent-purple to-accent-blue text-white'}`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div 
                className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-accent-blue text-white rounded-tr-sm shadow-md' 
                    : 'bg-white/5 border border-brand-border text-white rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-purple to-accent-blue text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white/5 border border-brand-border rounded-2xl rounded-tl-sm p-4 flex gap-1 items-center h-[52px]">
              <div className="w-2 h-2 bg-brand-muted rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-brand-muted rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-brand-muted rounded-full animate-bounce"></div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4 md:p-6 border-t border-brand-border bg-brand-surface/50">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your spending, budgets, or get financial advice..."
            className="w-full bg-brand-bg border border-brand-border rounded-full pl-6 pr-14 py-4 text-sm focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 p-2.5 bg-white text-black rounded-full hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:hover:bg-white"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
