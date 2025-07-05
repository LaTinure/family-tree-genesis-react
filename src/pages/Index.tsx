import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TreePine, Users, Heart, Shield, Crown, Link as LinkIcon, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { ROUTES } from "@/lib/constants/routes";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 via-green-50 to-emerald-50">
      <PublicHeader />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-col items-center justify-center mb-8">
            <TreePine className="w-24 h-24 text-whatsapp-600 mb-6" />
            <h1 className="text-5xl font-bold text-gray-900">Connections Familiales</h1>
          </div>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Créez et explorez votre arbre généalogique familial. Connectez-vous avec vos proches,
            partagez des souvenirs et préservez l'histoire de votre famille pour les générations futures.
          </p>

          {/* Options d'action pour utilisateurs non connectés */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={ROUTES.DYNASTY.CREATE}>
              <Button size="lg" className="bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 hover:from-whatsapp-600 hover:to-whatsapp-700 text-white px-8 py-3">
                <Crown className="w-5 h-5 mr-2" />
                Créer une dynastie
              </Button>
            </Link>
            <Link to={ROUTES.AUTH.FAMILY}>
              <Button size="lg" variant="outline" className="border-whatsapp-500 text-whatsapp-600 hover:bg-whatsapp-50 px-8 py-3">
                <LogIn className="w-5 h-5 mr-2" />
                Rejoindre une dynastie
              </Button>
            </Link>
          </div>

          {/* Section pour les liens d'invitation */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-2">
              <LinkIcon className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-800 font-medium">Vous avez reçu une invitation ?</span>
            </div>
            <p className="text-blue-700 text-sm mb-3">
              Cliquez sur le lien d'invitation que vous avez reçu pour rejoindre directement votre dynastie.
            </p>
            <p className="text-blue-600 text-xs">
              Le lien ressemble à : <code className="bg-blue-100 px-2 py-1 rounded">https://votre-app.com/auth-family?token=TOKEN123</code>
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pourquoi choisir Connections Familiales ?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-green-100 hover:border-whatsapp-300 transition-colors">
              <CardHeader className="text-center">
                <Crown className="w-12 h-12 text-whatsapp-600 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-900">Dynasties Isolées</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Chaque famille a son propre espace sécurisé et isolé. Vos données restent privées
                  et organisées par dynastie.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 hover:border-whatsapp-300 transition-colors">
              <CardHeader className="text-center">
                <TreePine className="w-12 h-12 text-whatsapp-600 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-900">Arbre Généalogique</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Visualisez et explorez votre histoire familiale avec un arbre généalogique
                  interactif et facile à naviguer.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 hover:border-whatsapp-300 transition-colors">
              <CardHeader className="text-center">
                <Heart className="w-12 h-12 text-whatsapp-600 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-900">Souvenirs Partagés</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Créez un album familial numérique pour préserver et partager
                  vos précieux souvenirs familiaux.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-whatsapp-500 to-whatsapp-600">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à commencer votre voyage familial ?
          </h2>
          <p className="text-xl text-whatsapp-100 mb-8">
            Rejoignez des milliers de familles qui utilisent déjà Connections Familiales
            pour rester connectées et préserver leur héritage.
          </p>
          <Link to={ROUTES.DYNASTY.CREATE}>
            <Button size="lg" variant="secondary" className="bg-white text-whatsapp-600 hover:bg-gray-100 px-8 py-3">
              <Crown className="w-5 h-5 mr-2" />
              Créer ma Dynastie
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
