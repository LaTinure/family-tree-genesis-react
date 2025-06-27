-- Script pour corriger les permissions Supabase
-- Copier et coller ce script dans l'éditeur SQL de Supabase

-- Activer RLS sur la table profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Supprimer les politiques existantes
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON profiles;

-- Créer une politique pour permettre la lecture de tous les profils
CREATE POLICY "Profiles are viewable by everyone" ON profiles
    FOR SELECT
    USING (true);

-- Créer une politique pour permettre l'insertion
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Créer une politique pour permettre la mise à jour
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Vérifier les données
SELECT COUNT(*) as total_profiles FROM profiles;
SELECT first_name, last_name, email, role_radio FROM profiles LIMIT 5;
