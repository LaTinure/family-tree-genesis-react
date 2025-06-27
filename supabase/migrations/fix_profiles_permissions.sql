--***REMOVED***Migration***REMOVED***pour***REMOVED***corriger***REMOVED***les***REMOVED***permissions***REMOVED***des***REMOVED***profils
--***REMOVED***Date:***REMOVED***2024-01-XX

--***REMOVED***Activer***REMOVED***RLS***REMOVED***sur***REMOVED***la***REMOVED***table***REMOVED***profiles
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***ENABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;

--***REMOVED***Supprimer***REMOVED***les***REMOVED***politiques***REMOVED***existantes***REMOVED***qui***REMOVED***pourraient***REMOVED***bloquer***REMOVED***l'accès
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Profiles***REMOVED***are***REMOVED***viewable***REMOVED***by***REMOVED***everyone"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***view***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***update***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***insert***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***delete***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;

--***REMOVED***Créer***REMOVED***une***REMOVED***politique***REMOVED***pour***REMOVED***permettre***REMOVED***la***REMOVED***lecture***REMOVED***de***REMOVED***tous***REMOVED***les***REMOVED***profils
--***REMOVED***Cette***REMOVED***politique***REMOVED***permet***REMOVED***à***REMOVED***tous***REMOVED***les***REMOVED***utilisateurs***REMOVED***authentifiés***REMOVED***de***REMOVED***voir***REMOVED***tous***REMOVED***les***REMOVED***profils
CREATE***REMOVED***POLICY***REMOVED***"Profiles***REMOVED***are***REMOVED***viewable***REMOVED***by***REMOVED***everyone"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***SELECT
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(true);

--***REMOVED***Créer***REMOVED***une***REMOVED***politique***REMOVED***pour***REMOVED***permettre***REMOVED***l'insertion***REMOVED***de***REMOVED***nouveaux***REMOVED***profils
CREATE***REMOVED***POLICY***REMOVED***"Users***REMOVED***can***REMOVED***insert***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***INSERT
***REMOVED******REMOVED******REMOVED******REMOVED***WITH***REMOVED***CHECK***REMOVED***(auth.uid()***REMOVED***=***REMOVED***user_id);

--***REMOVED***Créer***REMOVED***une***REMOVED***politique***REMOVED***pour***REMOVED***permettre***REMOVED***la***REMOVED***mise***REMOVED***à***REMOVED***jour***REMOVED***de***REMOVED***son***REMOVED***propre***REMOVED***profil
CREATE***REMOVED***POLICY***REMOVED***"Users***REMOVED***can***REMOVED***update***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***UPDATE
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(auth.uid()***REMOVED***=***REMOVED***user_id)
***REMOVED******REMOVED******REMOVED******REMOVED***WITH***REMOVED***CHECK***REMOVED***(auth.uid()***REMOVED***=***REMOVED***user_id);

--***REMOVED***Créer***REMOVED***une***REMOVED***politique***REMOVED***pour***REMOVED***permettre***REMOVED***la***REMOVED***suppression***REMOVED***de***REMOVED***son***REMOVED***propre***REMOVED***profil***REMOVED***(optionnel)
CREATE***REMOVED***POLICY***REMOVED***"Users***REMOVED***can***REMOVED***delete***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***DELETE
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(auth.uid()***REMOVED***=***REMOVED***user_id);

--***REMOVED***Vérifier***REMOVED***que***REMOVED***les***REMOVED***politiques***REMOVED***sont***REMOVED***créées
DO***REMOVED***$$
BEGIN
***REMOVED******REMOVED******REMOVED******REMOVED***RAISE***REMOVED***NOTICE***REMOVED***'Politiques***REMOVED***RLS***REMOVED***créées***REMOVED***pour***REMOVED***la***REMOVED***table***REMOVED***profiles';
***REMOVED******REMOVED******REMOVED******REMOVED***RAISE***REMOVED***NOTICE***REMOVED***'Tous***REMOVED***les***REMOVED***utilisateurs***REMOVED***authentifiés***REMOVED***peuvent***REMOVED***maintenant***REMOVED***voir***REMOVED***les***REMOVED***profils';
END***REMOVED***$$;
