--***REMOVED***Migration***REMOVED***pour***REMOVED***mettre***REMOVED***à***REMOVED***jour***REMOVED***le***REMOVED***champ***REMOVED***role***REMOVED***dans***REMOVED***la***REMOVED***table***REMOVED***profiles
--***REMOVED***Date:***REMOVED***2024-01-XX

--***REMOVED***Vérifier***REMOVED***si***REMOVED***la***REMOVED***colonne***REMOVED***role***REMOVED***existe***REMOVED***déjà
DO***REMOVED***$$
BEGIN
***REMOVED******REMOVED******REMOVED******REMOVED***--***REMOVED***Si***REMOVED***la***REMOVED***colonne***REMOVED***n'existe***REMOVED***pas,***REMOVED***la***REMOVED***créer
***REMOVED******REMOVED******REMOVED******REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***SELECT***REMOVED***1***REMOVED***FROM***REMOVED***information_schema.columns
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***WHERE***REMOVED***table_name***REMOVED***=***REMOVED***'profiles'***REMOVED***AND***REMOVED***column_name***REMOVED***=***REMOVED***'role'
***REMOVED******REMOVED******REMOVED******REMOVED***)***REMOVED***THEN
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***ADD***REMOVED***COLUMN***REMOVED***role***REMOVED***VARCHAR(50)***REMOVED***DEFAULT***REMOVED***'Membre';
***REMOVED******REMOVED******REMOVED******REMOVED***END***REMOVED***IF;
END***REMOVED***$$;

--***REMOVED***Supprimer***REMOVED***les***REMOVED***contraintes***REMOVED***existantes***REMOVED***si***REMOVED***elles***REMOVED***existent
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***DROP***REMOVED***CONSTRAINT***REMOVED***IF***REMOVED***EXISTS***REMOVED***profiles_role_check;

--***REMOVED***Ajouter***REMOVED***la***REMOVED***nouvelle***REMOVED***contrainte***REMOVED***avec***REMOVED***les***REMOVED***valeurs***REMOVED***Membre***REMOVED***et***REMOVED***Administrateur
ALTER***REMOVED***TABLE***REMOVED***profiles
ADD***REMOVED***CONSTRAINT***REMOVED***profiles_role_check***REMOVED***CHECK***REMOVED***(role***REMOVED***IN***REMOVED***('Membre',***REMOVED***'Administrateur'));

--***REMOVED***Mettre***REMOVED***à***REMOVED***jour***REMOVED***les***REMOVED***enregistrements***REMOVED***existants
--***REMOVED***Si***REMOVED***is_patriarch***REMOVED***est***REMOVED***true,***REMOVED***alors***REMOVED***role***REMOVED***=***REMOVED***'Patriarche',***REMOVED***sinon***REMOVED***'Membre'
UPDATE***REMOVED***profiles
SET***REMOVED***role***REMOVED***=***REMOVED***CASE
***REMOVED******REMOVED******REMOVED******REMOVED***WHEN***REMOVED***is_patriarch***REMOVED***=***REMOVED***true***REMOVED***THEN***REMOVED***'Patriarche'
***REMOVED******REMOVED******REMOVED******REMOVED***WHEN***REMOVED***role***REMOVED***IS***REMOVED***NULL***REMOVED***OR***REMOVED***role***REMOVED***=***REMOVED***''***REMOVED***THEN***REMOVED***'Membre'
***REMOVED******REMOVED******REMOVED******REMOVED***ELSE***REMOVED***role
END
WHERE***REMOVED***role***REMOVED***IS***REMOVED***NULL***REMOVED***OR***REMOVED***role***REMOVED***=***REMOVED***'';

--***REMOVED***Créer***REMOVED***un***REMOVED***index***REMOVED***sur***REMOVED***la***REMOVED***colonne***REMOVED***role***REMOVED***pour***REMOVED***améliorer***REMOVED***les***REMOVED***performances***REMOVED***(s'il***REMOVED***n'existe***REMOVED***pas***REMOVED***déjà)
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_profiles_role***REMOVED***ON***REMOVED***profiles(role);

--***REMOVED***Ajouter***REMOVED***un***REMOVED***commentaire***REMOVED***sur***REMOVED***la***REMOVED***colonne
COMMENT***REMOVED***ON***REMOVED***COLUMN***REMOVED***profiles.role***REMOVED***IS***REMOVED***'Rôle***REMOVED***du***REMOVED***membre***REMOVED***dans***REMOVED***la***REMOVED***famille:***REMOVED***Membre***REMOVED***ou***REMOVED***Administrateur';
