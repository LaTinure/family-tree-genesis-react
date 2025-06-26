const***REMOVED***fs***REMOVED***=***REMOVED***require('fs');
const***REMOVED***path***REMOVED***=***REMOVED***require('path');

//***REMOVED***Fonction***REMOVED***pour***REMOVED***corriger***REMOVED***les***REMOVED***erreurs***REMOVED***dans***REMOVED***les***REMOVED***fichiers
function***REMOVED***fixFileErrors(filePath)***REMOVED***{
***REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***let***REMOVED***content***REMOVED***=***REMOVED***fs.readFileSync(filePath,***REMOVED***'utf8');
***REMOVED******REMOVED******REMOVED******REMOVED***let***REMOVED***modified***REMOVED***=***REMOVED***false;

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Correction***REMOVED***1:***REMOVED***Supprimer***REMOVED***les***REMOVED***logs***REMOVED***problématiques
***REMOVED******REMOVED******REMOVED******REMOVED***content***REMOVED***=***REMOVED***content.replace(/console\.log\('🎭***REMOVED***\[.*?\]***REMOVED***Rôle.*?\);?\n?/g,***REMOVED***'');
***REMOVED******REMOVED******REMOVED******REMOVED***content***REMOVED***=***REMOVED***content.replace(/console\.log\('🎭***REMOVED***\[.*?\]***REMOVED***Type.*?\);?\n?/g,***REMOVED***'');
***REMOVED******REMOVED******REMOVED******REMOVED***content***REMOVED***=***REMOVED***content.replace(/console\.log\('🎭***REMOVED***\[.*?\]***REMOVED***Longueur.*?\);?\n?/g,***REMOVED***'');
***REMOVED******REMOVED******REMOVED******REMOVED***content***REMOVED***=***REMOVED***content.replace(/console\.log\('🎭***REMOVED***\[.*?\]***REMOVED***Code***REMOVED***ASCII.*?\);?\n?/g,***REMOVED***'');

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Correction***REMOVED***2:***REMOVED***Corriger***REMOVED***les***REMOVED***variables***REMOVED***profileData
***REMOVED******REMOVED******REMOVED******REMOVED***content***REMOVED***=***REMOVED***content.replace(/profileData\./g,***REMOVED***'profileDataToInsert.');

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Correction***REMOVED***3:***REMOVED***Supprimer***REMOVED***les***REMOVED***boutons***REMOVED***de***REMOVED***routes***REMOVED***inexistantes
***REMOVED******REMOVED******REMOVED******REMOVED***content***REMOVED***=***REMOVED***content.replace(/<motion\.button[^>]*onClick=\{\(\)***REMOVED***=>***REMOVED***\{[^}]*navigate\('\/dashboard\/profile'\)[^}]*\}[^>]*>[\s\S]*?<\/motion\.button>/g,***REMOVED***'');
***REMOVED******REMOVED******REMOVED******REMOVED***content***REMOVED***=***REMOVED***content.replace(/<motion\.button[^>]*onClick=\{\(\)***REMOVED***=>***REMOVED***\{[^}]*navigate\('\/dashboard\/notifications'\)[^}]*\}[^>]*>[\s\S]*?<\/motion\.button>/g,***REMOVED***'');
***REMOVED******REMOVED******REMOVED******REMOVED***content***REMOVED***=***REMOVED***content.replace(/<motion\.button[^>]*onClick=\{\(\)***REMOVED***=>***REMOVED***\{[^}]*navigate\('\/dashboard\/settings'\)[^}]*\}[^>]*>[\s\S]*?<\/motion\.button>/g,***REMOVED***'');

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Correction***REMOVED***4:***REMOVED***Supprimer***REMOVED***les***REMOVED***imports***REMOVED***inutilisés
***REMOVED******REMOVED******REMOVED******REMOVED***content***REMOVED***=***REMOVED***content.replace(/import.*?Search.*?from.*?lucide-react.*?\n/g,***REMOVED***'');

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(content***REMOVED***!==***REMOVED***fs.readFileSync(filePath,***REMOVED***'utf8'))***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***fs.writeFileSync(filePath,***REMOVED***content,***REMOVED***'utf8');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log(`✅***REMOVED***Corrigé:***REMOVED***${filePath}`);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***modified***REMOVED***=***REMOVED***true;
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***modified;
***REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***console.error(`❌***REMOVED***Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***correction***REMOVED***de***REMOVED***${filePath}:`,***REMOVED***error.message);
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***false;
***REMOVED******REMOVED***}
}

//***REMOVED***Liste***REMOVED***des***REMOVED***fichiers***REMOVED***à***REMOVED***corriger
const***REMOVED***filesToFix***REMOVED***=***REMOVED***[
***REMOVED******REMOVED***'src/components/family/FamilyRegisterForm.tsx',
***REMOVED******REMOVED***'src/components/layout/Header.tsx',
***REMOVED******REMOVED***'src/hooks/useAuth.tsx'
];

console.log('🔧***REMOVED***Début***REMOVED***de***REMOVED***la***REMOVED***correction***REMOVED***automatique***REMOVED***des***REMOVED***erreurs...\n');

let***REMOVED***fixedCount***REMOVED***=***REMOVED***0;
filesToFix.forEach(file***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***if***REMOVED***(fs.existsSync(file))***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(fixFileErrors(file))***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***fixedCount++;
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***}***REMOVED***else***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***console.log(`⚠️***REMOVED***Fichier***REMOVED***non***REMOVED***trouvé:***REMOVED***${file}`);
***REMOVED******REMOVED***}
});

console.log(`\n🎉***REMOVED***Correction***REMOVED***terminée!***REMOVED***${fixedCount}***REMOVED***fichiers***REMOVED***corrigés.`);
console.log('\n📝***REMOVED***Prochaines***REMOVED***étapes:');
console.log('1.***REMOVED***Exécutez***REMOVED***le***REMOVED***script***REMOVED***SQL***REMOVED***dans***REMOVED***Supabase***REMOVED***pour***REMOVED***corriger***REMOVED***la***REMOVED***contrainte***REMOVED***de***REMOVED***rôle');
console.log('2.***REMOVED***Testez***REMOVED***l\'inscription***REMOVED***avec***REMOVED***le***REMOVED***rôle***REMOVED***"Membre"');
console.log('3.***REMOVED***Vérifiez***REMOVED***que***REMOVED***l\'application***REMOVED***fonctionne***REMOVED***correctement');
