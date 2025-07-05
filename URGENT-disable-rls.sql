-- URGENT: Désactiver complètement RLS pour permettre l'accès
-- Copier et coller IMMÉDIATEMENT dans l'éditeur SQL de Supabase

-- 1. Désactiver RLS complètement (solution d'urgence)
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- 2. Vérifier que ça fonctionne
SELECT COUNT(*) as total_profiles FROM profiles;
SELECT first_name, last_name, email, role_radio FROM profiles LIMIT 5;

-- 3. Si vous voulez réactiver RLS plus tard avec des politiques permissives:
-- ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow all" ON profiles FOR ALL USING (true) WITH CHECK (true);
