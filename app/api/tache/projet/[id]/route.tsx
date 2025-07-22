import { PrismaClient } from "@/generated/prisma";
import { verifyJWT } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Récupérer les taches d'un projet par ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const isAuthenticated = await verifyJWT(request);
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 });
  }

  try {
    const id = Number.parseInt(params.id);

    const taches = await prisma.tache.findMany({
      where: { id_projet: id },
      include: {
        categorie: true,
        fichiers_joints: true,
      },
    });
    return NextResponse.json(taches, { status: 200 });
  } catch (error) {
    console.log("Erreur serveur : ", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
