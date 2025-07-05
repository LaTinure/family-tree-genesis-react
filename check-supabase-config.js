// Script pour vérifier la configuration Supabase
import { createClient } from '@supabase/supabase-js';

// Remplacez par vos vraies clés Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

console.log('🔍 Configuration Supabase:');
console.log('URL:', supabaseUrl);
console.log('Clé anonyme:', supabaseKey.substring(0, 20) + '...');

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSupabaseConfig() {
  try {
    console.log('\n🔐 Test de connexion Supabase...');

    // Test 1: Vérifier la connexion de base
    const { data: testData, error: testError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);

    if (testError) {
      console.error('❌ Erreur de connexion:', testError);
      return;
    }

    console.log('✅ Connexion Supabase réussie');

    // Test 2: Vérifier l'état de l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.log('⚠️ Erreur d\'authentification:', authError.message);
    } else if (user) {
      console.log('✅ Utilisateur authentifié:', user.email);
    } else {
      console.log('ℹ️ Aucun utilisateur authentifié');
    }

    // Test 3: Récupérer les profils
    console.log('\n📊 Récupération des profils...');
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (profilesError) {
      console.error('❌ Erreur lors de la récupération des profils:', profilesError);
      console.log('💡 Cela peut être dû à des permissions RLS (Row Level Security)');
      return;
    }

    console.log('✅ Profils récupérés avec succès');
    console.log('📈 Nombre de profils:', profiles?.length || 0);

    if (profiles && profiles.length > 0) {
      console.log('\n👥 Détails des profils:');
      profiles.forEach((profile, index) => {
        console.log(`${index + 1}. ${profile.first_name} ${profile.last_name}`);
        console.log(`   Email: ${profile.email}`);
        console.log(`   ID: ${profile.id}`);
        console.log(`   Rôle: ${profile.role_radio}`);
        console.log(`   Patriarche: ${profile.is_patriarch}`);
        console.log(`   Admin: ${profile.is_admin}`);
        console.log('---');
      });
    } else {
      console.log('⚠️ Aucun profil trouvé dans la base de données');
    }

    // Test 4: Vérifier les politiques RLS
    console.log('\n🔒 Vérification des politiques RLS...');
    const { data: policies, error: policiesError } = await supabase
      .rpc('get_policies', { table_name: 'profiles' });

    if (policiesError) {
      console.log('⚠️ Impossible de récupérer les politiques RLS');
    } else {
      console.log('📋 Politiques RLS pour la table profiles:');
      console.log(policies);
    }

  } catch (error) {
    console.error('❌ Erreur générale:', error);
  }
}

checkSupabaseConfig();
