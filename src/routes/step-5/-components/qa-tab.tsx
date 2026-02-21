import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { quickQuestions } from './installation-data';

type Message = {
  type: 'user' | 'assistant';
  text: string;
};

type QaTabProps = {
  currentStepNumber: number;
};

/** Tab content with a chat-like Q&A interface and quick question chips. */
export const QaTab = function ({ currentStepNumber }: QaTabProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'assistant',
      text: "I'm your installation assistant. Ask me anything about the current step or tap a quick question below.",
    },
  ]);
  const [input, setInput] = useState('');

  const chips = quickQuestions[currentStepNumber] ?? [];

  const handleSend = function (question: string) {
    if (!question.trim()) return;

    const matchingChip = chips.find(function (c) {
      return c.question === question;
    });

    const answer = matchingChip
      ? matchingChip.answer
      : "That's a great question. Based on the Bosch SHPM88Z75N installation manual, I'd recommend consulting the detailed specification sheet for your specific situation. You can also check the Safety & Specs tab for reference.";

    setMessages(function (prev) {
      return [...prev, { type: 'user', text: question }, { type: 'assistant', text: answer }];
    });
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="space-y-3 p-4">
          {messages.map(function (msg, i) {
            const isUser = msg.type === 'user';
            return (
              <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    isUser
                      ? 'bg-primary/15 text-white/80 border border-primary/20'
                      : 'bg-white/5 text-white/60 border border-white/5'
                  }`}>
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick question chips */}
      {chips.length > 0 && (
        <div className="border-t border-white/5 px-4 py-2 flex flex-wrap gap-1.5">
          {chips.map(function (chip, i) {
            return (
              <button
                key={i}
                className="text-[11px] text-primary/70 border border-primary/20 bg-primary/5 rounded-full px-2.5 py-1 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                onClick={function () {
                  handleSend(chip.question);
                }}>
                {chip.question.length > 40 ? chip.question.slice(0, 40) + '...' : chip.question}
              </button>
            );
          })}
        </div>
      )}

      {/* Input */}
      <div className="border-t border-white/5 p-4 flex gap-2">
        <input
          type="text"
          value={input}
          placeholder="Ask a question..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-primary/30 transition-colors"
          onChange={function (e) {
            setInput(e.target.value);
          }}
          onKeyDown={function (e) {
            if (e.key === 'Enter') {
              handleSend(input);
            }
          }}
        />
        <Button
          size="sm"
          className="h-9 px-3 text-sm font-normal cursor-pointer"
          onClick={function () {
            handleSend(input);
          }}>
          Send
        </Button>
      </div>
    </div>
  );
};
