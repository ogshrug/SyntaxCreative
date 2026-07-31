import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { VinylRecord } from '@/data/records';

export const MIXTAPE_PRICE_PER_SONG = 5;

export interface MixtapeSong {
  record: VinylRecord;
  trackIndex: number;
  trackName: string;
}

interface MixtapeStore {
  songs: MixtapeSong[];
  addSong: (song: MixtapeSong) => void;
  removeSong: (recordId: number, trackIndex: number) => void;
  clearMixtape: () => void;
  songCount: number;
  total: number;
}

export const useMixtape = create<MixtapeStore>()(
  persist(
    (set, get) => ({
      songs: [],
      songCount: 0,
      total: 0,

      addSong: (song) => {
        const exists = get().songs.some(
          (s) => s.record.id === song.record.id && s.trackIndex === song.trackIndex,
        );
        if (exists) return;

        set({ songs: [...get().songs, song] });
        const count = get().songs.length;
        set({
          songCount: count,
          total: count * MIXTAPE_PRICE_PER_SONG,
        });
      },

      removeSong: (recordId, trackIndex) => {
        set({
          songs: get().songs.filter(
            (s) => !(s.record.id === recordId && s.trackIndex === trackIndex),
          ),
        });
        const count = get().songs.length;
        set({
          songCount: count,
          total: count * MIXTAPE_PRICE_PER_SONG,
        });
      },

      clearMixtape: () => {
        set({ songs: [], songCount: 0, total: 0 });
      },
    }),
    {
      name: 'spotify-mixtape',
    },
  ),
);
