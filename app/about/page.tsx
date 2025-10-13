"use client"

import { useLanguage } from "@/lib/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Heart, 
  Users, 
  Award, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  ChefHat,
  Star,
  CheckCircle
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const { language, t } = useLanguage()

  const stats = [
    {
      icon: Users,
      value: "500+",
      label: language === "en" ? "Happy Customers" : "Clients Satisfaits"
    },
    {
      icon: Award,
      value: "5+",
      label: language === "en" ? "Years Experience" : "Années d'Expérience"
    },
    {
      icon: ChefHat,
      value: "50+",
      label: language === "en" ? "Menu Items" : "Articles au Menu"
    },
    {
      icon: Star,
      value: "4.9",
      label: language === "en" ? "Average Rating" : "Note Moyenne"
    }
  ]

  const values = [
    {
      icon: Heart,
      title: language === "en" ? "Quality & Freshness" : "Qualité & Fraîcheur",
      description: language === "en" 
        ? "We use only the freshest ingredients and traditional cooking methods to bring you authentic flavors."
        : "Nous utilisons uniquement les ingrédients les plus frais et des méthodes de cuisson traditionnelles pour vous apporter des saveurs authentiques."
    },
    {
      icon: Clock,
      title: language === "en" ? "Timely Delivery" : "Livraison Ponctuelle",
      description: language === "en"
        ? "Your food is prepared fresh and delivered hot to your doorstep within the promised time."
        : "Votre nourriture est préparée fraîche et livrée chaude à votre porte dans les délais promis."
    },
    {
      icon: Users,
      title: language === "en" ? "Community Focus" : "Focus Communautaire",
      description: language === "en"
        ? "We believe in supporting our local community and providing employment opportunities."
        : "Nous croyons en soutenir notre communauté locale et en offrant des opportunités d'emploi."
    }
  ]

  const team = [
    {
      name: "Mary Ngu",
      role: language === "en" ? "Head Chef & Founder" : "Chef Principal & Fondatrice",
      image: "/placeholder-user.jpg",
      description: language === "en"
        ? "With over 10 years of culinary experience, Mary brings authentic African flavors to every dish."
        : "Avec plus de 10 ans d'expérience culinaire, Mary apporte des saveurs africaines authentiques à chaque plat."
    },
    {
      name: "James Fon",
      role: language === "en" ? "Operations Manager" : "Gestionnaire des Opérations",
      image: "/placeholder-user.jpg",
      description: language === "en"
        ? "Ensures smooth operations and timely delivery of all orders."
        : "Assure des opérations fluides et une livraison ponctuelle de toutes les commandes."
    },
    {
      name: "Grace Mballa",
      role: language === "en" ? "Customer Relations" : "Relations Clients",
      image: "/placeholder-user.jpg",
      description: language === "en"
        ? "Dedicated to providing excellent customer service and support."
        : "Dédiée à fournir un excellent service client et un support."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4 text-orange-600 border-orange-600">
              {language === "en" ? "About Mary's Kitchen" : "À propos de Mary's Kitchen"}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {language === "en" ? "Our Story" : "Notre Histoire"}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {language === "en"
                ? "Founded in 2019, Mary's Kitchen has been serving authentic African cuisine to the Yaoundé community. We believe that food brings people together and creates lasting memories."
                : "Fondée en 2019, Mary's Kitchen sert une cuisine africaine authentique à la communauté de Yaoundé. Nous croyons que la nourriture rassemble les gens et crée des souvenirs durables."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
                <Link href="/contact">
                  {language === "en" ? "Get in Touch" : "Contactez-nous"}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">
                  {language === "en" ? "View Menu" : "Voir le Menu"}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0">
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-orange-600" />
                  <div className="text-3xl font-bold text-orange-600 mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === "en" ? "Our Mission & Values" : "Notre Mission & Valeurs"}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {language === "en"
                  ? "We are committed to delivering exceptional food experiences while supporting our community and preserving culinary traditions."
                  : "Nous nous engageons à offrir des expériences culinaires exceptionnelles tout en soutenant notre communauté et en préservant les traditions culinaires."}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <value.icon className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === "en" ? "Meet Our Team" : "Rencontrez Notre Équipe"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {language === "en"
                  ? "The passionate people behind Mary's Kitchen"
                  : "Les personnes passionnées derrière Mary's Kitchen"}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-64">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === "en" ? "Why Choose Mary's Kitchen?" : "Pourquoi Choisir Mary's Kitchen?"}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">
                      {language === "en" ? "Authentic African Cuisine" : "Cuisine Africaine Authentique"}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {language === "en"
                        ? "Traditional recipes passed down through generations, prepared with love and care."
                        : "Recettes traditionnelles transmises de génération en génération, préparées avec amour et soin."}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">
                      {language === "en" ? "Fresh Ingredients" : "Ingrédients Frais"}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {language === "en"
                        ? "We source the freshest local ingredients daily to ensure the best quality."
                        : "Nous nous approvisionnons en ingrédients locaux les plus frais quotidiennement pour garantir la meilleure qualité."}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">
                      {language === "en" ? "Fast & Reliable Delivery" : "Livraison Rapide & Fiable"}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {language === "en"
                        ? "Your food arrives hot and fresh, right on time, every time."
                        : "Votre nourriture arrive chaude et fraîche, à l'heure, à chaque fois."}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">
                      {language === "en" ? "Affordable Prices" : "Prix Abordables"}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {language === "en"
                        ? "Delicious meals at prices that won't break the bank."
                        : "Délicieux repas à des prix qui ne vident pas le portefeuille."}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">
                      {language === "en" ? "Community Support" : "Soutien Communautaire"}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {language === "en"
                        ? "Supporting local farmers and contributing to community development."
                        : "Soutenir les agriculteurs locaux et contribuer au développement communautaire."}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">
                      {language === "en" ? "Excellent Customer Service" : "Excellent Service Client"}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {language === "en"
                        ? "We're here to help and ensure your complete satisfaction."
                        : "Nous sommes là pour aider et assurer votre satisfaction complète."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-orange-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === "en" ? "Ready to Experience Authentic African Cuisine?" : "Prêt à Découvrir la Cuisine Africaine Authentique?"}
            </h2>
            <p className="text-lg mb-8 opacity-90">
              {language === "en"
                ? "Order now and taste the difference that passion and tradition make."
                : "Commandez maintenant et goûtez la différence que font la passion et la tradition."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/">
                  {language === "en" ? "Order Now" : "Commander Maintenant"}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                <Link href="/contact">
                  {language === "en" ? "Contact Us" : "Contactez-nous"}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
