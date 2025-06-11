import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

/**
 * Vérifie la validité d'un token JWT dans les en-têtes de la requête
 *
 * @param request - La requête HTTP contenant le token dans l'en-tête Authorization
 * @returns Une promesse qui résout à true si le token est valide, false sinon
 */
export async function verifyJWT(request: NextRequest | Request): Promise<boolean> {
  try {
    // Récupérer le token depuis les headers
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Pas d'en-tête Authorization ou format incorrect")
      return false
    }

    const token = authHeader.split(" ")[1]
    const JWT_SECRET = process.env.JWT_SECRET

    if (!JWT_SECRET) {
      console.error("JWT_SECRET n'est pas défini")
      return false
    }

    // Vérifier si le token est un JWT valide (doit contenir deux points)
    if (!token.includes(".")) {
      console.error("Token malformé: ne contient pas de points séparateurs")
      return false
    }

    // Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET)
    console.log("Token vérifié avec succès:", decoded)
    return true
  } catch (error) {
    console.error("Erreur de vérification du token:", error)
    return false
  }
}
