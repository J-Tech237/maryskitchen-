"use client"

import { useMemo } from "react"
import { useLanguage } from "@/lib/language-context"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react"

export default function AdminDashboardPage() {
  const { t } = useLanguage()

  const stats = useMemo(() => {
    const orders = JSON.parse(localStorage.getItem("marys-kitchen-orders") || "[]")
    const totalOrders = orders.length
    const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.total, 0)
    const pendingOrders = orders.filter((o: any) => o.status === "pending").length
    const completedOrders = orders.filter((o: any) => o.status === "delivered").length

    return {
      totalRevenue,
      totalOrders,
      pendingOrders,
      completedOrders,
    }
  }, [])

  const statCards = [
    {
      title: t("Total Revenue", "Revenu Total"),
      value: `${stats.totalRevenue.toLocaleString()} ${t("CFA", "FCFA")}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: t("Total Orders", "Total Commandes"),
      value: stats.totalOrders.toString(),
      icon: ShoppingBag,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: t("Pending Orders", "Commandes en Attente"),
      value: stats.pendingOrders.toString(),
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: t("Completed Orders", "Commandes Terminées"),
      value: stats.completedOrders.toString(),
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">{t("Dashboard", "Tableau de Bord")}</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <div className={`${stat.bgColor} ${stat.color} p-2 rounded-lg`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("Recent Orders", "Commandes Récentes")}</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentOrdersList />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function RecentOrdersList() {
  const { language, t } = useLanguage()
  const orders = useMemo(() => {
    const allOrders = JSON.parse(localStorage.getItem("marys-kitchen-orders") || "[]")
    return allOrders.slice(0, 5)
  }, [])

  if (orders.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">{t("No orders yet", "Aucune commande pour le moment")}</p>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order: any) => (
        <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0">
          <div>
            <p className="font-medium">{order.customerName}</p>
            <p className="text-sm text-muted-foreground">{order.id}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-orange-600">
              {order.total.toLocaleString()} {t("CFA", "FCFA")}
            </p>
            <p className="text-sm text-muted-foreground capitalize">{order.status}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
