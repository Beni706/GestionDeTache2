"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Github, Mail } from "lucide-react"
import { signIn } from "next-auth/react"
import { Separator } from "@/components/ui/separator"
import { AuthProvider } from "@/components/auth/auth-provider"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function RegisterPage() {
  // États pour gérer le formulaire et le chargement
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Fonction pour gérer l'inscription avec email/mot de passe
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Vérification que les mots de passe correspondent
    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Appel à l'API pour créer un compte
      const response = await fetch(`/api/utilisateur`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role: "USER",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'inscription")
      }

      toast({
        title: "Inscription réussie",
        description: "Vous pouvez maintenant vous connecter",
        variant: "default",
      })

      // Redirection vers la page de connexion
      router.push("/login")
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour gérer l'inscription avec OAuth (GitHub ou Google)
  const handleOAuthSignIn = async (provider: string) => {
    try {
      setOauthLoading(provider)
      console.log(`Tentative d'inscription avec ${provider}...`)

      // Utilisation de NextAuth pour l'inscription OAuth
      const result = await signIn(provider, {
        callbackUrl: "/dashboard",
        redirect: false, // Ne pas rediriger automatiquement pour gérer les erreurs
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      if (result?.url) {
        router.push(result.url)
      }
    } catch (error) {
      console.error(`Erreur lors de l'inscription avec ${provider}:`, error)
      toast({
        title: "Erreur d'inscription",
        description: `Erreur lors de l'inscription avec ${provider}. Vérifiez que le service est configuré.`,
        variant: "destructive",
      })
      setOauthLoading(null)
    }
  }

  return (
    <AuthProvider>
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
          <CardDescription>Entrez vos informations pour créer un compte</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemple@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Inscription en cours..." : "S'inscrire"}
              </Button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Ou continuer avec</span>
                </div>
              </div>

              {/* Bouton d'inscription avec GitHub */}
              <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={() => handleOAuthSignIn("github")}
                disabled={oauthLoading !== null}
              >
                <Github className="mr-2 h-4 w-4" />
                {oauthLoading === "github" ? "Inscription..." : "GitHub"}
              </Button>

              {/* Bouton d'inscription avec Google */}
              <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={() => handleOAuthSignIn("google")}
                disabled={oauthLoading !== null}
              >
                <Mail className="mr-2 h-4 w-4" />
                {oauthLoading === "google" ? "Inscription..." : "Google"}
              </Button>
            </div>
          </CardContent>
        </form>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Déjà un compte?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthProvider>
  )
}
