# Diagnostic - Affichage des Membres dans l'Arbre Familial

## Problème
Les membres ne s'affichent pas dans la section "Arbre Familial Interactif" du dashboard.

## Causes possibles

### 1. Permissions Supabase (RLS)
Le problème le plus probable est que les politiques RLS (Row Level Security) empêchent la lecture des profils.

**Solution :**
```sql
-- Exécuter dans l'éditeur SQL de Supabase
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Permettre la lecture de tous les profils
CREATE POLICY "Profiles are viewable by everyone" ON profiles
    FOR SELECT
    USING (true);
```

### 2. Authentification
L'utilisateur n'est peut-être pas authentifié correctement.

**Vérification :**
- Ouvrir la console du navigateur
- Vérifier les logs avec les emojis 🔍, 📊, ✅, ⚠️
- S'assurer que l'utilisateur est connecté

### 3. Données manquantes
La table `profiles` pourrait être vide.

**Vérification :**
```sql
SELECT COUNT(*) FROM profiles;
SELECT * FROM profiles LIMIT 5;
```

### 4. Configuration des variables d'environnement
Les clés Supabase pourraient être incorrectes.

**Vérification :**
- Vérifier `.env.local` ou les variables d'environnement
- S'assurer que `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` sont corrects

## Étapes de diagnostic

1. **Ouvrir la console du navigateur** (F12)
2. **Aller sur le dashboard** et regarder les logs
3. **Vérifier le panel de debug** (orange) dans la sidebar
4. **Exécuter le script SQL** de permissions ci-dessus
5. **Redémarrer l'application** si nécessaire

## Logs à surveiller

Dans la console, chercher :
- `🔍 [fetchMembers] Début de la récupération des membres`
- `📊 [fetchMembers] Réponse Supabase:`
- `✅ [fetchMembers] Profils trouvés:`
- `🌳 [FamilyTree] État actuel:`

## Solution rapide

Si le problème persiste, exécuter ce script SQL dans Supabase :

```sql
-- Solution complète
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;

CREATE POLICY "Profiles are viewable by everyone" ON profiles
    FOR SELECT
    USING (true);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
```
