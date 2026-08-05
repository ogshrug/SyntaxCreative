import { vinylRecords } from '@/data/records';

export function NowPlayingTicker() {
  const items = vinylRecords.map((record) => `${record.title} — ${record.artist}`);
  const line = ['NOW PLAYING', ...items].join('  •  ');
  const copy = `${line}  •  `;

  return (
    <div
      className="marquee fixed top-[80px] left-0 right-0 z-40 pointer-events-none select-none border-b border-white/5 bg-background/60 backdrop-blur-sm"
      data-testid="now-playing-ticker"
      aria-hidden="true"
    >
      <div className="marquee-track py-1 font-terminal text-sm tracking-wide text-muted-foreground/80">
        <span>{copy}</span>
        <span>{copy}</span>
      </div>
    </div>
  );
}
