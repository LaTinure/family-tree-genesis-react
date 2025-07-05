--***REMOVED***Check***REMOVED***table***REMOVED***structure***REMOVED***-***REMOVED***Run***REMOVED***this***REMOVED***in***REMOVED***Supabase***REMOVED***SQL***REMOVED***Editor

--***REMOVED***1.***REMOVED***Check***REMOVED***if***REMOVED***tables***REMOVED***exist
SELECT***REMOVED***table_name
FROM***REMOVED***information_schema.tables
WHERE***REMOVED***table_schema***REMOVED***=***REMOVED***'public'
AND***REMOVED***table_name***REMOVED***IN***REMOVED***('profiles',***REMOVED***'dynasty_creation_tokens',***REMOVED***'dynasties')
ORDER***REMOVED***BY***REMOVED***table_name;

--***REMOVED***2.***REMOVED***Check***REMOVED***profiles***REMOVED***table***REMOVED***structure
SELECT***REMOVED***column_name,***REMOVED***data_type,***REMOVED***is_nullable,***REMOVED***column_default
FROM***REMOVED***information_schema.columns
WHERE***REMOVED***table_name***REMOVED***=***REMOVED***'profiles'
AND***REMOVED***table_schema***REMOVED***=***REMOVED***'public'
ORDER***REMOVED***BY***REMOVED***ordinal_position;

--***REMOVED***3.***REMOVED***Check***REMOVED***dynasty_creation_tokens***REMOVED***table***REMOVED***structure***REMOVED***(if***REMOVED***exists)
SELECT***REMOVED***column_name,***REMOVED***data_type,***REMOVED***is_nullable,***REMOVED***column_default
FROM***REMOVED***information_schema.columns
WHERE***REMOVED***table_name***REMOVED***=***REMOVED***'dynasty_creation_tokens'
AND***REMOVED***table_schema***REMOVED***=***REMOVED***'public'
ORDER***REMOVED***BY***REMOVED***ordinal_position;

--***REMOVED***4.***REMOVED***Check***REMOVED***dynasties***REMOVED***table***REMOVED***structure***REMOVED***(if***REMOVED***exists)
SELECT***REMOVED***column_name,***REMOVED***data_type,***REMOVED***is_nullable,***REMOVED***column_default
FROM***REMOVED***information_schema.columns
WHERE***REMOVED***table_name***REMOVED***=***REMOVED***'dynasties'
AND***REMOVED***table_schema***REMOVED***=***REMOVED***'public'
ORDER***REMOVED***BY***REMOVED***ordinal_position;

--***REMOVED***5.***REMOVED***Check***REMOVED***if***REMOVED***dynasty_creation_tokens***REMOVED***table***REMOVED***exists
SELECT***REMOVED***EXISTS***REMOVED***(
***REMOVED******REMOVED***SELECT***REMOVED***FROM***REMOVED***information_schema.tables
***REMOVED******REMOVED***WHERE***REMOVED***table_schema***REMOVED***=***REMOVED***'public'
***REMOVED******REMOVED***AND***REMOVED***table_name***REMOVED***=***REMOVED***'dynasty_creation_tokens'
)***REMOVED***as***REMOVED***table_exists;
