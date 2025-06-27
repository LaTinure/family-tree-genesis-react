import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TreePine, Users, Plus, Search, Leaf, Crown, Heart, GitBranch } from 'lucide-react';
import { api } from '@/services/api';
import { FamilyMember } from '@/types/family';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { motion } from 'framer-motion';

const FamilyTree = () => {
  const { profile } = useAuth();
  const [members, setMembers] = useState<FamilyMember[]>([]);
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
        <div className="text-center">Chargement de l'arbre généalogique...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="container mx-auto">
        {/* En-tête avec thème arbre */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-green-800 flex items-center">
                <TreePine className="mr-4 h-10 w-10 text-green-600 drop-shadow-lg" />
                Arbre Généalogique
                <motion.div
                  className="ml-2"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Leaf className="h-6 w-6 text-green-500" />
                </motion.div>
              </h1>
              <p className="text-green-700 mt-2 text-lg">
                🌳 Explorez les racines et les branches de votre famille
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                <Search className="w-4 h-4 mr-2" />
                Explorer
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle branche
              </Button>
            </div>
          </div>
        </div>

        {/* Statistiques avec thème arbre */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Total des membres</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{members.length}</div>
              <p className="text-xs text-green-600">
                Branches de l'arbre
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Générations</CardTitle>
              <GitBranch className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">3</div>
              <p className="text-xs text-green-600">
                Niveaux découverts
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Patriarche</CardTitle>
              <Crown className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">1</div>
              <p className="text-xs text-green-600">
                Racine de l'arbre
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Connexions</CardTitle>
              <Heart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{members.length * 2}</div>
              <p className="text-xs text-green-600">
                Liens familiaux
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Visualisation de l'arbre */}
        <Card className="border-green-200 bg-gradient-to-br from-white to-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <TreePine className="mr-2 h-5 w-5" />
              Vue d'ensemble de l'arbre généalogique
            </CardTitle>
            <CardDescription className="text-green-600">
              Représentation visuelle des relations familiales et des générations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <div key={member.id} className="p-4 border-2 border-green-200 rounded-lg bg-gradient-to-br from-white to-green-50 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <UserAvatar
                        user={{
                          first_name: member.first_name,
                          last_name: member.last_name,
                          avatar_url: member.avatar_url,
                          photo_url: member.photo_url,
                        }}
                        size="md"
                      />
                      {member.is_patriarch && (
                        <div className="absolute -top-1 -right-1">
                          <Crown className="h-4 w-4 text-yellow-500 fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-800">
                        {member.first_name} {member.last_name}
                      </h3>
                      <p className="text-sm text-green-600">
                        {member.relationship_type}
                      </p>
                      {member.is_patriarch && (
                        <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full mt-1 border border-yellow-300">
                          🌳 Patriarche
                        </span>
                      )}
                      {member.is_admin && (
                        <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full mt-1 ml-2 border border-green-300">
                          👑 Admin
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-green-600 space-y-1">
                    {member.current_location && (
                      <p className="flex items-center">
                        <span className="mr-1">📍</span> {member.current_location}
                      </p>
                    )}
                    {member.profession && (
                      <p className="flex items-center">
                        <span className="mr-1">💼</span> {member.profession}
                      </p>
                    )}
                    {member.birth_date && (
                      <p className="flex items-center">
                        <span className="mr-1">🎂</span> {new Date(member.birth_date).getFullYear()}
                      </p>
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
