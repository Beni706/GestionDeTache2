"use client"

import { useState, useEffect } from "react"
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

interface FileItem {
  id: string
  name: string
  size: number
  type: string
  url?: string
  file?: File
  preview?: string
}

interface FilePreviewDialogProps {
  file: FileItem | null
  allFiles: FileItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FilePreviewDialog({ file, allFiles, open, onOpenChange }: FilePreviewDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [fileContent, setFileContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Trouver l'index du fichier actuel
  const fileIndex = allFiles.findIndex((f) => f.id === file?.id)
  const currentFile = allFiles[fileIndex] || file

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
    return "other"
  }

  const fileType = getFileType(currentFile?.name || "")

  // Créer une URL pour le fichier
  const getFileUrl = (file: FileItem): string => {
    if (file.preview) {
      return file.preview
    }
    if (file.file) {
      return URL.createObjectURL(file.file)
    }
    if (file.url) {
      return file.url
    }
    return ""
  }

  // Charger le contenu du fichier pour les fichiers texte
  useEffect(() => {
    if (fileType === "code" && currentFile?.file) {
      setLoading(true)
      setError(null)

      const reader = new FileReader()
      reader.onload = (e) => {
        setFileContent(e.target?.result as string)
        setLoading(false)
      }
      reader.onerror = () => {
        setError("Erreur lors de la lecture du fichier")
        setLoading(false)
      }
      reader.readAsText(currentFile.file)
    }
  }, [currentFile, fileType])

  // Navigation entre fichiers
  const goToPrevious = () => {
    if (fileIndex > 0) {
      setCurrentIndex(fileIndex - 1)
      resetViewerState()
    }
  }

  const goToNext = () => {
    if (fileIndex < allFiles.length - 1) {
      setCurrentIndex(fileIndex + 1)
      resetViewerState()
    }
  }

  const resetViewerState = () => {
    setZoom(100)
    setRotation(0)
    setFileContent(null)
    setError(null)
  }

  // Fonctions de contrôle
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 300))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 25))
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360)

  // Télécharger le fichier
  const handleDownload = () => {
    if (currentFile?.file) {
      // Pour les fichiers locaux, créer un blob URL et télécharger
      const url = URL.createObjectURL(currentFile.file)
      const link = document.createElement("a")
      link.href = url
      link.download = currentFile.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } else if (currentFile?.url) {
      // Pour les fichiers distants
      const link = document.createElement("a")
      link.href = currentFile.url
      link.download = currentFile.name
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // Formater la taille du fichier
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Rendu du contenu selon le type
  const renderContent = () => {
    const fileUrl = getFileUrl(currentFile || {})

    if (!fileUrl && !currentFile?.file) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-muted/30 rounded-lg">
          <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Fichier non disponible</h3>
          <p className="text-sm text-muted-foreground">Le fichier ne peut pas être affiché</p>
        </div>
      )
    }

    switch (fileType) {
      case "image":
        return (
          <div className="flex justify-center items-center min-h-[400px] bg-black/5 rounded-lg overflow-hidden">
            <img
              src={fileUrl || "/placeholder.svg"}
              alt={currentFile?.name || ""}
              className="max-w-full max-h-[70vh] object-contain transition-transform duration-200"
              style={{
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              }}
              onError={(e) => {
                console.error("Erreur de chargement de l'image:", currentFile?.name)
                setError("Impossible de charger l'image")
              }}
            />
          </div>
        )

      case "pdf":
        return (
          <div className="w-full h-[70vh] bg-gray-100 rounded-lg overflow-hidden">
            {fileUrl ? (
              <iframe
                src={fileUrl}
                className="w-full h-full border-0"
                title={currentFile?.name || ""}
                onError={() => setError("Impossible de charger le PDF")}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Chargement du PDF...</p>
              </div>
            )}
          </div>
        )

      case "video":
        return (
          <div className="flex justify-center items-center min-h-[400px] bg-black rounded-lg overflow-hidden">
            <video
              src={fileUrl}
              controls
              className="max-w-full max-h-[70vh]"
              onError={() => setError("Impossible de lire la vidéo")}
            >
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
            <h3 className="text-lg font-semibold mb-4">{currentFile?.name || ""}</h3>
            <audio
              src={fileUrl}
              controls
              className="w-full max-w-md"
              onError={() => setError("Impossible de lire l'audio")}
            >
              Votre navigateur ne supporte pas la lecture audio.
            </audio>
          </div>
        )

      case "code":
        if (loading) {
          return (
            <div className="flex items-center justify-center min-h-[400px]">
              <p className="text-muted-foreground">Chargement du fichier...</p>
            </div>
          )
        }

        if (error) {
          return (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-muted/30 rounded-lg">
              <AlertCircle className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          )
        }

        return (
          <div className="w-full h-[70vh] bg-gray-900 rounded-lg overflow-hidden">
            <pre className="text-green-400 text-sm overflow-auto h-full p-4">
              <code>{fileContent || "Contenu non disponible"}</code>
            </pre>
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
              {fileType === "other" && <File className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />}

              <h3 className="text-lg font-semibold mb-2">{currentFile?.name || ""}</h3>
              <p className="text-sm text-muted-foreground mb-2">Taille: {formatFileSize(currentFile?.size || 0)}</p>
              <p className="text-sm text-muted-foreground mb-4">
                {currentFile?.file ? "Fichier prêt à être uploadé" : "Aperçu non disponible pour ce type de fichier"}
              </p>
              <Button onClick={handleDownload} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
            </div>
          </div>
        )
    }
  }

  if (!file) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DialogTitle className="text-lg">{currentFile.name}</DialogTitle>
              <Badge variant="secondary">{fileType.toUpperCase()}</Badge>
              <Badge variant="outline">{formatFileSize(currentFile.size)}</Badge>
              {currentFile.file && (
                <Badge variant="outline" className="text-orange-600">
                  Local
                </Badge>
              )}
              {currentFile.url && !currentFile.file && (
                <Badge variant="outline" className="text-green-600">
                  Distant
                </Badge>
              )}
            </div>

            {/* Navigation entre fichiers */}
            {allFiles.length > 1 && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={goToPrevious} disabled={fileIndex === 0}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {fileIndex + 1} / {allFiles.length}
                </span>
                <Button variant="outline" size="sm" onClick={goToNext} disabled={fileIndex === allFiles.length - 1}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Barre d'outils */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              {fileType === "image" && (
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
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-1" />
                Télécharger
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            </div>
          )}
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  )
}
