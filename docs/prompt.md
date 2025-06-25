#***REMOVED***Prompt***REMOVED***de***REMOVED***refonte***REMOVED***et***REMOVED***d'amélioration***REMOVED***pour***REMOVED***un***REMOVED***projet***REMOVED***d'arbre***REMOVED***généalogique

##***REMOVED***Objectif***REMOVED***général
Refactoriser***REMOVED***et***REMOVED***moderniser***REMOVED***l'application***REMOVED***d'arbre***REMOVED***généalogique***REMOVED***pour***REMOVED***une***REMOVED***expérience***REMOVED***utilisateur***REMOVED***optimale,***REMOVED***une***REMOVED***architecture***REMOVED***claire***REMOVED***et***REMOVED***des***REMOVED***fonctionnalités***REMOVED***avancées.

##***REMOVED***Fonctionnalités***REMOVED***et***REMOVED***corrections***REMOVED***à***REMOVED***implémenter

###***REMOVED***1.***REMOVED***Loader***REMOVED***d'application
-***REMOVED***Le***REMOVED***loader***REMOVED***de***REMOVED***chargement***REMOVED***de***REMOVED***l'application***REMOVED***doit***REMOVED***apparaître***REMOVED*****seul***REMOVED***en***REMOVED***full-screen**,***REMOVED***sans***REMOVED***header,***REMOVED***footer***REMOVED***ni***REMOVED***autres***REMOVED***pages***REMOVED***en***REMOVED***arrière-plan.
-***REMOVED***Il***REMOVED***doit***REMOVED***être***REMOVED***animé***REMOVED***(logo,***REMOVED***barre***REMOVED***de***REMOVED***progression)***REMOVED***et***REMOVED***disparaître***REMOVED***uniquement***REMOVED***quand***REMOVED***l'app***REMOVED***est***REMOVED***prête.

###***REMOVED***2.***REMOVED***Gestion***REMOVED***des***REMOVED***profils***REMOVED***et***REMOVED***avatars
-***REMOVED***À***REMOVED***l'inscription,***REMOVED***alimenter***REMOVED***la***REMOVED***table***REMOVED***`profiles`***REMOVED***avec***REMOVED***toutes***REMOVED***les***REMOVED***métadonnées***REMOVED***nécessaires***REMOVED***(nom,***REMOVED***prénom,***REMOVED***email,***REMOVED***civilité,***REMOVED***rôle,***REMOVED***etc.).
-***REMOVED***Gérer***REMOVED***l'upload***REMOVED***de***REMOVED***l'avatar***REMOVED***dans***REMOVED***le***REMOVED***bucket***REMOVED***Supabase***REMOVED***`avatars`***REMOVED***et***REMOVED***stocker***REMOVED***l'URL***REMOVED***dans***REMOVED***le***REMOVED***profil.
-***REMOVED***S'assurer***REMOVED***que***REMOVED***la***REMOVED***création***REMOVED***du***REMOVED***profil***REMOVED***et***REMOVED***l'upload***REMOVED***de***REMOVED***l'avatar***REMOVED***sont***REMOVED***transactionnels***REMOVED***(rollback***REMOVED***si***REMOVED***l'un***REMOVED***échoue).

###***REMOVED***3.***REMOVED***Affichage***REMOVED***des***REMOVED***cartes***REMOVED***(Cards)
-***REMOVED***Utiliser***REMOVED***des***REMOVED***composants***REMOVED***Card***REMOVED***pour***REMOVED***présenter***REMOVED***les***REMOVED***informations***REMOVED***sur***REMOVED*****toutes***REMOVED***les***REMOVED***pages***REMOVED***principales*****REMOVED***:
***REMOVED******REMOVED***-***REMOVED***`/dashboard/tree`
***REMOVED******REMOVED***-***REMOVED***`/dashboard/invite`
***REMOVED******REMOVED***-***REMOVED***`/dashboard/members`
***REMOVED******REMOVED***-***REMOVED***`/index`
-***REMOVED***Les***REMOVED***Cards***REMOVED***doivent***REMOVED***être***REMOVED***responsives,***REMOVED***esthétiques***REMOVED***et***REMOVED***réutilisables.

