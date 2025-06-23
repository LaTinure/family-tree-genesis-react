
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Supprimer tous les enregistrements des tables publiques
    const tables = [
      'family_members',
      'relationships', 
      'notifications',
      'messages',
      'profiles',
      'family_trees',
      'site_settings'
    ]

    for (const table of tables) {
      const { error } = await supabaseAdmin
        .from(table)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all records
      
      if (error) {
        console.error(`Erreur lors de la suppression de la table ${table}:`, error)
      }
    }

    // Supprimer tous les utilisateurs d'authentification
    const { data: users, error: getUsersError } = await supabaseAdmin.auth.admin.listUsers()
    
    if (getUsersError) {
      console.error('Erreur lors de la récupération des utilisateurs:', getUsersError)
    } else {
      for (const user of users.users) {
        const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(user.id)
        if (deleteUserError) {
          console.error(`Erreur lors de la suppression de l'utilisateur ${user.id}:`, deleteUserError)
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Toutes les données ont été supprimées' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
