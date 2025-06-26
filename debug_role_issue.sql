--***REMOVED***Script***REMOVED***de***REMOVED***diagnostic***REMOVED***détaillé***REMOVED***pour***REMOVED***le***REMOVED***problème***REMOVED***de***REMOVED***rôle
--***REMOVED***À***REMOVED***exécuter***REMOVED***dans***REMOVED***l'éditeur***REMOVED***SQL***REMOVED***de***REMOVED***Supabase

--***REMOVED***1.***REMOVED***Vérifier***REMOVED***la***REMOVED***contrainte***REMOVED***actuelle
SELECT***REMOVED***'===***REMOVED***CONTRAINTE***REMOVED***ACTUELLE***REMOVED***==='***REMOVED***as***REMOVED***section;
SELECT***REMOVED***constraint_name,***REMOVED***check_clause
FROM***REMOVED***information_schema.check_constraints
WHERE***REMOVED***constraint_name***REMOVED***=***REMOVED***'profiles_role_check';

--***REMOVED***2.***REMOVED***Vérifier***REMOVED***les***REMOVED***valeurs***REMOVED***exactes***REMOVED***dans***REMOVED***la***REMOVED***table
SELECT***REMOVED***'===***REMOVED***VALEURS***REMOVED***ACTUELLES***REMOVED***==='***REMOVED***as***REMOVED***section;
SELECT***REMOVED***role,***REMOVED***LENGTH(role)***REMOVED***as***REMOVED***length,***REMOVED***ASCII(SUBSTRING(role,***REMOVED***1,***REMOVED***1))***REMOVED***as***REMOVED***first_char_ascii
FROM***REMOVED***profiles
GROUP***REMOVED***BY***REMOVED***role
ORDER***REMOVED***BY***REMOVED***role;

--***REMOVED***3.***REMOVED***Tester***REMOVED***les***REMOVED***valeurs***REMOVED***exactes
SELECT***REMOVED***'===***REMOVED***TEST***REMOVED***DES***REMOVED***VALEURS***REMOVED***==='***REMOVED***as***REMOVED***section;
SELECT
***REMOVED******REMOVED***'Membre'***REMOVED***as***REMOVED***test_value,
***REMOVED******REMOVED***'Membre'***REMOVED***IN***REMOVED***('Membre',***REMOVED***'Administrateur')***REMOVED***as***REMOVED***is_valid,
***REMOVED******REMOVED***LENGTH('Membre')***REMOVED***as***REMOVED***length,
***REMOVED******REMOVED***ASCII(SUBSTRING('Membre',***REMOVED***1,***REMOVED***1))***REMOVED***as***REMOVED***first_char_ascii
UNION***REMOVED***ALL
SELECT
***REMOVED******REMOVED***'Administrateur'***REMOVED***as***REMOVED***test_value,
***REMOVED******REMOVED***'Administrateur'***REMOVED***IN***REMOVED***('Membre',***REMOVED***'Administrateur')***REMOVED***as***REMOVED***is_valid,
***REMOVED******REMOVED***LENGTH('Administrateur')***REMOVED***as***REMOVED***length,
***REMOVED******REMOVED***ASCII(SUBSTRING('Administrateur',***REMOVED***1,***REMOVED***1))***REMOVED***as***REMOVED***first_char_ascii;

--***REMOVED***4.***REMOVED***Vérifier***REMOVED***la***REMOVED***structure***REMOVED***de***REMOVED***la***REMOVED***colonne
SELECT***REMOVED***'===***REMOVED***STRUCTURE***REMOVED***DE***REMOVED***LA***REMOVED***COLONNE***REMOVED***==='***REMOVED***as***REMOVED***section;
SELECT***REMOVED***column_name,***REMOVED***data_type,***REMOVED***is_nullable,***REMOVED***column_default,***REMOVED***character_maximum_length
FROM***REMOVED***information_schema.columns
WHERE***REMOVED***table_name***REMOVED***=***REMOVED***'profiles'***REMOVED***AND***REMOVED***column_name***REMOVED***=***REMOVED***'role';

--***REMOVED***5.***REMOVED***Lister***REMOVED***toutes***REMOVED***les***REMOVED***contraintes***REMOVED***de***REMOVED***la***REMOVED***table
SELECT***REMOVED***'===***REMOVED***TOUTES***REMOVED***LES***REMOVED***CONTRAINTES***REMOVED***==='***REMOVED***as***REMOVED***section;
SELECT***REMOVED***tc.constraint_name,***REMOVED***tc.constraint_type,***REMOVED***cc.check_clause
FROM***REMOVED***information_schema.table_constraints***REMOVED***tc
LEFT***REMOVED***JOIN***REMOVED***information_schema.check_constraints***REMOVED***cc***REMOVED***ON***REMOVED***tc.constraint_name***REMOVED***=***REMOVED***cc.constraint_name
WHERE***REMOVED***tc.table_name***REMOVED***=***REMOVED***'profiles';

--***REMOVED***6.***REMOVED***Test***REMOVED***d'insertion***REMOVED***avec***REMOVED***différentes***REMOVED***valeurs
SELECT***REMOVED***'===***REMOVED***TEST***REMOVED***D''INSERTION***REMOVED***==='***REMOVED***as***REMOVED***section;
--***REMOVED***Test***REMOVED***avec***REMOVED***'Membre'
BEGIN;
***REMOVED******REMOVED***INSERT***REMOVED***INTO***REMOVED***profiles***REMOVED***(id,***REMOVED***user_id,***REMOVED***email,***REMOVED***first_name,***REMOVED***last_name,***REMOVED***role)
***REMOVED******REMOVED***VALUES***REMOVED***('test-membre',***REMOVED***'test-membre',***REMOVED***'test@membre.com',***REMOVED***'Test',***REMOVED***'Membre',***REMOVED***'Membre');
***REMOVED******REMOVED***SELECT***REMOVED***'Membre:***REMOVED***SUCCESS'***REMOVED***as***REMOVED***result;
ROLLBACK;

--***REMOVED***Test***REMOVED***avec***REMOVED***'Administrateur'
BEGIN;
***REMOVED******REMOVED***INSERT***REMOVED***INTO***REMOVED***profiles***REMOVED***(id,***REMOVED***user_id,***REMOVED***email,***REMOVED***first_name,***REMOVED***last_name,***REMOVED***role)
***REMOVED******REMOVED***VALUES***REMOVED***('test-admin',***REMOVED***'test-admin',***REMOVED***'test@admin.com',***REMOVED***'Test',***REMOVED***'Admin',***REMOVED***'Administrateur');
***REMOVED******REMOVED***SELECT***REMOVED***'Administrateur:***REMOVED***SUCCESS'***REMOVED***as***REMOVED***result;
ROLLBACK;
