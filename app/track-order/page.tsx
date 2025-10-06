"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Clock, CheckCircle, Package, Truck, Home, XCircle } from "lucide-react"

export default function TrackOrderPage() {
  const { language, t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [order, setOrder] = useState<any>(null)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const orders = JSON.parse(localStorage.getItem("marys-kitchen-orders") || "[]")
    const foundOrder = orders.find(
      (o: any) =>
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerEmail.toLowerCase() === searchQuery.toLowerCase(),
    )
    if (foundOrder) {
      setOrder(foundOrder)
      setNotFound(false)
    } else {
      setOrder(null)
      setNotFound(true)
    }
  }

  const statusConfig = {
    pending: { icon: Clock, label: t("Pending", "En Attente"), color: "text-yellow-600" },
    confirmed: { icon: CheckCircle, label: t("Confirmed", "Confirmée"), color: "text-blue-600" },
    preparing: { icon: Package, label: t("Preparing", "En Préparation"), color: "text-purple-600" },
    ready: { icon: Truck, label: t("Ready for Delivery", "Prête pour Livraison"), color: "text-orange-600" },
    delivered: { icon: Home, label: t("Delivered", "Livrée"), color: "text-green-600" },
    cancelled: { icon: XCircle, label: t("Cancelled", "Annulée"), color: "text-red-600" },
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container py-8 max-w-3xl flex-1">
        <h1 className="text-3xl font-bold mb-8 text-center">{t("Track Your Order", "Suivre Votre Commande")}</h1>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <Label htmlFor="search">{t("Order ID or Email", "ID de Commande ou Email")}</Label>
                <div className="flex gap-2">
                  <Input
                    id="search"
                    placeholder={t("Enter order ID or email...", "Entrez l'ID de commande ou l'email...")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required
                  />
                  <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                    <Search className="h-4 w-4 mr-2" />
                    {t("Search", "Rechercher")}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {notFound && (
          <Card className="text-center">
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                {t(
                  "Order not found. Please check your order ID or email.",
                  "Commande introuvable. Veuillez vérifier votre ID de commande ou email.",
                )}
              </p>
            </CardContent>
          </Card>
        )}

        {order && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t("Order Details", "Détails de la Commande")}</CardTitle>
                  <Badge variant="secondary">{order.id}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  {(() => {
                    const config = statusConfig[order.status as keyof typeof statusConfig]
                    const Icon = config.icon
                    return (
                      <>
                        <div className={`${config.color}`}>
                          <Icon className="h-8 w-8" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{config.label}</p>
                          <p className="text-sm text-muted-foreground">
                            {t("Ordered on", "Commandé le")}{" "}
                            {new Date(order.created_at).toLocaleDateString(language === "en" ? "en-US" : "fr-FR")}
                          </p>
                        </div>
                      </>
                    )
                  })()}
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">{t("Customer", "Client")}</p>
                    <p className="font-medium">{order.customerName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t("Phone", "Téléphone")}</p>
                    <p className="font-medium">{order.customerPhone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">{t("Delivery Address", "Adresse de Livraison")}</p>
                    <p className="font-medium">{order.deliveryAddress}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("Order Items", "Articles Commandés")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("Qty", "Qté")}: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-orange-600">
                      {(item.price * item.quantity).toLocaleString()} {t("CFA", "FCFA")}
                    </p>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>{t("Total", "Total")}</span>
                  <span className="text-orange-600">
                    {order.total.toLocaleString()} {t("CFA", "FCFA")}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
