
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import crypto from 'node:crypto';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { session_id, user_id } = await req.json();
    console.log("🔑 Creating dynasty token for:", { session_id, user_id });

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

    // Vérifier que le token existe et est payé
    const { data: tokenData, error: tokenError } = await supabase
      .from('dynasty_creation_tokens')
      .select('*')
      .eq('stripe_session_id', session_id)
      .eq('status', 'paid')
      .single();

    if (tokenError || !tokenData) {
      console.error('❌ Token non trouvé ou non payé:', tokenError);
      return new Response(JSON.stringify({
        error: 'Token de paiement non valide'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Générer un token de création de dynastie
    const dynastyToken = `DYN-${crypto.randomUUID().substring(0, 8).toUpperCase()}`;
    
    console.log("✅ Dynasty token créé:", dynastyToken);

    return new Response(JSON.stringify({
      token: dynastyToken,
      message: 'Token de dynastie créé avec succès'
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('🔥 Erreur création token dynasty:', error);
    return new Response(JSON.stringify({
      error: 'Erreur interne du serveur'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
