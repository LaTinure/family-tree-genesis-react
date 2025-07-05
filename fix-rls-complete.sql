--***REMOVED***COMPLETE***REMOVED***RLS***REMOVED***FIX***REMOVED***-***REMOVED***Run***REMOVED***this***REMOVED***in***REMOVED***Supabase***REMOVED***SQL***REMOVED***Editor
--***REMOVED***This***REMOVED***script***REMOVED***fixes***REMOVED***all***REMOVED***RLS***REMOVED***issues***REMOVED***and***REMOVED***ensures***REMOVED***proper***REMOVED***database***REMOVED***structure

--***REMOVED***1.***REMOVED***Disable***REMOVED***RLS***REMOVED***on***REMOVED***all***REMOVED***tables***REMOVED***temporarily***REMOVED***to***REMOVED***clear***REMOVED***any***REMOVED***conflicts
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***DISABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;
ALTER***REMOVED***TABLE***REMOVED***dynasty_creation_tokens***REMOVED***DISABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;
ALTER***REMOVED***TABLE***REMOVED***dynasties***REMOVED***DISABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;

--***REMOVED***2.***REMOVED***Drop***REMOVED***ALL***REMOVED***existing***REMOVED***policies***REMOVED***that***REMOVED***might***REMOVED***cause***REMOVED***conflicts
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Profiles***REMOVED***are***REMOVED***viewable***REMOVED***by***REMOVED***everyone"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***view***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***update***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***insert***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***delete***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Enable***REMOVED***all***REMOVED***access***REMOVED***for***REMOVED***authenticated***REMOVED***users"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Enable***REMOVED***read***REMOVED***access***REMOVED***for***REMOVED***everyone"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Service***REMOVED***can***REMOVED***insert***REMOVED***tokens"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Service***REMOVED***can***REMOVED***update***REMOVED***tokens"***REMOVED***ON***REMOVED***profiles;

--***REMOVED***3.***REMOVED***Ensure***REMOVED***dynasty_creation_tokens***REMOVED***table***REMOVED***exists***REMOVED***with***REMOVED***correct***REMOVED***structure
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

--***REMOVED***4.***REMOVED***Ensure***REMOVED***dynasties***REMOVED***table***REMOVED***exists
CREATE***REMOVED***TABLE***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***dynasties***REMOVED***(
***REMOVED******REMOVED***id***REMOVED***UUID***REMOVED***DEFAULT***REMOVED***gen_random_uuid()***REMOVED***PRIMARY***REMOVED***KEY,
***REMOVED******REMOVED***name***REMOVED***TEXT***REMOVED***NOT***REMOVED***NULL,
***REMOVED******REMOVED***description***REMOVED***TEXT,
***REMOVED******REMOVED***owner_id***REMOVED***UUID***REMOVED***REFERENCES***REMOVED***auth.users(id)***REMOVED***ON***REMOVED***DELETE***REMOVED***CASCADE,
***REMOVED******REMOVED***created_at***REMOVED***TIMESTAMP***REMOVED***WITH***REMOVED***TIME***REMOVED***ZONE***REMOVED***DEFAULT***REMOVED***NOW(),
***REMOVED******REMOVED***updated_at***REMOVED***TIMESTAMP***REMOVED***WITH***REMOVED***TIME***REMOVED***ZONE***REMOVED***DEFAULT***REMOVED***NOW()
);

--***REMOVED***5.***REMOVED***Create***REMOVED***indexes***REMOVED***for***REMOVED***performance
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_dynasty_creation_tokens_user_id***REMOVED***ON***REMOVED***dynasty_creation_tokens(user_id);
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_dynasty_creation_tokens_token***REMOVED***ON***REMOVED***dynasty_creation_tokens(token);
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_dynasty_creation_tokens_stripe_session_id***REMOVED***ON***REMOVED***dynasty_creation_tokens(stripe_session_id);
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_dynasty_creation_tokens_status***REMOVED***ON***REMOVED***dynasty_creation_tokens(status);

--***REMOVED***6.***REMOVED***Re-enable***REMOVED***RLS***REMOVED***with***REMOVED***simple,***REMOVED***non-recursive***REMOVED***policies
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***ENABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;
ALTER***REMOVED***TABLE***REMOVED***dynasty_creation_tokens***REMOVED***ENABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;
ALTER***REMOVED***TABLE***REMOVED***dynasties***REMOVED***ENABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;

--***REMOVED***7.***REMOVED***Create***REMOVED***simple***REMOVED***policies***REMOVED***for***REMOVED***profiles***REMOVED***table
CREATE***REMOVED***POLICY***REMOVED***"Allow***REMOVED***read***REMOVED***for***REMOVED***authenticated***REMOVED***users"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***SELECT
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(auth.role()***REMOVED***=***REMOVED***'authenticated');

CREATE***REMOVED***POLICY***REMOVED***"Allow***REMOVED***insert***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***INSERT
***REMOVED******REMOVED******REMOVED******REMOVED***WITH***REMOVED***CHECK***REMOVED***(auth.uid()***REMOVED***=***REMOVED***id);

