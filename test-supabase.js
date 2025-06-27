const***REMOVED***{***REMOVED***createClient***REMOVED***}***REMOVED***=***REMOVED***require('@supabase/supabase-js');

//***REMOVED***Configuration***REMOVED***Supabase***REMOVED***(remplacez***REMOVED***par***REMOVED***vos***REMOVED***vraies***REMOVED***clés)
const***REMOVED***supabaseUrl***REMOVED***=***REMOVED***'https://your-project.supabase.co';
const***REMOVED***supabaseKey***REMOVED***=***REMOVED***'your-anon-key';

const***REMOVED***supabase***REMOVED***=***REMOVED***createClient(supabaseUrl,***REMOVED***supabaseKey);

async***REMOVED***function***REMOVED***testSupabaseConnection()***REMOVED***{
***REMOVED******REMOVED***console.log('🔍***REMOVED***Test***REMOVED***de***REMOVED***connexion***REMOVED***Supabase...');

***REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Test***REMOVED***1:***REMOVED***Vérifier***REMOVED***la***REMOVED***connexion
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***testData,***REMOVED***error:***REMOVED***testError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('count')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.limit(1);

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(testError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('❌***REMOVED***Erreur***REMOVED***de***REMOVED***connexion:',***REMOVED***testError);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return;
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***console.log('✅***REMOVED***Connexion***REMOVED***Supabase***REMOVED***réussie');

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Test***REMOVED***2:***REMOVED***Récupérer***REMOVED***tous***REMOVED***les***REMOVED***profils
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***profiles,***REMOVED***error:***REMOVED***profilesError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('*')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.order('created_at',***REMOVED***{***REMOVED***ascending:***REMOVED***false***REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(profilesError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('❌***REMOVED***Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***récupération***REMOVED***des***REMOVED***profils:',***REMOVED***profilesError);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return;
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***console.log('📊***REMOVED***Profils***REMOVED***trouvés:',***REMOVED***profiles?.length***REMOVED***||***REMOVED***0);

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(profiles***REMOVED***&&***REMOVED***profiles.length***REMOVED***>***REMOVED***0)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('👥***REMOVED***Détails***REMOVED***des***REMOVED***profils:');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***profiles.forEach((profile,***REMOVED***index)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log(`${index***REMOVED***+***REMOVED***1}.***REMOVED***${profile.first_name}***REMOVED***${profile.last_name}***REMOVED***(${profile.email})`);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log(`***REMOVED******REMOVED******REMOVED***-***REMOVED***ID:***REMOVED***${profile.id}`);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log(`***REMOVED******REMOVED******REMOVED***-***REMOVED***Rôle:***REMOVED***${profile.role_radio}`);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log(`***REMOVED******REMOVED******REMOVED***-***REMOVED***Patriarche:***REMOVED***${profile.is_patriarch}`);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log(`***REMOVED******REMOVED******REMOVED***-***REMOVED***Admin:***REMOVED***${profile.is_admin}`);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('---');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***else***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('⚠️***REMOVED***Aucun***REMOVED***profil***REMOVED***trouvé***REMOVED***dans***REMOVED***la***REMOVED***base***REMOVED***de***REMOVED***données');
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***console.error('❌***REMOVED***Erreur***REMOVED***générale:',***REMOVED***error);
***REMOVED******REMOVED***}
}

testSupabaseConnection();
