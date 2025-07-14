// src/contexts/supabaseContext.js
import { createContext, useEffect, useReducer, useMemo } from "react";
import { supabase } from "../lib/supabase"; // supabase client kamu

const initialAuthState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "AUTH_STATE_CHANGED":
      return {
        ...state,
        ...action.payload,
        isInitialized: true,
      };
    default:
      return state;
  }
};

const signInWithEmail = async (email, password) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

const signInWithGoogle = async () => {
  return await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${window.location.origin}/dashboard` },
  });
};

const signOut = async () => {
  return await supabase.auth.signOut();
};

export const AuthContext = createContext({
  ...initialAuthState,
  method: "SUPABASE",
  signInWithEmail,
  signInWithGoogle,
  signOut,
});

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (session?.user) {
        dispatch({
          type: "AUTH_STATE_CHANGED",
          payload: {
            isAuthenticated: true,
            user: session.user,
          },
        });
      } else {
        dispatch({
          type: "AUTH_STATE_CHANGED",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch({
        type: "AUTH_STATE_CHANGED",
        payload: {
          isAuthenticated: !!session?.user,
          user: session?.user || null,
        },
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const contextValue = useMemo(
    () => ({
      ...state,
      method: "SUPABASE",
      signInWithEmail,
      signInWithGoogle,
      signOut,
    }),
    [state]
  );

  if (!state.isInitialized) return <div>Loading...</div>;

  return <AuthContext value={contextValue}>{children}</AuthContext>;
}
