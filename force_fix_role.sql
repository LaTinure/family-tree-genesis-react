-- Script de correction forcée pour le problème de rôle
-- À exécuter dans l'éditeur SQL de Supabase

-- 1. Supprimer TOUTES les contraintes liées au rôle
DO $$
BEGIN
    -- Supprimer toutes les contraintes check qui contiennent 'role'
    FOR r IN (
        SELECT constraint_name
        FROM information_schema.check_constraints
        WHERE check_clause LIKE '%role%'
    ) LOOP
        EXECUTE 'ALTER TABLE profiles DROP CONSTRAINT IF EXISTS ' || r.constraint_name;
    END LOOP;

    -- Supprimer aussi les contraintes de table
    FOR r IN (
        SELECT constraint_name
        FROM information_schema.table_constraints
        WHERE table_name = 'profiles' AND constraint_name LIKE '%role%'
    ) LOOP
        EXECUTE 'ALTER TABLE profiles DROP CONSTRAINT IF EXISTS ' || r.constraint_name;
    END LOOP;
END $$;

-- 2. Nettoyer complètement les données
UPDATE profiles
SET role = 'Membre'
WHERE role IS NULL OR role = '' OR role NOT IN ('Membre', 'Administrateur');

-- 3. S'assurer que la colonne a la bonne valeur par défaut
ALTER TABLE profiles ALTER COLUMN role SET DEFAULT 'Membre';

-- 4. Recréer la contrainte avec des valeurs exactes
ALTER TABLE profiles
ADD CONSTRAINT profiles_role_check
CHECK (role = 'Membre' OR role = 'Administrateur');

-- 5. Vérifier que la contrainte fonctionne
SELECT '=== VÉRIFICATION ===' as section;

-- Test avec 'Membre'
BEGIN;
    INSERT INTO profiles (id, user_id, email, first_name, last_name, role)
    VALUES ('test-membre-2', 'test-membre-2', 'test2@membre.com', 'Test', 'Membre', 'Membre');
    SELECT '✅ Membre: SUCCESS' as result;
ROLLBACK;

-- Test avec 'Administrateur'
BEGIN;
    INSERT INTO profiles (id, user_id, email, first_name, last_name, role)
    VALUES ('test-admin-2', 'test-admin-2', 'test2@admin.com', 'Test', 'Admin', 'Administrateur');
    SELECT '✅ Administrateur: SUCCESS' as result;
ROLLBACK;

-- 6. Afficher la contrainte finale
SELECT '=== CONTRAINTE FINALE ===' as section;
SELECT constraint_name, check_clause
FROM information_schema.check_constraints
WHERE constraint_name = 'profiles_role_check';

-- 7. Afficher les valeurs dans la table
SELECT '=== VALEURS FINALES ===' as section;
SELECT DISTINCT role, COUNT(*) as count
FROM profiles
GROUP BY role
ORDER BY role;

SELECT '🎉 Correction terminée avec succès!' as status;
