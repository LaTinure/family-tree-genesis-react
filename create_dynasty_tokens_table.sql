-- Création de la table pour les tokens de création de dynastie
-- Cette table gère le workflow de paiement Stripe

CREATE TABLE IF NOT EXISTS dynasty_creation_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token UUID NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT,
  phone TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'expired', 'cancelled')),
  amount INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  paid_at TIMESTAMP WITH TIME ZONE,
  used_at TIMESTAMP WITH TIME ZONE,
  is_used BOOLEAN DEFAULT FALSE,
  is_temp_user BOOLEAN DEFAULT FALSE,
  stripe_session_id TEXT,
  dynasty_id UUID REFERENCES dynasties(id) ON DELETE SET NULL,
  log JSONB DEFAULT '[]'::jsonb
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_dynasty_tokens_token ON dynasty_creation_tokens(token);
CREATE INDEX IF NOT EXISTS idx_dynasty_tokens_user_id ON dynasty_creation_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_dynasty_tokens_status ON dynasty_creation_tokens(status);
CREATE INDEX IF NOT EXISTS idx_dynasty_tokens_expires_at ON dynasty_creation_tokens(expires_at);
CREATE INDEX IF NOT EXISTS idx_dynasty_tokens_stripe_session ON dynasty_creation_tokens(stripe_session_id);

-- RLS (Row Level Security) - Sécurité au niveau des lignes
ALTER TABLE dynasty_creation_tokens ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture des tokens par l'utilisateur propriétaire
CREATE POLICY "Users can view their own tokens" ON dynasty_creation_tokens
  FOR SELECT USING (
    auth.uid() = user_id OR
    (is_temp_user = true AND email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  );

-- Politique pour permettre l'insertion de tokens
CREATE POLICY "Users can create tokens" ON dynasty_creation_tokens
  FOR INSERT WITH CHECK (
    auth.uid() = user_id OR
    (is_temp_user = true AND email IS NOT NULL AND phone IS NOT NULL)
  );

-- Politique pour permettre la mise à jour des tokens (service role uniquement)
CREATE POLICY "Service role can update tokens" ON dynasty_creation_tokens
  FOR UPDATE USING (auth.role() = 'service_role');

-- Fonction pour nettoyer automatiquement les tokens expirés
CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS void AS $$
BEGIN
  UPDATE dynasty_creation_tokens
  SET status = 'expired'
  WHERE status = 'pending'
    AND expires_at < NOW()
    AND is_used = false;
END;
$$ LANGUAGE plpgsql;

-- Déclencheur pour marquer automatiquement les tokens comme expirés
CREATE OR REPLACE FUNCTION check_token_expiration()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.expires_at < NOW() AND NEW.status = 'pending' THEN
    NEW.status := 'expired';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER token_expiration_check
  BEFORE INSERT OR UPDATE ON dynasty_creation_tokens
  FOR EACH ROW
  EXECUTE FUNCTION check_token_expiration();

-- Commentaires pour documenter la table
COMMENT ON TABLE dynasty_creation_tokens IS 'Tokens pour la création de dynasties via paiement Stripe';
COMMENT ON COLUMN dynasty_creation_tokens.token IS 'Token unique pour identifier le paiement';
COMMENT ON COLUMN dynasty_creation_tokens.status IS 'Statut du token: pending, paid, expired, cancelled';
COMMENT ON COLUMN dynasty_creation_tokens.amount IS 'Montant en centimes (ex: 1000 = 10€)';
COMMENT ON COLUMN dynasty_creation_tokens.log IS 'Historique des changements de statut';
COMMENT ON COLUMN dynasty_creation_tokens.is_temp_user IS 'True si l''utilisateur n''est pas encore inscrit';
COMMENT ON COLUMN dynasty_creation_tokens.stripe_session_id IS 'ID de session Stripe pour traçabilité';
