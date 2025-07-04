import***REMOVED***{***REMOVED***serve***REMOVED***}***REMOVED***from***REMOVED***"https://deno.land/std@0.168.0/http/server.ts"
import***REMOVED***{***REMOVED***createClient***REMOVED***}***REMOVED***from***REMOVED***'https://esm.sh/@supabase/supabase-js@2'
import***REMOVED***Stripe***REMOVED***from***REMOVED***'https://esm.sh/stripe@12.0.0'

const***REMOVED***stripe***REMOVED***=***REMOVED***new***REMOVED***Stripe(Deno.env.get('STRIPE_SECRET_KEY')!,***REMOVED***{
***REMOVED******REMOVED***apiVersion:***REMOVED***'2023-10-16',
})

const***REMOVED***endpointSecret***REMOVED***=***REMOVED***Deno.env.get('STRIPE_WEBHOOK_SECRET')!

serve(async***REMOVED***(req)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***signature***REMOVED***=***REMOVED***req.headers.get('stripe-signature')!

***REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***body***REMOVED***=***REMOVED***await***REMOVED***req.text()
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***event***REMOVED***=***REMOVED***stripe.webhooks.constructEvent(body,***REMOVED***signature,***REMOVED***endpointSecret)

***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***supabase***REMOVED***=***REMOVED***createClient(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Deno.env.get('SUPABASE_URL')***REMOVED***??***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')***REMOVED***??***REMOVED***''
***REMOVED******REMOVED******REMOVED******REMOVED***)

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Gérer***REMOVED***les***REMOVED***différents***REMOVED***types***REMOVED***d'événements
***REMOVED******REMOVED******REMOVED******REMOVED***switch***REMOVED***(event.type)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***case***REMOVED***'checkout.session.completed':
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***session***REMOVED***=***REMOVED***event.data.object***REMOVED***as***REMOVED***Stripe.Checkout.Session

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(session.metadata?.product_type***REMOVED***===***REMOVED***'dynasty_creation')***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Créer***REMOVED***un***REMOVED***token***REMOVED***de***REMOVED***création***REMOVED***de***REMOVED***dynastie
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***createToken***REMOVED***=***REMOVED***crypto.randomUUID()

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Sauvegarder***REMOVED***dans***REMOVED***la***REMOVED***base***REMOVED***de***REMOVED***données
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('dynasty_creation_tokens')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.insert({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***token:***REMOVED***createToken,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***user_id:***REMOVED***session.metadata.user_id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***stripe_session_id:***REMOVED***session.id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***amount:***REMOVED***session.amount_total,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***'paid',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***expires_at:***REMOVED***new***REMOVED***Date(Date.now()***REMOVED***+***REMOVED***24***REMOVED*******REMOVED***60***REMOVED*******REMOVED***60***REMOVED*******REMOVED***1000).toISOString()***REMOVED***//***REMOVED***24h
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***})

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***sauvegarde***REMOVED***du***REMOVED***token:',***REMOVED***error)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***break

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***case***REMOVED***'payment_intent.succeeded':
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***paymentIntent***REMOVED***=***REMOVED***event.data.object***REMOVED***as***REMOVED***Stripe.PaymentIntent
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('Paiement***REMOVED***réussi:',***REMOVED***paymentIntent.id)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***break

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***case***REMOVED***'payment_intent.payment_failed':
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***failedPayment***REMOVED***=***REMOVED***event.data.object***REMOVED***as***REMOVED***Stripe.PaymentIntent
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('Paiement***REMOVED***échoué:',***REMOVED***failedPayment.id)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***break

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***default:
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log(`Événement***REMOVED***non***REMOVED***géré:***REMOVED***${event.type}`)
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(JSON.stringify({***REMOVED***received:***REMOVED***true***REMOVED***}),***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***200,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***})

***REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(err)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***console.error('Erreur***REMOVED***webhook:',***REMOVED***err)
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***JSON.stringify({***REMOVED***error:***REMOVED***'Erreur***REMOVED***webhook'***REMOVED***}),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***400,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***)
***REMOVED******REMOVED***}
})
