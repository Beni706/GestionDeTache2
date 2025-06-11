import { PrismaClient } from "@/generated/prisma"
import { verifyJWT } from "@/lib/auth"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

// Récupérer une tâche par ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const isAuthenticated = await verifyJWT(request)
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 })
  }

  try {
    const id = Number.parseInt(params.id)

    const tache = await prisma.tache.findUnique({
      where: { id_tache: id },
      include: {
        fichiers_joints: true,
      },
    })
    return NextResponse.json(tache, { status: 200 })
  } catch (error) {
    console.log("Erreur serveur : ", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}

// Modifier une tâche
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const isAuthenticated = await verifyJWT(request)
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 })
  }

  try {
    const id = Number.parseInt(params.id)
    const { titre, description, date_limite, priorite, status, id_categorie, id_utilisateur, id_projet } = await request.json()

    // vérifier si la tâche existe
    const existeTache = await prisma.tache.findUnique({
      where: { id_tache: id },
    })
    if (!existeTache) {
      return NextResponse.json({ message: "Tâche non trouvée" }, { status: 404 })
    }

    // Modifier la tâche
    const tache = await prisma.tache.update({
      where: { id_tache: id },
      data: {
        titre,
        description,
        date_limite,
        priorite,
        status,
        id_categorie,
        id_utilisateur,
        id_projet,
      },
    })
    return NextResponse.json({ message: "Tâche modifiée avec succès", tache }, { status: 200 })
  } catch (error) {
    console.log("Erreur serveur : ", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}

// Supprimer une tâche
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const isAuthenticated = await verifyJWT(request)
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 })
  }

  try {
    const id = Number.parseInt(params.id)

    // vérifier si la tâche existe
    const existeTache = await prisma.tache.findUnique({
      where: { id_tache: id },
    })
    if (!existeTache) {
      return NextResponse.json({ message: "Tâche non trouvée" }, { status: 404 })
    }

    // Supprimer les fichiers joints liés à la tâche
    await prisma.ficherJoint.deleteMany({
      where: { id_tache: id },
    })

    // Supprimer la tâche
    await prisma.tache.delete({
      where: { id_tache: id },
    })

    // Supprimer la catégorie si elle n'est plus utilisée par aucune tâche
    if (existeTache.id_categorie) {
      const autresTaches = await prisma.tache.findFirst({
        where: { id_categorie: existeTache.id_categorie },
      })
      if (!autresTaches) {
        await prisma.categorie.delete({
          where: { id_categorie: existeTache.id_categorie },
        })
      }
    }

    return NextResponse.json({ message: "Tâche supprimée avec succès" }, { status: 200 })
  } catch (error) {
    console.log("Erreur serveur :", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}
