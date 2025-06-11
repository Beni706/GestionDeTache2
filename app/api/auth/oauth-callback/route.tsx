import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@/generated/prisma"

const prisma = new PrismaClient()

/**
 * Cette route gère le callback après une authentification OAuth réussie
 * Elle crée ou met à jour l'utilisateur dans la base de données et génère un JWT
 */
export async function POST(request: Request) {
  try {
    const { email, name, provider, providerId } = await request.json()

    if (!email) {
      return NextResponse.json({ message: "Email requis" }, { status: 400 })
    }

    const JWT_SECRET = process.env.JWT_SECRET
    if (!JWT_SECRET) {
      console.error("JWT_SECRET n'est pas défini")
      return NextResponse.json({ message: "Erreur de configuration serveur" }, { status: 500 })
    }

    // Rechercher l'utilisateur existant ou en créer un nouveau
    let utilisateur = await prisma.utilisateur.findUnique({
      where: { email },
    })

    let isNewUser = false

    if (!utilisateur) {
      // Générer un mot de passe aléatoire hashé pour les comptes OAuth
      const randomPassword = Math.random().toString(36).slice(-10)
      const hashedPassword = await bcrypt.hash(randomPassword, 10)

      try {
        utilisateur = await prisma.utilisateur.create({
          data: {
            email,
            password: hashedPassword, // Mot de passe hashé
          },
        })
        isNewUser = true
        console.log("Nouvel utilisateur OAuth créé:", utilisateur.id_utilisateur)
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur:", error)
        return NextResponse.json({ message: "Erreur lors de la création du compte" }, { status: 500 })
      }
    }

    // Générer un JWT pour l'utilisateur
    const token = jwt.sign(
      {
        id: utilisateur.id_utilisateur,
        email: utilisateur.email,
        provider,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    )

    return NextResponse.json({
      message: "Authentification réussie",
      token,
      id_utilisateur: utilisateur.id_utilisateur,
      isNewUser,
    })
  } catch (error) {
    console.error("Erreur dans le callback OAuth:", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}
