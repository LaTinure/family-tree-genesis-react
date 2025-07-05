-- Migration pour ajouter la colonne dynasty_id à la table profiles
-- Date: 2024-01-XX

-- Vérifier si la colonne dynasty_id existe déjà
DO $$
BEGIN
    -- Si la colonne n'existe pas, la créer
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'profiles' AND column_name = 'dynasty_id'
    ) THEN
        ALTER TABLE profiles ADD COLUMN dynasty_id UUID;
    END IF;
END $$;

-- Créer un index sur la colonne dynasty_id pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_profiles_dynasty_id ON profiles(dynasty_id);

-- Ajouter une contrainte de clé étrangère vers la table dynasties (si elle existe)
DO $$
BEGIN
    -- Vérifier si la table dynasties existe
    IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_name = 'dynasties'
    ) THEN
        -- Ajouter la contrainte de clé étrangère si elle n'existe pas déjà
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints
            WHERE constraint_name = 'profiles_dynasty_id_fkey'
        ) THEN
            ALTER TABLE profiles
            ADD CONSTRAINT profiles_dynasty_id_fkey
            FOREIGN KEY (dynasty_id) REFERENCES dynasties(id)
            ON DELETE SET NULL;
        END IF;
    END IF;
END $$;

-- Ajouter un commentaire sur la colonne
COMMENT ON COLUMN profiles.dynasty_id IS 'ID de la dynastie à laquelle appartient ce profil';
