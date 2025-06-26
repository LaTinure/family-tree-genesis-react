
import***REMOVED***{***REMOVED***useState,***REMOVED***useCallback,***REMOVED***useEffect***REMOVED***}***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***supabase***REMOVED***}***REMOVED***from***REMOVED***'@/integrations/supabase/client';
import***REMOVED***type***REMOVED***{***REMOVED***ProfileData***REMOVED***}***REMOVED***from***REMOVED***'@/types/profile';
import***REMOVED***{***REMOVED***FamilyMember,***REMOVED***NewFamilyMember***REMOVED***}***REMOVED***from***REMOVED***'@/types/family';
import***REMOVED***{***REMOVED***api***REMOVED***}***REMOVED***from***REMOVED***'@/services/api';

export***REMOVED***const***REMOVED***useFamilyMembers***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***[members,***REMOVED***setMembers]***REMOVED***=***REMOVED***useState<FamilyMember[]>([]);
***REMOVED******REMOVED***const***REMOVED***[isLoading,***REMOVED***setIsLoading]***REMOVED***=***REMOVED***useState(true);
***REMOVED******REMOVED***const***REMOVED***[error,***REMOVED***setError]***REMOVED***=***REMOVED***useState<string***REMOVED***|***REMOVED***null>(null);

***REMOVED******REMOVED***const***REMOVED***fetchMembers***REMOVED***=***REMOVED***useCallback(async***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setIsLoading(true);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setError(null);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('Fetching***REMOVED***family***REMOVED***members...');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***profiles***REMOVED***=***REMOVED***await***REMOVED***api.profiles.getAll();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!profiles***REMOVED***||***REMOVED***profiles.length***REMOVED***===***REMOVED***0)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('No***REMOVED***profiles***REMOVED***found');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setMembers([]);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***familyMembers:***REMOVED***FamilyMember[]***REMOVED***=***REMOVED***profiles.map(profile***REMOVED***=>***REMOVED***({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id:***REMOVED***profile.id***REMOVED***||***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***first_name:***REMOVED***profile.first_name***REMOVED***||***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***last_name:***REMOVED***profile.last_name***REMOVED***||***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***email:***REMOVED***profile.email***REMOVED***||***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***title:***REMOVED***(profile.title***REMOVED***as***REMOVED***FamilyMember['title'])***REMOVED***||***REMOVED***'Fils',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***birth_date:***REMOVED***profile.birth_date***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***birth_place:***REMOVED***profile.birth_place***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***current_location:***REMOVED***profile.current_location***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***situation:***REMOVED***profile.situation***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***avatar_url:***REMOVED***profile.avatar_url***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***phone:***REMOVED***profile.phone***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***profession:***REMOVED***profile.profession***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***relationship_type:***REMOVED***(profile.relationship_type***REMOVED***as***REMOVED***FamilyMember['relationship_type'])***REMOVED***||***REMOVED***'fils',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***father_name:***REMOVED***profile.father_name***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***mother_name:***REMOVED***profile.mother_name***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***spouse_name:***REMOVED***'',***REMOVED***//***REMOVED***Set***REMOVED***default***REMOVED***empty***REMOVED***string***REMOVED***since***REMOVED***it***REMOVED***doesn't***REMOVED***exist***REMOVED***in***REMOVED***DB
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_admin:***REMOVED***profile.is_admin***REMOVED***||***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_patriarch:***REMOVED***profile.is_patriarch***REMOVED***||***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***civilite:***REMOVED***profile.civilite***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***father_id:***REMOVED***profile.father_id***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***mother_id:***REMOVED***profile.mother_id***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***photo_url:***REMOVED***profile.photo_url***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***profile.created_at***REMOVED***||***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***updated_at:***REMOVED***profile.updated_at***REMOVED***||***REMOVED***new***REMOVED***Date().toISOString()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}));

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('Family***REMOVED***members***REMOVED***loaded:',***REMOVED***familyMembers.length);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setMembers(familyMembers);
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(err)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('Error***REMOVED***fetching***REMOVED***family***REMOVED***members:',***REMOVED***err);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setError(err***REMOVED***instanceof***REMOVED***Error***REMOVED***?***REMOVED***err.message***REMOVED***:***REMOVED***'Une***REMOVED***erreur***REMOVED***est***REMOVED***survenue');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setMembers([]);
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***finally***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setIsLoading(false);
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***},***REMOVED***[]);

***REMOVED******REMOVED***useEffect(()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***fetchMembers();
***REMOVED******REMOVED***},***REMOVED***[fetchMembers]);

