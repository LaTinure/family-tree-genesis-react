import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      {
        global: { headers: { Authorization: authHeader } },
      }
    );

    const body = await req.json();
    const { createToken, dynastyName, dynastyDescription } = body;

    if (!createToken || !dynastyName) {
      return new Response(JSON.stringify({
        error: 'Token et nom de dynastie requis',
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Vérifier le token
    const { data: tokenData, error: tokenError } = await supabase
      .from('dynasty_creation_tokens')
      .select('*')
      .eq('token', createToken)
      .single();

    if (tokenError || !tokenData) {
      return new Response(JSON.stringify({
        error: 'Token invalide',
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Vérifications de sécurité
    if (tokenData.status !== 'paid') {
      return new Response(JSON.stringify({
        error: 'Paiement non validé',
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (tokenData.is_used) {
      return new Response(JSON.stringify({
        error: 'Token déjà utilisé',
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const now = new Date();
    if (new Date(tokenData.expires_at) < now) {
      return new Response(JSON.stringify({
        error: 'Token expiré',
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Utiliser le service role pour les opérations critiques
    const supabaseService = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Générer l'admin_invite_token avec préfixe DYN_
    const adminInviteToken = `DYN_${crypto.randomUUID()}`;

    // Créer la dynastie
    const { data: dynastyData, error: dynastyError } = await supabaseService
      .from('dynasties')
      .insert({
        name: dynastyName,
        description: dynastyDescription || '',
        created_at: now.toISOString(),
        admin_invite_token: adminInviteToken,
        status: 'active',
      })
      .select()
      .single();

    if (dynastyError) {
      console.error('❌ Erreur création dynastie:', dynastyError);
      return new Response(JSON.stringify({
        error: 'Erreur lors de la création de la dynastie',
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Marquer le token comme utilisé
    const { error: updateError } = await supabaseService
      .from('dynasty_creation_tokens')
      .update({
        is_used: true,
        used_at: now.toISOString(),
        dynasty_id: dynastyData.id,
        log: [...(tokenData.log || []), { status: 'used', at: now.toISOString(), dynasty_id: dynastyData.id }],
      })
      .eq('token', createToken);

    if (updateError) {
      console.error('❌ Erreur mise à jour token:', updateError);
      // Ne pas échouer car la dynastie est créée
    }

    console.log('✅ Dynastie créée:', dynastyData.id, 'avec token admin:', adminInviteToken);

    return new Response(JSON.stringify({
      success: true,
      dynasty: {
        id: dynastyData.id,
        name: dynastyData.name,
        admin_invite_token: adminInviteToken,
      },
      redirect_url: `/auth-family?token=${adminInviteToken}`,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('🔥 Erreur création dynastie:', error);
    return new Response(JSON.stringify({
      error: 'Erreur interne du serveur',
      details: error?.message,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
