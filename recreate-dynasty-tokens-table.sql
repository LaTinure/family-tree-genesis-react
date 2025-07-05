--***REMOVED***Recreate***REMOVED***dynasty_creation_tokens***REMOVED***table***REMOVED***with***REMOVED***correct***REMOVED***structure
--***REMOVED***Run***REMOVED***this***REMOVED***in***REMOVED***Supabase***REMOVED***SQL***REMOVED***Editor

--***REMOVED***1.***REMOVED***Drop***REMOVED***the***REMOVED***existing***REMOVED***table***REMOVED***(if***REMOVED***it***REMOVED***exists)
DROP***REMOVED***TABLE***REMOVED***IF***REMOVED***EXISTS***REMOVED***dynasty_creation_tokens***REMOVED***CASCADE;

--***REMOVED***2.***REMOVED***Create***REMOVED***the***REMOVED***table***REMOVED***with***REMOVED***correct***REMOVED***structure
CREATE***REMOVED***TABLE***REMOVED***dynasty_creation_tokens***REMOVED***(
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

--***REMOVED***3.***REMOVED***Create***REMOVED***indexes
CREATE***REMOVED***INDEX***REMOVED***idx_dynasty_creation_tokens_user_id***REMOVED***ON***REMOVED***dynasty_creation_tokens(user_id);
CREATE***REMOVED***INDEX***REMOVED***idx_dynasty_creation_tokens_token***REMOVED***ON***REMOVED***dynasty_creation_tokens(token);
CREATE***REMOVED***INDEX***REMOVED***idx_dynasty_creation_tokens_stripe_session_id***REMOVED***ON***REMOVED***dynasty_creation_tokens(stripe_session_id);
CREATE***REMOVED***INDEX***REMOVED***idx_dynasty_creation_tokens_status***REMOVED***ON***REMOVED***dynasty_creation_tokens(status);

--***REMOVED***4.***REMOVED***Disable***REMOVED***RLS***REMOVED***(for***REMOVED***now)
ALTER***REMOVED***TABLE***REMOVED***dynasty_creation_tokens***REMOVED***DISABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;

--***REMOVED***5.***REMOVED***Verify***REMOVED***the***REMOVED***table***REMOVED***structure
SELECT
***REMOVED******REMOVED***column_name,
***REMOVED******REMOVED***data_type,
***REMOVED******REMOVED***is_nullable,
***REMOVED******REMOVED***column_default
FROM***REMOVED***information_schema.columns
WHERE***REMOVED***table_name***REMOVED***=***REMOVED***'dynasty_creation_tokens'
AND***REMOVED***table_schema***REMOVED***=***REMOVED***'public'
ORDER***REMOVED***BY***REMOVED***ordinal_position;

--***REMOVED***6.***REMOVED***Create***REMOVED***a***REMOVED***test***REMOVED***token
INSERT***REMOVED***INTO***REMOVED***dynasty_creation_tokens***REMOVED***(
***REMOVED******REMOVED***token,
***REMOVED******REMOVED***user_id,
***REMOVED******REMOVED***stripe_session_id,
***REMOVED******REMOVED***status,
***REMOVED******REMOVED***expires_at
)***REMOVED***VALUES***REMOVED***(
***REMOVED******REMOVED***'TEST-12345',
***REMOVED******REMOVED***(SELECT***REMOVED***id***REMOVED***FROM***REMOVED***auth.users***REMOVED***ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC***REMOVED***LIMIT***REMOVED***1),
***REMOVED******REMOVED***'cs_test_session_12345',
***REMOVED******REMOVED***'paid',
***REMOVED******REMOVED***NOW()***REMOVED***+***REMOVED***INTERVAL***REMOVED***'24***REMOVED***hours'
);

--***REMOVED***7.***REMOVED***Verify***REMOVED***the***REMOVED***test***REMOVED***token***REMOVED***was***REMOVED***created
SELECT
***REMOVED******REMOVED***token,
***REMOVED******REMOVED***user_id,
***REMOVED******REMOVED***stripe_session_id,
***REMOVED******REMOVED***status,
***REMOVED******REMOVED***created_at,
***REMOVED******REMOVED***expires_at
FROM***REMOVED***dynasty_creation_tokens
ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC;

--***REMOVED***8.***REMOVED***Show***REMOVED***table***REMOVED***count
SELECT***REMOVED***COUNT(*)***REMOVED***as***REMOVED***total_tokens***REMOVED***FROM***REMOVED***dynasty_creation_tokens;
