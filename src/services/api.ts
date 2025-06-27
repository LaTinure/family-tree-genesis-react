
import { supabase } from '@/integrations/supabase/client';
import { FamilyMember, NewFamilyMember } from '@/types/family';
import { Message, Notification } from '@/types/profile';

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
        spouse_name: profile.spouse_name || '',
        is_admin: profile.is_admin || false,
        is_patriarch: profile.is_patriarch || false,
        is_parent: profile.is_parent || false,
        situation: profile.situation,
        role: (profile.role_radio as any) || 'user',
        created_at: profile.created_at,
        updated_at: profile.updated_at,
      }));
    },

    async getCurrent(): Promise<FamilyMember | null> {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        id: data.id,
        user_id: data.user_id,
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        email: data.email || '',
        civilite: data.civilite as 'M.' | 'Mme' || 'M.',
        phone: data.phone,
        profession: data.profession,
        current_location: data.current_location,
        birth_place: data.birth_place,
        birth_date: data.birth_date,
        avatar_url: data.avatar_url,
        photo_url: data.photo_url,
        relationship_type: data.relationship_type as any || 'conjoint',
        father_id: data.father_id,
        mother_id: data.mother_id,
        father_name: data.father_name,
        mother_name: data.mother_name,
        spouse_name: data.spouse_name || '',
        is_admin: data.is_admin || false,
        is_patriarch: data.is_patriarch || false,
        is_parent: data.is_parent || false,
        situation: data.situation,
        role: (data.role_radio as any) || 'user',
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
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
          role_radio: memberData.role || 'user',
          is_admin: false,
          is_patriarch: false,
          is_parent: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .maybeSingle();

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
        spouse_name: data.spouse_name || '',
        is_admin: data.is_admin,
        is_patriarch: data.is_patriarch,
        is_parent: data.is_parent,
        situation: data.situation,
        role: (data.role_radio as any) || 'user',
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    },
  },

  messages: {
    async getAll(): Promise<Message[]> {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(msg => ({
        id: msg.id,
        content: msg.content,
        sender_id: msg.sender_id,
        is_admin_message: msg.is_admin_message || false,
        created_at: msg.created_at,
        read: false
      }));
    },

    async create(content: string, isAdmin = false): Promise<Message> {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Non authentifié');

      const { data, error } = await supabase
        .from('messages')
        .insert({
          content,
          sender_id: user.id,
          is_admin_message: isAdmin
        })
        .select()
        .maybeSingle();

      if (error) throw error;

      return {
        id: data.id,
        content: data.content,
        sender_id: data.sender_id,
        is_admin_message: data.is_admin_message,
        created_at: data.created_at,
        read: false
      };
    },

    async markAsRead(messageId: string): Promise<void> {
      // Simulate marking as read (no actual column exists)
      console.log('Message marked as read:', messageId);
    }
  },

  notifications: {
    async getAll(): Promise<Notification[]> {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(notif => ({
        id: notif.id,
        title: notif.title,
        message: notif.message,
        type: (notif.type as any) || 'info',
        user_id: notif.user_id,
        data: notif.data,
        read: notif.read || false,
        created_at: notif.created_at
      }));
    },

    async create(notification: Omit<Notification, 'id' | 'created_at'>): Promise<Notification> {
      const { data, error } = await supabase
        .from('notifications')
        .insert({
          title: notification.title,
          message: notification.message,
          type: notification.type,
          user_id: notification.user_id,
          data: notification.data,
          read: notification.read || false
        })
        .select()
        .maybeSingle();

      if (error) throw error;

      return {
        id: data.id,
        title: data.title,
        message: data.message,
        type: data.type as any,
        user_id: data.user_id,
        data: data.data,
        read: data.read,
        created_at: data.created_at
      };
    },

    async markAsRead(notificationId: string): Promise<void> {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw error;
    }
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
