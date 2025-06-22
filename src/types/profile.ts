
import { RelationshipType, Title } from './family';

export interface ProfileData {
  id: string;
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  title: Title;
  phone?: string;
  profession?: string;
  current_location?: string;
  birth_place?: string;
  birth_date?: string | null;
  avatar_url?: string;
  photo_url?: string;
  relationship_type: RelationshipType;
  father_name?: string;
  mother_name?: string;
  spouse_name?: string;
  is_admin: boolean;
  is_patriarch: boolean;
  situation?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProfileData extends Omit<ProfileData, 'id' | 'created_at' | 'updated_at'> {}

export interface UpdateProfileData extends Partial<Omit<ProfileData, 'id' | 'user_id' | 'email' | 'created_at'>> {
  updated_at?: string;
}
