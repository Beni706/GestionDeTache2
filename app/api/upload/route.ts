import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { verifyJWT } from "@/lib/auth"
import { existsSync } from "fs"

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const isAuthenticated = await verifyJWT(request)
    if (!isAuthenticated) {
      return NextResponse.json({ message: "Accès refusé" }, { status: 401 })
    }

    const data = await request.formData()
    const file: File | null = data.get("file") as unknown as File

    if (!file) {
      return NextResponse.json({ message: "Aucun fichier fourni" }, { status: 400 })
    }

    console.log(`Receiving file: ${file.name}, size: ${file.size}, type: ${file.type}`)

    // Validation du fichier
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          message: "Le fichier est trop volumineux (max 10MB)",
        },
        { status: 400 },
      )
    }

    // Types de fichiers acceptés
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "application/zip",
      "application/x-rar-compressed",
      "video/mp4",
      "audio/mpeg",
      "audio/wav",
      "video/webm",
      "audio/ogg",
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          message: `Type de fichier non supporté: ${file.type}`,
        },
        { status: 400 },
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Créer un nom de fichier unique et sécurisé
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split(".").pop() || ""
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const fileName = `${timestamp}-${randomString}-${safeName}`

    // Définir le chemin de stockage
    const uploadDir = join(process.cwd(), "public", "uploads")
    const filePath = join(uploadDir, fileName)

    console.log(`Upload directory: ${uploadDir}`)
    console.log(`File path: ${filePath}`)

    // Créer le répertoire s'il n'existe pas
    try {
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true })
        console.log(`Created upload directory: ${uploadDir}`)
      }

      await writeFile(filePath, buffer)
      console.log(`File written successfully: ${filePath}`)
    } catch (error) {
      console.error("Erreur lors de l'écriture du fichier:", error)
      return NextResponse.json(
        {
          message: "Erreur lors de la sauvegarde du fichier",
          error: error instanceof Error ? error.message : "Erreur inconnue",
        },
        { status: 500 },
      )
    }

    // Retourner l'URL du fichier
    const fileUrl = `/uploads/${fileName}`

    console.log(`File uploaded successfully: ${fileUrl}`)

    return NextResponse.json(
      {
        message: "Fichier uploadé avec succès",
        url: fileUrl,
        fileName: fileName,
        originalName: file.name,
        size: file.size,
        type: file.type,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Erreur serveur:", error)
    return NextResponse.json(
      {
        message: "Erreur serveur",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 },
    )
  }
}
