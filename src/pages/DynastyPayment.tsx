import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Crown, CreditCard, Shield, Users, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import StripePaymentButton from '../components/StripePaymentButton';

export default function DynastyPayment() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isTempUser, setIsTempUser] = useState(false);
  const [tempUserData, setTempUserData] = useState({
    email: '',
    phone: '',
  });

  const handleTempUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempUserData.email && tempUserData.phone) {
      setIsTempUser(true);
    }
  };

  const features = [
    {
      icon: <Crown className="h-6 w-6 text-yellow-500" />,
      title: "Création de dynastie",
      description: "Créez votre arbre généalogique familial unique"
    },
    {
      icon: <Users className="h-6 w-6 text-blue-500" />,
      title: "Invitations illimitées",
      description: "Invitez tous les membres de votre famille"
    },
    {
      icon: <Shield className="h-6 w-6 text-green-500" />,
      title: "Sécurité garantie",
      description: "Vos données sont protégées et privées"
    },
    {
      icon: <CreditCard className="h-6 w-6 text-purple-500" />,
      title: "Paiement sécurisé",
      description: "Paiement 100% sécurisé via Stripe"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
        <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Créez votre dynastie
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Rejoignez des milliers de familles qui ont déjà créé leur arbre généalogique
              et partagent leur histoire ensemble.
          </p>
        </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Features */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Ce que vous obtenez</CardTitle>
                  <CardDescription>
                    Tout ce dont vous avez besoin pour créer et gérer votre dynastie
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-800">Garantie satisfait ou remboursé</h3>
                      <p className="text-green-700 text-sm">
                        Si vous n'êtes pas satisfait, nous vous remboursons sous 30 jours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Paiement sécurisé</CardTitle>
            <CardDescription>
                    {user ?
                      `Connecté en tant que ${user.email}` :
                      "Créez votre dynastie en quelques clics"
                    }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Prix */}
                  <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <div className="text-4xl font-bold text-gray-900 mb-2">10 €</div>
                    <div className="text-gray-600">Paiement unique</div>
                    <div className="text-sm text-gray-500 mt-2">
                      Accès à vie à votre dynastie
                    </div>
            </div>

                  {/* Utilisateur connecté */}
                  {user && (
                    <div className="space-y-4">
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          Vous êtes connecté en tant que <strong>{user.email}</strong>
                        </AlertDescription>
                      </Alert>

                      <StripePaymentButton
                        className="w-full"
                        amount={1000}
                      />
              </div>
                  )}

                  {/* Utilisateur non connecté */}
                  {!user && (
                    <div className="space-y-4">
                      <Alert>
                        <AlertDescription>
                          Vous n'êtes pas connecté. Vous pouvez soit vous connecter,
                          soit créer votre dynastie directement.
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-4">
                        <Button
                          onClick={() => navigate('/auth-family')}
                          variant="outline"
                          className="w-full"
                        >
                          Se connecter d'abord
                        </Button>

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
              </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Ou</span>
              </div>
            </div>

                        {!isTempUser ? (
                          <form onSubmit={handleTempUserSubmit} className="space-y-4">
                            <div>
                              <Label htmlFor="email">Email *</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="votre@email.com"
                                value={tempUserData.email}
                                onChange={(e) => setTempUserData(prev => ({ ...prev, email: e.target.value }))}
                                required
                              />
                            </div>

                            <div>
                              <Label htmlFor="phone">Téléphone *</Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+33 6 12 34 56 78"
                                value={tempUserData.phone}
                                onChange={(e) => setTempUserData(prev => ({ ...prev, phone: e.target.value }))}
                                required
                              />
                </div>

                            <StripePaymentButton
                              className="w-full"
                              amount={1000}
                              tempUserData={tempUserData}
                            />
                          </form>
                        ) : (
                          <div className="space-y-4">
                            <Alert>
                              <CheckCircle className="h-4 w-4" />
                              <AlertDescription>
                                Email: <strong>{tempUserData.email}</strong><br />
                                Téléphone: <strong>{tempUserData.phone}</strong>
                              </AlertDescription>
                            </Alert>

                            <StripePaymentButton
                              className="w-full"
                              amount={1000}
                              tempUserData={tempUserData}
                            />

                            <Button
                              onClick={() => setIsTempUser(false)}
                              variant="ghost"
                              className="w-full"
                            >
                              Modifier mes informations
                            </Button>
              </div>
            )}
                </div>
              </div>
            )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-gray-500 text-sm">
            <p>
              En procédant au paiement, vous acceptez nos{' '}
              <a href="/terms" className="text-blue-600 hover:underline">conditions d'utilisation</a>
              {' '}et notre{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">politique de confidentialité</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
