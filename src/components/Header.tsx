import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ShoppingCart, Menu, X, CircleUserRound } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useMixtape } from '@/hooks/use-mixtape';
import { CrtToggle } from '@/components/CrtToggle';

const NAV_LINKS = [
  { href: '/', label: 'Home', testId: 'link-home' },
  { href: '/shop', label: 'Shop', testId: 'link-shop' },
  { href: '/escobar-dj', label: 'Escobar DJ', testId: 'link-escobar-dj' },
  { href: '/mixtape', label: 'Mixtape', testId: 'link-mixtape' },
  { href: '/events', label: 'Events', testId: 'link-events' },
];

export function Header({
  crtEnabled,
  onToggleCrt,
}: {
  crtEnabled: boolean;
  onToggleCrt: () => void;
}) {
  const { itemCount } = useCart();
  const { songCount } = useMixtape();
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const linkClasses = (href: string) =>
    `text-sm font-bold tracking-wide transition-colors ${
      location === href
        ? 'text-primary border-b-2 border-primary pb-0.5'
        : 'text-foreground/60 hover:text-foreground'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-white/5">
      <nav className="flex justify-between items-center px-6 max-w-[1200px] mx-auto w-full h-[80px]">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group" data-testid="link-brand">
          <img
            src="/logo1.svg"
            alt="SPOTIFY logo"
            className="w-12 h-12 group-hover:rotate-180 transition-transform duration-700"
          />
          <span className="text-xl font-extrabold tracking-tight text-primary" style={{ fontWeight: 800 }}>
            SPOTIFY
          </span>
        </Link>

        {/* Desktop Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative ${linkClasses(link.href)}`}
              data-testid={link.testId}
            >
              {link.label}
              {link.href === '/mixtape' && songCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-4 bg-primary text-primary-foreground text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center"
                  data-testid="text-mixtape-count"
                >
                  {songCount}
                </span>
              )}
            </Link>
          ))}
          <Link
            href="/cart"
            className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
            data-testid="link-cart"
          >
            <ShoppingCart className="w-5 h-5 text-foreground/70 hover:text-foreground transition-colors" />
            {itemCount > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center"
                data-testid="text-cart-count"
              >
                {itemCount}
              </span>
            )}
          </Link>
          <Link
            href="/membership"
            className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
            data-testid="link-membership"
          >
            <CircleUserRound className="w-5 h-5 text-foreground/70 hover:text-foreground transition-colors" />
          </Link>
          <CrtToggle enabled={crtEnabled} onToggle={onToggleCrt} />
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/cart"
            className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
            data-testid="link-cart"
          >
            <ShoppingCart className="w-5 h-5 text-foreground/70 hover:text-foreground transition-colors" />
            {itemCount > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center"
                data-testid="text-cart-count"
              >
                {itemCount}
              </span>
            )}
          </Link>
          <Link
            href="/membership"
            className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
            data-testid="link-membership"
          >
            <CircleUserRound className="w-5 h-5 text-foreground/70 hover:text-foreground transition-colors" />
          </Link>
          <CrtToggle enabled={crtEnabled} onToggle={onToggleCrt} />
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
            data-testid="button-menu-toggle"
          >
            {open ? (
              <X className="w-6 h-6 text-foreground/70 hover:text-foreground transition-colors" />
            ) : (
              <Menu className="w-6 h-6 text-foreground/70 hover:text-foreground transition-colors" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl">
          <div className="px-6 py-4 max-w-[1200px] mx-auto flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between rounded-sm px-3 py-3 font-bold tracking-wide transition-colors ${
                  location === link.href
                    ? 'text-primary bg-white/5'
                    : 'text-foreground/60 hover:text-foreground hover:bg-white/5'
                }`}
                data-testid={link.testId}
              >
                <span>{link.label}</span>
                {link.href === '/mixtape' && songCount > 0 && (
                  <span
                    className="bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    data-testid="text-mixtape-count"
                  >
                    {songCount}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
