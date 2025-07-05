--***REMOVED***Check***REMOVED***dynasty_creation_tokens***REMOVED***table***REMOVED***structure
--***REMOVED***Run***REMOVED***this***REMOVED***in***REMOVED***Supabase***REMOVED***SQL***REMOVED***Editor

--***REMOVED***1.***REMOVED***Check***REMOVED***if***REMOVED***the***REMOVED***table***REMOVED***exists
SELECT***REMOVED***EXISTS***REMOVED***(
***REMOVED******REMOVED***SELECT***REMOVED***FROM***REMOVED***information_schema.tables
***REMOVED******REMOVED***WHERE***REMOVED***table_schema***REMOVED***=***REMOVED***'public'
***REMOVED******REMOVED***AND***REMOVED***table_name***REMOVED***=***REMOVED***'dynasty_creation_tokens'
)***REMOVED***as***REMOVED***table_exists;

--***REMOVED***2.***REMOVED***Show***REMOVED***exact***REMOVED***table***REMOVED***structure
SELECT
***REMOVED******REMOVED***column_name,
***REMOVED******REMOVED***data_type,
***REMOVED******REMOVED***is_nullable,
***REMOVED******REMOVED***column_default,
***REMOVED******REMOVED***ordinal_position
FROM***REMOVED***information_schema.columns
WHERE***REMOVED***table_name***REMOVED***=***REMOVED***'dynasty_creation_tokens'
AND***REMOVED***table_schema***REMOVED***=***REMOVED***'public'
ORDER***REMOVED***BY***REMOVED***ordinal_position;

--***REMOVED***3.***REMOVED***Show***REMOVED***sample***REMOVED***data***REMOVED***(if***REMOVED***any***REMOVED***exists)
SELECT***REMOVED*******REMOVED***FROM***REMOVED***dynasty_creation_tokens***REMOVED***LIMIT***REMOVED***5;

--***REMOVED***4.***REMOVED***Check***REMOVED***table***REMOVED***constraints
SELECT
***REMOVED******REMOVED***constraint_name,
***REMOVED******REMOVED***constraint_type,
***REMOVED******REMOVED***table_name
FROM***REMOVED***information_schema.table_constraints
WHERE***REMOVED***table_name***REMOVED***=***REMOVED***'dynasty_creation_tokens'
AND***REMOVED***table_schema***REMOVED***=***REMOVED***'public';

--***REMOVED***5.***REMOVED***Check***REMOVED***if***REMOVED***we***REMOVED***need***REMOVED***to***REMOVED***recreate***REMOVED***the***REMOVED***table
SELECT***REMOVED***'Current***REMOVED***table***REMOVED***structure:'***REMOVED***as***REMOVED***info;
