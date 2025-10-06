"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const { t } = useLanguage()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError(t("Passwords do not match", "Les mots de passe ne correspondent pas"))
      return
    }

    if (password.length < 6) {
      setError(t("Password must be at least 6 characters", "Le mot de passe doit contenir au moins 6 caractères"))
      return
    }

    setIsLoading(true)

    const success = await signup(email, password, name)

    if (success) {
      router.push("/admin")
    } else {
      setError(t("Email already exists", "L'email existe déjà"))
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">{t("Sign Up", "S'inscrire")}</CardTitle>
            <CardDescription>
              {t("Create an account to access the admin dashboard", "Créez un compte pour accéder au tableau de bord")}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">{t("Full Name", "Nom complet")}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t("John Doe", "Jean Dupont")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("Email", "Email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("you@example.com", "vous@exemple.com")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("Password", "Mot de passe")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t("Confirm Password", "Confirmer le mot de passe")}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("Creating account...", "Création du compte...") : t("Sign Up", "S'inscrire")}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                {t("Already have an account?", "Vous avez déjà un compte?")}{" "}
                <Link href="/login" className="text-orange-600 hover:underline font-medium">
                  {t("Login", "Connexion")}
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
