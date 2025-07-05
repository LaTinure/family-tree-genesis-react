import***REMOVED***{***REMOVED***createClient***REMOVED***}***REMOVED***from***REMOVED***'@supabase/supabase-js';
import***REMOVED***type***REMOVED***{***REMOVED***Database***REMOVED***}***REMOVED***from***REMOVED***'@/integrations/supabase/types';

const***REMOVED***SUPABASE_URL***REMOVED***=***REMOVED***"https://aaxfvyorhasbwlaovrdf.supabase.co";
const***REMOVED***SUPABASE_PUBLISHABLE_KEY***REMOVED***=***REMOVED***"***REMOVED***";

export***REMOVED***const***REMOVED***supabase***REMOVED***=***REMOVED***createClient<Database>(SUPABASE_URL,***REMOVED***SUPABASE_PUBLISHABLE_KEY);
