"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Eye,
  File,
  FileText,
  Grid,
  ImageIcon,
  List,
  MoreVertical,
  Music,
  Trash2,
  Video,
  X,
  AlertCircle,
} from "lucide-react"
import type { Attachment, Task } from "@/types"

interface AttachmentGalleryProps {
  attachments: Attachment[]
  onDelete: (id: number) => Promise<void>
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  task?: Task
}

export function AttachmentGallery({ attachments, onDelete, viewMode, onViewModeChange, task }: AttachmentGalleryProps) {
  const [selectedFile, setSelectedFile] = useState<Attachment | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Fonction pour obtenir l'URL réelle du fichier
  const getFileUrl = (attachment: Attachment): string => {
    if (attachment.url && !attachment.url.includes("placeholder.svg") && !attachment.url.includes("example.com")) {
      if (attachment.url.startsWith("/")) {
        return `${window.location.origin}${attachment.url}`
      }
      return attachment.url
    }
    return ""
  }

  // Fonction pour obtenir l'icône en fonction du type de fichier
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")) {
      return <ImageIcon className="h-4 w-4" />
    }
    if (["mp4", "avi", "mov", "wmv"].includes(extension || "")) {
      return <Video className="h-4 w-4" />
    }
    if (["mp3", "wav", "flac", "aac"].includes(extension || "")) {
      return <Music className="h-4 w-4" />
    }
    if (["pdf", "doc", "docx", "txt"].includes(extension || "")) {
      return <FileText className="h-4 w-4" />
    }
    return <File className="h-4 w-4" />
  }

  // Fonction pour prévisualiser un fichier
  const handlePreview = (file: Attachment) => {
    setSelectedFile(file)
    setIsPreviewOpen(true)
  }

  // Fonction pour télécharger un fichier
  const handleDownload = (file: Attachment) => {
    const fileUrl = getFileUrl(file)
    if (fileUrl) {
      const link = document.createElement("a")
      link.href = fileUrl
      link.download = file.nom
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // Fonction pour supprimer un fichier
  const handleDelete = async (file: Attachment) => {
    setIsLoading(true)
    try {
      await onDelete(file.id_ficher)
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour déterminer si un fichier est une image
  const isImageFile = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    return ["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")
  }

  // Fonction pour déterminer si un fichier est une vidéo
  const isVideoFile = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    return ["mp4", "webm", "ogg"].includes(extension || "")
  }

  // Fonction pour déterminer si un fichier est un audio
  const isAudioFile = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    return ["mp3", "wav", "ogg"].includes(extension || "")
  }

  // Fonction pour déterminer si un fichier est un PDF
  const isPdfFile = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    return extension === "pdf"
  }

  // Rendu pour le mode grille
  const renderGridView = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {attachments.map((file) => {
        const fileUrl = getFileUrl(file)
        const isValidFile = !!fileUrl

        return (
          <Card key={file.id_ficher} className="overflow-hidden">
            <div className="relative aspect-square bg-muted flex items-center justify-center">
              {isImageFile(file.nom) && isValidFile ? (
                <img
                  src={fileUrl || "/placeholder.svg"}
                  alt={file.nom}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                    e.currentTarget.nextElementSibling?.classList.remove("hidden")
                  }}
                />
              ) : null}

              <div
                className={`flex flex-col items-center justify-center h-full p-4 ${isImageFile(file.nom) && isValidFile ? "hidden" : ""}`}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  {!isValidFile ? <AlertCircle className="h-6 w-6 text-red-500" /> : getFileIcon(file.nom)}
                </div>
                <p className="text-xs text-center line-clamp-2">{file.nom}</p>
                {!isValidFile && <p className="text-xs text-red-500 text-center mt-1">Non disponible</p>}
              </div>

              {/* Badge de la tâche */}
              {task && (
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-xs">
                    #{task.id_tache}
                  </Badge>
                </div>
              )}
            </div>
            <CardFooter className="p-2 flex justify-between">
              <Button variant="ghost" size="icon" onClick={() => handlePreview(file)} disabled={!isValidFile}>
                <Eye className="h-4 w-4" />
                <span className="sr-only">Voir</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handlePreview(file)} disabled={!isValidFile}>
                    <Eye className="mr-2 h-4 w-4" />
                    Voir
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload(file)} disabled={!isValidFile}>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(file)} disabled={isLoading}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )

  // Rendu pour le mode liste
  const renderListView = () => (
    <div className="space-y-2">
      {attachments.map((file) => {
        const fileUrl = getFileUrl(file)
        const isValidFile = !!fileUrl

        return (
          <div key={file.id_ficher} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                {!isValidFile ? <AlertCircle className="h-4 w-4 text-red-500" /> : getFileIcon(file.nom)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{file.nom}</p>
                  {task && (
                    <Badge variant="outline" className="text-xs">
                      #{task.id_tache}
                    </Badge>
                  )}
                </div>
                {!isValidFile && <p className="text-xs text-red-500">Fichier non disponible</p>}
              </div>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" onClick={() => handlePreview(file)} disabled={!isValidFile}>
                <Eye className="h-4 w-4" />
                <span className="sr-only">Voir</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDownload(file)} disabled={!isValidFile}>
                <Download className="h-4 w-4" />
                <span className="sr-only">Télécharger</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(file)} disabled={isLoading}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Supprimer</span>
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )

  // Rendu pour la prévisualisation de fichier
  const renderFilePreview = () => {
    if (!selectedFile) return null

    const fileUrl = getFileUrl(selectedFile)

    if (!fileUrl) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Fichier non disponible</h3>
          <p className="text-sm text-muted-foreground text-center">
            Le fichier "{selectedFile.nom}" n'est pas accessible ou n'existe plus.
          </p>
        </div>
      )
    }

    if (isImageFile(selectedFile.nom)) {
      return (
        <div className="flex items-center justify-center h-full">
          <img
            src={fileUrl || "/placeholder.svg"}
            alt={selectedFile.nom}
            className="max-h-[70vh] max-w-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none"
              const errorDiv = document.createElement("div")
              errorDiv.className = "flex flex-col items-center justify-center h-full p-8"
              errorDiv.innerHTML = `
                <div class="text-center">
                  <h3 class="text-lg font-semibold mb-2">Erreur de chargement</h3>
                  <p class="text-sm text-muted-foreground">Impossible de charger l'image</p>
                </div>
              `
              e.currentTarget.parentNode?.appendChild(errorDiv)
            }}
          />
        </div>
      )
    }

    if (isVideoFile(selectedFile.nom)) {
      return (
        <div className="flex items-center justify-center h-full">
          <video controls className="max-h-[70vh] max-w-full">
            <source src={fileUrl} type={`video/${selectedFile.nom.split(".").pop()}`} />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </div>
      )
    }

    if (isAudioFile(selectedFile.nom)) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Music className="h-12 w-12 text-primary" />
          </div>
          <p className="text-lg font-medium mb-4">{selectedFile.nom}</p>
          <audio controls className="w-full max-w-md">
            <source src={fileUrl} type={`audio/${selectedFile.nom.split(".").pop()}`} />
            Votre navigateur ne supporte pas la lecture audio.
          </audio>
        </div>
      )
    }

    if (isPdfFile(selectedFile.nom)) {
      return (
        <div className="flex items-center justify-center h-full">
          <iframe src={`${fileUrl}#toolbar=0`} className="w-full h-[70vh]" title={selectedFile.nom}></iframe>
        </div>
      )
    }

    // Fallback pour les autres types de fichiers
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          {getFileIcon(selectedFile.nom)}
        </div>
        <p className="text-lg font-medium mb-4">{selectedFile.nom}</p>
        <Button onClick={() => handleDownload(selectedFile)}>
          <Download className="mr-2 h-4 w-4" />
          Télécharger
        </Button>
      </div>
    )
  }

  // Message si aucune pièce jointe n'est trouvée
  if (attachments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <File className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">Aucune pièce jointe</h3>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          Ajoutez des fichiers à cette tâche en utilisant l'onglet "Ajouter des fichiers".
        </p>
        {task && (
          <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 max-w-md">
            <div className="font-medium mb-1">Tâche concernée :</div>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="outline">#{task.id_tache}</Badge>
              <span className="truncate">{task.titre}</span>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              {attachments.length} fichier{attachments.length > 1 ? "s" : ""}
            </p>
            {task && (
              <Badge variant="secondary" className="text-xs">
                Tâche #{task.id_tache}
              </Badge>
            )}
          </div>
          <div className="flex space-x-1 bg-muted rounded-md p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => onViewModeChange("grid")}
            >
              <Grid className="h-4 w-4" />
              <span className="sr-only">Vue grille</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => onViewModeChange("list")}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">Vue liste</span>
            </Button>
          </div>
        </div>

        <div className="space-y-4">{viewMode === "grid" ? renderGridView() : renderListView()}</div>
      </div>

      {/* Dialog de prévisualisation */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="truncate">{selectedFile?.nom}</span>
                {task && (
                  <Badge variant="outline" className="text-xs">
                    #{task.id_tache}
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsPreviewOpen(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Fermer</span>
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-auto">{renderFilePreview()}</div>
        </DialogContent>
      </Dialog>
    </>
  )
}
