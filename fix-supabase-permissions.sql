-- Script pour corriger les permissions Supabase
-- Permet à tous les utilisateurs authentifiés de voir les profils

-- 1. Activer RLS sur la table profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 2. Supprimer les politiques existantes si elles existent
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- 3. Créer une politique pour permettre la lecture de tous les profils
CREATE POLICY "Profiles are viewable by everyone" ON profiles
    FOR SELECT
    USING (true);

-- 4. Créer une politique pour permettre l'insertion de nouveaux profils
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- 5. Créer une politique pour permettre la mise à jour de son propre profil
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 6. Créer une politique pour permettre la suppression de son propre profil (optionnel)
CREATE POLICY "Users can delete own profile" ON profiles
    FOR DELETE
    USING (auth.uid() = user_id);

-- 7. Vérifier que les politiques sont créées
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'profiles';

-- 8. Vérifier les données existantes
SELECT COUNT(*) as total_profiles FROM profiles;
SELECT first_name, last_name, email, role_radio, is_patriarch, is_admin FROM profiles LIMIT 5;
