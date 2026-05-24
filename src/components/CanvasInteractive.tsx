import React, { useEffect, useRef, useState } from 'react';
import { RefreshCcw, Palette, Sparkles, HelpCircle } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const PALETTES = [
  { name: 'Minimal Cobalt', colors: ['#2563eb', '#3b82f6', '#1d4ed8', '#93c5fd'] },
  { name: 'Subtle Slate', colors: ['#475569', '#64748b', '#334155', '#94a3b8'] },
  { name: 'Pure Charcoal', colors: ['#0f172a', '#1e293b', '#334155', '#64748b'] },
  { name: 'Emerald Touch', colors: ['#059669', '#10b981', '#047857', '#a7f3d0'] }
];

export default function CanvasInteractive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [particleDensity, setParticleDensity] = useState<'moderate' | 'high'>('moderate');
  const [mouseAction, setMouseAction] = useState<'draw' | 'repel'>('draw');
  
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  const activePalette = PALETTES[paletteIndex];

  // Particle creator factory helper
  const createParticle = (x: number, y: number): Particle => {
    const size = Math.random() * 2.5 + 1.2;
    const speed = Math.random() * 1.5 + 0.3;
    const angle = Math.random() * Math.PI * 2;
    const colors = activePalette.colors;
    
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    // Fluid resize observer callback definition
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = Math.floor(entry.contentRect.width);
        // Ensure a good stable ratio for the simulator
        height = 240;
        
        canvas.width = width;
        canvas.height = height;

        // Initialize particles inside canvas
        const qty = particleDensity === 'moderate' ? 40 : 80;
        particlesRef.current = [];
        for (let i = 0; i < qty; i++) {
          particlesRef.current.push(
            createParticle(Math.random() * width, Math.random() * height)
          );
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Animation Loop
    const drawAnimation = () => {
      ctx.clearRect(0, 0, width, height);
      
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Draw particle connectivity network lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Motion update
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Wall collisions
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Boundary adjustments
        p1.x = Math.max(0, Math.min(width, p1.x));
        p1.y = Math.max(0, Math.min(height, p1.y));

        // Physics relation to mouse location
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p1.x;
          const dy = mouse.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 75) {
            if (mouseAction === 'repel') {
              p1.x -= (dx / dist) * 2;
              p1.y -= (dy / dist) * 2;
            } else {
              // Gravitate to draw smooth trails
              p1.x += (dx / dist) * 0.4;
              p1.y += (dy / dist) * 0.4;
            }
          }
        }

        // Draw individual particle points
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.fill();

        // Connect nearby points to form mesh wireframe
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Dynamic opacity based on proximity
            const alpha = (1 - dist / 60) * 0.18;
            ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(drawAnimation);
    };

    drawAnimation();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [paletteIndex, particleDensity, mouseAction]);

  // Handle pointer interactions inside the stage
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current = { x, y };

    // Emit extra temporary trail particles on drag
    if (e.buttons === 1 && particlesRef.current.length < 150) {
      particlesRef.current.push(createParticle(x, y));
    }
  };

  const handlePointerLeave = () => {
    mouseRef.current = { x: null, y: null };
  };

  const clearAndResetCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    particlesRef.current = [];
    const qty = particleDensity === 'moderate' ? 40 : 80;
    for (let i = 0; i < qty; i++) {
      particlesRef.current.push(
        createParticle(Math.random() * canvas.width, Math.random() * canvas.height)
      );
    }
  };

  return (
    <div className="flex flex-col gap-3 font-sans text-slate-800" id="interactive-canvas">
      {/* Control panel buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-slate-50 p-2.5 rounded-none border border-slate-100">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setPaletteIndex(prev => (prev + 1) % PALETTES.length)}
            className="flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase font-bold tracking-widest bg-white hover:bg-slate-50 border border-slate-200 rounded-none cursor-pointer transition-colors"
          >
            <Palette className="w-3.5 h-3.5 text-slate-500" />
            <span>Theme: {activePalette.name}</span>
          </button>

          <button
            onClick={() => setParticleDensity(prev => (prev === 'moderate' ? 'high' : 'moderate'))}
            className="flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase font-bold tracking-widest bg-white hover:bg-slate-50 border border-slate-200 rounded-none cursor-pointer transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-500" />
            <span>Density: {particleDensity}</span>
          </button>

          <button
            onClick={() => setMouseAction(prev => (prev === 'draw' ? 'repel' : 'draw'))}
            className={`flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase font-bold tracking-widest border rounded-none cursor-pointer transition-colors ${
              mouseAction === 'draw' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}
          >
            <span>Hover: {mouseAction === 'draw' ? 'Attract' : 'Push'}</span>
          </button>
        </div>

        <button
          onClick={clearAndResetCanvas}
          className="flex items-center gap-1 px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-none cursor-pointer transition-colors ml-auto"
        >
          <RefreshCcw className="w-3 h-3" />
          <span>Clear Board</span>
        </button>
      </div>

      {/* Canvas Wrap Stage */}
      <div
        ref={containerRef}
        className="relative w-full h-[240px] rounded-none overflow-hidden border border-slate-200 bg-slate-950"
      >
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="block w-full h-full cursor-crosshair touch-none"
        />

        {/* Ambient overlay text instructing how to interact */}
        <div className="absolute bottom-2.5 right-3 text-[9px] text-slate-500 font-mono tracking-widest uppercase font-bold pointer-events-none select-none bg-slate-900/80 px-2 py-0.5 rounded-none">
          Drag cursor to emit sparkles
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono bg-slate-50 p-2 rounded-none border border-slate-100">
        <HelpCircle className="w-3.5 h-3.5 shrink-0" />
        <span>Calculated vectors utilize dynamic gravity centers and high-refresh canvas loops.</span>
      </div>
    </div>
  );
}
