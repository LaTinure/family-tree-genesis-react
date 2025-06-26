-- Script SQL pour corriger immédiatement la contrainte de rôle
-- À exécuter dans l'éditeur SQL de Supabase

-- 1. Supprimer la contrainte existante
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

-- 2. Ajouter la nouvelle contrainte avec les bonnes valeurs
ALTER TABLE profiles
ADD CONSTRAINT profiles_role_check CHECK (role IN ('Membre', 'Administrateur'));

-- 3. Mettre à jour les valeurs existantes pour correspondre aux nouvelles contraintes
UPDATE profiles
SET role = 'Membre'
WHERE role IS NULL OR role = '' OR role NOT IN ('Membre', 'Administrateur');

-- 4. Vérifier le résultat
SELECT DISTINCT role FROM profiles ORDER BY role;

-- 5. Vérifier que la contrainte fonctionne
SELECT constraint_name, check_clause
FROM information_schema.check_constraints
WHERE constraint_name = 'profiles_role_check';
