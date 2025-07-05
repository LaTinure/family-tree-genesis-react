-- Fonction pour récupérer les données d'une invitation
CREATE OR REPLACE FUNCTION get_invitation_data(invite_token TEXT)
RETURNS TABLE (
  id UUID,
  token TEXT,
  dynasty_id UUID,
  dynasty_name TEXT,
  user_role TEXT,
  expires_at TIMESTAMPTZ,
  used BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    i.id,
    i.token,
    i.dynasty_id,
    d.name as dynasty_name,
    i.user_role,
    i.expires_at,
    i.used
  FROM invites i
  LEFT JOIN dynasties d ON i.dynasty_id = d.id
  WHERE i.token = invite_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour marquer une invitation comme utilisée
CREATE OR REPLACE FUNCTION mark_invitation_used(invite_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE invites
  SET used = true, updated_at = NOW()
  WHERE id = invite_id;

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour créer une nouvelle invitation
CREATE OR REPLACE FUNCTION create_invitation(
  p_dynasty_id UUID,
  p_user_role TEXT,
  p_expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days')
)
RETURNS TABLE (
  id UUID,
  token TEXT
) AS $$
DECLARE
  new_token TEXT;
  new_id UUID;
BEGIN
  -- Générer un token unique
  new_token := encode(gen_random_bytes(32), 'hex');

  -- Insérer l'invitation
  INSERT INTO invites (dynasty_id, user_role, token, expires_at)
  VALUES (p_dynasty_id, p_user_role, new_token, p_expires_at)
  RETURNING id, token INTO new_id, new_token;

  RETURN QUERY SELECT new_id, new_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
