'use client';

import React, { useState, useMemo } from 'react';
import { Check, Copy } from 'lucide-react';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ code, language = 'javascript', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const highlightedCode = useMemo(() => {
    try {
      const lang = language.toLowerCase() === 'ts' ? 'typescript' : language.toLowerCase() === 'js' ? 'javascript' : language.toLowerCase();
      return hljs.highlight(code, { language: lang }).value;
    } catch (err) {
      return code;
    }
  }, [code, language]);

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 font-mono text-sm leading-relaxed shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-950 text-xs text-slate-400 select-none">
        <span>{title || language.toUpperCase()}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition active:scale-95 cursor-pointer text-slate-300 hover:text-slate-100"
          title="Копировать код"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Скопировано</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Копировать</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto">
        <pre className="whitespace-pre">
          <code 
            className={`hljs language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </div>
  );
}
