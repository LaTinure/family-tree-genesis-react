-- Script de correction complet pour le problème de rôle
-- À exécuter dans l'éditeur SQL de Supabase

-- 1. Supprimer toutes les contraintes liées au rôle
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check_1;
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check_2;

-- 2. Mettre à jour toutes les valeurs problématiques
UPDATE profiles
SET role = 'Membre'
WHERE role IS NULL OR role = '' OR role NOT IN ('Membre', 'Administrateur');

-- 3. S'assurer que la colonne a la bonne valeur par défaut
ALTER TABLE profiles ALTER COLUMN role SET DEFAULT 'Membre';

-- 4. Ajouter la nouvelle contrainte avec les bonnes valeurs
ALTER TABLE profiles
ADD CONSTRAINT profiles_role_check CHECK (role IN ('Membre', 'Administrateur'));

-- 5. Créer l'index de performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- 6. Vérifier le résultat
SELECT 'Vérification des rôles:' as info;
SELECT DISTINCT role, COUNT(*) as count
FROM profiles
GROUP BY role
ORDER BY role;

-- 7. Vérifier la contrainte
SELECT 'Contrainte créée:' as info;
SELECT constraint_name, check_clause
FROM information_schema.check_constraints
WHERE constraint_name = 'profiles_role_check';

-- 8. Test d'insertion (optionnel - commenté pour sécurité)
-- INSERT INTO profiles (user_id, email, first_name, last_name, role)
-- VALUES ('test-user', 'test@test.com', 'Test', 'User', 'Membre');

SELECT 'Correction terminée avec succès!' as status;
