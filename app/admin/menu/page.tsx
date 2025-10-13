"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { mockMenuItems, mockCategories } from "@/lib/mock-data"
import { useLanguage } from "@/lib/language-context"
import { AdminNav } from "@/components/admin-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import Image from "next/image"
import type { MenuItem } from "@/lib/types"

export default function AdminMenuPage() {
  const { language, t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [menuItems, setMenuItems] = useState(mockMenuItems)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredItems = useMemo(() => {
    let items = menuItems

    if (selectedCategory !== "all") {
      items = items.filter((item) => item.category_id === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      items = items.filter(
        (item) => item.name_en.toLowerCase().includes(query) || item.name_fr.toLowerCase().includes(query),
      )
    }

    return items
  }, [menuItems, selectedCategory, searchQuery])

  const handleToggleAvailability = (itemId: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, is_available: !item.is_available } : item)),
    )
  }

  const handleDeleteItem = (itemId: string) => {
    if (confirm(t("Are you sure you want to delete this item?", "Êtes-vous sûr de vouloir supprimer cet article?"))) {
      setMenuItems((prev) => prev.filter((item) => item.id !== itemId))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{t("Menu Management", "Gestion du Menu")}</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => setEditingItem(null)}>
                <Plus className="h-4 w-4 mr-2" />
                {t("Add Item", "Ajouter un Article")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? t("Edit Menu Item", "Modifier l'Article") : t("Add Menu Item", "Ajouter un Article")}
                </DialogTitle>
              </DialogHeader>
              <MenuItemForm
                item={editingItem}
                onSave={(item) => {
                  if (editingItem) {
                    setMenuItems((prev) => prev.map((i) => (i.id === item.id ? item : i)))
                  } else {
                    setMenuItems((prev) => [...prev, { ...item, id: Date.now().toString() }])
                  }
                  setIsDialogOpen(false)
                }}
                onCancel={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("Search menu items...", "Rechercher des articles...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("All Categories", "Toutes les Catégories")}</SelectItem>
              {mockCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {language === "en" ? category.name_en : category.name_fr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative aspect-square">
                <Image src={item.image_url || "/placeholder.svg"} alt={item.name_en} fill className="object-cover" />
                <Badge variant={item.is_available ? "default" : "destructive"} className="absolute top-2 right-2">
                  {item.is_available ? t("Available", "Disponible") : t("Unavailable", "Indisponible")}
                </Badge>
              </div>
              <CardContent className="p-3">
                <h3 className="font-semibold text-base mb-2">{language === "en" ? item.name_en : item.name_fr}</h3>
                <p className="text-xl font-bold text-orange-600 mb-3">
                  {item.price.toLocaleString()} {t("CFA", "FCFA")}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch checked={item.is_available} onCheckedChange={() => handleToggleAvailability(item.id)} />
                    <span className="text-xs">{t("Available", "Disponible")}</span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingItem(item)
                        setIsDialogOpen(true)
                      }}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteItem(item.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t("No items found", "Aucun article trouvé")}</p>
          </div>
        )}
      </main>
    </div>
  )
}

function MenuItemForm({
  item,
  onSave,
  onCancel,
}: {
  item: MenuItem | null
  onSave: (item: MenuItem) => void
  onCancel: () => void
}) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState<MenuItem>(
    item || {
      id: "",
      category_id: mockCategories[0].id,
      name_en: "",
      name_fr: "",
      description_en: "",
      description_fr: "",
      price: 0,
      image_url: "/placeholder.svg",
      is_available: true,
      preparation_time: 15,
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name_en">{t("Name (English)", "Nom (Anglais)")} *</Label>
          <Input
            id="name_en"
            required
            value={formData.name_en}
            onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="name_fr">{t("Name (French)", "Nom (Français)")} *</Label>
          <Input
            id="name_fr"
            required
            value={formData.name_fr}
            onChange={(e) => setFormData({ ...formData, name_fr: e.target.value })}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="description_en">{t("Description (English)", "Description (Anglais)")}</Label>
          <Textarea
            id="description_en"
            rows={3}
            value={formData.description_en}
            onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="description_fr">{t("Description (French)", "Description (Français)")}</Label>
          <Textarea
            id="description_fr"
            rows={3}
            value={formData.description_fr}
            onChange={(e) => setFormData({ ...formData, description_fr: e.target.value })}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="category">{t("Category", "Catégorie")} *</Label>
          <Select
            value={formData.category_id}
            onValueChange={(value) => setFormData({ ...formData, category_id: value })}
          >
            <SelectTrigger id="category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name_en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="price">{t("Price (CFA)", "Prix (FCFA)")} *</Label>
          <Input
            id="price"
            type="number"
            required
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <Label htmlFor="prep_time">{t("Prep Time (min)", "Temps de Préparation (min)")} *</Label>
          <Input
            id="prep_time"
            type="number"
            required
            min="0"
            value={formData.preparation_time}
            onChange={(e) => setFormData({ ...formData, preparation_time: Number.parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          checked={formData.is_available}
          onCheckedChange={(checked) => setFormData({ ...formData, is_available: checked })}
        />
        <Label>{t("Available for order", "Disponible à la commande")}</Label>
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t("Cancel", "Annuler")}
        </Button>
        <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
          {t("Save", "Enregistrer")}
        </Button>
      </div>
    </form>
  )
}
