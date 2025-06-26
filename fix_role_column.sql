-- Script SQL manuel pour corriger le champ role
-- À exécuter dans l'éditeur SQL de Supabase si la migration automatique échoue

-- 1. Supprimer les contraintes existantes
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

-- 2. Mettre à jour les valeurs existantes
UPDATE profiles
SET role = 'Membre'
WHERE role IS NULL OR role = '' OR role NOT IN ('Membre', 'Administrateur');

-- 3. Ajouter la nouvelle contrainte
ALTER TABLE profiles
ADD CONSTRAINT profiles_role_check CHECK (role IN ('Membre', 'Administrateur'));

-- 4. Créer l'index s'il n'existe pas
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- 5. Vérifier le résultat
SELECT DISTINCT role FROM profiles ORDER BY role;

-- 6. Ajouter le commentaire
COMMENT ON COLUMN profiles.role IS 'Rôle du membre dans la famille: Membre ou Administrateur';
