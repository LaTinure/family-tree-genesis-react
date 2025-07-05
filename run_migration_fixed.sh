#!/bin/bash

# Script pour exécuter la migration Supabase corrigée
echo "🚀 Exécution de la migration corrigée pour le champ role..."

# Vérifier si supabase CLI est installé
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI n'est pas installé. Veuillez l'installer d'abord."
    echo "📦 Installation: npm install -g supabase"
    exit 1
fi

# Exécuter la migration
echo "📝 Application de la migration corrigée..."
supabase db push

if [ $? -eq 0 ]; then
    echo "✅ Migration appliquée avec succès !"
    echo "🎉 Le champ 'role' a été mis à jour dans la table 'profiles'"
    echo "📊 Les rôles disponibles: 'Membre' ou 'Administrateur'"
    echo "🔧 Contraintes mises à jour pour éviter les conflits"
else
    echo "❌ Erreur lors de l'application de la migration"
    echo "💡 Essayez de supprimer manuellement la contrainte existante si nécessaire"
    exit 1
fi
