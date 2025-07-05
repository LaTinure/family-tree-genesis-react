--***REMOVED***Fix***REMOVED***permissions***REMOVED***for***REMOVED***dynasty_creation_tokens***REMOVED***table
--***REMOVED***Run***REMOVED***this***REMOVED***in***REMOVED***Supabase***REMOVED***SQL***REMOVED***Editor

--***REMOVED***1.***REMOVED***First,***REMOVED***let's***REMOVED***see***REMOVED***what***REMOVED***we're***REMOVED***working***REMOVED***with
SELECT
***REMOVED******REMOVED***tablename,
***REMOVED******REMOVED***rowsecurity
FROM***REMOVED***pg_tables
WHERE***REMOVED***tablename***REMOVED***=***REMOVED***'dynasty_creation_tokens';

--***REMOVED***2.***REMOVED***Check***REMOVED***current***REMOVED***RLS***REMOVED***policies
SELECT
***REMOVED******REMOVED***schemaname,
***REMOVED******REMOVED***tablename,
***REMOVED******REMOVED***policyname,
***REMOVED******REMOVED***permissive,
***REMOVED******REMOVED***roles,
***REMOVED******REMOVED***cmd,
***REMOVED******REMOVED***qual,
***REMOVED******REMOVED***with_check
FROM***REMOVED***pg_policies
WHERE***REMOVED***tablename***REMOVED***=***REMOVED***'dynasty_creation_tokens';

--***REMOVED***3.***REMOVED***Disable***REMOVED***RLS***REMOVED***temporarily***REMOVED***to***REMOVED***allow***REMOVED***operations
ALTER***REMOVED***TABLE***REMOVED***dynasty_creation_tokens***REMOVED***DISABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;

--***REMOVED***4.***REMOVED***Drop***REMOVED***all***REMOVED***existing***REMOVED***policies***REMOVED***(if***REMOVED***any)
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***view***REMOVED***their***REMOVED***own***REMOVED***tokens"***REMOVED***ON***REMOVED***dynasty_creation_tokens;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Service***REMOVED***can***REMOVED***insert***REMOVED***tokens"***REMOVED***ON***REMOVED***dynasty_creation_tokens;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Service***REMOVED***can***REMOVED***update***REMOVED***tokens"***REMOVED***ON***REMOVED***dynasty_creation_tokens;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Allow***REMOVED***read***REMOVED***for***REMOVED***authenticated***REMOVED***users"***REMOVED***ON***REMOVED***dynasty_creation_tokens;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Allow***REMOVED***insert***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***dynasty_creation_tokens;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Allow***REMOVED***update***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***dynasty_creation_tokens;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Allow***REMOVED***delete***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***dynasty_creation_tokens;

--***REMOVED***5.***REMOVED***Grant***REMOVED***all***REMOVED***permissions***REMOVED***to***REMOVED***authenticated***REMOVED***users***REMOVED***(temporary)
GRANT***REMOVED***ALL***REMOVED***ON***REMOVED***dynasty_creation_tokens***REMOVED***TO***REMOVED***authenticated;
GRANT***REMOVED***ALL***REMOVED***ON***REMOVED***dynasty_creation_tokens***REMOVED***TO***REMOVED***anon;

--***REMOVED***6.***REMOVED***Create***REMOVED***a***REMOVED***simple***REMOVED***policy***REMOVED***that***REMOVED***allows***REMOVED***everything***REMOVED***(for***REMOVED***testing)
CREATE***REMOVED***POLICY***REMOVED***"Allow***REMOVED***all***REMOVED***operations"***REMOVED***ON***REMOVED***dynasty_creation_tokens
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***ALL
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(true)
***REMOVED******REMOVED******REMOVED******REMOVED***WITH***REMOVED***CHECK***REMOVED***(true);

--***REMOVED***7.***REMOVED***Re-enable***REMOVED***RLS***REMOVED***with***REMOVED***the***REMOVED***new***REMOVED***policy
ALTER***REMOVED***TABLE***REMOVED***dynasty_creation_tokens***REMOVED***ENABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;

--***REMOVED***8.***REMOVED***Test***REMOVED***if***REMOVED***we***REMOVED***can***REMOVED***insert***REMOVED***data***REMOVED***now
INSERT***REMOVED***INTO***REMOVED***dynasty_creation_tokens***REMOVED***(
***REMOVED******REMOVED***token,
***REMOVED******REMOVED***user_id,
***REMOVED******REMOVED***stripe_session_id,
***REMOVED******REMOVED***status,
***REMOVED******REMOVED***expires_at
)***REMOVED***VALUES***REMOVED***(
***REMOVED******REMOVED***'TEST-PERM-123',
***REMOVED******REMOVED***(SELECT***REMOVED***id***REMOVED***FROM***REMOVED***auth.users***REMOVED***ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC***REMOVED***LIMIT***REMOVED***1),
***REMOVED******REMOVED***'cs_test_permission_check',
***REMOVED******REMOVED***'paid',
***REMOVED******REMOVED***NOW()***REMOVED***+***REMOVED***INTERVAL***REMOVED***'24***REMOVED***hours'
);

--***REMOVED***9.***REMOVED***Verify***REMOVED***the***REMOVED***insert***REMOVED***worked
SELECT
***REMOVED******REMOVED***token,
***REMOVED******REMOVED***user_id,
***REMOVED******REMOVED***stripe_session_id,
***REMOVED******REMOVED***status,
***REMOVED******REMOVED***created_at
FROM***REMOVED***dynasty_creation_tokens
WHERE***REMOVED***token***REMOVED***=***REMOVED***'TEST-PERM-123';

--***REMOVED***10.***REMOVED***Show***REMOVED***all***REMOVED***tokens
SELECT***REMOVED***COUNT(*)***REMOVED***as***REMOVED***total_tokens***REMOVED***FROM***REMOVED***dynasty_creation_tokens;
