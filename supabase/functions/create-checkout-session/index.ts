import***REMOVED***{***REMOVED***serve***REMOVED***}***REMOVED***from***REMOVED***"https://deno.land/std@0.168.0/http/server.ts"
import***REMOVED***{***REMOVED***createClient***REMOVED***}***REMOVED***from***REMOVED***'https://esm.sh/@supabase/supabase-js@2'
import***REMOVED***Stripe***REMOVED***from***REMOVED***'https://esm.sh/stripe@12.0.0'

const***REMOVED***stripe***REMOVED***=***REMOVED***new***REMOVED***Stripe(Deno.env.get('STRIPE_SECRET_KEY')!,***REMOVED***{
***REMOVED******REMOVED***apiVersion:***REMOVED***'2023-10-16',
})

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
***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Vérifier***REMOVED***l'authentification
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***authHeader***REMOVED***=***REMOVED***req.headers.get('Authorization')!
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***supabase***REMOVED***=***REMOVED***createClient(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Deno.env.get('SUPABASE_URL')***REMOVED***??***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Deno.env.get('SUPABASE_ANON_KEY')***REMOVED***??***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{***REMOVED***global:***REMOVED***{***REMOVED***headers:***REMOVED***{***REMOVED***Authorization:***REMOVED***authHeader***REMOVED***}***REMOVED***}***REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***)

***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***{***REMOVED***user***REMOVED***},***REMOVED***error:***REMOVED***authError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase.auth.getUser()

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(authError***REMOVED***||***REMOVED***!user)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***JSON.stringify({***REMOVED***error:***REMOVED***'Non***REMOVED***autorisé'***REMOVED***}),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***401,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***...corsHeaders,***REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Récupérer***REMOVED***les***REMOVED***données***REMOVED***de***REMOVED***la***REMOVED***requête
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***successUrl,***REMOVED***cancelUrl,***REMOVED***customAmount***REMOVED***=***REMOVED***500***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***req.json()

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Créer***REMOVED***la***REMOVED***session***REMOVED***Stripe
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***session***REMOVED***=***REMOVED***await***REMOVED***stripe.checkout.sessions.create({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***payment_method_types:***REMOVED***['card'],
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***line_items:***REMOVED***[
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***price_data:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***currency:***REMOVED***'eur',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***product_data:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***name:***REMOVED***'Création***REMOVED***de***REMOVED***Dynastie',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***'Accès***REMOVED***premium***REMOVED***pour***REMOVED***créer***REMOVED***et***REMOVED***gérer***REMOVED***votre***REMOVED***arbre***REMOVED***généalogique***REMOVED***familial',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***unit_amount:***REMOVED***customAmount,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***quantity:***REMOVED***1,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***],
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***mode:***REMOVED***'payment',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***success_url:***REMOVED***successUrl***REMOVED***||***REMOVED***`${req.headers.get('origin')}/dynasty/create?session_id={CHECKOUT_SESSION_ID}`,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***cancel_url:***REMOVED***cancelUrl***REMOVED***||***REMOVED***`${req.headers.get('origin')}/dynasty`,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***metadata:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***user_id:***REMOVED***user.id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***product_type:***REMOVED***'dynasty_creation',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***})

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***JSON.stringify({***REMOVED***sessionId:***REMOVED***session.id***REMOVED***}),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***200,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***...corsHeaders,***REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***)

***REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***console.error('Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***création***REMOVED***de***REMOVED***la***REMOVED***session:',***REMOVED***error)

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***JSON.stringify({***REMOVED***error:***REMOVED***'Erreur***REMOVED***interne***REMOVED***du***REMOVED***serveur'***REMOVED***}),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***500,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***...corsHeaders,***REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***)
***REMOVED******REMOVED***}
})
