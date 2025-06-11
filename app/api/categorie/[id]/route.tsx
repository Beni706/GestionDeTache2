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

    const categorie = await prisma.categorie.findUnique({
      where: { id_categorie: id },
    })
    return NextResponse.json(categorie, { status: 200 })
  } catch (error) {
    console.log("Erreur serveur : ", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}

// Modifier une catégorie
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const isAuthenticated = await verifyJWT(request)
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 })
  }

  try {
    const id = Number.parseInt(params.id)
    const { nom, id_projet } = await request.json()

    // vérifier si la catégorie existe
    const existeCategorie = await prisma.categorie.findUnique({
      where: { id_categorie: id },
    })
    if (!existeCategorie) {
      return NextResponse.json({ message: "Catégorie non trouvée" }, { status: 404 })
    }

    // Modifier la catégorie
    const categorie = await prisma.categorie.update({
      where: { id_categorie: id },
      data: {
        nom,
        id_projet: Number.parseInt(id_projet),
      },
    })
    return NextResponse.json({ message: "Catégorie modifiée avec succès", categorie }, { status: 200 })
  } catch (error) {
    console.log("Erreur serveur : ", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}

// Supprimer une catégorie
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const isAuthenticated = await verifyJWT(request)
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 })
  }

  try {
    const id = Number.parseInt(params.id)

    // vérifier si la catégorie existe
    const existeCategorie = await prisma.categorie.findUnique({
      where: { id_categorie: id },
    })
    if (!existeCategorie) {
      return NextResponse.json({ message: "Catégorie non trouvée" }, { status: 404 })
    }

    await prisma.categorie.delete({
      where: { id_categorie: id },
    })
    return NextResponse.json({ message: "Catégorie supprimée avec succès" }, { status: 200 })
  } catch (error) {
    console.log("Erreur serveur :", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}
