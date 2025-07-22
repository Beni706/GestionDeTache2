"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Plus, FolderOpen, Calendar, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProjectDialog } from "@/components/projects/project-dialog"
import Link from "next/link"

interface Project {
  id_projet: number
  nom: string
  _count?: { taches: number }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)
  const { toast } = useToast()
  const { data: session, status } = useSession()

  const fetchProjects = async () => {
    // Unifier la récupération du token et de l'ID utilisateur pour les deux modes de connexion
    const token = session?.user?.apiToken || localStorage.getItem("token")
    const userId = session?.user?.id || localStorage.getItem("userId")

    // Si aucun token ou ID n'est trouvé, l'utilisateur n'est pas connecté.
    if (!token || !userId) {
      setProjects([]) // Vider les projets pour un état propre
      return
    }

    try {
      const response = await fetch(`/api/projet/utilisateur/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erreur lors de la récupération des projets")
      }

      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error("Erreur fetchProjects:", error)
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible de charger les projets",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    // La logique de chargement est déclenchée dès que le statut de la session est connu.
    // fetchProjects gère maintenant les deux cas d'authentification.
    const loadData = async () => {
      setIsLoading(true)
      await fetchProjects()
      setIsLoading(false)
    }

    if (status !== "loading") {
      loadData()
    }
  }, [status, session])

  const handleProjectCreated = () => {
    fetchProjects()
    setIsProjectDialogOpen(false)
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mes Projets</h1>
          <p className="text-muted-foreground">Gérez vos projets et organisez vos tâches</p>
        </div>
        <Button onClick={() => setIsProjectDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Projet
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Aucun projet</h3>
          <p className="text-muted-foreground mb-4">Commencez par créer votre premier projet</p>
          <Button onClick={() => setIsProjectDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Créer un projet
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id_projet} href={`/project/${project.id_projet}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="h-5 w-5" />
                    {project.nom}
                  </CardTitle>
                  <CardDescription>{project._count?.taches || 0} tâche(s)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Créé récemment
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Personnel
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <ProjectDialog
        open={isProjectDialogOpen}
        onOpenChange={setIsProjectDialogOpen}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  )
}
