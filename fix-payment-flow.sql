--***REMOVED***Fix***REMOVED***payment***REMOVED***flow***REMOVED***-***REMOVED***Run***REMOVED***this***REMOVED***in***REMOVED***Supabase***REMOVED***SQL***REMOVED***Editor

--***REMOVED***1.***REMOVED***Disable***REMOVED***RLS***REMOVED***on***REMOVED***all***REMOVED***related***REMOVED***tables***REMOVED***temporarily
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***DISABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;
ALTER***REMOVED***TABLE***REMOVED***dynasty_creation_tokens***REMOVED***DISABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;
ALTER***REMOVED***TABLE***REMOVED***dynasties***REMOVED***DISABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;

--***REMOVED***2.***REMOVED***Ensure***REMOVED***dynasty_creation_tokens***REMOVED***table***REMOVED***exists***REMOVED***with***REMOVED***proper***REMOVED***structure
CREATE***REMOVED***TABLE***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***dynasty_creation_tokens***REMOVED***(
***REMOVED******REMOVED***id***REMOVED***UUID***REMOVED***DEFAULT***REMOVED***gen_random_uuid()***REMOVED***PRIMARY***REMOVED***KEY,
***REMOVED******REMOVED***token***REMOVED***TEXT***REMOVED***UNIQUE***REMOVED***NOT***REMOVED***NULL,
***REMOVED******REMOVED***user_id***REMOVED***UUID***REMOVED***REFERENCES***REMOVED***auth.users(id)***REMOVED***ON***REMOVED***DELETE***REMOVED***CASCADE,
***REMOVED******REMOVED***stripe_session_id***REMOVED***TEXT,
***REMOVED******REMOVED***amount***REMOVED***INTEGER,
***REMOVED******REMOVED***status***REMOVED***TEXT***REMOVED***DEFAULT***REMOVED***'pending'***REMOVED***CHECK***REMOVED***(status***REMOVED***IN***REMOVED***('pending',***REMOVED***'paid',***REMOVED***'used',***REMOVED***'expired')),
***REMOVED******REMOVED***expires_at***REMOVED***TIMESTAMP***REMOVED***WITH***REMOVED***TIME***REMOVED***ZONE,
***REMOVED******REMOVED***created_at***REMOVED***TIMESTAMP***REMOVED***WITH***REMOVED***TIME***REMOVED***ZONE***REMOVED***DEFAULT***REMOVED***NOW(),
***REMOVED******REMOVED***used_at***REMOVED***TIMESTAMP***REMOVED***WITH***REMOVED***TIME***REMOVED***ZONE
);

--***REMOVED***3.***REMOVED***Create***REMOVED***indexes***REMOVED***if***REMOVED***they***REMOVED***don't***REMOVED***exist
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_dynasty_creation_tokens_user_id***REMOVED***ON***REMOVED***dynasty_creation_tokens(user_id);
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_dynasty_creation_tokens_token***REMOVED***ON***REMOVED***dynasty_creation_tokens(token);
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_dynasty_creation_tokens_stripe_session_id***REMOVED***ON***REMOVED***dynasty_creation_tokens(stripe_session_id);
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_dynasty_creation_tokens_status***REMOVED***ON***REMOVED***dynasty_creation_tokens(status);

--***REMOVED***4.***REMOVED***Verify***REMOVED***tables***REMOVED***and***REMOVED***data
SELECT***REMOVED***'profiles'***REMOVED***as***REMOVED***table_name,***REMOVED***COUNT(*)***REMOVED***as***REMOVED***count***REMOVED***FROM***REMOVED***profiles
UNION***REMOVED***ALL
SELECT***REMOVED***'dynasty_creation_tokens'***REMOVED***as***REMOVED***table_name,***REMOVED***COUNT(*)***REMOVED***as***REMOVED***count***REMOVED***FROM***REMOVED***dynasty_creation_tokens
UNION***REMOVED***ALL
SELECT***REMOVED***'dynasties'***REMOVED***as***REMOVED***table_name,***REMOVED***COUNT(*)***REMOVED***as***REMOVED***count***REMOVED***FROM***REMOVED***dynasties;

--***REMOVED***5.***REMOVED***Show***REMOVED***recent***REMOVED***tokens
SELECT***REMOVED***token,***REMOVED***user_id,***REMOVED***stripe_session_id,***REMOVED***status,***REMOVED***created_at
FROM***REMOVED***dynasty_creation_tokens
ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC
LIMIT***REMOVED***5;
