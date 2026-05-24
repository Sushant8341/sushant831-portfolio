import React, { useState, useMemo } from 'react';
import { Columns, FileText, Layout, Play, RefreshCcw } from 'lucide-react';

const INITIAL_MD = `# Markdown Workspace

## 🚀 Live Engineering Experiment

Feel free to overwrite or edit this raw content! 

- **Direct State Processing**: Instantly compiled into semantic JSX.
- **Accurate Style Guides**: Styled dynamically using high-contrast design principles.
- **Micro-Frameworks**: Built as lightweight modular components.

> "Simplicity is the ultimate sophistication." — Leonardo da Vinci

### Project Scope Checkbox
- [x] Integrate HTML Canvas interactive physics sandbox
- [x] Configure responsive sidebars and guestbooks
- [ ] Connect custom terminal pipelines

***
*Enjoy editing this block to see real-time updates!*`;

export default function MarkdownInteractive() {
  const [markdown, setMarkdown] = useState(INITIAL_MD);
  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split');

  // Simple direct translation helper for key Markdown elements to React representation safely
  const renderedHTML = useMemo(() => {
    const lines = markdown.split('\n');
    let insideCodeBlock = false;
    let codeBlockContent: string[] = [];

    return lines.map((line, idx) => {
      // Toggle Code Blocks
      if (line.trim().startsWith('```')) {
        if (insideCodeBlock) {
          insideCodeBlock = false;
          const blockText = codeBlockContent.join('\n');
          codeBlockContent = [];
          return (
            <pre key={`code-${idx}`} className="bg-stone-900 text-stone-100 font-mono text-xs p-3 rounded-md overflow-x-auto my-2 border border-stone-800">
              <code>{blockText}</code>
            </pre>
          );
        } else {
          insideCodeBlock = true;
          return null;
        }
      }

      if (insideCodeBlock) {
        codeBlockContent.push(line);
        return null;
      }

      const trimmed = line.trim();

      // Horizontal dividers
      if (trimmed === '***' || trimmed === '---' || trimmed === '___') {
        return <hr key={idx} className="border-t border-stone-200/80 my-4" />;
      }

      // Headings 1-3
      if (trimmed.startsWith('# ')) {
        return (
          <h1 key={idx} className="text-xl font-bold font-display tracking-tight text-stone-900 mt-4 mb-2">
            {parseInlines(trimmed.slice(2))}
          </h1>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-base font-bold font-display text-stone-800 mt-3 mb-1.5 flex items-center gap-1.5">
            {parseInlines(trimmed.slice(3))}
          </h2>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-sm font-bold font-display text-stone-700 mt-2.5 mb-1.5">
            {parseInlines(trimmed.slice(4))}
          </h3>
        );
      }

      // Blockquotes
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={idx} className="border-l-4 border-stone-400/80 pl-3.5 italic text-stone-600 my-3 text-xs leading-relaxed">
            {parseInlines(trimmed.slice(2))}
          </blockquote>
        );
      }

      // Checkboxes
      if (trimmed.startsWith('- [ ] ') || trimmed.startsWith('- [x] ')) {
        const checked = trimmed.startsWith('- [x] ');
        return (
          <label key={idx} className="flex items-start gap-2 text-xs text-stone-700 my-1 cursor-default">
            <input
              type="checkbox"
              checked={checked}
              readOnly
              className="mt-0.5 rounded border-stone-300 text-stone-900 focus:ring-0 w-3.5 h-3.5 accent-stone-800"
            />
            <span className={checked ? 'line-through text-stone-400' : ''}>
              {parseInlines(trimmed.slice(6))}
            </span>
          </label>
        );
      }

      // Unordered list items
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return (
          <ul key={idx} className="list-disc pl-5 my-1 text-xs text-stone-700">
            <li>{parseInlines(trimmed.slice(2))}</li>
          </ul>
        );
      }

      // Default paragraph (non-empty)
      if (trimmed !== '') {
        return (
          <p key={idx} className="text-xs text-stone-600 leading-relaxed my-1.5">
            {parseInlines(trimmed)}
          </p>
        );
      }

      // Safe spacer line
      return <div key={idx} className="h-2" />;
    });
  }, [markdown]);

  // Inline styling parser (*italic*, **bold**, `code`)
  function parseInlines(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    let currentText = text;

    // Direct simple replacement sequences
    while (currentText.length > 0) {
      const boldMatch = currentText.match(/\*\*(.*?)\*\*/);
      const italicMatch = currentText.match(/\*(.*?)\*/);
      const codeMatch = currentText.match(/`(.*?)`/);

      const matches = [
        { type: 'bold', index: boldMatch?.index ?? -1, length: boldMatch ? boldMatch[0].length : 0, val: boldMatch ? boldMatch[1] : '' },
        { type: 'italic', index: italicMatch?.index ?? -1, length: italicMatch ? italicMatch[0].length : 0, val: italicMatch ? italicMatch[1] : '' },
        { type: 'code', index: codeMatch?.index ?? -1, length: codeMatch ? codeMatch[0].length : 0, val: codeMatch ? codeMatch[1] : '' },
      ].filter(m => m.index !== -1).sort((a, b) => a.index - b.index);

      if (matches.length === 0) {
        parts.push(currentText);
        break;
      }

      const earliest = matches[0];
      if (earliest.index > 0) {
        parts.push(currentText.substring(0, earliest.index));
      }

      if (earliest.type === 'bold') {
        parts.push(<strong key={currentText + earliest.index} className="font-bold text-stone-900">{earliest.val}</strong>);
      } else if (earliest.type === 'italic') {
        parts.push(<em key={currentText + earliest.index} className="italic text-stone-700">{earliest.val}</em>);
      } else if (earliest.type === 'code') {
        parts.push(<code key={currentText + earliest.index} className="font-mono text-[10.5px] bg-stone-100 p-0.5 px-1 rounded text-neutral-800">{earliest.val}</code>);
      }

      currentText = currentText.substring(earliest.index + earliest.length);
    }

    return parts.length > 0 ? parts : [text];
  }

  const resetTemplate = () => {
    setMarkdown(INITIAL_MD);
  };

  return (
    <div className="flex flex-col gap-3 font-sans" id="interactive-markdown">
      {/* Modes bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-none">
          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold rounded-none cursor-pointer transition-all ${
              viewMode === 'split' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Split Editor</span>
          </button>
          <button
            onClick={() => setViewMode('edit')}
            className={`flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold rounded-none cursor-pointer transition-all ${
              viewMode === 'edit' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Write Markdown</span>
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold rounded-none cursor-pointer transition-all ${
              viewMode === 'preview' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>HTML Preview</span>
          </button>
        </div>

        <button
          onClick={resetTemplate}
          className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-slate-900 transition-colors bg-white px-2 py-1 rounded-none border border-slate-200 cursor-pointer"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Editor & Render Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 min-h-[300px]">
        {/* Editor (Shown in 'split' or 'edit' modes) */}
        {(viewMode === 'split' || viewMode === 'edit') && (
          <div className={`flex flex-col border border-slate-200 rounded-none overflow-hidden bg-white ${
            viewMode === 'edit' ? 'col-span-2' : ''
          }`}>
            <div className="bg-slate-50 px-3 py-1.5 border-b border-slate-150 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500">Editor Workspace</span>
              <span className="text-[9px] text-slate-400 font-mono">Lines: {markdown.split('\n').length}</span>
            </div>
            <textarea
              className="flex-grow w-full p-3 font-mono text-[11px] leading-relaxed text-slate-800 bg-white border-0 focus:ring-0 focus:outline-none resize-none min-h-[250px] max-h-[350px] h-full"
              value={markdown}
              placeholder="Start drafting markdown syntax here..."
              onChange={e => setMarkdown(e.target.value)}
            />
          </div>
        )}

        {/* Live Preview (Shown in 'split' or 'preview' modes) */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div className={`flex flex-col border border-slate-200 rounded-none overflow-hidden bg-slate-50/20 ${
            viewMode === 'preview' ? 'col-span-2' : ''
          }`}>
            <div className="bg-slate-50 px-3 py-1.5 border-b border-slate-150 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500">Live Rendered Document</span>
              <span className="flex items-center gap-1 text-[9px] text-blue-600 font-mono font-bold uppercase tracking-wider">
                <Play className="w-2.5 h-2.5 fill-blue-600 stroke-blue-600" /> Compiled OK
              </span>
            </div>
            <div className="flex-grow p-4 overflow-y-auto bg-white min-h-[250px] max-h-[350px] border-t-0 select-text text-left">
              <div className="max-w-none pr-1">
                {renderedHTML}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
