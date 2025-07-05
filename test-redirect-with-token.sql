--***REMOVED***Test***REMOVED***redirect***REMOVED***with***REMOVED***token
--***REMOVED***Run***REMOVED***this***REMOVED***in***REMOVED***Supabase***REMOVED***SQL***REMOVED***Editor

--***REMOVED***1.***REMOVED***Get***REMOVED***the***REMOVED***most***REMOVED***recent***REMOVED***user
SELECT***REMOVED***id,***REMOVED***email,***REMOVED***created_at
FROM***REMOVED***auth.users
ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC
LIMIT***REMOVED***1;

--***REMOVED***2.***REMOVED***Create***REMOVED***a***REMOVED***test***REMOVED***token***REMOVED***that***REMOVED***simulates***REMOVED***a***REMOVED***real***REMOVED***Stripe***REMOVED***session
INSERT***REMOVED***INTO***REMOVED***dynasty_creation_tokens***REMOVED***(
***REMOVED******REMOVED***token,
***REMOVED******REMOVED***user_id,
***REMOVED******REMOVED***stripe_session_id,
***REMOVED******REMOVED***status,
***REMOVED******REMOVED***expires_at
)***REMOVED***VALUES***REMOVED***(
***REMOVED******REMOVED***'DYN-ABCD1234',
***REMOVED******REMOVED***(SELECT***REMOVED***id***REMOVED***FROM***REMOVED***auth.users***REMOVED***ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC***REMOVED***LIMIT***REMOVED***1),
***REMOVED******REMOVED***'cs_test_a1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T0u1V2w3X4y5Z6',
***REMOVED******REMOVED***'paid',
***REMOVED******REMOVED***NOW()***REMOVED***+***REMOVED***INTERVAL***REMOVED***'24***REMOVED***hours'
);

--***REMOVED***3.***REMOVED***Create***REMOVED***another***REMOVED***test***REMOVED***token***REMOVED***with***REMOVED***a***REMOVED***different***REMOVED***session
INSERT***REMOVED***INTO***REMOVED***dynasty_creation_tokens***REMOVED***(
***REMOVED******REMOVED***token,
***REMOVED******REMOVED***user_id,
***REMOVED******REMOVED***stripe_session_id,
***REMOVED******REMOVED***status,
***REMOVED******REMOVED***expires_at
)***REMOVED***VALUES***REMOVED***(
***REMOVED******REMOVED***'DYN-WXYZ5678',
***REMOVED******REMOVED***(SELECT***REMOVED***id***REMOVED***FROM***REMOVED***auth.users***REMOVED***ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC***REMOVED***LIMIT***REMOVED***1),
***REMOVED******REMOVED***'cs_test_z9Y8x7W6v5U4t3S2r1Q0p9O8n7M6l5K4j3I2h1G0f9E8d7C6b5A4',
***REMOVED******REMOVED***'paid',
***REMOVED******REMOVED***NOW()***REMOVED***+***REMOVED***INTERVAL***REMOVED***'24***REMOVED***hours'
);

--***REMOVED***4.***REMOVED***Show***REMOVED***all***REMOVED***test***REMOVED***tokens
SELECT
***REMOVED******REMOVED***token,
***REMOVED******REMOVED***user_id,
***REMOVED******REMOVED***stripe_session_id,
***REMOVED******REMOVED***status,
***REMOVED******REMOVED***created_at,
***REMOVED******REMOVED***expires_at
FROM***REMOVED***dynasty_creation_tokens
ORDER***REMOVED***BY***REMOVED***created_at***REMOVED***DESC;

--***REMOVED***5.***REMOVED***Test***REMOVED***URL***REMOVED***for***REMOVED***manual***REMOVED***testing:
--***REMOVED***http://localhost:8081/dynasty/checkout/success?session_id=cs_test_a1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T0u1V2w3X4y5Z6
--***REMOVED***Should***REMOVED***redirect***REMOVED***to:***REMOVED***http://localhost:8081/dynasty/create?token=DYN-ABCD1234
