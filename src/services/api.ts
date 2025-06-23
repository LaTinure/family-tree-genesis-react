
import { ProfileData, CreateProfileData, UpdateProfileData } from '@/types/profile';
import { supabase } from '@/integrations/supabase/client';

// Service API utilisant Supabase directement
export const api = {
  profiles: {
    async createProfile(profileData: CreateProfileData): Promise<ProfileData> {
      console.log('Creating profile:', profileData);
      
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          ...profileData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },

    async updateProfile(userId: string, updates: UpdateProfileData): Promise<ProfileData> {
      console.log('Updating profile:', userId, updates);
      
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },

    async getProfileById(userId: string): Promise<ProfileData> {
      console.log('Getting profile by ID:', userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        throw error;
      }

      return data;
    },

    async getCurrent(): Promise<ProfileData> {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('Utilisateur non authentifié');
      }

      return this.getProfileById(user.id);
    },

    async getAllProfiles(): Promise<ProfileData[]> {
      console.log('Getting all profiles');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    }
  },

  async uploadAvatar(userId: string, file: File): Promise<string> {
    console.log('Uploading avatar for user:', userId, file);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
};
