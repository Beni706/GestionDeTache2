"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { AuthProvider } from "@/components/auth/auth-provider"
import { useSession } from "next-auth/react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { data: session, status } = useSession()

  // Vérification de l'authentification via localStorage ou NextAuth
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token")
      console.log("DashboardLayout: Vérification de l'authentification")
      console.log("DashboardLayout: Token localStorage", token ? "Présent" : "Absent")
      console.log("DashboardLayout: Session NextAuth", status)
      console.log("DashboardLayout: Session data", session)

      // Si NextAuth est encore en cours de chargement, attendre
      if (status === "loading") {
        return
      }

      // Si l'utilisateur n'est pas authentifié ni par JWT ni par NextAuth
      if (!token && status === "unauthenticated") {
        console.log("DashboardLayout: Non authentifié, redirection vers login")
        router.push("/login")
        return
      }

      // Si l'utilisateur est authentifié par NextAuth
      if (status === "authenticated") {
        // Vérifier si nous avons un token API dans la session
        if (!session?.user?.apiToken && !session?.accessToken) {
          console.log("DashboardLayout: Session authentifiée mais pas de token API, redirection vers login")
          router.push("/login")
          return
        }

        console.log("DashboardLayout: Authentifié par NextAuth, affichage du dashboard")
        setIsLoading(false)
        return
      }

      // Si l'utilisateur a un token JWT dans localStorage
      if (token) {
        console.log("DashboardLayout: Authentifié par JWT, affichage du dashboard")
        setIsLoading(false)
        return
      }

      // Par défaut, rediriger vers login si aucune condition n'est remplie
      console.log("DashboardLayout: État indéterminé, redirection vers login")
      router.push("/login")
    }

    // Attendre un court instant pour s'assurer que localStorage est disponible
    setTimeout(checkAuth, 100)
  }, [router, status, session])

  // Afficher le loader pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <AuthProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar pour la navigation */}
        <Sidebar />
        {/* Contenu principal */}
        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">{children}</main>
      </div>
    </AuthProvider>
  )
}
