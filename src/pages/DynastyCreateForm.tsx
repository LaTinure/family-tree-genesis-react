
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Crown, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const dynastySchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  location: z.string().optional(),
  description: z.string().optional(),
  founding_year: z.string().optional(),
});

type DynastyFormData = z.infer<typeof dynastySchema>;

const DynastyCreateForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenChecking, setTokenChecking] = useState(true);
  const [tokenData, setTokenData] = useState<any>(null);

  const createToken = searchParams.get('create_token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DynastyFormData>({
    resolver: zodResolver(dynastySchema),
  });

  // Vérifier le token au chargement de la page
  useEffect(() => {
    const validateCreateToken = async () => {
      if (!createToken) {
        toast({
          title: 'Token manquant',
          description: 'Aucun token de création valide trouvé. Veuillez effectuer un paiement d\'abord.',
          variant: 'destructive',
        });
        navigate('/dynasty/payment');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('dynasty_creation_tokens')
          .select('*')
          .eq('token', createToken)
          .eq('status', 'paid')
          .eq('is_used', false)
          .gt('expires_at', new Date().toISOString())
          .single();

        if (error || !data) {
          console.error('Token invalide:', error);
          toast({
            title: 'Token invalide',
            description: 'Ce token de création a expiré, n\'a pas été payé ou a déjà été utilisé.',
            variant: 'destructive',
          });
          navigate('/dynasty/payment');
          return;
        }

        setTokenData(data);
        setTokenValid(true);
      } catch (error) {
        console.error('Erreur validation token:', error);
        toast({
          title: 'Erreur',
          description: 'Une erreur est survenue lors de la validation du token.',
          variant: 'destructive',
        });
        navigate('/dynasty/payment');
      } finally {
        setTokenChecking(false);
      }
    };

    validateCreateToken();
  }, [createToken, navigate, toast]);

  const onSubmit = async (data: DynastyFormData) => {
    if (!user || !tokenValid || !tokenData) return;

    setIsSubmitting(true);
    try {
      // 1. Créer la dynastie
      const { data: dynasty, error: dynastyError } = await supabase
        .from('dynasties')
        .insert({
          name: data.name,
          location: data.location,
          description: data.description,
          founding_year: data.founding_year,
          created_by: user.id,
        })
        .select()
        .single();

      if (dynastyError || !dynasty) {
        throw new Error('Erreur lors de la création de la dynastie');
      }

      // 2. Marquer le token comme utilisé
      const { error: tokenError } = await supabase
        .from('dynasty_creation_tokens')
        .update({
          is_used: true,
          used_at: new Date().toISOString(),
        })
        .eq('token', createToken);

      if (tokenError) {
        console.error('Erreur mise à jour token:', tokenError);
      }

      // 3. Créer une invitation pour le fondateur (Patriarche/Administrateur)
      const inviteToken = crypto.randomUUID();
      const { error: inviteError } = await supabase
        .from('invites')
        .insert({
          dynasty_id: dynasty.id,
          token: inviteToken,
          user_role: 'Patriarche',
          affiliation: 'Fondateur',
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h
          invited_by: null, // System
        });

      if (inviteError) {
        console.error('Erreur création invitation:', inviteError);
        throw new Error('Erreur lors de la création de l\'invitation');
      }

      toast({
        title: 'Dynastie créée avec succès !',
        description: 'Redirection vers la création de votre profil d\'administrateur...',
      });

      // 4. Rediriger vers l'inscription avec le token d'invitation
      setTimeout(() => {
        navigate(`/auth-family?mode=register&token=${inviteToken}`);
      }, 1500);

    } catch (error: any) {
      console.error('Erreur création dynastie:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue lors de la création de la dynastie.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (tokenChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 via-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-whatsapp-600" />
          <p className="text-gray-600">Vérification de votre paiement...</p>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return null; // La redirection est déjà gérée dans useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 via-green-50 to-emerald-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Crown className="w-16 h-16 text-whatsapp-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-whatsapp-700 mb-2">Créer votre Dynastie</h1>
          <p className="text-gray-600">
            Félicitations ! Votre paiement a été confirmé. Créez maintenant votre dynastie.
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-xl text-gray-900">
              Informations de votre dynastie
            </CardTitle>
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-800">
                Paiement confirmé ! Vous êtes autorisé à créer votre dynastie.
              </AlertDescription>
            </Alert>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de la dynastie *</Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="ex: Famille Martin, Les Dubois, etc."
                  className="text-lg font-medium"
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Localisation d'origine</Label>
                <Input
                  id="location"
                  {...register('location')}
                  placeholder="ex: Paris, Lyon, Région Provence, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="founding_year">Année de fondation (optionnel)</Label>
                <Input
                  id="founding_year"
                  {...register('founding_year')}
                  placeholder="ex: 1950, 1875, etc."
                  type="number"
                  min="1800"
                  max={new Date().getFullYear()}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description de la dynastie</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Racontez l'histoire de votre famille, ses origines, ses valeurs..."
                  rows={4}
                />
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-blue-800 text-sm">
                  Une fois votre dynastie créée, vous deviendrez automatiquement le Patriarche 
                  et pourrez inviter d'autres membres de votre famille.
                </AlertDescription>
              </Alert>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 hover:from-whatsapp-600 hover:to-whatsapp-700 text-white py-3 text-lg font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Création de votre dynastie...
                  </>
                ) : (
                  <>
                    <Crown className="w-5 h-5 mr-2" />
                    Créer ma Dynastie
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/dynasty')}
            className="text-whatsapp-600 hover:text-whatsapp-700"
            disabled={isSubmitting}
          >
            ← Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DynastyCreateForm;
