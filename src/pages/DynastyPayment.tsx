
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreditCard, Gift, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const DynastyPayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState('');
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const validatePromoCode = async () => {
    if (!promoCode.trim()) {
      toast({
        title: 'Code promo manquant',
        description: 'Veuillez entrer un code promo valide.',
        variant: 'destructive',
      });
      return;
    }

    setIsValidatingPromo(true);
    try {
      const { data, error } = await supabase
        .from('dynasty_creation_tokens')
        .select('*')
        .eq('code_promo', promoCode.trim())
        .eq('is_used', false)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !data) {
        toast({
          title: 'Code promo invalide',
          description: 'Ce code promo n\'existe pas, a expiré ou a déjà été utilisé.',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Code promo valide !',
        description: 'Redirection vers la création de votre dynastie...',
      });

      setTimeout(() => {
        navigate(`/dynasty/create?create_token=${data.token}`);
      }, 1500);

    } catch (error) {
      console.error('Erreur validation code promo:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la vérification du code promo.',
        variant: 'destructive',
      });
    } finally {
      setIsValidatingPromo(false);
    }
  };

  const handleStripePayment = async () => {
    setIsPaymentLoading(true);
    try {
      // Simuler le paiement Stripe (à implémenter selon vos besoins)
      // Pour l'instant, on génère un token directement
      const token = crypto.randomUUID();
      
      const { error } = await supabase
        .from('dynasty_creation_tokens')
        .insert({
          token,
          stripe_session_id: 'session_' + token,
          is_used: false,
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h
        });

      if (error) {
        throw error;
      }

      toast({
        title: 'Paiement réussi !',
        description: 'Redirection vers la création de votre dynastie...',
      });

      setTimeout(() => {
        navigate(`/dynasty/create?create_token=${token}`);
      }, 1500);

    } catch (error) {
      console.error('Erreur paiement:', error);
      toast({
        title: 'Erreur de paiement',
        description: 'Une erreur est survenue lors du traitement du paiement.',
        variant: 'destructive',
      });
    } finally {
      setIsPaymentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 via-green-50 to-emerald-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-whatsapp-700 mb-2">Créer une Dynastie</h1>
          <p className="text-gray-600">
            Choisissez votre méthode pour débuter votre arbre généalogique familial
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-gray-900">Options de création</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Option Paiement Stripe */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-whatsapp-600" />
                <h3 className="font-semibold text-gray-900">Paiement sécurisé</h3>
              </div>
              <p className="text-sm text-gray-600">
                Créez votre dynastie pour 29.99€ et bénéficiez de toutes les fonctionnalités premium.
              </p>
              <Button
                onClick={handleStripePayment}
                disabled={isPaymentLoading}
                className="w-full bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 hover:from-whatsapp-600 hover:to-whatsapp-700"
              >
                {isPaymentLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Traitement...
                  </>
                ) : (
                  'Payer et Créer ma Dynastie'
                )}
              </Button>
            </div>

            <Separator />

            {/* Option Code Promo */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Gift className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">Code promo</h3>
              </div>
              <p className="text-sm text-gray-600">
                Vous avez un code promo ? Entrez-le ci-dessous pour créer votre dynastie gratuitement.
              </p>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="promo-code">Code promo</Label>
                  <Input
                    id="promo-code"
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Entrez votre code promo"
                    className="font-mono"
                    disabled={isValidatingPromo}
                  />
                </div>
                <Button
                  onClick={validatePromoCode}
                  disabled={!promoCode.trim() || isValidatingPromo}
                  variant="outline"
                  className="w-full border-green-500 text-green-600 hover:bg-green-50"
                >
                  {isValidatingPromo ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Vérification...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Valider le code promo
                    </>
                  )}
                </Button>
              </div>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-blue-800 text-sm">
                Une fois votre paiement effectué ou votre code promo validé, vous pourrez créer votre dynastie 
                et devenir automatiquement le premier administrateur.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/dynasty')}
            className="text-whatsapp-600 hover:text-whatsapp-700"
          >
            ← Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DynastyPayment;
