# Système Multi-Dynasties - Documentation

## Vue d'ensemble
Système permettant d'isoler chaque famille dans son propre espace sécurisé. Un utilisateur = une dynastie.

## Architecture

### Flux principal
1. Nouvel utilisateur → `/dynasty` (sélection)
2. Créer dynastie → Formulaire → Admin automatique
3. Rejoindre dynastie → Lien invitation → Rôle attribué
4. Après inscription → Espace dynastie isolé

## Fichiers créés/modifiés

### Nouveaux composants
- `src/pages/DynastySelector.tsx` - Sélection créer/rejoindre
- `src/pages/DynastyCreateForm.tsx` - Création dynastie
- `src/components/DynastyInviteHandler.tsx` - Gestion invitations
- `src/hooks/useInvitation.ts` - Hook invitations

### Modifications
- `src/pages/auth/AuthFamily.tsx` - Gestion invitations
- `src/components/family/FamilyRegisterForm.tsx` - Préremplissage
- `src/App.tsx` - Nouvelles routes
- `src/lib/constants/routes.ts` - Routes dynastie

## Base de données

### Tables
```sql
-- Table dynasties
CREATE TABLE dynasties (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  description TEXT,
  founding_year INTEGER,
  created_by UUID REFERENCES auth.users(id)
);

-- Table invites
CREATE TABLE invites (
  id UUID PRIMARY KEY,
  dynasty_id UUID REFERENCES dynasties(id),
  user_role TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT FALSE
);

-- Modification profiles
ALTER TABLE profiles ADD COLUMN dynasty_id UUID REFERENCES dynasties(id);
```

### Fonctions RPC
- `get_invitation_data(invite_token)` - Récupère données invitation
- `mark_invitation_used(invite_id)` - Marque invitation utilisée
- `create_invitation(dynasty_id, user_role)` - Crée invitation

## Routes

```tsx
DYNASTY: {
  SELECTOR: '/dynasty',        // Sélection dynastie
  CREATE: '/dynasty/create',   // Création dynastie
},
INVITE: '/invite',            // Gestion invitation
```

## Fonctionnalités clés

### 1. DynastySelector
- Interface choix créer/rejoindre dynastie
- Animations et design cohérent
- Redirection automatique

### 2. DynastyCreateForm
- Formulaire création dynastie
- Champs : nom, localisation, description, année
- Utilisateur devient admin + patriarche automatiquement

### 3. DynastyInviteHandler
- Gestion liens `?invite=TOKEN`
- Vérification validité/expiration/utilisation
- Redirection vers AuthFamily avec données

### 4. Modifications AuthFamily
- Détection automatique token invitation
- Vérification via RPC Supabase
- Affichage alertes selon état
- Basculage auto vers inscription

### 5. Modifications FamilyRegisterForm
- Accepte `invitationData` en props
- Préremplit et verrouille dynastie/rôle
- Ajuste civilité selon rôle
- Ajoute `dynasty_id` au profil

## Sécurité RLS

```sql
-- Dynasties : lecture membres, écriture admin
-- Invites : lecture/création admin dynastie
-- Profiles : isolation par dynasty_id
```

## Tests

### Scénarios
1. Création dynastie → vérification création + rôles
2. Invitation lien → vérification validité + inscription
3. Gestion erreurs → token invalide/expiré/utilisé

## Déploiement

1. Exécuter migrations SQL
2. Vérifier types TypeScript
3. Tester flux complet
4. Aucune nouvelle variable d'environnement

## Maintenance

- Surveiller erreurs création invitation
- Nettoyer invitations expirées
- Monitorer utilisation dynasties

---

**Version** : 1.0 | **Date** : 2024
