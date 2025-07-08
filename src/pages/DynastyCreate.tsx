import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Loader2, CheckCircle, AlertCircle, Crown } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface TokenValidation {
  isValid: boolean;
  isPaid: boolean;
  isExpired: boolean;
  isUsed: boolean;
  loading: boolean;
  error?: string;
}

export default function DynastyCreate() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [tokenValidation, setTokenValidation] = useState<TokenValidation>({
    isValid: false,
    isPaid: false,
    isExpired: false,
    isUsed: false,
    loading: true,
  });

  const [formData, setFormData] = useState({
    dynastyName: '',
    dynastyDescription: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const createToken = searchParams.get('create_token');

  useEffect(() => {
    if (!createToken) {
      setTokenValidation({
        isValid: false,
        isPaid: false,
        isExpired: false,
        isUsed: false,
        loading: false,
        error: 'Token de création manquant',
      });
      return;
    }

    validateToken();
  }, [createToken]);

  const validateToken = async () => {
    try {
      console.log('🔍 Validation du token:', createToken);

      const { data: tokenData, error } = await supabase
        .from('dynasty_creation_tokens')
        .select('*')
        .eq('token', createToken)
        .single();

      if (error || !tokenData) {
        console.error('❌ Token invalide:', error);
        setTokenValidation({
          isValid: false,
          isPaid: false,
          isExpired: false,
          isUsed: false,
          loading: false,
          error: 'Token de création invalide',
        });
        return;
      }

      const now = new Date();
      const isExpired = new Date(tokenData.expires_at) < now;

      console.log('✅ Token validé:', {
        status: tokenData.status,
        isExpired,
        isUsed: tokenData.is_used,
      });

      setTokenValidation({
        isValid: true,
        isPaid: tokenData.status === 'paid',
        isExpired,
        isUsed: tokenData.is_used,
        loading: false,
      });

    } catch (error) {
      console.error('🔥 Erreur validation token:', error);
      setTokenValidation({
        isValid: false,
        isPaid: false,
        isExpired: false,
        isUsed: false,
        loading: false,
        error: 'Erreur lors de la validation du token',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!createToken || !formData.dynastyName.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('🚀 Création de la dynastie:', formData.dynastyName);

      const response = await fetch('/api/create-dynasty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({
          createToken,
          dynastyName: formData.dynastyName.trim(),
          dynastyDescription: formData.dynastyDescription.trim(),
        }),
      });

      let result;
      try {
        result = await response.json();
      } catch (err) {
        const text = await response.text();
        console.error('❌ Erreur parsing JSON:', err, 'Réponse brute:', text);
        throw new Error('Réponse invalide du serveur');
      }

      if (!response.ok) {
        console.error('🚨 Échec backend:', result?.error || response.statusText);
        throw new Error(result?.error || 'Erreur lors de la création de la dynastie');
      }

      console.log('✅ Dynastie créée:', result.dynasty);

      toast({
        title: "Succès !",
        description: "Votre dynastie a été créée avec succès",
      });

      // Rediriger vers auth-family avec le token admin
      setTimeout(() => {
        navigate(`/auth-family?token=${result.dynasty.admin_invite_token}`);
      }, 1500);

    } catch (error) {
      console.error('🔥 Erreur création dynastie:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur lors de la création de la dynastie",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (tokenValidation.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Vérification du token de paiement...</p>
        </div>
      </div>
    );
  }

  if (!createToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Token de création manquant. Veuillez revenir à la page de paiement.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!tokenValidation.isValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {tokenValidation.error || 'Token de création invalide. Veuillez vérifier votre lien.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!tokenValidation.isPaid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Le paiement n'a pas encore été validé. Veuillez patienter quelques instants.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (tokenValidation.isExpired) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Le token de création a expiré. Veuillez effectuer un nouveau paiement.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (tokenValidation.isUsed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Ce token a déjà été utilisé pour créer une dynastie.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-blue-500">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Créer votre dynastie
          </CardTitle>
          <CardDescription className="text-gray-600">
            Votre paiement a été validé ! Donnez un nom à votre dynastie pour commencer.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="dynastyName" className="text-sm font-medium text-gray-700">
                Nom de la dynastie *
              </Label>
              <Input
                id="dynastyName"
                type="text"
                placeholder="Ex: Famille Martin, Les Dubois..."
                value={formData.dynastyName}
                onChange={(e) => setFormData(prev => ({ ...prev, dynastyName: e.target.value }))}
                required
                disabled={isSubmitting}
                className="text-lg font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dynastyDescription" className="text-sm font-medium text-gray-700">
                Description (optionnel)
              </Label>
              <Textarea
                id="dynastyDescription"
                placeholder="Une brève description de votre dynastie, ses origines, ses valeurs..."
                value={formData.dynastyDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, dynastyDescription: e.target.value }))}
                disabled={isSubmitting}
                rows={4}
                className="resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 text-lg"
              disabled={isSubmitting || !formData.dynastyName.trim()}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Création en cours...
                </>
              ) : (
                <>
                  <Crown className="mr-2 h-5 w-5" />
                  Créer ma dynastie
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
