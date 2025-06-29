// Types harmonisés pour la gestion familiale
import { RelationshipType, Civilite, UserRole } from '@/lib/validations/familySchema';

export interface FamilyMember {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  civilite: Civilite;
  phone?: string;
  profession?: string;
  current_location?: string;
  birth_place?: string;
  birth_date?: string;
  avatar_url?: string;
  photo_url?: string;
  relationship_type: RelationshipType;
  father_id?: string;
  mother_id?: string;
  father_name?: string;
  mother_name?: string;
  spouse_name?: string;
  is_admin: boolean;
  is_patriarch: boolean;
  is_parent: boolean;
  situation?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface FamilyTree {
  id: string;
  name: string;
  description?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  members: FamilyMember[];
}

export interface FamilyInvitation {
  id: string;
  email: string;
  family_id: string;
  invited_by: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
  expires_at: string;
}

export interface FamilyMessage {
  id: string;
  family_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'image' | 'file';
  created_at: string;
  sender: FamilyMember;
}

export interface FamilyEvent {
  id: string;
  family_id: string;
  title: string;
  description?: string;
  event_date: string;
  event_type: 'birthday' | 'anniversary' | 'reunion' | 'other';
  location?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

// Types pour les formulaires
export interface CreateFamilyMemberData {
  first_name: string;
  last_name: string;
  email: string;
  civilite: Civilite;
  phone?: string;
  profession?: string;
  current_location?: string;
  birth_place?: string;
  birth_date?: string;
  relationship_type: RelationshipType;
  father_id?: string;
  mother_id?: string;
  situation?: string;
  role: UserRole;
}

export interface UpdateFamilyMemberData {
  first_name?: string;
  last_name?: string;
  phone?: string;
  profession?: string;
  current_location?: string;
  birth_place?: string;
  birth_date?: string;
  relationship_type?: RelationshipType;
  father_id?: string;
  mother_id?: string;
  situation?: string;
  role?: UserRole;
}

// Types pour les relations
export interface FamilyRelation {
  id: string;
  member_id: string;
  related_member_id: string;
  relation_type: RelationshipType;
  created_at: string;
}

// Types pour les statistiques
export interface FamilyStats {
  total_members: number;
  active_members: number;
  pending_invitations: number;
  upcoming_events: number;
  recent_messages: number;
}

// Types pour les notifications
export interface FamilyNotification {
  id: string;
  family_id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  created_at: string;
}
