import { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Clock,
  Cpu
} from 'lucide-react';

import { PERSONAL_INFO, PROJECTS } from './data';
import ContactForm from './components/ContactForm';

export default function App() {
  const [currentTime, setCurrentTime] = useState('');

  // Update dynamic real-time clock every second
  useEffect(() => {
    const tick = () => {
      const live = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentTime(live);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Soft scroll trigger
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-slate-200" id="main-root">
      
      {/* Decorative Elite Architectural Top Line Status Bar */}
      <header className="bg-slate-900 border-b border-slate-800 text-slate-300 py-3.5 px-4 sm:px-6 flex items-center justify-between text-[11px] font-mono select-none">
        <div className="flex items-center gap-2 font-bold tracking-widest text-[10px] uppercase text-white">
          <span className="w-1.5 h-1.5 bg-blue-500" />
          {PERSONAL_INFO.name} // Portolio Workspace
        </div>
        
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="tracking-widest">{currentTime || '12:00:00'} UTC</span>
          </span>
          <span className="hidden sm:inline bg-slate-800 text-blue-400 border border-slate-700 px-2 py-0.5 font-bold text-[9px] uppercase tracking-widest">
            ACTIVE SESSION
          </span>
        </div>
      </header>

      {/* Main Fluid Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start animate-fade-in-up">
        
        {/* LEFT COLUMN: Sticky Bio & Core Metrics Sidebar */}
        <section className="lg:col-span-4 lg:sticky lg:top-8 flex flex-col gap-6" id="profile-sidebar">
          
          {/* Main profile card */}
          <div className="bg-white rounded-none border border-slate-200 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6 text-center sm:text-left select-none">
            
            {/* Status light in standard margin layout */}
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono tracking-widest font-bold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-none border border-slate-200 uppercase">
                Fresher Portfolio
              </span>
              <span className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-blue-800 bg-blue-50 px-2.5 py-1 rounded-none border border-blue-200">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                Open For Roles
              </span>
            </div>



            {/* Micro Tagline */}
            <p className="text-xs leading-relaxed text-slate-600 border-t border-b border-slate-100 py-4.5 font-sans text-center sm:text-left">
              "{PERSONAL_INFO.tagline}"
            </p>

            {/* Social details list */}
            <div className="flex flex-col gap-1.5">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-none hover:bg-slate-50 border border-transparent hover:border-slate-200 text-xs font-mono text-slate-600 hover:text-slate-950 transition-all select-text cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-slate-500 shrink-0" />
                  GitHub Account
                </span>
                <span className="text-[9px] text-slate-400 tracking-wider">sushant ↗</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-none hover:bg-slate-50 border border-transparent hover:border-slate-200 text-xs font-mono text-slate-600 hover:text-slate-950 transition-all select-text cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-slate-500 shrink-0" />
                  LinkedIn Profile
                </span>
                <span className="text-[9px] text-slate-400 tracking-wider">sushant ↗</span>
              </a>

              <button
                onClick={() => scrollToId('contact-block')}
                className="flex items-center justify-between p-2.5 rounded-none hover:bg-slate-50 border border-transparent hover:border-slate-200 text-xs font-mono text-slate-600 hover:text-slate-950 transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                  Direct Email
                </span>
                <span className="text-[9px] text-slate-400 tracking-wider">Compose ↘</span>
              </button>
            </div>
          </div>

          {/* Metric counter - hidden since empty */}
          {PERSONAL_INFO.stats && PERSONAL_INFO.stats.length > 0 && (
            <div className="grid grid-cols-1" id="metrics-bento">
              {PERSONAL_INFO.stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-none border border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex flex-col gap-1 select-none text-center"
                >
                  <span className="text-xl sm:text-2xl font-bold font-display text-slate-900 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[9px] font-mono tracking-widest font-extrabold uppercase text-slate-400 leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Sidebar Quick Jump list - Desktop only */}
          <div className="hidden lg:flex flex-col gap-2 bg-white p-5 rounded-none border border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.01)] select-none">
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-extrabold mb-1.5">
              Dashboard Index
            </span>
            {[
              { label: 'Projects', target: 'workspaces-index' },
              { label: 'Submit Direct Inquiry', target: 'contact-block' }
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  scrollToId(item.target);
                }}
                className="text-left py-1 text-xs text-slate-500 hover:text-slate-900 font-medium hover:translate-x-1 transition-all cursor-pointer flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 bg-slate-300 group-hover:bg-slate-900 transition-colors" />
                {item.label}
              </button>
            ))}
          </div>

        </section>

        {/* RIGHT COLUMN: Engineering Workspaces & Inquiry Form */}
        <section className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Engineering Showcases Area */}
          <div className="flex flex-col gap-4" id="workspaces-index">
            <div className="flex items-center justify-between border-b border-slate-200/40 pb-2">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-slate-600" />
                <h2 className="text-sm font-bold font-display uppercase tracking-[0.12em] text-slate-900">Projects</h2>
              </div>
            </div>

            {/* Project Showcases Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PROJECTS.map((proj) => {
                return (
                  <div
                    key={proj.id}
                    className="p-4 text-left rounded-none border bg-white border-slate-200/80 hover:border-slate-800 transition-all flex flex-col gap-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.01)] group"
                  >
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest">
                        {proj.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-950 mt-1 uppercase tracking-wider leading-relaxed group-hover:text-blue-600 transition-colors">
                        {proj.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-auto pt-2">
                      {proj.tags.map((tg, idx) => (
                        <span key={idx} className="bg-slate-100 text-[9px] font-mono font-bold tracking-wider uppercase text-slate-500 px-1.5 py-0.5 rounded-none border border-slate-200/40">
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Direct Inquiry layout card */}
          <div className="bg-white rounded-none border border-slate-200 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)]" id="contact-block">
            <ContactForm />
          </div>

        </section>

      </main>

      {/* Decorative footer elements */}
      <footer className="bg-white border-t border-slate-200 py-7 text-center select-none mt-10 text-slate-500">
        <p className="text-[9px] font-mono tracking-widest text-slate-400 font-bold uppercase">
          {PERSONAL_INFO.name.toUpperCase()} © 2026 // PIXELS GRAPHED ACCORDING TO CLEAN MINIMALISM ARCHITECTURES.
        </p>
        <p className="text-[9px] font-mono text-slate-300 font-bold uppercase tracking-wider mt-1.5">
          ALL INTERACTIVE CLIENT COMPONENT INSTANCES STABILIZED.
        </p>
      </footer>

    </div>
  );
}
