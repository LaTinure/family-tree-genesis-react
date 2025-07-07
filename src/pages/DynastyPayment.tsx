
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, CreditCard, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export default function DynastyPayment() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: 'Connexion requise',
        description: 'Vous devez être connecté pour créer une dynastie.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          successUrl: `${window.location.origin}/dynasty/checkout/success`,
          cancelUrl: `${window.location.origin}/dynasty`,
          customAmount: 1000, // 10€ en centimes
          user_id: user.id
        }
      });

      if (error) {
        throw error;
      }

      if (data?.sessionId) {
        // Rediriger vers Stripe Checkout
        window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
      }
    } catch (error: any) {
      console.error('Erreur paiement:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue lors du paiement.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 via-green-50 to-emerald-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Crown className="w-16 h-16 text-whatsapp-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-whatsapp-700 mb-2">Créer votre Dynastie</h1>
          <p className="text-gray-600">
            Devenez le fondateur de votre propre arbre généalogique familial.
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-gray-900">
              Abonnement Premium Dynastie
            </CardTitle>
            <CardDescription>
              Accès complet pour créer et gérer votre arbre généalogique
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Prix */}
            <div className="text-center">
              <div className="text-4xl font-bold text-whatsapp-600">10€</div>
              <div className="text-sm text-gray-600">Paiement unique</div>
            </div>

            {/* Fonctionnalités */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Crown className="w-5 h-5 text-whatsapp-600" />
                <span className="text-gray-700">Devenez Patriarche de votre dynastie</span>
              </div>
              <div className="flex items-center space-x-3">
                <Crown className="w-5 h-5 text-whatsapp-600" />
                <span className="text-gray-700">Invitez un nombre illimité de membres</span>
              </div>
              <div className="flex items-center space-x-3">
                <Crown className="w-5 h-5 text-whatsapp-600" />
                <span className="text-gray-700">Arbre généalogique privé et sécurisé</span>
              </div>
            </div>

            {/* Bouton de paiement */}
            <Button
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 hover:from-whatsapp-600 hover:to-whatsapp-700 text-white py-3 text-lg font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Redirection vers le paiement...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payer 10€ et créer ma dynastie
                </>
              )}
            </Button>

            {/* Note sécurité */}
            <div className="text-xs text-gray-500 text-center">
              Paiement sécurisé via Stripe. Aucune donnée bancaire n'est stockée sur nos serveurs.
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/dynasty')}
            className="text-whatsapp-600 hover:text-whatsapp-700"
            disabled={isLoading}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la sélection
          </Button>
        </div>
      </div>
    </div>
  );
}
