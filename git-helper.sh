#!/bin/bash

echo***REMOVED***"----***REMOVED***Git***REMOVED***Routine***REMOVED***----"
echo***REMOVED***"1.***REMOVED***Sauvegarde***REMOVED***locale***REMOVED***(optionnel)"
git***REMOVED***stash

echo***REMOVED***"2.***REMOVED***Met***REMOVED***à***REMOVED***jour***REMOVED***depuis***REMOVED***le***REMOVED***dépôt***REMOVED***distant***REMOVED***avec***REMOVED***rebase"
git***REMOVED***pull***REMOVED***--rebase

echo***REMOVED***"3.***REMOVED***Liste***REMOVED***des***REMOVED***fichiers***REMOVED***modifiés"
git***REMOVED***status

echo***REMOVED***"4.***REMOVED***Ajouter***REMOVED***tous***REMOVED***les***REMOVED***fichiers***REMOVED***modifiés"
git***REMOVED***add***REMOVED***.

read***REMOVED***-p***REMOVED***"Entrer***REMOVED***un***REMOVED***message***REMOVED***de***REMOVED***commit***REMOVED***:***REMOVED***"***REMOVED***msg
git***REMOVED***commit***REMOVED***-m***REMOVED***"$msg"

echo***REMOVED***"5.***REMOVED***Envoi***REMOVED***vers***REMOVED***le***REMOVED***dépôt***REMOVED***distant"
git***REMOVED***push

echo***REMOVED***"✅***REMOVED***Terminé."
