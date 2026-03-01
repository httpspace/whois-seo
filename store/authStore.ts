import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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

const mockNotifications: Notification[] = [
  { id: '1', type: 'expiring', domain: 'example.com', message: '將在 3 天後到期', date: '2025-03-01', read: false },
  { id: '2', type: 'expiring', domain: 'mysite.org', message: '將在 7 天後到期', date: '2025-02-28', read: false },
  { id: '3', type: 'expired', domain: 'oldproject.net', message: '已到期', date: '2025-02-25', read: false },
  { id: '4', type: 'renewed', domain: 'company.io', message: '已成功續約至 2026-02-20', date: '2025-02-20', read: true },
  { id: '5', type: 'change', domain: 'startup.dev', message: 'WHOIS 資訊已變更', date: '2025-02-18', read: true },
  { id: '6', type: 'expiring', domain: 'portfolio.me', message: '將在 14 天後到期', date: '2025-02-15', read: true },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      notifications: mockNotifications,

      login: (user, token?: string) => {
        if (token && typeof window !== 'undefined') {
          localStorage.setItem('whoisvibe-jwt', token);
          // Parse is_admin from JWT payload (avoids extra API call)
          const payload = parseJwtPayload(token);
          user = { ...user, isAdmin: payload.is_admin === 1 };
        }
        set({ user, isLoggedIn: true });
      },
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('whoisvibe-jwt');
        }
        set({ user: null, isLoggedIn: false });
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
