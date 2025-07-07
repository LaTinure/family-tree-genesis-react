import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from "https://deno.land/x/stripe@v0.24.0/mod.ts";

const stripe = Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      console.error('❌ Signature Stripe manquante');
      return new Response(JSON.stringify({ error: 'Signature manquante' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err) {
      console.error('❌ Erreur signature webhook:', err);
      return new Response(JSON.stringify({ error: 'Signature invalide' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('📦 Événement Stripe reçu:', event.type);

    // Gérer l'événement checkout.session.completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log('✅ Paiement complété pour session:', session.id);
      console.log('📋 Métadonnées:', session.metadata);

      const createToken = session.metadata?.create_token;
      const userId = session.metadata?.user_id;
      const isTempUser = session.metadata?.is_temp_user === 'true';

      if (!createToken) {
        console.error('❌ create_token manquant dans les métadonnées');
        return new Response(JSON.stringify({ error: 'Token manquant' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Mettre à jour le token en base
      const supabaseService = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
        { auth: { autoRefreshToken: false, persistSession: false } }
      );

      const now = new Date();
      const updateData = {
        status: 'paid',
        paid_at: now.toISOString(),
        stripe_session_id: session.id,
        log: [{ status: 'paid', at: now.toISOString(), session_id: session.id }],
      };

      const { error: updateError } = await supabaseService
        .from('dynasty_creation_tokens')
        .update(updateData)
        .eq('token', createToken)
        .eq('status', 'pending'); // Sécurité: seulement si encore pending

      if (updateError) {
        console.error('❌ Erreur mise à jour token:', updateError);
        return new Response(JSON.stringify({ error: 'Erreur mise à jour token' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log('✅ Token mis à jour:', createToken, '-> paid');

      // Si c'est un utilisateur temporaire, créer le profil
      if (isTempUser && userId) {
        const { error: profileError } = await supabaseService
          .from('profiles')
          .insert({
            user_id: userId,
            email: session.metadata?.user_email,
            phone: session.metadata?.user_phone,
            is_temp_user: true,
            created_at: now.toISOString(),
          });

        if (profileError) {
          console.error('⚠️ Erreur création profil temporaire:', profileError);
          // Ne pas échouer le webhook pour ça
        } else {
          console.log('✅ Profil temporaire créé pour:', userId);
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('🔥 Erreur webhook:', error);
    return new Response(JSON.stringify({
      error: 'Erreur interne du serveur',
      details: error?.message,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
