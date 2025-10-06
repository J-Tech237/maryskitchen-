"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, Package, Truck, Home } from "lucide-react"
import Link from "next/link"

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const { language, t } = useLanguage()
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    if (orderId) {
      const orders = JSON.parse(localStorage.getItem("marys-kitchen-orders") || "[]")
      const foundOrder = orders.find((o: any) => o.id === orderId)
      setOrder(foundOrder)
    }
  }, [orderId])

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="container py-12 flex-1">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">{t("Order not found", "Commande introuvable")}</p>
              <Button asChild>
                <Link href="/">{t("Back to Home", "Retour à l'Accueil")}</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  const statusSteps = [
    { key: "pending", icon: Clock, label: t("Pending", "En Attente") },
    { key: "confirmed", icon: CheckCircle, label: t("Confirmed", "Confirmée") },
    { key: "preparing", icon: Package, label: t("Preparing", "En Préparation") },
    { key: "ready", icon: Truck, label: t("Ready", "Prête") },
    { key: "delivered", icon: Home, label: t("Delivered", "Livrée") },
  ]

  const currentStepIndex = statusSteps.findIndex((step) => step.key === order.status)

  const paymentMethodLabels = {
    mtn_money: "MTN Mobile Money",
    orange_money: "Orange Money",
    cash: t("Cash on Delivery", "Paiement à la Livraison"),
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container py-8 max-w-4xl flex-1">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">{t("Order Confirmed!", "Commande Confirmée!")}</h1>
          <p className="text-muted-foreground">{t("Thank you for your order", "Merci pour votre commande")}</p>
        </div>

        {/* Order Status */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t("Order Status", "Statut de la Commande")}</CardTitle>
              <Badge variant="secondary">{order.id}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              {statusSteps.map((step, index) => {
                const Icon = step.icon
                const isActive = index <= currentStepIndex
                const isCurrent = index === currentStepIndex
                return (
                  <div key={step.key} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        isActive ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground"
                      } ${isCurrent ? "ring-4 ring-orange-200" : ""}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-xs text-center ${isActive ? "font-medium" : "text-muted-foreground"}`}>
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t("Customer Information", "Informations Client")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">{t("Name", "Nom")}:</span>{" "}
                <span className="font-medium">{order.customerName}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{t("Email", "Email")}:</span>{" "}
                <span className="font-medium">{order.customerEmail}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{t("Phone", "Téléphone")}:</span>{" "}
                <span className="font-medium">{order.customerPhone}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{t("Address", "Adresse")}:</span>{" "}
                <span className="font-medium">{order.deliveryAddress}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t("Payment Information", "Informations de Paiement")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">{t("Payment Method", "Méthode de Paiement")}:</span>{" "}
                <span className="font-medium">
                  {paymentMethodLabels[order.paymentMethod as keyof typeof paymentMethodLabels]}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">{t("Payment Status", "Statut du Paiement")}:</span>{" "}
                <Badge variant={order.payment_status === "completed" ? "default" : "secondary"}>
                  {order.payment_status === "completed" ? t("Paid", "Payé") : t("Pending", "En Attente")}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Items */}
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
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t("Subtotal", "Sous-total")}</span>
                <span>
                  {order.subtotal.toLocaleString()} {t("CFA", "FCFA")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t("Delivery Fee", "Frais de Livraison")}</span>
                <span>
                  {order.delivery_fee.toLocaleString()} {t("CFA", "FCFA")}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>{t("Total", "Total")}</span>
                <span className="text-orange-600">
                  {order.total.toLocaleString()} {t("CFA", "FCFA")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 mt-8 justify-center">
          <Button asChild variant="outline">
            <Link href="/">{t("Back to Home", "Retour à l'Accueil")}</Link>
          </Button>
          <Button asChild className="bg-orange-600 hover:bg-orange-700">
            <Link href="/track-order">{t("Track Order", "Suivre la Commande")}</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  )
}
