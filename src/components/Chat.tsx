// src/components/Chat.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { Send } from 'lucide-react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import ChatHeader from './ChatHeader';

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
  console.log(messages)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && status === 'ready') {
      sendMessage({ text: input });
      setInput('');
    }
  };

  const isLoading = status === 'submitted' || status === 'streaming';

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <ChatHeader />
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={{
                id: message.id,
                role: message.role as 'user' | 'assistant',
                content: message.parts
                  .filter(part => part.type === 'text')
                  .map(part => part.text)
                  .join(''),
              }}
            />
          ))}
          
          {isLoading && <TypingIndicator />}
          
          {/* Stop button during streaming */}
          {status === 'streaming' && (
            <div className="flex justify-center mb-4">
              <button
                onClick={stop}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Stop Generation
              </button>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Form */}
      <div className="border-t border-gray-800 p-4 bg-gray-950/50 backdrop-blur">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              className="flex-1 bg-gray-900 border border-gray-800 rounded-full px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
              value={input}
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
              disabled={status !== 'ready'}
            />
            <button
              type="submit"
              className="bg-white text-black p-3 rounded-full hover:bg-gray-200 disabled:bg-gray-800 disabled:text-gray-600 transition-colors"
              disabled={status !== 'ready' || !input.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          
          {/* Status indicator */}
          <div className="mt-2 text-xs text-gray-500 text-center">
            {status === 'submitted' && 'Sending message...'}
            {status === 'streaming' && 'AI is responding...'}
            {status === 'error' && 'Something went wrong. Please try again.'}
          </div>
        </div>
      </div>
    </div>
  );
}
