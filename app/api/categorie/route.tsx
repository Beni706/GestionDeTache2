import { PrismaClient } from "@/generated/prisma"
import { verifyJWT } from "@/lib/auth"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

// Afficher les catégories
export async function GET(request: Request) {
  const isAuthorized = await verifyJWT(request)
  if (!isAuthorized) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const projetId = searchParams.get("projet")

    let whereClause = {}
    if (projetId) {
      whereClause = { id_projet: Number.parseInt(projetId) }
    }

    const categories = await prisma.categorie.findMany({
      where: whereClause,
      include: {
        taches: true,
      },
    })
    return NextResponse.json(categories, { status: 200 })
  } catch (error) {
    console.log("Erreur serveur :", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}

// Créer une catégorie
export async function POST(request: Request) {
  const isAuthorized = await verifyJWT(request)
  if (!isAuthorized) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 })
  }

  try {
    const data = await request.json()
    const { nom, id_projet } = data

    // Vérification des champs obligatoires
    if (!nom || !id_projet) {
      return NextResponse.json({ message: "Les champs nom et id_projet sont obligatoires" }, { status: 400 })
    }

    // Conversion en nombre si nécessaire
    const projetId = typeof id_projet === "string" ? Number.parseInt(id_projet) : id_projet

    // Création de la catégorie avec seulement les champs requis
    const newCategorie = await prisma.categorie.create({
      data: {
        nom,
        id_projet: projetId,
      },
    })

    return NextResponse.json({ message: "Catégorie créée avec succès", newCategorie }, { status: 201 })
  } catch (error) {
    console.error("Erreur serveur :", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}
