"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { TaskDialog } from "@/components/tasks/task-dialog"

export function DashboardHeader() {
  // État pour contrôler l'ouverture du dialog de création de tâche
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Titre et description du dashboard */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">Gérez vos tâches et suivez votre progression</p>
      </div>

      {/* Bouton pour créer une nouvelle tâche */}
      <Button onClick={() => setIsTaskDialogOpen(true)}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Nouvelle tâche
      </Button>

      {/* Dialog pour créer une nouvelle tâche */}
      <TaskDialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen} />
    </div>
  )
}
