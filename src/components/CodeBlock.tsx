'use client';
import { useState, HTMLAttributes } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Code2 } from 'lucide-react';
import CanvasEditor from './CanvasEditor';

interface CodeBlockProps extends HTMLAttributes<HTMLElement> {
  inline?: boolean;
  language?: string;
  code: string;
}

export default function CodeBlock({ inline, language = 'text', code, ...props }: CodeBlockProps) {
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [currentCode, setCurrentCode] = useState(code);

  if (inline) {
    return (
      <code className="bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono text-gray-300" {...props}>
        {currentCode}
      </code>
    );
  }

  return (
    <>
      <div className="relative group my-4" {...props}>
        <div className="absolute -top-3 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button
            onClick={() => setIsCanvasOpen(true)}
            className="flex items-center gap-1 px-2 py-1 bg-black border border-gray-700 rounded text-xs text-gray-300 hover:bg-gray-900 hover:text-white transition-colors"
          >
            <Code2 className="w-3 h-3" />
            Open in Canvas
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-800">
          <SyntaxHighlighter
            style={atomDark}
            language={language}
            PreTag="div"
            customStyle={{ margin: 0, padding: '1rem', background: '#0a0a0a', fontSize: '0.875rem' }}
          >
            {currentCode}
          </SyntaxHighlighter>
        </div>
      </div>

      {isCanvasOpen && (
        <CanvasEditor
          code={currentCode}
          language={language}
          onClose={() => setIsCanvasOpen(false)}
          onUpdate={(newCode) => {
            setCurrentCode(newCode);
            setIsCanvasOpen(false);
          }}
        />
      )}
    </>
  );
}