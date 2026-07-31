import { Link } from 'wouter';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getFormatPrice, type Format } from '@/data/records';
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8" style={{ fontWeight: 800 }}>
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
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold" style={{ fontWeight: 800 }}>
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
              const isMixtape = item.unitPrice != null;
              const unitPrice = item.unitPrice ?? getFormatPrice(item.record, format);
              const detailHref = isMixtape ? '/mixtape' : `/record/${item.record.id}`;
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
                    {item.record.artist}
                  </p>
                  <Badge
                    variant="secondary"
                    className="mb-3 bg-accent/20 text-accent-foreground border-accent/30"
                  >
                    {format}
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
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 border border-border/40 rounded-sm p-6 bg-card/30 space-y-6">
              <h2 className="text-2xl font-bold">Order Summary</h2>
              
              <div className="space-y-3 border-b border-border/40 pb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold" data-testid="text-subtotal">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold text-primary">FREE</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span 
                  className="text-3xl font-extrabold text-secondary" 
                  style={{ fontWeight: 800 }}
                  data-testid="text-total"
                >
                  ${total.toFixed(2)}
                </span>
              </div>
              
              <Button 
                size="lg"
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
    </div>
  );
}
