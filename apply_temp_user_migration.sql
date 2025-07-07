-- Migration pour ajouter les colonnes des utilisateurs temporaires
-- à la table dynasty_creation_tokens

-- 1. Ajouter les nouvelles colonnes
ALTER TABLE dynasty_creation_tokens
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS is_temp_user BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_used BOOLEAN DEFAULT FALSE;

-- 2. Créer les index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_dynasty_creation_tokens_email ON dynasty_creation_tokens(email);
CREATE INDEX IF NOT EXISTS idx_dynasty_creation_tokens_is_temp_user ON dynasty_creation_tokens(is_temp_user);
CREATE INDEX IF NOT EXISTS idx_dynasty_creation_tokens_is_used ON dynasty_creation_tokens(is_used);

-- 3. Désactiver RLS temporairement pour permettre les modifications
ALTER TABLE dynasty_creation_tokens DISABLE ROW LEVEL SECURITY;

-- 4. Mettre à jour les politiques RLS
DROP POLICY IF EXISTS "Service can insert tokens" ON dynasty_creation_tokens;
CREATE POLICY "Service can insert tokens" ON dynasty_creation_tokens
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Service can read temp tokens" ON dynasty_creation_tokens;
CREATE POLICY "Service can read temp tokens" ON dynasty_creation_tokens
    FOR SELECT USING (true);

-- 5. Réactiver RLS
ALTER TABLE dynasty_creation_tokens ENABLE ROW LEVEL SECURITY;

-- 6. Vérifier la structure de la table
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'dynasty_creation_tokens'
ORDER BY ordinal_position;

-- 7. Vérifier les index
SELECT
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'dynasty_creation_tokens';

-- 8. Test d'insertion d'un token temporaire
INSERT INTO dynasty_creation_tokens (
    token,
    user_id,
    email,
    phone,
    is_temp_user,
    status,
    amount,
    expires_at,
    is_used
) VALUES (
    'test-temp-token-' || gen_random_uuid(),
    gen_random_uuid(),
    'test@example.com',
    '+33123456789',
    true,
    'pending',
    1000,
    NOW() + INTERVAL '1 hour',
    false
) ON CONFLICT DO NOTHING;

-- 9. Vérifier l'insertion
SELECT
    token,
    email,
    phone,
    is_temp_user,
    status,
    created_at
FROM dynasty_creation_tokens
WHERE is_temp_user = true
ORDER BY created_at DESC
LIMIT 5;

-- 10. Nettoyer le token de test
DELETE FROM dynasty_creation_tokens WHERE email = 'test@example.com';
