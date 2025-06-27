#***REMOVED***Diagnostic***REMOVED***-***REMOVED***Affichage***REMOVED***des***REMOVED***Membres***REMOVED***dans***REMOVED***l'Arbre***REMOVED***Familial

##***REMOVED***Problème
Les***REMOVED***membres***REMOVED***ne***REMOVED***s'affichent***REMOVED***pas***REMOVED***dans***REMOVED***la***REMOVED***section***REMOVED***"Arbre***REMOVED***Familial***REMOVED***Interactif"***REMOVED***du***REMOVED***dashboard.

##***REMOVED***Causes***REMOVED***possibles

###***REMOVED***1.***REMOVED***Permissions***REMOVED***Supabase***REMOVED***(RLS)
Le***REMOVED***problème***REMOVED***le***REMOVED***plus***REMOVED***probable***REMOVED***est***REMOVED***que***REMOVED***les***REMOVED***politiques***REMOVED***RLS***REMOVED***(Row***REMOVED***Level***REMOVED***Security)***REMOVED***empêchent***REMOVED***la***REMOVED***lecture***REMOVED***des***REMOVED***profils.

**Solution***REMOVED***:**
```sql
--***REMOVED***Exécuter***REMOVED***dans***REMOVED***l'éditeur***REMOVED***SQL***REMOVED***de***REMOVED***Supabase
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***ENABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;

--***REMOVED***Permettre***REMOVED***la***REMOVED***lecture***REMOVED***de***REMOVED***tous***REMOVED***les***REMOVED***profils
CREATE***REMOVED***POLICY***REMOVED***"Profiles***REMOVED***are***REMOVED***viewable***REMOVED***by***REMOVED***everyone"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***SELECT
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(true);
```

###***REMOVED***2.***REMOVED***Authentification
L'utilisateur***REMOVED***n'est***REMOVED***peut-être***REMOVED***pas***REMOVED***authentifié***REMOVED***correctement.

**Vérification***REMOVED***:**
-***REMOVED***Ouvrir***REMOVED***la***REMOVED***console***REMOVED***du***REMOVED***navigateur
-***REMOVED***Vérifier***REMOVED***les***REMOVED***logs***REMOVED***avec***REMOVED***les***REMOVED***emojis***REMOVED***🔍,***REMOVED***📊,***REMOVED***✅,***REMOVED***⚠️
-***REMOVED***S'assurer***REMOVED***que***REMOVED***l'utilisateur***REMOVED***est***REMOVED***connecté

###***REMOVED***3.***REMOVED***Données***REMOVED***manquantes
La***REMOVED***table***REMOVED***`profiles`***REMOVED***pourrait***REMOVED***être***REMOVED***vide.

**Vérification***REMOVED***:**
```sql
SELECT***REMOVED***COUNT(*)***REMOVED***FROM***REMOVED***profiles;
SELECT***REMOVED*******REMOVED***FROM***REMOVED***profiles***REMOVED***LIMIT***REMOVED***5;
```

###***REMOVED***4.***REMOVED***Configuration***REMOVED***des***REMOVED***variables***REMOVED***d'environnement
Les***REMOVED***clés***REMOVED***Supabase***REMOVED***pourraient***REMOVED***être***REMOVED***incorrectes.

**Vérification***REMOVED***:**
-***REMOVED***Vérifier***REMOVED***`.env.local`***REMOVED***ou***REMOVED***les***REMOVED***variables***REMOVED***d'environnement
-***REMOVED***S'assurer***REMOVED***que***REMOVED***`VITE_SUPABASE_URL`***REMOVED***et***REMOVED***`VITE_SUPABASE_ANON_KEY`***REMOVED***sont***REMOVED***corrects

##***REMOVED***Étapes***REMOVED***de***REMOVED***diagnostic

1.***REMOVED*****Ouvrir***REMOVED***la***REMOVED***console***REMOVED***du***REMOVED***navigateur*****REMOVED***(F12)
2.***REMOVED*****Aller***REMOVED***sur***REMOVED***le***REMOVED***dashboard*****REMOVED***et***REMOVED***regarder***REMOVED***les***REMOVED***logs
3.***REMOVED*****Vérifier***REMOVED***le***REMOVED***panel***REMOVED***de***REMOVED***debug*****REMOVED***(orange)***REMOVED***dans***REMOVED***la***REMOVED***sidebar
4.***REMOVED*****Exécuter***REMOVED***le***REMOVED***script***REMOVED***SQL*****REMOVED***de***REMOVED***permissions***REMOVED***ci-dessus
5.***REMOVED*****Redémarrer***REMOVED***l'application*****REMOVED***si***REMOVED***nécessaire

##***REMOVED***Logs***REMOVED***à***REMOVED***surveiller

Dans***REMOVED***la***REMOVED***console,***REMOVED***chercher***REMOVED***:
-***REMOVED***`🔍***REMOVED***[fetchMembers]***REMOVED***Début***REMOVED***de***REMOVED***la***REMOVED***récupération***REMOVED***des***REMOVED***membres`
-***REMOVED***`📊***REMOVED***[fetchMembers]***REMOVED***Réponse***REMOVED***Supabase:`
-***REMOVED***`✅***REMOVED***[fetchMembers]***REMOVED***Profils***REMOVED***trouvés:`
-***REMOVED***`🌳***REMOVED***[FamilyTree]***REMOVED***État***REMOVED***actuel:`

##***REMOVED***Solution***REMOVED***rapide

Si***REMOVED***le***REMOVED***problème***REMOVED***persiste,***REMOVED***exécuter***REMOVED***ce***REMOVED***script***REMOVED***SQL***REMOVED***dans***REMOVED***Supabase***REMOVED***:

```sql
--***REMOVED***Solution***REMOVED***complète
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***ENABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;

DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Profiles***REMOVED***are***REMOVED***viewable***REMOVED***by***REMOVED***everyone"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***view***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;

CREATE***REMOVED***POLICY***REMOVED***"Profiles***REMOVED***are***REMOVED***viewable***REMOVED***by***REMOVED***everyone"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***SELECT
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(true);

CREATE***REMOVED***POLICY***REMOVED***"Users***REMOVED***can***REMOVED***insert***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***INSERT
***REMOVED******REMOVED******REMOVED******REMOVED***WITH***REMOVED***CHECK***REMOVED***(auth.uid()***REMOVED***=***REMOVED***user_id);

CREATE***REMOVED***POLICY***REMOVED***"Users***REMOVED***can***REMOVED***update***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***UPDATE
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(auth.uid()***REMOVED***=***REMOVED***user_id)
***REMOVED******REMOVED******REMOVED******REMOVED***WITH***REMOVED***CHECK***REMOVED***(auth.uid()***REMOVED***=***REMOVED***user_id);
```
