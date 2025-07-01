
import***REMOVED***{***REMOVED***z***REMOVED***}***REMOVED***from***REMOVED***'zod';

export***REMOVED***const***REMOVED***relationshipSchema***REMOVED***=***REMOVED***z.object({
***REMOVED******REMOVED***relationship_type:***REMOVED***z.enum([
***REMOVED******REMOVED******REMOVED******REMOVED***'fils',***REMOVED***'fille',***REMOVED***'père',***REMOVED***'mère',***REMOVED***'cousin',***REMOVED***'cousine',***REMOVED***'tante',***REMOVED***'oncle',
***REMOVED******REMOVED******REMOVED******REMOVED***'neveu',***REMOVED***'nièce',***REMOVED***'petit-fils',***REMOVED***'petite-fille',***REMOVED***'grand-père',***REMOVED***'grand-mère',
***REMOVED******REMOVED******REMOVED******REMOVED***'époux',***REMOVED***'épouse',***REMOVED***'patriarche',***REMOVED***'matriarche',***REMOVED***'conjoint',***REMOVED***'frere',***REMOVED***'soeur',
***REMOVED******REMOVED******REMOVED******REMOVED***'beau-pere',***REMOVED***'belle-mere',***REMOVED***'beau-fils',***REMOVED***'belle-fille',***REMOVED***'pere',***REMOVED***'mere',
***REMOVED******REMOVED******REMOVED******REMOVED***'epoux',***REMOVED***'epouse'
***REMOVED******REMOVED***]).default('fils')
});

export***REMOVED***type***REMOVED***RelationshipType***REMOVED***=***REMOVED***z.infer<typeof***REMOVED***relationshipSchema>['relationship_type'];
