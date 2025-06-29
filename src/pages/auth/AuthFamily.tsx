import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, UserPlus, TreePine, ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { FamilyRegisterForm } from '@/components/family/FamilyRegisterForm';
import { Layout } from '@/components/layout/Layout';

const AuthFamily = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    try {
      await signIn(loginData.email, loginData.password);
      toast({
        title: 'Connexion réussie',
        description: 'Bienvenue dans votre espace familial !',
      });
      navigate(ROUTES.DASHBOARD.ROOT);
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      toast({
        title: 'Erreur de connexion',
        description: error.message || 'Email ou mot de passe incorrect',
        variant: 'destructive',
      });
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-whatsapp-50 via-green-50 to-emerald-50 px-4 py-8">
        <div className="w-full max-w-md pt-16">
          {/* Header avec logo et titre */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center justify-center space-y-3 mb-4">
              <img src="/tree-favicon.svg" alt="Logo arbre" className="w-28 h-28 mb-2" />
              <h1 className="text-3xl font-bold text-whatsapp-700">Famille Connect</h1>
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
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="login-password" className="text-gray-700">Mot de passe</Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          required
                          disabled={loginLoading}
                          className="border-gray-300 focus:border-whatsapp-500 focus:ring-whatsapp-500 pr-10"
                          placeholder="Votre mot de passe"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
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
                  <FamilyRegisterForm onSuccess={() => setActiveTab('login')} />
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
