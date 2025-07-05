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
    // Create a Supabase client with the Auth context of the function
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the user from the request
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    // Check if user is admin or patriarch
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('is_admin, is_patriarch')
      .eq('user_id', user.id)
      .single()

    if (profileError || (!profile?.is_admin && !profile?.is_patriarch)) {
      throw new Error('Insufficient permissions')
    }

    // Delete all data in the correct order to respect foreign key constraints
    const tablesToDelete = [
      'family_relations',
      'family_messages',
      'family_events',
      'family_invitations',
      'family_notifications',
      'profiles'
    ]

    for (const table of tablesToDelete) {
      const { error } = await supabaseClient
        .from(table)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000') // Keep at least one record if needed

      if (error) {
        console.error(`Error deleting from ${table}:`, error)
        throw new Error(`Failed to delete from ${table}`)
      }
    }

    return new Response(
      JSON.stringify({
        message: 'All data deleted successfully',
        deletedTables: tablesToDelete
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Error in delete-all-data function:', error)

    return new Response(
      JSON.stringify({
        error: error.message || 'Internal server error'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.message === 'Unauthorized' ? 401 :
               error.message === 'Insufficient permissions' ? 403 : 500
      }
    )
  }
})
