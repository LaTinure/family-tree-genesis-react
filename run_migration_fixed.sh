#!/bin/bash

#***REMOVED***Script***REMOVED***pour***REMOVED***exécuter***REMOVED***la***REMOVED***migration***REMOVED***Supabase***REMOVED***corrigée
echo***REMOVED***"🚀***REMOVED***Exécution***REMOVED***de***REMOVED***la***REMOVED***migration***REMOVED***corrigée***REMOVED***pour***REMOVED***le***REMOVED***champ***REMOVED***role..."

#***REMOVED***Vérifier***REMOVED***si***REMOVED***supabase***REMOVED***CLI***REMOVED***est***REMOVED***installé
if***REMOVED***!***REMOVED***command***REMOVED***-v***REMOVED***supabase***REMOVED***&>***REMOVED***/dev/null;***REMOVED***then
***REMOVED******REMOVED******REMOVED******REMOVED***echo***REMOVED***"❌***REMOVED***Supabase***REMOVED***CLI***REMOVED***n'est***REMOVED***pas***REMOVED***installé.***REMOVED***Veuillez***REMOVED***l'installer***REMOVED***d'abord."
***REMOVED******REMOVED******REMOVED******REMOVED***echo***REMOVED***"📦***REMOVED***Installation:***REMOVED***npm***REMOVED***install***REMOVED***-g***REMOVED***supabase"
***REMOVED******REMOVED******REMOVED******REMOVED***exit***REMOVED***1
fi

#***REMOVED***Exécuter***REMOVED***la***REMOVED***migration
echo***REMOVED***"📝***REMOVED***Application***REMOVED***de***REMOVED***la***REMOVED***migration***REMOVED***corrigée..."
supabase***REMOVED***db***REMOVED***push

if***REMOVED***[***REMOVED***$?***REMOVED***-eq***REMOVED***0***REMOVED***];***REMOVED***then
***REMOVED******REMOVED******REMOVED******REMOVED***echo***REMOVED***"✅***REMOVED***Migration***REMOVED***appliquée***REMOVED***avec***REMOVED***succès***REMOVED***!"
***REMOVED******REMOVED******REMOVED******REMOVED***echo***REMOVED***"🎉***REMOVED***Le***REMOVED***champ***REMOVED***'role'***REMOVED***a***REMOVED***été***REMOVED***mis***REMOVED***à***REMOVED***jour***REMOVED***dans***REMOVED***la***REMOVED***table***REMOVED***'profiles'"
***REMOVED******REMOVED******REMOVED******REMOVED***echo***REMOVED***"📊***REMOVED***Les***REMOVED***rôles***REMOVED***disponibles:***REMOVED***'Membre'***REMOVED***ou***REMOVED***'Administrateur'"
***REMOVED******REMOVED******REMOVED******REMOVED***echo***REMOVED***"🔧***REMOVED***Contraintes***REMOVED***mises***REMOVED***à***REMOVED***jour***REMOVED***pour***REMOVED***éviter***REMOVED***les***REMOVED***conflits"
else
***REMOVED******REMOVED******REMOVED******REMOVED***echo***REMOVED***"❌***REMOVED***Erreur***REMOVED***lors***REMOVED***de***REMOVED***l'application***REMOVED***de***REMOVED***la***REMOVED***migration"
***REMOVED******REMOVED******REMOVED******REMOVED***echo***REMOVED***"💡***REMOVED***Essayez***REMOVED***de***REMOVED***supprimer***REMOVED***manuellement***REMOVED***la***REMOVED***contrainte***REMOVED***existante***REMOVED***si***REMOVED***nécessaire"
***REMOVED******REMOVED******REMOVED******REMOVED***exit***REMOVED***1
fi
