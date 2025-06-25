import***REMOVED***{***REMOVED***z***REMOVED***}***REMOVED***from***REMOVED***'zod';

export***REMOVED***const***REMOVED***RelationshipEnum***REMOVED***=***REMOVED***z.enum([
***REMOVED******REMOVED***'fils',***REMOVED***'fille',
***REMOVED******REMOVED***'père',***REMOVED***'mère',
***REMOVED******REMOVED***'cousin',***REMOVED***'cousine',
***REMOVED******REMOVED***'tante',***REMOVED***'oncle',
***REMOVED******REMOVED***'neveu',***REMOVED***'nièce',
***REMOVED******REMOVED***'petit-fils',***REMOVED***'petite-fille',
***REMOVED******REMOVED***'grand-père',***REMOVED***'grande-mère',
***REMOVED******REMOVED***'époux',***REMOVED***'épouse',
***REMOVED******REMOVED***'patriarche',
]);

export***REMOVED***const***REMOVED***ProfileSchema***REMOVED***=***REMOVED***z.object({
***REMOVED******REMOVED***first_name:***REMOVED***z.string().min(1,***REMOVED***"Le***REMOVED***prénom***REMOVED***est***REMOVED***requis"),
***REMOVED******REMOVED***last_name:***REMOVED***z.string().min(1,***REMOVED***"Le***REMOVED***nom***REMOVED***est***REMOVED***requis"),
***REMOVED******REMOVED***email:***REMOVED***z.string().email("Email***REMOVED***invalide"),
***REMOVED******REMOVED***civilite:***REMOVED***z.enum(['M.',***REMOVED***'Mme']),
***REMOVED******REMOVED***relationship_type:***REMOVED***RelationshipEnum,
***REMOVED******REMOVED***phone:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***profession:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***current_location:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***birth_place:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***birth_date:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***father_name:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***mother_name:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***spouse_name:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***photo_url:***REMOVED***z.string().optional(),
});

//***REMOVED***Schéma***REMOVED***simplifié***REMOVED***pour***REMOVED***le***REMOVED***formulaire***REMOVED***d'inscription***REMOVED***utilisateur
export***REMOVED***const***REMOVED***FamilyRegisterSchema***REMOVED***=***REMOVED***z.object({
***REMOVED******REMOVED***display_name:***REMOVED***z.string().min(1,***REMOVED***"Le***REMOVED***nom***REMOVED***à***REMOVED***afficher***REMOVED***est***REMOVED***requis"),
***REMOVED******REMOVED***email:***REMOVED***z.string().email("Email***REMOVED***invalide"),
***REMOVED******REMOVED***password:***REMOVED***z.string().min(6,***REMOVED***"Mot***REMOVED***de***REMOVED***passe***REMOVED***minimum***REMOVED***6***REMOVED***caractères"),
***REMOVED******REMOVED***phone_code:***REMOVED***z.string().default('+225'),
***REMOVED******REMOVED***phone:***REMOVED***z.string().min(6,***REMOVED***"Numéro***REMOVED***de***REMOVED***téléphone***REMOVED***requis"),
***REMOVED******REMOVED***avatar_url:***REMOVED***z.string().min(1,***REMOVED***"La***REMOVED***photo***REMOVED***de***REMOVED***profil***REMOVED***est***REMOVED***obligatoire"),
***REMOVED******REMOVED***civilite:***REMOVED***z.enum(['M.',***REMOVED***'Mme']),
***REMOVED******REMOVED***role:***REMOVED***z.enum(['user',***REMOVED***'admin']).default('user'),
});

export***REMOVED***type***REMOVED***RelationshipType***REMOVED***=***REMOVED***z.infer<typeof***REMOVED***RelationshipEnum>;
export***REMOVED***type***REMOVED***ProfileFormData***REMOVED***=***REMOVED***z.infer<typeof***REMOVED***ProfileSchema>;
export***REMOVED***type***REMOVED***FamilyRegisterData***REMOVED***=***REMOVED***z.infer<typeof***REMOVED***FamilyRegisterSchema>;
