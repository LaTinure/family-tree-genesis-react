#***REMOVED***Système***REMOVED***Multi-Dynasties***REMOVED***-***REMOVED***Documentation

##***REMOVED***Vue***REMOVED***d'ensemble
Système***REMOVED***permettant***REMOVED***d'isoler***REMOVED***chaque***REMOVED***famille***REMOVED***dans***REMOVED***son***REMOVED***propre***REMOVED***espace***REMOVED***sécurisé.***REMOVED***Un***REMOVED***utilisateur***REMOVED***=***REMOVED***une***REMOVED***dynastie.

##***REMOVED***Architecture

###***REMOVED***Flux***REMOVED***principal
1.***REMOVED***Nouvel***REMOVED***utilisateur***REMOVED***→***REMOVED***`/dynasty`***REMOVED***(sélection)
2.***REMOVED***Créer***REMOVED***dynastie***REMOVED***→***REMOVED***Formulaire***REMOVED***→***REMOVED***Admin***REMOVED***automatique
3.***REMOVED***Rejoindre***REMOVED***dynastie***REMOVED***→***REMOVED***Lien***REMOVED***invitation***REMOVED***→***REMOVED***Rôle***REMOVED***attribué
4.***REMOVED***Après***REMOVED***inscription***REMOVED***→***REMOVED***Espace***REMOVED***dynastie***REMOVED***isolé

##***REMOVED***Fichiers***REMOVED***créés/modifiés

###***REMOVED***Nouveaux***REMOVED***composants
-***REMOVED***`src/pages/DynastySelector.tsx`***REMOVED***-***REMOVED***Sélection***REMOVED***créer/rejoindre
-***REMOVED***`src/pages/DynastyCreateForm.tsx`***REMOVED***-***REMOVED***Création***REMOVED***dynastie
-***REMOVED***`src/components/DynastyInviteHandler.tsx`***REMOVED***-***REMOVED***Gestion***REMOVED***invitations
-***REMOVED***`src/hooks/useInvitation.ts`***REMOVED***-***REMOVED***Hook***REMOVED***invitations

###***REMOVED***Modifications
-***REMOVED***`src/pages/auth/AuthFamily.tsx`***REMOVED***-***REMOVED***Gestion***REMOVED***invitations
-***REMOVED***`src/components/family/FamilyRegisterForm.tsx`***REMOVED***-***REMOVED***Préremplissage
-***REMOVED***`src/App.tsx`***REMOVED***-***REMOVED***Nouvelles***REMOVED***routes
-***REMOVED***`src/lib/constants/routes.ts`***REMOVED***-***REMOVED***Routes***REMOVED***dynastie

##***REMOVED***Base***REMOVED***de***REMOVED***données

###***REMOVED***Tables
```sql
--***REMOVED***Table***REMOVED***dynasties
CREATE***REMOVED***TABLE***REMOVED***dynasties***REMOVED***(
***REMOVED******REMOVED***id***REMOVED***UUID***REMOVED***PRIMARY***REMOVED***KEY,
***REMOVED******REMOVED***name***REMOVED***TEXT***REMOVED***NOT***REMOVED***NULL,
***REMOVED******REMOVED***location***REMOVED***TEXT,
***REMOVED******REMOVED***description***REMOVED***TEXT,
***REMOVED******REMOVED***founding_year***REMOVED***INTEGER,
***REMOVED******REMOVED***created_by***REMOVED***UUID***REMOVED***REFERENCES***REMOVED***auth.users(id)
);

--***REMOVED***Table***REMOVED***invites
CREATE***REMOVED***TABLE***REMOVED***invites***REMOVED***(
***REMOVED******REMOVED***id***REMOVED***UUID***REMOVED***PRIMARY***REMOVED***KEY,
***REMOVED******REMOVED***dynasty_id***REMOVED***UUID***REMOVED***REFERENCES***REMOVED***dynasties(id),
***REMOVED******REMOVED***user_role***REMOVED***TEXT***REMOVED***NOT***REMOVED***NULL,
***REMOVED******REMOVED***token***REMOVED***TEXT***REMOVED***UNIQUE***REMOVED***NOT***REMOVED***NULL,
***REMOVED******REMOVED***expires_at***REMOVED***TIMESTAMPTZ***REMOVED***NOT***REMOVED***NULL,
***REMOVED******REMOVED***used***REMOVED***BOOLEAN***REMOVED***DEFAULT***REMOVED***FALSE
);

--***REMOVED***Modification***REMOVED***profiles
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***ADD***REMOVED***COLUMN***REMOVED***dynasty_id***REMOVED***UUID***REMOVED***REFERENCES***REMOVED***dynasties(id);
```

###***REMOVED***Fonctions***REMOVED***RPC
-***REMOVED***`get_invitation_data(invite_token)`***REMOVED***-***REMOVED***Récupère***REMOVED***données***REMOVED***invitation
-***REMOVED***`mark_invitation_used(invite_id)`***REMOVED***-***REMOVED***Marque***REMOVED***invitation***REMOVED***utilisée
-***REMOVED***`create_invitation(dynasty_id,***REMOVED***user_role)`***REMOVED***-***REMOVED***Crée***REMOVED***invitation

