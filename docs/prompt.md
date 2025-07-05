# Prompt de refonte et d'amélioration pour un projet d'arbre généalogique

## Objectif général
Refactoriser et moderniser l'application d'arbre généalogique pour une expérience utilisateur optimale, une architecture claire et des fonctionnalités avancées.

## Fonctionnalités et corrections à implémenter

### 1. Loader d'application
- Le loader de chargement de l'application doit apparaître **seul en full-screen**, sans header, footer ni autres pages en arrière-plan.
- Il doit être animé (logo, barre de progression) et disparaître uniquement quand l'app est prête.

### 2. Gestion des profils et avatars
- À l'inscription, alimenter la table `profiles` avec toutes les métadonnées nécessaires (nom, prénom, email, civilité, rôle, etc.).
- Gérer l'upload de l'avatar dans le bucket Supabase `avatars` et stocker l'URL dans le profil.
- S'assurer que la création du profil et l'upload de l'avatar sont transactionnels (rollback si l'un échoue).

### 3. Affichage des cartes (Cards)
- Utiliser des composants Card pour présenter les informations sur **toutes les pages principales** :
  - `/dashboard/tree`
  - `/dashboard/invite`
  - `/dashboard/members`
  - `/index`
- Les Cards doivent être responsives, esthétiques et réutilisables.

### 4. Recherche avec autocomplétion
- Ajouter une zone de recherche avec autocomplétion dès le **premier caractère** sur :
  - `/dashboard/tree`
  - `/dashboard/members`
- Si aucun résultat, afficher un message "Aucun résultat" et effacer la zone après un court délai.
- Optimiser la recherche pour les grandes familles (pagination, debouncing, etc.).

### 5. Page Profil
- Créer une page `/profile` au design conventionnel :
  - Avatar, nom, prénom, email, civilité, téléphone, etc.
  - Bouton pour modifier le profil (modal ou page dédiée).
  - Upload d'avatar avec prévisualisation et confirmation.

### 6. Page Administration
- Créer une page `/dashboard/admin` réservée aux administrateurs.
- Afficher un tableau des utilisateurs et membres avec boutons CRUD (Créer, Lire, Modifier, Supprimer).
- Au clic sur un utilisateur, ouvrir une modal de modification (copie du formulaire profil, CRUD complet).
- Permettre à l'administrateur de choisir le Patriarche ou la Matriarche (1 seul de chaque par famille, logique à verrouiller côté back et front).
- Ajouter des filtres et une recherche sur le tableau admin.

### 7. Logiques et UX supplémentaires
- Sécuriser toutes les routes sensibles (ProtectedRoute, vérification du rôle, etc.).
- Gérer les erreurs globales et afficher des toasts/alertes clairs.
- Ajouter des logs (console ou Sentry) pour les actions critiques (inscription, suppression, changement de rôle, etc.).
- Optimiser le code pour la maintenabilité (dossier `components/ui`, hooks réutilisables, validations Zod centralisées, etc.).
- Prévoir l'internationalisation (i18n) pour le français et l'anglais.
- Ajouter des tests unitaires et d'intégration sur les composants critiques.

### 8. Suggestions d'amélioration (bonus)
- Ajouter une timeline des événements familiaux (naissances, mariages, décès, etc.).
- Permettre l'import/export de l'arbre au format GEDCOM.
- Ajouter un système de notifications (invitation, nouveaux membres, etc.).
- Prévoir un mode "vue arbre" et un mode "vue liste" pour les membres.
- Ajouter un système de rôles avancé (admin, membre, invité, etc.).
- Prévoir une API REST ou GraphQL pour l'ouverture à d'autres apps.

---

**Ce prompt doit servir de base à un agent IA pour refondre, corriger et enrichir le projet d'arbre généalogique.**
