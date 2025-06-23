
import { supabase } from '@/integrations/supabase/client';
import { ProfileData } from '@/types/profile';

export const api = {
  profiles: {
    async create(profileData: Omit<ProfileData, 'id' | 'created_at' | 'updated_at'>) {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          ...profileData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data as ProfileData;
    },

    async update(id: string, updates: Partial<ProfileData>) {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as ProfileData;
    },

    async getCurrent() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Utilisateur non authentifié');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data as ProfileData;
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as ProfileData;
    },

    async getAll() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ProfileData[];
    },

    async delete(id: string) {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (error) throw error;
    }
  }
};
