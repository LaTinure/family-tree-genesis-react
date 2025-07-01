
import***REMOVED***{***REMOVED***supabase***REMOVED***}***REMOVED***from***REMOVED***'@/integrations/supabase/client';
import***REMOVED***{***REMOVED***FamilyMember,***REMOVED***NewFamilyMember,***REMOVED***FamilyNotification***REMOVED***}***REMOVED***from***REMOVED***'@/types/family';

export***REMOVED***const***REMOVED***familyApi***REMOVED***=***REMOVED***{
***REMOVED******REMOVED***async***REMOVED***getAll():***REMOVED***Promise<FamilyMember[]>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('*')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.order('created_at',***REMOVED***{***REMOVED***ascending:***REMOVED***false***REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***(data***REMOVED***||***REMOVED***[]).map(profile***REMOVED***=>***REMOVED***({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id:***REMOVED***profile.id***REMOVED***||***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***user_id:***REMOVED***profile.user_id***REMOVED***||***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***first_name:***REMOVED***profile.first_name***REMOVED***||***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***last_name:***REMOVED***profile.last_name***REMOVED***||***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***email:***REMOVED***profile.email***REMOVED***||***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***civilite:***REMOVED***(profile.civilite***REMOVED***as***REMOVED***'M.'***REMOVED***|***REMOVED***'Mme')***REMOVED***||***REMOVED***'M.',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***phone:***REMOVED***profile.phone***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***profession:***REMOVED***profile.profession***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***current_location:***REMOVED***profile.current_location***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***birth_place:***REMOVED***profile.birth_place***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***birth_date:***REMOVED***profile.birth_date***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***avatar_url:***REMOVED***profile.avatar_url***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***photo_url:***REMOVED***profile.photo_url***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***relationship_type:***REMOVED***(profile.relationship_type***REMOVED***as***REMOVED***any)***REMOVED***||***REMOVED***'fils',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***father_id:***REMOVED***profile.father_id***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***mother_id:***REMOVED***profile.mother_id***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***father_name:***REMOVED***profile.father_name***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***mother_name:***REMOVED***profile.mother_name***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***spouse_name:***REMOVED***'',***REMOVED***//***REMOVED***Default***REMOVED***value
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_admin:***REMOVED***profile.is_admin***REMOVED***||***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_patriarch:***REMOVED***profile.is_patriarch***REMOVED***||***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_parent:***REMOVED***profile.is_parent***REMOVED***||***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***situation:***REMOVED***profile.situation***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***role:***REMOVED***(profile.role_radio***REMOVED***as***REMOVED***any)***REMOVED***||***REMOVED***'Membre',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***profile.created_at***REMOVED***||***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***updated_at:***REMOVED***profile.updated_at***REMOVED***||***REMOVED***new***REMOVED***Date().toISOString()
***REMOVED******REMOVED******REMOVED******REMOVED***}));
***REMOVED******REMOVED***},

***REMOVED******REMOVED***async***REMOVED***getCurrent():***REMOVED***Promise<FamilyMember>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***{***REMOVED***user***REMOVED***}***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase.auth.getUser();
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!user)***REMOVED***throw***REMOVED***new***REMOVED***Error('Not***REMOVED***authenticated');

***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('*')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('user_id',***REMOVED***user.id)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id:***REMOVED***data.id***REMOVED***||***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***user_id:***REMOVED***data.user_id***REMOVED***||***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***first_name:***REMOVED***data.first_name***REMOVED***||***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***last_name:***REMOVED***data.last_name***REMOVED***||***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***email:***REMOVED***data.email***REMOVED***||***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***civilite:***REMOVED***(data.civilite***REMOVED***as***REMOVED***'M.'***REMOVED***|***REMOVED***'Mme')***REMOVED***||***REMOVED***'M.',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***phone:***REMOVED***data.phone***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***profession:***REMOVED***data.profession***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***current_location:***REMOVED***data.current_location***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***birth_place:***REMOVED***data.birth_place***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***birth_date:***REMOVED***data.birth_date***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***avatar_url:***REMOVED***data.avatar_url***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***photo_url:***REMOVED***data.photo_url***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***relationship_type:***REMOVED***(data.relationship_type***REMOVED***as***REMOVED***any)***REMOVED***||***REMOVED***'fils',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***father_id:***REMOVED***data.father_id***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***mother_id:***REMOVED***data.mother_id***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***father_name:***REMOVED***data.father_name***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***mother_name:***REMOVED***data.mother_name***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***spouse_name:***REMOVED***'',***REMOVED***//***REMOVED***Default***REMOVED***value
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_admin:***REMOVED***data.is_admin***REMOVED***||***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_patriarch:***REMOVED***data.is_patriarch***REMOVED***||***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_parent:***REMOVED***data.is_parent***REMOVED***||***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***situation:***REMOVED***data.situation***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***role:***REMOVED***(data.role_radio***REMOVED***as***REMOVED***any)***REMOVED***||***REMOVED***'Membre',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***data.created_at***REMOVED***||***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***updated_at:***REMOVED***data.updated_at***REMOVED***||***REMOVED***new***REMOVED***Date().toISOString()
***REMOVED******REMOVED******REMOVED******REMOVED***};
***REMOVED******REMOVED***},

