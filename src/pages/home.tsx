import { Link } from 'wouter';
import { ArrowRight, Award, Truck, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { RecordCard } from '@/components/RecordCard';
import { Footer } from '@/components/Footer';
import { vinylRecords } from '@/data/records';
import { useEffect, useRef } from 'react';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const featuredRecords = vinylRecords.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg.png"
            alt=""
            className="w-full h-full object-cover opacity-50"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-block mb-8 animate-on-scroll">
            <img
              src="/logo1.svg"
              alt="SPOTIFY logo"
              className="w-[7.5rem] h-[7.5rem] mx-auto mb-6"
            />
          </div>
          
          <h1 
            className="text-7xl md:text-9xl font-extrabold mb-6 tracking-tight animate-on-scroll"
            style={{ fontWeight: 800, animationDelay: '100ms' }}
          >
            SPOTIFY
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-on-scroll"
            style={{ animationDelay: '200ms' }}
          >
            Curated vinyl for audiophiles who treat records as art objects.
            <br />
            Every pressing tells a story.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-on-scroll" style={{ animationDelay: '300ms' }}>
            <Link href="/shop">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-8 py-6 rounded-sm group"
                data-testid="button-browse-collection"
              >
                Browse Collection
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border/40 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Records in Stock', value: '2,400+' },
              { label: 'Rare Pressings', value: '500+' },
              { label: 'Years Experience', value: '15' },
              { label: 'Happy Collectors', value: '8,000+' },
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2" style={{ fontWeight: 800 }}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Records */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-4" style={{ fontWeight: 800 }}>
              Featured Arrivals
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hand-selected gems from legendary labels and underground pressings
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredRecords.map((record, index) => (
              <div 
                key={record.id} 
                className="animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <RecordCard record={record} />
              </div>
            ))}
          </div>
          
          <div className="text-center animate-on-scroll">
            <Link href="/shop">
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary/40 text-foreground hover:bg-primary hover:text-primary-foreground font-semibold"
                data-testid="button-view-all"
              >
                View Full Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={featuresRef} className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight" style={{ fontWeight: 800 }}>
              The SPOTIFY Difference
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We obsess over every detail so you can focus on the music
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Award,
                title: 'Authenticated Pressings',
                description: 'Every record verified by Escobars. We know every pressing date, mastering engineer, and label variant.',
              },
              {
                icon: ShieldCheck,
                title: 'Condition Guaranteed',
                description: 'Graded by Escobar standards. What we say is what you get. No surprises, no disappointments.',
              },
              {
                icon: Truck,
                title: 'Protected Shipping',
                description: 'Custom-built mailers, double-boxed, with corner protectors. Your vinyl arrives exactly as it left.',
              },
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="text-center group animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <feature.icon className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold mb-3 leading-snug">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Genre Spotlight */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-4" style={{ fontWeight: 800 }}>
              Explore by Genre
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From bebop to breakbeats, we dig deep
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Jazz', 'Soul', 'Electronic', 'Hip-Hop', 'Rock', 'Ambient'].map((genre, index) => (
              <Link 
                key={genre} 
                href={`/shop?genre=${genre}`}
              >
                <div 
                  className="p-8 border border-border/40 rounded-sm hover:border-primary hover:bg-primary/5 transition-all duration-300 text-center group cursor-pointer animate-on-scroll"
                  style={{ animationDelay: `${index * 50}ms` }}
                  data-testid={`button-genre-${genre.toLowerCase()}`}
                >
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                    {genre}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 border-t border-border/40">
        <div className="container mx-auto px-6 max-w-3xl text-center animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ fontWeight: 800 }}>
            Join the Spot Droppers
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Weekly drops, exclusive first looks, and stories behind the pressings
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-1 px-6 py-4 bg-muted border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              data-testid="input-newsletter-email"
            />
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 rounded-sm"
              data-testid="button-subscribe"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
