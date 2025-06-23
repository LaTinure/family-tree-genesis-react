
import***REMOVED***{***REMOVED***serve***REMOVED***}***REMOVED***from***REMOVED***"https://deno.land/std@0.168.0/http/server.ts"
import***REMOVED***{***REMOVED***createClient***REMOVED***}***REMOVED***from***REMOVED***'https://esm.sh/@supabase/supabase-js@2'

const***REMOVED***corsHeaders***REMOVED***=***REMOVED***{
***REMOVED******REMOVED***'Access-Control-Allow-Origin':***REMOVED***'*',
***REMOVED******REMOVED***'Access-Control-Allow-Headers':***REMOVED***'authorization,***REMOVED***x-client-info,***REMOVED***apikey,***REMOVED***content-type',
}

serve(async***REMOVED***(req)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***//***REMOVED***Handle***REMOVED***CORS***REMOVED***preflight***REMOVED***requests
***REMOVED******REMOVED***if***REMOVED***(req.method***REMOVED***===***REMOVED***'OPTIONS')***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response('ok',***REMOVED***{***REMOVED***headers:***REMOVED***corsHeaders***REMOVED***})
***REMOVED******REMOVED***}

***REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Create***REMOVED***a***REMOVED***Supabase***REMOVED***client***REMOVED***with***REMOVED***service***REMOVED***role***REMOVED***key***REMOVED***for***REMOVED***admin***REMOVED***operations
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***supabaseUrl***REMOVED***=***REMOVED***Deno.env.get('SUPABASE_URL')!
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***supabaseServiceKey***REMOVED***=***REMOVED***Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
***REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***supabaseAdmin***REMOVED***=***REMOVED***createClient(supabaseUrl,***REMOVED***supabaseServiceKey,***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***auth:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***autoRefreshToken:***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***persistSession:***REMOVED***false
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***})

***REMOVED******REMOVED******REMOVED******REMOVED***console.log('Début***REMOVED***de***REMOVED***la***REMOVED***suppression***REMOVED***des***REMOVED***données...')

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***1.***REMOVED***Supprimer***REMOVED***tous***REMOVED***les***REMOVED***utilisateurs***REMOVED***authentifiés
***REMOVED******REMOVED******REMOVED******REMOVED***console.log('Suppression***REMOVED***des***REMOVED***utilisateurs***REMOVED***auth...')
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***users,***REMOVED***error:***REMOVED***usersError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabaseAdmin.auth.admin.listUsers()
***REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(usersError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***new***REMOVED***Error(`Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***récupération***REMOVED***des***REMOVED***utilisateurs:***REMOVED***${usersError.message}`)
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(users***REMOVED***&&***REMOVED***users.users.length***REMOVED***>***REMOVED***0)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***for***REMOVED***(const***REMOVED***user***REMOVED***of***REMOVED***users.users)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***error:***REMOVED***deleteUserError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabaseAdmin.auth.admin.deleteUser(user.id)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(deleteUserError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error(`Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***suppression***REMOVED***de***REMOVED***l'utilisateur***REMOVED***${user.id}:`,***REMOVED***deleteUserError)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***else***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log(`Utilisateur***REMOVED***${user.id}***REMOVED***supprimé`)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***2.***REMOVED***Supprimer***REMOVED***les***REMOVED***données***REMOVED***des***REMOVED***tables***REMOVED***publiques***REMOVED***dans***REMOVED***l'ordre***REMOVED***correct***REMOVED***(à***REMOVED***cause***REMOVED***des***REMOVED***clés***REMOVED***étrangères)
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***tablesToDelete***REMOVED***=***REMOVED***[
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'family_members',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'relationships',***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'messages',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'notifications',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'profiles',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'family_trees',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'site_settings'
***REMOVED******REMOVED******REMOVED******REMOVED***]

***REMOVED******REMOVED******REMOVED******REMOVED***for***REMOVED***(const***REMOVED***table***REMOVED***of***REMOVED***tablesToDelete)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log(`Suppression***REMOVED***de***REMOVED***la***REMOVED***table***REMOVED***${table}...`)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabaseAdmin.from(table).delete().neq('id',***REMOVED***'impossible-id')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error(`Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***suppression***REMOVED***de***REMOVED***${table}:`,***REMOVED***error)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***else***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log(`Table***REMOVED***${table}***REMOVED***vidée***REMOVED***avec***REMOVED***succès`)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***console.log('Suppression***REMOVED***terminée***REMOVED***avec***REMOVED***succès')

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***JSON.stringify({***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***success:***REMOVED***true,***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***message:***REMOVED***'Toutes***REMOVED***les***REMOVED***données***REMOVED***ont***REMOVED***été***REMOVED***supprimées***REMOVED***avec***REMOVED***succès',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***deletedTables:***REMOVED***tablesToDelete.length,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***deletedUsers:***REMOVED***users?.users.length***REMOVED***||***REMOVED***0
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...corsHeaders,***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***)

***REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***console.error('Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***suppression:',***REMOVED***error)
***REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***JSON.stringify({***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***success:***REMOVED***false,***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***error:***REMOVED***error.message***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***500,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...corsHeaders,***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***)
***REMOVED******REMOVED***}
})
