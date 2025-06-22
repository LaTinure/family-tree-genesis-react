
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
***REMOVED******REMOVED***'cousine'
]***REMOVED***as***REMOVED***const;

export***REMOVED***type***REMOVED***RelationshipType***REMOVED***=***REMOVED***typeof***REMOVED***relationshipTypes[number];

export***REMOVED***const***REMOVED***FamilyRegisterSchema***REMOVED***=***REMOVED***z.object({
***REMOVED******REMOVED***title:***REMOVED***z.enum(['M.',***REMOVED***'Mme']),
***REMOVED******REMOVED***firstName:***REMOVED***z.string().min(1,***REMOVED***"Le***REMOVED***prénom***REMOVED***est***REMOVED***requis"),
***REMOVED******REMOVED***lastName:***REMOVED***z.string().min(1,***REMOVED***"Le***REMOVED***nom***REMOVED***est***REMOVED***requis"),
***REMOVED******REMOVED***email:***REMOVED***z.string().email("Email***REMOVED***invalide"),
***REMOVED******REMOVED***password:***REMOVED***z.string().min(6,***REMOVED***"Mot***REMOVED***de***REMOVED***passe***REMOVED***minimum***REMOVED***6***REMOVED***caractères"),
***REMOVED******REMOVED***phoneCode:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***phone:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***profession:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***currentLocation:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***birthPlace:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***birthDate:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***photoUrl:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***relationship:***REMOVED***z.enum(relationshipTypes).optional(),
***REMOVED******REMOVED***spouseName:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***fatherName:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***motherName:***REMOVED***z.string().optional(),
});

export***REMOVED***type***REMOVED***FamilyRegisterData***REMOVED***=***REMOVED***z.infer<typeof***REMOVED***FamilyRegisterSchema>;
