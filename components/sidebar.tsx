"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, FolderOpen, LogOut, Menu, Plus } from "lucide-react"
import type { Project } from "@/types"
import { useToast } from "@/hooks/use-toast"
import { ProjectDialog } from "./projects/project-dialog"
import { signOut, useSession } from "next-auth/react"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)
  const { toast } = useToast()
  const { data: session, status } = useSession()

  const fetchProjects = async () => {
    try {
      if (status === "loading") return

      const bearerToken = session?.user?.apiToken || session?.accessToken || localStorage.getItem("token")

      if (!bearerToken) {
        console.log("Aucun token disponible pour l'authentification")
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projet`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })

      if (!response.ok) {
        console.error("Erreur API projets:", response.status, response.statusText)
        throw new Error(`Erreur lors de la récupération des projets: ${response.status}`)
      }

      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error("Erreur fetch projets:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les projets",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    if (status !== "loading") {
      fetchProjects()
    }
  }, [status])

  const handleLogout = async () => {
    if (session) {
      await signOut({ redirect: false })
    }

    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("userId")

    window.location.href = "/login"
  }

  const handleProjectCreated = () => {
    fetchProjects()
    setIsProjectDialogOpen(false)
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon" className="absolute left-4 top-4 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SidebarContent
            pathname={pathname}
            projects={projects}
            onLogout={handleLogout}
            onAddProject={() => setIsProjectDialogOpen(true)}
          />
        </SheetContent>
      </Sheet>

      <aside className="hidden md:flex w-64 flex-col border-r bg-background">
        <SidebarContent
          pathname={pathname}
          projects={projects}
          onLogout={handleLogout}
          onAddProject={() => setIsProjectDialogOpen(true)}
        />
      </aside>

      <ProjectDialog
        open={isProjectDialogOpen}
        onOpenChange={setIsProjectDialogOpen}
        onProjectCreated={handleProjectCreated}
      />
    </>
  )
}

interface SidebarContentProps {
  pathname: string
  projects: Project[]
  onLogout: () => void
  onAddProject: () => void
}

function SidebarContent({ pathname, projects, onLogout, onAddProject }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="h-6 w-6" />
          <span>Gestionnaire de Projets</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="space-y-2 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold">Navigation</h2>
            <div className="space-y-1">
              <Link href="/dashboard" passHref>
                <Button variant={pathname === "/dashboard" ? "secondary" : "ghost"} className="w-full justify-start">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Mes Projets
                </Button>
              </Link>
            </div>
          </div>

          <div className="px-3 py-2">
            <div className="flex items-center justify-between mb-2">
              <h2 className="px-2 text-lg font-semibold">Projets</h2>
              <Button variant="ghost" size="icon" onClick={onAddProject} className="h-7 w-7">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Ajouter un projet</span>
              </Button>
            </div>
            <div className="space-y-1">
              {projects.map((project) => (
                <Link key={project.id_projet} href={`/project/${project.id_projet}`} passHref>
                  <Button
                    variant={pathname.includes(`/project/${project.id_projet}`) ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <FolderOpen className="mr-2 h-4 w-4" />
                    {project.nom}
                  </Button>
                </Link>
              ))}
              {projects.length === 0 && <p className="text-sm text-muted-foreground px-2">Aucun projet</p>}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="mt-auto border-t p-4">
        <Button variant="ghost" className="w-full justify-start" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </Button>
      </div>
    </div>
  )
}
