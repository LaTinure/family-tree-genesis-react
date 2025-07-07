import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Loader2, CreditCard } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../lib/supabaseClient';

interface StripePaymentButtonProps {
  amount?: number;
  successUrl?: string;
  cancelUrl?: string;
  tempUserData?: {
    email: string;
    phone: string;
    user_id?: string;
  };
  className?: string;
  children?: React.ReactNode;
}

export default function StripePaymentButton({
  amount = 1000, // 10€ en centimes
  successUrl,
  cancelUrl,
  tempUserData,
  className = '',
  children = 'Payer 10 € et créer ma dynastie',
}: StripePaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      // Récupérer le token d'authentification
      const { data: { session } } = await supabase.auth.getSession();
      const authToken = session?.access_token;

      if (!authToken && !tempUserData) {
        toast({
          title: "Erreur d'authentification",
          description: "Vous devez être connecté ou fournir vos informations",
          variant: "destructive",
        });
        return;
      }

      // Appeler l'Edge Function pour créer la session Stripe
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken ? `Bearer ${authToken}` : '',
        },
        body: JSON.stringify({
          customAmount: amount,
          successUrl: successUrl || `${window.location.origin}/dynasty/create`,
          cancelUrl: cancelUrl || `${window.location.origin}/dynasty/payment`,
          tempUserData,
        }),
      });

      let text;
      let result;
      try {
        text = await response.text();
        result = JSON.parse(text);
      } catch (err) {
        console.error('❌ Erreur parsing JSON :', err, 'Réponse brute :', text);
        throw new Error('Réponse invalide du serveur (pas en JSON)');
      }

      if (!response.ok) {
        console.error('🚨 Échec backend:', result?.error || response.statusText);
        throw new Error(result?.error || 'Erreur serveur');
      }

      console.log('✅ Session Stripe créée:', result.sessionId);
      console.log('🔗 URL Stripe:', result.url);

      // Ouvrir Stripe Checkout dans une nouvelle fenêtre
      if (result.url) {
        const stripeWindow = window.open(result.url, '_blank', 'width=500,height=600');

        if (!stripeWindow) {
          toast({
            title: "Erreur",
            description: "Veuillez autoriser les popups pour continuer le paiement",
            variant: "destructive",
          });
          return;
        }

        // Surveiller la fermeture de la fenêtre Stripe
        const checkClosed = setInterval(() => {
          if (stripeWindow.closed) {
            clearInterval(checkClosed);

            // Vérifier si le paiement a été complété en interrogeant le token
            if (result.createToken) {
              checkPaymentStatus(result.createToken);
            }
          }
        }, 1000);

        // Timeout de sécurité (5 minutes)
        setTimeout(() => {
          clearInterval(checkClosed);
          if (!stripeWindow.closed) {
            stripeWindow.close();
            toast({
              title: "Timeout",
              description: "La session de paiement a expiré",
              variant: "destructive",
            });
          }
        }, 5 * 60 * 1000);

      } else {
        throw new Error('URL de paiement manquante');
      }

    } catch (error) {
      console.error('Erreur paiement Stripe:', error);
      toast({
        title: "Erreur de paiement",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkPaymentStatus = async (createToken: string) => {
    try {
      // Attendre un peu pour que le webhook Stripe soit traité
      await new Promise(resolve => setTimeout(resolve, 2000));

      const { data: tokenData, error } = await supabase
        .from('dynasty_creation_tokens')
        .select('status, is_used')
        .eq('token', createToken)
        .single();

      if (error || !tokenData) {
        console.error('Erreur vérification token:', error);
        return;
      }

      if (tokenData.status === 'paid' && !tokenData.is_used) {
        toast({
          title: "Paiement confirmé !",
          description: "Redirection vers la création de votre dynastie...",
        });

        // Rediriger vers la page de création de dynastie
        setTimeout(() => {
          navigate(`/dynasty/create?create_token=${createToken}`);
        }, 1500);
      } else if (tokenData.status === 'pending') {
        toast({
          title: "Paiement en cours",
          description: "Votre paiement est en cours de traitement. Veuillez patienter...",
        });
      } else if (tokenData.is_used) {
        toast({
          title: "Token déjà utilisé",
          description: "Ce token de paiement a déjà été utilisé",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erreur vérification statut:', error);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading}
      className={`bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Préparation du paiement...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" />
          {children}
        </>
      )}
    </Button>
  );
}
