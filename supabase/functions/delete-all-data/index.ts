
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with service role key for admin operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    console.log('Début de la suppression des données...')

    // 1. Supprimer tous les utilisateurs authentifiés
    console.log('Suppression des utilisateurs auth...')
    const { data: users, error: usersError } = await supabaseAdmin.auth.admin.listUsers()
    
    if (usersError) {
      throw new Error(`Erreur lors de la récupération des utilisateurs: ${usersError.message}`)
    }

    if (users && users.users.length > 0) {
      for (const user of users.users) {
        const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(user.id)
        if (deleteUserError) {
          console.error(`Erreur lors de la suppression de l'utilisateur ${user.id}:`, deleteUserError)
        } else {
          console.log(`Utilisateur ${user.id} supprimé`)
        }
      }
    }

    // 2. Supprimer les données des tables publiques dans l'ordre correct (à cause des clés étrangères)
    const tablesToDelete = [
      'family_members',
      'relationships', 
      'messages',
      'notifications',
      'profiles',
      'family_trees',
      'site_settings'
    ]

    for (const table of tablesToDelete) {
      console.log(`Suppression de la table ${table}...`)
      const { error } = await supabaseAdmin.from(table).delete().neq('id', 'impossible-id')
      
      if (error) {
        console.error(`Erreur lors de la suppression de ${table}:`, error)
      } else {
        console.log(`Table ${table} vidée avec succès`)
      }
    }

    console.log('Suppression terminée avec succès')

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Toutes les données ont été supprimées avec succès',
        deletedTables: tablesToDelete.length,
        deletedUsers: users?.users.length || 0
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
