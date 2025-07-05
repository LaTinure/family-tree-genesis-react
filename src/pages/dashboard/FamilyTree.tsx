
import DashboardLayout from '@/components/layout/DashboardLayout';
import { EnhancedFamilyTree } from '@/components/family/EnhancedFamilyTree';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TreePine, Users, Crown, Heart } from 'lucide-react';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';

const FamilyTree = () => {
  const { members, isLoading } = useFamilyMembers();

  const stats = {
    totalMembers: members.length,
    patriarchs: members.filter(m => m.is_patriarch).length,
    generations: Math.max(...members.map(m => {
      let level = 0;
      if (m.father_id || m.mother_id) level = 1;
      return level;
    }), 0) + 1,
    connections: members.length * 2
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-800 flex items-center">
            <TreePine className="mr-4 h-10 w-10 text-green-600 drop-shadow-lg" />
            Arbre Généalogique Interactif
          </h1>
          <p className="text-green-700 mt-2 text-lg">
            🌳 Explorez les racines et les branches de votre famille de manière interactive
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Total des membres</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{stats.totalMembers}</div>
              <p className="text-xs text-green-600">Branches de l'arbre</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Générations</CardTitle>
              <TreePine className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{stats.generations}</div>
              <p className="text-xs text-green-600">Niveaux découverts</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Patriarches</CardTitle>
              <Crown className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{stats.patriarchs}</div>
              <p className="text-xs text-green-600">Racines de l'arbre</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Connexions</CardTitle>
              <Heart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{stats.connections}</div>
              <p className="text-xs text-green-600">Liens familiaux</p>
            </CardContent>
          </Card>
        </div>

        {/* Arbre généalogique interactif */}
        <Card className="border-green-200 bg-gradient-to-br from-white to-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <TreePine className="mr-2 h-5 w-5" />
              Arbre Généalogique Interactif
            </CardTitle>
            <CardDescription className="text-green-600">
              Explorez votre famille de manière interactive : zoom, déplacement, recherche et sélection des membres
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EnhancedFamilyTree />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FamilyTree;
