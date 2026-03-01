import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Locale } from '@/i18n/translations';
import { fetchUserFollows, addUserFollow, removeUserFollow } from '@/lib/api';

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
  /** Call after login: loads server follows and merges with local */
  syncFollowsFromServer: () => Promise<void>;
  /** Call after logout: clear follows */
  clearFollows: () => void;
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
          addUserFollow(domain); // fire-and-forget; ok if not logged in (returns false)
        }
      },

      unfollowDomain: (domain) => {
        set({ followedDomains: get().followedDomains.filter(d => d !== domain) });
        removeUserFollow(domain); // fire-and-forget
      },

      toggleFollowDomain: (domain) => {
        const current = get().followedDomains;
        if (current.includes(domain)) {
          set({ followedDomains: current.filter(d => d !== domain) });
          removeUserFollow(domain);
        } else {
          set({ followedDomains: [domain, ...current] });
          addUserFollow(domain);
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

      syncFollowsFromServer: async () => {
        const serverDomains = await fetchUserFollows();
        if (!serverDomains) return; // not logged in or network error
        // Merge: server is authoritative; add any local-only items that exist in server response
        set({ followedDomains: serverDomains });
      },

      clearFollows: () => {
        set({ followedDomains: [] });
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
      // followedDomains is D1-authoritative — never persist to localStorage
      partialize: (state) => ({ recentSearches: state.recentSearches, locale: state.locale }),
      skipHydration: true,
    }
  )
);
