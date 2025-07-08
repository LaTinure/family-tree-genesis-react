
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Crown, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import StripePaymentButton from '@/components/StripePaymentButton';

const schema = yup.object().shape({
  name: yup.string().required('Nom de la dynastie requis'),
  description: yup.string(),
  location: yup.string(),
  founding_year: yup.string(),
});

export default function DynastyCreate() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tokenStatus, setTokenStatus] = useState<'checking' | 'valid' | 'invalid' | 'none'>('none');
  const [showPayment, setShowPayment] = useState(true);

  const createToken = searchParams.get('create_token');

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      location: '',
      founding_year: '',
    },
  });

  useEffect(() => {
    if (createToken) {
      verifyToken();
    }
  }, [createToken]);

  const verifyToken = async () => {
    setTokenStatus('checking');
    try {
      const { data, error } = await supabase
        .from('dynasty_creation_tokens')
        .select('*')
        .eq('token', createToken)
        .single();

      if (error || !data) {
        setTokenStatus('invalid');
        toast({
          title: 'Token invalide',
          description: 'Le token de création est invalide ou expiré.',
          variant: 'destructive',
        });
        return;
      }

      if (data.status !== 'paid') {
        setTokenStatus('invalid');
        toast({
          title: 'Paiement non validé',
          description: 'Le paiement n\'a pas encore été validé.',
          variant: 'destructive',
        });
        return;
      }

      if (data.is_used) {
        setTokenStatus('invalid');
        toast({
          title: 'Token déjà utilisé',
          description: 'Ce token a déjà été utilisé pour créer une dynastie.',
          variant: 'destructive',
        });
        return;
      }

      setTokenStatus('valid');
      setShowPayment(false);
    } catch (error) {
      console.error('Erreur verification token:', error);
      setTokenStatus('invalid');
    }
  };

  const onSubmit = async (values: any) => {
    if (!createToken || tokenStatus !== 'valid') {
      toast({
        title: 'Erreur',
        description: 'Token invalide pour créer la dynastie.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-dynasty', {
        body: {
          createToken,
          dynastyData: values,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        toast({
          title: 'Dynastie créée avec succès !',
          description: 'Vous allez être redirigé pour vous inscrire comme administrateur.',
        });

        // Redirection vers l'inscription avec le token admin
        setTimeout(() => {
          navigate(`/auth-family?token=${data.adminToken}`);
        }, 2000);
      } else {
        throw new Error(data?.message || 'Erreur lors de la création');
      }
    } catch (error: any) {
      console.error('Erreur création dynastie:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Erreur lors de la création de la dynastie',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (showPayment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Créer ma Dynastie
            </CardTitle>
            <CardDescription className="text-gray-600">
              Commencez votre aventure familiale pour seulement 10€
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-green-800">Création de Dynasty</span>
                <span className="text-lg font-bold text-green-600">10€</span>
              </div>
              
              <div className="text-xs text-gray-500 space-y-2">
                <p>✓ Espace famille privé et sécurisé</p>
                <p>✓ Arbre généalogique interactif</p>
                <p>✓ Invitations illimitées pour les membres</p>
                <p>✓ Stockage de photos et souvenirs</p>
              </div>
            </div>

            <StripePaymentButton
              amount={1000}
              successUrl={`${window.location.origin}/dynasty/create`}
              cancelUrl={`${window.location.origin}/`}
              className="w-full"
            >
              Payer 10€ et créer ma dynastie
            </StripePaymentButton>

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-gray-500 hover:text-gray-700"
              >
                Retour à l'accueil
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
            {tokenStatus === 'valid' ? (
              <CheckCircle className="h-8 w-8 text-white" />
            ) : tokenStatus === 'invalid' ? (
              <AlertCircle className="h-8 w-8 text-white" />
            ) : (
              <Crown className="h-8 w-8 text-white" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Créer votre Dynastie
          </CardTitle>
          <CardDescription className="text-gray-600">
            {tokenStatus === 'checking' && 'Vérification du paiement...'}
            {tokenStatus === 'valid' && 'Paiement validé ! Créez votre dynastie.'}
            {tokenStatus === 'invalid' && 'Paiement requis pour continuer.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {tokenStatus === 'checking' && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          )}

          {tokenStatus === 'invalid' && (
            <div className="text-center space-y-4">
              <p className="text-red-600">Vous devez effectuer le paiement pour créer votre dynastie.</p>
              <Button onClick={() => navigate('/')} className="w-full">
                Retour à l'accueil
              </Button>
            </div>
          )}

          {tokenStatus === 'valid' && (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom de la dynastie *</label>
                <Input
                  {...form.register('name')}
                  placeholder="Ex: Famille Dupont"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Input
                  {...form.register('description')}
                  placeholder="Description de votre famille"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Lieu d'origine</label>
                <Input
                  {...form.register('location')}
                  placeholder="Ex: Paris, France"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Année de fondation</label>
                <Input
                  {...form.register('founding_year')}
                  placeholder="Ex: 1950"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Création en cours...
                  </>
                ) : (
                  <>
                    <Crown className="w-4 h-4 mr-2" />
                    Créer ma dynastie
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
