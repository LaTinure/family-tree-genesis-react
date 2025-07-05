import***REMOVED***{***REMOVED***serve***REMOVED***}***REMOVED***from***REMOVED***"https://deno.land/std@0.168.0/http/server.ts";
import***REMOVED***{***REMOVED***createClient***REMOVED***}***REMOVED***from***REMOVED***'https://esm.sh/@supabase/supabase-js@2';
import***REMOVED***Stripe***REMOVED***from***REMOVED***'https://esm.sh/stripe@12.0.0';

const***REMOVED***stripe***REMOVED***=***REMOVED***new***REMOVED***Stripe('***REMOVED***',***REMOVED***{
***REMOVED******REMOVED***apiVersion:***REMOVED***'2023-10-16'
});

const***REMOVED***corsHeaders***REMOVED***=***REMOVED***{
***REMOVED******REMOVED***'Access-Control-Allow-Origin':***REMOVED***'*',
***REMOVED******REMOVED***'Access-Control-Allow-Headers':***REMOVED***'authorization,***REMOVED***x-client-info,***REMOVED***apikey,***REMOVED***content-type'
};

serve(async***REMOVED***(req)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***if***REMOVED***(req.method***REMOVED***===***REMOVED***'OPTIONS')***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response('ok',***REMOVED***{***REMOVED***headers:***REMOVED***corsHeaders***REMOVED***});
***REMOVED******REMOVED***}

***REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***authHeader***REMOVED***=***REMOVED***req.headers.get('Authorization');
***REMOVED******REMOVED******REMOVED******REMOVED***console.log("🔑***REMOVED***Authorization***REMOVED***header:",***REMOVED***authHeader);

***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***supabase***REMOVED***=***REMOVED***createClient(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Deno.env.get('SUPABASE_URL')***REMOVED***??***REMOVED***'https://aaxfvyorhasbwlaovrdf.supabase.co',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Deno.env.get('SUPABASE_ANON_KEY')***REMOVED***??***REMOVED***'***REMOVED***',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***global:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Authorization:***REMOVED***authHeader
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***);

***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***{***REMOVED***user***REMOVED***},***REMOVED***error:***REMOVED***authError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase.auth.getUser();
***REMOVED******REMOVED******REMOVED******REMOVED***console.log("👤***REMOVED***User***REMOVED***fetched:",***REMOVED***user);

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(authError***REMOVED***||***REMOVED***!user)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log("⛔***REMOVED***Auth***REMOVED***error:",***REMOVED***authError);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(JSON.stringify({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***error:***REMOVED***'Non***REMOVED***autorisé'
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}),***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***401,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...corsHeaders,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'Content-Type':***REMOVED***'application/json'
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***body***REMOVED***=***REMOVED***await***REMOVED***req.json();
***REMOVED******REMOVED******REMOVED******REMOVED***console.log("📦***REMOVED***Requête***REMOVED***JSON:",***REMOVED***body);

***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***successUrl,***REMOVED***cancelUrl,***REMOVED***customAmount***REMOVED***=***REMOVED***500,***REMOVED***user_id***REMOVED***}***REMOVED***=***REMOVED***body;

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Vérifier***REMOVED***que***REMOVED***l'utilisateur***REMOVED***n'a***REMOVED***pas***REMOVED***déjà***REMOVED***une***REMOVED***dynastie
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***existingProfile***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('dynasty_id')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('user_id',***REMOVED***user.id)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(existingProfile?.dynasty_id)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log("⚠️***REMOVED***User***REMOVED***a***REMOVED***déjà***REMOVED***une***REMOVED***dynastie:",***REMOVED***existingProfile.dynasty_id);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(JSON.stringify({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***error:***REMOVED***'Vous***REMOVED***possédez***REMOVED***déjà***REMOVED***une***REMOVED***dynastie'
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}),***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***400,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...corsHeaders,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'Content-Type':***REMOVED***'application/json'
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***session***REMOVED***=***REMOVED***await***REMOVED***stripe.checkout.sessions.create({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***payment_method_types:***REMOVED***['card'],
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***line_items:***REMOVED***[
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***price_data:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***currency:***REMOVED***'eur',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***product_data:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***name:***REMOVED***'Création***REMOVED***de***REMOVED***Dynastie',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***'Accès***REMOVED***premium***REMOVED***pour***REMOVED***créer***REMOVED***et***REMOVED***gérer***REMOVED***votre***REMOVED***arbre***REMOVED***généalogique***REMOVED***familial'
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***unit_amount:***REMOVED***customAmount
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***quantity:***REMOVED***1
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***],
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***mode:***REMOVED***'payment',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***success_url:***REMOVED***successUrl***REMOVED***||***REMOVED***`${req.headers.get('origin')}/dynasty/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***cancel_url:***REMOVED***cancelUrl***REMOVED***||***REMOVED***`${req.headers.get('origin')}/dynasty`,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***metadata:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***user_id:***REMOVED***user_id***REMOVED***||***REMOVED***user.id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***product_type:***REMOVED***'dynasty_creation',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***user_email:***REMOVED***user.email,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***session_id:***REMOVED***session.id***REMOVED***//***REMOVED***Ajouter***REMOVED***le***REMOVED***session_id***REMOVED***pour***REMOVED***debug
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED***console.log("✅***REMOVED***Session***REMOVED***Stripe***REMOVED***créée***REMOVED***:",***REMOVED***session.id);

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(JSON.stringify({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***sessionId:***REMOVED***session.id
***REMOVED******REMOVED******REMOVED******REMOVED***}),***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***200,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...corsHeaders,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'Content-Type':***REMOVED***'application/json'
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***console.error('🔥***REMOVED***Erreur***REMOVED***interne:',***REMOVED***error);
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(JSON.stringify({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***error:***REMOVED***'Erreur***REMOVED***interne***REMOVED***du***REMOVED***serveur'
***REMOVED******REMOVED******REMOVED******REMOVED***}),***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***500,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...corsHeaders,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'Content-Type':***REMOVED***'application/json'
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED***}
});
