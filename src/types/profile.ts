
import***REMOVED***{***REMOVED***RelationshipType,***REMOVED***Title***REMOVED***}***REMOVED***from***REMOVED***'./family';

export***REMOVED***interface***REMOVED***ProfileData***REMOVED***{
***REMOVED******REMOVED***id:***REMOVED***string;
***REMOVED******REMOVED***user_id:***REMOVED***string;
***REMOVED******REMOVED***email:***REMOVED***string;
***REMOVED******REMOVED***first_name:***REMOVED***string;
***REMOVED******REMOVED***last_name:***REMOVED***string;
***REMOVED******REMOVED***title:***REMOVED***Title;
***REMOVED******REMOVED***phone?:***REMOVED***string;
***REMOVED******REMOVED***profession?:***REMOVED***string;
***REMOVED******REMOVED***current_location?:***REMOVED***string;
***REMOVED******REMOVED***birth_place?:***REMOVED***string;
***REMOVED******REMOVED***birth_date?:***REMOVED***string***REMOVED***|***REMOVED***null;
***REMOVED******REMOVED***avatar_url?:***REMOVED***string;
***REMOVED******REMOVED***photo_url?:***REMOVED***string;
***REMOVED******REMOVED***relationship_type:***REMOVED***RelationshipType;
***REMOVED******REMOVED***father_name?:***REMOVED***string;
***REMOVED******REMOVED***mother_name?:***REMOVED***string;
***REMOVED******REMOVED***spouse_name?:***REMOVED***string;
***REMOVED******REMOVED***is_admin:***REMOVED***boolean;
***REMOVED******REMOVED***is_patriarch:***REMOVED***boolean;
***REMOVED******REMOVED***situation?:***REMOVED***string;
***REMOVED******REMOVED***created_at:***REMOVED***string;
***REMOVED******REMOVED***updated_at:***REMOVED***string;
}

export***REMOVED***interface***REMOVED***CreateProfileData***REMOVED***extends***REMOVED***Omit<ProfileData,***REMOVED***'id'***REMOVED***|***REMOVED***'created_at'***REMOVED***|***REMOVED***'updated_at'>***REMOVED***{}

export***REMOVED***interface***REMOVED***UpdateProfileData***REMOVED***extends***REMOVED***Partial<Omit<ProfileData,***REMOVED***'id'***REMOVED***|***REMOVED***'user_id'***REMOVED***|***REMOVED***'email'***REMOVED***|***REMOVED***'created_at'>>***REMOVED***{
***REMOVED******REMOVED***updated_at?:***REMOVED***string;
}
