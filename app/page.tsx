import { redirect } from "next/navigation"

// Page d'accueil qui redirige vers la page de connexion
export default function Home() {
  // Redirection automatique vers la page de connexion
  redirect("/login")
}
