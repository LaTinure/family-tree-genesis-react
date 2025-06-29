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
***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Create***REMOVED***a***REMOVED***Supabase***REMOVED***client***REMOVED***with***REMOVED***the***REMOVED***Auth***REMOVED***context***REMOVED***of***REMOVED***the***REMOVED***function
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***supabaseClient***REMOVED***=***REMOVED***createClient(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Deno.env.get('SUPABASE_URL')***REMOVED***??***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Deno.env.get('SUPABASE_ANON_KEY')***REMOVED***??***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***global:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***Authorization:***REMOVED***req.headers.get('Authorization')!***REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***)

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Get***REMOVED***the***REMOVED***user***REMOVED***from***REMOVED***the***REMOVED***request
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***data:***REMOVED***{***REMOVED***user***REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***error:***REMOVED***userError,
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabaseClient.auth.getUser()

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(userError***REMOVED***||***REMOVED***!user)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***new***REMOVED***Error('Unauthorized')
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Check***REMOVED***if***REMOVED***user***REMOVED***is***REMOVED***admin***REMOVED***or***REMOVED***patriarch
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***profile,***REMOVED***error:***REMOVED***profileError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabaseClient
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('is_admin,***REMOVED***is_patriarch')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('user_id',***REMOVED***user.id)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single()

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(profileError***REMOVED***||***REMOVED***(!profile?.is_admin***REMOVED***&&***REMOVED***!profile?.is_patriarch))***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***new***REMOVED***Error('Insufficient***REMOVED***permissions')
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Delete***REMOVED***all***REMOVED***data***REMOVED***in***REMOVED***the***REMOVED***correct***REMOVED***order***REMOVED***to***REMOVED***respect***REMOVED***foreign***REMOVED***key***REMOVED***constraints
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***tablesToDelete***REMOVED***=***REMOVED***[
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'family_relations',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'family_messages',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'family_events',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'family_invitations',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'family_notifications',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'profiles'
***REMOVED******REMOVED******REMOVED******REMOVED***]

***REMOVED******REMOVED******REMOVED******REMOVED***for***REMOVED***(const***REMOVED***table***REMOVED***of***REMOVED***tablesToDelete)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabaseClient
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from(table)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.delete()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.neq('id',***REMOVED***'00000000-0000-0000-0000-000000000000')***REMOVED***//***REMOVED***Keep***REMOVED***at***REMOVED***least***REMOVED***one***REMOVED***record***REMOVED***if***REMOVED***needed

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error(`Error***REMOVED***deleting***REMOVED***from***REMOVED***${table}:`,***REMOVED***error)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***new***REMOVED***Error(`Failed***REMOVED***to***REMOVED***delete***REMOVED***from***REMOVED***${table}`)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***JSON.stringify({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***message:***REMOVED***'All***REMOVED***data***REMOVED***deleted***REMOVED***successfully',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***deletedTables:***REMOVED***tablesToDelete
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***...corsHeaders,***REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***200
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***)

***REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***console.error('Error***REMOVED***in***REMOVED***delete-all-data***REMOVED***function:',***REMOVED***error)

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***JSON.stringify({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***error:***REMOVED***error.message***REMOVED***||***REMOVED***'Internal***REMOVED***server***REMOVED***error'
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***...corsHeaders,***REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***error.message***REMOVED***===***REMOVED***'Unauthorized'***REMOVED***?***REMOVED***401***REMOVED***:
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***error.message***REMOVED***===***REMOVED***'Insufficient***REMOVED***permissions'***REMOVED***?***REMOVED***403***REMOVED***:***REMOVED***500
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***)
***REMOVED******REMOVED***}
})
