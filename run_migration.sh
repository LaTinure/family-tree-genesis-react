#!/bin/bash

# Script pour exécuter la migration Supabase
echo "🚀 Exécution de la migration pour ajouter le champ role..."

# Vérifier si supabase CLI est installé
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI n'est pas installé. Veuillez l'installer d'abord."
    echo "📦 Installation: npm install -g supabase"
    exit 1
fi

# Exécuter la migration
echo "📝 Application de la migration..."
supabase db push

if [ $? -eq 0 ]; then
    echo "✅ Migration appliquée avec succès !"
    echo "🎉 Le champ 'role' a été ajouté à la table 'profiles'"
    echo "📊 Les rôles disponibles: 'Simple Membre' ou 'Patriarche'"
else
    echo "❌ Erreur lors de l'application de la migration"
    exit 1
fi