***REMOVED******REMOVED***const***REMOVED***addMember***REMOVED***=***REMOVED***useCallback(async***REMOVED***(memberData:***REMOVED***NewFamilyMember)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setError(null);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error:***REMOVED***insertError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.insert([
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id:***REMOVED***crypto.randomUUID(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***user_id:***REMOVED***crypto.randomUUID(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...memberData,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***updated_at:***REMOVED***new***REMOVED***Date().toISOString()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***])
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(insertError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***insertError;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***newMember:***REMOVED***FamilyMember***REMOVED***=***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id:***REMOVED***data.id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***first_name:***REMOVED***data.first_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***last_name:***REMOVED***data.last_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***email:***REMOVED***data.email,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***title:***REMOVED***(data.civilite***REMOVED***as***REMOVED***FamilyMember['title'])***REMOVED***||***REMOVED***'Fils',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***birth_date:***REMOVED***data.birth_date,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***birth_place:***REMOVED***data.birth_place,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***current_location:***REMOVED***data.current_location,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***situation:***REMOVED***data.situation,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***avatar_url:***REMOVED***data.avatar_url,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***phone:***REMOVED***data.phone,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***profession:***REMOVED***data.profession,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***relationship_type:***REMOVED***(data.relationship_type***REMOVED***as***REMOVED***FamilyMember['relationship_type'])***REMOVED***||***REMOVED***'fils',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***father_name:***REMOVED***data.father_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***mother_name:***REMOVED***data.mother_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***spouse_name:***REMOVED***'',***REMOVED***//***REMOVED***Default***REMOVED***empty***REMOVED***string
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_admin:***REMOVED***data.is_admin***REMOVED***||***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_patriarch:***REMOVED***data.is_patriarch***REMOVED***||***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***civilite:***REMOVED***data.civilite,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***father_id:***REMOVED***data.father_id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***mother_id:***REMOVED***data.mother_id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***photo_url:***REMOVED***data.photo_url,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***data.created_at,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***updated_at:***REMOVED***data.updated_at
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***};

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setMembers(prev***REMOVED***=>***REMOVED***[...prev,***REMOVED***newMember]);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***newMember;
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(err)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setError(err***REMOVED***instanceof***REMOVED***Error***REMOVED***?***REMOVED***err.message***REMOVED***:***REMOVED***'Une***REMOVED***erreur***REMOVED***est***REMOVED***survenue');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('Erreur***REMOVED***lors***REMOVED***de***REMOVED***l\'ajout***REMOVED***du***REMOVED***membre:',***REMOVED***err);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***err;
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***},***REMOVED***[]);

***REMOVED******REMOVED***const***REMOVED***updateMember***REMOVED***=***REMOVED***useCallback(async***REMOVED***(id:***REMOVED***string,***REMOVED***memberData:***REMOVED***Partial<FamilyMember>)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setError(null);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error:***REMOVED***updateError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.update({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...memberData,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***updated_at:***REMOVED***new***REMOVED***Date().toISOString()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***})
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('id',***REMOVED***id)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(updateError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***updateError;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***updatedMember:***REMOVED***FamilyMember***REMOVED***=***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id:***REMOVED***data.id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***first_name:***REMOVED***data.first_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***last_name:***REMOVED***data.last_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***email:***REMOVED***data.email,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***title:***REMOVED***(data.civilite***REMOVED***as***REMOVED***FamilyMember['title'])***REMOVED***||***REMOVED***'Fils',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***birth_date:***REMOVED***data.birth_date,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***birth_place:***REMOVED***data.birth_place,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***current_location:***REMOVED***data.current_location,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***situation:***REMOVED***data.situation,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***avatar_url:***REMOVED***data.avatar_url,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***phone:***REMOVED***data.phone,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***profession:***REMOVED***data.profession,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***relationship_type:***REMOVED***(data.relationship_type***REMOVED***as***REMOVED***FamilyMember['relationship_type'])***REMOVED***||***REMOVED***'fils',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***father_name:***REMOVED***data.father_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***mother_name:***REMOVED***data.mother_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***spouse_name:***REMOVED***data.spouse_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_admin:***REMOVED***data.is_admin***REMOVED***||***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_patriarch:***REMOVED***data.is_patriarch***REMOVED***||***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***civilite:***REMOVED***data.civilite,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***father_id:***REMOVED***data.father_id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***mother_id:***REMOVED***data.mother_id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***photo_url:***REMOVED***data.photo_url,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***data.created_at,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***updated_at:***REMOVED***data.updated_at
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***};

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setMembers(prev***REMOVED***=>***REMOVED***prev.map(member***REMOVED***=>***REMOVED***member.id***REMOVED***===***REMOVED***id***REMOVED***?***REMOVED***updatedMember***REMOVED***:***REMOVED***member));
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***updatedMember;
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(err)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setError(err***REMOVED***instanceof***REMOVED***Error***REMOVED***?***REMOVED***err.message***REMOVED***:***REMOVED***'Une***REMOVED***erreur***REMOVED***est***REMOVED***survenue');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***mise***REMOVED***à***REMOVED***jour***REMOVED***du***REMOVED***membre:',***REMOVED***err);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***err;
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***},***REMOVED***[]);

