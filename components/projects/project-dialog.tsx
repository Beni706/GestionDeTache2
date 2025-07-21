"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
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
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface ProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onProjectCreated: () => void
  project?: any
}

export function ProjectDialog({ open, onOpenChange, onProjectCreated, project }: ProjectDialogProps) {
  const [nom, setNom] = useState(project?.nom || "")
  const [description, setDescription] = useState(project?.description || "")
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()
  const { data: session } = useSession()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!nom.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom du projet est requis",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const token = session?.user?.apiToken || session?.accessToken || localStorage.getItem("token")

      const response = await fetch(`/api/projet${project ? `/${project.id_projet}` : ""}`, {
        method: project ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nom: nom.trim(),
          description: description.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde du projet")
      }

      toast({
        title: "Succès",
        description: `Projet ${project ? "modifié" : "créé"} avec succès`,
      })

      setNom("")
      setDescription("")
      onProjectCreated()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le projet",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{project ? "Modifier le projet" : "Nouveau projet"}</DialogTitle>
          <DialogDescription>
            {project ? "Modifiez les informations du projet." : "Créez un nouveau projet pour organiser vos tâches."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nom">Nom du projet</Label>
              <Input
                id="nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Entrez le nom du projet"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (optionnel)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez votre projet..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {project ? "Modifier" : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
