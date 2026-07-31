import { Link, useLocation } from 'wouter';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

export function Header() {
  const { itemCount } = useCart();
  const [location] = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[80px] bg-background/95 backdrop-blur-xl border-b border-white/5">
      <nav className="flex justify-between items-center px-6 max-w-[1200px] mx-auto w-full h-full">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group" data-testid="link-brand">
          <img
            src="/spotlogo.svg"
            alt="SPOTIFY logo"
            className="w-8 h-8 group-hover:rotate-180 transition-transform duration-700"
          />
          <span className="text-xl font-extrabold tracking-tight text-primary" style={{ fontWeight: 800 }}>
            SPOTIFY
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-bold tracking-wide transition-colors ${
              location === '/'
                ? 'text-primary border-b-2 border-primary pb-0.5'
                : 'text-foreground/60 hover:text-foreground'
            }`}
            data-testid="link-home"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className={`text-sm font-bold tracking-wide transition-colors ${
              location === '/shop'
                ? 'text-primary border-b-2 border-primary pb-0.5'
                : 'text-foreground/60 hover:text-foreground'
            }`}
            data-testid="link-shop"
          >
            Shop
          </Link>
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
        </div>
      </nav>
    </header>
  );
}
