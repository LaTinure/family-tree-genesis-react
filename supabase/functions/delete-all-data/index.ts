
import***REMOVED***{***REMOVED***serve***REMOVED***}***REMOVED***from***REMOVED***"https://deno.land/std@0.168.0/http/server.ts"
import***REMOVED***{***REMOVED***createClient***REMOVED***}***REMOVED***from***REMOVED***'https://esm.sh/@supabase/supabase-js@2'

const***REMOVED***corsHeaders***REMOVED***=***REMOVED***{
***REMOVED******REMOVED***'Access-Control-Allow-Origin':***REMOVED***'*',
***REMOVED******REMOVED***'Access-Control-Allow-Headers':***REMOVED***'authorization,***REMOVED***x-client-info,***REMOVED***apikey,***REMOVED***content-type',
}

serve(async***REMOVED***(req)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***if***REMOVED***(req.method***REMOVED***===***REMOVED***'OPTIONS')***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response('ok',***REMOVED***{***REMOVED***headers:***REMOVED***corsHeaders***REMOVED***})
***REMOVED******REMOVED***}

***REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***supabaseAdmin***REMOVED***=***REMOVED***createClient(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Deno.env.get('SUPABASE_URL')***REMOVED***??***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')***REMOVED***??***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***auth:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***autoRefreshToken:***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***persistSession:***REMOVED***false
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***)

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Supprimer***REMOVED***tous***REMOVED***les***REMOVED***enregistrements***REMOVED***des***REMOVED***tables***REMOVED***publiques
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***tables***REMOVED***=***REMOVED***[
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'family_members',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'relationships',***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'notifications',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'messages',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'profiles',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'family_trees',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'site_settings'
***REMOVED******REMOVED******REMOVED******REMOVED***]

***REMOVED******REMOVED******REMOVED******REMOVED***for***REMOVED***(const***REMOVED***table***REMOVED***of***REMOVED***tables)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabaseAdmin
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from(table)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.delete()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.neq('id',***REMOVED***'00000000-0000-0000-0000-000000000000')***REMOVED***//***REMOVED***Delete***REMOVED***all***REMOVED***records
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error(`Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***suppression***REMOVED***de***REMOVED***la***REMOVED***table***REMOVED***${table}:`,***REMOVED***error)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Supprimer***REMOVED***tous***REMOVED***les***REMOVED***utilisateurs***REMOVED***d'authentification
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***users,***REMOVED***error:***REMOVED***getUsersError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabaseAdmin.auth.admin.listUsers()
***REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(getUsersError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***récupération***REMOVED***des***REMOVED***utilisateurs:',***REMOVED***getUsersError)
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***else***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***for***REMOVED***(const***REMOVED***user***REMOVED***of***REMOVED***users.users)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***error:***REMOVED***deleteUserError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabaseAdmin.auth.admin.deleteUser(user.id)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(deleteUserError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error(`Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***suppression***REMOVED***de***REMOVED***l'utilisateur***REMOVED***${user.id}:`,***REMOVED***deleteUserError)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***JSON.stringify({***REMOVED***success:***REMOVED***true,***REMOVED***message:***REMOVED***'Toutes***REMOVED***les***REMOVED***données***REMOVED***ont***REMOVED***été***REMOVED***supprimées'***REMOVED***}),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***...corsHeaders,***REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***200,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***)
***REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***JSON.stringify({***REMOVED***error:***REMOVED***error.message***REMOVED***}),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***...corsHeaders,***REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***400,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***)
***REMOVED******REMOVED***}
})
