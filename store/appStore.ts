import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Locale } from '@/i18n/translations';

interface AppState {
  followedDomains: string[];
  recentSearches: string[];
  locale: Locale;
  followDomain: (domain: string) => void;
  unfollowDomain: (domain: string) => void;
  toggleFollowDomain: (domain: string) => void;
  isFollowing: (domain: string) => boolean;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  setLocale: (locale: Locale) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      followedDomains: [],
      recentSearches: [],
      locale: 'zh-TW' as Locale,
      
      followDomain: (domain) => {
        const current = get().followedDomains;
        if (!current.includes(domain)) {
          set({ followedDomains: [domain, ...current] });
        }
      },
      
      unfollowDomain: (domain) => {
        set({ followedDomains: get().followedDomains.filter(d => d !== domain) });
      },
      
      toggleFollowDomain: (domain) => {
        const current = get().followedDomains;
        if (current.includes(domain)) {
          set({ followedDomains: current.filter(d => d !== domain) });
        } else {
          set({ followedDomains: [domain, ...current] });
        }
      },
      
      isFollowing: (domain) => {
        return get().followedDomains.includes(domain);
      },
      
      addRecentSearch: (query) => {
        const current = get().recentSearches.filter(s => s !== query);
        set({ recentSearches: [query, ...current].slice(0, 10) });
      },
      
      clearRecentSearches: () => {
        set({ recentSearches: [] });
      },
      
      setLocale: (locale) => {
        set({ locale });
      },
    }),
    {
      name: 'whoisvibe-storage',
      storage: createJSONStorage(() => 
        typeof window !== 'undefined' ? localStorage : {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      ),
      skipHydration: true,
    }
  )
);
