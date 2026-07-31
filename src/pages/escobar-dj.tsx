import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Disc3, Shuffle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/Footer';
import { vinylRecords, type VinylRecord } from '@/data/records';

function pickRandom(currentId?: number): VinylRecord {
  const pool = currentId
    ? vinylRecords.filter((r) => r.id !== currentId)
    : vinylRecords;
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function EscobarDJ() {
  const [record, setRecord] = useState<VinylRecord>(() => pickRandom());

  const handleSpin = () => setRecord((prev) => pickRandom(prev.id));

  return (
    <div className="min-h-screen pt-32">
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            <div className="relative aspect-square overflow-hidden rounded-sm bg-muted">
              <img
                src="/escobar.jpg"
                alt="Escobar DJ"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            <div className="animate-on-scroll fade-in">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight" style={{ fontWeight: 800 }}>
                The Escobar DJ
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Let the Escobar DJ spin a surprise for you. One button,
                one random crate from our entire collection. Close your
                eyes and let the needle find the groove.
              </p>
              <div className="inline-flex items-center gap-3 text-sm font-bold tracking-wide text-primary">
                <Disc3 className="w-5 h-5" />
                Random rotation. Always fresh.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Random Album Pick */}
      <section className="py-20 border-t border-border/40 bg-card/30">
        <div className="container mx-auto px-6 max-w-md text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3" style={{ fontWeight: 800 }}>
            What's Spinning?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Hit the button and let the Escobar DJ choose
          </p>

          <motion.div
            key={record.id}
            initial={{ rotate: 0, scale: 0.85, opacity: 0 }}
            animate={{ rotate: 360, scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="aspect-square overflow-hidden rounded-sm bg-muted shadow-2xl mb-10"
          >
            <Link href={`/record/${record.id}`}>
              <img
                src={record.coverImage}
                alt={`${record.title} by ${record.artist}`}
                className="w-full h-full object-cover"
              />
            </Link>
          </motion.div>

          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-8 py-6 rounded-sm group"
            onClick={handleSpin}
            data-testid="button-escobar-dj"
          >
            <Shuffle className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Escobar DJ
          </Button>

          <div className="mt-8 space-y-2">
            <h3 className="text-2xl font-bold" data-testid="text-random-title">
              {record.title}
            </h3>
            <p className="text-lg text-muted-foreground" data-testid="text-random-artist">
              {record.artist}
            </p>
            <Badge
              variant="secondary"
              className="bg-accent/20 text-accent-foreground border-accent/30"
              data-testid="badge-random-genre"
            >
              {record.genre}
            </Badge>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
