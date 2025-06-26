#!/bin/bash

#***REMOVED***Script***REMOVED***pour***REMOVED***exécuter***REMOVED***la***REMOVED***migration***REMOVED***Supabase
echo***REMOVED***"🚀***REMOVED***Exécution***REMOVED***de***REMOVED***la***REMOVED***migration***REMOVED***pour***REMOVED***ajouter***REMOVED***le***REMOVED***champ***REMOVED***role..."

#***REMOVED***Vérifier***REMOVED***si***REMOVED***supabase***REMOVED***CLI***REMOVED***est***REMOVED***installé
if***REMOVED***!***REMOVED***command***REMOVED***-v***REMOVED***supabase***REMOVED***&>***REMOVED***/dev/null;***REMOVED***then
***REMOVED******REMOVED******REMOVED******REMOVED***echo***REMOVED***"❌***REMOVED***Supabase***REMOVED***CLI***REMOVED***n'est***REMOVED***pas***REMOVED***installé.***REMOVED***Veuillez***REMOVED***l'installer***REMOVED***d'abord."
***REMOVED******REMOVED******REMOVED******REMOVED***echo***REMOVED***"📦***REMOVED***Installation:***REMOVED***npm***REMOVED***install***REMOVED***-g***REMOVED***supabase"
***REMOVED******REMOVED******REMOVED******REMOVED***exit***REMOVED***1
fi

#***REMOVED***Exécuter***REMOVED***la***REMOVED***migration
echo***REMOVED***"📝***REMOVED***Application***REMOVED***de***REMOVED***la***REMOVED***migration..."
supabase***REMOVED***db***REMOVED***push

if***REMOVED***[***REMOVED***$?***REMOVED***-eq***REMOVED***0***REMOVED***];***REMOVED***then
***REMOVED******REMOVED******REMOVED******REMOVED***echo***REMOVED***"✅***REMOVED***Migration***REMOVED***appliquée***REMOVED***avec***REMOVED***succès***REMOVED***!"
***REMOVED******REMOVED******REMOVED******REMOVED***echo***REMOVED***"🎉***REMOVED***Le***REMOVED***champ***REMOVED***'role'***REMOVED***a***REMOVED***été***REMOVED***ajouté***REMOVED***à***REMOVED***la***REMOVED***table***REMOVED***'profiles'"
***REMOVED******REMOVED******REMOVED******REMOVED***echo***REMOVED***"📊***REMOVED***Les***REMOVED***rôles***REMOVED***disponibles:***REMOVED***'Simple***REMOVED***Membre'***REMOVED***ou***REMOVED***'Patriarche'"
else
***REMOVED******REMOVED******REMOVED******REMOVED***echo***REMOVED***"❌***REMOVED***Erreur***REMOVED***lors***REMOVED***de***REMOVED***l'application***REMOVED***de***REMOVED***la***REMOVED***migration"
***REMOVED******REMOVED******REMOVED******REMOVED***exit***REMOVED***1
fi
