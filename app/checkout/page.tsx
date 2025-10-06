"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, Smartphone, Banknote } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const DELIVERY_FEE = 1000

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, cartTotal, clearCart } = useCart()
  const { language, t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    deliveryAddress: "",
    paymentMethod: "cash" as "mtn_money" | "orange_money" | "cash",
    notes: "",
  })

  const total = cartTotal + DELIVERY_FEE

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate order creation
    const orderId = `ORD-${Date.now()}`

    // Store order in localStorage for demo purposes
    const order = {
      id: orderId,
      ...formData,
      items: cart.map((item) => ({
        id: item.id,
        name: language === "en" ? item.name_en : item.name_fr,
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal: cartTotal,
      delivery_fee: DELIVERY_FEE,
      total,
      status: "pending",
      payment_status: "pending",
      created_at: new Date().toISOString(),
    }

    const existingOrders = JSON.parse(localStorage.getItem("marys-kitchen-orders") || "[]")
    localStorage.setItem("marys-kitchen-orders", JSON.stringify([order, ...existingOrders]))

    // Clear cart
    clearCart()

    // Redirect to confirmation page
    setTimeout(() => {
      router.push(`/order-confirmation?orderId=${orderId}`)
    }, 1000)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="container py-12 flex-1">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">{t("Your cart is empty", "Votre panier est vide")}</p>
              <Button asChild>
                <Link href="/">{t("Browse Menu", "Parcourir le Menu")}</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container py-8 flex-1">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("Back to Menu", "Retour au Menu")}
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-8">{t("Checkout", "Passer la Commande")}</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("Customer Information", "Informations Client")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="customerName">{t("Full Name", "Nom Complet")} *</Label>
                    <Input
                      id="customerName"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">{t("Email Address", "Adresse Email")} *</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      required
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">{t("Phone Number", "Numéro de Téléphone")} *</Label>
                    <Input
                      id="customerPhone"
                      type="tel"
                      required
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryAddress">{t("Delivery Address", "Adresse de Livraison")} *</Label>
                    <Textarea
                      id="deliveryAddress"
                      required
                      rows={3}
                      value={formData.deliveryAddress}
                      onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("Payment Method", "Méthode de Paiement")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        paymentMethod: value as typeof formData.paymentMethod,
                      })
                    }
                  >
                    <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                      <RadioGroupItem value="mtn_money" id="mtn" />
                      <Label htmlFor="mtn" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Smartphone className="h-5 w-5 text-orange-600" />
                        <div>
                          <div className="font-medium">MTN Mobile Money</div>
                          <div className="text-sm text-muted-foreground">
                            {t("Pay with MTN Mobile Money", "Payer avec MTN Mobile Money")}
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                      <RadioGroupItem value="orange_money" id="orange" />
                      <Label htmlFor="orange" className="flex items-center gap-3 cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5 text-orange-600" />
                        <div>
                          <div className="font-medium">Orange Money</div>
                          <div className="text-sm text-muted-foreground">
                            {t("Pay with Orange Money", "Payer avec Orange Money")}
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Banknote className="h-5 w-5 text-orange-600" />
                        <div>
                          <div className="font-medium">{t("Cash on Delivery", "Paiement à la Livraison")}</div>
                          <div className="text-sm text-muted-foreground">
                            {t("Pay when you receive your order", "Payez à la réception de votre commande")}
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Additional Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("Additional Notes", "Notes Supplémentaires")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder={t(
                      "Any special instructions for your order...",
                      "Instructions spéciales pour votre commande...",
                    )}
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("Processing...", "Traitement...") : t("Place Order", "Passer la Commande")}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>{t("Order Summary", "Résumé de la Commande")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => {
                  const name = language === "en" ? item.name_en : item.name_fr
                  return (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                        <Image src={item.image_url || "/placeholder.svg"} alt={name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{name}</p>
                        <p className="text-sm text-muted-foreground">
                          {t("Qty", "Qté")}: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-orange-600">
                          {(item.price * item.quantity).toLocaleString()} {t("CFA", "FCFA")}
                        </p>
                      </div>
                    </div>
                  )
                })}
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t("Subtotal", "Sous-total")}</span>
                    <span>
                      {cartTotal.toLocaleString()} {t("CFA", "FCFA")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{t("Delivery Fee", "Frais de Livraison")}</span>
                    <span>
                      {DELIVERY_FEE.toLocaleString()} {t("CFA", "FCFA")}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t("Total", "Total")}</span>
                    <span className="text-orange-600">
                      {total.toLocaleString()} {t("CFA", "FCFA")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
