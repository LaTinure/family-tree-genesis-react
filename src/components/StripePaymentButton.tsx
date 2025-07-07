
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Loader2, CreditCard, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from './ui/alert';

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
  amount = 1000,
  successUrl,
  cancelUrl,
  tempUserData,
  className = '',
  children = 'Payer 10 € et créer ma dynastie',
}: StripePaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const logStep = (step: string, data?: any) => {
    console.log(`🔍 [PAYMENT-BUTTON] ${step}`, data || '');
  };

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);
    logStep("🚀 Début du processus de paiement");

    try {
      // 1. Récupération du token d'authentification
      const { data: { session } } = await supabase.auth.getSession();
      const authToken = session?.access_token;
      
      logStep("🔐 Token d'auth", authToken ? "Présent" : "Absent");

      // 2. Validation des données
      if (!authToken && !tempUserData) {
        const errorMsg = "Vous devez être connecté ou fournir vos informations";
        logStep("❌ Validation échouée", errorMsg);
        setError(errorMsg);
        toast({
          title: "Erreur d'authentification",
          description: errorMsg,
          variant: "destructive",
        });
        return;
      }

      // 3. Préparation de la requête
      const requestData = {
        customAmount: amount,
        successUrl: successUrl || `${window.location.origin}/dynasty/create`,
        cancelUrl: cancelUrl || `${window.location.origin}/dynasty/payment`,
        ...(tempUserData && { tempUserData })
      };

      logStep("📤 Données de requête", requestData);

      // 4. Appel à l'Edge Function
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
        },
        body: JSON.stringify(requestData),
      });

      logStep("📥 Réponse reçue", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      // 5. Parsing sécurisé de la réponse
      let result;
      const responseText = await response.text();
      
      if (!responseText) {
        throw new Error('Réponse vide du serveur');
      }

      try {
        result = JSON.parse(responseText);
        logStep("✅ JSON parsé", result);
      } catch (parseError) {
        logStep("❌ Erreur parsing JSON", { responseText, parseError });
        throw new Error(`Réponse invalide du serveur: ${responseText}`);
      }

      // 6. Gestion des erreurs serveur
      if (!response.ok) {
        const errorMsg = result?.error || `Erreur ${response.status}: ${response.statusText}`;
        logStep("❌ Erreur serveur", { status: response.status, error: errorMsg });
        setError(errorMsg);
        toast({
          title: "Erreur de paiement",
          description: errorMsg,
          variant: "destructive",
        });
        return;
      }

      // 7. Validation de la réponse
      if (!result?.url) {
        const errorMsg = "URL de paiement manquante dans la réponse";
        logStep("❌ URL manquante", result);
        setError(errorMsg);
        throw new Error(errorMsg);
      }

      logStep("🔗 Redirection vers Stripe", result.url);

      // 8. Redirection vers Stripe
      window.location.href = result.url;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur inconnue s'est produite";
      logStep("🔥 Erreur critique", { error: errorMessage, stack: error instanceof Error ? error.stack : undefined });
      
      setError(errorMessage);
      toast({
        title: "Erreur de paiement",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
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
    </div>
  );
}
