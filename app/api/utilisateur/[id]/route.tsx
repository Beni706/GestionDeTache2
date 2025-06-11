import { PrismaClient } from "@/generated/prisma";
import { verifyJWT } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Récupérer un utilisateur par ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const isAuthenticated = await verifyJWT(request);
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 });
  }

  try {
    const id = Number.parseInt(params.id);

    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id_utilisateur: id },
      include: {
        taches: true,
        projet: true,
      },
    });
    return NextResponse.json(utilisateur, { status: 200 });
  } catch (error) {
    console.log("Erreur serveur : ", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

// Modifier un utilisateur
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const isAuthenticated = await verifyJWT(request);
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 });
  }

  try {
    const id = Number.parseInt(params.id);
    const { email, password, role } = await request.json();

    // vérifier si l'utilisateur existe
    const existeUtilisateur = await prisma.utilisateur.findUnique({
      where: { id_utilisateur: id },
    });
    if (!existeUtilisateur) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // hasher le password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Modifier l'utilisateur
    const utilisateur = await prisma.utilisateur.update({
      where: { id_utilisateur: id },
      data: {
        email,
        password: hashedPassword,
        
      },
    });
    return NextResponse.json(
      { message: "Utilisateur modifié avec succès", utilisateur },
      { status: 200 }
    );
  } catch (error) {
    console.log("Erreur serveur : ", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

// Supprimer un utilisateur
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const isAuthenticated = await verifyJWT(request);
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 });
  }

  try {
    const userId = Number.parseInt(id);

    // vérifier si l'utilisateur existe
    const existeUtilisateur = await prisma.utilisateur.findUnique({
      where: { id_utilisateur: userId },
      include: {
        taches: { include: { fichiers_joints: true } },
        projet: true,
      },
    });
    if (!existeUtilisateur) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Récupérer tous les IDs des tâches de l'utilisateur
    const tacheIds = existeUtilisateur.taches.map((t: any) => t.id_tache);

    // Supprimer tous les fichiers joints liés aux tâches de l'utilisateur
    await prisma.ficherJoint.deleteMany({
      where: { id_tache: { in: tacheIds } },
    });

    // Supprimer toutes les tâches de l'utilisateur
    await prisma.tache.deleteMany({
      where: { id_tache: { in: tacheIds } },
    });

    // Supprimer toutes les catégories de l'utilisateur
    await prisma.projet.deleteMany({
      where: { id_utilisateur: userId },
    });

    // Supprimer l'utilisateur
    await prisma.utilisateur.delete({
      where: { id_utilisateur: userId },
    });

    return NextResponse.json(
      { message: "Utilisateur et ses données supprimés avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Erreur serveur :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
