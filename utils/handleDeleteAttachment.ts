import type { useToast } from "@/hooks/use-toast"
import type { Session } from "next-auth"

const API_URL = process.env.NEXT_PUBLIC_API_URL || ""

export const handleDeleteAttachment = async (
  attachmentId: number,
  session: Session | null,
  toast: ReturnType<typeof useToast>["toast"],
  onSuccess?: () => void,
) => {
  try {
    const token = session?.accessToken || localStorage.getItem("token")

    if (!token) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté",
        variant: "destructive",
      })
      return false
    }

    const response = await fetch(`${API_URL}/ficherJoint/${attachmentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression")
    }

    toast({
      title: "Succès",
      description: "Pièce jointe supprimée avec succès",
    })

    if (onSuccess) {
      onSuccess()
    }

    return true
  } catch (error) {
    console.error("Erreur:", error)
    toast({
      title: "Erreur",
      description: "Impossible de supprimer la pièce jointe",
      variant: "destructive",
    })
    return false
  }
}
