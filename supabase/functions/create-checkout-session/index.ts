import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://deno.land/x/stripe@v0.24.0/mod.ts";

const stripeSecret = Deno.env.get("STRIPE_SECRET_KEY");
if (!stripeSecret) {
  throw new Error("❌ STRIPE_SECRET_KEY manquant dans les variables d'environnement");
}
const stripe = Stripe(stripeSecret);
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};
serve(async (req)=>{
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders
    });
  }
  try {
    const authHeader = req.headers.get("Authorization");
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: {
        headers: {
          Authorization: authHeader || ""
        }
      }
    });
    const body = await req.json();
    const { successUrl, cancelUrl, customAmount = 1000, tempUserData } = body;
    let currentUser = null;
    let isTempUser = false;
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      currentUser = user;
    } else if (tempUserData?.email && tempUserData?.phone) {
      currentUser = {
        id: tempUserData.user_id || crypto.randomUUID(),
        email: tempUserData.email,
        phone: tempUserData.phone
      };
      isTempUser = true;
    } else {
      return new Response(JSON.stringify({
        error: "Authentification requise ou données temporaires manquantes"
      }), {
        status: 401,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }
    // 🔍 Vérifie l'existence de dynastie pour les vrais utilisateurs
    if (!isTempUser) {
      const { data: existingProfile } = await supabase.from("profiles").select("dynasty_id").eq("user_id", currentUser.id).single();
      if (existingProfile?.dynasty_id) {
        return new Response(JSON.stringify({
          error: "Vous possédez déjà une dynastie"
        }), {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        });
      }
    }
    // 🎟️ Génération du token
    const createToken = crypto.randomUUID();
    const now = new Date();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    const supabaseService = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    const tokenData = {
      token: createToken,
      user_id: currentUser.id,
      status: "pending",
      amount: customAmount,
      expires_at: expiresAt.toISOString(),
      is_used: false,
      log: [
        {
          status: "pending",
          at: now.toISOString()
        }
      ]
    };
    if (isTempUser) {
      tokenData.email = currentUser.email;
      tokenData.phone = currentUser.phone;
      tokenData.is_temp_user = true;
    }
    const { error: tokenError } = await supabaseService.from("dynasty_creation_tokens").insert(tokenData);
    if (tokenError) {
      console.error("❌ Erreur enregistrement token:", tokenError);
      return new Response(JSON.stringify({
        error: "Erreur lors de la préparation du paiement"
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }
    console.log("🧾 Creating Stripe session for:", currentUser.email, "montant:", customAmount);
    let session;
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: [
          "card"
        ],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: "Création de Dynastie",
                description: "Accès premium pour créer et gérer votre arbre généalogique familial"
              },
              unit_amount: customAmount
            },
            quantity: 1
          }
        ],
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
    } catch (stripeError) {
      console.error("💥 Stripe session error:", stripeError);
      return new Response(JSON.stringify({
        error: "Échec création session Stripe",
        details: stripeError?.message || "Erreur inconnue"
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }
    // 🔗 Mise à jour du token avec l'ID Stripe
    await supabaseService.from("dynasty_creation_tokens").update({
      stripe_session_id: session.id
    }).eq("token", createToken);
    console.log("✅ Session Stripe créée:", session.id);
    return new Response(JSON.stringify({
      sessionId: session.id,
      url: session.url
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("🔥 Erreur interne:", error?.message || error);
    return new Response(JSON.stringify({
      error: "Erreur interne du serveur",
      details: error?.message || "unknown"
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  }
});
