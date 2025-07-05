# 🚀 Résolution Rapide - Affichage des Membres

## Problème
Les membres ne s'affichent pas dans l'arbre familial du dashboard.

## Solution en 3 étapes

### 1. Exécuter le script SQL dans Supabase
1. Aller dans votre projet Supabase
2. Ouvrir l'éditeur SQL
3. Copier et coller le contenu du fichier `fix-permissions.sql`
4. Exécuter le script

### 2. Vérifier les logs dans le navigateur
1. Ouvrir la console du navigateur (F12)
2. Aller sur le dashboard
3. Chercher les logs avec ces emojis :
   - 🔍 `[fetchMembers] Début de la récupération des membres`
   - 📊 `[fetchMembers] Réponse Supabase:`
   - ✅ `[fetchMembers] Profils trouvés:`
   - 🌳 `[FamilyTree] État actuel:`

### 3. Vérifier le panel de debug
Dans le dashboard, regarder le panel orange "Debug - Membres" dans la sidebar pour voir :
- Nombre de membres chargés
- État de chargement
- Détails des membres trouvés

## Si le problème persiste

### Vérifier l'authentification
```javascript
// Dans la console du navigateur
const { data: { user } } = await supabase.auth.getUser();
console.log('Utilisateur:', user);
```

### Vérifier les données
```sql
-- Dans l'éditeur SQL de Supabase
SELECT COUNT(*) FROM profiles;
SELECT * FROM profiles LIMIT 5;
```

### Vérifier les variables d'environnement
S'assurer que dans `.env.local` :
```
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-clé-anon
```

## Logs attendus

Si tout fonctionne, vous devriez voir :
```
🔍 [fetchMembers] Début de la récupération des membres
📊 [fetchMembers] Réponse Supabase: { profiles: [...], fetchError: null }
✅ [fetchMembers] Profils trouvés: 3
👥 [fetchMembers] Membres transformés: [...]
🌳 [FamilyTree] État actuel: { members: 3, isLoading: false, treeData: {...} }
```

## Contact
Si le problème persiste après ces étapes, vérifiez :
1. La configuration Supabase
2. Les permissions RLS
3. L'authentification utilisateur
4. Les données dans la table `profiles`
