--***REMOVED***Script***REMOVED***de***REMOVED***correction***REMOVED***complet***REMOVED***pour***REMOVED***le***REMOVED***problème***REMOVED***de***REMOVED***rôle
--***REMOVED***À***REMOVED***exécuter***REMOVED***dans***REMOVED***l'éditeur***REMOVED***SQL***REMOVED***de***REMOVED***Supabase

--***REMOVED***1.***REMOVED***Supprimer***REMOVED***toutes***REMOVED***les***REMOVED***contraintes***REMOVED***liées***REMOVED***au***REMOVED***rôle
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***DROP***REMOVED***CONSTRAINT***REMOVED***IF***REMOVED***EXISTS***REMOVED***profiles_role_check;
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***DROP***REMOVED***CONSTRAINT***REMOVED***IF***REMOVED***EXISTS***REMOVED***profiles_role_check_1;
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***DROP***REMOVED***CONSTRAINT***REMOVED***IF***REMOVED***EXISTS***REMOVED***profiles_role_check_2;

--***REMOVED***2.***REMOVED***Mettre***REMOVED***à***REMOVED***jour***REMOVED***toutes***REMOVED***les***REMOVED***valeurs***REMOVED***problématiques
UPDATE***REMOVED***profiles
SET***REMOVED***role***REMOVED***=***REMOVED***'Membre'
WHERE***REMOVED***role***REMOVED***IS***REMOVED***NULL***REMOVED***OR***REMOVED***role***REMOVED***=***REMOVED***''***REMOVED***OR***REMOVED***role***REMOVED***NOT***REMOVED***IN***REMOVED***('Membre',***REMOVED***'Administrateur');

--***REMOVED***3.***REMOVED***S'assurer***REMOVED***que***REMOVED***la***REMOVED***colonne***REMOVED***a***REMOVED***la***REMOVED***bonne***REMOVED***valeur***REMOVED***par***REMOVED***défaut
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***ALTER***REMOVED***COLUMN***REMOVED***role***REMOVED***SET***REMOVED***DEFAULT***REMOVED***'Membre';

--***REMOVED***4.***REMOVED***Ajouter***REMOVED***la***REMOVED***nouvelle***REMOVED***contrainte***REMOVED***avec***REMOVED***les***REMOVED***bonnes***REMOVED***valeurs
ALTER***REMOVED***TABLE***REMOVED***profiles
ADD***REMOVED***CONSTRAINT***REMOVED***profiles_role_check***REMOVED***CHECK***REMOVED***(role***REMOVED***IN***REMOVED***('Membre',***REMOVED***'Administrateur'));

--***REMOVED***5.***REMOVED***Créer***REMOVED***l'index***REMOVED***de***REMOVED***performance
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_profiles_role***REMOVED***ON***REMOVED***profiles(role);

--***REMOVED***6.***REMOVED***Vérifier***REMOVED***le***REMOVED***résultat
SELECT***REMOVED***'Vérification***REMOVED***des***REMOVED***rôles:'***REMOVED***as***REMOVED***info;
SELECT***REMOVED***DISTINCT***REMOVED***role,***REMOVED***COUNT(*)***REMOVED***as***REMOVED***count
FROM***REMOVED***profiles
GROUP***REMOVED***BY***REMOVED***role
ORDER***REMOVED***BY***REMOVED***role;

--***REMOVED***7.***REMOVED***Vérifier***REMOVED***la***REMOVED***contrainte
SELECT***REMOVED***'Contrainte***REMOVED***créée:'***REMOVED***as***REMOVED***info;
SELECT***REMOVED***constraint_name,***REMOVED***check_clause
FROM***REMOVED***information_schema.check_constraints
WHERE***REMOVED***constraint_name***REMOVED***=***REMOVED***'profiles_role_check';

--***REMOVED***8.***REMOVED***Test***REMOVED***d'insertion***REMOVED***(optionnel***REMOVED***-***REMOVED***commenté***REMOVED***pour***REMOVED***sécurité)
--***REMOVED***INSERT***REMOVED***INTO***REMOVED***profiles***REMOVED***(user_id,***REMOVED***email,***REMOVED***first_name,***REMOVED***last_name,***REMOVED***role)
--***REMOVED***VALUES***REMOVED***('test-user',***REMOVED***'test@test.com',***REMOVED***'Test',***REMOVED***'User',***REMOVED***'Membre');

SELECT***REMOVED***'Correction***REMOVED***terminée***REMOVED***avec***REMOVED***succès!'***REMOVED***as***REMOVED***status;
