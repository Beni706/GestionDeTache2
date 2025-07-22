"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TaskKanban } from "@/components/tasks/task-kanban"
import { TaskDialog } from "@/components/tasks/task-dialog"
import { CategoryDialog } from "@/components/categories/category-dialog"
import type { Task, Category, Project } from "@/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)

  const { toast } = useToast()
  const { data: session, status } = useSession()

  const fetchProjectData = async () => {
    try {
      if (status === "loading") return

      const token = session?.user?.apiToken || session?.accessToken || localStorage.getItem("token")

      if (!token) {
        toast({
          title: "Erreur d'authentification",
          description: "Veuillez vous reconnecter",
          variant: "destructive",
        })
        return
      }

      // Récupérer le projet
      const projectResponse = await fetch(`/api/projet/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!projectResponse.ok) {
        throw new Error("Projet non trouvé")
      }

      const projectData = await projectResponse.json()
      setProject(projectData)

      // Récupérer les tâches du projet
      const tasksResponse = await fetch(`${API_URL}/tache?projet=${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (tasksResponse.ok) {
        const tasksData = await tasksResponse.json()
        setTasks(tasksData)
      }

      // Récupérer les catégories du projet
      const categoriesResponse = await fetch(`${API_URL}/categorie?projet=${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json()
        setCategories(categoriesData)
      }
    } catch (error) {
      console.error("Erreur fetchProjectData:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger le projet",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    if (status !== "loading" && projectId) {
      const loadData = async () => {
        setIsLoading(true)
        await fetchProjectData()
        setIsLoading(false)
      }
      loadData()
    }
  }, [status, projectId])

  const handleTaskStatusChange = async (taskId: number, newStatus: "TODO" | "IN_PROGRESS" | "DONE") => {
    try {
      const taskToUpdate = tasks.find((task) => task.id_tache === taskId)
      if (!taskToUpdate) return

      const token = session?.user?.apiToken || session?.accessToken || localStorage.getItem("token")
      const response = await fetch(`${API_URL}/tache/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...taskToUpdate,
          status: newStatus,
          date_limite: new Date(taskToUpdate.date_limite).toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la tâche")
      }

      setTasks(tasks.map((task) => (task.id_tache === taskId ? { ...task, status: newStatus } : task)))

      toast({
        title: "Succès",
        description: "Statut de la tâche mis à jour",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut de la tâche",
        variant: "destructive",
      })
    }
  }

  const handleTaskCreated = () => {
    fetchProjectData()
    setIsTaskDialogOpen(false)
  }

  const handleCategoryCreated = () => {
    fetchProjectData()
    setIsCategoryDialogOpen(false)
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">Projet non trouvé</h3>
        <Button onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{project.nom}</h1>
            <p className="text-muted-foreground">
              {tasks.length} tâche(s) • {categories.length} catégorie(s)
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsCategoryDialogOpen(true)}>
            Nouvelle Catégorie
          </Button>
          <Button onClick={() => setIsTaskDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle Tâche
          </Button>
        </div>
      </div>

      <TaskKanban
        tasks={tasks}
        categories={categories}
        onStatusChange={handleTaskStatusChange}
        onTaskUpdated={fetchProjectData}
      />

      <TaskDialog
        open={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
        onTaskCreated={handleTaskCreated}
        projectId={Number(projectId)}
      />

      <CategoryDialog
        open={isCategoryDialogOpen}
        onOpenChange={setIsCategoryDialogOpen}
        onCategoryCreated={handleCategoryCreated}
        projectId={Number(projectId)}
      />
    </div>
  )
}
