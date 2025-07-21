"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category, Task } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Paperclip } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fr } from "date-fns/locale";
import { useSession } from "next-auth/react";
import { EnhancedAttachmentDialog } from "./enhanced-attachment-dialog";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Schéma de validation pour le formulaire de tâche
const taskSchema = z.object({
  titre: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  date_limite: z.date({
    required_error: "La date d'échéance est requise",
  }),
  priorite: z.enum(["LOW", "MEDIUM", "HIGH"], {
    required_error: "La priorité est requise",
  }),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"], {
    required_error: "Le statut est requis",
  }),
  id_categorie: z.string().optional(),
});

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  onTaskCreated?: () => void; // Utilisé partout
  projectId?: number;
}

export function TaskDialog({
  open,
  onOpenChange,
  task = null,
  onTaskCreated,
  projectId,
}: TaskDialogProps) {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const [isAttachmentDialogOpen, setIsAttachmentDialogOpen] = useState(false);

  // Initialisation du formulaire avec react-hook-form et zod
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      titre: "",
      description: "",
      date_limite: new Date(),
      priorite: "MEDIUM" as const,
      status: "TODO" as const,
      id_categorie: "0", // Valeur par défaut non vide
    },
  });

  // Récupération des catégories depuis l'API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = session?.accessToken || localStorage.getItem("token");

        if (!token) {
          console.log("Aucun token d'authentification trouvé");
          setCategories([]);
          return;
        }

        const url = projectId
          ? `/api/categorie?projet=${projectId}`
          : `/api/categorie`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Could not fetch categories:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les catégories",
          variant: "destructive",
        });
        // Ne pas utiliser de données fictives, simplement initialiser avec un tableau vide
        setCategories([]);
      }
    };

    if (open) {
      fetchCategories();
    }
  }, [toast, session, open, projectId]);

  // Mise à jour du formulaire lorsqu'une tâche est fournie pour édition
  useEffect(() => {
    if (task) {
      form.reset({
        titre: task.titre,
        description: task.description || "",
        date_limite: new Date(task.date_limite),
        priorite: task.priorite,
        status: task.status,
        id_categorie: task.id_categorie ? task.id_categorie.toString() : "0",
      });
    } else {
      form.reset({
        titre: "",
        description: "",
        date_limite: new Date(),
        priorite: "MEDIUM",
        status: "TODO",
        id_categorie: "0",
      });
    }
  }, [task, form]);

  // Soumission du formulaire
  const onSubmit: SubmitHandler<z.infer<typeof taskSchema>> = async (
    values
  ) => {
    setIsLoading(true);
    try {
      const token = session?.accessToken || localStorage.getItem("token");
      const userId = session?.user?.id || localStorage.getItem("userId");

      if (!token) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour créer une tâche",
          variant: "destructive",
        });
        return;
      }

      // Préparation des données pour l'API
      const taskData = {
        titre: values.titre,
        description: values.description || "",
        date_limite: values.date_limite.toISOString(),
        priorite: values.priorite,
        status: values.status,
        id_categorie:
          values.id_categorie && values.id_categorie !== "0"
            ? Number.parseInt(values.id_categorie)
            : null,
        id_utilisateur: userId ? Number.parseInt(userId as string) : 1,
        id_projet: projectId || task?.id_projet || 1,
      };

      // URL et méthode selon création ou modification
      const url = task
        ? `/api/tache/${task.id_tache}`
        : `/api/tache`;
      const method = task ? "PUT" : "POST";

      // Appel API pour créer ou modifier la tâche
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(
          `Erreur lors de ${
            task ? "la modification" : "la création"
          } de la tâche`
        );
      }

      toast({
        title: "Succès",
        description: `Tâche ${task ? "modifiée" : "créée"} avec succès`,
      });

      onOpenChange(false);
      if (onTaskCreated) {
        onTaskCreated();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {task ? "Modifier la tâche" : "Créer une nouvelle tâche"}
          </DialogTitle>
          <DialogDescription>
            {task
              ? "Modifiez les détails de votre tâche ci-dessous."
              : "Remplissez les détails de votre nouvelle tâche ci-dessous."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Champ pour le titre */}
            <FormField
              control={form.control}
              name="titre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="Titre de la tâche" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Champ pour la description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description de la tâche"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* Champ pour la date d'échéance */}
              <FormField
                control={form.control}
                name="date_limite"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date d'échéance</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full pl-3 text-left font-normal ${
                              !field.value ? "text-muted-foreground" : ""
                            }`}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: fr })
                            ) : (
                              <span>Choisir une date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Champ pour la priorité */}
              <FormField
                control={form.control}
                name="priorite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priorité</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une priorité" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="LOW">Basse</SelectItem>
                        <SelectItem value="MEDIUM">Moyenne</SelectItem>
                        <SelectItem value="HIGH">Haute</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Champ pour le statut */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="TODO">À faire</SelectItem>
                        <SelectItem value="IN_PROGRESS">En cours</SelectItem>
                        <SelectItem value="DONE">Terminé</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Champ pour la catégorie */}
              <FormField
                control={form.control}
                name="id_categorie"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Sans catégorie</SelectItem>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id_categorie}
                            value={category.id_categorie.toString()}
                          >
                            {category.nom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              {task && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAttachmentDialogOpen(true)}
                >
                  <Paperclip className="mr-2 h-4 w-4" />
                  Pièces jointes
                </Button>
              )}
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {task ? "Mettre à jour" : "Créer"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      <EnhancedAttachmentDialog
        open={isAttachmentDialogOpen}
        onOpenChange={setIsAttachmentDialogOpen}
        task={task}
        onAttachmentAdded={() => {
          if (onTaskCreated) {
            onTaskCreated();
          }
        }}
      />
    </Dialog>
  );
}
