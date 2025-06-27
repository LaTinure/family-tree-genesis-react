//***REMOVED***Script***REMOVED***pour***REMOVED***vérifier***REMOVED***la***REMOVED***configuration***REMOVED***Supabase
import***REMOVED***{***REMOVED***createClient***REMOVED***}***REMOVED***from***REMOVED***'@supabase/supabase-js';

//***REMOVED***Remplacez***REMOVED***par***REMOVED***vos***REMOVED***vraies***REMOVED***clés***REMOVED***Supabase
const***REMOVED***supabaseUrl***REMOVED***=***REMOVED***process.env.VITE_SUPABASE_URL***REMOVED***||***REMOVED***'https://your-project.supabase.co';
const***REMOVED***supabaseKey***REMOVED***=***REMOVED***process.env.VITE_SUPABASE_ANON_KEY***REMOVED***||***REMOVED***'your-anon-key';

console.log('🔍***REMOVED***Configuration***REMOVED***Supabase:');
console.log('URL:',***REMOVED***supabaseUrl);
console.log('Clé***REMOVED***anonyme:',***REMOVED***supabaseKey.substring(0,***REMOVED***20)***REMOVED***+***REMOVED***'...');

const***REMOVED***supabase***REMOVED***=***REMOVED***createClient(supabaseUrl,***REMOVED***supabaseKey);

async***REMOVED***function***REMOVED***checkSupabaseConfig()***REMOVED***{
***REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***console.log('\n🔐***REMOVED***Test***REMOVED***de***REMOVED***connexion***REMOVED***Supabase...');

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Test***REMOVED***1:***REMOVED***Vérifier***REMOVED***la***REMOVED***connexion***REMOVED***de***REMOVED***base
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***testData,***REMOVED***error:***REMOVED***testError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('count')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.limit(1);

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(testError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('❌***REMOVED***Erreur***REMOVED***de***REMOVED***connexion:',***REMOVED***testError);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return;
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***console.log('✅***REMOVED***Connexion***REMOVED***Supabase***REMOVED***réussie');

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Test***REMOVED***2:***REMOVED***Vérifier***REMOVED***l'état***REMOVED***de***REMOVED***l'authentification
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***{***REMOVED***user***REMOVED***},***REMOVED***error:***REMOVED***authError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase.auth.getUser();

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(authError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('⚠️***REMOVED***Erreur***REMOVED***d\'authentification:',***REMOVED***authError.message);
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***else***REMOVED***if***REMOVED***(user)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('✅***REMOVED***Utilisateur***REMOVED***authentifié:',***REMOVED***user.email);
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***else***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('ℹ️***REMOVED***Aucun***REMOVED***utilisateur***REMOVED***authentifié');
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Test***REMOVED***3:***REMOVED***Récupérer***REMOVED***les***REMOVED***profils
***REMOVED******REMOVED******REMOVED******REMOVED***console.log('\n📊***REMOVED***Récupération***REMOVED***des***REMOVED***profils...');
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***profiles,***REMOVED***error:***REMOVED***profilesError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('*')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.order('created_at',***REMOVED***{***REMOVED***ascending:***REMOVED***false***REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(profilesError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('❌***REMOVED***Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***récupération***REMOVED***des***REMOVED***profils:',***REMOVED***profilesError);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('💡***REMOVED***Cela***REMOVED***peut***REMOVED***être***REMOVED***dû***REMOVED***à***REMOVED***des***REMOVED***permissions***REMOVED***RLS***REMOVED***(Row***REMOVED***Level***REMOVED***Security)');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return;
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***console.log('✅***REMOVED***Profils***REMOVED***récupérés***REMOVED***avec***REMOVED***succès');
***REMOVED******REMOVED******REMOVED******REMOVED***console.log('📈***REMOVED***Nombre***REMOVED***de***REMOVED***profils:',***REMOVED***profiles?.length***REMOVED***||***REMOVED***0);

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(profiles***REMOVED***&&***REMOVED***profiles.length***REMOVED***>***REMOVED***0)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('\n👥***REMOVED***Détails***REMOVED***des***REMOVED***profils:');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***profiles.forEach((profile,***REMOVED***index)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log(`${index***REMOVED***+***REMOVED***1}.***REMOVED***${profile.first_name}***REMOVED***${profile.last_name}`);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log(`***REMOVED******REMOVED******REMOVED***Email:***REMOVED***${profile.email}`);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log(`***REMOVED******REMOVED******REMOVED***ID:***REMOVED***${profile.id}`);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log(`***REMOVED******REMOVED******REMOVED***Rôle:***REMOVED***${profile.role_radio}`);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log(`***REMOVED******REMOVED******REMOVED***Patriarche:***REMOVED***${profile.is_patriarch}`);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log(`***REMOVED******REMOVED******REMOVED***Admin:***REMOVED***${profile.is_admin}`);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('---');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***else***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('⚠️***REMOVED***Aucun***REMOVED***profil***REMOVED***trouvé***REMOVED***dans***REMOVED***la***REMOVED***base***REMOVED***de***REMOVED***données');
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Test***REMOVED***4:***REMOVED***Vérifier***REMOVED***les***REMOVED***politiques***REMOVED***RLS
***REMOVED******REMOVED******REMOVED******REMOVED***console.log('\n🔒***REMOVED***Vérification***REMOVED***des***REMOVED***politiques***REMOVED***RLS...');
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***policies,***REMOVED***error:***REMOVED***policiesError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.rpc('get_policies',***REMOVED***{***REMOVED***table_name:***REMOVED***'profiles'***REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(policiesError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('⚠️***REMOVED***Impossible***REMOVED***de***REMOVED***récupérer***REMOVED***les***REMOVED***politiques***REMOVED***RLS');
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***else***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('📋***REMOVED***Politiques***REMOVED***RLS***REMOVED***pour***REMOVED***la***REMOVED***table***REMOVED***profiles:');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log(policies);
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***console.error('❌***REMOVED***Erreur***REMOVED***générale:',***REMOVED***error);
***REMOVED******REMOVED***}
}

checkSupabaseConfig();
