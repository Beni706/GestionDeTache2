import { PrismaClient } from "@/generated/prisma";
import { verifyJWT } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Afficher les ficherJoint
export async function GET(request: Request) {

    const isAuthorized = await verifyJWT(request);
    if(!isAuthorized) {
        return NextResponse.json({message: "Accès refusé"}, {status: 401});
    };

    try {
        const ficherJoint = await prisma.ficherJoint.findMany();
        return NextResponse.json(ficherJoint, {status: 200});
    } catch (error) {
        console.log("Erreur serveur :", error);
        return NextResponse.json({message: "Erreur serveur"}, {status: 500});
    };
};


export async function POST(request: Request) {
    const isAuthorized = await verifyJWT(request);
    if(!isAuthorized) {
        return NextResponse.json({message: "Accès refusé"}, {status: 401});
    };

    try {
        const { url, nom, id_tache } = await request.json();

        // Verification de champs
        if(!url || !nom || !id_tache) {
            return NextResponse.json({message: "Tous les champs sont obligatoires"}, {status: 400});
        };

        const newFicherJoint = await prisma.ficherJoint.create({
            data: {
                url,
                nom,
                id_tache
            },
        });
        return NextResponse.json({message: "FicherJoint créé avec succès", newFicherJoint}, {status: 201});

    } catch (error) {
        console.log("Erreur serveur :", error);
        return NextResponse.json({message: "Erreur serveur"}, {status: 500})
    };   
};