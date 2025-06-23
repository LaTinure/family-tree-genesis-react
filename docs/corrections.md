
# Corrections apportées au projet d'arbre généalogique

## Date: 23 juin 2025

### Dernière correction : Implémentation fonctionnalité "Delete All"

#### Problème identifié
Besoin d'une fonctionnalité pour supprimer complètement toutes les données du projet (reset complet) à des fins de développement et de test.

#### Corrections apportées

##### 1. Création de l'Edge Function de suppression
- **Fichier**: `supabase/functions/delete-all-data/index.ts`
- **Fonction**: Suppression complète et sécurisée de toutes les données
- **Fonctionnalités**:
  - Suppression de tous les utilisateurs authentifiés via `supabaseAdmin.auth.admin.deleteUser()`
  - Vidage de toutes les tables publiques dans l'ordre correct
  - Gestion CORS pour appels frontend
  - Logging détaillé pour audit et débogage
  - Retour JSON avec statistiques de suppression

##### 2. Intégration frontend
- **Fichier**: `src/pages/Index.tsx`
- **Modification**: Ajout du bouton "Delete All" avec double confirmation
- **Sécurité**: 
  - Première confirmation générale
  - Seconde confirmation explicite
  - Indicateur de chargement pendant l'opération
  - Déconnexion automatique après suppression

##### 3. Workflow d'exécution
1. **Déclenchement**: Clic sur bouton "Delete All"
2. **Confirmations**: Double validation utilisateur
3. **Appel API**: `supabase.functions.invoke('delete-all-data')`
4. **Backend**: 
   - Suppression utilisateurs auth
   - Vidage tables publiques
   - Logging des opérations
5. **Frontend**:
   - Toast de confirmation
   - Déconnexion utilisateur
   - Rechargement page

##### 4. Méthode d'appel de chaque fichier

###### Edge Function (`supabase/functions/delete-all-data/index.ts`)
```typescript
// Appel depuis le frontend
const { data, error } = await supabase.functions.invoke('delete-all-data', {
  method: 'POST'
});
```

###### Composant Frontend (`src/pages/Index.tsx`)
```typescript
const handleDeleteAll = async () => {
  // Double confirmation
  if (!confirm('Premier avertissement')) return;
  if (!confirm('Confirmation finale')) return;
  
  // Exécution
  setIsDeleting(true);
  try {
    const { data, error } = await supabase.functions.invoke('delete-all-data');
    if (error) throw error;
    
    // Succès : déconnexion et rechargement
    await supabase.auth.signOut();
    window.location.reload();
  } catch (error) {
    // Gestion d'erreur avec toast
  } finally {
    setIsDeleting(false);
  }
};
```

#### Adaptation pour autres projets

##### Variables d'environnement requises
- `SUPABASE_URL`: URL du projet Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Clé de service pour permissions admin

##### Fichiers à créer/modifier
1. **Edge Function**: `supabase/functions/delete-all-data/index.ts`
2. **Frontend**: Composant avec bouton (page ou menu utilisateur)
3. **Configuration**: Variables d'environnement Supabase

##### Adaptations spécifiques
1. **Tables à supprimer**: Modifier le tableau `tablesToDelete` selon votre schéma
2. **Ordre de suppression**: Respecter les contraintes de clés étrangères
3. **Interface utilisateur**: Adapter les confirmations et messages
4. **Permissions**: Vérifier les RLS policies et accès admin

##### Code type pour menu utilisateur
```typescript
// Alternative : menu dropdown utilisateur
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu';

<DropdownMenuItem
  onClick={handleDeleteAll}
  className="text-red-600"
>
  <Trash2 className="mr-2 h-4 w-4" />
  Delete All
</DropdownMenuItem>
```

#### Tests recommandés
1. **Environnement dev**: Tester d'abord sur données non critiques
2. **Permissions**: Vérifier que seuls les admins ont accès
3. **Logs**: Contrôler les logs de l'Edge Function
4. **Rollback**: S'assurer qu'aucune donnée critique n'est affectée

#### Sécurité implémentée
- ✅ Double confirmation obligatoire
- ✅ Utilisation de la service role key
- ✅ Logging complet des opérations
- ✅ Gestion d'erreurs robuste
- ✅ Interface utilisateur explicite
- ✅ Déconnexion automatique post-suppression

---

## Date: 22 décembre 2024

### Problème identifié
Le formulaire d'inscription affichait toujours les éléments liés au patriarche/matriarche (bandeau, champs de relation, etc.) même quand il y avait déjà des enregistrements dans la table `profiles`.

### Corrections apportées

#### 1. Amélioration de la logique de vérification des profils existants
- **Fichier**: `src/components/family/FamilyRegisterForm.tsx`
- **Modification**: Ajout de la variable d'état `hasAnyProfiles` pour suivre précisément s'il y a des profils existants
- **Impact**: Permet de distinguer clairement entre "premier utilisateur" et "utilisateurs suivants"

#### 2. Conditionnement des éléments d'interface
- **Bandeau "Racine de l'Arbre Familial"**: 
  - **Avant**: Affiché si `isFirstUser` était true
  - **Après**: Affiché seulement si `isFirstUser && !hasAnyProfiles`
  
- **Champs de relation familiale**:
  - **Avant**: Cachés si `!isFirstUser`
  - **Après**: Affichés seulement si `!isFirstUser && hasAnyProfiles`

- **Champs parents et conjoint**:
  - **Avant**: Cachés si `!isFirstUser`
  - **Après**: Affichés seulement si `!isFirstUser && hasAnyProfiles`

#### 3. Amélioration du texte du bouton de soumission
- **Modification**: Le texte change dynamiquement selon le statut de l'utilisateur
  - Premier utilisateur: "🌳 Créer l'arbre familial"
  - Utilisateurs suivants: "Rejoindre la famille"

### Résultat
- ✅ Le bandeau patriarche/matriarche n'apparaît que pour le tout premier utilisateur
- ✅ Les champs de relation familiale n'apparaissent que pour les utilisateurs suivants
- ✅ L'interface s'adapte correctement selon le contexte (premier vs suivants)
- ✅ Pas d'éléments confus affichés quand ils ne devraient pas l'être

### Tests recommandés
1. Tester l'inscription du premier utilisateur (doit voir le bandeau patriarche)
2. Tester l'inscription d'un second utilisateur (ne doit pas voir le bandeau, doit voir les champs de relation)
3. Vérifier que la base de données est correctement interrogée pour déterminer l'état
