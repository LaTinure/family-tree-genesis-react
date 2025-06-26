--***REMOVED***Script***REMOVED***SQL***REMOVED***pour***REMOVED***corriger***REMOVED***immédiatement***REMOVED***la***REMOVED***contrainte***REMOVED***de***REMOVED***rôle
--***REMOVED***À***REMOVED***exécuter***REMOVED***dans***REMOVED***l'éditeur***REMOVED***SQL***REMOVED***de***REMOVED***Supabase

--***REMOVED***1.***REMOVED***Supprimer***REMOVED***la***REMOVED***contrainte***REMOVED***existante
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***DROP***REMOVED***CONSTRAINT***REMOVED***IF***REMOVED***EXISTS***REMOVED***profiles_role_check;

--***REMOVED***2.***REMOVED***Ajouter***REMOVED***la***REMOVED***nouvelle***REMOVED***contrainte***REMOVED***avec***REMOVED***les***REMOVED***bonnes***REMOVED***valeurs
ALTER***REMOVED***TABLE***REMOVED***profiles
ADD***REMOVED***CONSTRAINT***REMOVED***profiles_role_check***REMOVED***CHECK***REMOVED***(role***REMOVED***IN***REMOVED***('Membre',***REMOVED***'Administrateur'));

--***REMOVED***3.***REMOVED***Mettre***REMOVED***à***REMOVED***jour***REMOVED***les***REMOVED***valeurs***REMOVED***existantes***REMOVED***pour***REMOVED***correspondre***REMOVED***aux***REMOVED***nouvelles***REMOVED***contraintes
UPDATE***REMOVED***profiles
SET***REMOVED***role***REMOVED***=***REMOVED***'Membre'
WHERE***REMOVED***role***REMOVED***IS***REMOVED***NULL***REMOVED***OR***REMOVED***role***REMOVED***=***REMOVED***''***REMOVED***OR***REMOVED***role***REMOVED***NOT***REMOVED***IN***REMOVED***('Membre',***REMOVED***'Administrateur');

--***REMOVED***4.***REMOVED***Vérifier***REMOVED***le***REMOVED***résultat
SELECT***REMOVED***DISTINCT***REMOVED***role***REMOVED***FROM***REMOVED***profiles***REMOVED***ORDER***REMOVED***BY***REMOVED***role;

--***REMOVED***5.***REMOVED***Vérifier***REMOVED***que***REMOVED***la***REMOVED***contrainte***REMOVED***fonctionne
SELECT***REMOVED***constraint_name,***REMOVED***check_clause
FROM***REMOVED***information_schema.check_constraints
WHERE***REMOVED***constraint_name***REMOVED***=***REMOVED***'profiles_role_check';
