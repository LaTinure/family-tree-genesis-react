import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, CheckCircle, AlertCircle, ArrowRight, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function DynastyPaymentSuccess() {
  const [params] = useSearchParams();
  const session_id = params.get('session_id');
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'fallback'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [retryCount, setRetryCount] = useState(0);
  const [dynastyToken, setDynastyToken] = useState<string>('');
  const { toast } = useToast();

  // Vérifier le statut du paiement et créer le token de dynastie
  const verifyPaymentAndCreateToken = async () => {
    if (!session_id) {
      setStatus('error');
      setErrorMessage('Session ID manquant');
      return;
    }

    try {
      // 1. Vérifier le statut du paiement via l'Edge Function
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('stripe-webhook', {
        body: { session_id, action: 'verify_payment' }
      });

      if (paymentError) {
        console.error('Erreur vérification paiement:', paymentError);
        throw new Error('Impossible de vérifier le paiement');
      }

      if (!paymentData?.success) {
        throw new Error(paymentData?.message || 'Paiement non confirmé');
      }

      // 2. Créer le token de dynastie
      const { data: tokenData, error: tokenError } = await supabase.functions.invoke('create-dynasty-token', {
        body: {
          session_id,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }
      });

      if (tokenError) {
        console.error('Erreur création token:', tokenError);
        throw new Error('Impossible de créer le token de dynastie');
      }

      if (!tokenData?.token) {
        throw new Error('Token de dynastie non généré');
      }

      setDynastyToken(tokenData.token);
      setStatus('success');

      toast({
        title: 'Paiement confirmé',
        description: 'Votre dynastie a été créée avec succès !',
      });

    } catch (error) {
      console.error('Erreur:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Erreur inconnue');
      setStatus('error');
    }
  };

  // Retry automatique en cas d'échec
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setStatus('loading');
    setErrorMessage('');
    setTimeout(verifyPaymentAndCreateToken, 1000);
  };

  useEffect(() => {
    verifyPaymentAndCreateToken();
  }, [session_id]);

  // État de chargement
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-600" />
            <h2 className="text-xl font-semibold mb-2">Vérification du paiement</h2>
            <p className="text-gray-600">
              Nous vérifions votre paiement et créons votre dynastie...
            </p>
            {retryCount > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                Tentative {retryCount + 1}...
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // État de succès
  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Dynastie créée avec succès !
            </CardTitle>
            <CardDescription className="text-lg">
              Votre paiement a été confirmé et votre dynastie est maintenant active.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Informations sur la dynastie */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Crown className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-blue-900">Votre statut</h3>
              </div>
              <p className="text-blue-800">
                Vous êtes maintenant le <strong>Patriarche</strong> de votre dynastie.
                Vous pouvez inviter des membres et gérer votre arbre familial.
              </p>
            </div>

            {/* Token de dynastie */}
            {dynastyToken && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Token de dynastie</h3>
                <div className="bg-white border rounded p-3 font-mono text-sm break-all">
                  {dynastyToken}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Ce token vous permet d'accéder à votre dynastie. Gardez-le en sécurité.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Accéder à mon dashboard
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate('/dynasty/invite')}
                className="w-full"
              >
                Inviter des membres
              </Button>
            </div>

            {/* Informations supplémentaires */}
            <div className="text-sm text-gray-600 space-y-2">
              <p>• Vous recevrez un email de confirmation</p>
              <p>• Votre dynastie est maintenant sécurisée et isolée</p>
              <p>• Vous pouvez commencer à inviter des membres de votre famille</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // État d'erreur
  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">
              Erreur lors de la création
            </CardTitle>
            <CardDescription className="text-red-600">
              {errorMessage}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Que faire ?</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Vérifiez que votre paiement a bien été effectué</li>
                <li>• Attendez quelques minutes et réessayez</li>
                <li>• Contactez le support si le problème persiste</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleRetry}
                disabled={retryCount >= 3}
                className="w-full"
              >
                Réessayer
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate('/dynasty')}
                className="w-full"
              >
                Retour à la sélection
              </Button>
            </div>

            {retryCount >= 3 && (
              <p className="text-sm text-gray-600 text-center">
                Nombre maximum de tentatives atteint.
                Contactez le support pour obtenir de l'aide.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // État de fallback
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold mb-2">Session invalide</h2>
          <p className="text-gray-600 mb-4">
            Cette page de succès n'est accessible qu'après un paiement valide.
          </p>
          <Button onClick={() => navigate('/dynasty')}>
            Retour à la sélection de dynastie
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
