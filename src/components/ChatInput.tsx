// src/components/ChatInput.tsx
'use client';
import { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-gray-800 p-4 bg-gray-950/50 backdrop-blur">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-3">
          <input
            className="flex-1 bg-gray-900 border border-gray-800 rounded-full px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
          />
          <button
            onClick={handleSubmit}
            className="bg-white text-black p-3 rounded-full hover:bg-gray-200 disabled:bg-gray-800 disabled:text-gray-600 transition-colors"
            disabled={disabled || !input.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
