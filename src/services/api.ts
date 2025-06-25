import { supabase } from '@/integrations/supabase/client';
import { ProfileData, FamilyMember, FamilyTree, Relationship, Message, Notification } from '@/types/profile';

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

    async createProfile(profileData: ProfileData) {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          ...profileData,
          created_at: profileData.created_at || new Date().toISOString(),
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
    },

    async uploadAvatar(userId: string, file: File) {
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return data.publicUrl;
    },

    async search(query: string, limit: number = 10) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%,profession.ilike.%${query}%,current_location.ilike.%${query}%`)
        .limit(limit);

      if (error) throw error;
      return data as ProfileData[];
    }
  },

  familyMembers: {
    async create(memberData: Omit<FamilyMember, 'id' | 'created_at' | 'updated_at'>) {
      const { data, error } = await supabase
        .from('family_members')
        .insert({
          ...memberData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data as FamilyMember;
    },

    async getByTreeId(treeId: number) {
      const { data, error } = await supabase
        .from('family_members')
        .select(`
          *,
          profiles (*)
        `)
        .eq('tree_id', treeId);

      if (error) throw error;
      return data;
    }
  },

  familyTrees: {
    async create(treeData: Omit<FamilyTree, 'id' | 'created_at' | 'updated_at'>) {
      const { data, error } = await supabase
        .from('family_trees')
        .insert({
          ...treeData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data as FamilyTree;
    },

    async getAll() {
      const { data, error } = await supabase
        .from('family_trees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as FamilyTree[];
    }
  },

  relationships: {
    async create(relationshipData: Omit<Relationship, 'id' | 'created_at' | 'updated_at'>) {
      const { data, error } = await supabase
        .from('relationships')
        .insert({
          ...relationshipData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data as Relationship;
    },

    async getByPersonId(personId: string) {
      const { data, error } = await supabase
        .from('relationships')
        .select('*')
        .or(`person1_id.eq.${personId},person2_id.eq.${personId}`);

      if (error) throw error;
      return data as Relationship[];
    }
  },

  messages: {
    async create(messageData: Omit<Message, 'id' | 'created_at'>) {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          ...messageData,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data as Message;
    },

    async getAll() {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          profiles (first_name, last_name, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  },

  notifications: {
    async create(notificationData: Omit<Notification, 'id' | 'created_at'>) {
      const { data, error } = await supabase
        .from('notifications')
        .insert({
          ...notificationData,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data as Notification;
    },

    async getByUserId(userId: string) {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Notification[];
    },

    async markAsRead(id: string) {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;
    }
  },

  admin: {
    async deleteAllUsers(deleteCode: string) {
      if (deleteCode !== '1432') {
        return { success: false, message: 'Code secret incorrect' };
      }

      try {
        const { data, error } = await supabase.functions.invoke('delete-all-data', {
          method: 'POST'
        });

        if (error) throw error;

        return {
          success: true,
          message: 'Suppression réussie',
          deletedUsers: data?.deletedUsers || 0,
          stats: data
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Erreur inconnue'
        };
      }
    }
  }
};
