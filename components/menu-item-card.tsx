"use client"

import type { MenuItem } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/language-context"
import { Plus, Clock } from "lucide-react"
import Image from "next/image"

interface MenuItemCardProps {
  item: MenuItem
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCart()
  const { language, t } = useLanguage()

  const name = language === "en" ? item.name_en : item.name_fr
  const description = language === "en" ? item.description_en : item.description_fr

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square">
        <Image src={item.image_url || "/placeholder.svg"} alt={name} fill className="object-cover" />
        {!item.is_available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg">
              {t("Unavailable", "Indisponible")}
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-balance">{name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-600">
            {item.price.toLocaleString()} {t("CFA", "FCFA")}
          </span>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              {item.preparation_time} {t("min", "min")}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => addToCart(item)}
          disabled={!item.is_available}
          className="w-full bg-orange-600 hover:bg-orange-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t("Add to Cart", "Ajouter au Panier")}
        </Button>
      </CardFooter>
    </Card>
  )
}
