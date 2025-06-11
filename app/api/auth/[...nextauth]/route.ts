import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
import { PrismaClient } from "@/generated/prisma"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

// Vérifier si les variables d'environnement sont définies avant d'utiliser les providers
const providers = []

// Ajouter GitHub seulement si les identifiants sont configurés
if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  )
}

// Ajouter Google seulement si les identifiants sont configurés
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  )
}

// Toujours ajouter le provider Credentials
providers.push(
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Mot de passe", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null
      }

      try {
        // Appel à notre API de connexion
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/utilisateur/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || "Erreur de connexion")
        }

        // Retourner les informations de l'utilisateur avec le token
        return {
          id: data.id_utilisateur?.toString() || "1",
          email: credentials.email,
          token: data.token,
          apiToken: data.token,
        }
      } catch (error) {
        console.error("Erreur d'authentification:", error)
        return null
      }
    },
  }),
)

/**
 * Configuration de NextAuth pour l'authentification
 */
export const authOptions: NextAuthOptions = {
  providers,

  // Configuration des pages personnalisées
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },

  // Configuration des callbacks pour personnaliser le comportement
  callbacks: {
    // Callback appelé lors de la connexion pour vérifier/créer l'utilisateur
    async signIn({ user, account, profile }) {
      console.log("NextAuth signIn callback - User:", user.email)
      console.log("NextAuth signIn callback - Provider:", account?.provider)

      // Pour les connexions OAuth (Google, GitHub)
      if (account && (account.provider === "google" || account.provider === "github")) {
        try {
          if (!user.email) {
            console.error("Pas d'email fourni par le provider OAuth")
            return false
          }

          // Vérifier si l'utilisateur existe déjà dans notre base de données
          let utilisateur = await prisma.utilisateur.findUnique({
            where: { email: user.email },
          })

          let isNewUser = false

          // Si l'utilisateur n'existe pas, le créer
          if (!utilisateur) {
            console.log(`Création d'un nouvel utilisateur OAuth pour ${user.email}`)
            // Générer un mot de passe aléatoire hashé pour les comptes OAuth
            const randomPassword = Math.random().toString(36).slice(-10)
            const hashedPassword = await bcrypt.hash(randomPassword, 10)

            try {
              utilisateur = await prisma.utilisateur.create({
                data: {
                  email: user.email,
                  password: hashedPassword,
                },
              })
              isNewUser = true
              console.log("Nouvel utilisateur OAuth créé:", utilisateur.id_utilisateur)
            } catch (error) {
              console.error("Erreur lors de la création de l'utilisateur:", error)
              return false
            }
          } else {
            console.log(`Utilisateur OAuth existant trouvé pour ${user.email}:`, utilisateur.id_utilisateur)
          }

          // Générer un JWT pour l'utilisateur
          const JWT_SECRET = process.env.JWT_SECRET
          if (!JWT_SECRET) {
            console.error("JWT_SECRET n'est pas défini")
            return false
          }

          const jwt = require("jsonwebtoken")
          const token = jwt.sign(
            {
              id: utilisateur.id_utilisateur,
              email: utilisateur.email,
              provider: account.provider,
            },
            JWT_SECRET,
            { expiresIn: "7d" },
          )

          // Ajouter les données de notre base de données à l'objet user
          user.id = utilisateur.id_utilisateur.toString()
          user.apiToken = token
          user.isNewUser = isNewUser

          return true
        } catch (error) {
          console.error("Erreur lors de la connexion OAuth:", error)
          return false
        }
      }

      // Pour les connexions avec credentials, laisser passer
      return true
    },

    // Ajouter des informations supplémentaires au token JWT
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.accessToken = user.apiToken || user.token || ""
        token.apiToken = user.apiToken || ""
        token.isNewUser = user.isNewUser || false
      }

      return token
    },

    // Ajouter des informations supplémentaires à la session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.apiToken = token.apiToken as string
        session.user.isNewUser = token.isNewUser as boolean
      }
      session.accessToken = token.accessToken as string
      return session
    },

    // Redirection après connexion
    async redirect({ url, baseUrl }) {
      // Rediriger vers le dashboard après connexion
      return `${baseUrl}/dashboard`
    },
  },

  // Configuration de la session
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 jours
  },

  // Autres options
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
