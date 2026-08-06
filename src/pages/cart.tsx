import { Link, useLocation } from 'wouter';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/Footer';
import { CheckoutFlow } from '@/components/CheckoutFlow';
import { getFormatPrice, type Format, type VinylRecord } from '@/data/records';
import { findCoupon, isValidMembershipNumber, type Coupon } from '@/data/coupons';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Trash2, Plus, Minus, Tag, CreditCard } from 'lucide-react';
import { useState } from 'react';

let membershipCardSeq = 2000;

export default function Cart() {
  const { items, addItem, removeItem, updateQuantity, total, clearCart } = useCart();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isMembershipApplied, setIsMembershipApplied] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [shippingCost] = useState(
    () => Math.round((7 + Math.random() * 5) * 100) / 100,
  );

  const ticketSubtotal = items.reduce((acc, item) => {
    if (item.kind !== 'ticket') return acc;
    const format: Format = item.format ?? 'Vinyl';
    const unitPrice = item.unitPrice ?? getFormatPrice(item.record, format);
    return acc + unitPrice * item.quantity;
  }, 0);

  const discount = appliedCoupon
    ? (ticketSubtotal * appliedCoupon.discountPercent) / 100
    : 0;
  const shipping = isMembershipApplied ? 0 : shippingCost;
  const grandTotal = total - discount + shipping;

  const handleApplyCoupon = () => {
    const coupon = findCoupon(couponInput);
    if (coupon) {
      setAppliedCoupon(coupon);
      setCouponInput('');
      toast({
        title: 'Coupon applied',
        description: coupon.description,
      });
      return;
    }
    if (isValidMembershipNumber(couponInput)) {
      setIsMembershipApplied(true);
      setCouponInput('');
      toast({
        title: 'Free shipping applied',
        description: 'Your membership number gets you free shipping.',
      });
      return;
    }
    toast({
      title: 'Invalid coupon code',
      description: 'That coupon code was not recognised.',
      variant: 'destructive',
    });
  };

  const handleCheckout = () => setIsCheckingOut(true);

  const handleAddMembershipCard = () => {
    const name = memberName.trim();
    if (!name) {
      toast({
        title: 'Enter a name',
        description: 'Add a name so we can print your membership card.',
        variant: 'destructive',
      });
      return;
    }
    const card: VinylRecord = {
      id: ++membershipCardSeq,
      title: 'Membership Card',
      artist: 'SPOTIFY Records',
      genre: 'Rock',
      year: 2026,
      price: 10,
      label: 'SPOTIFY',
      condition: 'Mint',
      tracklist: [],
      coverImage: '/logo1.svg',
    };
    addItem(card, 'Vinyl', 10, 'membership', name);
    setMemberName('');
    toast({
      title: 'Membership card added',
      description: `A card for ${name} is in your cart · $10/month.`,
    });
  };

  const handleOrderComplete = () => clearCart();

  const handleGoHome = () => {
    setIsCheckingOut(false);
    navigate('/');
  };

  const checkoutFlow = isCheckingOut ? (
    <CheckoutFlow onComplete={handleOrderComplete} onGoHome={handleGoHome} />
  ) : null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col">
        <div className="container mx-auto px-6 max-w-4xl flex-1 w-full pb-20">
          <h1 className="text-fluid-display font-extrabold mb-8" style={{ fontWeight: 800 }}>
            Your Cart
          </h1>
          
          <div className="text-center py-20 border border-border/40 rounded-sm bg-card/30">
            <p className="text-xl text-muted-foreground mb-8">Your cart is empty</p>
            <Link href="/shop">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                data-testid="button-browse-records"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Browse Records
              </Button>
            </Link>
          </div>
        </div>

        <Footer />
        {checkoutFlow}
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 flex flex-col">
      <div className="container mx-auto px-6 max-w-6xl flex-1 w-full pb-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-fluid-display font-extrabold" style={{ fontWeight: 800 }}>
            Your Cart
          </h1>
          <Button
            variant="ghost"
            onClick={clearCart}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            data-testid="button-clear-cart"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => {
              const format: Format = item.format ?? 'Vinyl';
              const isMixtape = item.kind === 'mixtape';
              const isTicket = item.kind === 'ticket';
              const isMembership = item.kind === 'membership';
              const unitPrice = item.unitPrice ?? getFormatPrice(item.record, format);
              const detailHref = isMixtape
                ? '/mixtape'
                : isTicket
                  ? item.record.label === 'Thunder' ? '/thunder' : '/burning-man'
                  : isMembership
                    ? '/membership'
                    : `/record/${item.record.id}`;
              const badgeLabel = isMembership
                ? 'Membership'
                : (item.formatLabel ?? format);
              return (
              <div 
                key={`${item.record.id}-${format}`}
                className="flex gap-6 p-6 border border-border/40 rounded-sm bg-card/30 hover:border-primary/40 transition-colors"
                data-testid={`cart-item-${item.record.id}`}
              >
                <Link href={detailHref} className="shrink-0">
                  <img 
                    src={item.record.coverImage}
                    alt={item.record.title}
                    className="w-24 h-24 object-cover rounded-sm cursor-pointer hover:opacity-80 transition-opacity"
                    data-testid={`img-cart-album-${item.record.id}`}
                  />
                </Link>
                
                <div className="flex-1 min-w-0">
                  <Link href={detailHref}>
                    <h3 
                      className="font-bold text-lg mb-1 hover:text-primary transition-colors cursor-pointer line-clamp-1"
                      data-testid={`text-cart-title-${item.record.id}`}
                    >
                      {item.record.title}
                    </h3>
                  </Link>
                  <p 
                    className="text-sm text-muted-foreground mb-2 line-clamp-1"
                    data-testid={`text-cart-artist-${item.record.id}`}
                  >
                    {isMembership ? `Card for ${item.formatLabel}` : item.record.artist}
                  </p>
                  <Badge
                    variant="secondary"
                    className="mb-3 bg-accent/20 text-accent-foreground border-accent/30"
                  >
                    {badgeLabel}
                  </Badge>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 border border-border/40 rounded-sm">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:text-primary"
                        onClick={() => updateQuantity(item.record.id, format, item.quantity - 1)}
                        data-testid={`button-decrease-${item.record.id}`}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span 
                        className="w-8 text-center font-semibold"
                        data-testid={`text-quantity-${item.record.id}`}
                      >
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:text-primary"
                        onClick={() => updateQuantity(item.record.id, format, item.quantity + 1)}
                        data-testid={`button-increase-${item.record.id}`}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.record.id, format)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      data-testid={`button-remove-${item.record.id}`}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p 
                    className="text-2xl font-bold text-secondary"
                    data-testid={`text-item-price-${item.record.id}`}
                  >
                    ${(unitPrice * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ${unitPrice.toFixed(2)} each
                  </p>
                </div>
              </div>
              );
            })}

            {/* Add a Membership Card */}
            <div className="border border-border/40 rounded-sm p-6 bg-card/30 space-y-4">
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
                  <CreditCard className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Add a Membership Card</h3>
                  <p className="text-sm text-muted-foreground">
                    Just $10/month. We'll print the name right on it.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Name on the card"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  className="flex-1 min-w-0 px-4 py-3 bg-muted border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="input-membership-name"
                />
                <Button
                  onClick={handleAddMembershipCard}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                  data-testid="button-add-membership-card"
                >
                  <Plus className="mr-2 w-4 h-4" />
                  Add Card
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 border border-border/40 rounded-sm p-6 bg-card/30 space-y-6">
              <h2 className="text-2xl font-bold">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold" data-testid="text-subtotal">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold text-primary">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-sm">
                    <span className="text-primary font-semibold flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Coupon ({appliedCoupon.code})
                      <button
                        onClick={() => setAppliedCoupon(null)}
                        className="underline text-muted-foreground hover:text-foreground"
                        data-testid="button-remove-coupon"
                      >
                        Remove
                      </button>
                    </span>
                    <span className="font-semibold text-primary">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                )}
                {isMembershipApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-primary font-semibold flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Membership
                      <button
                        onClick={() => setIsMembershipApplied(false)}
                        className="underline text-muted-foreground hover:text-foreground"
                        data-testid="button-remove-membership"
                      >
                        Remove
                      </button>
                    </span>
                    <span className="font-semibold text-primary">FREE</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 border-t border-border/40 pt-6">
                {!appliedCoupon && !isMembershipApplied ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 min-w-0 px-4 py-3 bg-muted border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary uppercase"
                      data-testid="input-coupon"
                    />
                    <Button
                      variant="outline"
                      onClick={handleApplyCoupon}
                      className="border-primary/40 font-semibold"
                      data-testid="button-apply-coupon"
                    >
                      Apply
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {appliedCoupon
                      ? appliedCoupon.description
                      : 'Membership: free shipping on this order.'}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span 
                  className="text-3xl font-extrabold text-secondary" 
                  style={{ fontWeight: 800 }}
                  data-testid="text-total"
                >
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
              
              <Button 
                size="lg"
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 rounded-sm"
                data-testid="button-checkout"
              >
                Proceed to Checkout
              </Button>
              
              <Link href="/shop">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full border-border/40 font-semibold"
                  data-testid="button-continue-shopping"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {checkoutFlow}
    </div>
  );
}
