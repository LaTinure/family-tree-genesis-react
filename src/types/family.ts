
export interface FamilyMember {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  civilite: 'M.' | 'Mme';
  phone?: string;
  profession?: string;
  current_location?: string;
  birth_place?: string;
  birth_date?: string;
  avatar_url?: string;
  photo_url?: string;
  relationship_type: 'patriarche' | 'matriarche' | 'conjoint' | 'fils' | 'fille' | 'frere' | 'soeur' | 'pere' | 'mere' | 'grand-pere' | 'grand-mere' | 'petit-fils' | 'petite-fille' | 'oncle' | 'tante' | 'neveu' | 'niece' | 'cousin' | 'cousine' | 'epoux' | 'epouse' | 'beau-pere' | 'belle-mere' | 'beau-fils' | 'belle-fille';
  father_id?: string;
  mother_id?: string;
  father_name?: string;
  mother_name?: string;
  spouse_name: string;
  is_admin: boolean;
  is_patriarch: boolean;
  is_parent: boolean;
  situation?: string;
  user_role: 'Administrateur' | 'Patriarche' | 'Matriarche' | 'Membre' | 'Visiteur' | 'Invité';
  created_at: string;
  updated_at: string;
}

export interface NewFamilyMember {
  first_name: string;
  last_name: string;
  email: string;
  civilite: 'M.' | 'Mme';
  phone?: string;
  profession?: string;
  current_location?: string;
  birth_place?: string;
  birth_date?: string;
  avatar_url?: string;
  photo_url?: string;
  relationship_type: 'patriarche' | 'matriarche' | 'conjoint' | 'fils' | 'fille' | 'frere' | 'soeur' | 'pere' | 'mere' | 'grand-pere' | 'grand-mere' | 'petit-fils' | 'petite-fille' | 'oncle' | 'tante' | 'neveu' | 'niece' | 'cousin' | 'cousine' | 'epoux' | 'epouse' | 'beau-pere' | 'belle-mere' | 'beau-fils' | 'belle-fille';
  father_id?: string;
  mother_id?: string;
  situation?: string;
  user_role?: 'Administrateur' | 'Patriarche' | 'Matriarche' | 'Membre' | 'Visiteur' | 'Invité';
}

export interface FamilyNotification {
  id: string;
  title: string;
  message: string;
  type: 'error' | 'info' | 'warning' | 'success';
  user_id: string;
  read: boolean;
  created_at: string;
  family_id: string;
}

export interface Media {
  id: string;
  title: string;
  description?: string;
  video_url: string;
  thumbnail_url?: string;
  duration?: number;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface FamilyTreeNode {
  id: string;
  name: string;
  children?: FamilyTreeNode[];
}

export interface InvitationData {
  id: string;
  token: string;
  dynasty_id: string;
  dynasty_name: string;
  user_role: string;
  affiliation?: string;
  invited_by_name?: string;
  expires_at: string;
  used: boolean;
}

export interface Dynasty {
  id: string;
  name: string;
  location?: string;
  description?: string;
  founding_year?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface DynastyCreationToken {
  id: string;
  token: string;
  stripe_session_id?: string;
  code_promo?: string;
  is_used: boolean;
  used_at?: string;
  created_by?: string;
  expires_at: string;
  created_at: string;
}
