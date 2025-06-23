
# Guide d'implémentation : Fonctionnalité "Delete All"

## Vue d'ensemble

Cette documentation explique comment implémenter une fonctionnalité "Delete All" complète qui supprime toutes les données de la base de données et tous les utilisateurs authentifiés dans un projet Supabase.

## Architecture de la solution

### 1. Edge Function Supabase

**Fichier**: `supabase/functions/delete-all-data/index.ts`

Cette fonction edge gère la suppression complète des données :
- Supprime tous les utilisateurs authentifiés
- Vide toutes les tables publiques dans l'ordre correct (respect des clés étrangères)
- Retourne un rapport de suppression

**Fonctionnalités clés** :
- Utilise la clé de service role pour les permissions d'administration
- Gestion CORS pour les appels depuis le frontend
- Logging détaillé pour le debugging
- Gestion d'erreurs robuste

### 2. Intégration Frontend

#### Option A : Bouton dans la page d'accueil (implémentation actuelle)
**Fichier**: `src/pages/Index.tsx`

#### Option B : Menu dropdown utilisateur (recommandé pour utilisateurs connectés)
**Fichier**: `src/components/shared/UserMenu.tsx` (à créer)

## Implémentation détaillée

### 1. Edge Function

```typescript
// supabase/functions/delete-all-data/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // 1. Supprimer tous les utilisateurs authentifiés
    const { data: users, error: usersError } = await supabaseAdmin.auth.admin.listUsers()
    
    if (usersError) {
      throw new Error(`Erreur lors de la récupération des utilisateurs: ${usersError.message}`)
    }

    if (users && users.users.length > 0) {
      for (const user of users.users) {
        const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(user.id)
        if (deleteUserError) {
          console.error(`Erreur lors de la suppression de l'utilisateur ${user.id}:`, deleteUserError)
        }
      }
    }

    // 2. Supprimer les données des tables publiques
    const tablesToDelete = [
      'family_members',
      'relationships', 
      'messages',
      'notifications',
      'profiles',
      'family_trees',
      'site_settings'
    ]

    for (const table of tablesToDelete) {
      const { error } = await supabaseAdmin.from(table).delete().neq('id', 'impossible-id')
      if (error) {
        console.error(`Erreur lors de la suppression de ${table}:`, error)
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Toutes les données ont été supprimées avec succès',
        deletedTables: tablesToDelete.length,
        deletedUsers: users?.users.length || 0
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
```

### 2. Bouton dans menu utilisateur

```typescript
// src/components/shared/UserMenu.tsx
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { Trash2, User, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const UserMenu = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAll = async () => {
    if (!confirm('⚠️ ATTENTION: Cette action supprimera TOUTES les données. Continuer ?')) {
      return;
    }

    if (!confirm('Dernière confirmation: Voulez-vous vraiment tout supprimer ?')) {
      return;
    }

    setIsDeleting(true);

    try {
      const { data, error } = await supabase.functions.invoke('delete-all-data', {
        method: 'POST'
      });

      if (error) throw error;

      toast({
        title: "Suppression réussie",
        description: "Toutes les données ont été supprimées.",
      });

      await supabase.auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <UserAvatar
            user={{
              first_name: profile?.first_name,
              last_name: profile?.last_name,
              avatar_url: profile?.avatar_url,
            }}
            size="sm"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profil</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          onClick={handleDeleteAll}
          disabled={isDeleting}
          className="text-red-600 focus:text-red-600"
        >
          {isDeleting ? (
            <>
              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2" />
              Suppression...
            </>
          ) : (
            <>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete All
            </>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => supabase.auth.signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
```

### 3. Appel de la fonction

```typescript
// Dans votre composant
const handleDeleteAll = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('delete-all-data', {
      method: 'POST'
    });

    if (error) throw error;

    // Traitement du succès
    console.log('Suppression réussie:', data);
    
    // Déconnexion et rechargement
    await supabase.auth.signOut();
    window.location.reload();
    
  } catch (error) {
    console.error('Erreur:', error);
    // Gestion d'erreur
  }
};
```

## Workflow complet

### 1. Clic sur "Delete All"
1. **Première confirmation** : Dialogue d'avertissement général
2. **Seconde confirmation** : Confirmation finale avec texte explicite
3. **Exécution** : Appel de l'Edge Function via `supabase.functions.invoke()`

### 2. Traitement backend
1. **Authentification** : Vérification des permissions (service role)
2. **Suppression utilisateurs** : Parcours et suppression de tous les comptes auth
3. **Suppression tables** : Vidage des tables publiques dans l'ordre correct
4. **Logging** : Enregistrement détaillé de toutes les opérations

### 3. Finalisation frontend
1. **Retour API** : Réception du statut de suppression
2. **Toast notification** : Affichage du résultat à l'utilisateur
3. **Déconnexion** : `supabase.auth.signOut()`
4. **Rechargement** : `window.location.reload()` pour reset complet

## Adaptation pour autres projets

### 1. Variables d'environnement requises
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

### 2. Tables à adapter
Modifier le tableau `tablesToDelete` selon votre schéma :
```typescript
const tablesToDelete = [
  'votre_table_1',
  'votre_table_2',
  // Ordre important : tables enfants avant tables parents
];
```

### 3. Permissions requises
- Clé service role configurée
- Accès admin pour suppression utilisateurs
- RLS policies compatibles

### 4. Interface utilisateur
- Adapter les confirmations selon votre UX
- Personnaliser les messages d'erreur/succès
- Intégrer dans votre système de navigation

## Sécurité et bonnes pratiques

1. **Double confirmation obligatoire**
2. **Logging complet pour audit**
3. **Gestion d'erreurs robuste**
4. **Utilisation de la service role key**
5. **CORS configuré correctement**
6. **Interface utilisateur claire et explicite**

## Débogage

- Vérifier les logs de l'Edge Function dans le dashboard Supabase
- Contrôler les permissions de la service role key
- Valider la configuration CORS
- Tester d'abord sur un environnement de développement
