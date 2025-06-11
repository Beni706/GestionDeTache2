import { PrismaClient } from "@/generated/prisma";
import { verifyJWT } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {

    const isAuthorized = await verifyJWT(request);
    if(!isAuthorized) {
        return NextResponse.json({message: "Accès refusé"}, {status: 401});
    };

    try {
        const utilisateur = await prisma.utilisateur.findMany({
            include: {
                taches: true,
            },
        });
        return NextResponse.json(utilisateur, {status: 200});
    } catch (error) {
        console.log("Erreur serveur :", error);
        return NextResponse.json({message: "Erreur serveur"}, {status: 500});
    };
};

export async function POST(request: Request) {
    try {
        const { email, password, role } = await request.json();

        // Verification de champs
        if(!email || !password || !role) {
            return NextResponse.json({message: "Tous les champs sont obligatoires"}, {status: 400});
        };

        // Hash le password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUtilisateur = await prisma.utilisateur.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        return NextResponse.json({message: "Utilisateur créé avec succès", newUtilisateur}, {status: 201});

    } catch (error) {
        console.log("Erreur serveur :", error);
        return NextResponse.json({message: "Erreur serveur"}, {status: 500})
    };   
};