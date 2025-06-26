
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { ProfileData } from '@/types/profile';
import { FamilyMember, NewFamilyMember } from '@/types/family';
import { api } from '@/services/api';

export const useFamilyMembers = () => {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('Fetching family members...');
      const profiles = await api.profiles.getAll();

      if (!profiles || profiles.length === 0) {
        console.log('No profiles found');
        setMembers([]);
        return;
      }

      const familyMembers: FamilyMember[] = profiles.map(profile => ({
        id: profile.id || '',
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        title: (profile.title as FamilyMember['title']) || 'Fils',
        birth_date: profile.birth_date || undefined,
        birth_place: profile.birth_place || undefined,
        current_location: profile.current_location || undefined,
        situation: profile.situation || undefined,
        avatar_url: profile.avatar_url || undefined,
        phone: profile.phone || undefined,
        profession: profile.profession || undefined,
        relationship_type: (profile.relationship_type as FamilyMember['relationship_type']) || 'fils',
        father_name: profile.father_name || undefined,
        mother_name: profile.mother_name || undefined,
        spouse_name: '', // Set default empty string since it doesn't exist in DB
        is_admin: profile.is_admin || false,
        is_patriarch: profile.is_patriarch || false,
        civilite: profile.civilite || undefined,
        father_id: profile.father_id || undefined,
        mother_id: profile.mother_id || undefined,
        photo_url: profile.photo_url || undefined,
        created_at: profile.created_at || new Date().toISOString(),
        updated_at: profile.updated_at || new Date().toISOString()
      }));

      console.log('Family members loaded:', familyMembers.length);
      setMembers(familyMembers);
    } catch (err) {
      console.error('Error fetching family members:', err);
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
            ...memberData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      const newMember: FamilyMember = {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        title: (data.civilite as FamilyMember['title']) || 'Fils',
        birth_date: data.birth_date,
        birth_place: data.birth_place,
        current_location: data.current_location,
        situation: data.situation,
        avatar_url: data.avatar_url,
        phone: data.phone,
        profession: data.profession,
        relationship_type: (data.relationship_type as FamilyMember['relationship_type']) || 'fils',
        father_name: data.father_name,
        mother_name: data.mother_name,
        spouse_name: '', // Default empty string
        is_admin: data.is_admin || false,
        is_patriarch: data.is_patriarch || false,
        civilite: data.civilite,
        father_id: data.father_id,
        mother_id: data.mother_id,
        photo_url: data.photo_url,
        created_at: data.created_at,
        updated_at: data.updated_at
      };

      setMembers(prev => [...prev, newMember]);
      return newMember;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error('Erreur lors de l\'ajout du membre:', err);
      throw err;
    }
  }, []);

  const updateMember = useCallback(async (id: string, memberData: Partial<FamilyMember>) => {
    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('profiles')
        .update({
          ...memberData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      const updatedMember: FamilyMember = {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        title: (data.civilite as FamilyMember['title']) || 'Fils',
        birth_date: data.birth_date,
        birth_place: data.birth_place,
        current_location: data.current_location,
        situation: data.situation,
        avatar_url: data.avatar_url,
        phone: data.phone,
        profession: data.profession,
        relationship_type: (data.relationship_type as FamilyMember['relationship_type']) || 'fils',
        father_name: data.father_name,
        mother_name: data.mother_name,
        spouse_name: data.spouse_name,
        is_admin: data.is_admin || false,
        is_patriarch: data.is_patriarch || false,
        civilite: data.civilite,
        father_id: data.father_id,
        mother_id: data.mother_id,
        photo_url: data.photo_url,
        created_at: data.created_at,
        updated_at: data.updated_at
      };

      setMembers(prev => prev.map(member => member.id === id ? updatedMember : member));
      return updatedMember;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error('Erreur lors de la mise à jour du membre:', err);
      throw err;
    }
  }, []);

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

  const updateParentChildRelationship = useCallback(async (childId: string, parentId: string | null, isFather: boolean) => {
    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('profiles')
        .update({
          [isFather ? 'father_id' : 'mother_id']: parentId,
          updated_at: new Date().toISOString()
        })
        .eq('id', childId)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      const updatedMember: FamilyMember = {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        title: (data.civilite as FamilyMember['title']) || 'Fils',
        birth_date: data.birth_date,
        birth_place: data.birth_place,
        current_location: data.current_location,
        situation: data.situation,
        avatar_url: data.avatar_url,
        phone: data.phone,
        profession: data.profession,
        relationship_type: (data.relationship_type as FamilyMember['relationship_type']) || 'fils',
        father_name: data.father_name,
        mother_name: data.mother_name,
        spouse_name: data.spouse_name,
        is_admin: data.is_admin || false,
        is_patriarch: data.is_patriarch || false,
        civilite: data.civilite,
        father_id: data.father_id,
        mother_id: data.mother_id,
        photo_url: data.photo_url,
        created_at: data.created_at,
        updated_at: data.updated_at
      };

      setMembers(prev => prev.map(member => member.id === childId ? updatedMember : member));
      return updatedMember;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error('Erreur lors de la mise à jour de la relation parent-enfant:', err);
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
    deleteMember,
    updateParentChildRelationship
  };
};
