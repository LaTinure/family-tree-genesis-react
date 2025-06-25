
import***REMOVED***{***REMOVED***z***REMOVED***}***REMOVED***from***REMOVED***'zod';

export***REMOVED***const***REMOVED***relationshipTypes***REMOVED***=***REMOVED***[
***REMOVED******REMOVED***'patriarche',
***REMOVED******REMOVED***'matriarche',***REMOVED***
***REMOVED******REMOVED***'conjoint',
***REMOVED******REMOVED***'fils',
***REMOVED******REMOVED***'fille',
***REMOVED******REMOVED***'frere',
***REMOVED******REMOVED***'soeur',
***REMOVED******REMOVED***'pere',
***REMOVED******REMOVED***'mere',
***REMOVED******REMOVED***'grand-pere',
***REMOVED******REMOVED***'grand-mere',
***REMOVED******REMOVED***'petit-fils',
***REMOVED******REMOVED***'petite-fille',
***REMOVED******REMOVED***'oncle',
***REMOVED******REMOVED***'tante',
***REMOVED******REMOVED***'neveu',
***REMOVED******REMOVED***'niece',
***REMOVED******REMOVED***'cousin',
***REMOVED******REMOVED***'cousine',
***REMOVED******REMOVED***'époux',
***REMOVED******REMOVED***'épouse',
***REMOVED******REMOVED***'beau-père',
***REMOVED******REMOVED***'belle-mère',
***REMOVED******REMOVED***'beau-fils',
***REMOVED******REMOVED***'belle-fille',
***REMOVED******REMOVED***'grand-père',
***REMOVED******REMOVED***'grande-mère'
]***REMOVED***as***REMOVED***const;

export***REMOVED***type***REMOVED***RelationshipType***REMOVED***=***REMOVED***typeof***REMOVED***relationshipTypes[number];

export***REMOVED***const***REMOVED***relationshipSchema***REMOVED***=***REMOVED***z.object({
***REMOVED******REMOVED***relationship_type:***REMOVED***z.enum(relationshipTypes),
***REMOVED******REMOVED***civilite:***REMOVED***z.enum(['M.',***REMOVED***'Mme']),
});
