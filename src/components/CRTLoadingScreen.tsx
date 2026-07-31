import { useEffect, useState } from 'react';

export function CRTLoadingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'on' | 'off'>('on');

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase('off'), 2800);
    const t2 = window.setTimeout(() => onDone(), 3500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black ${
        phase === 'on' ? 'crt-on' : 'crt-off'
      }`}
      data-testid="crt-loading-screen"
      aria-label="Loading"
    >
      <div className="absolute inset-0 crt-tube" />
      <div className="absolute inset-0 crt-scanlines pointer-events-none" />
      <div className="absolute inset-0 crt-sweep pointer-events-none" />

      <div className="relative z-10 text-center px-6 crt-flicker">
        <img src="/logo1.svg" alt="" className="w-24 h-24 mx-auto mb-8" />
        <h1
          className="crt-text text-6xl md:text-8xl font-extrabold tracking-tight mb-10"
          style={{ fontWeight: 800 }}
        >
          SPOTIFY
        </h1>

        <div className="mx-auto mt-8 h-2 w-64 bg-white/10 rounded-sm overflow-hidden">
          <div
            className="h-full bg-[#3DCB6C] crt-progress"
            style={{ animationDelay: '0.4s' }}
          />
        </div>
      </div>
    </div>
  );
}
