import { Prisma, PrismaClient } from "@/generated/prisma"
import { verifyJWT } from "@/lib/auth"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

// Récupérer un projet par ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const isAuthenticated = await verifyJWT(request)
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 })
  }

  try {
    const id = Number(params.id)

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
    const id = Number(params.id)
    const { nom, id_utilisateur } = await request.json()

    // vérifier si le projet existe
    const existeprojet = await prisma.projet.findUnique({
      where: { id_projet: id },
    })
    if (!existeprojet) {
      return NextResponse.json({ message: "Projet non trouvé" }, { status: 404 })
    }

    // Modifier le projet
    const projet = await prisma.projet.update({
      where: { id_projet: id },
      data: {
        nom,
        id_utilisateur: Number(id_utilisateur),
      },
    })
    return NextResponse.json({ message: "Projet modifié avec succès", projet }, { status: 200 })
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
    const id = Number(params.id)

    // Utiliser une transaction pour garantir que toutes les suppressions réussissent ou échouent ensemble
    await prisma.$transaction(async (tx) => {
      // 1. Trouver toutes les tâches du projet pour obtenir leurs IDs
      const taches = await tx.tache.findMany({
        where: { id_projet: id },
        select: { id_tache: true },
      })
      const tacheIds = taches.map((t) => t.id_tache)

      // 2. Supprimer toutes les pièces jointes liées à ces tâches, s'il y en a
      if (tacheIds.length > 0) {
        await tx.ficherJoint.deleteMany({
          where: { id_tache: { in: tacheIds } },
        })
      }

      // 3. Supprimer toutes les tâches du projet
      await tx.tache.deleteMany({
        where: { id_projet: id },
      })

      // 4. Supprimer toutes les catégories du projet
      await tx.categorie.deleteMany({
        where: { id_projet: id },
      })

      // 5. Enfin, supprimer le projet lui-même. Cela lèvera une erreur si le projet n'est pas trouvé.
      await tx.projet.delete({
        where: { id_projet: id },
      })
    })

    return NextResponse.json({ message: "Projet et toutes ses données supprimés avec succès" }, { status: 200 })
  } catch (error) {
    console.error("Erreur serveur lors de la suppression du projet :", error)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ message: "Projet non trouvé" }, { status: 404 })
    }
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}
