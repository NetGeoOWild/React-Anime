import { create } from "zustand";
import type { User, Session } from "@supabase/supabase-js";

type AuthState = {
  user: User | null;
  session: Session | null;
  setAuth: (user: User | null, session: Session | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,

  setAuth: (user: AuthState["user"], session: AuthState["session"]) => {
    set({
      user,
      session,
    });
  },
}));
