--***REMOVED***Create***REMOVED***tokens***REMOVED***using***REMOVED***service***REMOVED***role***REMOVED***(bypass***REMOVED***RLS)
--***REMOVED***Run***REMOVED***this***REMOVED***in***REMOVED***Supabase***REMOVED***SQL***REMOVED***Editor

--***REMOVED***1.***REMOVED***Check***REMOVED***if***REMOVED***we're***REMOVED***using***REMOVED***service***REMOVED***role
SELECT***REMOVED***current_user,***REMOVED***session_user;

--***REMOVED***2.***REMOVED***Get***REMOVED***recent***REMOVED***users
SELECT***REMOVED***id,***REMOVED***email,***REMOVED***created_at
FROM***REMOVED***auth.users
ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC
LIMIT***REMOVED***3;

--***REMOVED***3.***REMOVED***Create***REMOVED***tokens***REMOVED***directly***REMOVED***(this***REMOVED***simulates***REMOVED***what***REMOVED***the***REMOVED***webhook***REMOVED***does)
--***REMOVED***Note:***REMOVED***This***REMOVED***should***REMOVED***work***REMOVED***because***REMOVED***we're***REMOVED***in***REMOVED***the***REMOVED***SQL***REMOVED***editor***REMOVED***with***REMOVED***service***REMOVED***role

INSERT***REMOVED***INTO***REMOVED***dynasty_creation_tokens***REMOVED***(
***REMOVED******REMOVED***token,
***REMOVED******REMOVED***user_id,
***REMOVED******REMOVED***stripe_session_id,
***REMOVED******REMOVED***status,
***REMOVED******REMOVED***expires_at
)***REMOVED***VALUES
***REMOVED******REMOVED***('DYN-SERVICE-001',
***REMOVED******REMOVED******REMOVED***(SELECT***REMOVED***id***REMOVED***FROM***REMOVED***auth.users***REMOVED***ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC***REMOVED***LIMIT***REMOVED***1***REMOVED***OFFSET***REMOVED***0),
***REMOVED******REMOVED******REMOVED***'cs_test_service_001',
***REMOVED******REMOVED******REMOVED***'paid',
***REMOVED******REMOVED******REMOVED***NOW()***REMOVED***+***REMOVED***INTERVAL***REMOVED***'24***REMOVED***hours'
***REMOVED******REMOVED***),
***REMOVED******REMOVED***('DYN-SERVICE-002',
***REMOVED******REMOVED******REMOVED***(SELECT***REMOVED***id***REMOVED***FROM***REMOVED***auth.users***REMOVED***ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC***REMOVED***LIMIT***REMOVED***1***REMOVED***OFFSET***REMOVED***0),
***REMOVED******REMOVED******REMOVED***'cs_test_service_002',
***REMOVED******REMOVED******REMOVED***'paid',
***REMOVED******REMOVED******REMOVED***NOW()***REMOVED***+***REMOVED***INTERVAL***REMOVED***'24***REMOVED***hours'
***REMOVED******REMOVED***),
***REMOVED******REMOVED***('DYN-SERVICE-003',
***REMOVED******REMOVED******REMOVED***(SELECT***REMOVED***id***REMOVED***FROM***REMOVED***auth.users***REMOVED***ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC***REMOVED***LIMIT***REMOVED***1***REMOVED***OFFSET***REMOVED***0),
***REMOVED******REMOVED******REMOVED***'cs_test_service_003',
***REMOVED******REMOVED******REMOVED***'paid',
***REMOVED******REMOVED******REMOVED***NOW()***REMOVED***+***REMOVED***INTERVAL***REMOVED***'24***REMOVED***hours'
***REMOVED******REMOVED***);

--***REMOVED***4.***REMOVED***Verify***REMOVED***tokens***REMOVED***were***REMOVED***created
SELECT
***REMOVED******REMOVED***token,
***REMOVED******REMOVED***user_id,
***REMOVED******REMOVED***stripe_session_id,
***REMOVED******REMOVED***status,
***REMOVED******REMOVED***created_at,
***REMOVED******REMOVED***expires_at
FROM***REMOVED***dynasty_creation_tokens
ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC;

--***REMOVED***5.***REMOVED***Test***REMOVED***URLs***REMOVED***for***REMOVED***manual***REMOVED***testing:
--***REMOVED***http://localhost:8081/dynasty/checkout/success?session_id=cs_test_service_001
--***REMOVED***http://localhost:8081/dynasty/checkout/success?session_id=cs_test_service_002
--***REMOVED***http://localhost:8081/dynasty/checkout/success?session_id=cs_test_service_003

--***REMOVED***6.***REMOVED***Show***REMOVED***total***REMOVED***count
SELECT***REMOVED***COUNT(*)***REMOVED***as***REMOVED***total_tokens***REMOVED***FROM***REMOVED***dynasty_creation_tokens;
