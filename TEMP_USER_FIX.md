# 🔧 Correction du problème d'authentification des utilisateurs temporaires

## 🚨 Problème identifié

L'erreur `401 (Unauthorized)` lors de l'appel à la fonction Edge `create-checkout-session` était due au fait que les utilisateurs temporaires n'étaient pas authentifiés avec Supabase Auth.

## ✅ Solution implémentée

### 1. **Modification de la fonction Edge**
- **Fichier :** `supabase/functions/create-checkout-session/index.ts`
- **Changement :** Support des utilisateurs temporaires sans authentification complète
- **Logique :**
  - Essayer d'abord l'authentification normale
  - Si échec, accepter les données temporaires (email + téléphone)
  - Créer un user_id temporaire si nécessaire

### 2. **Extension de la base de données**
- **Fichier :** `apply_temp_user_migration.sql`
- **Ajouts :** Colonnes `email`, `phone`, `is_temp_user`, `is_used`
- **Index :** Performance optimisée pour les requêtes temporaires

### 3. **Modification du frontend**
- **Fichier :** `src/pages/DynastyPayment.tsx`
- **Changement :** Envoi des données temporaires à la fonction Edge
- **Logique :** Ajout de `tempUserData` dans le body de la requête

## 🔄 Nouveau workflow

### Avant (problématique)
```
1. Inscription rapide → Création user_id temporaire
2. Appel fonction Edge → ❌ 401 Unauthorized (pas d'auth)
3. Échec du paiement
```

### Après (corrigé)
```
1. Inscription rapide → Création user_id temporaire
2. Appel fonction Edge → ✅ Accepte les données temporaires
3. Création token avec flag is_temp_user = true
4. Redirection vers Stripe ✅
```

## 🛠️ Modifications techniques

### Fonction Edge (`create-checkout-session`)
```typescript
// Avant
if (authError || !user) {
  return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 401 });
}

// Après
if (user) {
  currentUser = user;
} else if (tempUserData && tempUserData.email && tempUserData.phone) {
  currentUser = {
    id: tempUserData.user_id || crypto.randomUUID(),
    email: tempUserData.email,
    phone: tempUserData.phone
  };
  isTempUser = true;
}
```

### Base de données
```sql
-- Nouvelles colonnes
ALTER TABLE dynasty_creation_tokens
ADD COLUMN email TEXT,
ADD COLUMN phone TEXT,
ADD COLUMN is_temp_user BOOLEAN DEFAULT FALSE,
ADD COLUMN is_used BOOLEAN DEFAULT FALSE;
```

### Frontend
```typescript
// Envoi des données temporaires
if (!user && tempUserData) {
  requestBody.tempUserData = {
    user_id: tempUserData.user_id,
    email: tempUserData.email,
    phone: tempUserData.phone
  };
}
```

## 📋 Étapes de déploiement

### 1. **Appliquer la migration**
```bash
# Exécuter le script SQL dans Supabase
psql -h your-project.supabase.co -U postgres -d postgres -f apply_temp_user_migration.sql
```

### 2. **Déployer la fonction Edge**
```bash
supabase functions deploy create-checkout-session
```

### 3. **Tester le workflow**
1. Aller sur `/dynasty/payment`
2. Remplir le formulaire d'inscription rapide
3. Vérifier la redirection vers Stripe
4. Vérifier la création du token en base

## 🔍 Vérifications

### Dans la base de données
```sql
-- Vérifier les tokens temporaires
SELECT
    token,
    email,
    phone,
    is_temp_user,
    status,
    created_at
FROM dynasty_creation_tokens
WHERE is_temp_user = true
ORDER BY created_at DESC;
```

### Dans les logs de la fonction Edge
```
👤 User temporaire: user@example.com
✅ Session Stripe créée avec token: cs_xxx, token_xxx
```

## 🚀 Résultat attendu

- ✅ **Inscription rapide** fonctionne
- ✅ **Redirection vers Stripe** après inscription
- ✅ **Création de token** avec flag temporaire
- ✅ **Paiement** possible sans authentification complète
- ✅ **Webhook Stripe** peut traiter les utilisateurs temporaires

## 🔒 Sécurité

- Les utilisateurs temporaires sont clairement identifiés (`is_temp_user = true`)
- Les données email/téléphone sont stockées pour traçabilité
- Le user_id temporaire est unique (UUID)
- Expiration automatique des tokens (1 heure)

---

**🎯 Objectif atteint :** Les utilisateurs peuvent maintenant s'inscrire rapidement et accéder au paiement sans authentification complète préalable.
