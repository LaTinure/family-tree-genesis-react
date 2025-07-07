
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@12.0.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'), {
  apiVersion: '2023-10-16'
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  console.log("🔍 Webhook reçu avec signature:", signature);

  if (!signature) {
    console.error("❌ Signature manquante");
    return new Response('No signature', { status: 400 });
  }

  try {
    const body = await req.text();
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    
    if (!webhookSecret) {
      console.error("❌ STRIPE_WEBHOOK_SECRET manquant");
      return new Response('Webhook secret not configured', { status: 500 });
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log("✅ Événement Stripe validé:", event.type);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("💳 Paiement confirmé pour session:", session.id);

        // Marquer le token comme payé
        const { data: tokenData, error: updateError } = await supabase
          .from('dynasty_creation_tokens')
          .update({
            status: 'paid'
          })
          .eq('stripe_session_id', session.id)
          .select()
          .single();

        if (updateError) {
          console.error('❌ Erreur mise à jour token:', updateError);
          return new Response('Error updating token', { status: 500 });
        }

        console.log("✅ Token marqué comme payé:", tokenData?.token);
        break;

      case 'checkout.session.expired':
        const expiredSession = event.data.object as Stripe.Checkout.Session;
        console.log("⏰ Session expirée:", expiredSession.id);

        // Marquer le token comme expiré
        await supabase
          .from('dynasty_creation_tokens')
          .update({
            status: 'expired'
          })
          .eq('stripe_session_id', expiredSession.id);

        console.log("✅ Token marqué comme expiré");
        break;

      default:
        console.log(`🔔 Événement non géré: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('🔥 Erreur webhook:', error);
    return new Response(JSON.stringify({
      error: 'Webhook error',
      message: error.message
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
