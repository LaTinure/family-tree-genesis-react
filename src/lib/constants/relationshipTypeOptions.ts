
import***REMOVED***{***REMOVED***RelationshipType***REMOVED***}***REMOVED***from***REMOVED***'@/types/family';

interface***REMOVED***RelationshipOption***REMOVED***{
***REMOVED******REMOVED***value:***REMOVED***RelationshipType;
***REMOVED******REMOVED***label:***REMOVED***string;
}

export***REMOVED***const***REMOVED***getRelationshipTypeOptions***REMOVED***=***REMOVED***(
***REMOVED******REMOVED***title:***REMOVED***'M.'***REMOVED***|***REMOVED***'Mme',
***REMOVED******REMOVED***patriarchExists:***REMOVED***boolean
):***REMOVED***RelationshipOption[]***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***baseOptions:***REMOVED***RelationshipOption[]***REMOVED***=***REMOVED***[
***REMOVED******REMOVED******REMOVED******REMOVED***{***REMOVED***value:***REMOVED***'fils',***REMOVED***label:***REMOVED***title***REMOVED***===***REMOVED***'M.'***REMOVED***?***REMOVED***'Fils'***REMOVED***:***REMOVED***'Fille'***REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***{***REMOVED***value:***REMOVED***'conjoint',***REMOVED***label:***REMOVED***title***REMOVED***===***REMOVED***'M.'***REMOVED***?***REMOVED***'Époux'***REMOVED***:***REMOVED***'Épouse'***REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***{***REMOVED***value:***REMOVED***'frere',***REMOVED***label:***REMOVED***title***REMOVED***===***REMOVED***'M.'***REMOVED***?***REMOVED***'Frère'***REMOVED***:***REMOVED***'Sœur'***REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***{***REMOVED***value:***REMOVED***'pere',***REMOVED***label:***REMOVED***title***REMOVED***===***REMOVED***'M.'***REMOVED***?***REMOVED***'Père'***REMOVED***:***REMOVED***'Mère'***REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***{***REMOVED***value:***REMOVED***'grand-père',***REMOVED***label:***REMOVED***title***REMOVED***===***REMOVED***'M.'***REMOVED***?***REMOVED***'Grand-père'***REMOVED***:***REMOVED***'Grand-mère'***REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***{***REMOVED***value:***REMOVED***'petit-fils',***REMOVED***label:***REMOVED***title***REMOVED***===***REMOVED***'M.'***REMOVED***?***REMOVED***'Petit-fils'***REMOVED***:***REMOVED***'Petite-fille'***REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***{***REMOVED***value:***REMOVED***'oncle',***REMOVED***label:***REMOVED***title***REMOVED***===***REMOVED***'M.'***REMOVED***?***REMOVED***'Oncle'***REMOVED***:***REMOVED***'Tante'***REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***{***REMOVED***value:***REMOVED***'neveu',***REMOVED***label:***REMOVED***title***REMOVED***===***REMOVED***'M.'***REMOVED***?***REMOVED***'Neveu'***REMOVED***:***REMOVED***'Nièce'***REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***{***REMOVED***value:***REMOVED***'cousin',***REMOVED***label:***REMOVED***title***REMOVED***===***REMOVED***'M.'***REMOVED***?***REMOVED***'Cousin'***REMOVED***:***REMOVED***'Cousine'***REMOVED***},
***REMOVED******REMOVED***];

***REMOVED******REMOVED***if***REMOVED***(!patriarchExists)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***baseOptions.unshift({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***value:***REMOVED***title***REMOVED***===***REMOVED***'M.'***REMOVED***?***REMOVED***'patriarche'***REMOVED***:***REMOVED***'matriarche',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***label:***REMOVED***title***REMOVED***===***REMOVED***'M.'***REMOVED***?***REMOVED***'Patriarche'***REMOVED***:***REMOVED***'Matriarche'
***REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED***}

***REMOVED******REMOVED***return***REMOVED***baseOptions;
};
