
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, CreditCard, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const stripe = await stripePromise;

      // Appel à l'API Supabase Edge Function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          successUrl: `${window.location.origin}/dynasty/create?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/dynasty`,
          customAmount: 500 // 5€
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la session');
      }

      const { sessionId } = await response.json();

      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Création instantanée",
      description: "Votre dynastie sera créée immédiatement après le paiement"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Paiement sécurisé",
      description: "Protection SSL et conformité PCI DSS"
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: "Garantie satisfait",
      description: "Remboursement sous 30 jours si insatisfait"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
            >
              <CreditCard className="h-8 w-8 text-white" />
            </motion.div>

            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Créer votre Dynastie
            </CardTitle>

            <CardDescription className="text-gray-600 mt-2">
              Accédez à toutes les fonctionnalités premium pour votre arbre généalogique
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Prix */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl font-bold text-gray-900">5€</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Prix unique
                </Badge>
              </div>
              <p className="text-sm text-gray-500">Paiement unique, accès permanent</p>
            </motion.div>

            {/* Fonctionnalités */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50/50"
                >
                  <div className="text-blue-600 mt-0.5">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bouton de paiement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Traitement...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payer 5€ - Créer ma Dynastie
                  </div>
                )}
              </Button>
            </motion.div>

            {/* Sécurité */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                <Shield className="h-3 w-3" />
                Paiement sécurisé par Stripe
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
