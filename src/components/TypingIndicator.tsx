// src/components/TypingIndicator.tsx
import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
        <Bot className="w-5 h-5 text-gray-400" />
      </div>
      <div className="bg-gray-900 rounded-2xl rounded-tl-sm px-4 py-3 border border-gray-800">
        <div className="flex gap-1">
          <span 
            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" 
            style={{ animationDelay: '0ms' }} 
          />
          <span 
            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" 
            style={{ animationDelay: '150ms' }} 
          />
          <span 
            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" 
            style={{ animationDelay: '300ms' }} 
          />
        </div>
      </div>
    </div>
  );
}
