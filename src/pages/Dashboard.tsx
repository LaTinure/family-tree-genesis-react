
import React from 'react';
import { Crown, Users, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TreePine className="w-12 h-12 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold patriarch-text-gradient">
              Arbre Généalogique Familial
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Bienvenue dans votre espace famille
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="family-card p-6 rounded-xl text-center">
            <Crown className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-800">Patriarche/Matriarche</h3>
            <p className="text-2xl font-bold text-yellow-600">1</p>
          </div>
          
          <div className="family-card p-6 rounded-xl text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-800">Membres</h3>
            <p className="text-2xl font-bold text-blue-600">1</p>
          </div>
          
          <div className="family-card p-6 rounded-xl text-center">
            <TreePine className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-800">Générations</h3>
            <p className="text-2xl font-bold text-green-600">1</p>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="family-card p-8 rounded-xl text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🎉 Félicitations !
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Votre profil a été créé avec succès. Vous êtes maintenant la racine de l'arbre familial !
          </p>
          <div className="patriarch-badge inline-block">
            <Crown className="w-4 h-4 inline mr-2" />
            Racine de l'Arbre Familial
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <TreePine className="w-5 h-5 mr-2" />
            Voir l'arbre familial
          </Button>
          
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Users className="w-5 h-5 mr-2" />
            Inviter des membres
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
