--***REMOVED***Debug***REMOVED***webhook***REMOVED***-***REMOVED***Run***REMOVED***this***REMOVED***in***REMOVED***Supabase***REMOVED***SQL***REMOVED***Editor

--***REMOVED***1.***REMOVED***Check***REMOVED***if***REMOVED***dynasty_creation_tokens***REMOVED***table***REMOVED***exists***REMOVED***and***REMOVED***has***REMOVED***data
SELECT
***REMOVED******REMOVED***'dynasty_creation_tokens'***REMOVED***as***REMOVED***table_name,
***REMOVED******REMOVED***COUNT(*)***REMOVED***as***REMOVED***total_records,
***REMOVED******REMOVED***COUNT(CASE***REMOVED***WHEN***REMOVED***status***REMOVED***=***REMOVED***'paid'***REMOVED***THEN***REMOVED***1***REMOVED***END)***REMOVED***as***REMOVED***paid_tokens,
***REMOVED******REMOVED***COUNT(CASE***REMOVED***WHEN***REMOVED***status***REMOVED***=***REMOVED***'pending'***REMOVED***THEN***REMOVED***1***REMOVED***END)***REMOVED***as***REMOVED***pending_tokens,
***REMOVED******REMOVED***COUNT(CASE***REMOVED***WHEN***REMOVED***status***REMOVED***=***REMOVED***'used'***REMOVED***THEN***REMOVED***1***REMOVED***END)***REMOVED***as***REMOVED***used_tokens
FROM***REMOVED***dynasty_creation_tokens;

--***REMOVED***2.***REMOVED***Show***REMOVED***recent***REMOVED***tokens***REMOVED***with***REMOVED***details
SELECT
***REMOVED******REMOVED***token,
***REMOVED******REMOVED***user_id,
***REMOVED******REMOVED***stripe_session_id,
***REMOVED******REMOVED***status,
***REMOVED******REMOVED***created_at,
***REMOVED******REMOVED***expires_at
FROM***REMOVED***dynasty_creation_tokens
ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC
LIMIT***REMOVED***10;

--***REMOVED***3.***REMOVED***Check***REMOVED***if***REMOVED***there***REMOVED***are***REMOVED***any***REMOVED***tokens***REMOVED***for***REMOVED***recent***REMOVED***sessions
SELECT
***REMOVED******REMOVED***stripe_session_id,
***REMOVED******REMOVED***COUNT(*)***REMOVED***as***REMOVED***token_count,
***REMOVED******REMOVED***MAX(created_at)***REMOVED***as***REMOVED***latest_creation
FROM***REMOVED***dynasty_creation_tokens
WHERE***REMOVED***created_at***REMOVED***>***REMOVED***NOW()***REMOVED***-***REMOVED***INTERVAL***REMOVED***'1***REMOVED***hour'
GROUP***REMOVED***BY***REMOVED***stripe_session_id
ORDER***REMOVED***BY***REMOVED***latest_creation***REMOVED***DESC;

--***REMOVED***4.***REMOVED***Check***REMOVED***profiles***REMOVED***table***REMOVED***for***REMOVED***recent***REMOVED***users
SELECT
***REMOVED******REMOVED***id,
***REMOVED******REMOVED***user_id,
***REMOVED******REMOVED***email,
***REMOVED******REMOVED***created_at
FROM***REMOVED***profiles
WHERE***REMOVED***created_at***REMOVED***>***REMOVED***NOW()***REMOVED***-***REMOVED***INTERVAL***REMOVED***'1***REMOVED***hour'
ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC
LIMIT***REMOVED***5;
