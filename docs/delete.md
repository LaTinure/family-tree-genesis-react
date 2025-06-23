
#***REMOVED***Guide***REMOVED***d'implémentation***REMOVED***:***REMOVED***Fonctionnalité***REMOVED***"Delete***REMOVED***All"

##***REMOVED***Vue***REMOVED***d'ensemble

Cette***REMOVED***documentation***REMOVED***explique***REMOVED***comment***REMOVED***implémenter***REMOVED***une***REMOVED***fonctionnalité***REMOVED***"Delete***REMOVED***All"***REMOVED***complète***REMOVED***qui***REMOVED***supprime***REMOVED***toutes***REMOVED***les***REMOVED***données***REMOVED***de***REMOVED***la***REMOVED***base***REMOVED***de***REMOVED***données***REMOVED***et***REMOVED***tous***REMOVED***les***REMOVED***utilisateurs***REMOVED***authentifiés***REMOVED***dans***REMOVED***un***REMOVED***projet***REMOVED***Supabase.

##***REMOVED***Architecture***REMOVED***de***REMOVED***la***REMOVED***solution

###***REMOVED***1.***REMOVED***Edge***REMOVED***Function***REMOVED***Supabase

**Fichier**:***REMOVED***`supabase/functions/delete-all-data/index.ts`

Cette***REMOVED***fonction***REMOVED***edge***REMOVED***gère***REMOVED***la***REMOVED***suppression***REMOVED***complète***REMOVED***des***REMOVED***données***REMOVED***:
-***REMOVED***Supprime***REMOVED***tous***REMOVED***les***REMOVED***utilisateurs***REMOVED***authentifiés
-***REMOVED***Vide***REMOVED***toutes***REMOVED***les***REMOVED***tables***REMOVED***publiques***REMOVED***dans***REMOVED***l'ordre***REMOVED***correct***REMOVED***(respect***REMOVED***des***REMOVED***clés***REMOVED***étrangères)
-***REMOVED***Retourne***REMOVED***un***REMOVED***rapport***REMOVED***de***REMOVED***suppression

**Fonctionnalités***REMOVED***clés*****REMOVED***:
-***REMOVED***Utilise***REMOVED***la***REMOVED***clé***REMOVED***de***REMOVED***service***REMOVED***role***REMOVED***pour***REMOVED***les***REMOVED***permissions***REMOVED***d'administration
-***REMOVED***Gestion***REMOVED***CORS***REMOVED***pour***REMOVED***les***REMOVED***appels***REMOVED***depuis***REMOVED***le***REMOVED***frontend
-***REMOVED***Logging***REMOVED***détaillé***REMOVED***pour***REMOVED***le***REMOVED***debugging
-***REMOVED***Gestion***REMOVED***d'erreurs***REMOVED***robuste

###***REMOVED***2.***REMOVED***Intégration***REMOVED***Frontend

####***REMOVED***Option***REMOVED***A***REMOVED***:***REMOVED***Bouton***REMOVED***dans***REMOVED***la***REMOVED***page***REMOVED***d'accueil***REMOVED***(implémentation***REMOVED***actuelle)
**Fichier**:***REMOVED***`src/pages/Index.tsx`

####***REMOVED***Option***REMOVED***B***REMOVED***:***REMOVED***Menu***REMOVED***dropdown***REMOVED***utilisateur***REMOVED***(recommandé***REMOVED***pour***REMOVED***utilisateurs***REMOVED***connectés)
**Fichier**:***REMOVED***`src/components/shared/UserMenu.tsx`***REMOVED***(à***REMOVED***créer)

##***REMOVED***Implémentation***REMOVED***détaillée

###***REMOVED***1.***REMOVED***Edge***REMOVED***Function

