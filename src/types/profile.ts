
export interface ProfileData {
  id: string;
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  birth_date?: string;
  birth_place?: string;
  current_location?: string;
  situation?: string;
  profession?: string;
  avatar_url?: string;
  photo_url?: string;
  title?: 'Patriarche' | 'Matriarche' | 'Père' | 'Mère' | 'Fils' | 'Fille' | 'Grand-père' | 'Grand-mère' | 'Petit-fils' | 'Petite-fille' | 'Oncle' | 'Tante' | 'Neveu' | 'Nièce' | 'Cousin' | 'Cousine' | 'Beau-père' | 'Belle-mère' | 'Beau-fils' | 'Belle-fille' | 'Frère' | 'Sœur' | 'Époux' | 'Épouse';
  relationship_type?: 'fils' | 'fille' | 'père' | 'mère' | 'cousin' | 'cousine' | 'tante' | 'oncle' | 'neveu' | 'nièce' | 'petit-fils' | 'petite-fille' | 'grand-père' | 'grande-mère' | 'époux' | 'épouse' | 'patriarche' | 'matriarche' | 'conjoint';
  father_name?: string;
  mother_name?: string;
  spouse_name?: string;
  is_admin?: boolean;
  is_parent?: boolean;
  is_patriarch?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface FamilyMember {
  id: string;
  profile_id: string;
  tree_id: number;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

export interface FamilyTree {
  id: number;
  name: string;
  description?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Relationship {
  id: string;
  person1_id: string;
  person2_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface Message {
  id: string;
  content: string;
  sender_id: string;
  is_admin_message?: boolean;
  created_at?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  user_id: string;
  data?: any;
  read?: boolean;
  created_at?: string;
}
