
import { z } from 'zod';

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
  'cousine'
] as const;

export type RelationshipType = typeof relationshipTypes[number];

export const FamilyRegisterSchema = z.object({
  title: z.enum(['M.', 'Mme']),
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe minimum 6 caractères"),
  phoneCode: z.string().optional(),
  phone: z.string().optional(),
  profession: z.string().optional(),
  currentLocation: z.string().optional(),
  birthPlace: z.string().optional(),
  birthDate: z.string().optional(),
  photoUrl: z.string().optional(),
  relationship: z.enum(relationshipTypes).optional(),
  spouseName: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
});

export type FamilyRegisterData = z.infer<typeof FamilyRegisterSchema>;
