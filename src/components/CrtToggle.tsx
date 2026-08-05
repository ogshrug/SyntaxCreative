export function CrtToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={enabled ? 'Disable CRT filter' : 'Enable CRT filter'}
      aria-pressed={enabled}
      data-testid="button-crt-toggle"
      className={`p-2 rounded-lg transition-colors ${
        enabled
          ? 'text-primary bg-white/5 hover:bg-white/10'
          : 'text-foreground/60 hover:text-foreground hover:bg-white/5'
      }`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 48 38"
        fill="none"
        className="crt-toggle-icon"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="44" height="28" rx="4" fill="currentColor" opacity="0.15" />
        <rect
          x="2.5"
          y="2.5"
          width="43"
          height="27"
          rx="3.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <rect x="5" y="5" width="38" height="22" rx="2" fill="#060a06" className="crt-toggle-screen" />
        <path d="M8 24 L16 8 L20 8 L12 24 Z" fill="rgba(61,203,108,0.06)" />
        <circle cx="40" cy="24" r="1.6" className="crt-toggle-led" />
        <rect x="22" y="30" width="4" height="3" fill="currentColor" opacity="0.6" />
        <rect x="15" y="33" width="18" height="3" rx="1.5" fill="currentColor" opacity="0.6" />
      </svg>
    </button>
  );
}
