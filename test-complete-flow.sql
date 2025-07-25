--***REMOVED***Test***REMOVED***complete***REMOVED***payment***REMOVED***flow
--***REMOVED***Run***REMOVED***this***REMOVED***in***REMOVED***Supabase***REMOVED***SQL***REMOVED***Editor

--***REMOVED***1.***REMOVED***Ensure***REMOVED***we***REMOVED***have***REMOVED***the***REMOVED***right***REMOVED***permissions
SELECT***REMOVED***current_user,***REMOVED***session_user;

--***REMOVED***2.***REMOVED***Check***REMOVED***table***REMOVED***structure
SELECT
***REMOVED******REMOVED***column_name,
***REMOVED******REMOVED***data_type,
***REMOVED******REMOVED***is_nullable
FROM***REMOVED***information_schema.columns
WHERE***REMOVED***table_name***REMOVED***=***REMOVED***'dynasty_creation_tokens'
AND***REMOVED***table_schema***REMOVED***=***REMOVED***'public'
ORDER***REMOVED***BY***REMOVED***ordinal_position;

--***REMOVED***3.***REMOVED***Get***REMOVED***recent***REMOVED***users***REMOVED***for***REMOVED***testing
SELECT***REMOVED***id,***REMOVED***email,***REMOVED***created_at
FROM***REMOVED***auth.users
ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC
LIMIT***REMOVED***3;

--***REMOVED***4.***REMOVED***Create***REMOVED***multiple***REMOVED***test***REMOVED***tokens***REMOVED***with***REMOVED***different***REMOVED***scenarios
INSERT***REMOVED***INTO***REMOVED***dynasty_creation_tokens***REMOVED***(
***REMOVED******REMOVED***token,
***REMOVED******REMOVED***user_id,
***REMOVED******REMOVED***stripe_session_id,
***REMOVED******REMOVED***status,
***REMOVED******REMOVED***expires_at
)***REMOVED***VALUES
***REMOVED******REMOVED***--***REMOVED***Token***REMOVED***1:***REMOVED***Normal***REMOVED***paid***REMOVED***token
***REMOVED******REMOVED***('DYN-FLOW-001',
***REMOVED******REMOVED******REMOVED***(SELECT***REMOVED***id***REMOVED***FROM***REMOVED***auth.users***REMOVED***ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC***REMOVED***LIMIT***REMOVED***1***REMOVED***OFFSET***REMOVED***0),
***REMOVED******REMOVED******REMOVED***'cs_test_flow_001_normal',
***REMOVED******REMOVED******REMOVED***'paid',
***REMOVED******REMOVED******REMOVED***NOW()***REMOVED***+***REMOVED***INTERVAL***REMOVED***'24***REMOVED***hours'
***REMOVED******REMOVED***),
***REMOVED******REMOVED***--***REMOVED***Token***REMOVED***2:***REMOVED***Pending***REMOVED***token***REMOVED***(simulating***REMOVED***webhook***REMOVED***not***REMOVED***processed***REMOVED***yet)
***REMOVED******REMOVED***('DYN-FLOW-002',
***REMOVED******REMOVED******REMOVED***(SELECT***REMOVED***id***REMOVED***FROM***REMOVED***auth.users***REMOVED***ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC***REMOVED***LIMIT***REMOVED***1***REMOVED***OFFSET***REMOVED***0),
***REMOVED******REMOVED******REMOVED***'cs_test_flow_002_pending',
***REMOVED******REMOVED******REMOVED***'pending',
***REMOVED******REMOVED******REMOVED***NOW()***REMOVED***+***REMOVED***INTERVAL***REMOVED***'24***REMOVED***hours'
***REMOVED******REMOVED***),
***REMOVED******REMOVED***--***REMOVED***Token***REMOVED***3:***REMOVED***Used***REMOVED***token***REMOVED***(simulating***REMOVED***already***REMOVED***used)
***REMOVED******REMOVED***('DYN-FLOW-003',
***REMOVED******REMOVED******REMOVED***(SELECT***REMOVED***id***REMOVED***FROM***REMOVED***auth.users***REMOVED***ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC***REMOVED***LIMIT***REMOVED***1***REMOVED***OFFSET***REMOVED***0),
***REMOVED******REMOVED******REMOVED***'cs_test_flow_003_used',
***REMOVED******REMOVED******REMOVED***'used',
***REMOVED******REMOVED******REMOVED***NOW()***REMOVED***+***REMOVED***INTERVAL***REMOVED***'24***REMOVED***hours'
***REMOVED******REMOVED***),
***REMOVED******REMOVED***--***REMOVED***Token***REMOVED***4:***REMOVED***Expired***REMOVED***token
***REMOVED******REMOVED***('DYN-FLOW-004',
***REMOVED******REMOVED******REMOVED***(SELECT***REMOVED***id***REMOVED***FROM***REMOVED***auth.users***REMOVED***ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC***REMOVED***LIMIT***REMOVED***1***REMOVED***OFFSET***REMOVED***0),
***REMOVED******REMOVED******REMOVED***'cs_test_flow_004_expired',
***REMOVED******REMOVED******REMOVED***'paid',
***REMOVED******REMOVED******REMOVED***NOW()***REMOVED***-***REMOVED***INTERVAL***REMOVED***'1***REMOVED***hour'
***REMOVED******REMOVED***);

