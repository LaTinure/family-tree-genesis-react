--***REMOVED***Script***REMOVED***pour***REMOVED***corriger***REMOVED***les***REMOVED***permissions***REMOVED***Supabase
--***REMOVED***Copier***REMOVED***et***REMOVED***coller***REMOVED***ce***REMOVED***script***REMOVED***dans***REMOVED***l'éditeur***REMOVED***SQL***REMOVED***de***REMOVED***Supabase

--***REMOVED***Activer***REMOVED***RLS***REMOVED***sur***REMOVED***la***REMOVED***table***REMOVED***profiles
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***ENABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;

--***REMOVED***Supprimer***REMOVED***les***REMOVED***politiques***REMOVED***existantes
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Profiles***REMOVED***are***REMOVED***viewable***REMOVED***by***REMOVED***everyone"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***view***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***update***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***insert***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***delete***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;

--***REMOVED***Créer***REMOVED***une***REMOVED***politique***REMOVED***pour***REMOVED***permettre***REMOVED***la***REMOVED***lecture***REMOVED***de***REMOVED***tous***REMOVED***les***REMOVED***profils
CREATE***REMOVED***POLICY***REMOVED***"Profiles***REMOVED***are***REMOVED***viewable***REMOVED***by***REMOVED***everyone"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***SELECT
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(true);

--***REMOVED***Créer***REMOVED***une***REMOVED***politique***REMOVED***pour***REMOVED***permettre***REMOVED***l'insertion
CREATE***REMOVED***POLICY***REMOVED***"Users***REMOVED***can***REMOVED***insert***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***INSERT
***REMOVED******REMOVED******REMOVED******REMOVED***WITH***REMOVED***CHECK***REMOVED***(auth.uid()***REMOVED***=***REMOVED***user_id);

--***REMOVED***Créer***REMOVED***une***REMOVED***politique***REMOVED***pour***REMOVED***permettre***REMOVED***la***REMOVED***mise***REMOVED***à***REMOVED***jour
CREATE***REMOVED***POLICY***REMOVED***"Users***REMOVED***can***REMOVED***update***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***UPDATE
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(auth.uid()***REMOVED***=***REMOVED***user_id)
***REMOVED******REMOVED******REMOVED******REMOVED***WITH***REMOVED***CHECK***REMOVED***(auth.uid()***REMOVED***=***REMOVED***user_id);

--***REMOVED***Vérifier***REMOVED***les***REMOVED***données
SELECT***REMOVED***COUNT(*)***REMOVED***as***REMOVED***total_profiles***REMOVED***FROM***REMOVED***profiles;
SELECT***REMOVED***first_name,***REMOVED***last_name,***REMOVED***email,***REMOVED***role_radio***REMOVED***FROM***REMOVED***profiles***REMOVED***LIMIT***REMOVED***5;
