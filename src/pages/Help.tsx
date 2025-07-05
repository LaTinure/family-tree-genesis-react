import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  Users,
  TreePine,
  Settings,
  Shield,
  Star,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ROUTES } from '@/lib/constants/routes';

const Help = () => {
  const faqItems = [
    {
      question: "Comment créer un compte famille ?",
      answer: "Cliquez sur 'Se connecter' dans le menu principal, puis sélectionnez l'onglet 'Inscription'. Remplissez le formulaire avec les informations de votre famille et validez."
    },
    {
      question: "Comment ajouter des membres à ma famille ?",
      answer: "Une fois connecté, allez dans 'Inviter' depuis le menu. Vous pouvez inviter des membres par email ou ajouter manuellement leurs informations."
    },
    {
      question: "Comment utiliser l'arbre généalogique ?",
      answer: "Accédez à 'Arbre' depuis le menu principal. Vous pouvez visualiser votre arbre familial, ajouter des relations et explorer votre généalogie."
    },
    {
      question: "Mes données sont-elles sécurisées ?",
      answer: "Oui, nous utilisons les meilleures pratiques de sécurité. Vos données sont chiffrées et protégées. Seuls les membres de votre famille y ont accès."
    },
    {
      question: "Comment modifier mon profil ?",
      answer: "Cliquez sur votre avatar en haut à droite, puis sélectionnez 'Profil'. Vous pouvez modifier vos informations personnelles et votre photo."
    },
    {
      question: "Comment contacter l'administrateur ?",
      answer: "Utilisez la fonction 'Contact Admin' depuis le menu principal ou envoyez un email à support@familleconnect.com"
    }
  ];

  const quickActions = [
    {
      icon: Users,
      title: "Gérer les membres",
      description: "Ajouter, modifier ou supprimer des membres",
      route: ROUTES.DASHBOARD.MEMBERS
    },
    {
      icon: TreePine,
      title: "Arbre généalogique",
      description: "Visualiser et modifier l'arbre familial",
      route: ROUTES.DASHBOARD.TREE
    },
    {
      icon: Settings,
      title: "Paramètres",
      description: "Configurer les préférences de votre compte",
      route: ROUTES.DASHBOARD.SETTINGS
    }
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
              <HelpCircle className="w-3 h-3 mr-1" />
              Centre d'Aide
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-whatsapp-600 to-green-600 bg-clip-text text-transparent">
                Besoin d'Aide ?
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Trouvez rapidement les réponses à vos questions et découvrez comment utiliser
              au mieux Connections Familiales pour votre famille.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
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
              Actions Rapides
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Accédez rapidement aux fonctionnalités principales de l'application
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={action.route}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-whatsapp-200 hover:border-whatsapp-300">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-whatsapp-100 rounded-lg">
                          <action.icon className="w-6 h-6 text-whatsapp-600" />
                        </div>
                        <CardTitle className="text-lg">{action.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {action.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
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
              Questions Fréquentes
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Trouvez rapidement les réponses aux questions les plus courantes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-whatsapp-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <HelpCircle className="w-5 h-5 text-whatsapp-600 mr-2" />
                      {item.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
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
              Contactez-nous
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Notre équipe est là pour vous aider. N'hésitez pas à nous contacter.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="text-center border-whatsapp-200">
                <CardHeader>
                  <div className="mx-auto p-3 bg-whatsapp-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-whatsapp-600" />
                  </div>
                  <CardTitle className="text-xl">Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">support@familleconnect.com</p>
                  <Button variant="outline" className="border-whatsapp-600 text-whatsapp-600 hover:bg-whatsapp-50">
                    Envoyer un email
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center border-whatsapp-200">
                <CardHeader>
                  <div className="mx-auto p-3 bg-whatsapp-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <MessageCircle className="w-8 h-8 text-whatsapp-600" />
                  </div>
                  <CardTitle className="text-xl">Chat Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Support en ligne disponible</p>
                  <Button variant="outline" className="border-whatsapp-600 text-whatsapp-600 hover:bg-whatsapp-50">
                    Ouvrir le chat
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="text-center border-whatsapp-200">
                <CardHeader>
                  <div className="mx-auto p-3 bg-whatsapp-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Phone className="w-8 h-8 text-whatsapp-600" />
                  </div>
                  <CardTitle className="text-xl">Téléphone</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">+33 1 23 45 67 89</p>
                  <Button variant="outline" className="border-whatsapp-600 text-whatsapp-600 hover:bg-whatsapp-50">
                    Appeler
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            © 2024 Connections Familiales. Tous droits réservés.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link to={ROUTES.ABOUT} className="text-whatsapp-600 hover:text-whatsapp-700">
              À propos
            </Link>
            <Link to={ROUTES.LANDING} className="text-whatsapp-600 hover:text-whatsapp-700">
              Accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
