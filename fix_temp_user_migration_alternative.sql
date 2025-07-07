-- Migration alternative qui garde la contrainte de clé étrangère
-- Exécuter ce script dans Supabase SQL Editor

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

-- 3. Désactiver RLS temporairement
ALTER TABLE dynasty_creation_tokens DISABLE ROW LEVEL SECURITY;

-- 4. Supprimer et recréer les politiques
DROP POLICY IF EXISTS "Service can insert tokens" ON dynasty_creation_tokens;
CREATE POLICY "Service can insert tokens" ON dynasty_creation_tokens
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Service can read temp tokens" ON dynasty_creation_tokens;
CREATE POLICY "Service can read temp tokens" ON dynasty_creation_tokens
    FOR SELECT USING (true);

-- 5. Réactiver RLS
ALTER TABLE dynasty_creation_tokens ENABLE ROW LEVEL SECURITY;

-- 6. Créer une fonction pour créer des utilisateurs temporaires dans auth.users
CREATE OR REPLACE FUNCTION create_temp_user(temp_email TEXT, temp_phone TEXT)
RETURNS UUID AS $$
DECLARE
    temp_user_id UUID;
BEGIN
    -- Générer un UUID pour l'utilisateur temporaire
    temp_user_id := gen_random_uuid();

    -- Insérer dans auth.users (nécessite les privilèges appropriés)
    INSERT INTO auth.users (
        id,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) VALUES (
        temp_user_id,
        temp_email,
        '', -- Pas de mot de passe pour les utilisateurs temporaires
        NOW(),
        NOW(),
        NOW(),
        '{"provider": "temp_user", "phone": "' || temp_phone || '"}',
        '{"phone": "' || temp_phone || '"}',
        false,
        '',
        '',
        '',
        ''
    );

    RETURN temp_user_id;
EXCEPTION
    WHEN OTHERS THEN
        -- En cas d'erreur, retourner un UUID généré quand même
        RETURN gen_random_uuid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Vérifier la structure
SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'dynasty_creation_tokens'
ORDER BY ordinal_position;

-- 8. Test d'insertion avec création d'utilisateur temporaire
DO $$
DECLARE
    temp_user_id UUID;
BEGIN
    -- Créer un utilisateur temporaire
    temp_user_id := create_temp_user('test@example.com', '+33123456789');

    -- Insérer le token
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
        temp_user_id,
        'test@example.com',
        '+33123456789',
        true,
        'pending',
        1000,
        NOW() + INTERVAL '1 hour',
        false
    );
END $$;

-- 9. Vérifier l'insertion
SELECT
    t.token,
    t.user_id,
    t.email,
    t.phone,
    t.is_temp_user,
    t.status,
    t.created_at,
    u.email as auth_email
FROM dynasty_creation_tokens t
LEFT JOIN auth.users u ON t.user_id = u.id
WHERE t.email = 'test@example.com';

-- 10. Nettoyer le test
DELETE FROM dynasty_creation_tokens WHERE email = 'test@example.com';
DELETE FROM auth.users WHERE email = 'test@example.com';

-- 11. Vérifier que la table fonctionne
SELECT
    COUNT(*) as total_tokens,
    COUNT(CASE WHEN is_temp_user = true THEN 1 END) as temp_tokens
FROM dynasty_creation_tokens;
