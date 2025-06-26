--***REMOVED***Script***REMOVED***de***REMOVED***correction***REMOVED***forcée***REMOVED***pour***REMOVED***le***REMOVED***problème***REMOVED***de***REMOVED***rôle
--***REMOVED***À***REMOVED***exécuter***REMOVED***dans***REMOVED***l'éditeur***REMOVED***SQL***REMOVED***de***REMOVED***Supabase

--***REMOVED***1.***REMOVED***Supprimer***REMOVED***TOUTES***REMOVED***les***REMOVED***contraintes***REMOVED***liées***REMOVED***au***REMOVED***rôle
DO***REMOVED***$$
BEGIN
***REMOVED******REMOVED******REMOVED******REMOVED***--***REMOVED***Supprimer***REMOVED***toutes***REMOVED***les***REMOVED***contraintes***REMOVED***check***REMOVED***qui***REMOVED***contiennent***REMOVED***'role'
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***r***REMOVED***IN***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***SELECT***REMOVED***constraint_name
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***FROM***REMOVED***information_schema.check_constraints
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***WHERE***REMOVED***check_clause***REMOVED***LIKE***REMOVED***'%role%'
***REMOVED******REMOVED******REMOVED******REMOVED***)***REMOVED***LOOP
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***EXECUTE***REMOVED***'ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***DROP***REMOVED***CONSTRAINT***REMOVED***IF***REMOVED***EXISTS***REMOVED***'***REMOVED***||***REMOVED***r.constraint_name;
***REMOVED******REMOVED******REMOVED******REMOVED***END***REMOVED***LOOP;

***REMOVED******REMOVED******REMOVED******REMOVED***--***REMOVED***Supprimer***REMOVED***aussi***REMOVED***les***REMOVED***contraintes***REMOVED***de***REMOVED***table
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***r***REMOVED***IN***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***SELECT***REMOVED***constraint_name
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***FROM***REMOVED***information_schema.table_constraints
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***WHERE***REMOVED***table_name***REMOVED***=***REMOVED***'profiles'***REMOVED***AND***REMOVED***constraint_name***REMOVED***LIKE***REMOVED***'%role%'
***REMOVED******REMOVED******REMOVED******REMOVED***)***REMOVED***LOOP
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***EXECUTE***REMOVED***'ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***DROP***REMOVED***CONSTRAINT***REMOVED***IF***REMOVED***EXISTS***REMOVED***'***REMOVED***||***REMOVED***r.constraint_name;
***REMOVED******REMOVED******REMOVED******REMOVED***END***REMOVED***LOOP;
END***REMOVED***$$;

--***REMOVED***2.***REMOVED***Nettoyer***REMOVED***complètement***REMOVED***les***REMOVED***données
UPDATE***REMOVED***profiles
SET***REMOVED***role***REMOVED***=***REMOVED***'Membre'
WHERE***REMOVED***role***REMOVED***IS***REMOVED***NULL***REMOVED***OR***REMOVED***role***REMOVED***=***REMOVED***''***REMOVED***OR***REMOVED***role***REMOVED***NOT***REMOVED***IN***REMOVED***('Membre',***REMOVED***'Administrateur');

--***REMOVED***3.***REMOVED***S'assurer***REMOVED***que***REMOVED***la***REMOVED***colonne***REMOVED***a***REMOVED***la***REMOVED***bonne***REMOVED***valeur***REMOVED***par***REMOVED***défaut
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***ALTER***REMOVED***COLUMN***REMOVED***role***REMOVED***SET***REMOVED***DEFAULT***REMOVED***'Membre';

--***REMOVED***4.***REMOVED***Recréer***REMOVED***la***REMOVED***contrainte***REMOVED***avec***REMOVED***des***REMOVED***valeurs***REMOVED***exactes
ALTER***REMOVED***TABLE***REMOVED***profiles
ADD***REMOVED***CONSTRAINT***REMOVED***profiles_role_check
CHECK***REMOVED***(role***REMOVED***=***REMOVED***'Membre'***REMOVED***OR***REMOVED***role***REMOVED***=***REMOVED***'Administrateur');

--***REMOVED***5.***REMOVED***Vérifier***REMOVED***que***REMOVED***la***REMOVED***contrainte***REMOVED***fonctionne
SELECT***REMOVED***'===***REMOVED***VÉRIFICATION***REMOVED***==='***REMOVED***as***REMOVED***section;

--***REMOVED***Test***REMOVED***avec***REMOVED***'Membre'
BEGIN;
***REMOVED******REMOVED******REMOVED******REMOVED***INSERT***REMOVED***INTO***REMOVED***profiles***REMOVED***(id,***REMOVED***user_id,***REMOVED***email,***REMOVED***first_name,***REMOVED***last_name,***REMOVED***role)
***REMOVED******REMOVED******REMOVED******REMOVED***VALUES***REMOVED***('test-membre-2',***REMOVED***'test-membre-2',***REMOVED***'test2@membre.com',***REMOVED***'Test',***REMOVED***'Membre',***REMOVED***'Membre');
***REMOVED******REMOVED******REMOVED******REMOVED***SELECT***REMOVED***'✅***REMOVED***Membre:***REMOVED***SUCCESS'***REMOVED***as***REMOVED***result;
ROLLBACK;

--***REMOVED***Test***REMOVED***avec***REMOVED***'Administrateur'
BEGIN;
***REMOVED******REMOVED******REMOVED******REMOVED***INSERT***REMOVED***INTO***REMOVED***profiles***REMOVED***(id,***REMOVED***user_id,***REMOVED***email,***REMOVED***first_name,***REMOVED***last_name,***REMOVED***role)
***REMOVED******REMOVED******REMOVED******REMOVED***VALUES***REMOVED***('test-admin-2',***REMOVED***'test-admin-2',***REMOVED***'test2@admin.com',***REMOVED***'Test',***REMOVED***'Admin',***REMOVED***'Administrateur');
***REMOVED******REMOVED******REMOVED******REMOVED***SELECT***REMOVED***'✅***REMOVED***Administrateur:***REMOVED***SUCCESS'***REMOVED***as***REMOVED***result;
ROLLBACK;

--***REMOVED***6.***REMOVED***Afficher***REMOVED***la***REMOVED***contrainte***REMOVED***finale
SELECT***REMOVED***'===***REMOVED***CONTRAINTE***REMOVED***FINALE***REMOVED***==='***REMOVED***as***REMOVED***section;
SELECT***REMOVED***constraint_name,***REMOVED***check_clause
FROM***REMOVED***information_schema.check_constraints
WHERE***REMOVED***constraint_name***REMOVED***=***REMOVED***'profiles_role_check';

--***REMOVED***7.***REMOVED***Afficher***REMOVED***les***REMOVED***valeurs***REMOVED***dans***REMOVED***la***REMOVED***table
SELECT***REMOVED***'===***REMOVED***VALEURS***REMOVED***FINALES***REMOVED***==='***REMOVED***as***REMOVED***section;
SELECT***REMOVED***DISTINCT***REMOVED***role,***REMOVED***COUNT(*)***REMOVED***as***REMOVED***count
FROM***REMOVED***profiles
GROUP***REMOVED***BY***REMOVED***role
ORDER***REMOVED***BY***REMOVED***role;

SELECT***REMOVED***'🎉***REMOVED***Correction***REMOVED***terminée***REMOVED***avec***REMOVED***succès!'***REMOVED***as***REMOVED***status;
