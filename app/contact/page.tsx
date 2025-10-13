"use client"

import { useLanguage } from "@/lib/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  MessageCircle,
  Star,
  CheckCircle
} from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const { language, t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: language === "en" ? "Address" : "Adresse",
      details: [
        "123 Main Street",
        "Yaoundé, Cameroon",
        "P.O. Box 1234"
      ]
    },
    {
      icon: Phone,
      title: language === "en" ? "Phone" : "Téléphone",
      details: [
        "+237 6XX XXX XXX",
        "+237 6XX XXX XXX"
      ]
    },
    {
      icon: Mail,
      title: language === "en" ? "Email" : "Email",
      details: [
        "hello@maryskitchen.cm",
        "orders@maryskitchen.cm"
      ]
    },
    {
      icon: Clock,
      title: language === "en" ? "Opening Hours" : "Heures d'Ouverture",
      details: [
        language === "en" ? "Monday - Friday: 8:00 AM - 10:00 PM" : "Lundi - Vendredi: 8h00 - 22h00",
        language === "en" ? "Saturday - Sunday: 9:00 AM - 11:00 PM" : "Samedi - Dimanche: 9h00 - 23h00"
      ]
    }
  ]

  const faqs = [
    {
      question: language === "en" ? "How long does delivery take?" : "Combien de temps prend la livraison?",
      answer: language === "en" 
        ? "Delivery typically takes 30-45 minutes depending on your location in Yaoundé."
        : "La livraison prend généralement 30-45 minutes selon votre emplacement à Yaoundé."
    },
    {
      question: language === "en" ? "What payment methods do you accept?" : "Quels modes de paiement acceptez-vous?",
      answer: language === "en"
        ? "We accept cash on delivery, mobile money (MTN, Orange), and bank transfers."
        : "Nous acceptons les paiements en espèces à la livraison, le mobile money (MTN, Orange), et les virements bancaires."
    },
    {
      question: language === "en" ? "Do you offer catering services?" : "Offrez-vous des services de traiteur?",
      answer: language === "en"
        ? "Yes! We provide catering for events, parties, and corporate functions. Contact us for custom quotes."
        : "Oui! Nous fournissons des services de traiteur pour les événements, fêtes et fonctions d'entreprise. Contactez-nous pour des devis personnalisés."
    },
    {
      question: language === "en" ? "Can I modify my order after placing it?" : "Puis-je modifier ma commande après l'avoir passée?",
      answer: language === "en"
        ? "You can modify or cancel your order within 10 minutes of placing it by calling us directly."
        : "Vous pouvez modifier ou annuler votre commande dans les 10 minutes suivant sa passation en nous appelant directement."
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
              {language === "en" ? "Get in Touch" : "Contactez-nous"}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {language === "en" ? "Contact Us" : "Contactez-nous"}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {language === "en"
                ? "Have questions, feedback, or want to place a custom order? We'd love to hear from you! Get in touch with our team and we'll respond as soon as possible."
                : "Vous avez des questions, des commentaires ou souhaitez passer une commande personnalisée? Nous aimerions avoir de vos nouvelles! Contactez notre équipe et nous répondrons dès que possible."}
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <info.icon className="h-8 w-8 mx-auto mb-4 text-orange-600" />
                  <h3 className="font-semibold mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground">{detail}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-orange-600" />
                    {language === "en" ? "Send us a Message" : "Envoyez-nous un Message"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          {language === "en" ? "Full Name" : "Nom Complet"} *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder={language === "en" ? "Enter your full name" : "Entrez votre nom complet"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          {language === "en" ? "Email Address" : "Adresse Email"} *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder={language === "en" ? "Enter your email" : "Entrez votre email"}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">
                        {language === "en" ? "Subject" : "Sujet"} *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder={language === "en" ? "What's this about?" : "De quoi s'agit-il?"}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">
                        {language === "en" ? "Message" : "Message"} *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        placeholder={language === "en" ? "Tell us how we can help you..." : "Dites-nous comment nous pouvons vous aider..."}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                      <Send className="h-4 w-4 mr-2" />
                      {language === "en" ? "Send Message" : "Envoyer le Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map & Additional Info */}
              <div className="space-y-8">
                {/* Map Placeholder */}
                <Card>
                  <CardContent className="p-0">
                    <div className="h-64 bg-muted flex items-center justify-center rounded-lg">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                        <p className="text-muted-foreground">
                          {language === "en" ? "Interactive Map Coming Soon" : "Carte Interactive Bientôt Disponible"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          123 Main Street, Yaoundé, Cameroon
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-orange-600" />
                      {language === "en" ? "Quick Contact" : "Contact Rapide"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-orange-600" />
                      <div>
                        <p className="font-medium">+237 6XX XXX XXX</p>
                        <p className="text-sm text-muted-foreground">
                          {language === "en" ? "Call for immediate assistance" : "Appelez pour une assistance immédiate"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-orange-600" />
                      <div>
                        <p className="font-medium">hello@maryskitchen.cm</p>
                        <p className="text-sm text-muted-foreground">
                          {language === "en" ? "Email us anytime" : "Envoyez-nous un email à tout moment"}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        {language === "en" 
                          ? "We typically respond within 2-4 hours during business hours."
                          : "Nous répondons généralement dans les 2-4 heures pendant les heures de bureau."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === "en" ? "Frequently Asked Questions" : "Questions Fréquemment Posées"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {language === "en"
                  ? "Find answers to common questions about our services"
                  : "Trouvez des réponses aux questions courantes sur nos services"}
              </p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === "en" ? "What Our Customers Say" : "Ce Que Disent Nos Clients"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {language === "en"
                  ? "Don't just take our word for it - hear from our satisfied customers"
                  : "Ne prenez pas seulement notre parole - écoutez nos clients satisfaits"}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah M.",
                  rating: 5,
                  comment: language === "en"
                    ? "The best African food in Yaoundé! Fresh, delicious, and always delivered on time."
                    : "La meilleure nourriture africaine à Yaoundé! Fraîche, délicieuse et toujours livrée à l'heure."
                },
                {
                  name: "Jean P.",
                  rating: 5,
                  comment: language === "en"
                    ? "Mary's Kitchen has become our go-to for family dinners. The quality is consistently excellent."
                    : "Mary's Kitchen est devenu notre choix pour les dîners en famille. La qualité est constamment excellente."
                },
                {
                  name: "Grace K.",
                  rating: 5,
                  comment: language === "en"
                    ? "Amazing customer service and the most authentic flavors. Highly recommended!"
                    : "Service client incroyable et les saveurs les plus authentiques. Hautement recommandé!"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
                    <p className="font-semibold text-orange-600">- {testimonial.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-orange-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === "en" ? "Ready to Order?" : "Prêt à Commander?"}
            </h2>
            <p className="text-lg mb-8 opacity-90">
              {language === "en"
                ? "Experience the authentic taste of African cuisine delivered to your door."
                : "Découvrez le goût authentique de la cuisine africaine livrée à votre porte."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <a href="tel:+2376XXXXXXXX">
                  {language === "en" ? "Call Now" : "Appeler Maintenant"}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                <a href="/">
                  {language === "en" ? "Order Online" : "Commander en Ligne"}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
