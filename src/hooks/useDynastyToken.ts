
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface DynastyToken {
  id: string;
  token: string;
  user_id: string | null;
  stripe_session_id: string | null;
  status: string | null;
  is_used: boolean | null;
  expires_at: string | null;
  created_at: string | null;
  used_at: string | null;
  amount: number | null;
}

export function useDynastyToken() {
  const { user } = useAuth();
  const [tokens, setTokens] = useState<DynastyToken[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Récupérer les tokens de l'utilisateur
  const fetchTokens = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('dynasty_creation_tokens')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTokens(data || []);
    } catch (err) {
      console.error('Erreur lors de la récupération des tokens:', err);
      setError('Erreur lors de la récupération des tokens');
    } finally {
      setLoading(false);
    }
  };

  // Vérifier si un token est valide
  const validateToken = async (token: string): Promise<DynastyToken | null> => {
    try {
      const { data, error } = await supabase
        .from('dynasty_creation_tokens')
        .select('*')
        .eq('token', token)
        .eq('is_used', false)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !data) return null;
      return data;
    } catch (err) {
      console.error('Erreur lors de la validation du token:', err);
      return null;
    }
  };

  // Marquer un token comme utilisé
  const useToken = async (token: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('dynasty_creation_tokens')
        .update({
          is_used: true,
          used_at: new Date().toISOString()
        })
        .eq('token', token)
        .eq('is_used', false);

      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Erreur lors de l\'utilisation du token:', err);
      return false;
    }
  };

  // Créer un token de test (pour le développement)
  const createTestToken = async (): Promise<string | null> => {
    if (!user) return null;

    try {
      const token = crypto.randomUUID();
      const { error } = await supabase
        .from('dynasty_creation_tokens')
        .insert({
          token,
          user_id: user.id,
          stripe_session_id: 'test_session',
          is_used: false,
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        });

      if (error) throw error;
      return token;
    } catch (err) {
      console.error('Erreur lors de la création du token de test:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchTokens();
  }, [user]);

  return {
    tokens,
    loading,
    error,
    fetchTokens,
    validateToken,
    useToken,
    createTestToken
  };
}
