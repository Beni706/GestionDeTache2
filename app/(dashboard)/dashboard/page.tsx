"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Plus,
  FolderOpen,
  Calendar,
  Users,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectDialog } from "@/components/projects/project-dialog";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Project {
  id_projet: number;
  nom: string;
  _count?: { taches: number };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const { data: session, status } = useSession();

  const fetchProjects = async () => {
    // Unifier la récupération du token et de l'ID utilisateur pour les deux modes de connexion
    const token = session?.user?.apiToken || localStorage.getItem("token");
    const userId = session?.user?.id || localStorage.getItem("userId");

    // Si aucun token ou ID n'est trouvé, l'utilisateur n'est pas connecté.
    if (!token || !userId) {
      setProjects([]); // Vider les projets pour un état propre
      return;
    }

    try {
      const response = await fetch(`/api/projet/utilisateur/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erreur lors de la récupération des projets"
        );
      }

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Erreur fetchProjects:", error);
      toast({
        title: "Erreur",
        description:
          error instanceof Error
            ? error.message
            : "Impossible de charger les projets",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    // La logique de chargement est déclenchée dès que le statut de la session est connu.
    // fetchProjects gère maintenant les deux cas d'authentification.
    const loadData = async () => {
      setIsLoading(true);
      await fetchProjects();
      setIsLoading(false);
    };

    if (status !== "loading") {
      loadData();
    }
  }, [status, session]);

  const handleProjectCreated = () => {
    fetchProjects();
    setIsProjectDialogOpen(false);
  };

  const handleEditProject = (project: Project) => {
    setProjectToEdit(project);
    setIsProjectDialogOpen(true);
  };

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    try {
      const token = session?.user?.apiToken || localStorage.getItem("token");
      const response = await fetch(`/api/projet/${projectToDelete.id_projet}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erreur lors de la suppression du projet"
        );
      }
      toast({
        title: "Succès",
        description: "Projet supprimé avec succès.",
      });
      fetchProjects();
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          error instanceof Error
            ? error.message
            : "Impossible de supprimer le projet.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mes Projets</h1>
          <p className="text-muted-foreground">
            Gérez vos projets et organisez vos tâches
          </p>
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
          <p className="text-muted-foreground mb-4">
            Commencez par créer votre premier projet
          </p>
          <Button onClick={() => setIsProjectDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Créer un projet
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id_projet} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <FolderOpen className="h-5 w-5" />
                      <Link
                        href={`/project/${project.id_projet}`}
                        className="hover:underline"
                      >
                        {project.nom}
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      {project._count?.taches || 0} tâche(s)
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 flex-shrink-0"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleEditProject(project)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Modifier</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setProjectToDelete(project);
                          setIsDeleteDialogOpen(true);
                        }}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Supprimer</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
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
          ))}
        </div>
      )}

      <ProjectDialog
        open={isProjectDialogOpen}
        onOpenChange={(open) => {
          if (!open) setProjectToEdit(null);
          setIsProjectDialogOpen(open);
        }}
        onProjectCreated={handleProjectCreated}
        project={projectToEdit}
      />
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Êtes-vous sûr de vouloir supprimer ce projet ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Toutes les tâches, catégories et
              pièces jointes associées à ce projet seront définitivement
              supprimées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              disabled={isDeleting}
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
