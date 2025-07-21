"use client"

import type React from "react"

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Attachment, Task } from "@/types"
import { Loader2, Paperclip, Trash2, Eye } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useSession } from "next-auth/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentViewer } from "./document-viewer"

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Props pour le dialog de pièces jointes
interface AttachmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: Task | null
  onAttachmentAdded?: () => void
}

export function AttachmentDialog({ open, onOpenChange, task, onAttachmentAdded }: AttachmentDialogProps) {
  // États pour gérer les pièces jointes et les interactions
  const { toast } = useToast()
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [attachmentToDelete, setAttachmentToDelete] = useState<Attachment | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState("")
  const [fileName, setFileName] = useState("")
  const [activeTab, setActiveTab] = useState("list")
  const [selectedAttachment, setSelectedAttachment] = useState<Attachment | null>(null)
  const { data: session } = useSession()

  // Mise à jour des pièces jointes lorsque la tâche change
  useEffect(() => {
    if (task && task.fichiers_joints) {
      setAttachments(task.fichiers_joints)
    } else {
      setAttachments([])
    }
  }, [task])

  // Gestion du changement de fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setFileName(selectedFile.name)

      // Création d'une URL temporaire pour le fichier
      const url = URL.createObjectURL(selectedFile)
      setFileUrl(url)
    }
  }

  // Fonction pour télécharger une pièce jointe
  const handleUpload = async () => {
    if (!task || !file) return

    setIsUploading(true)

    try {
      // Dans un environnement réel, vous téléchargeriez d'abord le fichier sur un service de stockage
      // puis vous utiliseriez l'URL retournée. Pour cette démo, nous utilisons une URL fictive.
      const uploadedUrl = fileUrl || `https://example.com/files/${fileName}`

      const token = session?.accessToken || localStorage.getItem("token")
      const response = await fetch(`/api/ficherJoint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          url: uploadedUrl,
          nom: fileName,
          id_tache: task.id_tache,
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la pièce jointe")
      }

      const data = await response.json()

      // Ajout de la nouvelle pièce jointe à la liste
      const newAttachment = data.newFicherJoint
      setAttachments([...attachments, newAttachment])

      // Sélectionner automatiquement la nouvelle pièce jointe et passer à l'onglet de visualisation
      setSelectedAttachment(newAttachment)
      setActiveTab("view")

      // Réinitialisation du formulaire
      setFile(null)
      setFileName("")
      setFileUrl("")

      toast({
        title: "Succès",
        description: "Pièce jointe ajoutée avec succès",
      })

      if (onAttachmentAdded) {
        onAttachmentAdded()
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  // Fonction pour supprimer une pièce jointe
  const handleDeleteAttachment = async () => {
    if (!attachmentToDelete) return

    setIsLoading(true)

    try {
      const token = session?.accessToken || localStorage.getItem("token")
      const response = await fetch(`/api/ficherJoint/${attachmentToDelete.id_ficher}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la pièce jointe")
      }

      // Mise à jour de la liste des pièces jointes
      setAttachments(attachments.filter((a) => a.id_ficher !== attachmentToDelete.id_ficher))

      // Si la pièce jointe supprimée était sélectionnée, désélectionner et revenir à la liste
      if (selectedAttachment && selectedAttachment.id_ficher === attachmentToDelete.id_ficher) {
        setSelectedAttachment(null)
        setActiveTab("list")
      }

      toast({
        title: "Succès",
        description: "Pièce jointe supprimée avec succès",
      })

      if (onAttachmentAdded) {
        onAttachmentAdded()
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsDeleteDialogOpen(false)
      setAttachmentToDelete(null)
    }
  }

  // Fonction pour visualiser une pièce jointe
  const handleViewAttachment = (attachment: Attachment) => {
    setSelectedAttachment(attachment)
    setActiveTab("view")
  }

  return (
    <>
      {/* Dialog principal pour gérer les pièces jointes */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Pièces jointes</DialogTitle>
            <DialogDescription>
              {task ? `Gérer les pièces jointes pour "${task.titre}"` : "Chargement..."}
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">Liste des fichiers</TabsTrigger>
              <TabsTrigger value="view" disabled={!selectedAttachment}>
                Visualiser
              </TabsTrigger>
            </TabsList>

            {/* Onglet Liste des fichiers */}
            <TabsContent value="list" className="space-y-4">
              {/* Formulaire d'ajout de pièce jointe */}
              <div className="space-y-2">
                <Label htmlFor="file">Ajouter une pièce jointe</Label>
                <div className="flex gap-2">
                  <Input id="file" type="file" onChange={handleFileChange} className="flex-1" />
                  <Button onClick={handleUpload} disabled={!file || isUploading}>
                    {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Paperclip className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Liste des pièces jointes existantes */}
              <div className="space-y-2">
                <Label>Pièces jointes existantes</Label>
                <div className="max-h-[300px] overflow-y-auto">
                  {attachments.length > 0 ? (
                    <div className="space-y-2">
                      {attachments.map((attachment) => (
                        <div
                          key={attachment.id_ficher}
                          className="flex items-center justify-between p-2 border rounded-md"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <Paperclip className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm truncate">{attachment.nom}</span>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewAttachment(attachment)}
                              title="Visualiser"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Visualiser</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setAttachmentToDelete(attachment)
                                setIsDeleteDialogOpen(true)
                              }}
                              title="Supprimer"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Supprimer</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Aucune pièce jointe pour cette tâche.</p>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Onglet Visualiser */}
            <TabsContent value="view">
              {selectedAttachment ? (
                <DocumentViewer attachment={selectedAttachment} />
              ) : (
                <div className="flex justify-center items-center h-[200px]">
                  <p className="text-muted-foreground">Sélectionnez un fichier pour le visualiser</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmation pour supprimer une pièce jointe */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Cette pièce jointe sera définitivement supprimée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAttachment} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
