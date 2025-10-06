"use client"

import { useState, useMemo } from "react"
import { mockCategories, mockMenuItems } from "@/lib/mock-data"
import { useLanguage } from "@/lib/language-context"
import { MenuItemCard } from "@/components/menu-item-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function HomePage() {
  const { language, t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = useMemo(() => {
    let items = mockMenuItems

    if (selectedCategory) {
      items = items.filter((item) => item.category_id === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      items = items.filter(
        (item) =>
          item.name_en.toLowerCase().includes(query) ||
          item.name_fr.toLowerCase().includes(query) ||
          item.description_en?.toLowerCase().includes(query) ||
          item.description_fr?.toLowerCase().includes(query),
      )
    }

    return items
  }, [selectedCategory, searchQuery])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container py-8 flex-1">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            {t("Welcome to Mary's Kitchen", "Bienvenue chez Mary's Kitchen")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t("Delicious homemade meals delivered to your door", "Délicieux repas faits maison livrés à votre porte")}
          </p>
        </section>

        {/* Search Bar */}
        <div className="mb-8 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("Search menu items...", "Rechercher des plats...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className={selectedCategory === null ? "bg-orange-600 hover:bg-orange-700" : ""}
          >
            {t("All", "Tout")}
          </Button>
          {mockCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "bg-orange-600 hover:bg-orange-700" : ""}
            >
              {language === "en" ? category.name_en : category.name_fr}
            </Button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t("No items found", "Aucun article trouvé")}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
