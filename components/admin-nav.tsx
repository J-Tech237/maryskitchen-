"use client"

import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Languages, LayoutDashboard, UtensilsCrossed, ShoppingBag, BarChart3, User, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AdminNav() {
  const { language, setLanguage, t } = useLanguage()
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: t("Dashboard", "Tableau de Bord") },
    { href: "/admin/menu", icon: UtensilsCrossed, label: t("Menu", "Menu") },
    { href: "/admin/orders", icon: ShoppingBag, label: t("Orders", "Commandes") },
    { href: "/admin/reports", icon: BarChart3, label: t("Reports", "Rapports") },
  ]

  return (
    <nav className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-xl">
              M
            </div>
            <div>
              <span className="font-bold text-lg">Mary's Kitchen</span>
              <span className="block text-xs text-muted-foreground">{t("Admin Panel", "Panneau Admin")}</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Button
                  key={item.href}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  className={isActive ? "bg-orange-600 hover:bg-orange-700" : ""}
                >
                  <Link href={item.href}>
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                </Button>
              )
            })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setLanguage(language === "en" ? "fr" : "en")}>
            <Languages className="h-5 w-5" />
          </Button>
          <Button asChild variant="outline">
            <Link href="/">{t("View Site", "Voir le Site")}</Link>
          </Button>
          {user && (
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
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("Logout", "Se déconnecter")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  )
}
