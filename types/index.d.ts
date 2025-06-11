// Types pour les données de l'application
export interface Task {
  id_tache: number
  titre: string
  description: string | null
  date_limite: string
  priorite: "LOW" | "MEDIUM" | "HIGH"
  status: "TODO" | "IN_PROGRESS" | "DONE"
  id_categorie: number | null
  id_utilisateur: number
  id_projet: number
  fichiers_joints: Attachment[]
  categorie?: {
    id_categorie: number
    nom: string
  }
}


export interface Project {
  id_projet: number
  nom: string
  id_utilisateur: number
  taches?: Task[]
  categories?: Category[]
}

export interface Category {
  id_categorie: number
  nom: string
  id_utilisateur: number
  id_projet: number
}

export interface Attachment {
  id_ficher: number
  url: string
  nom: string
  id_tache: number
}

export interface TaskFormValues {
  titre: string
  description?: string
  date_limite: Date
  priorite: "LOW" | "MEDIUM" | "HIGH"
  status: "TODO" | "IN_PROGRESS" | "DONE"
  id_categorie: string
}

export interface CategoryFormValues {
  nom: string
}

export interface TaskFilters {
  status: string
  priority: string
  category: string
}

export interface AuthUser {
  id: string | number
  email: string
  token?: string
}
