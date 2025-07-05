
import { z } from 'zod';

export const relationshipSchema = z.object({
  relationship_type: z.enum([
    'fils', 'fille', 'père', 'mère', 'cousin', 'cousine', 'tante', 'oncle',
    'neveu', 'nièce', 'petit-fils', 'petite-fille', 'grand-père', 'grand-mère',
    'époux', 'épouse', 'patriarche', 'matriarche', 'conjoint', 'frere', 'soeur',
    'beau-pere', 'belle-mere', 'beau-fils', 'belle-fille', 'pere', 'mere',
    'epoux', 'epouse'
  ]).default('fils')
});

export type RelationshipType = z.infer<typeof relationshipSchema>['relationship_type'];
