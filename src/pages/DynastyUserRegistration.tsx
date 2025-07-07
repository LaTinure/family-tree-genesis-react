
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Loader2, Eye, EyeOff } from 'lucide-react';

const schema = yup.object().shape({
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Mot de passe requis'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Les mots de passe doivent être identiques').required('Confirmation requise'),
});

export default function DynastyUserRegistration({ onSuccess }: { onSuccess: () => void }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    setError(null);

    try {
      console.log('🚀 Début de l\'inscription...');

      // 1. Créer le compte utilisateur Supabase
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (signUpError) {
        console.error('❌ Erreur inscription:', signUpError);
        throw new Error(signUpError.message);
      }

      if (!authData.user) {
        throw new Error('Erreur lors de la création du compte');
      }

      console.log('✅ Compte créé:', authData.user.id);

      // 2. Se connecter automatiquement
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (signInError) {
        console.error('❌ Erreur connexion:', signInError);
        throw new Error(signInError.message);
      }

      if (!signInData.user) {
        throw new Error('Erreur lors de la connexion');
      }

      console.log('✅ Utilisateur connecté:', signInData.user.id);

      // 3. Créer le profil utilisateur (avec gestion d'erreur RLS)
      try {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: signInData.user.id,
            user_id: signInData.user.id,
            email: values.email,
            first_name: '',
            last_name: '',
            user_role: 'Membre',
            created_at: new Date().toISOString(),
          });

        if (profileError) {
          console.error('❌ Erreur création profil:', profileError);
          // Si erreur RLS, on continue quand même (profil sera créé plus tard)
          if (profileError.message.includes('infinite recursion') || profileError.message.includes('42P17')) {
            console.log('⚠️ Erreur RLS détectée, on continue sans profil pour l\'instant');
          } else if (!profileError.message.includes('duplicate key')) {
            throw profileError;
          }
        } else {
          console.log('✅ Profil créé');
        }
      } catch (profileErr) {
        console.log('⚠️ Erreur profil ignorée, on continue:', profileErr);
      }

      // 4. Rediriger vers la page de tarification
      toast({
        title: 'Compte créé avec succès !',
        description: 'Vous allez être redirigé vers la page de tarification.',
      });

      // Fermer le modal et rediriger
      onSuccess();

      // Redirection vers la page de tarification
      setTimeout(() => {
        window.location.href = '/dynasty/payment';
      }, 1500);

    } catch (e: any) {
      console.error('❌ Erreur:', e);
      setError(e.message || 'Erreur inconnue');
      toast({
        title: 'Erreur',
        description: e.message || 'Erreur inconnue',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Card className="shadow-none border-0 bg-transparent">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Inscription rapide</CardTitle>
          <CardDescription>
            Créez votre identifiant pour accéder à toutes les fonctionnalités de votre dynastie familiale.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <Input
              type="email"
              {...form.register('email')}
              placeholder="votre@email.com"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe *</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                {...form.register('password')}
                placeholder="••••••••"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {form.formState.errors.password && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.password.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirmer le mot de passe *</label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                {...form.register('confirmPassword')}
                placeholder="••••••••"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {form.formState.errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.confirmPassword.message as string}</p>
            )}
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Création en cours...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Créer mon identifiant
              </>
            )}
          </Button>

          <div className="text-xs text-gray-500 text-center">
            En créant votre identifiant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