***REMOVED******REMOVED***async***REMOVED***create(memberData:***REMOVED***NewFamilyMember):***REMOVED***Promise<FamilyMember>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.insert([{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id:***REMOVED***crypto.randomUUID(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***user_id:***REMOVED***crypto.randomUUID(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***first_name:***REMOVED***memberData.first_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***last_name:***REMOVED***memberData.last_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***email:***REMOVED***memberData.email,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***civilite:***REMOVED***memberData.civilite,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***phone:***REMOVED***memberData.phone,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***profession:***REMOVED***memberData.profession,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***current_location:***REMOVED***memberData.current_location,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***birth_place:***REMOVED***memberData.birth_place,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***birth_date:***REMOVED***memberData.birth_date,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***avatar_url:***REMOVED***memberData.avatar_url,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***photo_url:***REMOVED***memberData.photo_url,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***relationship_type:***REMOVED***memberData.relationship_type,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***father_id:***REMOVED***memberData.father_id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***mother_id:***REMOVED***memberData.mother_id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***situation:***REMOVED***memberData.situation,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***role_radio:***REMOVED***memberData.role***REMOVED***||***REMOVED***'Membre',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_admin:***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_patriarch:***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_parent:***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***updated_at:***REMOVED***new***REMOVED***Date().toISOString()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}])
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id:***REMOVED***data.id***REMOVED***||***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***user_id:***REMOVED***data.user_id***REMOVED***||***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***first_name:***REMOVED***data.first_name***REMOVED***||***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***last_name:***REMOVED***data.last_name***REMOVED***||***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***email:***REMOVED***data.email***REMOVED***||***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***civilite:***REMOVED***(data.civilite***REMOVED***as***REMOVED***'M.'***REMOVED***|***REMOVED***'Mme')***REMOVED***||***REMOVED***'M.',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***phone:***REMOVED***data.phone***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***profession:***REMOVED***data.profession***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***current_location:***REMOVED***data.current_location***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***birth_place:***REMOVED***data.birth_place***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***birth_date:***REMOVED***data.birth_date***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***avatar_url:***REMOVED***data.avatar_url***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***photo_url:***REMOVED***data.photo_url***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***relationship_type:***REMOVED***(data.relationship_type***REMOVED***as***REMOVED***any)***REMOVED***||***REMOVED***'fils',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***father_id:***REMOVED***data.father_id***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***mother_id:***REMOVED***data.mother_id***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***father_name:***REMOVED***data.father_name***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***mother_name:***REMOVED***data.mother_name***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***spouse_name:***REMOVED***'',***REMOVED***//***REMOVED***Default***REMOVED***value
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_admin:***REMOVED***data.is_admin***REMOVED***||***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_patriarch:***REMOVED***data.is_patriarch***REMOVED***||***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_parent:***REMOVED***data.is_parent***REMOVED***||***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***situation:***REMOVED***data.situation***REMOVED***||***REMOVED***undefined,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***role:***REMOVED***(data.role_radio***REMOVED***as***REMOVED***any)***REMOVED***||***REMOVED***'Membre',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***data.created_at***REMOVED***||***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***updated_at:***REMOVED***data.updated_at***REMOVED***||***REMOVED***new***REMOVED***Date().toISOString()
***REMOVED******REMOVED******REMOVED******REMOVED***};
***REMOVED******REMOVED***},