###***REMOVED***4.***REMOVED***Recherche***REMOVED***avec***REMOVED***autocomplétion
-***REMOVED***Ajouter***REMOVED***une***REMOVED***zone***REMOVED***de***REMOVED***recherche***REMOVED***avec***REMOVED***autocomplétion***REMOVED***dès***REMOVED***le***REMOVED*****premier***REMOVED***caractère*****REMOVED***sur***REMOVED***:
***REMOVED******REMOVED***-***REMOVED***`/dashboard/tree`
***REMOVED******REMOVED***-***REMOVED***`/dashboard/members`
-***REMOVED***Si***REMOVED***aucun***REMOVED***résultat,***REMOVED***afficher***REMOVED***un***REMOVED***message***REMOVED***"Aucun***REMOVED***résultat"***REMOVED***et***REMOVED***effacer***REMOVED***la***REMOVED***zone***REMOVED***après***REMOVED***un***REMOVED***court***REMOVED***délai.
-***REMOVED***Optimiser***REMOVED***la***REMOVED***recherche***REMOVED***pour***REMOVED***les***REMOVED***grandes***REMOVED***familles***REMOVED***(pagination,***REMOVED***debouncing,***REMOVED***etc.).

###***REMOVED***5.***REMOVED***Page***REMOVED***Profil
-***REMOVED***Créer***REMOVED***une***REMOVED***page***REMOVED***`/profile`***REMOVED***au***REMOVED***design***REMOVED***conventionnel***REMOVED***:
***REMOVED******REMOVED***-***REMOVED***Avatar,***REMOVED***nom,***REMOVED***prénom,***REMOVED***email,***REMOVED***civilité,***REMOVED***téléphone,***REMOVED***etc.
***REMOVED******REMOVED***-***REMOVED***Bouton***REMOVED***pour***REMOVED***modifier***REMOVED***le***REMOVED***profil***REMOVED***(modal***REMOVED***ou***REMOVED***page***REMOVED***dédiée).
***REMOVED******REMOVED***-***REMOVED***Upload***REMOVED***d'avatar***REMOVED***avec***REMOVED***prévisualisation***REMOVED***et***REMOVED***confirmation.

###***REMOVED***6.***REMOVED***Page***REMOVED***Administration
-***REMOVED***Créer***REMOVED***une***REMOVED***page***REMOVED***`/dashboard/admin`***REMOVED***réservée***REMOVED***aux***REMOVED***administrateurs.
-***REMOVED***Afficher***REMOVED***un***REMOVED***tableau***REMOVED***des***REMOVED***utilisateurs***REMOVED***et***REMOVED***membres***REMOVED***avec***REMOVED***boutons***REMOVED***CRUD***REMOVED***(Créer,***REMOVED***Lire,***REMOVED***Modifier,***REMOVED***Supprimer).
-***REMOVED***Au***REMOVED***clic***REMOVED***sur***REMOVED***un***REMOVED***utilisateur,***REMOVED***ouvrir***REMOVED***une***REMOVED***modal***REMOVED***de***REMOVED***modification***REMOVED***(copie***REMOVED***du***REMOVED***formulaire***REMOVED***profil,***REMOVED***CRUD***REMOVED***complet).
-***REMOVED***Permettre***REMOVED***à***REMOVED***l'administrateur***REMOVED***de***REMOVED***choisir***REMOVED***le***REMOVED***Patriarche***REMOVED***ou***REMOVED***la***REMOVED***Matriarche***REMOVED***(1***REMOVED***seul***REMOVED***de***REMOVED***chaque***REMOVED***par***REMOVED***famille,***REMOVED***logique***REMOVED***à***REMOVED***verrouiller***REMOVED***côté***REMOVED***back***REMOVED***et***REMOVED***front).
-***REMOVED***Ajouter***REMOVED***des***REMOVED***filtres***REMOVED***et***REMOVED***une***REMOVED***recherche***REMOVED***sur***REMOVED***le***REMOVED***tableau***REMOVED***admin.

