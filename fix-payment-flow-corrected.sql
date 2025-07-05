--***REMOVED***Fix***REMOVED***payment***REMOVED***flow***REMOVED***-***REMOVED***CORRECTED***REMOVED***VERSION
--***REMOVED***Run***REMOVED***this***REMOVED***in***REMOVED***Supabase***REMOVED***SQL***REMOVED***Editor

--***REMOVED***1.***REMOVED***Disable***REMOVED***RLS***REMOVED***on***REMOVED***existing***REMOVED***tables***REMOVED***(only***REMOVED***if***REMOVED***they***REMOVED***exist)
DO***REMOVED***$$
BEGIN
***REMOVED******REMOVED******REMOVED******REMOVED***--***REMOVED***Disable***REMOVED***RLS***REMOVED***on***REMOVED***profiles***REMOVED***if***REMOVED***it***REMOVED***exists
***REMOVED******REMOVED******REMOVED******REMOVED***IF***REMOVED***EXISTS***REMOVED***(SELECT***REMOVED***1***REMOVED***FROM***REMOVED***information_schema.tables***REMOVED***WHERE***REMOVED***table_name***REMOVED***=***REMOVED***'profiles')***REMOVED***THEN
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***DISABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***RAISE***REMOVED***NOTICE***REMOVED***'RLS***REMOVED***disabled***REMOVED***on***REMOVED***profiles***REMOVED***table';
***REMOVED******REMOVED******REMOVED******REMOVED***END***REMOVED***IF;

***REMOVED******REMOVED******REMOVED******REMOVED***--***REMOVED***Disable***REMOVED***RLS***REMOVED***on***REMOVED***dynasty_creation_tokens***REMOVED***if***REMOVED***it***REMOVED***exists
***REMOVED******REMOVED******REMOVED******REMOVED***IF***REMOVED***EXISTS***REMOVED***(SELECT***REMOVED***1***REMOVED***FROM***REMOVED***information_schema.tables***REMOVED***WHERE***REMOVED***table_name***REMOVED***=***REMOVED***'dynasty_creation_tokens')***REMOVED***THEN
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ALTER***REMOVED***TABLE***REMOVED***dynasty_creation_tokens***REMOVED***DISABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***RAISE***REMOVED***NOTICE***REMOVED***'RLS***REMOVED***disabled***REMOVED***on***REMOVED***dynasty_creation_tokens***REMOVED***table';
***REMOVED******REMOVED******REMOVED******REMOVED***END***REMOVED***IF;

***REMOVED******REMOVED******REMOVED******REMOVED***--***REMOVED***Disable***REMOVED***RLS***REMOVED***on***REMOVED***dynasties***REMOVED***if***REMOVED***it***REMOVED***exists
***REMOVED******REMOVED******REMOVED******REMOVED***IF***REMOVED***EXISTS***REMOVED***(SELECT***REMOVED***1***REMOVED***FROM***REMOVED***information_schema.tables***REMOVED***WHERE***REMOVED***table_name***REMOVED***=***REMOVED***'dynasties')***REMOVED***THEN
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ALTER***REMOVED***TABLE***REMOVED***dynasties***REMOVED***DISABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***RAISE***REMOVED***NOTICE***REMOVED***'RLS***REMOVED***disabled***REMOVED***on***REMOVED***dynasties***REMOVED***table';
***REMOVED******REMOVED******REMOVED******REMOVED***END***REMOVED***IF;
END***REMOVED***$$;

--***REMOVED***2.***REMOVED***Create***REMOVED***dynasty_creation_tokens***REMOVED***table***REMOVED***if***REMOVED***it***REMOVED***doesn't***REMOVED***exist
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

--***REMOVED***4.***REMOVED***Create***REMOVED***dynasties***REMOVED***table***REMOVED***if***REMOVED***it***REMOVED***doesn't***REMOVED***exist
CREATE***REMOVED***TABLE***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***dynasties***REMOVED***(
***REMOVED******REMOVED***id***REMOVED***UUID***REMOVED***DEFAULT***REMOVED***gen_random_uuid()***REMOVED***PRIMARY***REMOVED***KEY,
***REMOVED******REMOVED***name***REMOVED***TEXT***REMOVED***NOT***REMOVED***NULL,
***REMOVED******REMOVED***description***REMOVED***TEXT,
***REMOVED******REMOVED***owner_id***REMOVED***UUID***REMOVED***REFERENCES***REMOVED***auth.users(id)***REMOVED***ON***REMOVED***DELETE***REMOVED***CASCADE,
***REMOVED******REMOVED***created_at***REMOVED***TIMESTAMP***REMOVED***WITH***REMOVED***TIME***REMOVED***ZONE***REMOVED***DEFAULT***REMOVED***NOW(),
***REMOVED******REMOVED***updated_at***REMOVED***TIMESTAMP***REMOVED***WITH***REMOVED***TIME***REMOVED***ZONE***REMOVED***DEFAULT***REMOVED***NOW()
);

--***REMOVED***5.***REMOVED***Verify***REMOVED***tables***REMOVED***and***REMOVED***data
SELECT***REMOVED***'profiles'***REMOVED***as***REMOVED***table_name,***REMOVED***COUNT(*)***REMOVED***as***REMOVED***count***REMOVED***FROM***REMOVED***profiles
UNION***REMOVED***ALL
SELECT***REMOVED***'dynasty_creation_tokens'***REMOVED***as***REMOVED***table_name,***REMOVED***COUNT(*)***REMOVED***as***REMOVED***count***REMOVED***FROM***REMOVED***dynasty_creation_tokens
UNION***REMOVED***ALL
SELECT***REMOVED***'dynasties'***REMOVED***as***REMOVED***table_name,***REMOVED***COUNT(*)***REMOVED***as***REMOVED***count***REMOVED***FROM***REMOVED***dynasties;

--***REMOVED***6.***REMOVED***Show***REMOVED***recent***REMOVED***tokens***REMOVED***(if***REMOVED***any***REMOVED***exist)
SELECT***REMOVED***token,***REMOVED***user_id,***REMOVED***stripe_session_id,***REMOVED***status,***REMOVED***created_at
FROM***REMOVED***dynasty_creation_tokens
ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC
LIMIT***REMOVED***5;

--***REMOVED***7.***REMOVED***Show***REMOVED***table***REMOVED***structure***REMOVED***summary
SELECT
***REMOVED******REMOVED***table_name,
***REMOVED******REMOVED***COUNT(*)***REMOVED***as***REMOVED***column_count
FROM***REMOVED***information_schema.columns
WHERE***REMOVED***table_schema***REMOVED***=***REMOVED***'public'
AND***REMOVED***table_name***REMOVED***IN***REMOVED***('profiles',***REMOVED***'dynasty_creation_tokens',***REMOVED***'dynasties')
GROUP***REMOVED***BY***REMOVED***table_name
ORDER***REMOVED***BY***REMOVED***table_name;
