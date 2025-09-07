// src/components/ChatHeader.tsx
import { Bot } from 'lucide-react';

export default function ChatHeader() {
  return (
    <div className="border-b border-gray-800 px-4 py-3 flex items-center justify-between bg-gray-950/50 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <Bot className="w-5 h-5 text-black" />
        </div>
        <div>
          <h1 className="font-semibold">Chat Assistant</h1>
          <p className="text-xs text-gray-500">with Canvas Editor</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-xs text-gray-500">Online</span>
      </div>
    </div>
  );
}
