--***REMOVED***Temporary***REMOVED***disable***REMOVED***RLS***REMOVED***for***REMOVED***testing
--***REMOVED***Run***REMOVED***this***REMOVED***in***REMOVED***Supabase***REMOVED***SQL***REMOVED***Editor***REMOVED***to***REMOVED***fix***REMOVED***the***REMOVED***infinite***REMOVED***recursion***REMOVED***issue

--***REMOVED***Disable***REMOVED***RLS***REMOVED***completely***REMOVED***on***REMOVED***profiles***REMOVED***table
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***DISABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;

--***REMOVED***Verify***REMOVED***it's***REMOVED***disabled
SELECT***REMOVED***schemaname,***REMOVED***tablename,***REMOVED***rowsecurity
FROM***REMOVED***pg_tables
WHERE***REMOVED***tablename***REMOVED***=***REMOVED***'profiles';

--***REMOVED***Test***REMOVED***that***REMOVED***we***REMOVED***can***REMOVED***read***REMOVED***profiles
SELECT***REMOVED***COUNT(*)***REMOVED***as***REMOVED***total_profiles***REMOVED***FROM***REMOVED***profiles;

--***REMOVED***Test***REMOVED***that***REMOVED***we***REMOVED***can***REMOVED***insert***REMOVED***a***REMOVED***profile***REMOVED***(if***REMOVED***needed)
--***REMOVED***INSERT***REMOVED***INTO***REMOVED***profiles***REMOVED***(id,***REMOVED***user_id,***REMOVED***email,***REMOVED***first_name,***REMOVED***last_name,***REMOVED***user_role)
--***REMOVED***VALUES***REMOVED***('test-id',***REMOVED***'test-id',***REMOVED***'test@test.com',***REMOVED***'Test',***REMOVED***'User',***REMOVED***'Membre');
