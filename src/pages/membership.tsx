import { useState } from 'react';
import { Link } from 'wouter';
import { ShoppingCart, Plus, Copy, Mail, Store, CreditCard, Flame, Truck } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import { useMixtape } from '@/hooks/use-mixtape';
import { exclusiveRecords } from '@/data/records';
import { coupons } from '@/data/coupons';

type CheckResult = 'valid' | 'invalid' | null;

export default function Membership() {
  const { toast } = useToast();
  const { addItem } = useCart();
  const { addSong, songs } = useMixtape();
  const [membershipId, setMembershipId] = useState('');
  const [result, setResult] = useState<CheckResult>(null);

  const freeAlbum = exclusiveRecords[0];

  const isFreeAlbumAddedToMixtape = freeAlbum
    ? freeAlbum.tracklist.every((_, trackIndex) =>
        songs.some(
          (s) => s.record.id === freeAlbum.id && s.trackIndex === trackIndex,
        ),
      )
    : false;

  const handleAddFreeAlbumToCart = () => {
    if (!freeAlbum) return;
    addItem(freeAlbum, 'Vinyl', 0);
    toast({
      title: 'Added to cart',
      description: `${freeAlbum.title} by ${freeAlbum.artist} — FREE`,
    });
  };

  const handleAddFreeAlbumToMixtape = () => {
    if (!freeAlbum) return;
    freeAlbum.tracklist.forEach((track, trackIndex) => {
      addSong({ record: freeAlbum, trackIndex, trackName: track });
    });
    toast({
      title: 'Added to mixtape',
      description: `All ${freeAlbum.tracklist.length} tracks from ${freeAlbum.title}`,
    });
  };

  const handleCopyCoupon = async () => {
    const coupon = coupons[0];
    try {
      await navigator.clipboard.writeText(coupon.code);
      toast({
        title: 'Coupon copied',
        description: `${coupon.code} is on your clipboard.`,
      });
    } catch {
      toast({
        title: 'Could not copy',
        description: `Copy ${coupon.code} manually and enter it at checkout.`,
        variant: 'destructive',
      });
    }
  };

  const handleCheck = () => {
    const value = membershipId.trim();
    if (!value) {
      setResult(null);
      toast({
        title: 'Enter your membership number',
        description: 'We need your membership number to check your perks.',
        variant: 'destructive',
      });
      return;
    }
    const num = Number(value);
    if (Number.isNaN(num)) {
      setResult('invalid');
      return;
    }
    setResult(num % 2 === 0 ? 'valid' : 'invalid');
  };

  return (
    <div className="min-h-screen pt-32 flex flex-col">
      <div className="container mx-auto px-6 max-w-4xl flex-1 w-full pb-20">
        <h1 className="text-fluid-display font-extrabold mb-8 text-center" style={{ fontWeight: 800 }}>
          Membership
        </h1>

        <div className="text-center py-20 border border-border/40 rounded-sm bg-card/30">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ fontWeight: 800 }}>
            Check Your Membership
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            If you have a membership you can check out exclusive perks right here
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Your membership number"
              value={membershipId}
              onChange={(e) => {
                setMembershipId(e.target.value);
                setResult(null);
              }}
              className="flex-1 px-6 py-4 bg-muted border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              data-testid="input-membership-id"
            />
            <Button
              size="lg"
              onClick={handleCheck}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 rounded-sm"
              data-testid="button-check-membership"
            >
              Check Membership
            </Button>
          </div>
        </div>

        {result === 'invalid' && (
          <div className="mt-8 text-center">
            <p className="inline-block px-6 py-4 border border-destructive/40 rounded-sm bg-destructive/10 text-destructive font-semibold">
              No membership ID has been recorded
            </p>
          </div>
        )}

        {result === 'valid' && (
          <div className="mt-10 border border-primary/40 rounded-sm bg-primary/5 p-8">
            <h3 className="text-2xl font-extrabold text-primary mb-6 text-center" style={{ fontWeight: 800 }}>
              Exclusive Perks
            </h3>

            {coupons[0] && (
              <div className="max-w-md mx-auto border border-primary/40 rounded-sm bg-card/30 p-8 text-center">
                <div className="badge-retro mb-4">Members Only</div>
                <h4 className="text-2xl font-extrabold mb-2" style={{ fontWeight: 800 }}>
                  {coupons[0].discountPercent}% off Burning Man
                </h4>
                <p className="text-muted-foreground mb-6">
                  Use this coupon at checkout for {coupons[0].discountPercent}% off Burning Man tickets.
                </p>
                <div className="inline-flex items-center gap-3 px-6 py-3 border border-dashed border-primary/60 rounded-sm bg-primary/10 mb-6">
                  <span
                    className="font-mono text-2xl font-extrabold text-primary tracking-widest"
                    data-testid="text-coupon-code"
                  >
                    {coupons[0].code}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyCoupon}
                    className="hover:text-primary"
                    data-testid="button-copy-coupon"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter the code in your cart before checkout.
                </p>
              </div>
            )}

            <div className="mt-6 max-w-md mx-auto border border-primary/40 rounded-sm bg-card/30 p-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <Truck className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-extrabold mb-2" style={{ fontWeight: 800 }}>
                Free Shipping
              </h4>
              <p className="text-sm text-muted-foreground">
                Enter your membership number in the cart coupon box for free shipping on every order.
              </p>
            </div>

            {freeAlbum && (
              <div className="mt-10 border border-primary/40 rounded-sm bg-card/30 p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <Link href={`/record/${freeAlbum.id}`} className="shrink-0">
                    <img
                      src={freeAlbum.coverImage}
                      alt={`${freeAlbum.title} by ${freeAlbum.artist}`}
                      className="w-48 h-48 object-cover rounded-sm cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </Link>
                  <div className="text-center md:text-left flex-1">
                    <div className="badge-retro mb-2">Members Only</div>
                    <h4 className="text-2xl font-extrabold leading-tight" style={{ fontWeight: 800 }}>
                      {freeAlbum.title}
                    </h4>
                    <p className="text-base text-muted-foreground mb-2">
                      {freeAlbum.artist}
                    </p>
                    <p className="text-primary font-bold">FREE</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleAddFreeAlbumToCart}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                    data-testid="button-perk-add-to-cart"
                  >
                    <ShoppingCart className="mr-2 w-4 h-4" />
                    Add Free Album to Cart
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleAddFreeAlbumToMixtape}
                    disabled={isFreeAlbumAddedToMixtape}
                    className="border-primary/40 font-semibold"
                    data-testid="button-perk-add-to-mixtape"
                  >
                    <Plus className="mr-2 w-4 h-4" />
                    Add All Tracks to Mixtape
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Where to Get Membership */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <div className="badge-retro mb-6">Get Yours</div>
            <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold mb-4 text-center sm:whitespace-nowrap" style={{ fontWeight: 800 }}>
              Where to Get Membership
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Membership cards land everywhere the music does. Grab one at any of these spots.
            </p>
            <div className="squiggle mx-auto mt-6" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                icon: Mail,
                title: 'The Spot Droppers',
                description: 'Sign up with your postal address on the home page and your membership card arrives with your very first mail drop.',
              },
              {
                icon: Store,
                title: 'In-Store',
                description: 'Walk up to any SPOTIFY Records counter. Every vinyl you pick up comes with a membership card tucked inside the sleeve.',
              },
              {
                icon: CreditCard,
                title: 'At Checkout',
                description: 'Order online and a membership card ships with your order. Your member number is printed on the packing slip.',
              },
              {
                icon: Flame,
                title: 'At the Burn',
                description: 'Swing by the SPOTIFY camp on the playa. A limited run of membership cards gets handed out every burn.',
              },
            ].map((way) => (
              <div
                key={way.title}
                className="p-6 border border-border/40 rounded-sm bg-card/30 hover:border-primary/40 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
                  <way.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-extrabold mb-2" style={{ fontWeight: 800 }}>
                  {way.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {way.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
