
import { z } from 'zod';
import { RelationshipType, Civilite, UserRole } from '@/types/family';

// Schémas de validation harmonisés
export const relationshipTypes: RelationshipType[] = [
  'patriarche',
  'matriarche', 
  'conjoint',
  'fils',
  'fille',
  'frere',
  'soeur',
  'pere',
  'mere',
  'grand-pere',
  'grand-mere',
  'petit-fils',
  'petite-fille',
  'oncle',
  'tante',
  'neveu',
  'niece',
  'cousin',
  'cousine',
  'epoux',
  'epouse',
  'beau-pere',
  'belle-mere',
  'beau-fils',
  'belle-fille'
];

export const civiliteOptions: Civilite[] = ['M.', 'Mme'];
export const roleOptions: UserRole[] = ['admin', 'user', 'pending'];

export const familyMemberSchema = z.object({
  first_name: z.string().min(1, "Le prénom est requis"),
  last_name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  civilite: z.enum(['M.', 'Mme']),
  phone: z.string().optional(),
  profession: z.string().optional(),
  current_location: z.string().optional(),
  birth_place: z.string().optional(),
  birth_date: z.string().optional(),
  avatar_url: z.string().optional(),
  photo_url: z.string().optional(),
  relationship_type: z.enum(relationshipTypes as [RelationshipType, ...RelationshipType[]]),
  father_id: z.string().optional(),
  mother_id: z.string().optional(),
  situation: z.string().optional(),
  role: z.enum(['admin', 'user', 'pending']).default('pending')
});

export const familyRegisterSchema = z.object({
  first_name: z.string().min(1, "Le prénom est requis"),
  last_name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  civilite: z.enum(['M.', 'Mme']),
  phone: z.string().optional(),
  profession: z.string().optional(),
  current_location: z.string().optional(),
  birth_place: z.string().optional(),
  birth_date: z.string().optional(),
  photo_url: z.string().optional(),
  relationship_type: z.enum(relationshipTypes as [RelationshipType, ...RelationshipType[]]),
  situation: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis")
});

export type FamilyMemberFormData = z.infer<typeof familyMemberSchema>;
export type FamilyRegisterFormData = z.infer<typeof familyRegisterSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
