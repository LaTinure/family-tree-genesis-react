-- Script de diagnostic détaillé pour le problème de rôle
-- À exécuter dans l'éditeur SQL de Supabase

-- 1. Vérifier la contrainte actuelle
SELECT '=== CONTRAINTE ACTUELLE ===' as section;
SELECT constraint_name, check_clause
FROM information_schema.check_constraints
WHERE constraint_name = 'profiles_role_check';

-- 2. Vérifier les valeurs exactes dans la table
SELECT '=== VALEURS ACTUELLES ===' as section;
SELECT role, LENGTH(role) as length, ASCII(SUBSTRING(role, 1, 1)) as first_char_ascii
FROM profiles
GROUP BY role
ORDER BY role;

-- 3. Tester les valeurs exactes
SELECT '=== TEST DES VALEURS ===' as section;
SELECT
  'Membre' as test_value,
  'Membre' IN ('Membre', 'Administrateur') as is_valid,
  LENGTH('Membre') as length,
  ASCII(SUBSTRING('Membre', 1, 1)) as first_char_ascii
UNION ALL
SELECT
  'Administrateur' as test_value,
  'Administrateur' IN ('Membre', 'Administrateur') as is_valid,
  LENGTH('Administrateur') as length,
  ASCII(SUBSTRING('Administrateur', 1, 1)) as first_char_ascii;

-- 4. Vérifier la structure de la colonne
SELECT '=== STRUCTURE DE LA COLONNE ===' as section;
SELECT column_name, data_type, is_nullable, column_default, character_maximum_length
FROM information_schema.columns
WHERE table_name = 'profiles' AND column_name = 'role';

-- 5. Lister toutes les contraintes de la table
SELECT '=== TOUTES LES CONTRAINTES ===' as section;
SELECT tc.constraint_name, tc.constraint_type, cc.check_clause
FROM information_schema.table_constraints tc
LEFT JOIN information_schema.check_constraints cc ON tc.constraint_name = cc.constraint_name
WHERE tc.table_name = 'profiles';

-- 6. Test d'insertion avec différentes valeurs
SELECT '=== TEST D''INSERTION ===' as section;
-- Test avec 'Membre'
BEGIN;
  INSERT INTO profiles (id, user_id, email, first_name, last_name, role)
  VALUES ('test-membre', 'test-membre', 'test@membre.com', 'Test', 'Membre', 'Membre');
  SELECT 'Membre: SUCCESS' as result;
ROLLBACK;

-- Test avec 'Administrateur'
BEGIN;
  INSERT INTO profiles (id, user_id, email, first_name, last_name, role)
  VALUES ('test-admin', 'test-admin', 'test@admin.com', 'Test', 'Admin', 'Administrateur');
  SELECT 'Administrateur: SUCCESS' as result;
ROLLBACK;
