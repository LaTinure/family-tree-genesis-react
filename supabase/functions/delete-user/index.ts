import***REMOVED***{***REMOVED***serve***REMOVED***}***REMOVED***from***REMOVED***"https://deno.land/std@0.168.0/http/server.ts";
import***REMOVED***{***REMOVED***createClient***REMOVED***}***REMOVED***from***REMOVED***'https://esm.sh/@supabase/supabase-js@2';

serve(async***REMOVED***(req)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***if***REMOVED***(req.method***REMOVED***!==***REMOVED***'POST')***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response('Méthode***REMOVED***non***REMOVED***autorisée',***REMOVED***{***REMOVED***status:***REMOVED***405***REMOVED***});
***REMOVED******REMOVED***}

***REMOVED******REMOVED***const***REMOVED***authHeader***REMOVED***=***REMOVED***req.headers.get('Authorization');
***REMOVED******REMOVED***if***REMOVED***(!authHeader)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(JSON.stringify({***REMOVED***error:***REMOVED***'Non***REMOVED***autorisé'***REMOVED***}),***REMOVED***{***REMOVED***status:***REMOVED***401***REMOVED***});
***REMOVED******REMOVED***}

***REMOVED******REMOVED***const***REMOVED***supabase***REMOVED***=***REMOVED***createClient(
***REMOVED******REMOVED******REMOVED******REMOVED***Deno.env.get('SUPABASE_URL')!,
***REMOVED******REMOVED******REMOVED******REMOVED***Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
***REMOVED******REMOVED******REMOVED******REMOVED***{***REMOVED***global:***REMOVED***{***REMOVED***headers:***REMOVED***{***REMOVED***Authorization:***REMOVED***authHeader***REMOVED***}***REMOVED***}***REMOVED***}
***REMOVED******REMOVED***);

***REMOVED******REMOVED***//***REMOVED***Vérifier***REMOVED***l'utilisateur***REMOVED***courant
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***{***REMOVED***user***REMOVED***},***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase.auth.getUser();
***REMOVED******REMOVED***if***REMOVED***(error***REMOVED***||***REMOVED***!user)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(JSON.stringify({***REMOVED***error:***REMOVED***'Utilisateur***REMOVED***non***REMOVED***trouvé'***REMOVED***}),***REMOVED***{***REMOVED***status:***REMOVED***401***REMOVED***});
***REMOVED******REMOVED***}

***REMOVED******REMOVED***//***REMOVED***Supprimer***REMOVED***l'utilisateur
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***error:***REMOVED***deleteError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase.auth.admin.deleteUser(user.id);
***REMOVED******REMOVED***if***REMOVED***(deleteError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(JSON.stringify({***REMOVED***error:***REMOVED***'Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***suppression'***REMOVED***}),***REMOVED***{***REMOVED***status:***REMOVED***500***REMOVED***});
***REMOVED******REMOVED***}

***REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(JSON.stringify({***REMOVED***success:***REMOVED***true***REMOVED***}),***REMOVED***{***REMOVED***status:***REMOVED***200***REMOVED***});
});
