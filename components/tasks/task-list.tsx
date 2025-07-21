"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Edit, Trash2, Paperclip, AlertCircle, CheckCircle, Circle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import type { Category, Task } from "@/types"
import { useState } from "react"
import { TaskDialog } from "./task-dialog"
import { EnhancedAttachmentDialog } from "./enhanced-attachment-dialog"
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
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface TaskListProps {
  tasks: Task[]
  categories: Category[]
  onTaskUpdated: () => void
}

export function TaskList({ tasks, categories, onTaskUpdated }: TaskListProps) {
  // États pour gérer les interactions
  const [editTask, setEditTask] = useState<Task | null>(null)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [taskForAttachments, setTaskForAttachments] = useState<Task | null>(null)
  const [isAttachmentDialogOpen, setIsAttachmentDialogOpen] = useState(false)
  const { toast } = useToast()
  const { data: session } = useSession()

  // Fonction pour ouvrir le dialog d'édition de tâche
  const handleEditTask = (task: Task) => {
    setEditTask(task)
    setIsTaskDialogOpen(true)
  }

  // Fonction pour supprimer une tâche
  const handleDeleteTask = async () => {
    if (!taskToDelete) return

    try {
      const token = session?.accessToken || localStorage.getItem("token")
      const response = await fetch(`/api/tache/${taskToDelete.id_tache}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la tâche")
      }

      toast({
        title: "Succès",
        description: "Tâche supprimée avec succès",
      })

      onTaskUpdated()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la tâche",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
      setTaskToDelete(null)
    }
  }

  // Fonction pour ouvrir le dialog des pièces jointes
  const handleViewAttachments = (task: Task) => {
    setTaskForAttachments(task)
    setIsAttachmentDialogOpen(true)
  }

  // Fonction pour générer le badge de priorité
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return (
          <Badge variant="destructive" className="ml-2">
            <AlertCircle className="mr-1 h-3 w-3" />
            Haute
          </Badge>
        )
      case "MEDIUM":
        return (
          <Badge variant="default" className="ml-2 bg-yellow-500">
            <AlertCircle className="mr-1 h-3 w-3" />
            Moyenne
          </Badge>
        )
      case "LOW":
        return (
          <Badge variant="outline" className="ml-2">
            <Circle className="mr-1 h-3 w-3" />
            Basse
          </Badge>
        )
      default:
        return null
    }
  }

  // Fonction pour générer le badge de statut
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DONE":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Terminé
          </Badge>
        )
      case "IN_PROGRESS":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            <Clock className="mr-1 h-3 w-3" />
            En cours
          </Badge>
        )
      case "TODO":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
            <Circle className="mr-1 h-3 w-3" />À faire
          </Badge>
        )
      default:
        return null
    }
  }

  // Fonction pour obtenir le nom de la catégorie
  const getCategoryName = (categoryId: number | null) => {
    if (!categoryId) return "Sans catégorie"
    const category = categories.find((c) => c.id_categorie === categoryId)
    return category ? category.nom : "Sans catégorie"
  }

  // Fonction pour obtenir le nombre de fichiers joints
  const getAttachmentCount = (task: Task): number => {
    return task.fichiers_joints?.length || 0
  }

  // Message si aucune tâche n'est trouvée
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h3 className="mt-4 text-lg font-medium">Aucune tâche trouvée</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Créez une nouvelle tâche pour commencer à organiser votre travail.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Grille de cartes pour afficher les tâches */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card key={task.id_tache} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{task.titre}</CardTitle>
                {getPriorityBadge(task.priorite)}
              </div>
              <CardDescription className="flex items-center mt-1">
                <Calendar className="mr-1 h-3 w-3" />
                {formatDistanceToNow(new Date(task.date_limite), {
                  addSuffix: true,
                  locale: fr,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {getStatusBadge(task.status)}
                <Badge variant="secondary">{getCategoryName(task.id_categorie)}</Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">{task.description || "Aucune description"}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              {/* Bouton pour voir les pièces jointes avec compteur amélioré */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewAttachments(task)}
                className={`${
                  getAttachmentCount(task) > 0
                    ? "text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Paperclip className="h-4 w-4 mr-2" />
                <span className="text-sm">
                  {getAttachmentCount(task)} fichier{getAttachmentCount(task) !== 1 ? "s" : ""}
                </span>
              </Button>

              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEditTask(task)}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Modifier</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setTaskToDelete(task)
                    setIsDeleteDialogOpen(true)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Supprimer</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Dialog pour éditer une tâche */}
      <TaskDialog
        open={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
        task={editTask}
        onTaskCreated={() => {
          onTaskUpdated()
          setEditTask(null)
        }}
      />

      {/* Dialog de confirmation pour supprimer une tâche */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Cette tâche sera définitivement supprimée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTask}>Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog pour gérer les pièces jointes */}
      <EnhancedAttachmentDialog
        open={isAttachmentDialogOpen}
        onOpenChange={setIsAttachmentDialogOpen}
        task={taskForAttachments}
        onAttachmentAdded={onTaskUpdated}
      />
    </>
  )
}
