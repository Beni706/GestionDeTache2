"use client"

import type React from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Category, TaskFilters } from "@/types"

// Props pour le composant de filtres
interface TaskFiltersProps {
  filters: TaskFilters
  setFilters: React.Dispatch<React.SetStateAction<TaskFilters>>
  categories: Category[]
}

export function TaskFiltersComponent({ filters, setFilters, categories }: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {/* Filtre par statut */}
      <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          <SelectItem value="TODO">À faire</SelectItem>
          <SelectItem value="IN_PROGRESS">En cours</SelectItem>
          <SelectItem value="DONE">Terminé</SelectItem>
        </SelectContent>
      </Select>

      {/* Filtre par priorité */}
      <Select value={filters.priority} onValueChange={(value) => setFilters({ ...filters, priority: value })}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Priorité" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les priorités</SelectItem>
          <SelectItem value="HIGH">Haute</SelectItem>
          <SelectItem value="MEDIUM">Moyenne</SelectItem>
          <SelectItem value="LOW">Basse</SelectItem>
        </SelectContent>
      </Select>

      {/* Filtre par catégorie */}
      <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les catégories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id_categorie} value={category.id_categorie.toString()}>
              {category.nom}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