***REMOVED******REMOVED***const***REMOVED***deleteMember***REMOVED***=***REMOVED***useCallback(async***REMOVED***(id:***REMOVED***string)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setError(null);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***error:***REMOVED***deleteError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.delete()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('id',***REMOVED***id);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(deleteError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***deleteError;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setMembers(prev***REMOVED***=>***REMOVED***prev.filter(member***REMOVED***=>***REMOVED***member.id***REMOVED***!==***REMOVED***id));
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(err)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setError(err***REMOVED***instanceof***REMOVED***Error***REMOVED***?***REMOVED***err.message***REMOVED***:***REMOVED***'Une***REMOVED***erreur***REMOVED***est***REMOVED***survenue');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***suppression***REMOVED***du***REMOVED***membre:',***REMOVED***err);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***err;
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***},***REMOVED***[]);

***REMOVED******REMOVED***const***REMOVED***updateParentChildRelationship***REMOVED***=***REMOVED***useCallback(async***REMOVED***(childId:***REMOVED***string,***REMOVED***parentId:***REMOVED***string***REMOVED***|***REMOVED***null,***REMOVED***isFather:***REMOVED***boolean)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setError(null);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error:***REMOVED***updateError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.update({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***[isFather***REMOVED***?***REMOVED***'father_id'***REMOVED***:***REMOVED***'mother_id']:***REMOVED***parentId,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***updated_at:***REMOVED***new***REMOVED***Date().toISOString()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***})
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('id',***REMOVED***childId)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(updateError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***updateError;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***updatedMember:***REMOVED***FamilyMember***REMOVED***=***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id:***REMOVED***data.id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***first_name:***REMOVED***data.first_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***last_name:***REMOVED***data.last_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***email:***REMOVED***data.email,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***title:***REMOVED***(data.civilite***REMOVED***as***REMOVED***FamilyMember['title'])***REMOVED***||***REMOVED***'Fils',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***birth_date:***REMOVED***data.birth_date,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***birth_place:***REMOVED***data.birth_place,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***current_location:***REMOVED***data.current_location,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***situation:***REMOVED***data.situation,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***avatar_url:***REMOVED***data.avatar_url,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***phone:***REMOVED***data.phone,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***profession:***REMOVED***data.profession,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***relationship_type:***REMOVED***(data.relationship_type***REMOVED***as***REMOVED***FamilyMember['relationship_type'])***REMOVED***||***REMOVED***'fils',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***father_name:***REMOVED***data.father_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***mother_name:***REMOVED***data.mother_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***spouse_name:***REMOVED***data.spouse_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_admin:***REMOVED***data.is_admin***REMOVED***||***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_patriarch:***REMOVED***data.is_patriarch***REMOVED***||***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***civilite:***REMOVED***data.civilite,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***father_id:***REMOVED***data.father_id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***mother_id:***REMOVED***data.mother_id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***photo_url:***REMOVED***data.photo_url,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***data.created_at,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***updated_at:***REMOVED***data.updated_at
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***};

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setMembers(prev***REMOVED***=>***REMOVED***prev.map(member***REMOVED***=>***REMOVED***member.id***REMOVED***===***REMOVED***childId***REMOVED***?***REMOVED***updatedMember***REMOVED***:***REMOVED***member));
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***updatedMember;
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(err)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setError(err***REMOVED***instanceof***REMOVED***Error***REMOVED***?***REMOVED***err.message***REMOVED***:***REMOVED***'Une***REMOVED***erreur***REMOVED***est***REMOVED***survenue');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***mise***REMOVED***à***REMOVED***jour***REMOVED***de***REMOVED***la***REMOVED***relation***REMOVED***parent-enfant:',***REMOVED***err);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***err;
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***},***REMOVED***[]);

***REMOVED******REMOVED***return***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***members,
***REMOVED******REMOVED******REMOVED******REMOVED***isLoading,
***REMOVED******REMOVED******REMOVED******REMOVED***error,
***REMOVED******REMOVED******REMOVED******REMOVED***fetchMembers,
***REMOVED******REMOVED******REMOVED******REMOVED***addMember,
***REMOVED******REMOVED******REMOVED******REMOVED***updateMember,
***REMOVED******REMOVED******REMOVED******REMOVED***deleteMember,
***REMOVED******REMOVED******REMOVED******REMOVED***updateParentChildRelationship
***REMOVED******REMOVED***};
};