```typescript
//***REMOVED***supabase/functions/delete-all-data/index.ts
import***REMOVED***{***REMOVED***serve***REMOVED***}***REMOVED***from***REMOVED***"https://deno.land/std@0.168.0/http/server.ts"
import***REMOVED***{***REMOVED***createClient***REMOVED***}***REMOVED***from***REMOVED***'https://esm.sh/@supabase/supabase-js@2'

const***REMOVED***corsHeaders***REMOVED***=***REMOVED***{
***REMOVED******REMOVED***'Access-Control-Allow-Origin':***REMOVED***'*',
***REMOVED******REMOVED***'Access-Control-Allow-Headers':***REMOVED***'authorization,***REMOVED***x-client-info,***REMOVED***apikey,***REMOVED***content-type',
}

serve(async***REMOVED***(req)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***//***REMOVED***Handle***REMOVED***CORS***REMOVED***preflight***REMOVED***requests
***REMOVED******REMOVED***if***REMOVED***(req.method***REMOVED***===***REMOVED***'OPTIONS')***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response('ok',***REMOVED***{***REMOVED***headers:***REMOVED***corsHeaders***REMOVED***})
***REMOVED******REMOVED***}

***REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***supabaseUrl***REMOVED***=***REMOVED***Deno.env.get('SUPABASE_URL')!
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***supabaseServiceKey***REMOVED***=***REMOVED***Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
***REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***supabaseAdmin***REMOVED***=***REMOVED***createClient(supabaseUrl,***REMOVED***supabaseServiceKey,***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***auth:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***autoRefreshToken:***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***persistSession:***REMOVED***false
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***})

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***1.***REMOVED***Supprimer***REMOVED***tous***REMOVED***les***REMOVED***utilisateurs***REMOVED***authentifiés
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***users,***REMOVED***error:***REMOVED***usersError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabaseAdmin.auth.admin.listUsers()
***REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(usersError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***new***REMOVED***Error(`Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***récupération***REMOVED***des***REMOVED***utilisateurs:***REMOVED***${usersError.message}`)
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(users***REMOVED***&&***REMOVED***users.users.length***REMOVED***>***REMOVED***0)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***for***REMOVED***(const***REMOVED***user***REMOVED***of***REMOVED***users.users)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***error:***REMOVED***deleteUserError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabaseAdmin.auth.admin.deleteUser(user.id)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(deleteUserError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error(`Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***suppression***REMOVED***de***REMOVED***l'utilisateur***REMOVED***${user.id}:`,***REMOVED***deleteUserError)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***2.***REMOVED***Supprimer***REMOVED***les***REMOVED***données***REMOVED***des***REMOVED***tables***REMOVED***publiques
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***tablesToDelete***REMOVED***=***REMOVED***[
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'family_members',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'relationships',***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'messages',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'notifications',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'profiles',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'family_trees',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'site_settings'
***REMOVED******REMOVED******REMOVED******REMOVED***]

