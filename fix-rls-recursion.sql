--***REMOVED***Fix***REMOVED***infinite***REMOVED***recursion***REMOVED***in***REMOVED***profiles***REMOVED***RLS***REMOVED***policies
--***REMOVED***Run***REMOVED***this***REMOVED***in***REMOVED***Supabase***REMOVED***SQL***REMOVED***Editor

--***REMOVED***1.***REMOVED***Disable***REMOVED***RLS***REMOVED***temporarily***REMOVED***to***REMOVED***clear***REMOVED***all***REMOVED***policies
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***DISABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;

--***REMOVED***2.***REMOVED***Drop***REMOVED***all***REMOVED***existing***REMOVED***policies***REMOVED***that***REMOVED***might***REMOVED***cause***REMOVED***recursion
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Profiles***REMOVED***are***REMOVED***viewable***REMOVED***by***REMOVED***everyone"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***view***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***update***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***insert***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Users***REMOVED***can***REMOVED***delete***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Enable***REMOVED***all***REMOVED***access***REMOVED***for***REMOVED***authenticated***REMOVED***users"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Enable***REMOVED***read***REMOVED***access***REMOVED***for***REMOVED***everyone"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Service***REMOVED***can***REMOVED***insert***REMOVED***tokens"***REMOVED***ON***REMOVED***profiles;
DROP***REMOVED***POLICY***REMOVED***IF***REMOVED***EXISTS***REMOVED***"Service***REMOVED***can***REMOVED***update***REMOVED***tokens"***REMOVED***ON***REMOVED***profiles;

--***REMOVED***3.***REMOVED***Re-enable***REMOVED***RLS
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***ENABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;

--***REMOVED***4.***REMOVED***Create***REMOVED***simple,***REMOVED***non-recursive***REMOVED***policies
--***REMOVED***Allow***REMOVED***all***REMOVED***authenticated***REMOVED***users***REMOVED***to***REMOVED***read***REMOVED***all***REMOVED***profiles
CREATE***REMOVED***POLICY***REMOVED***"Allow***REMOVED***read***REMOVED***for***REMOVED***authenticated***REMOVED***users"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***SELECT
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(auth.role()***REMOVED***=***REMOVED***'authenticated');

--***REMOVED***Allow***REMOVED***users***REMOVED***to***REMOVED***insert***REMOVED***their***REMOVED***own***REMOVED***profile
CREATE***REMOVED***POLICY***REMOVED***"Allow***REMOVED***insert***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***INSERT
***REMOVED******REMOVED******REMOVED******REMOVED***WITH***REMOVED***CHECK***REMOVED***(auth.uid()***REMOVED***=***REMOVED***id);

--***REMOVED***Allow***REMOVED***users***REMOVED***to***REMOVED***update***REMOVED***their***REMOVED***own***REMOVED***profile
CREATE***REMOVED***POLICY***REMOVED***"Allow***REMOVED***update***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***UPDATE
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(auth.uid()***REMOVED***=***REMOVED***id)
***REMOVED******REMOVED******REMOVED******REMOVED***WITH***REMOVED***CHECK***REMOVED***(auth.uid()***REMOVED***=***REMOVED***id);

--***REMOVED***Allow***REMOVED***users***REMOVED***to***REMOVED***delete***REMOVED***their***REMOVED***own***REMOVED***profile
CREATE***REMOVED***POLICY***REMOVED***"Allow***REMOVED***delete***REMOVED***own***REMOVED***profile"***REMOVED***ON***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED***FOR***REMOVED***DELETE
***REMOVED******REMOVED******REMOVED******REMOVED***USING***REMOVED***(auth.uid()***REMOVED***=***REMOVED***id);

--***REMOVED***5.***REMOVED***Verify***REMOVED***the***REMOVED***policies***REMOVED***are***REMOVED***created
SELECT***REMOVED***schemaname,***REMOVED***tablename,***REMOVED***policyname,***REMOVED***permissive,***REMOVED***roles,***REMOVED***cmd,***REMOVED***qual,***REMOVED***with_check
FROM***REMOVED***pg_policies
WHERE***REMOVED***tablename***REMOVED***=***REMOVED***'profiles';

--***REMOVED***6.***REMOVED***Test***REMOVED***the***REMOVED***policies***REMOVED***work
SELECT***REMOVED***COUNT(*)***REMOVED***as***REMOVED***total_profiles***REMOVED***FROM***REMOVED***profiles;
