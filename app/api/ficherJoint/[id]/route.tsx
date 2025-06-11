import { PrismaClient } from "@/generated/prisma"
import { verifyJWT } from "@/lib/auth"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

// Récupérer un fichier joint par ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const isAuthenticated = await verifyJWT(request)
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 })
  }

  try {
    const id = Number.parseInt(params.id)

    const ficherjoint = await prisma.ficherJoint.findUnique({
      where: { id_ficher: id },
    })
    return NextResponse.json(ficherjoint, { status: 200 })
  } catch (error) {
    console.log("Erreur serveur : ", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}

// Modifier un fichier joint
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const isAuthenticated = await verifyJWT(request)
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 })
  }

  try {
    const id = Number.parseInt(params.id)
    const { url, nom, id_tache } = await request.json()

    // vérifier si le fichier joint existe
    const existeFicherJoint = await prisma.ficherJoint.findUnique({
      where: { id_ficher: id },
    })
    if (!existeFicherJoint) {
      return NextResponse.json({ message: "FicherJoint non trouvé" }, { status: 404 })
    }

    // Modifier le fichier joint
    const ficherjoint = await prisma.ficherJoint.update({
      where: { id_ficher: id },
      data: {
        url,
        nom,
        id_tache,
      },
    })
    return NextResponse.json({ message: "FicherJoint modifié avec succès", ficherjoint }, { status: 200 })
  } catch (error) {
    console.log("Erreur serveur : ", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}

// Supprimer un fichier joint
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const isAuthenticated = await verifyJWT(request)
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 })
  }

  try {
    const id = Number.parseInt(params.id)

    // vérifier si le fichier joint existe
    const existeFicherJoint = await prisma.ficherJoint.findUnique({
      where: { id_ficher: id },
    })
    if (!existeFicherJoint) {
      return NextResponse.json({ message: "FicherJoint non trouvé" }, { status: 404 })
    }

    await prisma.ficherJoint.delete({
      where: { id_ficher: id },
    })
    return NextResponse.json({ message: "FicherJoint supprimé avec succès" }, { status: 200 })
  } catch (error) {
    console.log("Erreur serveur :", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}
