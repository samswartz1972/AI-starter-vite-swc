import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login, register } from "./db";

type User = {
  id: number;
  username: string;
  email: string;
  name: string;
  avatar: string;
  role: "user" | "admin";
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: {
    username: string;
    email: string;
    password: string;
    name: string;
    avatar?: string;
  }) => Promise<boolean>;
  logout: () => void;
};

export const useAuth = create<AuthState>(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const user = await login(username, password);
          if (user) {
            set({ user, isAuthenticated: true, isLoading: false });
            return true;
          } else {
            set({ error: "Invalid username or password", isLoading: false });
            return false;
          }
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
          return false;
        }
      },
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          // Generate avatar if not provided
          if (!userData.avatar) {
            userData.avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`;
          }

          const user = await register(userData);
          set({ user, isAuthenticated: true, isLoading: false });
          return true;
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
          return false;
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
