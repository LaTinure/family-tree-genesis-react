import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FamilyMember, NewFamilyMember } from '@/types/family';

export const useFamilyMembers = () => {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('🔍 [fetchMembers] Début de la récupération des membres');

      const { data: profiles, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('📊 [fetchMembers] Réponse Supabase:', { profiles, fetchError });

      if (fetchError) {
        throw fetchError;
      }

      if (!profiles || profiles.length === 0) {
        console.log('⚠️ [fetchMembers] Aucun profil trouvé');
        setMembers([]);
        return;
      }

      console.log('✅ [fetchMembers] Profils trouvés:', profiles.length);

      const familyMembers: FamilyMember[] = profiles.map(profile => ({
        id: profile.id || '',
        user_id: profile.user_id || '',
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        civilite: (profile.civilite as 'M.' | 'Mme') || 'M.',
        phone: profile.phone || undefined,
        profession: profile.profession || undefined,
        current_location: profile.current_location || undefined,
        birth_place: profile.birth_place || undefined,
        birth_date: profile.birth_date || undefined,
        avatar_url: profile.avatar_url || undefined,
        photo_url: profile.photo_url || undefined,
        relationship_type: (profile.relationship_type as any) || 'fils',
        father_id: profile.father_id || undefined,
        mother_id: profile.mother_id || undefined,
        father_name: profile.father_name || undefined,
        mother_name: profile.mother_name || undefined,
        spouse_name: '', // Default value as it doesn't exist in DB
        is_admin: profile.is_admin || false,
        is_patriarch: profile.is_patriarch || false,
        is_parent: profile.is_parent || false,
        situation: profile.situation || undefined,
        role: (profile.role_radio as any) || 'user',
        created_at: profile.created_at || new Date().toISOString(),
        updated_at: profile.updated_at || new Date().toISOString()
      }));

      console.log('👥 [fetchMembers] Membres transformés:', familyMembers);

      setMembers(familyMembers);
    } catch (err) {
      console.error('❌ [fetchMembers] Erreur lors de la récupération:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setMembers([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const addMember = useCallback(async (memberData: NewFamilyMember) => {
    try {
      setError(null);

      const { data, error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            id: crypto.randomUUID(),
            user_id: crypto.randomUUID(),
            first_name: memberData.first_name,
            last_name: memberData.last_name,
            email: memberData.email,
            civilite: memberData.civilite,
            phone: memberData.phone,
            profession: memberData.profession,
            current_location: memberData.current_location,
            birth_place: memberData.birth_place,
            birth_date: memberData.birth_date,
            avatar_url: memberData.avatar_url,
            photo_url: memberData.photo_url,
            relationship_type: memberData.relationship_type,
            father_id: memberData.father_id,
            mother_id: memberData.mother_id,
            situation: memberData.situation,
            role_radio: memberData.role || 'user',
            is_admin: false,
            is_patriarch: false,
            is_parent: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select()
        .maybeSingle();

      if (insertError) {
        throw insertError;
      }

      await fetchMembers(); // Refresh the list
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error('Erreur lors de l\'ajout du membre:', err);
      throw err;
    }
  }, [fetchMembers]);

  const updateMember = useCallback(async (id: string, memberData: Partial<FamilyMember>) => {
    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('profiles')
        .update({
          first_name: memberData.first_name,
          last_name: memberData.last_name,
          email: memberData.email,
          civilite: memberData.civilite,
          phone: memberData.phone,
          profession: memberData.profession,
          current_location: memberData.current_location,
          birth_place: memberData.birth_place,
          birth_date: memberData.birth_date,
          avatar_url: memberData.avatar_url,
          photo_url: memberData.photo_url,
          relationship_type: memberData.relationship_type,
          father_id: memberData.father_id,
          mother_id: memberData.mother_id,
          situation: memberData.situation,
          role_radio: memberData.role,
          is_admin: memberData.is_admin,
          is_patriarch: memberData.is_patriarch,
          is_parent: memberData.is_parent,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .maybeSingle();

      if (updateError) {
        throw updateError;
      }

      await fetchMembers(); // Refresh the list
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error('Erreur lors de la mise à jour du membre:', err);
      throw err;
    }
  }, [fetchMembers]);

  const deleteMember = useCallback(async (id: string) => {
    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      setMembers(prev => prev.filter(member => member.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error('Erreur lors de la suppression du membre:', err);
      throw err;
    }
  }, []);

  return {
    members,
    isLoading,
    error,
    fetchMembers,
    addMember,
    updateMember,
    deleteMember
  };
};
