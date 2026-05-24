import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, ShieldAlert, MonitorPlay, HelpCircle } from 'lucide-react';
import { TerminalLine } from '../types';
import { PERSONAL_INFO, SKILLS, PROJECTS } from '../data';

const WELCOME_MESSAGES: TerminalLine[] = [
  { text: 'SYSTEM INFRASTRUCTURE ONLINE // PORTFOLIO SHELL v2.4.0', type: 'success' },
  { text: 'Type "help" to display a index of available diagnostic commands.', type: 'warning' },
  { text: '', type: 'output' }
];

const QUOTES = [
  "Talk is cheap. Show me the code. — Linus Torvalds",
  "Programs must be written for people to read, and only incidentally for machines to execute. — Abelson & Sussman",
  "The best way to predict the future is to invent it. — Alan Kay",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler"
];

export default function Terminal() {
  const [history, setHistory] = useState<TerminalLine[]>(WELCOME_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep terminal scrolled to the bottom during terminal logs
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputValue.trim().toLowerCase();
    setInputValue('');

    if (!command) return;

    const newHistory = [...history, { text: `guest@alex-river:~$ ${inputValue}`, type: 'input' as const }];

    let response: TerminalLine[] = [];

    switch (command) {
      case 'help':
        response = [
          { text: 'SUPPORTED SHELL COMMAND DIAGNOSTICS:', type: 'success' },
          { text: '  bio        - Learn more about Alex\'s background & design pillars', type: 'output' },
          { text: '  skills     - Render high-performance skill indicators directly', type: 'output' },
          { text: '  projects   - Show current list of live production components', type: 'output' },
          { text: '  contact    - Print personal social hooks & digital coordinates', type: 'output' },
          { text: '  time       - Display real-time UTC timestamp metrics', type: 'output' },
          { text: '  quote      - Emit an inspiring developer philosophy quote', type: 'output' },
          { text: '  matrix     - Inject lightweight cascade streams in the terminal', type: 'success' },
          { text: '  clear      - Evacuate history logs from the workspace console', type: 'output' }
        ];
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'bio':
        response = [
          { text: `NAME: ${PERSONAL_INFO.name}`, type: 'success' },
          { text: `ROLE: ${PERSONAL_INFO.title}`, type: 'output' },
          { text: `BIO: ${PERSONAL_INFO.bio}`, type: 'output' },
          { text: `LOCATION: ${PERSONAL_INFO.currentLocation}`, type: 'output' },
          { text: `STATUS: ${PERSONAL_INFO.openToWork ? 'ACTIVE (Open to Work)' : 'RESTRICTED (Unavailable)'}`, type: 'warning' }
        ];
        break;

      case 'skills':
        response = [
          { text: 'PROVING CORE ENGINEERING SKILL PATHS:', type: 'success' },
          ...SKILLS.filter(s => s.featured).map(s => {
            const barLength = Math.round(s.level / 10);
            const bar = '█'.repeat(barLength) + '░'.repeat(10 - barLength);
            return {
              text: `  ${s.name.padEnd(16)} [${bar}] ${s.level}% (${s.yearsOfExperience} yrs exp)`,
              type: 'output' as const
            };
          })
        ];
        break;

      case 'projects':
        response = [
          { text: 'LIVE VERIFIED PRODUCTS ENROLLED:', type: 'success' },
          ...PROJECTS.map(p => ({
            text: `  • ${p.title} [${p.category}] - Stars: ★ ${p.stars}`,
            type: 'output' as const
          }))
        ];
        break;

      case 'contact':
        response = [
          { text: 'ALEX RIVER DIGITAL COORDINATES:', type: 'success' },
          { text: `  Email    : ${PERSONAL_INFO.email}`, type: 'output' },
          { text: `  GitHub   : ${PERSONAL_INFO.github}`, type: 'output' },
          { text: `  LinkedIn : ${PERSONAL_INFO.linkedin}`, type: 'output' },
          { text: '  Or use the custom feedback Guestbook on the page!', type: 'warning' }
        ];
        break;

      case 'time':
        response = [
          { text: `CURRENT LOCAL TIMESTAMP : ${new Date().toISOString()}`, type: 'success' },
          { text: 'PORTFOLIO UPTIME RECORD : 100% EXCELLENCE', type: 'output' }
        ];
        break;

      case 'quote':
        const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        response = [{ text: `"${randomQuote}"`, type: 'success' }];
        break;

      case 'matrix':
        response = [
          { text: '0 1 1 0 1 0 0 1 0 1 1 0 0 1 1 0 1 0 1 0 0 1 1 0', type: 'success' },
          { text: '1 0 0 1 1 0 1 1 1 0 0 1 0 1 0 1 0 0 1 1 1 0 1 0', type: 'success' },
          { text: 'PORTFOLIO SHELL SECURED. ENCRYPT COMPLETED.', type: 'success' }
        ];
        break;

      default:
        response = [
          { text: `Command not found: "${command}". Type "help" to display all registered diagnostics.`, type: 'error' }
        ];
        break;
    }

    setHistory([...newHistory, ...response]);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="bg-slate-900 border border-slate-850 text-slate-200 rounded-none overflow-hidden flex flex-col font-mono text-[11px] max-w-full"
      onClick={focusInput}
      id="retro-shell"
    >
      {/* Terminal Titlebar Layout */}
      <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-3.5 h-3.5 text-slate-550 shrink-0" />
          <span className="text-[10px] tracking-widest text-slate-400 font-bold uppercase">guest@alex-river: ~ (bash)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer" />
          <span className="w-2.5 h-2.5 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer" />
          <span className="w-2.5 h-2.5 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer" />
        </div>
      </div>

      {/* Terminal logs content element */}
      <div
        ref={terminalRef}
        className="p-4 flex flex-col gap-1 min-h-[180px] max-h-[280px] overflow-y-auto bg-slate-900 select-text cursor-text text-left"
      >
        {history.map((line, idx) => {
          let colorStyle = 'text-slate-300';
          if (line.type === 'input') colorStyle = 'text-white font-semibold';
          else if (line.type === 'error') colorStyle = 'text-rose-400';
          else if (line.type === 'success') colorStyle = 'text-blue-400';
          else if (line.type === 'warning') colorStyle = 'text-amber-400';

          return (
            <div key={idx} className={`leading-relaxed whitespace-pre-wrap ${colorStyle}`}>
              {line.text}
            </div>
          );
        })}

        {/* Console line input */}
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-1.5 mt-1">
          <span className="text-blue-400 shrink-0 select-none">guest@alex-river:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="flex-grow bg-transparent text-white border-0 outline-none focus:ring-0 p-0 text-[11px] font-mono select-text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </form>
      </div>

      {/* Terminal indicator footer info */}
      <div className="bg-slate-950 px-4 py-1.5 border-t border-slate-850 text-[9px] text-slate-500 uppercase tracking-wider font-bold flex justify-between select-none">
        <span className="flex items-center gap-1">
          <MonitorPlay className="w-3 h-3 text-slate-700 shrink-0" /> LOCAL SHELL PORT 3000
        </span>
        <span className="flex items-center gap-1">
          <ShieldAlert className="w-3 h-3 text-blue-500 shrink-0" /> SECURE SHELL SESSION
        </span>
      </div>
    </div>
  );
}
