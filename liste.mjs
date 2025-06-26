import***REMOVED***fs***REMOVED***from***REMOVED***'fs';
import***REMOVED***path***REMOVED***from***REMOVED***'path';
import***REMOVED***{***REMOVED***fileURLToPath***REMOVED***}***REMOVED***from***REMOVED***'url';

//***REMOVED***Convertir***REMOVED***les***REMOVED***URL***REMOVED***en***REMOVED***chemins***REMOVED***de***REMOVED***fichiers***REMOVED***(nécessaire***REMOVED***pour***REMOVED***ESM)
const***REMOVED***__filename***REMOVED***=***REMOVED***fileURLToPath(import.meta.url);
const***REMOVED***__dirname***REMOVED***=***REMOVED***path.dirname(__filename);

//***REMOVED***Configuration
const***REMOVED***rootDir***REMOVED***=***REMOVED***'.';
const***REMOVED***exclusions***REMOVED***=***REMOVED***['node_modules',***REMOVED***'dist',***REMOVED***'public',***REMOVED***'nhost',***REMOVED***'.vscode',***REMOVED***'.nuxt',***REMOVED***'.output',***REMOVED***'.git',***REMOVED***'.bolt',***REMOVED***'.next'];
let***REMOVED***outputFile***REMOVED***=***REMOVED***'project_structure.txt';

//***REMOVED***Vérifier***REMOVED***si***REMOVED***le***REMOVED***fichier***REMOVED***existe***REMOVED***déjà***REMOVED***et***REMOVED***l'incrémenter
let***REMOVED***counter***REMOVED***=***REMOVED***1;
while***REMOVED***(fs.existsSync(outputFile))***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***outputFile***REMOVED***=***REMOVED***`project_structure_${counter++}.txt`;
}

//***REMOVED***Fonction***REMOVED***récursive***REMOVED***pour***REMOVED***lister***REMOVED***la***REMOVED***structure***REMOVED***avec***REMOVED***indentation
function***REMOVED***listDir(dir,***REMOVED***indent***REMOVED***=***REMOVED***'')***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***items***REMOVED***=***REMOVED***fs.readdirSync(dir);

***REMOVED******REMOVED******REMOVED******REMOVED***for***REMOVED***(const***REMOVED***item***REMOVED***of***REMOVED***items)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***fullPath***REMOVED***=***REMOVED***path.join(dir,***REMOVED***item);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***isDirectory***REMOVED***=***REMOVED***fs.statSync(fullPath).isDirectory();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(exclusions.includes(item))***REMOVED***continue;

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***fs.appendFileSync(outputFile,***REMOVED***`${indent}${isDirectory***REMOVED***?***REMOVED***'📁'***REMOVED***:***REMOVED***'📄'}***REMOVED***${item}\n`);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(isDirectory)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***listDir(fullPath,***REMOVED***indent***REMOVED***+***REMOVED***'***REMOVED******REMOVED***');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***}
}

//***REMOVED***Exécuter***REMOVED***la***REMOVED***fonction
fs.writeFileSync(outputFile,***REMOVED***`Structure***REMOVED***du***REMOVED***projet***REMOVED***(exclusions***REMOVED***:***REMOVED***${exclusions.join(',***REMOVED***')})\n========================================\n\n`);
listDir(rootDir);
console.log(`La***REMOVED***structure***REMOVED***du***REMOVED***projet***REMOVED***a***REMOVED***été***REMOVED***enregistrée***REMOVED***dans***REMOVED***"${outputFile}"`);