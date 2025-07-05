
import { z } from 'zod';

// Nouveaux rôles utilisateurs
export const userRoles = [
  'Administrateur',
  'Patriarche', 
  'Matriarche',
  'Membre',
  'Visiteur',
  'Invité'
] as const;

export const relationshipTypes = [
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
] as const;

export const civiliteOptions = ['M.', 'Mme'] as const;

export const familyMemberSchema = z.object({
  first_name: z.string().min(1, "Le prénom est requis"),
  last_name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  civilite: z.enum(civiliteOptions),
  phone: z.string().optional(),
  profession: z.string().optional(),
  current_location: z.string().optional(),
  birth_place: z.string().optional(),
  birth_date: z.string().optional(),
  avatar_url: z.string().optional(),
  photo_url: z.string().optional(),
  relationship_type: z.enum(relationshipTypes),
  father_id: z.string().optional(),
  mother_id: z.string().optional(),
  situation: z.string().optional(),
  user_role: z.enum(userRoles).default('Membre')
});

export const familyRegisterSchema = z.object({
  first_name: z.string().min(1, "Le prénom est requis"),
  last_name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  civilite: z.enum(civiliteOptions),
  phone: z.string().optional(),
  profession: z.string().optional(),
  current_location: z.string().optional(),
  birth_place: z.string().optional(),
  birth_date: z.string().optional(),
  photo_url: z.string().optional(),
  relationship_type: z.enum(relationshipTypes),
  situation: z.string().optional(),
  user_role: z.enum(userRoles).default('Membre')
});

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis")
});

export type RelationshipType = typeof relationshipTypes[number];
export type Civilite = typeof civiliteOptions[number];
export type UserRole = typeof userRoles[number];
export type FamilyMemberFormData = z.infer<typeof familyMemberSchema>;
export type FamilyRegisterFormData = z.infer<typeof familyRegisterSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