CREATE***REMOVED***POLICY***REMOVED***"Allow***REMOVED***update***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***UPDATE
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(auth.uid()***REMOVED***=***REMOVED***id)
***REMOVED******REMOVED******REMOVED******REMOVED***WITH***REMOVED***CHECK***REMOVED***(auth.uid()***REMOVED***=***REMOVED***id);

CREATE***REMOVED***POLICY***REMOVED***"Allow***REMOVED***delete***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***DELETE
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(auth.uid()***REMOVED***=***REMOVED***id);

--***REMOVED***8.***REMOVED***Create***REMOVED***policies***REMOVED***for***REMOVED***dynasty_creation_tokens***REMOVED***table
CREATE***REMOVED***POLICY***REMOVED***"Allow***REMOVED***read***REMOVED***own***REMOVED***tokens"***REMOVED***ON***REMOVED***dynasty_creation_tokens
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***SELECT
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(auth.uid()***REMOVED***=***REMOVED***user_id);

CREATE***REMOVED***POLICY***REMOVED***"Allow***REMOVED***insert***REMOVED***tokens"***REMOVED***ON***REMOVED***dynasty_creation_tokens
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***INSERT
***REMOVED******REMOVED******REMOVED******REMOVED***WITH***REMOVED***CHECK***REMOVED***(auth.uid()***REMOVED***=***REMOVED***user_id);

CREATE***REMOVED***POLICY***REMOVED***"Allow***REMOVED***update***REMOVED***own***REMOVED***tokens"***REMOVED***ON***REMOVED***dynasty_creation_tokens
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***UPDATE
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(auth.uid()***REMOVED***=***REMOVED***user_id)
***REMOVED******REMOVED******REMOVED******REMOVED***WITH***REMOVED***CHECK***REMOVED***(auth.uid()***REMOVED***=***REMOVED***user_id);

--***REMOVED***9.***REMOVED***Create***REMOVED***policies***REMOVED***for***REMOVED***dynasties***REMOVED***table
CREATE***REMOVED***POLICY***REMOVED***"Allow***REMOVED***read***REMOVED***dynasties"***REMOVED***ON***REMOVED***dynasties
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***SELECT
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(auth.role()***REMOVED***=***REMOVED***'authenticated');

CREATE***REMOVED***POLICY***REMOVED***"Allow***REMOVED***insert***REMOVED***dynasties"***REMOVED***ON***REMOVED***dynasties
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***INSERT
***REMOVED******REMOVED******REMOVED******REMOVED***WITH***REMOVED***CHECK***REMOVED***(auth.uid()***REMOVED***=***REMOVED***owner_id);

CREATE***REMOVED***POLICY***REMOVED***"Allow***REMOVED***update***REMOVED***own***REMOVED***dynasty"***REMOVED***ON***REMOVED***dynasties
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***UPDATE
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(auth.uid()***REMOVED***=***REMOVED***owner_id)
***REMOVED******REMOVED******REMOVED******REMOVED***WITH***REMOVED***CHECK***REMOVED***(auth.uid()***REMOVED***=***REMOVED***owner_id);

--***REMOVED***10.***REMOVED***Verify***REMOVED***the***REMOVED***policies***REMOVED***are***REMOVED***created
SELECT***REMOVED***schemaname,***REMOVED***tablename,***REMOVED***policyname,***REMOVED***permissive,***REMOVED***roles,***REMOVED***cmd,***REMOVED***qual,***REMOVED***with_check
FROM***REMOVED***pg_policies
WHERE***REMOVED***tablename***REMOVED***IN***REMOVED***('profiles',***REMOVED***'dynasty_creation_tokens',***REMOVED***'dynasties')
ORDER***REMOVED***BY***REMOVED***tablename,***REMOVED***policyname;

--***REMOVED***11.***REMOVED***Test***REMOVED***that***REMOVED***we***REMOVED***can***REMOVED***read***REMOVED***data
SELECT***REMOVED***'profiles'***REMOVED***as***REMOVED***table_name,***REMOVED***COUNT(*)***REMOVED***as***REMOVED***count***REMOVED***FROM***REMOVED***profiles
UNION***REMOVED***ALL
SELECT***REMOVED***'dynasty_creation_tokens'***REMOVED***as***REMOVED***table_name,***REMOVED***COUNT(*)***REMOVED***as***REMOVED***count***REMOVED***FROM***REMOVED***dynasty_creation_tokens
UNION***REMOVED***ALL
SELECT***REMOVED***'dynasties'***REMOVED***as***REMOVED***table_name,***REMOVED***COUNT(*)***REMOVED***as***REMOVED***count***REMOVED***FROM***REMOVED***dynasties;

--***REMOVED***12.***REMOVED***Show***REMOVED***recent***REMOVED***tokens***REMOVED***(if***REMOVED***any***REMOVED***exist)
SELECT***REMOVED***token,***REMOVED***user_id,***REMOVED***stripe_session_id,***REMOVED***status,***REMOVED***created_at
FROM***REMOVED***dynasty_creation_tokens
ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC
LIMIT***REMOVED***5;
