
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno";

// Configuration CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

// Helper pour logger les étapes
const logStep = (step: string, data?: any) => {
  console.log(`🔍 [CHECKOUT-SESSION] ${step}`, data ? JSON.stringify(data, null, 2) : '');
};

serve(async (req) => {
  // Gérer les requêtes OPTIONS (CORS preflight)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    logStep("🚀 Démarrage de la création de session Stripe");

    // 1. Vérification des variables d'environnement
    const stripeSecret = Deno.env.get("STRIPE_SECRET_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!stripeSecret) {
      logStep("❌ STRIPE_SECRET_KEY manquant");
      throw new Error("Configuration Stripe manquante");
    }
    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
      logStep("❌ Variables Supabase manquantes");
      throw new Error("Configuration Supabase manquante");
    }

    logStep("✅ Variables d'environnement vérifiées");

    // 2. Initialisation Stripe
    const stripe = Stripe(stripeSecret);
    logStep("✅ Stripe initialisé");

    // 3. Lecture du body de la requête
    let body;
    try {
      body = await req.json();
      logStep("📥 Body reçu", body);
    } catch (error) {
      logStep("❌ Erreur parsing JSON", error.message);
      return new Response(JSON.stringify({
        error: "Format JSON invalide",
        details: error.message
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const { successUrl, cancelUrl, customAmount = 1000, tempUserData } = body;

    // 4. Authentification utilisateur
    const authHeader = req.headers.get("Authorization");
    logStep("🔐 En-tête d'autorisation", authHeader ? "Présent" : "Absent");

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader || "" } }
    });

    let currentUser = null;
    let isTempUser = false;

    // Tentative d'authentification
    if (authHeader) {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (user && !error) {
          currentUser = user;
          logStep("✅ Utilisateur authentifié", { id: user.id, email: user.email });
        }
      } catch (error) {
        logStep("⚠️ Erreur authentification", error.message);
      }
    }

    // Utilisateur temporaire si pas d'authentification
    if (!currentUser && tempUserData?.email && tempUserData?.phone) {
      currentUser = {
        id: tempUserData.user_id || crypto.randomUUID(),
        email: tempUserData.email,
        phone: tempUserData.phone
      };
      isTempUser = true;
      logStep("✅ Utilisateur temporaire créé", { id: currentUser.id, email: currentUser.email });
    }

    if (!currentUser) {
      logStep("❌ Aucun utilisateur valide");
      return new Response(JSON.stringify({
        error: "Authentification requise ou données temporaires manquantes"
      }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // 5. Vérification de dynastie existante (utilisateurs authentifiés uniquement)
    if (!isTempUser) {
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("dynasty_id")
        .eq("user_id", currentUser.id)
        .single();

      if (existingProfile?.dynasty_id) {
        logStep("❌ Utilisateur possède déjà une dynastie");
        return new Response(JSON.stringify({
          error: "Vous possédez déjà une dynastie"
        }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
    }

    // 6. Génération du token de création
    const createToken = crypto.randomUUID();
    const now = new Date();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Expire dans 1 heure

    logStep("🎟️ Token généré", { token: createToken, expires: expiresAt.toISOString() });

    // 7. Enregistrement du token en base avec service role
    const supabaseService = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const tokenData = {
      token: createToken,
      user_id: currentUser.id,
      status: "pending",
      amount: customAmount,
      expires_at: expiresAt.toISOString(),
      is_used: false,
      log: [{ status: "pending", at: now.toISOString() }],
      ...(isTempUser && {
        email: currentUser.email,
        phone: currentUser.phone,
        is_temp_user: true
      })
    };

    const { error: tokenError } = await supabaseService
      .from("dynasty_creation_tokens")
      .insert(tokenData);

    if (tokenError) {
      logStep("❌ Erreur enregistrement token", tokenError);
      return new Response(JSON.stringify({
        error: "Erreur lors de la préparation du paiement",
        details: tokenError.message
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    logStep("✅ Token enregistré en base");

    // 8. Création de la session Stripe
    logStep("💳 Création session Stripe", {
      email: currentUser.email,
      amount: customAmount
    });

    let session;
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
          price_data: {
            currency: "eur",
            product_data: {
              name: "Création de Dynastie",
              description: "Accès premium pour créer et gérer votre arbre généalogique familial"
            },
            unit_amount: customAmount
          },
          quantity: 1
        }],
        mode: "payment",
        success_url: `${successUrl}?create_token=${createToken}`,
        cancel_url: cancelUrl || `${req.headers.get("origin")}/dynasty/payment`,
        metadata: {
          user_id: currentUser.id,
          user_email: currentUser.email,
          create_token: createToken,
          is_temp_user: isTempUser.toString()
        }
      });

      logStep("✅ Session Stripe créée", { sessionId: session.id, url: session.url });
    } catch (stripeError) {
      logStep("❌ Erreur Stripe", stripeError);
      return new Response(JSON.stringify({
        error: "Échec création session Stripe",
        details: stripeError.message || "Erreur inconnue"
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // 9. Mise à jour du token avec l'ID de session Stripe
    await supabaseService
      .from("dynasty_creation_tokens")
      .update({ stripe_session_id: session.id })
      .eq("token", createToken);

    logStep("✅ Token mis à jour avec session Stripe");

    // 10. Réponse finale
    const response = {
      sessionId: session.id,
      url: session.url,
      createToken: createToken
    };

    logStep("🎉 Réponse envoyée avec succès", response);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    logStep("🔥 Erreur critique", {
      message: error.message,
      stack: error.stack
    });

    return new Response(JSON.stringify({
      error: "Erreur interne du serveur",
      details: error.message || "Erreur inconnue"
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
