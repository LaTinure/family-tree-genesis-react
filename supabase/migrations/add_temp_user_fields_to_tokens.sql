-- Ajouter les colonnes pour les utilisateurs temporaires
ALTER TABLE dynasty_creation_tokens
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS is_temp_user BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_used BOOLEAN DEFAULT FALSE;

-- Créer des index pour les nouvelles colonnes
CREATE INDEX IF NOT EXISTS idx_dynasty_creation_tokens_email ON dynasty_creation_tokens(email);
CREATE INDEX IF NOT EXISTS idx_dynasty_creation_tokens_is_temp_user ON dynasty_creation_tokens(is_temp_user);
CREATE INDEX IF NOT EXISTS idx_dynasty_creation_tokens_is_used ON dynasty_creation_tokens(is_used);

-- Mettre à jour les politiques RLS pour permettre l'insertion avec les nouvelles colonnes
DROP POLICY IF EXISTS "Service can insert tokens" ON dynasty_creation_tokens;
CREATE POLICY "Service can insert tokens" ON dynasty_creation_tokens
    FOR INSERT WITH CHECK (true);

-- Politique pour permettre la lecture des tokens temporaires
DROP POLICY IF EXISTS "Service can read temp tokens" ON dynasty_creation_tokens;
CREATE POLICY "Service can read temp tokens" ON dynasty_creation_tokens
    FOR SELECT USING (true);
