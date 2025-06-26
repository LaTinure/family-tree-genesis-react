
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, TreePine, ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';
import { FormHeader } from '@/components/shared/FormHeader';
import { FamilyLoginForm } from '@/components/auth/FamilyLoginForm';
import { FamilyRegisterForm } from '@/components/auth/FamilyRegisterForm';
import { Layout } from '@/components/layout/Layout';

const AuthFamily = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-8">
        <div className="w-full max-w-4xl mx-auto pt-8">
          {/* Header avec logo et titre */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center justify-center space-y-4 mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <TreePine className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">👑</span>
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Famille Connect
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                  Rejoignez votre famille connectée et explorez votre arbre généalogique
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Formulaires */}
            <div className="order-2 lg:order-1">
              <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-xl">
                      <TabsTrigger
                        value="login"
                        className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg py-3 font-medium transition-all"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Connexion
                      </TabsTrigger>
                      <TabsTrigger
                        value="register"
                        className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg py-3 font-medium transition-all"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Inscription
                      </TabsTrigger>
                    </TabsList>

                    {/* Login Tab */}
                    <TabsContent value="login" className="mt-6">
                      <FamilyLoginForm />
                    </TabsContent>

                    {/* Register Tab */}
                    <TabsContent value="register" className="mt-6">
                      <FamilyRegisterForm />
                    </TabsContent>
                  </Tabs>
                </CardHeader>
              </Card>
            </div>

            {/* Informations et avantages */}
            <div className="order-1 lg:order-2 space-y-6">
              <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Pourquoi rejoindre ?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>Explorez votre arbre généalogique interactif</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>Connectez-vous avec tous les membres</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>Partagez photos et souvenirs familiaux</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>Organisez des événements familiaux</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">💡 Comment ça marche ?</h4>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex gap-3">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                      <span>Créez votre profil avec vos informations</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                      <span>Attendez la validation d'un administrateur</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                      <span>Explorez votre arbre familial !</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer avec lien vers l'accueil */}
          <div className="text-center mt-8">
            <Button
              variant="ghost"
              onClick={() => navigate(ROUTES.HOME)}
              className="text-gray-600 hover:text-gray-800 font-medium shadow-sm hover:shadow-md transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthFamily;
