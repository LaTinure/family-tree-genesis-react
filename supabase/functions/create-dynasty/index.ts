
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

const logStep = (step: string, data?: any) => {
  console.log(`🔍 [CREATE-DYNASTY] ${step}`, data ? JSON.stringify(data, null, 2) : '');
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    logStep("🚀 Démarrage création dynastie");

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Variables Supabase manquantes");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const body = await req.json();
    const { createToken, dynastyData } = body;

    if (!createToken) {
      throw new Error("Token de création manquant");
    }

    logStep("📋 Données reçues", { createToken: createToken.substring(0, 8) + "...", dynastyData });

    // 1. Vérifier le token
    const { data: tokenData, error: tokenError } = await supabase
      .from("dynasty_creation_tokens")
      .select("*")
      .eq("token", createToken)
      .single();

    if (tokenError || !tokenData) {
      logStep("❌ Token invalide", tokenError);
      throw new Error("Token de création invalide");
    }

    if (tokenData.status !== "paid") {
      throw new Error("Paiement non validé");
    }

    if (tokenData.is_used) {
      throw new Error("Token déjà utilisé");
    }

    if (new Date(tokenData.expires_at) < new Date()) {
      throw new Error("Token expiré");
    }

    logStep("✅ Token valide", { status: tokenData.status, user: tokenData.user_id });

    // 2. Créer la dynastie
    const { data: dynasty, error: dynastyError } = await supabase
      .from("dynasties")
      .insert({
        name: dynastyData.name,
        description: dynastyData.description || null,
        location: dynastyData.location || null,
        founding_year: dynastyData.founding_year || null,
        created_by: tokenData.user_id,
      })
      .select()
      .single();

    if (dynastyError) {
      logStep("❌ Erreur création dynastie", dynastyError);
      throw new Error("Erreur lors de la création de la dynastie");
    }

    logStep("✅ Dynastie créée", { dynastyId: dynasty.id, name: dynasty.name });

    // 3. Créer un token d'invitation pour l'administrateur
    const adminToken = `DYN_${crypto.randomUUID().replace(/-/g, '')}`;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Expire dans 7 jours

    const { error: inviteError } = await supabase
      .from("invites")
      .insert({
        dynasty_id: dynasty.id,
        token: adminToken,
        user_role: "Administrateur",
        expires_at: expiresAt.toISOString(),
        used: false,
      });

    if (inviteError) {
      logStep("❌ Erreur création invitation admin", inviteError);
      throw new Error("Erreur lors de la création de l'invitation administrateur");
    }

    logStep("✅ Token admin créé", { adminToken: adminToken.substring(0, 12) + "..." });

    // 4. Marquer le token comme utilisé
    const { error: updateError } = await supabase
      .from("dynasty_creation_tokens")
      .update({
        is_used: true,
        used_at: new Date().toISOString(),
        dynasty_id: dynasty.id,
      })
      .eq("token", createToken);

    if (updateError) {
      logStep("⚠️ Erreur mise à jour token", updateError);
      // Ne pas échouer pour ça
    } else {
      logStep("✅ Token marqué comme utilisé");
    }

    const response = {
      success: true,
      dynastyId: dynasty.id,
      adminToken: adminToken,
      message: "Dynastie créée avec succès"
    };

    logStep("🎉 Réponse envoyée", response);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    logStep("🔥 Erreur critique", { message: error.message, stack: error.stack });

    return new Response(JSON.stringify({
      success: false,
      error: error.message || "Erreur interne du serveur"
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
