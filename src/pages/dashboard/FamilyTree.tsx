
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TreePine, Users, Plus, Search } from 'lucide-react';
import { api } from '@/services/api';
import { ProfileData } from '@/types/profile';
import { UserAvatar } from '@/components/shared/UserAvatar';

const FamilyTree = () => {
  const { profile } = useAuth();
  const [members, setMembers] = useState<ProfileData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await api.profiles.getAll();
        setMembers(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des membres:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <TreePine className="mr-3 h-8 w-8 text-green-600" />
                Arbre Généalogique
              </h1>
              <p className="text-gray-600 mt-2">
                Visualisez et explorez les relations familiales
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter membre
              </Button>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total des membres</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{members.length}</div>
              <p className="text-xs text-muted-foreground">
                Dans la famille
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Générations</CardTitle>
              <TreePine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Niveaux découverts
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patriarche</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                Chef de famille
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Arbre simplifié */}
        <Card>
          <CardHeader>
            <CardTitle>Vue d'ensemble de la famille</CardTitle>
            <CardDescription>
              Représentation simplifiée de l'arbre généalogique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((member) => (
                <div key={member.id} className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <UserAvatar
                      user={{
                        first_name: member.first_name,
                        last_name: member.last_name,
                        avatar_url: member.avatar_url,
                        photo_url: member.photo_url,
                      }}
                      size="md"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {member.first_name} {member.last_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {member.title || member.relationship_type}
                      </p>
                      {member.is_patriarch && (
                        <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full mt-1">
                          Patriarche
                        </span>
                      )}
                      {member.is_admin && (
                        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mt-1 ml-2">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-500">
                    {member.current_location && (
                      <p>📍 {member.current_location}</p>
                    )}
                    {member.profession && (
                      <p>💼 {member.profession}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FamilyTree;
