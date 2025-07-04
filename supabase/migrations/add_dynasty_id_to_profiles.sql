--***REMOVED***Migration***REMOVED***pour***REMOVED***ajouter***REMOVED***la***REMOVED***colonne***REMOVED***dynasty_id***REMOVED***à***REMOVED***la***REMOVED***table***REMOVED***profiles
--***REMOVED***Date:***REMOVED***2024-01-XX

--***REMOVED***Vérifier***REMOVED***si***REMOVED***la***REMOVED***colonne***REMOVED***dynasty_id***REMOVED***existe***REMOVED***déjà
DO***REMOVED***$$
BEGIN
***REMOVED******REMOVED******REMOVED******REMOVED***--***REMOVED***Si***REMOVED***la***REMOVED***colonne***REMOVED***n'existe***REMOVED***pas,***REMOVED***la***REMOVED***créer
***REMOVED******REMOVED******REMOVED******REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***SELECT***REMOVED***1***REMOVED***FROM***REMOVED***information_schema.columns
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***WHERE***REMOVED***table_name***REMOVED***=***REMOVED***'profiles'***REMOVED***AND***REMOVED***column_name***REMOVED***=***REMOVED***'dynasty_id'
***REMOVED******REMOVED******REMOVED******REMOVED***)***REMOVED***THEN
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ALTER***REMOVED***TABLE***REMOVED***profiles***REMOVED***ADD***REMOVED***COLUMN***REMOVED***dynasty_id***REMOVED***UUID;
***REMOVED******REMOVED******REMOVED******REMOVED***END***REMOVED***IF;
END***REMOVED***$$;

--***REMOVED***Créer***REMOVED***un***REMOVED***index***REMOVED***sur***REMOVED***la***REMOVED***colonne***REMOVED***dynasty_id***REMOVED***pour***REMOVED***améliorer***REMOVED***les***REMOVED***performances
CREATE***REMOVED***INDEX***REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***idx_profiles_dynasty_id***REMOVED***ON***REMOVED***profiles(dynasty_id);

--***REMOVED***Ajouter***REMOVED***une***REMOVED***contrainte***REMOVED***de***REMOVED***clé***REMOVED***étrangère***REMOVED***vers***REMOVED***la***REMOVED***table***REMOVED***dynasties***REMOVED***(si***REMOVED***elle***REMOVED***existe)
DO***REMOVED***$$
BEGIN
***REMOVED******REMOVED******REMOVED******REMOVED***--***REMOVED***Vérifier***REMOVED***si***REMOVED***la***REMOVED***table***REMOVED***dynasties***REMOVED***existe
***REMOVED******REMOVED******REMOVED******REMOVED***IF***REMOVED***EXISTS***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***SELECT***REMOVED***1***REMOVED***FROM***REMOVED***information_schema.tables
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***WHERE***REMOVED***table_name***REMOVED***=***REMOVED***'dynasties'
***REMOVED******REMOVED******REMOVED******REMOVED***)***REMOVED***THEN
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***--***REMOVED***Ajouter***REMOVED***la***REMOVED***contrainte***REMOVED***de***REMOVED***clé***REMOVED***étrangère***REMOVED***si***REMOVED***elle***REMOVED***n'existe***REMOVED***pas***REMOVED***déjà
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***IF***REMOVED***NOT***REMOVED***EXISTS***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***SELECT***REMOVED***1***REMOVED***FROM***REMOVED***information_schema.table_constraints
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***WHERE***REMOVED***constraint_name***REMOVED***=***REMOVED***'profiles_dynasty_id_fkey'
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)***REMOVED***THEN
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ALTER***REMOVED***TABLE***REMOVED***profiles
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ADD***REMOVED***CONSTRAINT***REMOVED***profiles_dynasty_id_fkey
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***FOREIGN***REMOVED***KEY***REMOVED***(dynasty_id)***REMOVED***REFERENCES***REMOVED***dynasties(id)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ON***REMOVED***DELETE***REMOVED***SET***REMOVED***NULL;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***END***REMOVED***IF;
***REMOVED******REMOVED******REMOVED******REMOVED***END***REMOVED***IF;
END***REMOVED***$$;

--***REMOVED***Ajouter***REMOVED***un***REMOVED***commentaire***REMOVED***sur***REMOVED***la***REMOVED***colonne
COMMENT***REMOVED***ON***REMOVED***COLUMN***REMOVED***profiles.dynasty_id***REMOVED***IS***REMOVED***'ID***REMOVED***de***REMOVED***la***REMOVED***dynastie***REMOVED***à***REMOVED***laquelle***REMOVED***appartient***REMOVED***ce***REMOVED***profil';
