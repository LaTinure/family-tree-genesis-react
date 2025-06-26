-- Script de diagnostic pour le problème de rôle
-- À exécuter dans l'éditeur SQL de Supabase

-- 1. Vérifier la structure de la table
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'profiles' AND column_name = 'role';

-- 2. Vérifier les contraintes existantes
SELECT constraint_name, constraint_type, check_clause
FROM information_schema.check_constraints
WHERE constraint_name LIKE '%role%';

-- 3. Voir les valeurs actuelles dans la table
SELECT DISTINCT role, COUNT(*) as count
FROM profiles
GROUP BY role
ORDER BY role;

-- 4. Vérifier les enregistrements avec des valeurs problématiques
SELECT id, first_name, last_name, role, is_admin, is_patriarch
FROM profiles
WHERE role IS NULL OR role = '' OR role NOT IN ('Membre', 'Administrateur')
LIMIT 10;

-- 5. Vérifier les contraintes de la table
SELECT tc.constraint_name, tc.constraint_type, cc.check_clause
FROM information_schema.table_constraints tc
LEFT JOIN information_schema.check_constraints cc ON tc.constraint_name = cc.constraint_name
WHERE tc.table_name = 'profiles' AND tc.constraint_name LIKE '%role%';
