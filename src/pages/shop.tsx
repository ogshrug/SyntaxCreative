import { useState, useMemo } from 'react';
import { RecordCard } from '@/components/RecordCard';
import { vinylRecords, genres } from '@/data/records';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';

export default function Shop() {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  const filteredRecords = useMemo(() => {
    if (selectedGenre === 'All') {
      return vinylRecords;
    }
    return vinylRecords.filter((record) => record.genre === selectedGenre);
  }, [selectedGenre]);

  return (
    <div className="min-h-screen pt-32 flex flex-col">
      <div className="container mx-auto px-6 flex-1 w-full pb-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4" style={{ fontWeight: 800 }}>
            The Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {filteredRecords.length} records spanning decades of musical excellence
          </p>
        </div>

        {/* Genre Filter */}
        <div className="mb-12 flex flex-wrap gap-3">
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? 'default' : 'outline'}
              onClick={() => setSelectedGenre(genre)}
              className={
                selectedGenre === genre
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground font-semibold'
                  : 'border-border/40 text-foreground hover:border-primary hover:text-primary font-semibold'
              }
              data-testid={`button-filter-${genre.toLowerCase()}`}
            >
              {genre}
            </Button>
          ))}
        </div>

        {/* Records Grid */}
        {filteredRecords.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredRecords.map((record) => (
              <div key={record.id} className="fade-in">
                <RecordCard record={record} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No records found in this genre. Check back soon.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
