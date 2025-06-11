import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { verifyJWT } from "@/lib/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/// Lecture (GET)
///   (GET) http://localhost:3000/api/admin/login
console.log("test")

const prisma = new PrismaClient();

// Connexion de l'utilisateur (administrateur ou User)
export async function POST(request: Request) {

    const JWT_SECRET = process.env.JWT_SECRET;

    // Vérifier si JWT_SECRET est défini
    if (!JWT_SECRET) {
        console.error("La variable d'environnement JWT_SECRET n'est pas définie.");
        return NextResponse.json({ message: "Erreur de configuration serveur critique." }, { status: 500 });
    }

    try {
        const { email, password } = await request.json();
        
                if (!email || !password) {
            return NextResponse.json({ message: `Tous les champs sont obligatoires !` }, { status: 400 });
        };

        // Verifier si l'admin existe
        const utilisateur = await prisma.utilisateur.findUnique({
            where: { email: email },
        });
        if (!utilisateur) {
            return NextResponse.json({message: "Identifiant Incorrect"}, { status: 401 });
        };

        // Verifier si le mot de passe est correcte
        const passwordMatch = await bcrypt.compare(password, utilisateur.password);
        if (!passwordMatch) {
            return NextResponse.json({message: "Identifiant Incorrect"}, { status: 401 });
        };

        // Generation du token
         const token = jwt.sign({ id: utilisateur.id_utilisateur }, JWT_SECRET, { expiresIn: '7d' });
                
        // Retourne le token et les informations de l'apprenant
        return NextResponse.json({ message: "Connexion réussie !" , id_utilisateur: utilisateur.id_utilisateur, token }, { status: 200 });

    } catch (error) {
        console.log("Erreur serveur", error);
        return new NextResponse("Erreur serveur", { status: 500 });
    
    };
};