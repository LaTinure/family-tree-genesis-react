
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { loadStripe } from '@stripe/stripe-js';
import { useToast } from '@/hooks/use-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

const schema = yup.object().shape({
  email: yup.string().email('Email invalide').required('Email requis'),
  card: yup.string().required('Carte test requise (utilisez 4242 4242 4242 4242)'),
});

interface DynastyPaymentFormProps {
  onSuccess: () => void;
}

export default function DynastyPaymentForm({ onSuccess }: DynastyPaymentFormProps) {
  const { user, profile, session } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: profile?.email || user?.email || '',
      card: '',
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    setError(null);
    try {
      // Authentifier l'utilisateur et récupérer le JWT
      const jwt = session?.access_token;
      if (!jwt) {
        setError('Vous devez être connecté pour effectuer ce paiement.');
        setLoading(false);
        return;
      }
      
      const stripe = await stripePromise;
      
      // Appel à la function Supabase pour créer la session Stripe
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          successUrl: `${window.location.origin}/dynasty/create?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/dynasty/payment?cancel=1`,
          customAmount: 500,
          email: values.email,
          user_id: user?.id,
        }),
      });
      
      if (!response.ok) throw new Error('Erreur lors de la création de la session Stripe');
      
      const { sessionId } = await response.json();
      
      if (stripe) await stripe.redirectToCheckout({ sessionId });
      
      onSuccess();
    } catch (e: any) {
      setError(e.message || 'Erreur inconnue');
      toast({ title: 'Erreur de paiement', description: e.message || 'Erreur inconnue', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Card className="shadow-none border-0 bg-transparent">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Informations de paiement</CardTitle>
          <CardDescription>Remplissez ce formulaire pour accéder au paiement sécurisé Stripe.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input type="email" {...form.register('email')} disabled={!!profile?.email} />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message as string}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Carte test</label>
            <Input type="text" placeholder="4242 4242 4242 4242" {...form.register('card')} />
            <p className="text-xs text-gray-500 mt-1">Utilisez la carte test Stripe : 4242 4242 4242 4242</p>
            {form.formState.errors.card && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.card.message as string}</p>
            )}
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Traitement...' : 'Accéder au paiement sécurisé'}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
