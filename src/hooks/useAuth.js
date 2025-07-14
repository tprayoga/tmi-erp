// src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../contexts/supabaseContext";

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
