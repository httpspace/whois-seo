import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useAppStore } from '@/store/appStore';

interface User {
  email: string;
  name: string;
  avatar?: string;
  isAdmin?: boolean;
}

function parseJwtPayload(token: string): Record<string, unknown> {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return {};
  }
}

interface Notification {
  id: string;
  type: 'expiring' | 'expired' | 'renewed' | 'change';
  domain: string;
  message: string;
  date: string;
  read: boolean;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  notifications: Notification[];
  login: (user: User, token?: string) => void;
  logout: () => void;
  checkAndClearExpired: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: () => number;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      notifications: [],

      login: (user, token?: string) => {
        if (token && typeof window !== 'undefined') {
          localStorage.setItem('whoisvibe-jwt', token);
          // Parse is_admin from JWT payload (avoids extra API call)
          const payload = parseJwtPayload(token);
          user = { ...user, isAdmin: payload.is_admin === 1 };
        }
        set({ user, isLoggedIn: true });
        // Load server-side follows after login (async, non-blocking)
        useAppStore.getState().syncFollowsFromServer();
      },
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('whoisvibe-jwt');
        }
        set({ user: null, isLoggedIn: false });
        useAppStore.getState().clearFollows();
      },

      // Called after rehydration to evict expired sessions (JWT exp check)
      checkAndClearExpired: () => {
        if (typeof window === 'undefined') return;
        const token = localStorage.getItem('whoisvibe-jwt');
        if (!token) return;
        try {
          const payload = parseJwtPayload(token);
          const exp = payload.exp as number | undefined;
          if (exp && Math.floor(Date.now() / 1000) > exp) {
            localStorage.removeItem('whoisvibe-jwt');
            set({ user: null, isLoggedIn: false });
          }
        } catch {
          // Malformed token — clear it
          localStorage.removeItem('whoisvibe-jwt');
          set({ user: null, isLoggedIn: false });
        }
      },

      markAsRead: (id) => {
        set({
          notifications: get().notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          ),
        });
      },

      markAllAsRead: () => {
        set({
          notifications: get().notifications.map(n => ({ ...n, read: true })),
        });
      },

      unreadCount: () => get().notifications.filter(n => !n.read).length,
    }),
    {
      name: 'whoisvibe-auth',
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
