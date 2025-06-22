
export type Title = 'M.' | 'Mme' | 'Fils' | 'Fille';

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
  | 'cousine';

export interface FamilyMember {
  id: string;
  first_name: string;
  last_name: string;
  title: Title;
  email: string;
  phone?: string;
  profession?: string;
  current_location?: string;
  birth_place?: string;
  birth_date?: string;
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

export interface FamilyTreeNode extends FamilyMember {
  children?: FamilyTreeNode[];
  spouse?: FamilyTreeNode;
  level: number;
}
