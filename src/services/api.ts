
import { supabase } from '@/integrations/supabase/client';
import { FamilyMember, NewFamilyMember, FamilyNotification, Media } from '@/types/family';

export const familyApi = {
  async getAll(): Promise<FamilyMember[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(profile => ({
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
      spouse_name: '',
      is_admin: profile.is_admin || false,
      is_patriarch: profile.is_patriarch || false,
      is_parent: profile.is_parent || false,
      situation: profile.situation || undefined,
      user_role: (profile.user_role as any) || 'Membre',
      created_at: profile.created_at || new Date().toISOString(),
      updated_at: profile.updated_at || new Date().toISOString()
    }));
  },

  async getCurrent(): Promise<FamilyMember> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) throw error;

    return {
      id: data.id || '',
      user_id: data.user_id || '',
      first_name: data.first_name || '',
      last_name: data.last_name || '',
      email: data.email || '',
      civilite: (data.civilite as 'M.' | 'Mme') || 'M.',
      phone: data.phone || undefined,
      profession: data.profession || undefined,
      current_location: data.current_location || undefined,
      birth_place: data.birth_place || undefined,
      birth_date: data.birth_date || undefined,
      avatar_url: data.avatar_url || undefined,
      photo_url: data.photo_url || undefined,
      relationship_type: (data.relationship_type as any) || 'fils',
      father_id: data.father_id || undefined,
      mother_id: data.mother_id || undefined,
      father_name: data.father_name || undefined,
      mother_name: data.mother_name || undefined,
      spouse_name: '',
      is_admin: data.is_admin || false,
      is_patriarch: data.is_patriarch || false,
      is_parent: data.is_parent || false,
      situation: data.situation || undefined,
      user_role: (data.user_role as any) || 'Membre',
      created_at: data.created_at || new Date().toISOString(),
      updated_at: data.updated_at || new Date().toISOString()
    };
  },

  async create(memberData: NewFamilyMember): Promise<FamilyMember> {
    const { data, error } = await supabase
      .from('profiles')
      .insert([{
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
        user_role: memberData.user_role || 'Membre',
        is_admin: memberData.user_role === 'Administrateur',
        is_patriarch: memberData.user_role === 'Patriarche' || memberData.user_role === 'Matriarche',
        is_parent: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id || '',
      user_id: data.user_id || '',
      first_name: data.first_name || '',
      last_name: data.last_name || '',
      email: data.email || '',
      civilite: (data.civilite as 'M.' | 'Mme') || 'M.',
      phone: data.phone || undefined,
      profession: data.profession || undefined,
      current_location: data.current_location || undefined,
      birth_place: data.birth_place || undefined,
      birth_date: data.birth_date || undefined,
      avatar_url: data.avatar_url || undefined,
      photo_url: data.photo_url || undefined,
      relationship_type: (data.relationship_type as any) || 'fils',
      father_id: data.father_id || undefined,
      mother_id: data.mother_id || undefined,
      father_name: data.father_name || undefined,
      mother_name: data.mother_name || undefined,
      spouse_name: '',
      is_admin: data.is_admin || false,
      is_patriarch: data.is_patriarch || false,
      is_parent: data.is_parent || false,
      situation: data.situation || undefined,
      user_role: (data.user_role as any) || 'Membre',
      created_at: data.created_at || new Date().toISOString(),
      updated_at: data.updated_at || new Date().toISOString()
    };
  },

  async uploadAvatar(file: File): Promise<string> {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file);

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  },

  async createProfile(profileData: any): Promise<any> {
    return this.create(profileData);
  }
};

export const notificationApi = {
  async getAll(): Promise<FamilyNotification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(notification => ({
      id: notification.id,
      title: notification.title,
      message: notification.message,
      type: (notification.type as 'error' | 'info' | 'warning' | 'success') || 'info',
      user_id: notification.user_id || '',
      read: notification.read || false,
      created_at: notification.created_at || new Date().toISOString(),
      family_id: 'default-family'
    }));
  },

  async getByUserId(userId: string): Promise<FamilyNotification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(notification => ({
      id: notification.id,
      title: notification.title,
      message: notification.message,
      type: (notification.type as 'error' | 'info' | 'warning' | 'success') || 'info',
      user_id: notification.user_id || '',
      read: notification.read || false,
      created_at: notification.created_at || new Date().toISOString(),
      family_id: 'default-family'
    }));
  },

  async markAsRead(id: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);

    if (error) throw error;
  },

  async create(notification: Omit<FamilyNotification, 'id' | 'created_at'>): Promise<FamilyNotification> {
    const { data, error } = await supabase
      .from('notifications')
      .insert([{
        title: notification.title,
        message: notification.message,
        type: notification.type,
        user_id: notification.user_id,
        read: notification.read || false,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      message: data.message,
      type: data.type as 'error' | 'info' | 'warning' | 'success',
      user_id: data.user_id,
      read: data.read || false,
      created_at: data.created_at,
      family_id: 'default-family'
    };
  }
};

export const mediaApi = {
  async getAll(): Promise<Media[]> {
    const { data, error } = await supabase
      .from('medias')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(media => ({
      id: media.id,
      title: media.title,
      description: media.description,
      video_url: media.video_url,
      thumbnail_url: media.thumbnail_url,
      duration: media.duration,
      created_by: media.created_by,
      created_at: media.created_at,
      updated_at: media.updated_at
    }));
  },

  async create(mediaData: Omit<Media, 'id' | 'created_at' | 'updated_at'>): Promise<Media> {
    const { data, error } = await supabase
      .from('medias')
      .insert([{
        title: mediaData.title,
        description: mediaData.description,
        video_url: mediaData.video_url,
        thumbnail_url: mediaData.thumbnail_url,
        duration: mediaData.duration,
        created_by: mediaData.created_by
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      video_url: data.video_url,
      thumbnail_url: data.thumbnail_url,
      duration: data.duration,
      created_by: data.created_by,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  }
};

export const messageApi = {
  async getAll(): Promise<any[]> {
    return [];
  },

  async create(messageData: any): Promise<any> {
    return messageData;
  }
};

export const api = {
  profiles: familyApi,
  notifications: notificationApi,
  messages: messageApi,
  medias: mediaApi
};

export { familyApi as default };
