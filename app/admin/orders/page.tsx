"use client"

import { useState, useMemo } from "react"
import { useLanguage } from "@/lib/language-context"
import { AdminNav } from "@/components/admin-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Search, Eye, Clock, CheckCircle, Package, Truck, Home, XCircle } from "lucide-react"

export default function AdminOrdersPage() {
  const { language, t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("marys-kitchen-orders") || "[]")
  })

  const filteredOrders = useMemo(() => {
    let filtered = orders

    if (statusFilter !== "all") {
      filtered = filtered.filter((order: any) => order.status === statusFilter)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (order: any) =>
          order.id.toLowerCase().includes(query) ||
          order.customerName.toLowerCase().includes(query) ||
          order.customerEmail.toLowerCase().includes(query) ||
          order.customerPhone.includes(query),
      )
    }

    return filtered
  }, [orders, statusFilter, searchQuery])

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map((order: any) => (order.id === orderId ? { ...order, status: newStatus } : order))
    setOrders(updatedOrders)
    localStorage.setItem("marys-kitchen-orders", JSON.stringify(updatedOrders))
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  const statusConfig = {
    pending: { icon: Clock, label: t("Pending", "En Attente"), color: "bg-yellow-100 text-yellow-800" },
    confirmed: { icon: CheckCircle, label: t("Confirmed", "Confirmée"), color: "bg-blue-100 text-blue-800" },
    preparing: { icon: Package, label: t("Preparing", "En Préparation"), color: "bg-purple-100 text-purple-800" },
    ready: { icon: Truck, label: t("Ready", "Prête"), color: "bg-orange-100 text-orange-800" },
    delivered: { icon: Home, label: t("Delivered", "Livrée"), color: "bg-green-100 text-green-800" },
    cancelled: { icon: XCircle, label: t("Cancelled", "Annulée"), color: "bg-red-100 text-red-800" },
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">{t("Order Management", "Gestion des Commandes")}</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("Search orders...", "Rechercher des commandes...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("All Statuses", "Tous les Statuts")}</SelectItem>
              <SelectItem value="pending">{t("Pending", "En Attente")}</SelectItem>
              <SelectItem value="confirmed">{t("Confirmed", "Confirmée")}</SelectItem>
              <SelectItem value="preparing">{t("Preparing", "En Préparation")}</SelectItem>
              <SelectItem value="ready">{t("Ready", "Prête")}</SelectItem>
              <SelectItem value="delivered">{t("Delivered", "Livrée")}</SelectItem>
              <SelectItem value="cancelled">{t("Cancelled", "Annulée")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filteredOrders.map((order: any) => {
            const config = statusConfig[order.status as keyof typeof statusConfig]
            const Icon = config.icon
            return (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="secondary" className="font-mono">
                          {order.id}
                        </Badge>
                        <Badge className={config.color}>
                          <Icon className="h-3 w-3 mr-1" />
                          {config.label}
                        </Badge>
                      </div>
                      <p className="font-semibold text-lg">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleString(language === "en" ? "en-US" : "fr-FR")}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-orange-600">
                          {order.total.toLocaleString()} {t("CFA", "FCFA")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} {t("items", "articles")}
                        </p>
                      </div>
                      <Button variant="outline" size="icon" onClick={() => setSelectedOrder(order)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t("No orders found", "Aucune commande trouvée")}</p>
          </div>
        )}

        {/* Order Details Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedOrder && (
              <>
                <DialogHeader>
                  <DialogTitle>{t("Order Details", "Détails de la Commande")}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Order Status */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">{t("Order Status", "Statut de la Commande")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select
                        value={selectedOrder.status}
                        onValueChange={(value) => updateOrderStatus(selectedOrder.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">{t("Pending", "En Attente")}</SelectItem>
                          <SelectItem value="confirmed">{t("Confirmed", "Confirmée")}</SelectItem>
                          <SelectItem value="preparing">{t("Preparing", "En Préparation")}</SelectItem>
                          <SelectItem value="ready">{t("Ready for Delivery", "Prête pour Livraison")}</SelectItem>
                          <SelectItem value="delivered">{t("Delivered", "Livrée")}</SelectItem>
                          <SelectItem value="cancelled">{t("Cancelled", "Annulée")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  {/* Customer Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">{t("Customer Information", "Informations Client")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-muted-foreground">{t("Name", "Nom")}:</span>
                          <p className="font-medium">{selectedOrder.customerName}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">{t("Phone", "Téléphone")}:</span>
                          <p className="font-medium">{selectedOrder.customerPhone}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">{t("Email", "Email")}:</span>
                          <p className="font-medium">{selectedOrder.customerEmail}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">
                            {t("Delivery Address", "Adresse de Livraison")}:
                          </span>
                          <p className="font-medium">{selectedOrder.deliveryAddress}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Order Items */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">{t("Order Items", "Articles Commandés")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedOrder.items.map((item: any) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {t("Qty", "Qté")}: {item.quantity} × {item.price.toLocaleString()} {t("CFA", "FCFA")}
                            </p>
                          </div>
                          <p className="font-semibold text-orange-600">
                            {(item.price * item.quantity).toLocaleString()} {t("CFA", "FCFA")}
                          </p>
                        </div>
                      ))}
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{t("Subtotal", "Sous-total")}</span>
                          <span>
                            {selectedOrder.subtotal.toLocaleString()} {t("CFA", "FCFA")}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>{t("Delivery Fee", "Frais de Livraison")}</span>
                          <span>
                            {selectedOrder.delivery_fee.toLocaleString()} {t("CFA", "FCFA")}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>{t("Total", "Total")}</span>
                          <span className="text-orange-600">
                            {selectedOrder.total.toLocaleString()} {t("CFA", "FCFA")}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        {t("Payment Information", "Informations de Paiement")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("Payment Method", "Méthode de Paiement")}:</span>
                        <span className="font-medium">
                          {selectedOrder.paymentMethod === "mtn_money"
                            ? "MTN Mobile Money"
                            : selectedOrder.paymentMethod === "orange_money"
                              ? "Orange Money"
                              : t("Cash on Delivery", "Paiement à la Livraison")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("Payment Status", "Statut du Paiement")}:</span>
                        <Badge variant={selectedOrder.payment_status === "completed" ? "default" : "secondary"}>
                          {selectedOrder.payment_status === "completed"
                            ? t("Paid", "Payé")
                            : t("Pending", "En Attente")}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {selectedOrder.notes && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">{t("Notes", "Notes")}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{selectedOrder.notes}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
