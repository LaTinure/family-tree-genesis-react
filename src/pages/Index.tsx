import React, { useState } from 'react';
import { TreePine, Crown, Users, Heart, Trash2 } from 'lucide-react';
import { FamilyRegisterForm } from '@/components/family/FamilyRegisterForm';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDeleteAll = async () => {
    if (!confirm('⚠️ ATTENTION: Cette action supprimera TOUTES les données de la base de données (tous les profils, utilisateurs, etc.). Cette action est IRRÉVERSIBLE. Êtes-vous sûr de vouloir continuer ?')) {
      return;
    }

    if (!confirm('Dernière confirmation: Voulez-vous vraiment supprimer TOUTES les données ? Cette action ne peut pas être annulée.')) {
      return;
    }

    setIsDeleting(true);

    try {
      const { data, error } = await supabase.functions.invoke('delete-all-data', {
        method: 'POST'
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Suppression réussie",
        description: "Toutes les données ont été supprimées avec succès.",
      });

      // Déconnecter l'utilisateur actuel s'il y en a un
      await supabase.auth.signOut();
      
      // Recharger la page pour refléter les changements
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression des données.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <TreePine className="w-16 h-16 text-green-600 mr-4" />
            <div>
              <h1 className="text-5xl font-bold patriarch-text-gradient mb-2">
                Arbre Généalogique
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                Créez et préservez l'histoire de votre famille
              </p>
              
              {/* Bouton Delete All */}
              <Button
                onClick={handleDeleteAll}
                disabled={isDeleting}
                variant="destructive"
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Suppression...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete All
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Information */}
          <div className="space-y-8 animate-fade-in">
            <div className="family-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <TreePine className="w-6 h-6 text-green-600 mr-2" />
                Pourquoi créer votre arbre familial ?
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Crown className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Préservez votre héritage</h3>
                    <p className="text-gray-600 text-sm">
                      Conservez l'histoire, les traditions et les souvenirs de votre famille pour les générations futures.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Connectez votre famille</h3>
                    <p className="text-gray-600 text-sm">
                      Renforcez les liens familiaux en partageant des histoires, photos et souvenirs.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Heart className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Découvrez vos racines</h3>
                    <p className="text-gray-600 text-sm">
                      Explorez votre histoire familiale et découvrez des connexions que vous n'aviez jamais imaginées.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="family-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                ✨ Fonctionnalités
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Arbre généalogique interactif
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Gestion des photos et souvenirs
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Système de rôles (Patriarche/Matriarche)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  Historique familial détaillé
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="animate-fade-in">
            <div className="family-card p-8 rounded-xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Rejoignez votre famille
                </h2>
                <p className="text-gray-600">
                  Créez votre profil et commencez à construire votre arbre généalogique
                </p>
              </div>
              
              <FamilyRegisterForm />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 opacity-75">
          <p className="text-gray-500 text-sm">
            © 2024 Arbre Généalogique Familial - Préservez votre héritage pour les générations futures
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
