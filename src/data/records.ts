export interface VinylRecord {
  id: number;
  title: string;
  artist: string;
  genre: 'Jazz' | 'Soul' | 'Electronic' | 'Hip-Hop' | 'Rock' | 'Ambient';
  year: number;
  price: number;
  label: string;
  condition: 'Mint' | 'Near Mint' | 'Very Good Plus';
  tracklist: string[];
  coverImage: string;
  description?: string;
}

export const vinylRecords: VinylRecord[] = [
  {
    id: 1,
    title: 'Blue Horizon',
    artist: 'Marcus Webb Quartet',
    genre: 'Jazz',
    year: 1965,
    price: 87.50,
    label: 'Prestige Records',
    condition: 'Near Mint',
    coverImage: '/albums/jazz-1.jpg',
    description: 'A lost gem from the hard bop era. Marcus Webb\'s only recording as a leader features stellar performances from a young Freddie Hubbard.',
    tracklist: [
      'Blue Horizon',
      'Night in Tunisia (Alternate Take)',
      'Stella by Starlight',
      'Webb\'s Way',
      'Maiden Voyage (Early Version)'
    ]
  },
  {
    id: 2,
    title: 'Cosmic Soul Journey',
    artist: 'The Afro-Fusion Collective',
    genre: 'Soul',
    year: 1973,
    price: 124.00,
    label: 'Stax Records',
    condition: 'Very Good Plus',
    coverImage: '/albums/soul-1.jpg',
    description: 'Rare psychedelic soul masterpiece blending African rhythms with deep funk grooves. Original pressing, minimal ring wear.',
    tracklist: [
      'Rise Up',
      'Funky Meditation',
      'Soul Fire',
      'Cosmic Dance',
      'Journey Home',
      'Universal Love'
    ]
  },
  {
    id: 3,
    title: 'Neon Circuits',
    artist: 'Synthetix',
    genre: 'Electronic',
    year: 1984,
    price: 62.00,
    label: 'Factory Records',
    condition: 'Mint',
    coverImage: '/albums/electronic-1.jpg',
    description: 'Early electro-industrial classic. Factory Records pressing still sealed, never played. A cornerstone of the synth movement.',
    tracklist: [
      'Digital Dreams',
      'Circuit Breaker',
      'Neon Nights',
      'Machine Language',
      'Electric Pulse',
      'System Reboot'
    ]
  },
  {
    id: 4,
    title: 'Concrete Chronicles',
    artist: 'The Ill Method',
    genre: 'Hip-Hop',
    year: 1994,
    price: 156.00,
    label: 'Rawkus Records',
    condition: 'Near Mint',
    coverImage: '/albums/hiphop-1.jpg',
    description: 'Underground hip-hop classic from the golden era. DJ Premier production throughout. First pressing with original inserts.',
    tracklist: [
      'Intro (The Method)',
      'Brooklyn Warfare',
      'Lyrical Architect',
      'Concrete Jungle',
      'Interlude',
      'Night Shift',
      'Street Wisdom',
      'Outro'
    ]
  },
  {
    id: 5,
    title: 'Celestial Drift',
    artist: 'Aetherium',
    genre: 'Ambient',
    year: 2018,
    price: 45.00,
    label: 'Kranky',
    condition: 'Mint',
    coverImage: '/albums/ambient-1.jpg',
    description: 'Modern ambient masterwork. Limited edition 180g pressing on translucent blue vinyl. Perfect for late-night listening.',
    tracklist: [
      'Dawn Ascending',
      'Weightless',
      'Cloud Formations',
      'Celestial Drift',
      'Twilight Descent'
    ]
  },
  {
    id: 6,
    title: 'Modal Explorations',
    artist: 'The Bill Evans Trio',
    genre: 'Jazz',
    year: 1961,
    price: 210.00,
    label: 'Riverside',
    condition: 'Very Good Plus',
    coverImage: '/albums/jazz-1.jpg',
    description: 'Legendary trio recording. Original Riverside pressing with deep groove label. Light surface marks do not affect play.',
    tracklist: [
      'Waltz for Debby',
      'My Foolish Heart',
      'Detour Ahead',
      'Sunday at the Village Vanguard',
      'Gloria\'s Step'
    ]
  },
  {
    id: 7,
    title: 'Velvet Revolution',
    artist: 'The Soul Defenders',
    genre: 'Soul',
    year: 1969,
    price: 93.00,
    label: 'Atlantic',
    condition: 'Near Mint',
    coverImage: '/albums/soul-1.jpg',
    description: 'Deep soul with orchestral arrangements. Atlantic mono pressing, exceptionally clean for its age.',
    tracklist: [
      'Love Revolution',
      'Stand Together',
      'Velvet Morning',
      'Soul Power',
      'Freedom March',
      'Together We Rise'
    ]
  },
  {
    id: 8,
    title: 'Analog Dreams',
    artist: 'Modular Synthesis Project',
    genre: 'Electronic',
    year: 2015,
    price: 52.00,
    label: 'Warp Records',
    condition: 'Mint',
    coverImage: '/albums/electronic-1.jpg',
    description: 'All-analog synthesis exploration. Gatefold sleeve with detailed patch notes. Limited to 500 copies.',
    tracklist: [
      'Oscillator',
      'Filter Sweep',
      'Analog Dreams',
      'Modulation Matrix',
      'Envelope Generator',
      'LFO Variations'
    ]
  },
  {
    id: 9,
    title: 'Enter the Chamber',
    artist: 'Wu-Elements',
    genre: 'Hip-Hop',
    year: 1997,
    price: 178.00,
    label: 'Loud Records',
    condition: 'Near Mint',
    coverImage: '/albums/hiphop-1.jpg',
    description: 'Essential 90s hip-hop. RZA production, kung-fu samples, gritty New York sound. Original pressing with poster intact.',
    tracklist: [
      'Chamber Music (Intro)',
      'Shaolin Shadowboxing',
      'Liquid Swords',
      '36 Chambers',
      'Triumph',
      'Clan in da Front'
    ]
  },
  {
    id: 10,
    title: 'Thunder Road',
    artist: 'The Midnight Riders',
    genre: 'Rock',
    year: 1975,
    price: 68.00,
    label: 'Columbia',
    condition: 'Very Good Plus',
    coverImage: '/albums/jazz-1.jpg',
    description: 'Classic rock double album. Gatefold sleeve with original lyric sheet. Minor edge wear, vinyl is clean.',
    tracklist: [
      'Thunder Road',
      'Born to Run',
      'Backstreets',
      'Jungleland',
      'Tenth Avenue Freeze-Out',
      'She\'s the One'
    ]
  },
  {
    id: 11,
    title: 'Infinite Textures',
    artist: 'Sound Bath Collective',
    genre: 'Ambient',
    year: 2020,
    price: 38.50,
    label: 'Ghost Box',
    condition: 'Mint',
    coverImage: '/albums/ambient-1.jpg',
    description: 'Contemporary ambient soundscapes. Field recordings blended with synthesizers. Eco-friendly recycled vinyl pressing.',
    tracklist: [
      'Emergence',
      'Tidal Patterns',
      'Infinite Textures',
      'Memory Palace',
      'Slow Dissolve'
    ]
  },
  {
    id: 12,
    title: 'Hard Bop Legacy',
    artist: 'Art Blakey & The Jazz Messengers',
    genre: 'Jazz',
    year: 1958,
    price: 265.00,
    label: 'Blue Note',
    condition: 'Very Good Plus',
    coverImage: '/albums/jazz-1.jpg',
    description: 'Iconic Blue Note recording. Original pressing with Lexington Ave address. Highly collectible, strong VG+ with light crackle in quiet passages.',
    tracklist: [
      'Moanin\'',
      'Are You Real',
      'Along Came Betty',
      'The Drum Thunder Suite',
      'Blues March'
    ]
  }
];

export const genres = ['All', 'Jazz', 'Soul', 'Electronic', 'Hip-Hop', 'Rock', 'Ambient'] as const;
