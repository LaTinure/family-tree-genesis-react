#!/bin/bash

echo "---- Git Routine ----"
echo "1. Sauvegarde locale (optionnel)"
git stash

echo "2. Met à jour depuis le dépôt distant avec rebase"
git pull --rebase

echo "3. Liste des fichiers modifiés"
git status

echo "4. Ajouter tous les fichiers modifiés"
git add .

read -p "Entrer un message de commit : " msg
git commit -m "$msg"

echo "5. Envoi vers le dépôt distant"
git push

echo "✅ Terminé."
