import***REMOVED***{***REMOVED***supabase***REMOVED***}***REMOVED***from***REMOVED***'@/integrations/supabase/client';
import***REMOVED***{***REMOVED***ProfileData,***REMOVED***FamilyMember,***REMOVED***FamilyTree,***REMOVED***Relationship,***REMOVED***Message,***REMOVED***Notification***REMOVED***}***REMOVED***from***REMOVED***'@/types/profile';

export***REMOVED***const***REMOVED***api***REMOVED***=***REMOVED***{
***REMOVED******REMOVED***profiles:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***create(profileData:***REMOVED***Omit<ProfileData,***REMOVED***'id'***REMOVED***|***REMOVED***'created_at'***REMOVED***|***REMOVED***'updated_at'>)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.insert({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...profileData,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***updated_at:***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***})
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data***REMOVED***as***REMOVED***ProfileData;
***REMOVED******REMOVED******REMOVED******REMOVED***},

***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***createProfile(profileData:***REMOVED***ProfileData)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.upsert({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...profileData,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***profileData.created_at***REMOVED***||***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***updated_at:***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***})
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data***REMOVED***as***REMOVED***ProfileData;
***REMOVED******REMOVED******REMOVED******REMOVED***},

***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***update(id:***REMOVED***string,***REMOVED***updates:***REMOVED***Partial<ProfileData>)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.update({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...updates,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***updated_at:***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***})
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('id',***REMOVED***id)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data***REMOVED***as***REMOVED***ProfileData;
***REMOVED******REMOVED******REMOVED******REMOVED***},

***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***getCurrent()***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***{***REMOVED***user***REMOVED***}***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase.auth.getUser();
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!user)***REMOVED***throw***REMOVED***new***REMOVED***Error('Utilisateur***REMOVED***non***REMOVED***authentifié');

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('*')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('user_id',***REMOVED***user.id)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data***REMOVED***as***REMOVED***ProfileData;
***REMOVED******REMOVED******REMOVED******REMOVED***},

***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***getById(id:***REMOVED***string)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('*')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('id',***REMOVED***id)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data***REMOVED***as***REMOVED***ProfileData;
***REMOVED******REMOVED******REMOVED******REMOVED***},

***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***getAll()***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('*')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.order('created_at',***REMOVED***{***REMOVED***ascending:***REMOVED***false***REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data***REMOVED***as***REMOVED***ProfileData[];
***REMOVED******REMOVED******REMOVED******REMOVED***},

***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***delete(id:***REMOVED***string)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.delete()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('id',***REMOVED***id);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED***},

***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***uploadAvatar(userId:***REMOVED***string,***REMOVED***file:***REMOVED***File)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***fileExt***REMOVED***=***REMOVED***file.name.split('.').pop();
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***filePath***REMOVED***=***REMOVED***`${userId}/${Date.now()}.${fileExt}`;

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***error:***REMOVED***uploadError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase.storage
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('avatars')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.upload(filePath,***REMOVED***file);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(uploadError)***REMOVED***throw***REMOVED***uploadError;

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data***REMOVED***}***REMOVED***=***REMOVED***supabase.storage
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('avatars')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.getPublicUrl(filePath);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data.publicUrl;
***REMOVED******REMOVED******REMOVED******REMOVED***},

