"use client"

import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { CartSheet } from "./cart-sheet"
import { Button } from "@/components/ui/button"
import { Languages, User, LogOut } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-xl">
            M
          </div>
          <span className="font-bold text-xl">Mary's Kitchen</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setLanguage(language === "en" ? "fr" : "en")}>
            <Languages className="h-5 w-5" />
            <span className="sr-only">{t("Switch to French", "Passer à l'anglais")}</span>
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">{t("Admin Dashboard", "Tableau de bord")}</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("Logout", "Se déconnecter")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">{t("Login", "Connexion")}</Link>
              </Button>
              <Button variant="default" asChild>
                <Link href="/signup">{t("Sign Up", "S'inscrire")}</Link>
              </Button>
            </>
          )}
          <CartSheet />
        </div>
      </div>
    </header>
  )
}
