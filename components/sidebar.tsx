"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Home,
  FolderOpen,
  Plus,
  LogOut,
  User,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { ProjectDialog } from "@/components/projects/project-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Project {
  id_projet: number;
  nom: string;
  description?: string;
  statut: string;
  _count?: {
    taches: number;
  };
}

export function Sidebar() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [expandedProjects, setExpandedProjects] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { data: session, status } = useSession();

  // Charger les projets et les informations utilisateur
  useEffect(() => {
    const loadData = async () => {
      if (status === "loading") {
        setLoading(true);
        return;
      }

      const token = session?.user?.apiToken || localStorage.getItem("token");
      const userId = session?.user?.id || localStorage.getItem("userId");
      let email = session?.user?.email;

      if (!email && token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          email = payload.email;
        } catch (e) {
          console.error("Failed to decode token:", e);
        }
      }
      setUserEmail(email || "Utilisateur");

      if (token && userId) {
        try {
          const response = await fetch(`/api/projet/utilisateur/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const data = await response.json();
            setProjects(data);
          } else {
            toast({ title: "Erreur", description: "Impossible de charger les projets.", variant: "destructive" });
          }
        } catch (error) {
          console.error("Erreur lors du chargement des projets:", error);
          toast({ title: "Erreur", description: "Une erreur réseau est survenue.", variant: "destructive" });
        }
      }
      setLoading(false);
    };

    loadData();
  }, [session, status, toast]);

  // Gérer la déconnexion
  const handleLogout = async () => {
    if (status === "authenticated") {
      await signOut({ redirect: false });
    }
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
    router.push("/login");
  };

  // Rafraîchir les projets après création
  const handleProjectCreated = () => {
    setShowProjectDialog(false);
    // Optionnel : recharger les projets ici si besoin
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      current: pathname === "/dashboard",
    },
  ];

  return (
    <div className="flex h-full w-64 flex-col bg-background border-r">
      {/* Header avec profil utilisateur */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-sm">
              {userEmail.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {userEmail}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Déconnexion</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          {/* Navigation principale */}
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  item.current
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          <Separator />

          {/* Section Projets */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedProjects(!expandedProjects)}
                className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground p-0 h-auto"
              >
                {expandedProjects ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <span>Projets</span>
                <Badge variant="secondary" className="ml-2 h-5 text-xs">
                  {projects.length}
                </Badge>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowProjectDialog(true)}
                className="h-6 w-6 p-0"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            {expandedProjects && (
              <div className="space-y-1 pl-2">
                {loading ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  </div>
                ) : projects.length === 0 ? (
                  <p className="text-xs text-muted-foreground py-2 px-3">
                    Aucun projet
                  </p>
                ) : (
                  projects.map((project) => (
                    <Link
                      key={project.id_projet}
                      href={`/project/${project.id_projet}`}
                      className={cn(
                        "flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors group",
                        pathname === `/project/${project.id_projet}`
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <FolderOpen className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{project.nom}</span>
                      </div>
                      {project._count?.taches && project._count.taches > 0 && (
                        <Badge variant="secondary" className="h-4 text-xs ml-2">
                          {project._count.taches}
                        </Badge>
                      )}
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Dialog de création de projet */}
      <ProjectDialog
        open={showProjectDialog}
        onOpenChange={setShowProjectDialog}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
}
