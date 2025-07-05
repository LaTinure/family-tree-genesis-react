import***REMOVED***{***REMOVED***serve***REMOVED***}***REMOVED***from***REMOVED***"https://deno.land/std@0.168.0/http/server.ts";
import***REMOVED***{***REMOVED***createClient***REMOVED***}***REMOVED***from***REMOVED***'https://esm.sh/@supabase/supabase-js@2';
import***REMOVED***Stripe***REMOVED***from***REMOVED***'https://esm.sh/stripe@12.0.0';
import***REMOVED***crypto***REMOVED***from***REMOVED***'node:crypto';

const***REMOVED***stripe***REMOVED***=***REMOVED***new***REMOVED***Stripe(Deno.env.get('STRIPE_SECRET_KEY')***REMOVED***||***REMOVED***'***REMOVED***',***REMOVED***{
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
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***body***REMOVED***=***REMOVED***await***REMOVED***req.text();
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***signature***REMOVED***=***REMOVED***req.headers.get('stripe-signature');

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!signature)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('❌***REMOVED***Signature***REMOVED***Stripe***REMOVED***manquante');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(JSON.stringify({***REMOVED***error:***REMOVED***'Signature***REMOVED***manquante'***REMOVED***}),***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***400,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***...corsHeaders,***REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***let***REMOVED***event:***REMOVED***Stripe.Event;
***REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***event***REMOVED***=***REMOVED***stripe.webhooks.constructEvent(body,***REMOVED***signature,***REMOVED***Deno.env.get('STRIPE_WEBHOOK_SECRET')***REMOVED***||***REMOVED***'whsec_test');
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(err)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('❌***REMOVED***Erreur***REMOVED***signature***REMOVED***webhook:',***REMOVED***err);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(JSON.stringify({***REMOVED***error:***REMOVED***'Signature***REMOVED***invalide'***REMOVED***}),***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***400,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***...corsHeaders,***REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***console.log('📦***REMOVED***Webhook***REMOVED***reçu:',***REMOVED***event.type);

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Gérer***REMOVED***les***REMOVED***événements***REMOVED***de***REMOVED***paiement
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(event.type***REMOVED***===***REMOVED***'checkout.session.completed')***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***session***REMOVED***=***REMOVED***event.data.object***REMOVED***as***REMOVED***Stripe.Checkout.Session;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('✅***REMOVED***Paiement***REMOVED***complété***REMOVED***pour***REMOVED***session:',***REMOVED***session.id);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Vérifier***REMOVED***que***REMOVED***c'est***REMOVED***bien***REMOVED***un***REMOVED***paiement***REMOVED***pour***REMOVED***création***REMOVED***de***REMOVED***dynastie
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(session.metadata?.product_type***REMOVED***!==***REMOVED***'dynasty_creation')***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('⚠️***REMOVED***Paiement***REMOVED***non***REMOVED***lié***REMOVED***à***REMOVED***la***REMOVED***création***REMOVED***de***REMOVED***dynastie');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(JSON.stringify({***REMOVED***received:***REMOVED***true***REMOVED***}),***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***200,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***...corsHeaders,***REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***userId***REMOVED***=***REMOVED***session.metadata?.user_id;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!userId)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('❌***REMOVED***User***REMOVED***ID***REMOVED***manquant***REMOVED***dans***REMOVED***les***REMOVED***métadonnées');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(JSON.stringify({***REMOVED***error:***REMOVED***'User***REMOVED***ID***REMOVED***manquant'***REMOVED***}),***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***400,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***...corsHeaders,***REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Créer***REMOVED***le***REMOVED***client***REMOVED***Supabase***REMOVED***avec***REMOVED***service***REMOVED***role***REMOVED***(bypass***REMOVED***RLS)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***supabase***REMOVED***=***REMOVED***createClient(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Deno.env.get('SUPABASE_URL')***REMOVED***||***REMOVED***'https://aaxfvyorhasbwlaovrdf.supabase.co',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')***REMOVED***||***REMOVED***'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFheGZ2eW9yaGFzYndsYW92cmRmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDQxOTcwNSwiZXhwIjoyMDY1OTk1NzA1fQ.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***auth:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***autoRefreshToken:***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***persistSession:***REMOVED***false
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Générer***REMOVED***un***REMOVED***token***REMOVED***unique***REMOVED***pour***REMOVED***la***REMOVED***création***REMOVED***de***REMOVED***dynastie
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***token***REMOVED***=***REMOVED***`DYN-${crypto.randomUUID().substring(0,***REMOVED***8).toUpperCase()}`;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('🔑***REMOVED***Token***REMOVED***généré:',***REMOVED***token);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Créer***REMOVED***l'enregistrement***REMOVED***dans***REMOVED***dynasty_creation_tokens
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***error:***REMOVED***tokenError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('dynasty_creation_tokens')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.insert({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***user_id:***REMOVED***userId,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***token:***REMOVED***token,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***stripe_session_id:***REMOVED***session.id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***'paid',***REMOVED***//***REMOVED***Marquer***REMOVED***comme***REMOVED***payé
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***expires_at:***REMOVED***new***REMOVED***Date(Date.now()***REMOVED***+***REMOVED***24***REMOVED*******REMOVED***60***REMOVED*******REMOVED***60***REMOVED*******REMOVED***1000).toISOString(),***REMOVED***//***REMOVED***24h
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***new***REMOVED***Date().toISOString()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(tokenError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('❌***REMOVED***Erreur***REMOVED***création***REMOVED***token:',***REMOVED***tokenError);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***tokenError;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('✅***REMOVED***Token***REMOVED***de***REMOVED***création***REMOVED***dynastie***REMOVED***créé***REMOVED***pour***REMOVED***user:',***REMOVED***userId);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Optionnel***REMOVED***:***REMOVED***Envoyer***REMOVED***un***REMOVED***email***REMOVED***de***REMOVED***confirmation
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***await***REMOVED***sendConfirmationEmail(userId,***REMOVED***token);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('❌***REMOVED***Erreur***REMOVED***traitement***REMOVED***webhook:',***REMOVED***error);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(JSON.stringify({***REMOVED***error:***REMOVED***'Erreur***REMOVED***traitement'***REMOVED***}),***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***500,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***...corsHeaders,***REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Gérer***REMOVED***d'autres***REMOVED***événements***REMOVED***si***REMOVED***nécessaire
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(event.type***REMOVED***===***REMOVED***'payment_intent.succeeded')***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('💰***REMOVED***Payment***REMOVED***Intent***REMOVED***réussi');
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(event.type***REMOVED***===***REMOVED***'payment_intent.payment_failed')***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('❌***REMOVED***Payment***REMOVED***Intent***REMOVED***échoué');
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(JSON.stringify({***REMOVED***received:***REMOVED***true***REMOVED***}),***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***200,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***...corsHeaders,***REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***});

***REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***console.error('🔥***REMOVED***Erreur***REMOVED***webhook:',***REMOVED***error);
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(JSON.stringify({***REMOVED***error:***REMOVED***'Erreur***REMOVED***interne'***REMOVED***}),***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***500,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***...corsHeaders,***REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED***}
});
