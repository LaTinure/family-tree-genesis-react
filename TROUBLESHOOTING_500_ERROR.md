# 🔧 Dépannage : Erreur 500 - Fonction Edge create-checkout-session

## 🚨 Problème
```
POST https://aaxfvyorhasbwlaovrdf.supabase.co/functions/v1/create-checkout-session 500 (Internal Server Error)
```

## 🔍 Diagnostic

### 1. **Vérifier les logs de la fonction Edge**
```bash
# Dans Supabase Dashboard
1. Aller dans "Edge Functions"
2. Cliquer sur "create-checkout-session"
3. Voir les logs en temps réel
```

### 2. **Vérifier la structure de la table**
```sql
-- Exécuter dans Supabase SQL Editor
SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'dynasty_creation_tokens'
ORDER BY ordinal_position;
```

### 3. **Vérifier les permissions RLS**
```sql
-- Vérifier les politiques
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'dynasty_creation_tokens';
```

## 🛠️ Solutions

### **Solution 1 : Appliquer la migration**
```sql
-- Exécuter simple_temp_user_migration.sql dans Supabase SQL Editor
-- Ou exécuter manuellement :

-- 1. Supprimer la contrainte
ALTER TABLE dynasty_creation_tokens
DROP CONSTRAINT IF EXISTS dynasty_creation_tokens_user_id_fkey;

-- 2. Ajouter les colonnes
ALTER TABLE dynasty_creation_tokens
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS is_temp_user BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_used BOOLEAN DEFAULT FALSE;

-- 3. Désactiver RLS
ALTER TABLE dynasty_creation_tokens DISABLE ROW LEVEL SECURITY;

-- 4. Recréer les politiques
DROP POLICY IF EXISTS "Service can insert tokens" ON dynasty_creation_tokens;
CREATE POLICY "Service can insert tokens" ON dynasty_creation_tokens
    FOR INSERT WITH CHECK (true);

-- 5. Réactiver RLS
ALTER TABLE dynasty_creation_tokens ENABLE ROW LEVEL SECURITY;
```

### **Solution 2 : Déployer la fonction Edge**
```bash
# Dans le terminal
supabase functions deploy create-checkout-session
```

### **Solution 3 : Version de fallback**
Si les nouvelles colonnes ne sont pas disponibles, la fonction Edge utilise maintenant une version de fallback avec les colonnes de base.

## 🧪 Tests

### **Test 1 : Vérifier la table**
```sql
-- Test d'insertion simple
INSERT INTO dynasty_creation_tokens (
    token,
    user_id,
    status,
    amount,
    expires_at
) VALUES (
    'test-' || gen_random_uuid(),
    gen_random_uuid(),
    'pending',
    1000,
    NOW() + INTERVAL '1 hour'
);

-- Vérifier
SELECT * FROM dynasty_creation_tokens WHERE token LIKE 'test-%';
```

### **Test 2 : Test de la fonction Edge**
```javascript
// Utiliser le script test_edge_function.js
// Remplacer 'your-anon-key' par votre vraie clé
node test_edge_function.js
```

## 🔍 Logs à vérifier

### **Logs attendus en cas de succès**
```
🔑 Authorization header: Bearer xxx
📦 Requête JSON: { tempUserData: {...} }
👤 User temporaire: test@example.com
✅ Session Stripe créée avec token: cs_xxx, token_xxx
```

### **Logs d'erreur courants**
```
❌ Erreur création token: { code: '42501', message: 'permission denied' }
❌ Erreur création token: { code: '42703', message: 'column does not exist' }
```

## 🚀 Déploiement étape par étape

### **Étape 1 : Migration de la base**
1. Copier `simple_temp_user_migration.sql`
2. Exécuter dans Supabase SQL Editor
3. Vérifier que les colonnes sont ajoutées

### **Étape 2 : Déploiement de la fonction**
```bash
supabase functions deploy create-checkout-session
```

### **Étape 3 : Test**
1. Aller sur `/dynasty/payment`
2. Remplir le formulaire d'inscription rapide
3. Vérifier la redirection vers Stripe

## 🔒 Vérifications de sécurité

### **Permissions RLS**
```sql
-- Vérifier que le service role peut insérer
SELECT has_table_privilege('service_role', 'dynasty_creation_tokens', 'INSERT');
```

### **Variables d'environnement**
```bash
# Vérifier dans Supabase Dashboard > Settings > Edge Functions
STRIPE_SECRET_KEY=sk_test_...
SUPABASE_URL=https://...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

## 📞 Support

Si le problème persiste :
1. Vérifier les logs de la fonction Edge
2. Tester avec un utilisateur authentifié
3. Vérifier la configuration Stripe
4. Contacter le support Supabase si nécessaire

---

**🎯 Objectif :** Résoudre l'erreur 500 pour permettre l'inscription rapide et la redirection vers Stripe.
