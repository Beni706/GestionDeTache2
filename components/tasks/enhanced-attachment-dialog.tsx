"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FileManager } from "@/components/files/file-manager"
import type { Task, Attachment } from "@/types"
import { Paperclip, Upload, Loader2, type File } from "lucide-react"
import { useSession } from "next-auth/react"
import { AttachmentGallery } from "./attachment-gallery"
import { ScrollArea } from "@/components/ui/scroll-area"

const API_URL = process.env.NEXT_PUBLIC_API_URL || ""

interface FileItem {
  id: string
  name: string
  size: number
  type: string
  url?: string
  file?: File
  preview?: string
}

interface EnhancedAttachmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: Task | null
  onAttachmentAdded?: () => void
}

export function EnhancedAttachmentDialog({
  open,
  onOpenChange,
  task,
  onAttachmentAdded,
}: EnhancedAttachmentDialogProps) {
  const { toast } = useToast()
  const { data: session } = useSession()
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeTab, setActiveTab] = useState("existing")

  // Réinitialiser les états quand le dialog s'ouvre/se ferme ou que la tâche change
  useEffect(() => {
    if (open && task) {
      fetchAttachments()
    } else {
      // Réinitialiser les états quand le dialog se ferme
      setAttachments([])
      setSelectedFiles([])
      setUploadProgress(0)
      setIsUploading(false)
      setActiveTab("existing")
    }
  }, [open, task])

  const fetchAttachments = async () => {
    if (!task) return

    setIsLoading(true)
    try {
      const token = session?.accessToken || localStorage.getItem("token")

      if (!token) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté",
          variant: "destructive",
        })
        return
      }

      console.log(`Fetching attachments for task ID: ${task.id_tache}`)

      // Appel à l'API pour récupérer les pièces jointes
      const response = await fetch(`/api/ficherJoint/tache/${task.id_tache}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Erreur lors du chargement des pièces jointes: ${response.status}`)
      }

      const data = await response.json()
      console.log(`Received ${data.length} attachments:`, data)
      setAttachments(data)
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les pièces jointes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Upload réel de fichiers via l'API /upload
  const uploadFile = async (file: File): Promise<string> => {
    const token = session?.accessToken || localStorage.getItem("token")

    if (!token) {
      throw new Error("Token d'authentification manquant")
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      console.log(`Uploading file: ${file.name}`)
      const response = await fetch(`/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`)
      }

      const result = await response.json()
      console.log(`Upload successful:`, result)
      return result.url
    } catch (error) {
      console.error(`Erreur upload ${file.name}:`, error)
      throw error
    }
  }

  // Supprimer une pièce jointe
  const handleDeleteAttachment = async (attachmentId: number) => {
    try {
      const token = session?.accessToken || localStorage.getItem("token")

      if (!token) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté",
          variant: "destructive",
        })
        return
      }

      const response = await fetch(`/api/ficherJoint/${attachmentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression")
      }

      toast({
        title: "Succès",
        description: "Pièce jointe supprimée avec succès",
      })

      // Rafraîchir la liste
      await fetchAttachments()

      if (onAttachmentAdded) {
        onAttachmentAdded()
      }
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la pièce jointe",
        variant: "destructive",
      })
    }
  }

  // Ajouter les fichiers sélectionnés
  const handleAddAttachments = async () => {
    if (!task || selectedFiles.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const token = session?.accessToken || localStorage.getItem("token")

      if (!token) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté",
          variant: "destructive",
        })
        return
      }

      const totalFiles = selectedFiles.length
      let uploadedCount = 0
      let successCount = 0

      for (const fileItem of selectedFiles) {
        if (!fileItem.file) continue

        try {
          // Upload du fichier via l'API /upload
          console.log(`Starting upload for: ${fileItem.name}`)
          const fileUrl = await uploadFile(fileItem.file)
          console.log(`File uploaded successfully: ${fileUrl}`)

          // Enregistrer en base de données
          const response = await fetch(`/api/ficherJoint`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: fileUrl,
              nom: fileItem.name,
              id_tache: task.id_tache,
            }),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || `Erreur lors de l'ajout de ${fileItem.name}`)
          }

          const result = await response.json()
          console.log(`Database entry created:`, result)
          successCount++
        } catch (error) {
          console.error(`Erreur upload ${fileItem.name}:`, error)
          toast({
            title: "Erreur d'upload",
            description: `Impossible d'uploader ${fileItem.name}: ${error instanceof Error ? error.message : "Erreur inconnue"}`,
            variant: "destructive",
          })
        }

        uploadedCount++
        setUploadProgress((uploadedCount / totalFiles) * 100)
      }

      if (successCount > 0) {
        toast({
          title: "Succès",
          description: `${successCount} fichier(s) ajouté(s) avec succès`,
        })

        // Rafraîchir la liste des pièces jointes
        await fetchAttachments()
        setSelectedFiles([])
        setActiveTab("existing") // Basculer vers l'onglet des pièces jointes

        if (onAttachmentAdded) {
          onAttachmentAdded()
        }
      } else {
        toast({
          title: "Erreur",
          description: "Aucun fichier n'a pu être uploadé",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Erreur lors de l'ajout des pièces jointes",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  if (!task) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Paperclip className="h-5 w-5" />
            <div className="flex flex-col items-start">
              <span>Pièces jointes</span>
              <span className="text-sm font-normal text-muted-foreground">
                Tâche #{task.id_tache} • {task.titre}
              </span>
            </div>
          </DialogTitle>
          <DialogDescription>Gérez les fichiers joints à cette tâche</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="existing">Pièces jointes ({attachments.length})</TabsTrigger>
            <TabsTrigger value="add">
              Ajouter des fichiers
              {selectedFiles.length > 0 && (
                <span className="ml-1 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                  {selectedFiles.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="existing" className="flex-1 overflow-hidden">
            <ScrollArea className="h-[450px]">
              <div className="pr-4">
                <AttachmentGallery
                  attachments={attachments}
                  onDelete={handleDeleteAttachment}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  task={task}
                />
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="add" className="flex-1 overflow-hidden">
            <ScrollArea className="h-[450px]">
              <div className="pr-4 space-y-4">
                <FileManager onFilesSelected={setSelectedFiles} selectedFiles={selectedFiles} maxFiles={null} />

                {isUploading && (
                  <Card>
                    <CardHeader className="py-2 px-4">
                      <CardTitle className="text-sm">Upload en cours...</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 px-4">
                      <Progress value={uploadProgress} className="w-full" />
                      <p className="text-xs text-muted-foreground mt-1">{Math.round(uploadProgress)}% terminé</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex-shrink-0">
          {activeTab === "add" && selectedFiles.length > 0 && (
            <Button onClick={handleAddAttachments} disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Upload en cours...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Ajouter {selectedFiles.length} fichier(s)
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
