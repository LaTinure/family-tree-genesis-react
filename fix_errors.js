const fs = require('fs');
const path = require('path');

// Fonction pour corriger les erreurs dans les fichiers
function fixFileErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Correction 1: Supprimer les logs problématiques
    content = content.replace(/console\.log\('🎭 \[.*?\] Rôle.*?\);?\n?/g, '');
    content = content.replace(/console\.log\('🎭 \[.*?\] Type.*?\);?\n?/g, '');
    content = content.replace(/console\.log\('🎭 \[.*?\] Longueur.*?\);?\n?/g, '');
    content = content.replace(/console\.log\('🎭 \[.*?\] Code ASCII.*?\);?\n?/g, '');

    // Correction 2: Corriger les variables profileData
    content = content.replace(/profileData\./g, 'profileDataToInsert.');

    // Correction 3: Supprimer les boutons de routes inexistantes
    content = content.replace(/<motion\.button[^>]*onClick=\{\(\) => \{[^}]*navigate\('\/dashboard\/profile'\)[^}]*\}[^>]*>[\s\S]*?<\/motion\.button>/g, '');
    content = content.replace(/<motion\.button[^>]*onClick=\{\(\) => \{[^}]*navigate\('\/dashboard\/notifications'\)[^}]*\}[^>]*>[\s\S]*?<\/motion\.button>/g, '');
    content = content.replace(/<motion\.button[^>]*onClick=\{\(\) => \{[^}]*navigate\('\/dashboard\/settings'\)[^}]*\}[^>]*>[\s\S]*?<\/motion\.button>/g, '');

    // Correction 4: Supprimer les imports inutilisés
    content = content.replace(/import.*?Search.*?from.*?lucide-react.*?\n/g, '');

    if (content !== fs.readFileSync(filePath, 'utf8')) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Corrigé: ${filePath}`);
      modified = true;
    }

    return modified;
  } catch (error) {
    console.error(`❌ Erreur lors de la correction de ${filePath}:`, error.message);
    return false;
  }
}

// Liste des fichiers à corriger
const filesToFix = [
  'src/components/family/FamilyRegisterForm.tsx',
  'src/components/layout/Header.tsx',
  'src/hooks/useAuth.tsx'
];

console.log('🔧 Début de la correction automatique des erreurs...\n');

let fixedCount = 0;
filesToFix.forEach(file => {
  if (fs.existsSync(file)) {
    if (fixFileErrors(file)) {
      fixedCount++;
    }
  } else {
    console.log(`⚠️ Fichier non trouvé: ${file}`);
  }
});

console.log(`\n🎉 Correction terminée! ${fixedCount} fichiers corrigés.`);
console.log('\n📝 Prochaines étapes:');
console.log('1. Exécutez le script SQL dans Supabase pour corriger la contrainte de rôle');
console.log('2. Testez l\'inscription avec le rôle "Membre"');
console.log('3. Vérifiez que l\'application fonctionne correctement');
