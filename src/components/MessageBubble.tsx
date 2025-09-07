import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import { Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface MessageBubbleProps {
  message: Message;
}

/**
 * Split markdown into segments: either a code block or text
 */
function parseMarkdownSegments(markdown: string) {
  const regex = /(```(\w+)?\n[\s\S]*?```)/g;
  const segments: { type: 'code' | 'text'; content: string; language?: string }[] = [];
  let lastIndex = 0;

  let match;
  while ((match = regex.exec(markdown)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: markdown.slice(lastIndex, match.index),
      });
    }
    const lang = match[2] || 'text';
    const codeContent = match[1].replace(/```(\w+)?\n([\s\S]*?)```/, '$2');
    segments.push({ type: 'code', content: codeContent, language: lang });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < markdown.length) {
    segments.push({ type: 'text', content: markdown.slice(lastIndex) });
  }

  return segments;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const segments = parseMarkdownSegments(message.content);

  return (
    <div className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {message.role === 'assistant' && (
        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="w-5 h-5 text-gray-400" />
        </div>
      )}

      <div
        className={`max-w-[85%] md:max-w-[75%] ${
          message.role === 'user'
            ? 'bg-white text-black rounded-2xl rounded-tr-sm px-4 py-3'
            : 'bg-gray-900 text-gray-100 rounded-2xl rounded-tl-sm border border-gray-800'
        }`}
      >
        <div className={message.role === 'assistant' ? 'prose prose-invert max-w-none p-4' : ''}>
          {segments.map((seg, idx) => {
            if (seg.type === 'code') {
              return <CodeBlock key={idx} code={seg.content} language={seg.language} />;
            } else {
              return <ReactMarkdown key={idx}>{seg.content}</ReactMarkdown>;
            }
          })}
        </div>
      </div>

      {message.role === 'user' && (
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <User className="w-5 h-5 text-black" />
        </div>
      )}
    </div>
  );
}