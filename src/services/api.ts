
import { supabase } from '@/integrations/supabase/client';
import { FamilyMember, NewFamilyMember } from '@/types/family';

export const api = {
  profiles: {
    async getAll(): Promise<FamilyMember[]> {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(profile => ({
        id: profile.id,
        user_id: profile.user_id,
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        civilite: profile.civilite as 'M.' | 'Mme' || 'M.',
        phone: profile.phone,
        profession: profile.profession,
        current_location: profile.current_location,
        birth_place: profile.birth_place,
        birth_date: profile.birth_date,
        avatar_url: profile.avatar_url,
        photo_url: profile.photo_url,
        relationship_type: profile.relationship_type as any || 'conjoint',
        father_id: profile.father_id,
        mother_id: profile.mother_id,
        father_name: profile.father_name,
        mother_name: profile.mother_name,
        spouse_name: profile.spouse_name,
        is_admin: profile.is_admin || false,
        is_patriarch: profile.is_patriarch || false,
        is_parent: profile.is_parent || false,
        situation: profile.situation,
        role: (profile.role as any) || 'user',
        created_at: profile.created_at,
        updated_at: profile.updated_at,
      }));
    },

    async create(memberData: NewFamilyMember): Promise<FamilyMember> {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
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
          role: memberData.role || 'user',
          is_admin: false,
          is_patriarch: false,
          is_parent: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        user_id: data.user_id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        civilite: data.civilite as 'M.' | 'Mme',
        phone: data.phone,
        profession: data.profession,
        current_location: data.current_location,
        birth_place: data.birth_place,
        birth_date: data.birth_date,
        avatar_url: data.avatar_url,
        photo_url: data.photo_url,
        relationship_type: data.relationship_type as any,
        father_id: data.father_id,
        mother_id: data.mother_id,
        father_name: data.father_name,
        mother_name: data.mother_name,
        spouse_name: data.spouse_name,
        is_admin: data.is_admin,
        is_patriarch: data.is_patriarch,
        is_parent: data.is_parent,
        situation: data.situation,
        role: data.role as any,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    },
  },

  admin: {
    async deleteAllUsers(code: string) {
      const { data, error } = await supabase.functions.invoke('delete-all-data', {
        body: { code }
      });

      if (error) throw error;
      return data;
    }
  }
};
