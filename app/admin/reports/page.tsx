"use client"

import { useMemo, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { AdminNav } from "@/components/admin-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Download, TrendingUp, DollarSign, ShoppingBag } from "lucide-react"

export default function AdminReportsPage() {
  const { language, t } = useLanguage()
  const [dateRange, setDateRange] = useState("7days")

  const reportData = useMemo(() => {
    const orders = JSON.parse(localStorage.getItem("marys-kitchen-orders") || "[]")

    // Calculate date range
    const now = new Date()
    const daysAgo = dateRange === "7days" ? 7 : dateRange === "30days" ? 30 : 90
    const startDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)

    const filteredOrders = orders.filter((order: any) => new Date(order.created_at) >= startDate)

    // Total revenue
    const totalRevenue = filteredOrders.reduce((sum: number, order: any) => sum + order.total, 0)

    // Total orders
    const totalOrders = filteredOrders.length

    // Average order value
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    // Orders by status
    const ordersByStatus = filteredOrders.reduce((acc: any, order: any) => {
      acc[order.status] = (acc[order.status] || 0) + 1
      return acc
    }, {})

    const statusData = Object.entries(ordersByStatus).map(([status, count]) => ({
      name: status,
      value: count as number,
    }))

    // Revenue by day
    const revenueByDay = filteredOrders.reduce((acc: any, order: any) => {
      const date = new Date(order.created_at).toLocaleDateString(language === "en" ? "en-US" : "fr-FR", {
        month: "short",
        day: "numeric",
      })
      acc[date] = (acc[date] || 0) + order.total
      return acc
    }, {})

    const dailyRevenueData = Object.entries(revenueByDay)
      .map(([date, revenue]) => ({
        date,
        revenue: revenue as number,
      }))
      .slice(-14) // Last 14 days

    // Top selling items
    const itemSales = filteredOrders.reduce((acc: any, order: any) => {
      order.items.forEach((item: any) => {
        if (!acc[item.name]) {
          acc[item.name] = { name: item.name, quantity: 0, revenue: 0 }
        }
        acc[item.name].quantity += item.quantity
        acc[item.name].revenue += item.price * item.quantity
      })
      return acc
    }, {})

    const topItems = Object.values(itemSales)
      .sort((a: any, b: any) => b.revenue - a.revenue)
      .slice(0, 5)

    // Payment methods
    const paymentMethods = filteredOrders.reduce((acc: any, order: any) => {
      acc[order.paymentMethod] = (acc[order.paymentMethod] || 0) + 1
      return acc
    }, {})

    const paymentData = Object.entries(paymentMethods).map(([method, count]) => ({
      name: method === "mtn_money" ? "MTN Money" : method === "orange_money" ? "Orange Money" : t("Cash", "Espèces"),
      value: count as number,
    }))

    return {
      totalRevenue,
      totalOrders,
      avgOrderValue,
      statusData,
      dailyRevenueData,
      topItems,
      paymentData,
    }
  }, [dateRange, language, t])

  const COLORS = ["#ea580c", "#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"]

  const handleExportCSV = () => {
    const orders = JSON.parse(localStorage.getItem("marys-kitchen-orders") || "[]")
    const csv = [
      ["Order ID", "Customer", "Email", "Phone", "Total", "Status", "Payment Method", "Date"].join(","),
      ...orders.map((order: any) =>
        [
          order.id,
          order.customerName,
          order.customerEmail,
          order.customerPhone,
          order.total,
          order.status,
          order.paymentMethod,
          new Date(order.created_at).toISOString(),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `marys-kitchen-orders-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{t("Sales Reports", "Rapports de Ventes")}</h1>
          <div className="flex gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">{t("Last 7 Days", "7 Derniers Jours")}</SelectItem>
                <SelectItem value="30days">{t("Last 30 Days", "30 Derniers Jours")}</SelectItem>
                <SelectItem value="90days">{t("Last 90 Days", "90 Derniers Jours")}</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExportCSV} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {t("Export CSV", "Exporter CSV")}
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t("Total Revenue", "Revenu Total")}
              </CardTitle>
              <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                <DollarSign className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {reportData.totalRevenue.toLocaleString()} {t("CFA", "FCFA")}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {dateRange === "7days"
                  ? t("Last 7 days", "7 derniers jours")
                  : dateRange === "30days"
                    ? t("Last 30 days", "30 derniers jours")
                    : t("Last 90 days", "90 derniers jours")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t("Total Orders", "Total Commandes")}
              </CardTitle>
              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                <ShoppingBag className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.totalOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {dateRange === "7days"
                  ? t("Last 7 days", "7 derniers jours")
                  : dateRange === "30days"
                    ? t("Last 30 days", "30 derniers jours")
                    : t("Last 90 days", "90 derniers jours")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t("Avg Order Value", "Valeur Moy. Commande")}
              </CardTitle>
              <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                <TrendingUp className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(reportData.avgOrderValue).toLocaleString()} {t("CFA", "FCFA")}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{t("Per order", "Par commande")}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Daily Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{t("Daily Revenue", "Revenu Quotidien")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={reportData.dailyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#ea580c"
                    strokeWidth={2}
                    name={t("Revenue", "Revenu")}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Orders by Status */}
          <Card>
            <CardHeader>
              <CardTitle>{t("Orders by Status", "Commandes par Statut")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={reportData.statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => entry.name}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {reportData.statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Selling Items */}
          <Card>
            <CardHeader>
              <CardTitle>{t("Top Selling Items", "Articles les Plus Vendus")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reportData.topItems}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantity" fill="#3b82f6" name={t("Quantity", "Quantité")} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>{t("Payment Methods", "Méthodes de Paiement")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={reportData.paymentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {reportData.paymentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