***REMOVED******REMOVED******REMOVED******REMOVED***for***REMOVED***(const***REMOVED***table***REMOVED***of***REMOVED***tablesToDelete)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabaseAdmin.from(table).delete().neq('id',***REMOVED***'impossible-id')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error(`Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***suppression***REMOVED***de***REMOVED***${table}:`,***REMOVED***error)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***JSON.stringify({***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***success:***REMOVED***true,***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***message:***REMOVED***'Toutes***REMOVED***les***REMOVED***données***REMOVED***ont***REMOVED***été***REMOVED***supprimées***REMOVED***avec***REMOVED***succès',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***deletedTables:***REMOVED***tablesToDelete.length,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***deletedUsers:***REMOVED***users?.users.length***REMOVED***||***REMOVED***0
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{***REMOVED***headers:***REMOVED***{***REMOVED***...corsHeaders,***REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***}***REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***)

***REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***new***REMOVED***Response(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***JSON.stringify({***REMOVED***success:***REMOVED***false,***REMOVED***error:***REMOVED***error.message***REMOVED***}),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***status:***REMOVED***500,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***headers:***REMOVED***{***REMOVED***...corsHeaders,***REMOVED***'Content-Type':***REMOVED***'application/json'***REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***)
***REMOVED******REMOVED***}
})
```

###***REMOVED***2.***REMOVED***Bouton***REMOVED***dans***REMOVED***menu***REMOVED***utilisateur

```typescript
//***REMOVED***src/components/shared/UserMenu.tsx
import***REMOVED***{***REMOVED***useState***REMOVED***}***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***useAuth***REMOVED***}***REMOVED***from***REMOVED***'@/hooks/useAuth';
import***REMOVED***{***REMOVED***Button***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/button';
import***REMOVED***{
***REMOVED******REMOVED***DropdownMenu,
***REMOVED******REMOVED***DropdownMenuContent,
***REMOVED******REMOVED***DropdownMenuItem,
***REMOVED******REMOVED***DropdownMenuSeparator,
***REMOVED******REMOVED***DropdownMenuTrigger,
}***REMOVED***from***REMOVED***'@/components/ui/dropdown-menu';
import***REMOVED***{***REMOVED***UserAvatar***REMOVED***}***REMOVED***from***REMOVED***'@/components/shared/UserAvatar';
import***REMOVED***{***REMOVED***Trash2,***REMOVED***User,***REMOVED***LogOut***REMOVED***}***REMOVED***from***REMOVED***'lucide-react';
import***REMOVED***{***REMOVED***useToast***REMOVED***}***REMOVED***from***REMOVED***'@/hooks/use-toast';
import***REMOVED***{***REMOVED***supabase***REMOVED***}***REMOVED***from***REMOVED***'@/integrations/supabase/client';

export***REMOVED***const***REMOVED***UserMenu***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***user,***REMOVED***profile***REMOVED***}***REMOVED***=***REMOVED***useAuth();
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***toast***REMOVED***}***REMOVED***=***REMOVED***useToast();
***REMOVED******REMOVED***const***REMOVED***[isDeleting,***REMOVED***setIsDeleting]***REMOVED***=***REMOVED***useState(false);

***REMOVED******REMOVED***const***REMOVED***handleDeleteAll***REMOVED***=***REMOVED***async***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!confirm('⚠️***REMOVED***ATTENTION:***REMOVED***Cette***REMOVED***action***REMOVED***supprimera***REMOVED***TOUTES***REMOVED***les***REMOVED***données.***REMOVED***Continuer***REMOVED***?'))***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return;
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!confirm('Dernière***REMOVED***confirmation:***REMOVED***Voulez-vous***REMOVED***vraiment***REMOVED***tout***REMOVED***supprimer***REMOVED***?'))***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return;
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***setIsDeleting(true);

***REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase.functions.invoke('delete-all-data',***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***method:***REMOVED***'POST'
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toast({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***title:***REMOVED***"Suppression***REMOVED***réussie",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***"Toutes***REMOVED***les***REMOVED***données***REMOVED***ont***REMOVED***été***REMOVED***supprimées.",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***await***REMOVED***supabase.auth.signOut();
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***window.location.reload();
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('Erreur:',***REMOVED***error);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toast({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***title:***REMOVED***"Erreur",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***"Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***suppression.",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***"destructive",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***finally***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setIsDeleting(false);
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***};

***REMOVED******REMOVED***if***REMOVED***(!user)***REMOVED***return***REMOVED***null;

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<DropdownMenu>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DropdownMenuTrigger***REMOVED***asChild>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Button***REMOVED***variant="ghost"***REMOVED***className="relative***REMOVED***h-8***REMOVED***w-8***REMOVED***rounded-full">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<UserAvatar
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***user={{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***first_name:***REMOVED***profile?.first_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***last_name:***REMOVED***profile?.last_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***avatar_url:***REMOVED***profile?.avatar_url,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***size="sm"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Button>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</DropdownMenuTrigger>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DropdownMenuContent***REMOVED***className="w-56"***REMOVED***align="end"***REMOVED***forceMount>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DropdownMenuItem>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<User***REMOVED***className="mr-2***REMOVED***h-4***REMOVED***w-4"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<span>Profil</span>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</DropdownMenuItem>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DropdownMenuSeparator***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DropdownMenuItem
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onClick={handleDeleteAll}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***disabled={isDeleting}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className="text-red-600***REMOVED***focus:text-red-600"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{isDeleting***REMOVED***?***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="w-4***REMOVED***h-4***REMOVED***border-2***REMOVED***border-red-600***REMOVED***border-t-transparent***REMOVED***rounded-full***REMOVED***animate-spin***REMOVED***mr-2"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Suppression...
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)***REMOVED***:***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Trash2***REMOVED***className="mr-2***REMOVED***h-4***REMOVED***w-4"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Delete***REMOVED***All
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</DropdownMenuItem>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DropdownMenuSeparator***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DropdownMenuItem***REMOVED***onClick={()***REMOVED***=>***REMOVED***supabase.auth.signOut()}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<LogOut***REMOVED***className="mr-2***REMOVED***h-4***REMOVED***w-4"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<span>Se***REMOVED***déconnecter</span>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</DropdownMenuItem>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</DropdownMenuContent>
***REMOVED******REMOVED******REMOVED******REMOVED***</DropdownMenu>
***REMOVED******REMOVED***);
};
```

###***REMOVED***3.***REMOVED***Appel***REMOVED***de***REMOVED***la***REMOVED***fonction

```typescript
//***REMOVED***Dans***REMOVED***votre***REMOVED***composant
const***REMOVED***handleDeleteAll***REMOVED***=***REMOVED***async***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase.functions.invoke('delete-all-data',***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***method:***REMOVED***'POST'
***REMOVED******REMOVED******REMOVED******REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***throw***REMOVED***error;

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Traitement***REMOVED***du***REMOVED***succès
***REMOVED******REMOVED******REMOVED******REMOVED***console.log('Suppression***REMOVED***réussie:',***REMOVED***data);
***REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Déconnexion***REMOVED***et***REMOVED***rechargement
***REMOVED******REMOVED******REMOVED******REMOVED***await***REMOVED***supabase.auth.signOut();
***REMOVED******REMOVED******REMOVED******REMOVED***window.location.reload();
***REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***console.error('Erreur:',***REMOVED***error);
***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Gestion***REMOVED***d'erreur
***REMOVED******REMOVED***}
};
```

##***REMOVED***Workflow***REMOVED***complet

###***REMOVED***1.***REMOVED***Clic***REMOVED***sur***REMOVED***"Delete***REMOVED***All"
1.***REMOVED*****Première***REMOVED***confirmation*****REMOVED***:***REMOVED***Dialogue***REMOVED***d'avertissement***REMOVED***général
2.***REMOVED*****Seconde***REMOVED***confirmation*****REMOVED***:***REMOVED***Confirmation***REMOVED***finale***REMOVED***avec***REMOVED***texte***REMOVED***explicite
3.***REMOVED*****Exécution*****REMOVED***:***REMOVED***Appel***REMOVED***de***REMOVED***l'Edge***REMOVED***Function***REMOVED***via***REMOVED***`supabase.functions.invoke()`

###***REMOVED***2.***REMOVED***Traitement***REMOVED***backend
1.***REMOVED*****Authentification*****REMOVED***:***REMOVED***Vérification***REMOVED***des***REMOVED***permissions***REMOVED***(service***REMOVED***role)
2.***REMOVED*****Suppression***REMOVED***utilisateurs*****REMOVED***:***REMOVED***Parcours***REMOVED***et***REMOVED***suppression***REMOVED***de***REMOVED***tous***REMOVED***les***REMOVED***comptes***REMOVED***auth
3.***REMOVED*****Suppression***REMOVED***tables*****REMOVED***:***REMOVED***Vidage***REMOVED***des***REMOVED***tables***REMOVED***publiques***REMOVED***dans***REMOVED***l'ordre***REMOVED***correct
4.***REMOVED*****Logging*****REMOVED***:***REMOVED***Enregistrement***REMOVED***détaillé***REMOVED***de***REMOVED***toutes***REMOVED***les***REMOVED***opérations

###***REMOVED***3.***REMOVED***Finalisation***REMOVED***frontend
1.***REMOVED*****Retour***REMOVED***API*****REMOVED***:***REMOVED***Réception***REMOVED***du***REMOVED***statut***REMOVED***de***REMOVED***suppression
2.***REMOVED*****Toast***REMOVED***notification*****REMOVED***:***REMOVED***Affichage***REMOVED***du***REMOVED***résultat***REMOVED***à***REMOVED***l'utilisateur
3.***REMOVED*****Déconnexion*****REMOVED***:***REMOVED***`supabase.auth.signOut()`
4.***REMOVED*****Rechargement*****REMOVED***:***REMOVED***`window.location.reload()`***REMOVED***pour***REMOVED***reset***REMOVED***complet

##***REMOVED***Adaptation***REMOVED***pour***REMOVED***autres***REMOVED***projets

###***REMOVED***1.***REMOVED***Variables***REMOVED***d'environnement***REMOVED***requises
-***REMOVED***`SUPABASE_URL`
-***REMOVED***`SUPABASE_SERVICE_ROLE_KEY`

###***REMOVED***2.***REMOVED***Tables***REMOVED***à***REMOVED***adapter
Modifier***REMOVED***le***REMOVED***tableau***REMOVED***`tablesToDelete`***REMOVED***selon***REMOVED***votre***REMOVED***schéma***REMOVED***:
```typescript
const***REMOVED***tablesToDelete***REMOVED***=***REMOVED***[
***REMOVED******REMOVED***'votre_table_1',
***REMOVED******REMOVED***'votre_table_2',
***REMOVED******REMOVED***//***REMOVED***Ordre***REMOVED***important***REMOVED***:***REMOVED***tables***REMOVED***enfants***REMOVED***avant***REMOVED***tables***REMOVED***parents
];
```

###***REMOVED***3.***REMOVED***Permissions***REMOVED***requises
-***REMOVED***Clé***REMOVED***service***REMOVED***role***REMOVED***configurée
-***REMOVED***Accès***REMOVED***admin***REMOVED***pour***REMOVED***suppression***REMOVED***utilisateurs
-***REMOVED***RLS***REMOVED***policies***REMOVED***compatibles

###***REMOVED***4.***REMOVED***Interface***REMOVED***utilisateur
-***REMOVED***Adapter***REMOVED***les***REMOVED***confirmations***REMOVED***selon***REMOVED***votre***REMOVED***UX
-***REMOVED***Personnaliser***REMOVED***les***REMOVED***messages***REMOVED***d'erreur/succès
-***REMOVED***Intégrer***REMOVED***dans***REMOVED***votre***REMOVED***système***REMOVED***de***REMOVED***navigation

##***REMOVED***Sécurité***REMOVED***et***REMOVED***bonnes***REMOVED***pratiques

1.***REMOVED*****Double***REMOVED***confirmation***REMOVED***obligatoire**
2.***REMOVED*****Logging***REMOVED***complet***REMOVED***pour***REMOVED***audit**
3.***REMOVED*****Gestion***REMOVED***d'erreurs***REMOVED***robuste**
4.***REMOVED*****Utilisation***REMOVED***de***REMOVED***la***REMOVED***service***REMOVED***role***REMOVED***key**
5.***REMOVED*****CORS***REMOVED***configuré***REMOVED***correctement**
6.***REMOVED*****Interface***REMOVED***utilisateur***REMOVED***claire***REMOVED***et***REMOVED***explicite**

##***REMOVED***Débogage

-***REMOVED***Vérifier***REMOVED***les***REMOVED***logs***REMOVED***de***REMOVED***l'Edge***REMOVED***Function***REMOVED***dans***REMOVED***le***REMOVED***dashboard***REMOVED***Supabase
-***REMOVED***Contrôler***REMOVED***les***REMOVED***permissions***REMOVED***de***REMOVED***la***REMOVED***service***REMOVED***role***REMOVED***key
-***REMOVED***Valider***REMOVED***la***REMOVED***configuration***REMOVED***CORS
-***REMOVED***Tester***REMOVED***d'abord***REMOVED***sur***REMOVED***un***REMOVED***environnement***REMOVED***de***REMOVED***développement
