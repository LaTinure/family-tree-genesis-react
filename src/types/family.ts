
// Types harmonisés pour la gestion familiale
export type RelationshipType = 
  | 'patriarche' 
  | 'matriarche' 
  | 'conjoint' 
  | 'fils' 
  | 'fille' 
  | 'frere' 
  | 'soeur' 
  | 'pere' 
  | 'mere' 
  | 'grand-pere' 
  | 'grand-mere' 
  | 'petit-fils' 
  | 'petite-fille' 
  | 'oncle' 
  | 'tante' 
  | 'neveu' 
  | 'niece' 
  | 'cousin' 
  | 'cousine'
  | 'epoux'
  | 'epouse'
  | 'beau-pere'
  | 'belle-mere'
  | 'beau-fils'
  | 'belle-fille';

export type Civilite = 'M.' | 'Mme';

export type UserRole = 'admin' | 'user' | 'pending';

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

export interface NewFamilyMember {
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
  situation?: string;
  role?: UserRole;
}

export interface FamilyTreeNode extends FamilyMember {
  children?: FamilyTreeNode[];
  spouse?: FamilyTreeNode;
  level: number;
  x?: number;
  y?: number;
}

export interface FamilyStats {
  totalMembers: number;
  totalGenerations: number;
  totalPatriarchs: number;
  totalAdmins: number;
  recentMembers: FamilyMember[];
  pendingMembers: FamilyMember[];
}
