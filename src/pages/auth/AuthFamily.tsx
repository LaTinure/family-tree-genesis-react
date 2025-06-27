
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, TreePine, ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';
import { FormHeader } from '@/components/shared/FormHeader';
import { FamilyRegisterForm } from '@/components/family/FamilyRegisterForm';
import { Layout } from '@/components/layout/Layout';

const AuthFamily = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-whatsapp-50 via-green-50 to-emerald-50 px-4 py-8">
        <div className="w-full max-w-md pt-16">
          {/* Header avec logo et titre */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center justify-center space-y-3 mb-4">
              <img src="/tree-favicon.svg" alt="Logo arbre" className="w-28 h-28 mb-2" />
              <h1 className="text-3xl font-bold text-whatsapp-700">Créer un compte Famille</h1>
              <p className="text-gray-600 mb-2">
                Rejoignez votre famille connectée et accédez à l'arbre généalogique, aux membres et plus encore !
              </p>
            </div>
          </div>

          <Card className="w-full shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-whatsapp-50">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-whatsapp-600 data-[state=active]:text-white"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Connexion
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="data-[state=active]:bg-whatsapp-600 data-[state=active]:text-white"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Inscription
                  </TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login" className="mt-6">
                  <CardDescription className="text-center mb-6">
                    Connectez-vous à votre compte Famille Connect
                  </CardDescription>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="login-email" className="text-gray-700">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                        disabled={loginLoading}
                        className="border-gray-300 focus:border-whatsapp-500 focus:ring-whatsapp-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="login-password" className="text-gray-700">Mot de passe</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                        disabled={loginLoading}
                        className="border-gray-300 focus:border-whatsapp-500 focus:ring-whatsapp-500"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 hover:from-whatsapp-600 hover:to-whatsapp-700"
                      disabled={loginLoading}
                    >
                      {loginLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Connexion...
                        </>
                      ) : (
                        'Se connecter'
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register" className="mt-6">
                  <FamilyRegisterForm />
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>

          {/* Footer avec lien vers l'accueil */}
          <div className="text-center mt-6">
            <Button
              variant="ghost"
              onClick={() => navigate(ROUTES.HOME)}
              className="text-whatsapp-600 hover:text-whatsapp-700"
            >
              ← Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthFamily;
