import { Link } from 'wouter';
import { ArrowRight, Zap, Flame, CalendarDays, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';

const EVENTS = [
  {
    slug: 'thunder',
    name: 'THUNDER',
    tagline: 'The boom of music',
    description:
      'A Spotify-hosted celebration of sound. Feel the shake, hear the rumble, and ride the wave of the loudest night in music.',
    host: 'Hosted by SPOTIFY',
    date: 'Seasonal Drop',
    location: 'Spotify HQ & Beyond',
    image: '/logo1.svg',
    icon: Zap,
  },
  {
    slug: 'burning-man',
    name: 'BURNING MAN',
    tagline: 'The playa is calling.',
    description:
      'The desert ritual returns. Secure your spot at this year\u2019s burn and start planning your journey.',
    host: 'The Playa Collective',
    date: 'Annual Burn',
    location: 'Black Rock Desert',
    image: '/herobrun.jpg',
    icon: Flame,
  },
];

export default function Events() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg.png"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <img
            src="/logo1.svg"
            alt="SPOTIFY logo"
            className="w-[6rem] h-[6rem] mx-auto mb-6"
          />
          <h1
            className="text-fluid-hero font-extrabold mb-4 tracking-tight"
            style={{ fontWeight: 800 }}
          >
            EVENTS
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Live experiences curated by the SPOTIFY crew.
            <br />
            Two events. One boom. Zero excuses.
          </p>
          <div className="squiggle mx-auto" aria-hidden="true" />
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-32 relative isolate overflow-hidden">
        <div
          className="text-outline -z-10 pointer-events-none select-none absolute top-8 left-1/2 -translate-x-1/2 text-[6rem] md:text-[12rem] font-extrabold whitespace-nowrap"
          aria-hidden="true"
          style={{ fontWeight: 800 }}
        >
          EVENTS
        </div>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {EVENTS.map((event) => (
              <div
                key={event.slug}
                className="group relative border border-border/40 rounded-sm bg-card/30 overflow-hidden hover:border-primary/40 transition-colors"
                data-testid={`event-card-${event.slug}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="badge-retro bg-background/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                      {event.host}
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <CalendarDays className="w-4 h-4" />
                    <span>{event.date}</span>
                    <span className="mx-1">·</span>
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <event.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    <h2
                      className="text-4xl font-extrabold"
                      style={{ fontWeight: 800 }}
                    >
                      {event.name}
                    </h2>
                  </div>
                  <p className="text-lg text-primary mb-3 font-semibold">
                    &ldquo;{event.tagline}&rdquo;
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {event.description}
                  </p>
                  <Link href={`/${event.slug}`}>
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-8 py-6 rounded-sm group/btn"
                      data-testid={`button-event-${event.slug}`}
                    >
                      Get Tickets
                      <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