***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***search(query:***REMOVED***string,***REMOVED***limit:***REMOVED***number***REMOVED***=***REMOVED***10)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('*')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%,profession.ilike.%${query}%,current_location.ilike.%${query}%`)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.limit(limit);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data***REMOVED***as***REMOVED***ProfileData[];
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***},

***REMOVED******REMOVED***familyMembers:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***create(memberData:***REMOVED***Omit<FamilyMember,***REMOVED***'id'***REMOVED***|***REMOVED***'created_at'***REMOVED***|***REMOVED***'updated_at'>)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('family_members')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.insert({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...memberData,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***updated_at:***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***})
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data***REMOVED***as***REMOVED***FamilyMember;
***REMOVED******REMOVED******REMOVED******REMOVED***},

***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***getByTreeId(treeId:***REMOVED***number)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('family_members')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select(`
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED****,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***profiles***REMOVED***(*)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***`)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('tree_id',***REMOVED***treeId);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data;
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***},

***REMOVED******REMOVED***familyTrees:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***create(treeData:***REMOVED***Omit<FamilyTree,***REMOVED***'id'***REMOVED***|***REMOVED***'created_at'***REMOVED***|***REMOVED***'updated_at'>)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('family_trees')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.insert({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...treeData,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***updated_at:***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***})
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data***REMOVED***as***REMOVED***FamilyTree;
***REMOVED******REMOVED******REMOVED******REMOVED***},

***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***getAll()***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('family_trees')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('*')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.order('created_at',***REMOVED***{***REMOVED***ascending:***REMOVED***false***REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data***REMOVED***as***REMOVED***FamilyTree[];
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***},

***REMOVED******REMOVED***relationships:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***create(relationshipData:***REMOVED***Omit<Relationship,***REMOVED***'id'***REMOVED***|***REMOVED***'created_at'***REMOVED***|***REMOVED***'updated_at'>)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('relationships')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.insert({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...relationshipData,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***updated_at:***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***})
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data***REMOVED***as***REMOVED***Relationship;
***REMOVED******REMOVED******REMOVED******REMOVED***},

***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***getByPersonId(personId:***REMOVED***string)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('relationships')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('*')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.or(`person1_id.eq.${personId},person2_id.eq.${personId}`);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data***REMOVED***as***REMOVED***Relationship[];
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***},

***REMOVED******REMOVED***messages:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***create(messageData:***REMOVED***Omit<Message,***REMOVED***'id'***REMOVED***|***REMOVED***'created_at'>)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('messages')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.insert({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...messageData,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***})
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data***REMOVED***as***REMOVED***Message;
***REMOVED******REMOVED******REMOVED******REMOVED***},

***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***getAll()***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('messages')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select(`
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED****,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***profiles***REMOVED***(first_name,***REMOVED***last_name,***REMOVED***avatar_url)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***`)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.order('created_at',***REMOVED***{***REMOVED***ascending:***REMOVED***false***REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data;
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***},

***REMOVED******REMOVED***notifications:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***create(notificationData:***REMOVED***Omit<Notification,***REMOVED***'id'***REMOVED***|***REMOVED***'created_at'>)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('notifications')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.insert({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...notificationData,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***})
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data***REMOVED***as***REMOVED***Notification;
***REMOVED******REMOVED******REMOVED******REMOVED***},

***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***getByUserId(userId:***REMOVED***string)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('notifications')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('*')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('user_id',***REMOVED***userId)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.order('created_at',***REMOVED***{***REMOVED***ascending:***REMOVED***false***REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data***REMOVED***as***REMOVED***Notification[];
***REMOVED******REMOVED******REMOVED******REMOVED***},

***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***markAsRead(id:***REMOVED***string)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('notifications')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.update({***REMOVED***read:***REMOVED***true***REMOVED***})
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('id',***REMOVED***id);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***},

***REMOVED******REMOVED***admin:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***deleteAllUsers(deleteCode:***REMOVED***string)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(deleteCode***REMOVED***!==***REMOVED***'1432')***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***{***REMOVED***success:***REMOVED***false,***REMOVED***message:***REMOVED***'Code***REMOVED***secret***REMOVED***incorrect'***REMOVED***};
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase.functions.invoke('delete-all-data',***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***method:***REMOVED***'POST'
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***success:***REMOVED***true,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***message:***REMOVED***'Suppression***REMOVED***réussie',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***deletedUsers:***REMOVED***data?.deletedUsers***REMOVED***||***REMOVED***0,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***stats:***REMOVED***data
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***};
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***success:***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***message:***REMOVED***error***REMOVED***instanceof***REMOVED***Error***REMOVED***?***REMOVED***error.message***REMOVED***:***REMOVED***'Erreur***REMOVED***inconnue'
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***};
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***}
};
