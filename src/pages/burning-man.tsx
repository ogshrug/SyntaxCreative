import { useRef, useState } from 'react';
import type { VinylRecord } from '@/data/records';
import type { Format } from '@/data/records';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowDown, ShoppingCart, Minus, Plus, Flame } from 'lucide-react';

const TIERS = [
  { id: 'ga', name: 'GA Pass', price: 300 },
  { id: 'vip', name: 'VIP Pass', price: 500 },
] as const;

type TierId = (typeof TIERS)[number]['id'];

export default function BurningMan() {
  const { addItem, updateQuantity, items } = useCart();
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tier, setTier] = useState<TierId>('ga');
  const [quantity, setQuantity] = useState(1);

  const selectedTier = TIERS.find((t) => t.id === tier) ?? TIERS[0];

  const handleBuyTickets = () => {
    if (!name.trim() || !email.trim()) {
      toast({
        title: 'Almost there',
        description: 'Please enter your name and email to grab tickets.',
        variant: 'destructive',
      });
      return;
    }

    const tierIndex = TIERS.findIndex((t) => t.id === tier);
    const ticketRecord: VinylRecord = {
      id: 1000 + tierIndex,
      title: 'Burning Man Ticket',
      artist: `${selectedTier.name} · Burning Man 2026`,
      genre: 'Rock',
      year: 2026,
      price: 0,
      label: 'Burning Man',
      condition: 'Mint',
      tracklist: [selectedTier.name],
      coverImage: '/coverbrun.jpg',
    };
    const format: Format = 'Vinyl';
    const existing = items.find(
      (i) => i.record.id === ticketRecord.id && i.format === format,
    );
    const currentQty = existing?.quantity ?? 0;

    addItem(ticketRecord, format, selectedTier.price, 'ticket', selectedTier.name);
    updateQuantity(ticketRecord.id, format, currentQty + quantity);

    toast({
      title: 'Tickets added to cart',
      description: `${quantity} × ${selectedTier.name} · $${(selectedTier.price * quantity).toFixed(2)}`,
    });
  };

  const scrollToTickets = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/herobrun.jpg"
            alt=""
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <img
            src="/logo1.svg"
            alt="SPOTIFY logo"
            className="w-[7.5rem] h-[7.5rem] mx-auto mb-6"
          />
          <h1
            className="text-7xl md:text-9xl font-extrabold mb-6 tracking-tight"
            style={{ fontWeight: 800 }}
          >
            BURNING MAN
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            The playa is calling. Tickets are limited —
            <br />
            grab yours before the gates close.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-8 py-6 rounded-sm group"
            onClick={scrollToTickets}
            data-testid="button-get-tickets"
          >
            Get Tickets
            <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Sign Up + Ticket Form */}
      <section className="py-32 border-t border-border/40">
        <div className="container mx-auto px-6 max-w-3xl" ref={formRef}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <Flame className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h2
              className="text-5xl md:text-6xl font-extrabold mb-4"
              style={{ fontWeight: 800 }}
            >
              Sign Up & Buy Tickets
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Register for the burn and secure your entry in one go.
            </p>
          </div>

          <div className="border border-border/40 rounded-sm bg-card/30 p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="bm-name"
                  className="block text-sm text-muted-foreground mb-2"
                >
                  Name
                </label>
                <input
                  id="bm-name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 bg-muted border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="input-name"
                />
              </div>
              <div>
                <label
                  htmlFor="bm-email"
                  className="block text-sm text-muted-foreground mb-2"
                >
                  Email
                </label>
                <input
                  id="bm-email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-muted border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="input-email"
                />
              </div>
            </div>

            <div>
              <span className="block text-sm text-muted-foreground mb-3">
                Ticket Type
              </span>
              <div className="flex flex-wrap gap-3" data-testid="ticket-tier-selector">
                {TIERS.map((t) => (
                  <Button
                    key={t.id}
                    variant={tier === t.id ? 'default' : 'outline'}
                    onClick={() => setTier(t.id)}
                    className={
                      tier === t.id
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground font-semibold'
                        : 'border-border/40 text-foreground hover:border-primary hover:text-primary font-semibold'
                    }
                    data-testid={`button-tier-${t.id}`}
                  >
                    {t.name} — ${t.price}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-sm text-muted-foreground mb-3">
                Quantity
              </span>
              <div className="flex items-center gap-2 border border-border/40 rounded-sm w-fit">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0 hover:text-primary"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  data-testid="button-decrease-quantity"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span
                  className="w-10 text-center font-semibold"
                  data-testid="text-quantity"
                >
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0 hover:text-primary"
                  onClick={() => setQuantity(quantity + 1)}
                  data-testid="button-increase-quantity"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="border-t border-border/40 pt-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p
                  className="text-3xl font-extrabold text-secondary"
                  style={{ fontWeight: 800 }}
                  data-testid="text-ticket-total"
                >
                  ${(selectedTier.price * quantity).toFixed(2)}
                </p>
              </div>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 rounded-sm"
                onClick={handleBuyTickets}
                data-testid="button-buy-tickets"
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                Buy Tickets
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
