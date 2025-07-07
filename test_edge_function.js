// Script de test pour la fonction Edge create-checkout-session
// Exécuter avec: node test_edge_function.js

const { createClient } = require('@supabase/supabase-js');

// Configuration Supabase (remplacer par vos vraies valeurs)
const supabaseUrl = 'https://aaxfvyorhasbwlaovrdf.supabase.co';
const supabaseAnonKey = 'your-anon-key'; // Remplacer par votre clé

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testEdgeFunction() {
  console.log('🧪 Test de la fonction Edge create-checkout-session...');

  try {
    // Test avec utilisateur temporaire
    const tempUserData = {
      user_id: 'test-user-' + Date.now(),
      email: 'test@example.com',
      phone: '+33123456789'
    };

    console.log('📤 Envoi des données temporaires:', tempUserData);

    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: {
        successUrl: 'http://localhost:8080/dynasty/create',
        cancelUrl: 'http://localhost:8080/dynasty/payment',
        customAmount: 1000,
        tempUserData: tempUserData
      }
    });

    if (error) {
      console.error('❌ Erreur:', error);
      return;
    }

    console.log('✅ Succès:', data);
    console.log('🔗 URL Stripe:', data.url);

  } catch (error) {
    console.error('🔥 Erreur de test:', error);
  }
}

// Test de la connexion Supabase
async function testConnection() {
  console.log('🔌 Test de connexion Supabase...');

  try {
    const { data, error } = await supabase
      .from('dynasty_creation_tokens')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ Erreur connexion:', error);
    } else {
      console.log('✅ Connexion réussie');
    }
  } catch (error) {
    console.error('🔥 Erreur de connexion:', error);
  }
}

// Exécuter les tests
async function runTests() {
  console.log('🚀 Démarrage des tests...\n');

  await testConnection();
  console.log('');

  await testEdgeFunction();
  console.log('\n🏁 Tests terminés');
}

// Exécuter si le script est appelé directement
if (require.main === module) {
  runTests();
}

module.exports = { testEdgeFunction, testConnection };