--***REMOVED***5.***REMOVED***Show***REMOVED***all***REMOVED***tokens***REMOVED***with***REMOVED***their***REMOVED***status
SELECT
***REMOVED******REMOVED***token,
***REMOVED******REMOVED***user_id,
***REMOVED******REMOVED***stripe_session_id,
***REMOVED******REMOVED***status,
***REMOVED******REMOVED***created_at,
***REMOVED******REMOVED***expires_at,
***REMOVED******REMOVED***CASE
***REMOVED******REMOVED******REMOVED******REMOVED***WHEN***REMOVED***expires_at***REMOVED***<***REMOVED***NOW()***REMOVED***THEN***REMOVED***'EXPIRED'
***REMOVED******REMOVED******REMOVED******REMOVED***WHEN***REMOVED***status***REMOVED***=***REMOVED***'paid'***REMOVED***THEN***REMOVED***'READY'
***REMOVED******REMOVED******REMOVED******REMOVED***WHEN***REMOVED***status***REMOVED***=***REMOVED***'pending'***REMOVED***THEN***REMOVED***'WAITING'
***REMOVED******REMOVED******REMOVED******REMOVED***WHEN***REMOVED***status***REMOVED***=***REMOVED***'used'***REMOVED***THEN***REMOVED***'USED'
***REMOVED******REMOVED******REMOVED******REMOVED***ELSE***REMOVED***'UNKNOWN'
***REMOVED******REMOVED***END***REMOVED***as***REMOVED***token_state
FROM***REMOVED***dynasty_creation_tokens
ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC;

--***REMOVED***6.***REMOVED***Test***REMOVED***URLs***REMOVED***for***REMOVED***manual***REMOVED***testing:
--***REMOVED***Normal***REMOVED***flow:***REMOVED***http://localhost:8081/dynasty/checkout/success?session_id=cs_test_flow_001_normal
--***REMOVED***Pending:***REMOVED***http://localhost:8081/dynasty/checkout/success?session_id=cs_test_flow_002_pending
--***REMOVED***Used:***REMOVED***http://localhost:8081/dynasty/checkout/success?session_id=cs_test_flow_003_used
--***REMOVED***Expired:***REMOVED***http://localhost:8081/dynasty/checkout/success?session_id=cs_test_flow_004_expired

--***REMOVED***7.***REMOVED***Summary
SELECT
***REMOVED******REMOVED***status,
***REMOVED******REMOVED***COUNT(*)***REMOVED***as***REMOVED***count,
***REMOVED******REMOVED***COUNT(CASE***REMOVED***WHEN***REMOVED***expires_at***REMOVED***>***REMOVED***NOW()***REMOVED***THEN***REMOVED***1***REMOVED***END)***REMOVED***as***REMOVED***valid_count
FROM***REMOVED***dynasty_creation_tokens
GROUP***REMOVED***BY***REMOVED***status
ORDER***REMOVED***BY***REMOVED***status;
