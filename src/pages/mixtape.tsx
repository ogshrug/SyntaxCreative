import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import type { VinylRecord } from '@/data/records';
import { formatOptions, getMixtapeFormatPrice, type Format } from '@/data/records';
import { useMixtape, MIXTAPE_PRICE_PER_SONG } from '@/hooks/use-mixtape';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, Disc3, ShoppingCart } from 'lucide-react';

interface TrackEntry {
  trackIndex: number;
  trackName: string;
}

interface AlbumGroup {
  record: VinylRecord;
  tracks: TrackEntry[];
}

export default function Mixtape() {
  const { songs, removeSong, clearMixtape, songCount, total } = useMixtape();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [format, setFormat] = useState<Format>('Vinyl');

  const mediaPrice = getMixtapeFormatPrice(format);
  const mixTotal = total + mediaPrice;

  const orderedSongs = useMemo(() => {
    return [...songs].sort((a, b) => a.trackIndex - b.trackIndex);
  }, [songs]);

  const handleOrderMix = () => {
    const mixtapeRecord: VinylRecord = {
      id: 0,
      title: 'Your Mixtape',
      artist: `${songCount} ${songCount === 1 ? 'song' : 'songs'} · Custom Mix`,
      genre: 'Rock',
      year: new Date().getFullYear(),
      price: 0,
      label: 'SPOTIFY Custom',
      condition: 'Mint',
      tracklist: orderedSongs.map((s) => s.trackName),
      coverImage: '/logo1.svg',
    };
    addItem(mixtapeRecord, format, total + getMixtapeFormatPrice(format), 'mixtape');
    toast({
      title: 'Mixtape added to cart',
      description: `Your mix (${format}) · $${(total + getMixtapeFormatPrice(format)).toFixed(2)}`,
    });
  };

  const grouped = useMemo(() => {
    const map = new Map<number, AlbumGroup>();
    for (const song of songs) {
      const group = map.get(song.record.id);
      if (group) {
        group.tracks.push({ trackIndex: song.trackIndex, trackName: song.trackName });
      } else {
        map.set(song.record.id, {
          record: song.record,
          tracks: [{ trackIndex: song.trackIndex, trackName: song.trackName }],
        });
      }
    }
    return Array.from(map.values()).map((group) => ({
      ...group,
      tracks: [...group.tracks].sort((a, b) => a.trackIndex - b.trackIndex),
    }));
  }, [songs]);

  if (songs.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8" style={{ fontWeight: 800 }}>
            Your Mixtape
          </h1>

          <div className="text-center py-20 border border-border/40 rounded-sm bg-card/30">
            <Disc3 className="w-16 h-16 mx-auto mb-6 text-primary" />
            <p className="text-xl text-muted-foreground mb-8">
              No songs yet. Build your own mix from our collection.
            </p>
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                data-testid="button-browse-songs"
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
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-5xl md:text-6xl font-extrabold" style={{ fontWeight: 800 }}>
            Your Mixtape
          </h1>
          <Button
            variant="ghost"
            onClick={clearMixtape}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            data-testid="button-clear-mixtape"
          >
            Clear Mixtape
          </Button>
        </div>
        <p className="text-lg text-muted-foreground mb-8">
          Pick tracks, we press your custom mix. {MIXTAPE_PRICE_PER_SONG} per song.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Song list */}
          <div className="lg:col-span-2 space-y-6">
            {grouped.map((group) => (
              <div
                key={group.record.id}
                className="p-6 border border-border/40 rounded-sm bg-card/30"
                data-testid={`mixtape-group-${group.record.id}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <Link href={`/record/${group.record.id}`} className="shrink-0">
                    <img
                      src={group.record.coverImage}
                      alt={group.record.title}
                      className="w-14 h-14 object-cover rounded-sm cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </Link>
                  <div className="min-w-0">
                    <Link href={`/record/${group.record.id}`}>
                      <h3 className="font-bold text-lg hover:text-primary transition-colors line-clamp-1">
                        {group.record.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {group.record.artist}
                    </p>
                  </div>
                </div>

                <ol className="space-y-2">
                  {group.tracks.map((track) => (
                    <li
                      key={track.trackIndex}
                      className="flex items-center gap-3 text-foreground/80"
                    >
                      <span className="text-muted-foreground font-mono text-sm min-w-[2rem]">
                        {String(track.trackIndex + 1).padStart(2, '0')}.
                      </span>
                      <span className="flex-1">{track.trackName}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSong(group.record.id, track.trackIndex)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                        data-testid={`button-remove-track-${group.record.id}-${track.trackIndex}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 border border-border/40 rounded-sm p-6 bg-card/30 space-y-6">
              <h2 className="text-2xl font-bold">Order Your Own Mix</h2>

              <div>
                <span className="text-muted-foreground block mb-3">Format</span>
                <div className="flex gap-3" data-testid="mixtape-format-selector">
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
                      data-testid={`button-mixtape-format-${option.toLowerCase()}`}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 border-b border-border/40 pb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Songs</span>
                  <span className="font-semibold" data-testid="text-song-count">
                    {songCount} × ${MIXTAPE_PRICE_PER_SONG.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Songs total</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{format} media</span>
                  <span className="font-semibold">${mediaPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Mix Total</span>
                <span
                  className="text-3xl font-extrabold text-secondary"
                  style={{ fontWeight: 800 }}
                  data-testid="text-mixtape-total"
                >
                  ${mixTotal.toFixed(2)}
                </span>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 rounded-sm"
                onClick={handleOrderMix}
                data-testid="button-order-mix"
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                Order Your Mix
              </Button>

              <Link href="/shop">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-border/40 font-semibold"
                  data-testid="button-add-more-songs"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Add More Songs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
