import { PrismaClient } from "@/generated/prisma"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { email, name, provider, providerId } = await request.json()

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.utilisateur.findUnique({
      where: { email },
    })

    if (existingUser) {
      // L'utilisateur existe déjà, générer un token et retourner ses infos
      const JWT_SECRET = process.env.JWT_SECRET
      if (!JWT_SECRET) {
        throw new Error("JWT_SECRET non configuré")
      }

      const token = jwt.sign(
        {
          id: existingUser.id_utilisateur,
          email: existingUser.email,
          provider,
        },
        JWT_SECRET,
        { expiresIn: "7d" },
      )

      return NextResponse.json({
        id_utilisateur: existingUser.id_utilisateur,
        email: existingUser.email,
        token,
        isNewUser: false,
      })
    }

    // Créer un nouvel utilisateur
    const newUser = await prisma.utilisateur.create({
      data: {
        email,
        password: "", // Pas de mot de passe pour les utilisateurs OAuth

      },
    })

    // Générer un token pour le nouvel utilisateur
    const JWT_SECRET = process.env.JWT_SECRET
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET non configuré")
    }

    const token = jwt.sign(
      {
        id: newUser.id_utilisateur,
        email: newUser.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    )

    return NextResponse.json({
      id_utilisateur: newUser.id_utilisateur,
      email: newUser.email,
      token,
      isNewUser: true,
    })
  } catch (error) {
    console.error("Erreur lors de la création/connexion OAuth:", error)
    return NextResponse.json({ message: "Erreur serveur lors de l'authentification OAuth" }, { status: 500 })
  }
}
