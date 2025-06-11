"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function OAuthStatus() {
  // Vérifier si les services OAuth sont configurés côté client
  const isGitHubConfigured = process.env.NEXT_PUBLIC_GITHUB_ENABLED === "true"
  const isGoogleConfigured = process.env.NEXT_PUBLIC_GOOGLE_ENABLED === "true"

  if (isGitHubConfigured && isGoogleConfigured) {
    return null // Tout est configuré, ne rien afficher
  }

  return (
    <div className="space-y-2 mb-4">
      {!isGitHubConfigured && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            L'authentification GitHub n'est pas configurée. Contactez l'administrateur.
          </AlertDescription>
        </Alert>
      )}
      {!isGoogleConfigured && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            L'authentification Google n'est pas configurée. Contactez l'administrateur.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
