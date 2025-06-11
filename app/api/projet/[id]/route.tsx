import { PrismaClient } from "@/generated/prisma"
import { verifyJWT } from "@/lib/auth"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

// Récupérer une catégorie par ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const isAuthenticated = await verifyJWT(request)
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 })
  }

  try {
    const id = Number.parseInt(params.id)

    const projet = await prisma.projet.findUnique({
      where: { id_projet: id },
    })
    return NextResponse.json(projet, { status: 200 })
  } catch (error) {
    console.log("Erreur serveur : ", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}

// Modifier une projet
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const isAuthenticated = await verifyJWT(request)
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 })
  }

  try {
    const id = Number.parseInt(params.id)
    const { nom, id_utilisateur } = await request.json()

    // vérifier si la projet existe
    const existeprojet = await prisma.projet.findUnique({
      where: { id_projet: id },
    })
    if (!existeprojet) {
      return NextResponse.json({ message: "Catégorie non trouvée" }, { status: 404 })
    }

    // Modifier la projet
    const projet = await prisma.projet.update({
      where: { id_projet: id },
      data: {
        nom,
        id_utilisateur: Number.parseInt(id_utilisateur),
      },
    })
    return NextResponse.json({ message: "Catégorie modifiée avec succès", projet }, { status: 200 })
  } catch (error) {
    console.log("Erreur serveur : ", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}

// Supprimer un projet
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const isAuthenticated = await verifyJWT(request)
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 })
  }

  try {
    const id = Number.parseInt(params.id)

    // vérifier si le projet existe
    const existeprojet = await prisma.projet.findUnique({
      where: { id_projet: id },
    })
    if (!existeprojet) {
      return NextResponse.json({ message: "Catégorie non trouvée" }, { status: 404 })
    }

    await prisma.projet.delete({
      where: { id_projet: id },
    })
    return NextResponse.json({ message: "Catégorie supprimée avec succès" }, { status: 200 })
  } catch (error) {
    console.log("Erreur serveur :", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}
