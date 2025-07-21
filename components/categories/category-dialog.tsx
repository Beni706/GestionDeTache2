"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { Category, CategoryFormValues } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Schéma de validation pour le formulaire de catégorie
const categorySchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
})

// Props pour le dialog de catégorie
interface CategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: Category | null
  onCategoryCreated?: () => void
  projectId?: number // ID du projet obligatoire
}

export function CategoryDialog({
  open,
  onOpenChange,
  category = null,
  onCategoryCreated,
  projectId,
}: CategoryDialogProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()

  // Initialisation du formulaire avec react-hook-form et zod
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      nom: category?.nom || "",
    },
  })

  // Soumission du formulaire
  const onSubmit = async (values: CategoryFormValues) => {
    setIsLoading(true)
    try {
      const token = session?.user?.apiToken || session?.accessToken || localStorage.getItem("token")

      if (!token) {
        throw new Error("Vous n'êtes pas authentifié")
      }

      if (!projectId) {
        throw new Error("L'ID du projet est requis")
      }

      // Préparation des données pour l'API
      const categoryData = {
        nom: values.nom,
        id_projet: projectId,
      }

      console.log("Données envoyées:", categoryData)

      // URL et méthode selon création ou modification
      const url = category ? `/api/categorie/${category.id_categorie}` : `/api/categorie`
      const method = category ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Erreur API catégorie:", response.status, errorData)
        throw new Error(
          `Erreur lors de ${category ? "la modification" : "la création"} de la catégorie: ${errorData.message || response.statusText}`,
        )
      }

      toast({
        title: "Succès",
        description: `Catégorie ${category ? "modifiée" : "créée"} avec succès`,
      })

      onOpenChange(false)
      form.reset()
      if (onCategoryCreated) {
        onCategoryCreated()
      }
    } catch (error) {
      console.error("Erreur création catégorie:", error)
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{category ? "Modifier la catégorie" : "Créer une nouvelle catégorie"}</DialogTitle>
          <DialogDescription>
            {category
              ? "Modifiez les détails de votre catégorie ci-dessous."
              : "Remplissez les détails de votre nouvelle catégorie ci-dessous."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Champ pour le nom de la catégorie */}
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom de la catégorie" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {category ? "Mettre à jour" : "Créer"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
