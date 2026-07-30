import { useParams, Link } from 'wouter';
import { vinylRecords } from '@/data/records';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart, Package, Award } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';

export default function RecordDetail() {
  const params = useParams();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const record = vinylRecords.find((r) => r.id === Number(params.id));

  if (!record) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Record Not Found</h1>
          <p className="text-muted-foreground mb-8">
            This record doesn't exist in our collection.
          </p>
          <Link href="/shop">
            <Button data-testid="button-back-to-shop">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(record);
    toast({
      title: 'Added to cart',
      description: `${record.title} by ${record.artist}`,
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <Link href="/shop">
          <Button 
            variant="ghost" 
            className="mb-8 -ml-4 hover:text-primary"
            data-testid="button-back"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Collection
          </Button>
        </Link>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Album Art */}
          <div className="space-y-6">
            <div className="aspect-square rounded-sm overflow-hidden bg-muted shadow-xl">
              <img 
                src={record.coverImage} 
                alt={`${record.title} by ${record.artist}`}
                className="w-full h-full object-cover"
                data-testid="img-album-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <Badge 
                variant="secondary" 
                className="mb-4 bg-accent/20 text-accent-foreground border-accent/30"
                data-testid="badge-genre"
              >
                {record.genre}
              </Badge>
              
              <h1 
                className="text-5xl md:text-6xl font-extrabold mb-3 leading-tight" 
                style={{ fontWeight: 800 }}
                data-testid="text-title"
              >
                {record.title}
              </h1>
              
              <p 
                className="text-2xl text-muted-foreground mb-6"
                data-testid="text-artist"
              >
                {record.artist}
              </p>

              {record.description && (
                <p 
                  className="text-lg text-foreground/80 leading-relaxed"
                  data-testid="text-description"
                >
                  {record.description}
                </p>
              )}
            </div>

            {/* Price and CTA */}
            <div className="border-t border-b border-border/40 py-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-muted-foreground">Price</span>
                <span 
                  className="text-4xl font-extrabold text-secondary" 
                  style={{ fontWeight: 800 }}
                  data-testid="text-price"
                >
                  ${record.price.toFixed(2)}
                </span>
              </div>
              
              <Button 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 rounded-sm"
                onClick={handleAddToCart}
                data-testid="button-add-to-cart"
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                Add to Cart
              </Button>
            </div>

            {/* Record Details */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block mb-1">Label</span>
                  <span className="font-semibold" data-testid="text-label">{record.label}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Year</span>
                  <span className="font-semibold" data-testid="text-year">{record.year}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Condition</span>
                  <span className="font-semibold flex items-center gap-2" data-testid="text-condition">
                    <Award className="w-4 h-4 text-primary" />
                    {record.condition}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Format</span>
                  <span className="font-semibold flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    12" Vinyl
                  </span>
                </div>
              </div>
            </div>

            {/* Tracklist */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Tracklist</h2>
              <ol className="space-y-2">
                {record.tracklist.map((track, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3 text-foreground/80"
                    data-testid={`text-track-${index + 1}`}
                  >
                    <span className="text-muted-foreground font-mono text-sm min-w-[2rem]">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span>{track}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Shipping Info */}
            <div className="border border-border/40 rounded-sm p-6 bg-card/30">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Protected Shipping
              </h3>
              <p className="text-sm text-muted-foreground">
                Custom-built mailers with corner protectors. Your vinyl arrives safely or we'll make it right.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
