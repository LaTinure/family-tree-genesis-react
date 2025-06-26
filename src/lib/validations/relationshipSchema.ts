
import***REMOVED***{***REMOVED***z***REMOVED***}***REMOVED***from***REMOVED***'zod';

export***REMOVED***const***REMOVED***relationshipTypes***REMOVED***=***REMOVED***[
***REMOVED******REMOVED***'patriarche',
***REMOVED******REMOVED***'matriarche',***REMOVED***
***REMOVED******REMOVED***'conjoint',
***REMOVED******REMOVED***'fils',
***REMOVED******REMOVED***'fille',
***REMOVED******REMOVED***'frère',
***REMOVED******REMOVED***'sœur',
***REMOVED******REMOVED***'père',
***REMOVED******REMOVED***'mère',
***REMOVED******REMOVED***'grand-père',
***REMOVED******REMOVED***'grand-mère',
***REMOVED******REMOVED***'petit-fils',
***REMOVED******REMOVED***'petite-fille',
***REMOVED******REMOVED***'oncle',
***REMOVED******REMOVED***'tante',
***REMOVED******REMOVED***'neveu',
***REMOVED******REMOVED***'nièce',
***REMOVED******REMOVED***'cousin',
***REMOVED******REMOVED***'cousine',
***REMOVED******REMOVED***'époux',
***REMOVED******REMOVED***'épouse',
***REMOVED******REMOVED***'beau-père',
***REMOVED******REMOVED***'belle-mère',
***REMOVED******REMOVED***'beau-fils',
***REMOVED******REMOVED***'belle-fille',
***REMOVED******REMOVED***'grande-mère'
]***REMOVED***as***REMOVED***const;

export***REMOVED***type***REMOVED***RelationshipType***REMOVED***=***REMOVED***typeof***REMOVED***relationshipTypes[number];

export***REMOVED***const***REMOVED***relationshipSchema***REMOVED***=***REMOVED***z.object({
***REMOVED******REMOVED***relationship_type:***REMOVED***z.enum(relationshipTypes),
***REMOVED******REMOVED***civilite:***REMOVED***z.enum(['M.',***REMOVED***'Mme']),
});

export***REMOVED***const***REMOVED***FamilyRegisterSchema***REMOVED***=***REMOVED***z.object({
***REMOVED******REMOVED***email:***REMOVED***z.string().email("Email***REMOVED***invalide"),
***REMOVED******REMOVED***password:***REMOVED***z.string().min(8,***REMOVED***"Le***REMOVED***mot***REMOVED***de***REMOVED***passe***REMOVED***doit***REMOVED***contenir***REMOVED***au***REMOVED***moins***REMOVED***8***REMOVED***caractères"),
***REMOVED******REMOVED***first_name:***REMOVED***z.string().min(1,***REMOVED***"Le***REMOVED***prénom***REMOVED***est***REMOVED***requis"),
***REMOVED******REMOVED***last_name:***REMOVED***z.string().min(1,***REMOVED***"Le***REMOVED***nom***REMOVED***est***REMOVED***requis"),
***REMOVED******REMOVED***phone:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***profession:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***current_location:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***birth_place:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***birth_date:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***avatar_url:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***relationship_type:***REMOVED***z.enum(relationshipTypes),
***REMOVED******REMOVED***civilite:***REMOVED***z.enum(['M.',***REMOVED***'Mme']),
***REMOVED******REMOVED***situation:***REMOVED***z.string().optional(),
});

export***REMOVED***type***REMOVED***FamilyRegisterData***REMOVED***=***REMOVED***z.infer<typeof***REMOVED***FamilyRegisterSchema>;
