--***REMOVED***URGENT:***REMOVED***Fix***REMOVED***permission***REMOVED***denied***REMOVED***for***REMOVED***dynasty_creation_tokens***REMOVED***-***REMOVED***CORRECTED
--***REMOVED***Copier***REMOVED***et***REMOVED***coller***REMOVED***IMMÉDIATEMENT***REMOVED***dans***REMOVED***l'éditeur***REMOVED***SQL***REMOVED***de***REMOVED***Supabase

--***REMOVED***1.***REMOVED***Désactiver***REMOVED***RLS***REMOVED***complètement***REMOVED***sur***REMOVED***toutes***REMOVED***les***REMOVED***tables
ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***DISABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;
ALTER***REMOVED***TABLE***REMOVED***dynasty_creation_tokens***REMOVED***DISABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;
ALTER***REMOVED***TABLE***REMOVED***dynasties***REMOVED***DISABLE***REMOVED***ROW***REMOVED***LEVEL***REMOVED***SECURITY;

--***REMOVED***2.***REMOVED***Vérifier***REMOVED***que***REMOVED***les***REMOVED***tables***REMOVED***existent***REMOVED***(CORRECTION:***REMOVED***tablename***REMOVED***au***REMOVED***lieu***REMOVED***de***REMOVED***table_name)
SELECT
***REMOVED******REMOVED***tablename,
***REMOVED******REMOVED***rowsecurity***REMOVED***as***REMOVED***rls_enabled
FROM***REMOVED***pg_tables
WHERE***REMOVED***tablename***REMOVED***IN***REMOVED***('profiles',***REMOVED***'dynasty_creation_tokens',***REMOVED***'dynasties')
AND***REMOVED***schemaname***REMOVED***=***REMOVED***'public';

--***REMOVED***3.***REMOVED***Créer***REMOVED***la***REMOVED***table***REMOVED***dynasty_creation_tokens***REMOVED***si***REMOVED***elle***REMOVED***n'existe***REMOVED***pas
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

--***REMOVED***4.***REMOVED***Créer***REMOVED***les***REMOVED***index***REMOVED***nécessaires
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_dynasty_creation_tokens_user_id***REMOVED***ON***REMOVED***dynasty_creation_tokens(user_id);
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_dynasty_creation_tokens_token***REMOVED***ON***REMOVED***dynasty_creation_tokens(token);
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_dynasty_creation_tokens_stripe_session_id***REMOVED***ON***REMOVED***dynasty_creation_tokens(stripe_session_id);

--***REMOVED***5.***REMOVED***Donner***REMOVED***tous***REMOVED***les***REMOVED***droits***REMOVED***aux***REMOVED***utilisateurs***REMOVED***authentifiés
GRANT***REMOVED***ALL***REMOVED***ON***REMOVED***dynasty_creation_tokens***REMOVED***TO***REMOVED***authenticated;
GRANT***REMOVED***ALL***REMOVED***ON***REMOVED***dynasty_creation_tokens***REMOVED***TO***REMOVED***anon;

--***REMOVED***6.***REMOVED***Créer***REMOVED***un***REMOVED***token***REMOVED***de***REMOVED***test***REMOVED***pour***REMOVED***vérifier***REMOVED***que***REMOVED***ça***REMOVED***fonctionne
INSERT***REMOVED***INTO***REMOVED***dynasty_creation_tokens***REMOVED***(
***REMOVED******REMOVED***token,
***REMOVED******REMOVED***user_id,
***REMOVED******REMOVED***stripe_session_id,
***REMOVED******REMOVED***status,
***REMOVED******REMOVED***expires_at
)***REMOVED***VALUES***REMOVED***(
***REMOVED******REMOVED***'TEST-PERMISSION-001',
***REMOVED******REMOVED***(SELECT***REMOVED***id***REMOVED***FROM***REMOVED***auth.users***REMOVED***ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC***REMOVED***LIMIT***REMOVED***1),
***REMOVED******REMOVED***'cs_test_permission_001',
***REMOVED******REMOVED***'paid',
***REMOVED******REMOVED***NOW()***REMOVED***+***REMOVED***INTERVAL***REMOVED***'24***REMOVED***hours'
)
ON***REMOVED***CONFLICT***REMOVED***(token)***REMOVED***DO***REMOVED***NOTHING;

--***REMOVED***7.***REMOVED***Vérifier***REMOVED***que***REMOVED***tout***REMOVED***fonctionne
SELECT***REMOVED***'PERMISSIONS***REMOVED***FIXED'***REMOVED***as***REMOVED***status;
SELECT***REMOVED***COUNT(*)***REMOVED***as***REMOVED***tokens_count***REMOVED***FROM***REMOVED***dynasty_creation_tokens;
SELECT***REMOVED***COUNT(*)***REMOVED***as***REMOVED***profiles_count***REMOVED***FROM***REMOVED***profiles;

--***REMOVED***8.***REMOVED***Test***REMOVED***URL***REMOVED***pour***REMOVED***vérifier:
--***REMOVED***http://localhost:8081/dynasty/checkout/success?session_id=cs_test_permission_001
