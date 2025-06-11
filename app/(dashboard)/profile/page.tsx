"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Mail, Lock, Save, AlertCircle, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UserProfile {
  id_utilisateur: number
  email: string
  created_at?: string
  updated_at?: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // États pour les formulaires
  const [emailForm, setEmailForm] = useState({
    email: "",
    currentPassword: "",
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const { toast } = useToast()
  const router = useRouter()

  // Charger les données utilisateur
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          router.push("/login")
          return
        }

        // Décoder le token pour obtenir l'ID utilisateur
        const payload = JSON.parse(atob(token.split(".")[1]))
        const userId = payload.id

        const response = await fetch(`/api/utilisateur/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
          setEmailForm({ ...emailForm, email: userData.email })
        } else {
          throw new Error("Erreur lors du chargement du profil")
        }
      } catch (error) {
        console.error("Erreur:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger votre profil",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadUserProfile()
  }, [])

  // Validation email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validation mot de passe
  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  // Mettre à jour l'email
  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validations
    const newErrors: { [key: string]: string } = {}

    if (!validateEmail(emailForm.email)) {
      newErrors.email = "Format d'email invalide"
    }

    if (!emailForm.currentPassword) {
      newErrors.currentPassword = "Mot de passe actuel requis"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setUpdating(true)

    try {
      const token = localStorage.getItem("token")
      const payload = JSON.parse(atob(token!.split(".")[1]))
      const userId = payload.id

      const response = await fetch(`/api/utilisateur/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailForm.email,
          password: emailForm.currentPassword,
          updateType: "email",
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setUser({ ...user!, email: emailForm.email })
        setEmailForm({ ...emailForm, currentPassword: "" })

        toast({
          title: "Succès",
          description: "Email mis à jour avec succès",
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || "Erreur lors de la mise à jour")
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de la mise à jour de l'email",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  // Mettre à jour le mot de passe
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validations
    const newErrors: { [key: string]: string } = {}

    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = "Mot de passe actuel requis"
    }

    if (!validatePassword(passwordForm.newPassword)) {
      newErrors.newPassword = "Le mot de passe doit contenir au moins 6 caractères"
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setUpdating(true)

    try {
      const token = localStorage.getItem("token")
      const payload = JSON.parse(atob(token!.split(".")[1]))
      const userId = payload.id

      const response = await fetch(`/api/utilisateur/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          password: passwordForm.newPassword,
          updateType: "password",
        }),
      })

      if (response.ok) {
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })

        toast({
          title: "Succès",
          description: "Mot de passe mis à jour avec succès",
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || "Erreur lors de la mise à jour")
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de la mise à jour du mot de passe",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Impossible de charger les informations du profil</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-lg">{user.email.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Mon Profil</h1>
          <p className="text-muted-foreground">Gérez vos informations personnelles et paramètres de sécurité</p>
        </div>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Informations générales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Informations générales</span>
            </CardTitle>
            <CardDescription>Vos informations de base</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>ID Utilisateur</Label>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">#{user.id_utilisateur}</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Email actuel</Label>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.email}</span>
              </div>
            </div>

            {user.created_at && (
              <div className="space-y-2">
                <Label>Membre depuis</Label>
                <p className="text-sm text-muted-foreground">{new Date(user.created_at).toLocaleDateString("fr-FR")}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modifier l'email */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Modifier l'email</span>
            </CardTitle>
            <CardDescription>Changez votre adresse email</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateEmail} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-email">Nouvel email</Label>
                <Input
                  id="new-email"
                  type="email"
                  value={emailForm.email}
                  onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                  placeholder="nouveau@email.com"
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-password-email">Mot de passe actuel</Label>
                <div className="relative">
                  <Input
                    id="current-password-email"
                    type={showCurrentPassword ? "text" : "password"}
                    value={emailForm.currentPassword}
                    onChange={(e) => setEmailForm({ ...emailForm, currentPassword: e.target.value })}
                    placeholder="Votre mot de passe actuel"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.currentPassword && <p className="text-sm text-destructive">{errors.currentPassword}</p>}
              </div>

              <Button type="submit" disabled={updating} className="w-full">
                {updating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Mise à jour...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Mettre à jour l'email
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Modifier le mot de passe */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5" />
            <span>Modifier le mot de passe</span>
          </CardTitle>
          <CardDescription>Changez votre mot de passe pour sécuriser votre compte</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mot de passe actuel</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    placeholder="Mot de passe actuel"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.currentPassword && <p className="text-sm text-destructive">{errors.currentPassword}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    placeholder="Nouveau mot de passe"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.newPassword && <p className="text-sm text-destructive">{errors.newPassword}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    placeholder="Confirmer le mot de passe"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Le mot de passe doit contenir au moins 6 caractères.</AlertDescription>
            </Alert>

            <Button type="submit" disabled={updating} className="w-full">
              {updating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Mise à jour...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Mettre à jour le mot de passe
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
