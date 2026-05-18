import { useMemo, useState } from 'react';
import { MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { analyticsPrompts } from '../utils/demoData';
import type { ChatMessage } from '../types/platform';

const mockResponses: Record<string, string> = {
  'Why is maize recommended?': 'Maize is recommended because it shows strong profitability in the current seasonal window and responds well to available irrigation.',
  'Which crop has lowest risk?': 'Wheat has the lowest predicted risk today due to steady weather compatibility and solid historical yields.',
  'How can I reduce water usage?': 'Switch to drip irrigation and prioritize low water crops during drier weeks to optimize usage.',
  'Which crop is most profitable?': 'Wheat continues to rank highest for profit potential under current district and weather conditions.',
};

const AIChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'assistant-1', role: 'assistant', text: 'Hi, I can help explain crop selection, water strategy, and risk signals.', createdAt: new Date().toISOString() },
  ]);
  const [input, setInput] = useState('');

  const submitMessage = () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', text: input, createdAt: new Date().toISOString() };
    const assistantReply: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: mockResponses[input] || 'I am analyzing the data and will answer shortly.',
      createdAt: new Date().toISOString(),
    };
    setMessages((current) => [...current, userMessage, assistantReply]);
    setInput('');
  };

  const suggestions = useMemo(() => analyticsPrompts, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4">
      {open && (
        <div className="w-[320px] rounded-[2rem] border border-white/10 bg-slate-950/95 p-4 shadow-[0_30px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 pb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">AI assistant</p>
              <h4 className="text-lg font-semibold text-white">Ask KissanAI</h4>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="text-slate-300 transition hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="max-h-72 space-y-3 overflow-y-auto pr-1 pb-2 text-sm">
            {messages.map((message) => (
              <div key={message.id} className={`rounded-3xl p-3 ${message.role === 'assistant' ? 'bg-slate-900/90 text-slate-200' : 'bg-emerald-400/10 text-emerald-200'}`}>
                <p className="font-medium">{message.role === 'assistant' ? 'Assistant' : 'You'}</p>
                <p className="mt-2 leading-6">{message.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-3">
            <div className="grid gap-2">
              {suggestions.map((prompt) => (
                <button
                  key={prompt.id}
                  type="button"
                  onClick={() => {
                    setInput(prompt.question);
                    submitMessage();
                  }}
                  className="rounded-3xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-300 transition hover:bg-emerald-400/10"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-3xl border border-white/10 bg-slate-900/80 px-3 py-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about crops, water, or risk..."
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
              />
              <button type="button" onClick={submitMessage} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 text-slate-950 transition hover:bg-emerald-300">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-300 text-slate-950 shadow-2xl shadow-emerald-500/25 transition hover:scale-105"
        aria-label="Open AI assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
};

export default AIChatAssistant;
