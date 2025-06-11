"use client"

import type React from "react"
import { SessionProvider } from "next-auth/react"

/**
 * Fournisseur d'authentification qui encapsule l'application
 * Permet d'utiliser les hooks de NextAuth dans les composants enfants
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
