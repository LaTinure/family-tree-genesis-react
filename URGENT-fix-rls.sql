-- URGENT: Script pour corriger les politiques RLS
-- Copier et coller IMMÉDIATEMENT dans l'éditeur SQL de Supabase

-- 1. Activer RLS sur la table profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 2. Supprimer TOUTES les politiques existantes
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON profiles;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON profiles;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON profiles;

-- 3. Créer une politique qui permet TOUT pour les utilisateurs authentifiés
CREATE POLICY "Enable all access for authenticated users" ON profiles
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- 4. Alternative: Créer une politique qui permet la lecture pour TOUS
CREATE POLICY "Enable read access for everyone" ON profiles
    FOR SELECT
    USING (true);

-- 5. Vérifier que ça fonctionne
SELECT COUNT(*) as total_profiles FROM profiles;
SELECT first_name, last_name, email, role_radio FROM profiles LIMIT 5;

-- 6. Afficher les politiques créées
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'profiles';
