
import Stripe from 'stripe';

// Configuration Stripe
export const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

// Types pour les sessions de paiement
export interface CreateCheckoutSessionParams {
  successUrl: string;
  cancelUrl: string;
  priceId?: string;
  customAmount?: number; // en centimes
}

// Fonction pour créer une session de checkout
export async function createCheckoutSession({
  successUrl,
  cancelUrl,
  priceId,
  customAmount = 500 // 5€ par défaut
}: CreateCheckoutSessionParams) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Création de Dynastie',
            description: 'Accès premium pour créer et gérer votre arbre généalogique familial',
            images: ['https://your-domain.com/dynasty-icon.png'], // Optionnel
          },
          unit_amount: customAmount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      product_type: 'dynasty_creation',
      user_id: 'current_user_id', // À remplacer par l'ID utilisateur réel
    },
  });

  return session;
}

// Fonction pour récupérer une session
export async function retrieveSession(sessionId: string) {
  return await stripe.checkout.sessions.retrieve(sessionId);
}

// Fonction pour lister les paiements
export async function listPayments(limit = 10) {
  return await stripe.paymentIntents.list({
    limit,
  });
}
