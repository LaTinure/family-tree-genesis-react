--***REMOVED***Script***REMOVED***de***REMOVED***diagnostic***REMOVED***pour***REMOVED***le***REMOVED***problème***REMOVED***de***REMOVED***rôle
--***REMOVED***À***REMOVED***exécuter***REMOVED***dans***REMOVED***l'éditeur***REMOVED***SQL***REMOVED***de***REMOVED***Supabase

--***REMOVED***1.***REMOVED***Vérifier***REMOVED***la***REMOVED***structure***REMOVED***de***REMOVED***la***REMOVED***table
SELECT***REMOVED***column_name,***REMOVED***data_type,***REMOVED***is_nullable,***REMOVED***column_default
FROM***REMOVED***information_schema.columns
WHERE***REMOVED***table_name***REMOVED***=***REMOVED***'profiles'***REMOVED***AND***REMOVED***column_name***REMOVED***=***REMOVED***'role';

--***REMOVED***2.***REMOVED***Vérifier***REMOVED***les***REMOVED***contraintes***REMOVED***existantes
SELECT***REMOVED***constraint_name,***REMOVED***constraint_type,***REMOVED***check_clause
FROM***REMOVED***information_schema.check_constraints
WHERE***REMOVED***constraint_name***REMOVED***LIKE***REMOVED***'%role%';

--***REMOVED***3.***REMOVED***Voir***REMOVED***les***REMOVED***valeurs***REMOVED***actuelles***REMOVED***dans***REMOVED***la***REMOVED***table
SELECT***REMOVED***DISTINCT***REMOVED***role,***REMOVED***COUNT(*)***REMOVED***as***REMOVED***count
FROM***REMOVED***profiles
GROUP***REMOVED***BY***REMOVED***role
ORDER***REMOVED***BY***REMOVED***role;

--***REMOVED***4.***REMOVED***Vérifier***REMOVED***les***REMOVED***enregistrements***REMOVED***avec***REMOVED***des***REMOVED***valeurs***REMOVED***problématiques
SELECT***REMOVED***id,***REMOVED***first_name,***REMOVED***last_name,***REMOVED***role,***REMOVED***is_admin,***REMOVED***is_patriarch
FROM***REMOVED***profiles
WHERE***REMOVED***role***REMOVED***IS***REMOVED***NULL***REMOVED***OR***REMOVED***role***REMOVED***=***REMOVED***''***REMOVED***OR***REMOVED***role***REMOVED***NOT***REMOVED***IN***REMOVED***('Membre',***REMOVED***'Administrateur')
LIMIT***REMOVED***10;

--***REMOVED***5.***REMOVED***Vérifier***REMOVED***les***REMOVED***contraintes***REMOVED***de***REMOVED***la***REMOVED***table
SELECT***REMOVED***tc.constraint_name,***REMOVED***tc.constraint_type,***REMOVED***cc.check_clause
FROM***REMOVED***information_schema.table_constraints***REMOVED***tc
LEFT***REMOVED***JOIN***REMOVED***information_schema.check_constraints***REMOVED***cc***REMOVED***ON***REMOVED***tc.constraint_name***REMOVED***=***REMOVED***cc.constraint_name
WHERE***REMOVED***tc.table_name***REMOVED***=***REMOVED***'profiles'***REMOVED***AND***REMOVED***tc.constraint_name***REMOVED***LIKE***REMOVED***'%role%';
