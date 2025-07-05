const { createClient } = require('@supabase/supabase-js');

// Configuration Supabase (remplacez par vos vraies clés)
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabaseConnection() {
  console.log('🔍 Test de connexion Supabase...');

  try {
    // Test 1: Vérifier la connexion
    const { data: testData, error: testError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);

    if (testError) {
      console.error('❌ Erreur de connexion:', testError);
      return;
    }

    console.log('✅ Connexion Supabase réussie');

    // Test 2: Récupérer tous les profils
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (profilesError) {
      console.error('❌ Erreur lors de la récupération des profils:', profilesError);
      return;
    }

    console.log('📊 Profils trouvés:', profiles?.length || 0);

    if (profiles && profiles.length > 0) {
      console.log('👥 Détails des profils:');
      profiles.forEach((profile, index) => {
        console.log(`${index + 1}. ${profile.first_name} ${profile.last_name} (${profile.email})`);
        console.log(`   - ID: ${profile.id}`);
        console.log(`   - Rôle: ${profile.role_radio}`);
        console.log(`   - Patriarche: ${profile.is_patriarch}`);
        console.log(`   - Admin: ${profile.is_admin}`);
        console.log('---');
      });
    } else {
      console.log('⚠️ Aucun profil trouvé dans la base de données');
    }

  } catch (error) {
    console.error('❌ Erreur générale:', error);
  }
}

testSupabaseConnection();