##***REMOVED***Routes

```tsx
DYNASTY:***REMOVED***{
***REMOVED******REMOVED***SELECTOR:***REMOVED***'/dynasty',***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Sélection***REMOVED***dynastie
***REMOVED******REMOVED***CREATE:***REMOVED***'/dynasty/create',***REMOVED******REMOVED******REMOVED***//***REMOVED***Création***REMOVED***dynastie
},
INVITE:***REMOVED***'/invite',***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Gestion***REMOVED***invitation
```

##***REMOVED***Fonctionnalités***REMOVED***clés

###***REMOVED***1.***REMOVED***DynastySelector
-***REMOVED***Interface***REMOVED***choix***REMOVED***créer/rejoindre***REMOVED***dynastie
-***REMOVED***Animations***REMOVED***et***REMOVED***design***REMOVED***cohérent
-***REMOVED***Redirection***REMOVED***automatique

###***REMOVED***2.***REMOVED***DynastyCreateForm
-***REMOVED***Formulaire***REMOVED***création***REMOVED***dynastie
-***REMOVED***Champs***REMOVED***:***REMOVED***nom,***REMOVED***localisation,***REMOVED***description,***REMOVED***année
-***REMOVED***Utilisateur***REMOVED***devient***REMOVED***admin***REMOVED***+***REMOVED***patriarche***REMOVED***automatiquement

###***REMOVED***3.***REMOVED***DynastyInviteHandler
-***REMOVED***Gestion***REMOVED***liens***REMOVED***`?invite=TOKEN`
-***REMOVED***Vérification***REMOVED***validité/expiration/utilisation
-***REMOVED***Redirection***REMOVED***vers***REMOVED***AuthFamily***REMOVED***avec***REMOVED***données

###***REMOVED***4.***REMOVED***Modifications***REMOVED***AuthFamily
-***REMOVED***Détection***REMOVED***automatique***REMOVED***token***REMOVED***invitation
-***REMOVED***Vérification***REMOVED***via***REMOVED***RPC***REMOVED***Supabase
-***REMOVED***Affichage***REMOVED***alertes***REMOVED***selon***REMOVED***état
-***REMOVED***Basculage***REMOVED***auto***REMOVED***vers***REMOVED***inscription

###***REMOVED***5.***REMOVED***Modifications***REMOVED***FamilyRegisterForm
-***REMOVED***Accepte***REMOVED***`invitationData`***REMOVED***en***REMOVED***props
-***REMOVED***Préremplit***REMOVED***et***REMOVED***verrouille***REMOVED***dynastie/rôle
-***REMOVED***Ajuste***REMOVED***civilité***REMOVED***selon***REMOVED***rôle
-***REMOVED***Ajoute***REMOVED***`dynasty_id`***REMOVED***au***REMOVED***profil

##***REMOVED***Sécurité***REMOVED***RLS

```sql
--***REMOVED***Dynasties***REMOVED***:***REMOVED***lecture***REMOVED***membres,***REMOVED***écriture***REMOVED***admin
--***REMOVED***Invites***REMOVED***:***REMOVED***lecture/création***REMOVED***admin***REMOVED***dynastie
--***REMOVED***Profiles***REMOVED***:***REMOVED***isolation***REMOVED***par***REMOVED***dynasty_id
```

##***REMOVED***Tests

###***REMOVED***Scénarios
1.***REMOVED***Création***REMOVED***dynastie***REMOVED***→***REMOVED***vérification***REMOVED***création***REMOVED***+***REMOVED***rôles
2.***REMOVED***Invitation***REMOVED***lien***REMOVED***→***REMOVED***vérification***REMOVED***validité***REMOVED***+***REMOVED***inscription
3.***REMOVED***Gestion***REMOVED***erreurs***REMOVED***→***REMOVED***token***REMOVED***invalide/expiré/utilisé

##***REMOVED***Déploiement

1.***REMOVED***Exécuter***REMOVED***migrations***REMOVED***SQL
2.***REMOVED***Vérifier***REMOVED***types***REMOVED***TypeScript
3.***REMOVED***Tester***REMOVED***flux***REMOVED***complet
4.***REMOVED***Aucune***REMOVED***nouvelle***REMOVED***variable***REMOVED***d'environnement

##***REMOVED***Maintenance

-***REMOVED***Surveiller***REMOVED***erreurs***REMOVED***création***REMOVED***invitation
-***REMOVED***Nettoyer***REMOVED***invitations***REMOVED***expirées
-***REMOVED***Monitorer***REMOVED***utilisation***REMOVED***dynasties

---

**Version*****REMOVED***:***REMOVED***1.0***REMOVED***|***REMOVED*****Date*****REMOVED***:***REMOVED***2024
