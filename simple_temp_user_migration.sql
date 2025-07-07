-- Migration simplifiée pour les utilisateurs temporaires
-- Exécuter ce script dans Supabase SQL Editor

-- 1. Supprimer la contrainte de clé étrangère pour user_id
ALTER TABLE dynasty_creation_tokens
DROP CONSTRAINT IF EXISTS dynasty_creation_tokens_user_id_fkey;

-- 2. Ajouter les nouvelles colonnes
ALTER TABLE dynasty_creation_tokens
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS is_temp_user BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_used BOOLEAN DEFAULT FALSE;

-- 3. Créer les index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_dynasty_creation_tokens_email ON dynasty_creation_tokens(email);
CREATE INDEX IF NOT EXISTS idx_dynasty_creation_tokens_is_temp_user ON dynasty_creation_tokens(is_temp_user);
CREATE INDEX IF NOT EXISTS idx_dynasty_creation_tokens_is_used ON dynasty_creation_tokens(is_used);

-- 4. Désactiver RLS temporairement
ALTER TABLE dynasty_creation_tokens DISABLE ROW LEVEL SECURITY;

-- 5. Supprimer et recréer les politiques
DROP POLICY IF EXISTS "Service can insert tokens" ON dynasty_creation_tokens;
CREATE POLICY "Service can insert tokens" ON dynasty_creation_tokens
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Service can read temp tokens" ON dynasty_creation_tokens;
CREATE POLICY "Service can read temp tokens" ON dynasty_creation_tokens
    FOR SELECT USING (true);

-- 6. Réactiver RLS
ALTER TABLE dynasty_creation_tokens ENABLE ROW LEVEL SECURITY;

-- 7. Vérifier la structure
SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'dynasty_creation_tokens'
ORDER BY ordinal_position;

-- 8. Test d'insertion simple
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
    'test-temp-' || gen_random_uuid(),
    gen_random_uuid(),
    'test@example.com',
    '+33123456789',
    true,
    'pending',
    1000,
    NOW() + INTERVAL '1 hour',
    false
);

-- 9. Vérifier l'insertion
SELECT
    token,
    user_id,
    email,
    phone,
    is_temp_user,
    status,
    created_at
FROM dynasty_creation_tokens
WHERE email = 'test@example.com';

-- 10. Nettoyer le test
DELETE FROM dynasty_creation_tokens WHERE email = 'test@example.com';

-- 11. Vérifier que la table fonctionne
SELECT
    COUNT(*) as total_tokens,
    COUNT(CASE WHEN is_temp_user = true THEN 1 END) as temp_tokens
FROM dynasty_creation_tokens;
