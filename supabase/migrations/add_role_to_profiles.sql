-- Migration pour mettre à jour le champ role dans la table profiles
-- Date: 2024-01-XX

-- Vérifier si la colonne role existe déjà
DO $$
BEGIN
    -- Si la colonne n'existe pas, la créer
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'profiles' AND column_name = 'role'
    ) THEN
        ALTER TABLE profiles ADD COLUMN role VARCHAR(50) DEFAULT 'Membre';
    END IF;
END $$;

-- Supprimer les contraintes existantes si elles existent
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Ajouter la nouvelle contrainte avec les valeurs Membre et Administrateur
ALTER TABLE profiles
ADD CONSTRAINT profiles_role_check CHECK (role IN ('Membre', 'Administrateur'));

-- Mettre à jour les enregistrements existants
-- Si is_patriarch est true, alors role = 'Patriarche', sinon 'Membre'
UPDATE profiles
SET role = CASE
    WHEN is_patriarch = true THEN 'Patriarche'
    WHEN role IS NULL OR role = '' THEN 'Membre'
    ELSE role
END
WHERE role IS NULL OR role = '';

-- Créer un index sur la colonne role pour améliorer les performances (s'il n'existe pas déjà)
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Ajouter un commentaire sur la colonne
COMMENT ON COLUMN profiles.role IS 'Rôle du membre dans la famille: Membre ou Administrateur';
