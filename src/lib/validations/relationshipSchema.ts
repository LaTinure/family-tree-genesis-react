
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
  'cousine',
  'époux',
  'épouse',
  'beau-père',
  'belle-mère',
  'beau-fils',
  'belle-fille',
  'grand-père',
  'grande-mère'
] as const;

export type RelationshipType = typeof relationshipTypes[number];

export const relationshipSchema = z.object({
  relationship_type: z.enum(relationshipTypes),
  civilite: z.enum(['M.', 'Mme']),
});
