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
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    console.log("🔑 Authorization header:", authHeader);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? 'https://aaxfvyorhasbwlaovrdf.supabase.co',
      Deno.env.get('SUPABASE_ANON_KEY') ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFheGZ2eW9yaGFzYndsYW92cmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MTk3MDUsImV4cCI6MjA2NTk5NTcwNX0.nrHzEadlemmCkxEaN8KAdKVwzuSIUQRKw50ze-FP60E',
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

    const { successUrl, cancelUrl, customAmount = 500, user_id } = body;

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
      success_url: successUrl || `${req.headers.get('origin')}/dynasty/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.get('origin')}/dynasty`,
      metadata: {
        user_id: user_id || user.id,
        product_type: 'dynasty_creation',
        user_email: user.email,
        session_id: session.id // Ajouter le session_id pour debug
      }
    });

    console.log("✅ Session Stripe créée :", session.id);

    return new Response(JSON.stringify({
      sessionId: session.id
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
// Celui dans supabase Studio en ligne
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
serve(async (req)=>{
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }
  try {
    const authHeader = req.headers.get('Authorization');
    console.log("🔑 Authorization header:", authHeader);
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
      global: {
        headers: {
          Authorization: authHeader
        }
      }
    });
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
    const { successUrl, cancelUrl, customAmount = 500, user_id } = body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [
        'card'
      ],
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
      success_url: successUrl || `${req.headers.get('origin')}/dynasty/create?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.get('origin')}/dynasty`,
      metadata: {
        user_id: user_id || user.id,
        product_type: 'dynasty_creation'
      }
    });
    console.log("✅ Session Stripe créée :", session.id);
    return new Response(JSON.stringify({
      sessionId: session.id
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
