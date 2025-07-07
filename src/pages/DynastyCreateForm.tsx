import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface TokenValidation {
  isValid: boolean;
  isPaid: boolean;
  isExpired: boolean;
  isUsed: boolean;
  loading: boolean;
}

export default function DynastyCreateForm() {
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
      });
      return;
    }

    validateToken();
  }, [createToken]);

  const validateToken = async () => {
    try {
      const { data: tokenData, error } = await supabase
        .from('dynasty_creation_tokens')
        .select('*')
        .eq('token', createToken)
        .single();

      if (error || !tokenData) {
        setTokenValidation({
          isValid: false,
          isPaid: false,
          isExpired: false,
          isUsed: false,
          loading: false,
        });
        return;
      }

      const now = new Date();
      const isExpired = new Date(tokenData.expires_at) < now;

      setTokenValidation({
        isValid: true,
        isPaid: tokenData.status === 'paid',
        isExpired,
        isUsed: tokenData.is_used,
        loading: false,
      });

    } catch (error) {
      console.error('Erreur validation token:', error);
      setTokenValidation({
        isValid: false,
        isPaid: false,
        isExpired: false,
        isUsed: false,
        loading: false,
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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de la création de la dynastie');
      }

      toast({
        title: "Succès !",
        description: "Votre dynastie a été créée avec succès",
      });

      // Rediriger vers auth-family avec le token admin
      navigate(`/auth-family?token=${result.dynasty.admin_invite_token}`);

    } catch (error) {
      console.error('Erreur création dynastie:', error);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Vérification du token de paiement...</p>
        </div>
      </div>
    );
  }

  if (!createToken) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
      <div className="min-h-screen flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Token de création invalide. Veuillez vérifier votre lien.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!tokenValidation.isPaid) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
      <div className="min-h-screen flex items-center justify-center">
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
      <div className="min-h-screen flex items-center justify-center">
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
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Créer votre dynastie</CardTitle>
          <CardDescription>
            Votre paiement a été validé ! Donnez un nom à votre dynastie pour commencer.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dynastyName">Nom de la dynastie *</Label>
              <Input
                id="dynastyName"
                type="text"
                placeholder="Ex: Famille Martin"
                value={formData.dynastyName}
                onChange={(e) => setFormData(prev => ({ ...prev, dynastyName: e.target.value }))}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dynastyDescription">Description (optionnel)</Label>
              <Textarea
                id="dynastyDescription"
                placeholder="Une brève description de votre dynastie..."
                value={formData.dynastyDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, dynastyDescription: e.target.value }))}
                disabled={isSubmitting}
                rows={3}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !formData.dynastyName.trim()}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création en cours...
                </>
              ) : (
                'Créer ma dynastie'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
