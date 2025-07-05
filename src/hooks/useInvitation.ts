
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { InvitationData } from '@/types/family';

interface UseInvitationReturn {
  invitationData: InvitationData | null;
  isLoading: boolean;
  error: string | null;
  isInvitationValid: boolean;
  isExpired: boolean;
  isUsed: boolean;
  validateToken: (token: string) => Promise<void>;
}

export const useInvitation = (): UseInvitationReturn => {
  const [searchParams] = useSearchParams();
  const [inviteToken, setInviteToken] = useState<string | null>(null);

  // Récupérer le token depuis l'URL
  useEffect(() => {
    const token = searchParams.get('token') || searchParams.get('invite');
    if (token) {
      setInviteToken(token);
    }
  }, [searchParams]);

  // Vérifier le token d'invitation
  const { data: invitationData, isLoading, error, refetch } = useQuery({
    queryKey: ['invitation', inviteToken],
    queryFn: async (): Promise<InvitationData> => {
      if (!inviteToken) throw new Error('Token manquant');

      const { data, error } = await supabase
        .from('invites')
        .select(`
          id,
          token,
          dynasty_id,
          user_role,
          affiliation,
          expires_at,
          used,
          invited_by
        `)
        .eq('token', inviteToken)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Invitation invalide');

      // Récupérer le nom de la dynastie
      const { data: dynastyData } = await supabase
        .from('dynasties')
        .select('name')
        .eq('id', data.dynasty_id)
        .single();

      // Récupérer le nom de la personne qui a invité (si applicable)
      let invited_by_name = undefined;
      if (data.invited_by) {
        const { data: inviterData } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('user_id', data.invited_by)
          .single();
        
        if (inviterData) {
          invited_by_name = `${inviterData.first_name} ${inviterData.last_name}`;
        }
      }

      return {
        id: data.id,
        token: data.token,
        dynasty_id: data.dynasty_id,
        dynasty_name: dynastyData?.name || 'Dynastie',
        user_role: data.user_role,
        affiliation: data.affiliation,
        invited_by_name,
        expires_at: data.expires_at,
        used: data.used || false
      } as InvitationData;
    },
    enabled: !!inviteToken,
    retry: false
  });

  // Fonction pour valider un token manuellement
  const validateToken = async (token: string) => {
    setInviteToken(token);
  };

  // Vérifications
  const isExpired = invitationData ? new Date(invitationData.expires_at) < new Date() : false;
  const isUsed = invitationData?.used || false;
  const isInvitationValid = !!invitationData && !isExpired && !isUsed;

  return {
    invitationData: invitationData || null,
    isLoading,
    error: error ? (error as Error).message : null,
    isInvitationValid,
    isExpired,
    isUsed,
    validateToken
  };
};
