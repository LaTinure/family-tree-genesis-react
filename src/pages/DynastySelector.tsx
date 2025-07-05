
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TreePine, Users, Crown, LogIn, HelpCircle, Info } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';

const DynastySelector = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 via-green-50 to-emerald-50">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <TreePine className="w-24 h-24 text-whatsapp-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Connections Familiales</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Créez et explorez votre arbre généalogique familial. Connectez-vous avec vos proches,
              partagez des souvenirs et préservez l'histoire de votre famille pour les générations futures.
            </p>
          </div>

          {/* Liens Aide et À propos */}
          <div className="flex justify-center space-x-4 mb-8">
            <Link to={ROUTES.HELP}>
              <Button
                variant="ghost"
                size="sm"
                className="text-whatsapp-600 hover:text-whatsapp-700"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Aide
              </Button>
            </Link>
            <Link to={ROUTES.ABOUT}>
              <Button
                variant="ghost"
                size="sm"
                className="text-whatsapp-600 hover:text-whatsapp-700"
              >
                <Info className="w-4 h-4 mr-2" />
                À propos
              </Button>
            </Link>
          </div>

          {/* Options principales */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-whatsapp-200 hover:border-whatsapp-400 transition-colors shadow-lg">
              <CardHeader className="text-center pb-4">
                <Crown className="w-16 h-16 text-whatsapp-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-gray-900">Créer une Dynastie</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 mb-6 text-lg">
                  Devenez le fondateur de votre propre dynastie familiale.
                  Créez votre arbre généalogique et invitez vos proches.
                </CardDescription>
                <Link to="/dynasty/payment">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 hover:from-whatsapp-600 hover:to-whatsapp-700 text-white py-3"
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Créer ma dynastie
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 hover:border-green-400 transition-colors shadow-lg">
              <CardHeader className="text-center pb-4">
                <Users className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-gray-900">Rejoindre une Dynastie</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 mb-6 text-lg">
                  Vous avez reçu une invitation ? Rejoignez votre famille
                  et contribuez à l'histoire de votre dynastie.
                </CardDescription>
                <Link to={ROUTES.AUTH.FAMILY}>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full border-green-500 text-green-600 hover:bg-green-50 py-3"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Rejoindre une dynastie
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Fonctionnalités */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border border-gray-200 hover:border-whatsapp-300 transition-colors">
              <CardHeader className="text-center">
                <TreePine className="w-12 h-12 text-whatsapp-600 mx-auto mb-4" />
                <CardTitle className="text-lg text-gray-900">Arbre Généalogique</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Visualisez votre histoire familiale avec un arbre interactif
                  et découvrez vos liens de parenté.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-whatsapp-300 transition-colors">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 text-whatsapp-600 mx-auto mb-4" />
                <CardTitle className="text-lg text-gray-900">Dynasties Privées</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Chaque famille a son espace privé et sécurisé.
                  Vos données restent confidentielles.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-whatsapp-300 transition-colors">
              <CardHeader className="text-center">
                <Crown className="w-12 h-12 text-whatsapp-600 mx-auto mb-4" />
                <CardTitle className="text-lg text-gray-900">Gestion Familiale</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Invitez vos proches, gérez les rôles et préservez
                  l'histoire de votre famille.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynastySelector;
