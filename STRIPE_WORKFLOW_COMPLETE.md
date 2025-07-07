# Workflow Stripe Complet - Création de Dynastie

## 🎯 Vue d'ensemble

Ce workflow implémente un système de paiement Stripe sécurisé pour la création de dynasties, avec gestion des utilisateurs authentifiés et temporaires.

## 📁 Fichiers créés/modifiés

### Edge Functions Supabase
- `supabase/functions/create-checkout-session/index.ts` - Génère le token et crée la session Stripe
- `supabase/functions/stripe-webhook/index.ts` - Gère les webhooks Stripe (paiement complété)
- `supabase/functions/create-dynasty/index.ts` - Crée la dynastie après validation du paiement

### Frontend React
- `src/components/StripePaymentButton.tsx` - Composant de paiement Stripe
- `src/pages/DynastyPayment.tsx` - Page de paiement
- `src/pages/DynastyCreateForm.tsx` - Page de création de dynastie après paiement
- `vite.config.ts` - Configuration proxy pour les API

## 🔄 Workflow détaillé

### 1. Génération du `create_token` (avant Stripe)

**Fichier**: `supabase/functions/create-checkout-session/index.ts`

- Quand l'utilisateur clique sur "Payer 10 € et créer ma dynastie"
- Génère un `create_token` unique (UUID)
- Stocke en base avec :
  - `status: "pending"`
  - `user_id` ou `email` (si utilisateur temporaire)
  - `created_at` (horodatage)
  - `expires_at` (30 minutes)
  - `is_used: false`
  - `log: [{ status: 'pending', at: timestamp }]`

### 2. Création et ouverture de la session Stripe

**Fichier**: `supabase/functions/create-checkout-session/index.ts`

- Crée une session Stripe Checkout
- `success_url`: `${origin}/dynasty/create?create_token=${createToken}`
- `cancel_url`: `${origin}/dynasty/payment`
- Métadonnées Stripe :
  - `user_id`
  - `product_type: 'dynasty_creation'`
  - `user_email`
  - `create_token`
  - `is_temp_user`

**Frontend**: `src/components/StripePaymentButton.tsx`
- Ouvre Stripe Checkout dans une nouvelle fenêtre
- Surveille la fermeture de la fenêtre
- Vérifie le statut du token après fermeture

### 3. Webhook Stripe (checkout.session.completed)

**Fichier**: `supabase/functions/stripe-webhook/index.ts`

- Écoute l'événement `checkout.session.completed`
- Extrait le `create_token` des métadonnées
- Met à jour la base :
  ```json
  {
    "status": "paid",
    "paid_at": timestamp,
    "stripe_session_id": session.id,
    "log": [...previous_log, { status: 'paid', at: timestamp, session_id: session.id }]
  }
  ```

### 4. Page `/dynasty/create`

**Fichier**: `src/pages/DynastyCreateForm.tsx`

- Vérifie le token en base :
  - Existe
  - Status = 'paid'
  - Non expiré
  - Non utilisé
- Affiche le formulaire de création de dynastie
- Appelle l'API `create-dynasty`

### 5. Création de la dynastie

**Fichier**: `supabase/functions/create-dynasty/index.ts`

- Vérifications de sécurité du token
- Crée l'objet dynastie en base
- Génère un `admin_invite_token` avec préfixe `DYN_`
- Marque le `create_token` comme `used: true`
- Retourne l'URL de redirection

### 6. Redirection finale

**Frontend**: `src/pages/DynastyCreateForm.tsx`
- Redirige vers `/auth-family?token=DYN_abcdef...`
- Le token admin est pré-rempli et grisé
- Affiche le formulaire d'inscription administrateur

## 🔧 Configuration requise

### Variables d'environnement Supabase

```bash
# Dans Supabase Dashboard > Settings > Edge Functions
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Configuration Stripe

1. **Webhook endpoint** dans Stripe Dashboard :
   ```
   https://your-project.supabase.co/functions/v1/stripe-webhook
   ```

2. **Événements à écouter** :
   - `checkout.session.completed`

### Base de données

Table `dynasty_creation_tokens` :
```sql
CREATE TABLE dynasty_creation_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token UUID NOT NULL UNIQUE,
  user_id UUID,
  email TEXT,
  phone TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  amount INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  paid_at TIMESTAMP WITH TIME ZONE,
  used_at TIMESTAMP WITH TIME ZONE,
  is_used BOOLEAN DEFAULT FALSE,
  is_temp_user BOOLEAN DEFAULT FALSE,
  stripe_session_id TEXT,
  dynasty_id UUID REFERENCES dynasties(id),
  log JSONB DEFAULT '[]'::jsonb
);
```

## 🚀 Déploiement

### 1. Déployer les Edge Functions

```bash
# Dans le dossier supabase/functions
supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook
supabase functions deploy create-dynasty
```

### 2. Configurer les variables d'environnement

Dans Supabase Dashboard > Settings > Edge Functions :
- Ajouter toutes les variables d'environnement
- Redémarrer les fonctions

### 3. Configurer le webhook Stripe

Dans Stripe Dashboard > Webhooks :
- URL : `https://your-project.supabase.co/functions/v1/stripe-webhook`
- Événements : `checkout.session.completed`
- Copier le webhook secret dans les variables d'environnement

### 4. Tester le workflow

1. Aller sur `/dynasty/payment`
2. Cliquer sur "Payer 10 € et créer ma dynastie"
3. Vérifier que Stripe Checkout s'ouvre
4. Effectuer un paiement test
5. Vérifier la redirection vers `/dynasty/create`
6. Créer la dynastie
7. Vérifier la redirection vers `/auth-family`

## 🔒 Sécurité

- **Tokens sécurisés** : UUID générés avec `crypto.randomUUID()`
- **Expiration** : 30 minutes par défaut
- **Vérifications multiples** : status, expiration, utilisation
- **Logs complets** : traçabilité de toutes les étapes
- **Service role** : opérations critiques avec privilèges élevés
- **Validation Stripe** : signature webhook vérifiée

## 🐛 Dépannage

### Erreurs courantes

1. **"Token invalide"** : Vérifier que le token existe et n'est pas expiré
2. **"Paiement non validé"** : Attendre que le webhook Stripe soit traité
3. **"Signature invalide"** : Vérifier `STRIPE_WEBHOOK_SECRET`
4. **"Erreur création token"** : Vérifier les permissions de la base de données

### Logs utiles

- Edge Functions : Logs dans Supabase Dashboard
- Frontend : Console du navigateur
- Stripe : Dashboard > Logs

## 📝 Notes importantes

- **Interface Stripe obligatoire** : L'utilisateur DOIT voir et remplir le formulaire Stripe
- **Pas de bypass** : Impossible de contourner l'étape de saisie manuelle
- **Tokens uniques** : Chaque token ne peut être utilisé qu'une fois
- **Expiration automatique** : Nettoyage des tokens expirés recommandé
- **Redirection fluide** : L'utilisateur est guidé à chaque étape

## ✅ Checklist de validation

- [ ] Edge Functions déployées
- [ ] Variables d'environnement configurées
- [ ] Webhook Stripe configuré
- [ ] Base de données mise à jour
- [ ] Proxy Vite configuré
- [ ] Tests de paiement effectués
- [ ] Redirections fonctionnelles
- [ ] Logs de sécurité activés
