--***REMOVED***Créer***REMOVED***la***REMOVED***table***REMOVED***pour***REMOVED***les***REMOVED***tokens***REMOVED***de***REMOVED***création***REMOVED***de***REMOVED***dynastie
CREATE***REMOVED***TABLE***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***dynasty_creation_tokens***REMOVED***(
***REMOVED******REMOVED***id***REMOVED***UUID***REMOVED***DEFAULT***REMOVED***gen_random_uuid()***REMOVED***PRIMARY***REMOVED***KEY,
***REMOVED******REMOVED***token***REMOVED***TEXT***REMOVED***UNIQUE***REMOVED***NOT***REMOVED***NULL,
***REMOVED******REMOVED***user_id***REMOVED***UUID***REMOVED***REFERENCES***REMOVED***auth.users(id)***REMOVED***ON***REMOVED***DELETE***REMOVED***CASCADE,
***REMOVED******REMOVED***stripe_session_id***REMOVED***TEXT,
***REMOVED******REMOVED***amount***REMOVED***INTEGER,***REMOVED***--***REMOVED***Montant***REMOVED***en***REMOVED***centimes
***REMOVED******REMOVED***status***REMOVED***TEXT***REMOVED***DEFAULT***REMOVED***'pending'***REMOVED***CHECK***REMOVED***(status***REMOVED***IN***REMOVED***('pending',***REMOVED***'paid',***REMOVED***'used',***REMOVED***'expired')),
***REMOVED******REMOVED***expires_at***REMOVED***TIMESTAMP***REMOVED***WITH***REMOVED***TIME***REMOVED***ZONE,
***REMOVED******REMOVED***created_at***REMOVED***TIMESTAMP***REMOVED***WITH***REMOVED***TIME***REMOVED***ZONE***REMOVED***DEFAULT***REMOVED***NOW(),
***REMOVED******REMOVED***used_at***REMOVED***TIMESTAMP***REMOVED***WITH***REMOVED***TIME***REMOVED***ZONE
);

--***REMOVED***Index***REMOVED***pour***REMOVED***améliorer***REMOVED***les***REMOVED***performances
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_dynasty_creation_tokens_user_id***REMOVED***ON***REMOVED***dynasty_creation_tokens(user_id);
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_dynasty_creation_tokens_token***REMOVED***ON***REMOVED***dynasty_creation_tokens(token);
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_dynasty_creation_tokens_status***REMOVED***ON***REMOVED***dynasty_creation_tokens(status);

--***REMOVED***RLS***REMOVED***(Row***REMOVED***Level***REMOVED***Security)
ALTER***REMOVED***TABLE***REMOVED***dynasty_creation_tokens***REMOVED***ENABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;

--***REMOVED***Politique***REMOVED***pour***REMOVED***permettre***REMOVED***aux***REMOVED***utilisateurs***REMOVED***de***REMOVED***voir***REMOVED***leurs***REMOVED***propres***REMOVED***tokens
CREATE***REMOVED***POLICY***REMOVED***"Users***REMOVED***can***REMOVED***view***REMOVED***their***REMOVED***own***REMOVED***tokens"***REMOVED***ON***REMOVED***dynasty_creation_tokens
***REMOVED******REMOVED***FOR***REMOVED***SELECT***REMOVED***USING***REMOVED***(auth.uid()***REMOVED***=***REMOVED***user_id);

--***REMOVED***Politique***REMOVED***pour***REMOVED***permettre***REMOVED***l'insertion***REMOVED***par***REMOVED***le***REMOVED***service***REMOVED***(webhook)
CREATE***REMOVED***POLICY***REMOVED***"Service***REMOVED***can***REMOVED***insert***REMOVED***tokens"***REMOVED***ON***REMOVED***dynasty_creation_tokens
***REMOVED******REMOVED***FOR***REMOVED***INSERT***REMOVED***WITH***REMOVED***CHECK***REMOVED***(true);

--***REMOVED***Politique***REMOVED***pour***REMOVED***permettre***REMOVED***la***REMOVED***mise***REMOVED***à***REMOVED***jour***REMOVED***par***REMOVED***le***REMOVED***service
CREATE***REMOVED***POLICY***REMOVED***"Service***REMOVED***can***REMOVED***update***REMOVED***tokens"***REMOVED***ON***REMOVED***dynasty_creation_tokens
***REMOVED******REMOVED***FOR***REMOVED***UPDATE***REMOVED***USING***REMOVED***(true);

--***REMOVED***Fonction***REMOVED***pour***REMOVED***nettoyer***REMOVED***les***REMOVED***tokens***REMOVED***expirés
CREATE***REMOVED***OR***REMOVED***REPLACE***REMOVED***FUNCTION***REMOVED***cleanup_expired_tokens()
RETURNS***REMOVED***void***REMOVED***AS***REMOVED***$$
BEGIN
***REMOVED******REMOVED***UPDATE***REMOVED***dynasty_creation_tokens
***REMOVED******REMOVED***SET***REMOVED***status***REMOVED***=***REMOVED***'expired'
***REMOVED******REMOVED***WHERE***REMOVED***expires_at***REMOVED***<***REMOVED***NOW()***REMOVED***AND***REMOVED***status***REMOVED***=***REMOVED***'pending';
END;
$$***REMOVED***LANGUAGE***REMOVED***plpgsql;

--***REMOVED***Déclencher***REMOVED***le***REMOVED***nettoyage***REMOVED***automatique***REMOVED***(optionnel)
--***REMOVED***SELECT***REMOVED***cron.schedule('cleanup-expired-tokens',***REMOVED***'0***REMOVED***2***REMOVED*******REMOVED*******REMOVED****',***REMOVED***'SELECT***REMOVED***cleanup_expired_tokens();');
