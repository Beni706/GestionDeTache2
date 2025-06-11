import { PrismaClient } from "@/generated/prisma";
import { verifyJWT } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Afficher les projet
export async function GET(request: Request) {

    const isAuthorized = await verifyJWT(request);
    if(!isAuthorized) {
        return NextResponse.json({message: "Accès refusé"}, {status: 401});
    };

    try {
        const projet = await prisma.projet.findMany({
            include: {
                taches: true
            }
        });
        return NextResponse.json(projet, {status: 200});
    } catch (error) {
        console.log("Erreur serveur :", error);
        return NextResponse.json({message: "Erreur serveur"}, {status: 500});
    };
};

// Creer une projet
export async function POST(request: Request) {
    const isAuthorized = await verifyJWT(request);
    if(!isAuthorized) {
        return NextResponse.json({message: "Accès refusé"}, {status: 401});
    };

    try {
        const { nom, id_utilisateur } = await request.json();

        // Verification de champs
        if(!nom || !id_utilisateur) {
            return NextResponse.json({message: "Tous les champs sont obligatoires"}, {status: 400});
        };

        const newprojet = await prisma.projet.create({
            data: {
                nom,
                id_utilisateur
            },
        });
        return NextResponse.json({message: "projet créé avec succès", newprojet}, {status: 201});

    } catch (error) {
        console.log("Erreur serveur :", error);
        return NextResponse.json({message: "Erreur serveur"}, {status: 500})
    };   
};