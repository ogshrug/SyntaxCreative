import { useParams, Link } from 'wouter';
import { vinylRecords, formatOptions, getFormatPrice, type Format } from '@/data/records';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/Footer';
import { ArrowLeft, ShoppingCart, Package, Award, Plus, Check } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useMixtape } from '@/hooks/use-mixtape';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function RecordDetail() {
  const params = useParams();
  const { addItem } = useCart();
  const { addSong, songs } = useMixtape();
  const { toast } = useToast();
  const [format, setFormat] = useState<Format>('Vinyl');
  
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
    addItem(record, format);
    toast({
      title: 'Added to cart',
      description: `${record.title} by ${record.artist} (${format})`,
    });
  };

  const handleAddToMixtape = (trackIndex: number) => {
    const trackName = record.tracklist[trackIndex];
    addSong({ record, trackIndex, trackName });
    toast({
      title: 'Added to mixtape',
      description: `${trackName} - ${record.artist}`,
    });
  };

  const isInMixtape = (trackIndex: number) =>
    songs.some(
      (s) => s.record.id === record.id && s.trackIndex === trackIndex,
    );

  return (
    <div className="min-h-screen pt-32 flex flex-col">
      <div className="container mx-auto px-6 flex-1 w-full pb-20">
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
            <div className="border-t border-b border-border/40 py-6 space-y-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-muted-foreground">Price</span>
                <span 
                  className="text-4xl font-extrabold text-secondary" 
                  style={{ fontWeight: 800 }}
                  data-testid="text-price"
                >
                  ${getFormatPrice(record, format).toFixed(2)}
                </span>
              </div>

              <div>
                <span className="text-muted-foreground block mb-3">Format</span>
                <div className="flex gap-3" data-testid="format-selector">
                  {formatOptions.map((option) => (
                    <Button
                      key={option}
                      variant={format === option ? 'default' : 'outline'}
                      onClick={() => setFormat(option)}
                      className={
                        format === option
                          ? 'bg-primary hover:bg-primary/90 text-primary-foreground font-semibold'
                          : 'border-border/40 text-foreground hover:border-primary hover:text-primary font-semibold'
                      }
                      data-testid={`button-format-${option.toLowerCase()}`}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
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
                    {format}
                  </span>
                </div>
              </div>
            </div>

            {/* Tracklist */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Tracklist</h2>
                <Link href="/mixtape">
                  <Button variant="ghost" size="sm" className="hover:text-primary">
                    Your Mixtape
                  </Button>
                </Link>
              </div>
              <ol className="space-y-2">
                {record.tracklist.map((track, index) => {
                  const added = isInMixtape(index);
                  return (
                    <li 
                      key={index} 
                      className="flex items-center gap-3 text-foreground/80"
                      data-testid={`text-track-${index + 1}`}
                    >
                      <span className="text-muted-foreground font-mono text-sm min-w-[2rem]">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      <span className="flex-1">{track}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddToMixtape(index)}
                        disabled={added}
                        className="shrink-0 border-border/40 font-semibold disabled:opacity-100"
                        data-testid={`button-add-track-${index + 1}`}
                      >
                        {added ? (
                          <>
                            <Check className="w-4 h-4 text-primary" />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            Add
                          </>
                        )}
                      </Button>
                    </li>
                  );
                })}
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

      <Footer />
    </div>
  );
}
