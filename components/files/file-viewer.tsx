"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  FileText,
  FileSpreadsheet,
  FilePieChart,
  File,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Volume2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react"
import type { Attachment } from "@/types"

interface FileViewerProps {
  attachment: Attachment
  allAttachments?: Attachment[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FileViewer({ attachment, allAttachments = [], open, onOpenChange }: FileViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(
    allAttachments.findIndex((a) => a.id_ficher === attachment.id_ficher) || 0,
  )
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [imageError, setImageError] = useState(false)

  const currentAttachment = allAttachments[currentIndex] || attachment

  // Fonction pour obtenir l'URL réelle du fichier
  const getFileUrl = (attachment: Attachment): string => {
    // Si l'URL existe et n'est pas un placeholder
    if (attachment.url && !attachment.url.includes("placeholder.svg") && !attachment.url.includes("example.com")) {
      // Si c'est un chemin relatif, le convertir en URL absolue
      if (attachment.url.startsWith("/")) {
        return `${window.location.origin}${attachment.url}`
      }
      return attachment.url
    }
    return ""
  }

  // Déterminer le type de fichier
  const getFileType = (filename: string): string => {
    const extension = filename.split(".").pop()?.toLowerCase() || ""

    if (["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "tiff"].includes(extension)) {
      return "image"
    }
    if (extension === "pdf") {
      return "pdf"
    }
    if (["mp4", "avi", "mov", "wmv", "flv", "webm", "mkv"].includes(extension)) {
      return "video"
    }
    if (["mp3", "wav", "flac", "aac", "ogg", "m4a"].includes(extension)) {
      return "audio"
    }
    if (["doc", "docx", "txt", "rtf", "odt"].includes(extension)) {
      return "document"
    }
    if (["xls", "xlsx", "csv", "ods"].includes(extension)) {
      return "spreadsheet"
    }
    if (["ppt", "pptx", "odp"].includes(extension)) {
      return "presentation"
    }
    if (
      ["js", "jsx", "ts", "tsx", "html", "css", "json", "py", "java", "c", "cpp", "xml", "yaml", "yml"].includes(
        extension,
      )
    ) {
      return "code"
    }
    if (["zip", "rar", "7z", "tar", "gz"].includes(extension)) {
      return "archive"
    }
    return "other"
  }

  const fileType = getFileType(currentAttachment.nom)
  const fileUrl = getFileUrl(currentAttachment)

  // Navigation entre fichiers
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      resetViewerState()
    }
  }

  const goToNext = () => {
    if (currentIndex < allAttachments.length - 1) {
      setCurrentIndex(currentIndex + 1)
      resetViewerState()
    }
  }

  const resetViewerState = () => {
    setZoom(100)
    setRotation(0)
    setIsPlaying(false)
    setImageError(false)
  }

  // Fonctions de contrôle
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 300))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 25))
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360)

  const handleDownload = () => {
    if (fileUrl) {
      const link = document.createElement("a")
      link.href = fileUrl
      link.download = currentAttachment.nom
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // Rendu du contenu selon le type
  const renderContent = () => {
    // Si pas d'URL valide, afficher un message d'erreur
    if (!fileUrl) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-muted/30 rounded-lg">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Fichier non disponible</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Le fichier "{currentAttachment.nom}" n'est pas accessible ou n'existe plus.
            </p>
            <p className="text-xs text-muted-foreground">URL: {currentAttachment.url || "Non définie"}</p>
          </div>
        </div>
      )
    }

    switch (fileType) {
      case "image":
        return (
          <div className="flex justify-center items-center min-h-[400px] bg-black/5 rounded-lg overflow-hidden">
            {imageError ? (
              <div className="text-center p-8">
                <AlertCircle className="h-16 w-16 text-red-500 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Erreur de chargement</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Impossible de charger l'image "{currentAttachment.nom}"
                </p>
                <Button onClick={handleDownload} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger le fichier
                </Button>
              </div>
            ) : (
              <img
                src={fileUrl || "/placeholder.svg"}
                alt={currentAttachment.nom}
                className="max-w-full max-h-[70vh] object-contain transition-transform duration-200"
                style={{
                  transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                }}
                onError={() => setImageError(true)}
                onLoad={() => setImageError(false)}
              />
            )}
          </div>
        )

      case "pdf":
        return (
          <div className="w-full h-[70vh] bg-gray-100 rounded-lg overflow-hidden">
            <iframe
              src={`${fileUrl}#toolbar=1&navpanes=1&scrollbar=1`}
              className="w-full h-full border-0"
              title={currentAttachment.nom}
              onError={() => {
                console.error("Erreur de chargement du PDF")
              }}
            />
          </div>
        )

      case "video":
        return (
          <div className="flex justify-center items-center min-h-[400px] bg-black rounded-lg overflow-hidden">
            <video
              src={fileUrl}
              controls
              className="max-w-full max-h-[70vh]"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={() => {
                console.error("Erreur de chargement de la vidéo")
              }}
            >
              <source src={fileUrl} type={`video/${currentAttachment.nom.split(".").pop()}`} />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
        )

      case "audio":
        return (
          <div className="flex flex-col items-center justify-center min-h-[300px] bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center mb-6">
              <Volume2 className="h-16 w-16 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-4">{currentAttachment.nom}</h3>
            <audio
              src={fileUrl}
              controls
              className="w-full max-w-md"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={() => {
                console.error("Erreur de chargement de l'audio")
              }}
            >
              <source src={fileUrl} type={`audio/${currentAttachment.nom.split(".").pop()}`} />
              Votre navigateur ne supporte pas la lecture audio.
            </audio>
          </div>
        )

      case "code":
        return (
          <div className="w-full h-[70vh] bg-gray-900 rounded-lg overflow-hidden p-4">
            <div className="text-white">
              <h3 className="text-lg font-semibold mb-4">{currentAttachment.nom}</h3>
              <p className="text-sm text-gray-300 mb-4">
                Prévisualisation du code non disponible. Téléchargez le fichier pour l'ouvrir.
              </p>
              <Button onClick={handleDownload} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Télécharger le fichier
              </Button>
            </div>
          </div>
        )

      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-muted/30 rounded-lg">
            <div className="text-center">
              {fileType === "document" && <FileText className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />}
              {fileType === "spreadsheet" && (
                <FileSpreadsheet className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
              )}
              {fileType === "presentation" && <FilePieChart className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />}
              {fileType === "archive" && <File className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />}
              {fileType === "other" && <File className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />}

              <h3 className="text-lg font-semibold mb-2">{currentAttachment.nom}</h3>
              <p className="text-sm text-muted-foreground mb-4">Aperçu non disponible pour ce type de fichier</p>
              <Button onClick={handleDownload} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Télécharger pour ouvrir
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DialogTitle className="text-lg">{currentAttachment.nom}</DialogTitle>
              <Badge variant="secondary">{fileType.toUpperCase()}</Badge>
              {!fileUrl && <Badge variant="destructive">Non disponible</Badge>}
            </div>

            {/* Navigation entre fichiers */}
            {allAttachments.length > 1 && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={goToPrevious} disabled={currentIndex === 0}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentIndex + 1} / {allAttachments.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNext}
                  disabled={currentIndex === allAttachments.length - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Barre d'outils */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              {fileType === "image" && fileUrl && !imageError && (
                <>
                  <Button variant="outline" size="sm" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground min-w-[60px] text-center">{zoom}%</span>
                  <Button variant="outline" size="sm" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRotate}>
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {fileUrl && (
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-1" />
                  Télécharger
                </Button>
              )}
            </div>
          </div>

          {/* Informations de débogage (à supprimer en production) */}
          {process.env.NODE_ENV === "development" && (
            <div className="text-xs text-muted-foreground mt-2 p-2 bg-muted rounded">
              <strong>Debug:</strong> URL = {currentAttachment.url || "Non définie"}
              <br />
              <strong>URL traitée:</strong> {fileUrl || "Non disponible"}
            </div>
          )}
        </DialogHeader>

        <div className="px-6 pb-6">{renderContent()}</div>
      </DialogContent>
    </Dialog>
  )
}
