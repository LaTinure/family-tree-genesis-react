--***REMOVED***Script***REMOVED***SQL***REMOVED***manuel***REMOVED***pour***REMOVED***corriger***REMOVED***le***REMOVED***champ***REMOVED***role
--***REMOVED***À***REMOVED***exécuter***REMOVED***dans***REMOVED***l'éditeur***REMOVED***SQL***REMOVED***de***REMOVED***Supabase***REMOVED***si***REMOVED***la***REMOVED***migration***REMOVED***automatique***REMOVED***échoue

--***REMOVED***1.***REMOVED***Supprimer***REMOVED***les***REMOVED***contraintes***REMOVED***existantes
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***DROP***REMOVED***CONSTRAINT***REMOVED***IF***REMOVED***EXISTS***REMOVED***profiles_role_check;

--***REMOVED***2.***REMOVED***Mettre***REMOVED***à***REMOVED***jour***REMOVED***les***REMOVED***valeurs***REMOVED***existantes
UPDATE***REMOVED***profiles
SET***REMOVED***role***REMOVED***=***REMOVED***'Membre'
WHERE***REMOVED***role***REMOVED***IS***REMOVED***NULL***REMOVED***OR***REMOVED***role***REMOVED***=***REMOVED***''***REMOVED***OR***REMOVED***role***REMOVED***NOT***REMOVED***IN***REMOVED***('Membre',***REMOVED***'Administrateur');

--***REMOVED***3.***REMOVED***Ajouter***REMOVED***la***REMOVED***nouvelle***REMOVED***contrainte
ALTER***REMOVED***TABLE***REMOVED***profiles
ADD***REMOVED***CONSTRAINT***REMOVED***profiles_role_check***REMOVED***CHECK***REMOVED***(role***REMOVED***IN***REMOVED***('Membre',***REMOVED***'Administrateur'));

--***REMOVED***4.***REMOVED***Créer***REMOVED***l'index***REMOVED***s'il***REMOVED***n'existe***REMOVED***pas
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_profiles_role***REMOVED***ON***REMOVED***profiles(role);

--***REMOVED***5.***REMOVED***Vérifier***REMOVED***le***REMOVED***résultat
SELECT***REMOVED***DISTINCT***REMOVED***role***REMOVED***FROM***REMOVED***profiles***REMOVED***ORDER***REMOVED***BY***REMOVED***role;

--***REMOVED***6.***REMOVED***Ajouter***REMOVED***le***REMOVED***commentaire
COMMENT***REMOVED***ON***REMOVED***COLUMN***REMOVED***profiles.role***REMOVED***IS***REMOVED***'Rôle***REMOVED***du***REMOVED***membre***REMOVED***dans***REMOVED***la***REMOVED***famille:***REMOVED***Membre***REMOVED***ou***REMOVED***Administrateur';
