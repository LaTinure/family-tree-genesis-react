import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  TreePine,
  Users,
  MessageCircle,
  Shield,
  Star,
  Globe,
  Clock,
  Award,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Camera,
  FileText,
  Lock,
  Zap,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ROUTES } from '@/lib/constants/routes';

const About = () => {
  const features = [
    {
      icon: TreePine,
      title: "Arbre Généalogique Interactif",
      description: "Visualisez et explorez votre histoire familiale avec un arbre généalogique moderne et interactif.",
      color: "text-green-600"
    },
    {
      icon: Users,
      title: "Gestion des Membres",
      description: "Gérez facilement tous les membres de votre famille avec des profils détaillés et des informations à jour.",
      color: "text-blue-600"
    },
    {
      icon: MessageCircle,
      title: "Chat Familial Sécurisé",
      description: "Communiquez en temps réel avec votre famille dans un environnement sécurisé et privé.",
      color: "text-purple-600"
    },
    {
      icon: Shield,
      title: "Sécurité et Confidentialité",
      description: "Vos données familiales sont protégées avec les meilleures pratiques de sécurité.",
      color: "text-red-600"
    },
    {
      icon: Globe,
      title: "Accès Multi-Plateforme",
      description: "Accédez à votre famille depuis n'importe quel appareil, partout dans le monde.",
      color: "text-indigo-600"
    },
    {
      icon: Calendar,
      title: "Événements Familiaux",
      description: "Organisez et partagez les événements importants de votre famille.",
      color: "text-orange-600"
    }
  ];

  const benefits = [
    "🔗 Restez connecté avec tous les membres de votre famille",
    "📱 Accès facile depuis votre smartphone, tablette ou ordinateur",
    "🔒 Vos données sont protégées et restent privées",
    "🌍 Gérez votre famille même à distance",
    "📸 Partagez photos et souvenirs en toute sécurité",
    "📅 Organisez les événements familiaux ensemble",
    "💬 Communiquez instantanément avec vos proches",
    "📊 Visualisez votre arbre généalogique de manière interactive"
  ];

  const stats = [
    { number: "100%", label: "Sécurisé", icon: Lock },
    { number: "24/7", label: "Disponible", icon: Clock },
    { number: "∞", label: "Membres", icon: Users },
    { number: "1.0", label: "Version", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-whatsapp-600 to-whatsapp-700 opacity-10"></div>
        <div className="relative container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-whatsapp-100 text-whatsapp-800 border-whatsapp-300">
              <Star className="w-3 h-3 mr-1" />
              Version 1.0 - Application Familiale
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-whatsapp-600 to-green-600 bg-clip-text text-transparent">
                Connections Familiales
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Reconnectez votre famille, préservez votre héritage et créez des liens durables
              avec notre plateforme moderne dédiée aux familles.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={ROUTES.AUTH.FAMILY}>
                <Button size="lg" className="bg-whatsapp-600 hover:bg-whatsapp-700 text-white px-8 py-3">
                  <Heart className="w-5 h-5 mr-2" />
                  Rejoindre ma Famille
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-whatsapp-600 text-whatsapp-600 hover:bg-whatsapp-50 px-8 py-3">
                <Target className="w-5 h-5 mr-2" />
                Découvrir les Fonctionnalités
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Notre Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Dans un monde où les familles sont souvent dispersées géographiquement,
              notre mission est de créer un espace numérique sécurisé qui rapproche
              les membres de votre famille, préserve votre histoire commune et
              renforce les liens qui vous unissent.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Pourquoi choisir Connections Familiales ?
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-whatsapp-50 to-green-50 rounded-2xl p-8 border border-whatsapp-200">
                <div className="text-center">
                  <Heart className="w-16 h-16 text-whatsapp-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Famille Unie
                  </h4>
                  <p className="text-gray-600">
                    Rejoignez des milliers de familles qui ont déjà choisi
                    Connections Familiales pour rester connectées.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Fonctionnalités Principales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez tous les outils conçus pour renforcer les liens familiaux
              et faciliter la communication entre les générations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-0 bg-white">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-whatsapp-50 to-green-50 flex items-center justify-center mb-4`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-whatsapp-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-whatsapp-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Prêt à Rejoindre Votre Famille ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de familles qui ont déjà choisi Connections Familiales
              pour rester connectées et préserver leur héritage familial.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={ROUTES.AUTH.FAMILY}>
                <Button size="lg" className="bg-whatsapp-600 hover:bg-whatsapp-700 text-white px-8 py-3">
                  <Users className="w-5 h-5 mr-2" />
                  Créer Mon Compte Familial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to={ROUTES.LANDING}>
                <Button variant="outline" size="lg" className="border-whatsapp-600 text-whatsapp-600 hover:bg-whatsapp-50 px-8 py-3">
                  <Globe className="w-5 h-5 mr-2" />
                  Retour à l'Accueil
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Connections Familiales</h3>
              <p className="text-gray-400">
                Votre plateforme familiale moderne pour rester connecté
                avec vos proches, peu importe où vous êtes dans le monde.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  contact@connections-familiales.com
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +33 1 23 45 67 89
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  France
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Développé par</h4>
              <div className="text-gray-400">
                <p className="font-semibold text-whatsapp-400">Thierry Gogo</p>
                <p>Consultant - Développeur</p>
                <p className="mt-2">Spécialisé dans les applications familiales</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Connections Familiales. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
