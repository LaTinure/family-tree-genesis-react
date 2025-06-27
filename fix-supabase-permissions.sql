--***REMOVED***Script***REMOVED***pour***REMOVED***corriger***REMOVED***les***REMOVED***permissions***REMOVED***Supabase
--***REMOVED***Permet***REMOVED***à***REMOVED***tous***REMOVED***les***REMOVED***utilisateurs***REMOVED***authentifiés***REMOVED***de***REMOVED***voir***REMOVED***les***REMOVED***profils

--***REMOVED***1.***REMOVED***Activer***REMOVED***RLS***REMOVED***sur***REMOVED***la***REMOVED***table***REMOVED***profiles
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***ENABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;

--***REMOVED***2.***REMOVED***Supprimer***REMOVED***les***REMOVED***politiques***REMOVED***existantes***REMOVED***si***REMOVED***elles***REMOVED***existent
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Profiles***REMOVED***are***REMOVED***viewable***REMOVED***by***REMOVED***everyone"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***view***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***update***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;

--***REMOVED***3.***REMOVED***Créer***REMOVED***une***REMOVED***politique***REMOVED***pour***REMOVED***permettre***REMOVED***la***REMOVED***lecture***REMOVED***de***REMOVED***tous***REMOVED***les***REMOVED***profils
CREATE***REMOVED***POLICY***REMOVED***"Profiles***REMOVED***are***REMOVED***viewable***REMOVED***by***REMOVED***everyone"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***SELECT
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(true);

--***REMOVED***4.***REMOVED***Créer***REMOVED***une***REMOVED***politique***REMOVED***pour***REMOVED***permettre***REMOVED***l'insertion***REMOVED***de***REMOVED***nouveaux***REMOVED***profils
CREATE***REMOVED***POLICY***REMOVED***"Users***REMOVED***can***REMOVED***insert***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***INSERT
***REMOVED******REMOVED******REMOVED******REMOVED***WITH***REMOVED***CHECK***REMOVED***(auth.uid()***REMOVED***=***REMOVED***user_id);

--***REMOVED***5.***REMOVED***Créer***REMOVED***une***REMOVED***politique***REMOVED***pour***REMOVED***permettre***REMOVED***la***REMOVED***mise***REMOVED***à***REMOVED***jour***REMOVED***de***REMOVED***son***REMOVED***propre***REMOVED***profil
CREATE***REMOVED***POLICY***REMOVED***"Users***REMOVED***can***REMOVED***update***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***UPDATE
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(auth.uid()***REMOVED***=***REMOVED***user_id)
***REMOVED******REMOVED******REMOVED******REMOVED***WITH***REMOVED***CHECK***REMOVED***(auth.uid()***REMOVED***=***REMOVED***user_id);

--***REMOVED***6.***REMOVED***Créer***REMOVED***une***REMOVED***politique***REMOVED***pour***REMOVED***permettre***REMOVED***la***REMOVED***suppression***REMOVED***de***REMOVED***son***REMOVED***propre***REMOVED***profil***REMOVED***(optionnel)
CREATE***REMOVED***POLICY***REMOVED***"Users***REMOVED***can***REMOVED***delete***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***DELETE
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(auth.uid()***REMOVED***=***REMOVED***user_id);

--***REMOVED***7.***REMOVED***Vérifier***REMOVED***que***REMOVED***les***REMOVED***politiques***REMOVED***sont***REMOVED***créées
SELECT***REMOVED***schemaname,***REMOVED***tablename,***REMOVED***policyname,***REMOVED***permissive,***REMOVED***roles,***REMOVED***cmd,***REMOVED***qual,***REMOVED***with_check
FROM***REMOVED***pg_policies
WHERE***REMOVED***tablename***REMOVED***=***REMOVED***'profiles';

--***REMOVED***8.***REMOVED***Vérifier***REMOVED***les***REMOVED***données***REMOVED***existantes
SELECT***REMOVED***COUNT(*)***REMOVED***as***REMOVED***total_profiles***REMOVED***FROM***REMOVED***profiles;
SELECT***REMOVED***first_name,***REMOVED***last_name,***REMOVED***email,***REMOVED***role_radio,***REMOVED***is_patriarch,***REMOVED***is_admin***REMOVED***FROM***REMOVED***profiles***REMOVED***LIMIT***REMOVED***5;
