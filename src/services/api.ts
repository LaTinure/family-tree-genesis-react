
import***REMOVED***{***REMOVED***ProfileData,***REMOVED***CreateProfileData,***REMOVED***UpdateProfileData***REMOVED***}***REMOVED***from***REMOVED***'@/types/profile';

//***REMOVED***Simulation***REMOVED***d'une***REMOVED***API***REMOVED***pour***REMOVED***les***REMOVED***profils
export***REMOVED***const***REMOVED***api***REMOVED***=***REMOVED***{
***REMOVED******REMOVED***profiles:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***createProfile(profileData:***REMOVED***CreateProfileData):***REMOVED***Promise<ProfileData>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('Creating***REMOVED***profile:',***REMOVED***profileData);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Simulation***REMOVED***de***REMOVED***création***REMOVED***de***REMOVED***profil
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...profileData,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id:***REMOVED***profileData.user_id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***updated_at:***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***};
***REMOVED******REMOVED******REMOVED******REMOVED***},

***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***updateProfile(userId:***REMOVED***string,***REMOVED***updates:***REMOVED***UpdateProfileData):***REMOVED***Promise<ProfileData>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('Updating***REMOVED***profile:',***REMOVED***userId,***REMOVED***updates);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Simulation***REMOVED***de***REMOVED***mise***REMOVED***à***REMOVED***jour***REMOVED***de***REMOVED***profil
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***new***REMOVED***Error('Profile***REMOVED***not***REMOVED***found');***REMOVED***//***REMOVED***Simulation***REMOVED***pour***REMOVED***déclencher***REMOVED***la***REMOVED***création
***REMOVED******REMOVED******REMOVED******REMOVED***},

***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***getProfileById(userId:***REMOVED***string):***REMOVED***Promise<ProfileData>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('Getting***REMOVED***profile***REMOVED***by***REMOVED***ID:',***REMOVED***userId);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Simulation***REMOVED***-***REMOVED***toujours***REMOVED***retourner***REMOVED***une***REMOVED***erreur***REMOVED***pour***REMOVED***déclencher***REMOVED***la***REMOVED***création
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***error***REMOVED***=***REMOVED***new***REMOVED***Error('Profile***REMOVED***not***REMOVED***found');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***(error***REMOVED***as***REMOVED***any).code***REMOVED***=***REMOVED***'PGRST116';
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***error;
***REMOVED******REMOVED******REMOVED******REMOVED***},

***REMOVED******REMOVED******REMOVED******REMOVED***async***REMOVED***getAllProfiles():***REMOVED***Promise<ProfileData[]>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('Getting***REMOVED***all***REMOVED***profiles');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***[];
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***},

***REMOVED******REMOVED***async***REMOVED***uploadAvatar(userId:***REMOVED***string,***REMOVED***file:***REMOVED***File):***REMOVED***Promise<string>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***console.log('Uploading***REMOVED***avatar***REMOVED***for***REMOVED***user:',***REMOVED***userId,***REMOVED***file);
***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Simulation***REMOVED***d'upload***REMOVED***d'avatar
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***URL.createObjectURL(file);
***REMOVED******REMOVED***}
};
