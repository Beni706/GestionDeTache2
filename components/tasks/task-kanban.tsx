"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Edit, Trash2, AlertCircle, Circle, Paperclip } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import type { Category, Task } from "@/types"
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

// Props pour le composant Kanban
interface TaskKanbanProps {
  tasks: Task[]
  categories: Category[]
  onStatusChange: (taskId: number, newStatus: "TODO" | "IN_PROGRESS" | "DONE") => Promise<void>
  onTaskUpdated: () => void
}

export function TaskKanban({ tasks, categories, onStatusChange, onTaskUpdated }: TaskKanbanProps) {
  // États pour gérer les interactions
  const [editTask, setEditTask] = useState<Task | null>(null)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [taskForAttachments, setTaskForAttachments] = useState<Task | null>(null)
  const [isAttachmentDialogOpen, setIsAttachmentDialogOpen] = useState(false)
  const { toast } = useToast()
  const { data: session } = useSession()

  // Filtrage des tâches par statut
  const todoTasks = tasks.filter((task) => task.status === "TODO")
  const inProgressTasks = tasks.filter((task) => task.status === "IN_PROGRESS")
  const doneTasks = tasks.filter((task) => task.status === "DONE")

  // Fonction pour ouvrir le dialog d'édition de tâche
  const handleEditTask = (task: Task) => {
    setEditTask(task)
    setIsTaskDialogOpen(true)
  }

  // Fonction pour ouvrir le dialog des pièces jointes
  const handleViewAttachments = (task: Task) => {
    setTaskForAttachments(task)
    setIsAttachmentDialogOpen(true)
  }

  // Fonction pour supprimer une tâche
  const handleDeleteTask = async () => {
    if (!taskToDelete) return

    try {
      const token = session?.accessToken || localStorage.getItem("token")
      const response = await fetch(`${API_URL}/tache/${taskToDelete.id_tache}`, {
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

  // Gestion du drag & drop
  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result

    // Si pas de destination ou si la destination est la même que la source
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    const taskId = Number.parseInt(draggableId)
    const newStatus = destination.droppableId as "TODO" | "IN_PROGRESS" | "DONE"

    // Appel à la fonction de mise à jour du statut
    await onStatusChange(taskId, newStatus)
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

  // Fonction pour rendre une carte de tâche
  const renderTaskCard = (task: Task, index: number) => (
    <Draggable key={task.id_tache} draggableId={task.id_tache.toString()} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-3">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium">{task.titre}</CardTitle>
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
                <Badge variant="secondary">{getCategoryName(task.id_categorie)}</Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{task.description || "Aucune description"}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              {/* Bouton pour voir les pièces jointes avec compteur */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewAttachments(task)}
                className={`${getAttachmentCount(task) > 0 ? "text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100" : "text-muted-foreground"}`}
              >
                <Paperclip className="h-3 w-3 mr-1" />
                {getAttachmentCount(task)}
              </Button>

              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => handleEditTask(task)}>
                  <Edit className="h-3 w-3" />
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
                  <Trash2 className="h-3 w-3" />
                  <span className="sr-only">Supprimer</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </Draggable>
  )

  return (
    <>
      {/* Contexte de drag & drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Colonne "À faire" */}
          <div className="bg-background rounded-lg border p-4">
            <h3 className="font-medium mb-3">À faire</h3>
            <Droppable droppableId="TODO">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[200px]">
                  {todoTasks.map((task, index) => renderTaskCard(task, index))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Colonne "En cours" */}
          <div className="bg-background rounded-lg border p-4">
            <h3 className="font-medium mb-3">En cours</h3>
            <Droppable droppableId="IN_PROGRESS">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[200px]">
                  {inProgressTasks.map((task, index) => renderTaskCard(task, index))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Colonne "Terminé" */}
          <div className="bg-background rounded-lg border p-4">
            <h3 className="font-medium mb-3">Terminé</h3>
            <Droppable droppableId="DONE">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[200px]">
                  {doneTasks.map((task, index) => renderTaskCard(task, index))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>

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

      {/* Dialog pour gérer les pièces jointes */}
      <EnhancedAttachmentDialog
        open={isAttachmentDialogOpen}
        onOpenChange={setIsAttachmentDialogOpen}
        task={taskForAttachments}
        onAttachmentAdded={onTaskUpdated}
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
    </>
  )
}
