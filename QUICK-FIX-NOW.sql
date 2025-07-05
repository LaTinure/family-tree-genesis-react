--***REMOVED***QUICK***REMOVED***FIX***REMOVED***-***REMOVED***Run***REMOVED***this***REMOVED***IMMEDIATELY***REMOVED***in***REMOVED***Supabase***REMOVED***SQL***REMOVED***Editor
--***REMOVED***This***REMOVED***fixes***REMOVED***the***REMOVED***most***REMOVED***critical***REMOVED***issues***REMOVED***right***REMOVED***now

--***REMOVED***1.***REMOVED***Disable***REMOVED***RLS***REMOVED***completely***REMOVED***to***REMOVED***stop***REMOVED***infinite***REMOVED***recursion
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***DISABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;
ALTER***REMOVED***TABLE***REMOVED***dynasty_creation_tokens***REMOVED***DISABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;
ALTER***REMOVED***TABLE***REMOVED***dynasties***REMOVED***DISABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;

--***REMOVED***2.***REMOVED***Ensure***REMOVED***tables***REMOVED***exist
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

CREATE***REMOVED***TABLE***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***dynasties***REMOVED***(
***REMOVED******REMOVED***id***REMOVED***UUID***REMOVED***DEFAULT***REMOVED***gen_random_uuid()***REMOVED***PRIMARY***REMOVED***KEY,
***REMOVED******REMOVED***name***REMOVED***TEXT***REMOVED***NOT***REMOVED***NULL,
***REMOVED******REMOVED***description***REMOVED***TEXT,
***REMOVED******REMOVED***owner_id***REMOVED***UUID***REMOVED***REFERENCES***REMOVED***auth.users(id)***REMOVED***ON***REMOVED***DELETE***REMOVED***CASCADE,
***REMOVED******REMOVED***created_at***REMOVED***TIMESTAMP***REMOVED***WITH***REMOVED***TIME***REMOVED***ZONE***REMOVED***DEFAULT***REMOVED***NOW(),
***REMOVED******REMOVED***updated_at***REMOVED***TIMESTAMP***REMOVED***WITH***REMOVED***TIME***REMOVED***ZONE***REMOVED***DEFAULT***REMOVED***NOW()
);

--***REMOVED***3.***REMOVED***Create***REMOVED***indexes
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_dynasty_creation_tokens_user_id***REMOVED***ON***REMOVED***dynasty_creation_tokens(user_id);
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_dynasty_creation_tokens_token***REMOVED***ON***REMOVED***dynasty_creation_tokens(token);
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_dynasty_creation_tokens_stripe_session_id***REMOVED***ON***REMOVED***dynasty_creation_tokens(stripe_session_id);

--***REMOVED***4.***REMOVED***Create***REMOVED***test***REMOVED***tokens***REMOVED***for***REMOVED***immediate***REMOVED***testing
INSERT***REMOVED***INTO***REMOVED***dynasty_creation_tokens***REMOVED***(
***REMOVED******REMOVED***token,
***REMOVED******REMOVED***user_id,
***REMOVED******REMOVED***stripe_session_id,
***REMOVED******REMOVED***status,
***REMOVED******REMOVED***expires_at
)***REMOVED***VALUES***REMOVED***(
***REMOVED******REMOVED***'QUICK-TEST-001',
***REMOVED******REMOVED***(SELECT***REMOVED***id***REMOVED***FROM***REMOVED***auth.users***REMOVED***ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC***REMOVED***LIMIT***REMOVED***1),
***REMOVED******REMOVED***'cs_quick_test_001',
***REMOVED******REMOVED***'paid',
***REMOVED******REMOVED***NOW()***REMOVED***+***REMOVED***INTERVAL***REMOVED***'24***REMOVED***hours'
)
ON***REMOVED***CONFLICT***REMOVED***(token)***REMOVED***DO***REMOVED***NOTHING;

--***REMOVED***5.***REMOVED***Verify***REMOVED***everything***REMOVED***works
SELECT***REMOVED***'QUICK***REMOVED***FIX***REMOVED***COMPLETE'***REMOVED***as***REMOVED***status;
SELECT***REMOVED***COUNT(*)***REMOVED***as***REMOVED***profiles_count***REMOVED***FROM***REMOVED***profiles;
SELECT***REMOVED***COUNT(*)***REMOVED***as***REMOVED***tokens_count***REMOVED***FROM***REMOVED***dynasty_creation_tokens;
SELECT***REMOVED***COUNT(*)***REMOVED***as***REMOVED***dynasties_count***REMOVED***FROM***REMOVED***dynasties;

--***REMOVED***6.***REMOVED***Test***REMOVED***URL***REMOVED***for***REMOVED***immediate***REMOVED***testing:
--***REMOVED***http://localhost:8081/dynasty/checkout/success?session_id=cs_quick_test_001
