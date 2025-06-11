"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Github, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
// import { AuthProvider } from "@/components/auth/auth-provider" // Supprimé

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  // États pour gérer le formulaire et le chargement
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  // Fonction pour gérer la connexion avec email/mot de passe
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Tentative de connexion avec l'API
      const response = await fetch(`${API_URL}/utilisateur/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.message || "Erreur de connexion");
      }

      // Stockage du token, du rôle et de l'id utilisateur dans le localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.id_utilisateur);

      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté",
        variant: "default",
      });

      // Redirection vers le dashboard
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description:
          error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour gérer la connexion avec OAuth (GitHub ou Google)
  const handleOAuthSignIn = async (provider: string) => {
    try {
      setOauthLoading(provider);
      console.log(`Tentative de connexion avec ${provider}...`);

      // Utilisation de NextAuth pour la connexion OAuth
      const result = await signIn(provider, {
        callbackUrl: "/dashboard",
        redirect: false, // Ne pas rediriger automatiquement pour gérer les erreurs
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error(`Erreur lors de la connexion avec ${provider}:`, error);
      toast({
        title: "Erreur de connexion",
        description: `Erreur lors de la connexion avec ${provider}. Vérifiez que le service est configuré.`,
        variant: "destructive",
      });
      setOauthLoading(null);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
        <CardDescription>
          Entrez vos identifiants pour accéder à votre compte
        </CardDescription>
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mot de passe</Label>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou continuer avec
                </span>
              </div>
            </div>

            {/* Bouton de connexion avec GitHub */}
            <Button
              variant="outline"
              type="button"
              className="w-full"
              onClick={() => handleOAuthSignIn("github")}
              disabled={oauthLoading !== null}
            >
              <Github className="mr-2 h-4 w-4" />
              {oauthLoading === "github" ? "Connexion..." : "GitHub"}
            </Button>

            {/* Bouton de connexion avec Google */}
            <Button
              variant="outline"
              type="button"
              className="w-full"
              onClick={() => handleOAuthSignIn("google")}
              disabled={oauthLoading !== null}
            >
              <Mail className="mr-2 h-4 w-4" />
              {oauthLoading === "google" ? "Connexion..." : "Google"}
            </Button>
          </div>
        </CardContent>
      </form>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Pas encore de compte?{" "}
          <Link href="/register" className="text-primary hover:underline">
            S&apos;inscrire
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
