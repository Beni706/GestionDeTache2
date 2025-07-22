import { PrismaClient } from "@/generated/prisma";
import { verifyJWT } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic"; // Indique à Next.js que cette route est dynamique

// Récupérer les projet d'un utilisateur par ID
export async function GET(request: Request, context: { params: { id: string } }) {
  const isAuthenticated = await verifyJWT(request);
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 });
  }

  try {
    const id = Number(context.params.id);

    // Vérifier si l'ID est un nombre valide
    if (isNaN(id)) {
      return NextResponse.json({ message: "ID invalide" }, { status: 400 });
    }

    const projets = await prisma.projet.findMany({
      where: { id_utilisateur: id },
      include: {
        _count: {
          select: { taches: true },
        },
      },
    });
    return NextResponse.json(projets, { status: 200 });
  } catch (error) {
    console.log("Erreur serveur : ", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
