"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { FileIcon, ImageIcon, FileText, Archive, Video, Music, Upload, Search, Trash2, FolderOpen } from "lucide-react"

interface FileItem {
  id: string
  name: string
  size: number
  type: string
  file?: File
  preview?: string
}

interface FileManagerProps {
  selectedFiles: FileItem[]
  onFilesSelected: (files: FileItem[]) => void
  maxFiles: number | null // null pour illimité
}

export function FileManager({ selectedFiles, onFilesSelected, maxFiles }: FileManagerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDragActive, setIsDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Fonction pour formater la taille du fichier
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Fonction pour obtenir l'icône en fonction du type de fichier
  const getFileIcon = (fileType: string, fileName: string) => {
    if (fileType.startsWith("image/")) {
      return <ImageIcon className="h-5 w-5" />
    }
    if (fileType.startsWith("video/")) {
      return <Video className="h-5 w-5" />
    }
    if (fileType.startsWith("audio/")) {
      return <Music className="h-5 w-5" />
    }

    const extension = fileName.split(".").pop()?.toLowerCase()

    if (["pdf", "doc", "docx", "txt"].includes(extension || "")) {
      return <FileText className="h-5 w-5" />
    }
    if (["zip", "rar", "7z"].includes(extension || "")) {
      return <Archive className="h-5 w-5" />
    }

    return <FileIcon className="h-5 w-5" />
  }

  // Fonction pour valider les fichiers
  const validateFiles = (files: File[]): File[] => {
    const validFiles: File[] = []
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = [
      "image/",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/",
      "application/zip",
      "application/x-rar-compressed",
      "video/",
      "audio/",
    ]

    for (const file of files) {
      // Vérifier la taille
      if (file.size > maxSize) {
        toast({
          title: "Fichier trop volumineux",
          description: `${file.name} dépasse la limite de 10MB`,
          variant: "destructive",
        })
        continue
      }

      // Vérifier le type
      const isValidType = allowedTypes.some((type) => file.type.startsWith(type))
      if (!isValidType) {
        toast({
          title: "Type de fichier non supporté",
          description: `${file.name} n'est pas d'un type accepté`,
          variant: "destructive",
        })
        continue
      }

      // Vérifier si le fichier n'est pas déjà sélectionné
      const isDuplicate = selectedFiles.some((f) => f.name === file.name && f.size === file.size)
      if (isDuplicate) {
        toast({
          title: "Fichier déjà sélectionné",
          description: `${file.name} est déjà dans la sélection`,
          variant: "destructive",
        })
        continue
      }

      validFiles.push(file)
    }

    return validFiles
  }

  // Fonction pour traiter les fichiers
  const processFiles = useCallback(
    async (files: File[]) => {
      // Vérifier la limite de fichiers
      if (maxFiles !== null && selectedFiles.length + files.length > maxFiles) {
        toast({
          title: "Limite atteinte",
          description: `Vous ne pouvez pas sélectionner plus de ${maxFiles} fichiers.`,
          variant: "destructive",
        })
        return
      }

      const validFiles = validateFiles(files)

      if (validFiles.length === 0) return

      // Traiter les fichiers valides
      const newFiles: FileItem[] = []

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i]
        const fileItem: FileItem = {
          id: `${Date.now()}-${i}`,
          name: file.name,
          size: file.size,
          type: file.type,
          file: file,
        }

        // Créer une prévisualisation pour les images
        if (file.type.startsWith("image/")) {
          try {
            const preview = await createImagePreview(file)
            fileItem.preview = preview
          } catch (error) {
            console.error("Erreur lors de la création de la prévisualisation:", error)
          }
        }

        newFiles.push(fileItem)
      }

      onFilesSelected([...selectedFiles, ...newFiles])
    },
    [selectedFiles, onFilesSelected, maxFiles, toast],
  )

  // Créer une prévisualisation d'image
  const createImagePreview = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // Gestion du drag & drop natif
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragActive(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        processFiles(files)
      }
    },
    [processFiles],
  )

  // Gestion de la sélection de fichiers via input
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      processFiles(files)
    }
    // Reset input value pour permettre de sélectionner le même fichier
    e.target.value = ""
  }

  // Fonction pour supprimer un fichier
  const removeFile = (id: string) => {
    const fileToRemove = selectedFiles.find((file) => file.id === id)

    // Libérer l'URL de prévisualisation si elle existe
    if (fileToRemove?.preview) {
      URL.revokeObjectURL(fileToRemove.preview)
    }

    onFilesSelected(selectedFiles.filter((file) => file.id !== id))
  }

  // Ouvrir le sélecteur de fichiers
  const openFileSelector = () => {
    fileInputRef.current?.click()
  }

  // Filtrer les fichiers en fonction du terme de recherche
  const filteredFiles = selectedFiles.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-3">
      {/* Zone de drop (réduite) */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileSelector}
        className={`border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50"}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileInput}
          className="hidden"
          accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/*,application/zip,application/x-rar-compressed,video/*,audio/*"
        />
        <div className="flex items-center justify-center gap-3">
          <Upload className="h-6 w-6 text-muted-foreground" />
          <div className="text-left">
            <h3 className="text-sm font-medium">
              {isDragActive ? "Déposez les fichiers ici" : "Glissez-déposez vos fichiers"}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-muted-foreground">ou</p>
              <Button variant="outline" size="sm" className="h-7 px-2 py-0 text-xs">
                <FolderOpen className="mr-1 h-3 w-3" />
                Parcourir
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche et compteur de fichiers */}
      {selectedFiles.length > 0 && (
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher des fichiers..."
              className="pl-8 h-8 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Badge variant="outline" className="h-8 px-3">
            {selectedFiles.length} fichier{selectedFiles.length > 1 ? "s" : ""}
            {maxFiles !== null && ` / ${maxFiles}`}
          </Badge>
        </div>
      )}

      {/* Liste des fichiers sélectionnés - Hauteur augmentée */}
      {selectedFiles.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <ScrollArea className="h-[320px]">
              <div className="p-3 space-y-1">
                {filteredFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {file.preview ? (
                          <img
                            src={file.preview || "/placeholder.svg"}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          getFileIcon(file.type, file.name)
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.id)}
                      className="flex-shrink-0 h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Supprimer</span>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
