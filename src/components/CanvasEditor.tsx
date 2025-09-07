// src/components/CanvasEditor.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { Code2, Copy, Check, Maximize2, Minimize2, X } from 'lucide-react';

interface CanvasEditorProps {
  code: string;
  language: string;
  onClose: () => void;
  onUpdate: (code: string) => void;
}

export default function CanvasEditor({ code, language, onClose, onUpdate }: CanvasEditorProps) {
  const [editableCode, setEditableCode] = useState(code);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Trigger slide-in animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editableCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newCode = editableCode.substring(0, start) + '  ' + editableCode.substring(end);
      setEditableCode(newCode);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Editor Container - Slide from right */}
      <div className={`ml-auto relative bg-black border-l border-gray-800 shadow-2xl flex flex-col h-full transition-transform duration-300 ease-out ${
        isFullscreen 
          ? 'w-full' 
          : 'w-full md:w-2/3 lg:w-1/2 xl:w-2/5'
      } ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-950">
          <div className="flex items-center gap-3">
            <Code2 className="w-5 h-5 text-gray-400" />
            <span className="text-white font-medium">Code Canvas</span>
            <span className="px-2 py-1 bg-gray-900 text-gray-400 text-xs rounded">
              {language || 'plaintext'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-800 rounded transition-colors"
              title="Copy code"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-gray-800 rounded transition-colors"
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 text-gray-400" />
              ) : (
                <Maximize2 className="w-4 h-4 text-gray-400" />
              )}
            </button>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-800 rounded transition-colors"
              title="Close"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Line Numbers */}
          <div className="bg-gray-950 p-4 text-gray-600 text-sm font-mono select-none overflow-y-auto border-r border-gray-800">
            {editableCode.split('\n').map((_, i) => (
              <div key={i} className="h-6 text-right pr-2 leading-6">
                {i + 1}
              </div>
            ))}
          </div>
          
          {/* Code Editor */}
          <div className="flex-1 relative overflow-hidden">
            <textarea
              ref={textareaRef}
              value={editableCode}
              onChange={(e) => setEditableCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 w-full h-full bg-black text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none leading-6"
              spellCheck={false}
              style={{ tabSize: 2 }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-800 bg-gray-950">
          <div className="text-xs text-gray-500">
            {editableCode.split('\n').length} lines • {editableCode.length} characters
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onUpdate(editableCode)}
              className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
