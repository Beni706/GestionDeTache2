import type React from "react"
// Layout spécifique pour les pages d'authentification (login, register)
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Conteneur centré avec un fond dégradé pour les pages d'authentification
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}
