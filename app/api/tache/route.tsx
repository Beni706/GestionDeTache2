import { PrismaClient } from "@/generated/prisma";
import { verifyJWT } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Afficher les tâches
export async function GET(request: Request) {
  const isAuthorized = await verifyJWT(request)
  if (!isAuthorized) {
    return NextResponse.json({ message: "Accès refusé" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const projetId = searchParams.get("projet")

    const whereClause = projetId ? { id_projet: Number.parseInt(projetId) } : {}

    const taches = await prisma.tache.findMany({
      where: whereClause,
      include: {
        categorie: true,
        fichiers_joints: true,
      },
    })
    return NextResponse.json(taches, { status: 200 })
  } catch (error) {
    console.log("Erreur serveur :", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}



export async function POST(request: Request) {
    const isAuthorized = await verifyJWT(request);
    if(!isAuthorized) {
        return NextResponse.json({message: "Accès refusé"}, {status: 401});
    };

    try {
        const { titre, description, date_limite, priorite, status, id_categorie, id_utilisateur, id_projet } = await request.json();

        // Verification de champs
        if(!titre || !date_limite || !priorite || !status! || !id_utilisateur || !id_projet) {
            return NextResponse.json({message: "Tous les champs sont obligatoires"}, {status: 400});
        };

        const newTache = await prisma.tache.create({
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
        });
        return NextResponse.json({message: "Tache créé avec succès", newTache}, {status: 201});

    } catch (error) {
        console.log("Erreur serveur :", error);
        return NextResponse.json({message: "Erreur serveur"}, {status: 500})
    };   
};