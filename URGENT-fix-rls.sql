--***REMOVED***URGENT:***REMOVED***Script***REMOVED***pour***REMOVED***corriger***REMOVED***les***REMOVED***politiques***REMOVED***RLS
--***REMOVED***Copier***REMOVED***et***REMOVED***coller***REMOVED***IMMÉDIATEMENT***REMOVED***dans***REMOVED***l'éditeur***REMOVED***SQL***REMOVED***de***REMOVED***Supabase

--***REMOVED***1.***REMOVED***Activer***REMOVED***RLS***REMOVED***sur***REMOVED***la***REMOVED***table***REMOVED***profiles
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***ENABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;

--***REMOVED***2.***REMOVED***Supprimer***REMOVED***TOUTES***REMOVED***les***REMOVED***politiques***REMOVED***existantes
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Profiles***REMOVED***are***REMOVED***viewable***REMOVED***by***REMOVED***everyone"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***view***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***update***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***insert***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***delete***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Enable***REMOVED***read***REMOVED***access***REMOVED***for***REMOVED***all***REMOVED***users"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Enable***REMOVED***insert***REMOVED***for***REMOVED***authenticated***REMOVED***users***REMOVED***only"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Enable***REMOVED***update***REMOVED***for***REMOVED***users***REMOVED***based***REMOVED***on***REMOVED***user_id"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Enable***REMOVED***delete***REMOVED***for***REMOVED***users***REMOVED***based***REMOVED***on***REMOVED***user_id"***REMOVED***ON***REMOVED***profiles;

--***REMOVED***3.***REMOVED***Créer***REMOVED***une***REMOVED***politique***REMOVED***qui***REMOVED***permet***REMOVED***TOUT***REMOVED***pour***REMOVED***les***REMOVED***utilisateurs***REMOVED***authentifiés
CREATE***REMOVED***POLICY***REMOVED***"Enable***REMOVED***all***REMOVED***access***REMOVED***for***REMOVED***authenticated***REMOVED***users"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***ALL
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(auth.role()***REMOVED***=***REMOVED***'authenticated')
***REMOVED******REMOVED******REMOVED******REMOVED***WITH***REMOVED***CHECK***REMOVED***(auth.role()***REMOVED***=***REMOVED***'authenticated');

--***REMOVED***4.***REMOVED***Alternative:***REMOVED***Créer***REMOVED***une***REMOVED***politique***REMOVED***qui***REMOVED***permet***REMOVED***la***REMOVED***lecture***REMOVED***pour***REMOVED***TOUS
CREATE***REMOVED***POLICY***REMOVED***"Enable***REMOVED***read***REMOVED***access***REMOVED***for***REMOVED***everyone"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***SELECT
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(true);

--***REMOVED***5.***REMOVED***Vérifier***REMOVED***que***REMOVED***ça***REMOVED***fonctionne
SELECT***REMOVED***COUNT(*)***REMOVED***as***REMOVED***total_profiles***REMOVED***FROM***REMOVED***profiles;
SELECT***REMOVED***first_name,***REMOVED***last_name,***REMOVED***email,***REMOVED***role_radio***REMOVED***FROM***REMOVED***profiles***REMOVED***LIMIT***REMOVED***5;

--***REMOVED***6.***REMOVED***Afficher***REMOVED***les***REMOVED***politiques***REMOVED***créées
SELECT***REMOVED***schemaname,***REMOVED***tablename,***REMOVED***policyname,***REMOVED***permissive,***REMOVED***roles,***REMOVED***cmd,***REMOVED***qual,***REMOVED***with_check
FROM***REMOVED***pg_policies
WHERE***REMOVED***tablename***REMOVED***=***REMOVED***'profiles';
