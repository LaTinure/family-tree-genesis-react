
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
  | 'cousine'
  | 'époux'
  | 'épouse'
  | 'beau-père'
  | 'belle-mère'
  | 'beau-fils'
  | 'belle-fille'
  | 'grand-père'
  | 'grande-mère';

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
  civilite?: string;
  father_id?: string;
  mother_id?: string;
}

export interface NewFamilyMember {
  first_name: string;
  last_name: string;
  email: string;
  civilite?: string;
  phone?: string;
  profession?: string;
  current_location?: string;
  birth_place?: string;
  birth_date?: string;
  avatar_url?: string;
  relationship_type?: RelationshipType;
  father_id?: string;
  mother_id?: string;
  situation?: string;
}

export interface FamilyTreeNode extends FamilyMember {
  children?: FamilyTreeNode[];
  spouse?: FamilyTreeNode;
  level: number;
}
