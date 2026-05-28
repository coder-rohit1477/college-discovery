import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompareState {
  selectedCollegeSlugs: string[];
  addCollege: (slug: string) => void;
  removeCollege: (slug: string) => void;
  clearComparison: () => void;
  isMaxReached: boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      selectedCollegeSlugs: [],
      isMaxReached: false,
      addCollege: (slug: string) => {
        const { selectedCollegeSlugs } = get();
        if (selectedCollegeSlugs.length >= 4) return;
        if (selectedCollegeSlugs.includes(slug)) return;
        
        const newSlugs = [...selectedCollegeSlugs, slug];
        set({ 
          selectedCollegeSlugs: newSlugs,
          isMaxReached: newSlugs.length >= 4
        });
      },
      removeCollege: (slug: string) => {
        const { selectedCollegeSlugs } = get();
        const newSlugs = selectedCollegeSlugs.filter((s) => s !== slug);
        set({ 
          selectedCollegeSlugs: newSlugs,
          isMaxReached: newSlugs.length >= 4
        });
      },
      clearComparison: () => set({ selectedCollegeSlugs: [], isMaxReached: false }),
    }),
    {
      name: 'college-compare-storage',
    }
  )
);
