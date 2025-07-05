-- Migration pour corriger les permissions des profils
-- Date: 2024-01-XX

-- Activer RLS sur la table profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Supprimer les politiques existantes qui pourraient bloquer l'accès
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON profiles;

-- Créer une politique pour permettre la lecture de tous les profils
-- Cette politique permet à tous les utilisateurs authentifiés de voir tous les profils
CREATE POLICY "Profiles are viewable by everyone" ON profiles
    FOR SELECT
    USING (true);

-- Créer une politique pour permettre l'insertion de nouveaux profils
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Créer une politique pour permettre la mise à jour de son propre profil
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Créer une politique pour permettre la suppression de son propre profil (optionnel)
CREATE POLICY "Users can delete own profile" ON profiles
    FOR DELETE
    USING (auth.uid() = user_id);

-- Vérifier que les politiques sont créées
DO $$
BEGIN
    RAISE NOTICE 'Politiques RLS créées pour la table profiles';
    RAISE NOTICE 'Tous les utilisateurs authentifiés peuvent maintenant voir les profils';
END $$;
