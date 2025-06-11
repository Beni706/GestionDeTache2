import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Task } from "@/types"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

export function DashboardStats({ tasks }: { tasks: Task[] }) {
  // Calcul des statistiques à partir des tâches
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === "DONE").length
  const inProgressTasks = tasks.filter((task) => task.status === "IN_PROGRESS").length
  const todoTasks = tasks.filter((task) => task.status === "TODO").length

  const highPriorityTasks = tasks.filter((task) => task.priorite === "HIGH").length
  const mediumPriorityTasks = tasks.filter((task) => task.priorite === "MEDIUM").length
  const lowPriorityTasks = tasks.filter((task) => task.priorite === "LOW").length

  // Calcul du pourcentage de complétion
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Carte pour le total des tâches */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total des tâches</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTasks}</div>
          <div className="text-xs text-muted-foreground">{completionPercentage}% complétées</div>
        </CardContent>
      </Card>

      {/* Carte pour les tâches terminées */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tâches terminées</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedTasks}</div>
          <div className="text-xs text-muted-foreground">
            {inProgressTasks} en cours, {todoTasks} à faire
          </div>
        </CardContent>
      </Card>

      {/* Carte pour les tâches de priorité haute */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Priorité haute</CardTitle>
          <AlertCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{highPriorityTasks}</div>
          <div className="text-xs text-muted-foreground">
            {tasks.filter((t) => t.priorite === "HIGH" && t.status !== "DONE").length} non terminées
          </div>
        </CardContent>
      </Card>

      {/* Carte pour les tâches de priorité moyenne/basse */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Priorité moyenne/basse</CardTitle>
          <AlertCircle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mediumPriorityTasks + lowPriorityTasks}</div>
          <div className="text-xs text-muted-foreground">
            {mediumPriorityTasks} moyennes, {lowPriorityTasks} basses
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
