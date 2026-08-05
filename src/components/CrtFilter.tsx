export function CrtFilter({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;

  return (
    <div
      className="crt-filter"
      data-testid="crt-filter"
      aria-hidden="true"
    >
      <div className="crt-filter-scanlines" />
      <div className="crt-filter-vignette" />
      <div className="crt-filter-tint" />
      <div className="crt-filter-dotmask" />
      <div className="crt-filter-sweep" />
    </div>
  );
}