###***REMOVED***7.***REMOVED***Logiques***REMOVED***et***REMOVED***UX***REMOVED***supplémentaires
-***REMOVED***Sécuriser***REMOVED***toutes***REMOVED***les***REMOVED***routes***REMOVED***sensibles***REMOVED***(ProtectedRoute,***REMOVED***vérification***REMOVED***du***REMOVED***rôle,***REMOVED***etc.).
-***REMOVED***Gérer***REMOVED***les***REMOVED***erreurs***REMOVED***globales***REMOVED***et***REMOVED***afficher***REMOVED***des***REMOVED***toasts/alertes***REMOVED***clairs.
-***REMOVED***Ajouter***REMOVED***des***REMOVED***logs***REMOVED***(console***REMOVED***ou***REMOVED***Sentry)***REMOVED***pour***REMOVED***les***REMOVED***actions***REMOVED***critiques***REMOVED***(inscription,***REMOVED***suppression,***REMOVED***changement***REMOVED***de***REMOVED***rôle,***REMOVED***etc.).
-***REMOVED***Optimiser***REMOVED***le***REMOVED***code***REMOVED***pour***REMOVED***la***REMOVED***maintenabilité***REMOVED***(dossier***REMOVED***`components/ui`,***REMOVED***hooks***REMOVED***réutilisables,***REMOVED***validations***REMOVED***Zod***REMOVED***centralisées,***REMOVED***etc.).
-***REMOVED***Prévoir***REMOVED***l'internationalisation***REMOVED***(i18n)***REMOVED***pour***REMOVED***le***REMOVED***français***REMOVED***et***REMOVED***l'anglais.
-***REMOVED***Ajouter***REMOVED***des***REMOVED***tests***REMOVED***unitaires***REMOVED***et***REMOVED***d'intégration***REMOVED***sur***REMOVED***les***REMOVED***composants***REMOVED***critiques.

###***REMOVED***8.***REMOVED***Suggestions***REMOVED***d'amélioration***REMOVED***(bonus)
-***REMOVED***Ajouter***REMOVED***une***REMOVED***timeline***REMOVED***des***REMOVED***événements***REMOVED***familiaux***REMOVED***(naissances,***REMOVED***mariages,***REMOVED***décès,***REMOVED***etc.).
-***REMOVED***Permettre***REMOVED***l'import/export***REMOVED***de***REMOVED***l'arbre***REMOVED***au***REMOVED***format***REMOVED***GEDCOM.
-***REMOVED***Ajouter***REMOVED***un***REMOVED***système***REMOVED***de***REMOVED***notifications***REMOVED***(invitation,***REMOVED***nouveaux***REMOVED***membres,***REMOVED***etc.).
-***REMOVED***Prévoir***REMOVED***un***REMOVED***mode***REMOVED***"vue***REMOVED***arbre"***REMOVED***et***REMOVED***un***REMOVED***mode***REMOVED***"vue***REMOVED***liste"***REMOVED***pour***REMOVED***les***REMOVED***membres.
-***REMOVED***Ajouter***REMOVED***un***REMOVED***système***REMOVED***de***REMOVED***rôles***REMOVED***avancé***REMOVED***(admin,***REMOVED***membre,***REMOVED***invité,***REMOVED***etc.).
-***REMOVED***Prévoir***REMOVED***une***REMOVED***API***REMOVED***REST***REMOVED***ou***REMOVED***GraphQL***REMOVED***pour***REMOVED***l'ouverture***REMOVED***à***REMOVED***d'autres***REMOVED***apps.

---

**Ce***REMOVED***prompt***REMOVED***doit***REMOVED***servir***REMOVED***de***REMOVED***base***REMOVED***à***REMOVED***un***REMOVED***agent***REMOVED***IA***REMOVED***pour***REMOVED***refondre,***REMOVED***corriger***REMOVED***et***REMOVED***enrichir***REMOVED***le***REMOVED***projet***REMOVED***d'arbre***REMOVED***généalogique.**
