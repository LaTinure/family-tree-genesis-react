
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@12.0.0';
import crypto from 'node:crypto';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'), {
  apiVersion: '2023-10-16'
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    console.log("🔑 Authorization header:", authHeader);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: {
            Authorization: authHeader
          }
        }
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    console.log("👤 User fetched:", user);

    if (authError || !user) {
      console.log("⛔ Auth error:", authError);
      return new Response(JSON.stringify({
        error: 'Non autorisé'
      }), {
        status: 401,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    const body = await req.json();
    console.log("📦 Requête JSON:", body);

    const { successUrl, cancelUrl, customAmount = 1000, user_id } = body;

    // Vérifier que l'utilisateur n'a pas déjà une dynastie
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('dynasty_id')
      .eq('user_id', user.id)
      .single();

    if (existingProfile?.dynasty_id) {
      console.log("⚠️ User a déjà une dynastie:", existingProfile.dynasty_id);
      return new Response(JSON.stringify({
        error: 'Vous possédez déjà une dynastie'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    // Créer un token de création de dynastie AVANT le paiement
    const createToken = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Expire dans 1 heure

    // Utiliser le service role pour insérer le token
    const supabaseService = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const { error: tokenError } = await supabaseService
      .from('dynasty_creation_tokens')
      .insert({
        token: createToken,
        user_id: user.id,
        status: 'pending',
        amount: customAmount,
        expires_at: expiresAt.toISOString(),
        is_used: false
      });

    if (tokenError) {
      console.error('❌ Erreur création token:', tokenError);
      return new Response(JSON.stringify({
        error: 'Erreur lors de la préparation du paiement'
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    // Créer la session Stripe avec le token dans l'URL de succès
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Création de Dynastie',
              description: 'Accès premium pour créer et gérer votre arbre généalogique familial'
            },
            unit_amount: customAmount
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/dynasty/create?create_token=${createToken}`,
      cancel_url: cancelUrl || `${req.headers.get('origin')}/dynasty/payment`,
      metadata: {
        user_id: user_id || user.id,
        product_type: 'dynasty_creation',
        user_email: user.email,
        create_token: createToken
      }
    });

    // Mettre à jour le token avec l'ID de session Stripe
    await supabaseService
      .from('dynasty_creation_tokens')
      .update({
        stripe_session_id: session.id
      })
      .eq('token', createToken);

    console.log("✅ Session Stripe créée avec token:", session.id, createToken);

    return new Response(JSON.stringify({
      sessionId: session.id,
      url: session.url
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('🔥 Erreur interne:', error);
    return new Response(JSON.stringify({
      error: 'Erreur interne du serveur'
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});
