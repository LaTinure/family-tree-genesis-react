
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogIn, UserPlus, TreePine, ArrowLeft, Loader2, Eye, EyeOff, Crown, CheckCircle, HelpCircle, Info } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useInvitation } from '@/hooks/useInvitation';
import { TokenValidationForm } from '@/components/auth/TokenValidationForm';
import { FamilyRegisterForm } from '@/components/family/FamilyRegisterForm';

const AuthFamily = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    invitationData,
    isLoading: invitationLoading,
    error: invitationError,
    isInvitationValid,
    isExpired,
    isUsed,
    validateToken
  } = useInvitation();

  // Vérifier si on doit aller directement à l'inscription
  useEffect(() => {
    const mode = searchParams.get('mode');
    const hasToken = searchParams.get('token') || searchParams.get('invite');
    
    if (mode === 'register' || hasToken) {
      setActiveTab('register');
    }
  }, [searchParams]);

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

  const handleTokenValidation = async (token: string) => {
    await validateToken(token);
  };

  const getPageTitle = () => {
    if (activeTab === 'register' && isInvitationValid) {
      return 'Rejoindre votre dynastie';
    }
    return 'Famille Connect';
  };

  const getPageDescription = () => {
    if (activeTab === 'register' && isInvitationValid) {
      return `Vous avez été invité à rejoindre la dynastie ${invitationData?.dynasty_name}`;
    }
    return 'Connectez-vous à votre espace familial ou rejoignez une dynastie avec votre invitation';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 via-green-50 to-emerald-50">
      <div className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header avec logo et titre */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center justify-center space-y-3 mb-4">
              <img src="/tree-favicon.svg" alt="Logo arbre" className="w-28 h-28 mb-2" />
              <h1 className="text-3xl font-bold text-whatsapp-700">{getPageTitle()}</h1>
              <p className="text-gray-600 mb-2">
                {getPageDescription()}
              </p>
            </div>
          </div>

          {/* Liens Aide et À propos */}
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(ROUTES.HELP)}
              className="text-whatsapp-600 hover:text-whatsapp-700"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Aide
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(ROUTES.ABOUT)}
              className="text-whatsapp-600 hover:text-whatsapp-700"
            >
              <Info className="w-4 h-4 mr-2" />
              À propos
            </Button>
          </div>

          {/* Affichage de l'invitation si présente */}
          {activeTab === 'register' && invitationData && (
            <div className="mb-6">
              {isInvitationValid ? (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <span>Invitation valide pour la dynastie <strong>{invitationData.dynasty_name}</strong></span>
                      <Badge variant="secondary" className="ml-2">
                        <Crown className="w-3 h-3 mr-1" />
                        {invitationData.user_role}
                      </Badge>
                    </div>
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription>
                    {isExpired ? 'Cette invitation a expiré.' :
                     isUsed ? 'Cette invitation a déjà été utilisée.' :
                     'Invitation invalide.'}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

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
                  {!isInvitationValid ? (
                    <TokenValidationForm
                      onTokenValidated={handleTokenValidation}
                      isLoading={invitationLoading}
                      error={invitationError}
                    />
                  ) : (
                    <FamilyRegisterForm
                      onSuccess={() => {
                        toast({
                          title: 'Inscription réussie',
                          description: 'Vous pouvez maintenant vous connecter à votre dynastie !',
                        });
                        setActiveTab('login');
                      }}
                      invitationData={invitationData}
                      mode={null}
                    />
                  )}
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
    </div>
  );
};

export default AuthFamily;
