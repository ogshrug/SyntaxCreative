export function Footer() {
  return (
    <footer className="py-12 border-t border-border/40 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo1.svg"
              alt="SPOTIFY logo"
              className="w-9 h-9"
            />
            <span className="font-bold text-lg">SPOTIFY</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 SPOTIFY. The revolution of music
          </p>
        </div>
      </div>
    </footer>
  );
}
