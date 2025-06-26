
import { z } from 'zod';

export const relationshipTypes = [
  'patriarche',
  'matriarche', 
  'conjoint',
  'fils',
  'fille',
  'frère',
  'sœur',
  'père',
  'mère',
  'grand-père',
  'grand-mère',
  'petit-fils',
  'petite-fille',
  'oncle',
  'tante',
  'neveu',
  'nièce',
  'cousin',
  'cousine',
  'époux',
  'épouse',
  'beau-père',
  'belle-mère',
  'beau-fils',
  'belle-fille',
  'grande-mère'
] as const;

export type RelationshipType = typeof relationshipTypes[number];

export const relationshipSchema = z.object({
  relationship_type: z.enum(relationshipTypes),
  civilite: z.enum(['M.', 'Mme']),
});

export const FamilyRegisterSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  first_name: z.string().min(1, "Le prénom est requis"),
  last_name: z.string().min(1, "Le nom est requis"),
  phone: z.string().optional(),
  profession: z.string().optional(),
  current_location: z.string().optional(),
  birth_place: z.string().optional(),
  birth_date: z.string().optional(),
  avatar_url: z.string().optional(),
  relationship_type: z.enum(relationshipTypes),
  civilite: z.enum(['M.', 'Mme']),
  situation: z.string().optional(),
});

export type FamilyRegisterData = z.infer<typeof FamilyRegisterSchema>;
