import { Link } from 'wouter';
import type { VinylRecord } from '@/data/records';
import { Badge } from '@/components/ui/badge';

interface RecordCardProps {
  record: VinylRecord;
}

export function RecordCard({ record }: RecordCardProps) {
  return (
    <Link href={`/record/${record.id}`} data-testid={`card-record-${record.id}`}>
      <div className="group cursor-pointer">
        <div className="relative aspect-square mb-4 overflow-hidden rounded-sm bg-muted">
          <img 
            src={record.coverImage} 
            alt={`${record.title} by ${record.artist}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            data-testid={`img-album-${record.id}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 
                className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1"
                data-testid={`text-title-${record.id}`}
              >
                {record.title}
              </h3>
              <p 
                className="text-sm text-muted-foreground line-clamp-1"
                data-testid={`text-artist-${record.id}`}
              >
                {record.artist}
              </p>
            </div>
            <Badge 
              variant="secondary" 
              className="shrink-0 bg-accent/20 text-accent-foreground border-accent/30"
              data-testid={`badge-genre-${record.id}`}
            >
              {record.genre}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground" data-testid={`text-year-${record.id}`}>
              {record.year}
            </span>
            <span 
              className="font-bold text-lg text-secondary"
              data-testid={`text-price-${record.id}`}
            >
              ${record.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
