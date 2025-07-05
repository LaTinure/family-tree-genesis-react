
export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  message_type: 'text' | 'image' | 'file' | 'audio';
  timestamp: Date;
  is_read: boolean;
  is_delivered: boolean;
  reply_to?: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
}

export interface Conversation {
  id: string;
  participants: string[];
  last_message?: Message;
  created_at: Date;
  updated_at: Date;
  is_group: boolean;
  group_name?: string;
  group_avatar?: string;
}

export interface ChatContact {
  id: string;
  profile: {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    avatar_url?: string;
    photo_url?: string;
    phone?: string;
    is_online: boolean;
    last_seen?: Date;
  };
  conversation_id: string;
  last_message?: Message;
  unread_count: number;
}

export interface TypingIndicator {
  user_id: string;
  conversation_id: string;
  is_typing: boolean;
  timestamp: Date;
}

export interface OnlineStatus {
  user_id: string;
  is_online: boolean;
  last_seen: Date;
}