***REMOVED******REMOVED***async***REMOVED***uploadAvatar(file:***REMOVED***File):***REMOVED***Promise<string>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***fileName***REMOVED***=***REMOVED***`${Date.now()}-${file.name}`;
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase.storage
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('avatars')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.upload(fileName,***REMOVED***file);

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;

***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***urlData***REMOVED***}***REMOVED***=***REMOVED***supabase.storage
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('avatars')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.getPublicUrl(fileName);

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***urlData.publicUrl;
***REMOVED******REMOVED***},

***REMOVED******REMOVED***async***REMOVED***createProfile(profileData:***REMOVED***any):***REMOVED***Promise<any>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***this.create(profileData);
***REMOVED******REMOVED***}
};

export***REMOVED***const***REMOVED***notificationApi***REMOVED***=***REMOVED***{
***REMOVED******REMOVED***async***REMOVED***getAll():***REMOVED***Promise<FamilyNotification[]>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('notifications')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('*')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.order('created_at',***REMOVED***{***REMOVED***ascending:***REMOVED***false***REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***(data***REMOVED***||***REMOVED***[]).map(notification***REMOVED***=>***REMOVED***({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...notification,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***family_id:***REMOVED***'default-family'***REMOVED***//***REMOVED***Valeur***REMOVED***par***REMOVED***défaut***REMOVED***pour***REMOVED***family_id
***REMOVED******REMOVED******REMOVED******REMOVED***}));
***REMOVED******REMOVED***},

***REMOVED******REMOVED***async***REMOVED***getByUserId(userId:***REMOVED***string):***REMOVED***Promise<FamilyNotification[]>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('notifications')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('*')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('user_id',***REMOVED***userId)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.order('created_at',***REMOVED***{***REMOVED***ascending:***REMOVED***false***REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***(data***REMOVED***||***REMOVED***[]).map(notification***REMOVED***=>***REMOVED***({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...notification,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***family_id:***REMOVED***'default-family'***REMOVED***//***REMOVED***Valeur***REMOVED***par***REMOVED***défaut***REMOVED***pour***REMOVED***family_id
***REMOVED******REMOVED******REMOVED******REMOVED***}));
***REMOVED******REMOVED***},

***REMOVED******REMOVED***async***REMOVED***markAsRead(id:***REMOVED***string):***REMOVED***Promise<void>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('notifications')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.update({***REMOVED***read:***REMOVED***true***REMOVED***})
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('id',***REMOVED***id);

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED***},

***REMOVED******REMOVED***async***REMOVED***create(notification:***REMOVED***Omit<FamilyNotification,***REMOVED***'id'***REMOVED***|***REMOVED***'created_at'>):***REMOVED***Promise<FamilyNotification>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('notifications')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.insert([{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***title:***REMOVED***notification.title,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***message:***REMOVED***notification.message,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***type:***REMOVED***notification.type,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***user_id:***REMOVED***notification.user_id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***read:***REMOVED***notification.read***REMOVED***||***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***new***REMOVED***Date().toISOString()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}])
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...data,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***family_id:***REMOVED***notification.family_id***REMOVED***||***REMOVED***'default-family'
***REMOVED******REMOVED******REMOVED******REMOVED***};
***REMOVED******REMOVED***}
};

//***REMOVED***Export***REMOVED***par***REMOVED***défaut***REMOVED***pour***REMOVED***compatibilité***REMOVED***avec***REMOVED***les***REMOVED***imports***REMOVED***existants
export***REMOVED***const***REMOVED***api***REMOVED***=***REMOVED***{
***REMOVED******REMOVED***profiles:***REMOVED***familyApi,
***REMOVED******REMOVED***notifications:***REMOVED***notificationApi
};

//***REMOVED***Exports***REMOVED***nommés***REMOVED***pour***REMOVED***maintenir***REMOVED***la***REMOVED***compatibilité
export***REMOVED***{***REMOVED***familyApi***REMOVED***as***REMOVED***default***REMOVED***};
