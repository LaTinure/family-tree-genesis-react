
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Users, Trash2, Shield, Activity, BarChart3 } from 'lucide-react';
import { api } from '@/services/api';
import { ProfileData } from '@/types/profile';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const { profile, signOut } = useAuth();
  const { toast } = useToast();
  const [members, setMembers] = useState<ProfileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!profile?.is_admin) {
      return;
    }

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
  }, [profile]);

  const handleDeleteAll = async () => {
    if (!confirm('⚠️ ATTENTION: Cette action supprimera TOUTES les données. Continuer ?')) {
      return;
    }

    if (!confirm('Dernière confirmation: Voulez-vous vraiment tout supprimer ?')) {
      return;
    }

    setIsDeleting(true);

    try {
      const { data, error } = await supabase.functions.invoke('delete-all-data', {
        method: 'POST'
      });

      if (error) throw error;

      toast({
        title: "Suppression réussie",
        description: "Toutes les données ont été supprimées.",
      });

      await signOut();
      window.location.reload();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!profile?.is_admin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
        <div className="container mx-auto text-center">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Accès refusé</h1>
          <p className="text-gray-600">Vous n'avez pas les permissions d'administration.</p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <Settings className="mr-3 h-8 w-8 text-green-600" />
            Administration
          </h1>
          <p className="text-gray-600 mt-2">
            Gérez les paramètres et les utilisateurs de votre application familiale
          </p>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Membres</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{members.length}</div>
              <p className="text-xs text-muted-foreground">
                Utilisateurs actifs
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Administrateurs</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {members.filter(m => m.is_admin).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Privilèges élevés
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patriarches</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {members.filter(m => m.is_patriarch).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Chefs de famille
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activité</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">100%</div>
              <p className="text-xs text-muted-foreground">
                Système opérationnel
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions d'administration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Gestion des Utilisateurs
              </CardTitle>
              <CardDescription>
                Administrez les comptes utilisateurs et leurs permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Promouvoir en admin
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Gérer les rôles
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="mr-2 h-4 w-4" />
                  Voir les logs
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Paramètres Système
              </CardTitle>
              <CardDescription>
                Configurez les paramètres globaux de l'application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Configuration générale
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Statistiques avancées
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="mr-2 h-4 w-4" />
                  Monitoring
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Zone de danger */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center">
              <Trash2 className="mr-2 h-5 w-5" />
              Zone de Danger
            </CardTitle>
            <CardDescription className="text-red-600">
              Actions irréversibles qui affectent tout le système
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-800 mb-2">
                Suppression complète des données
              </h3>
              <p className="text-red-600 text-sm mb-4">
                Cette action supprimera TOUTES les données de l'application, y compris tous les utilisateurs, 
                profils, et contenus. Cette action est IRRÉVERSIBLE.
              </p>
              <Button 
                variant="destructive" 
                onClick={handleDeleteAll}
                disabled={isDeleting}
                className="w-full md:w-auto"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Suppression en cours...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer toutes les données
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Liste des utilisateurs récents */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Utilisateurs Récents</CardTitle>
            <CardDescription>
              Derniers membres inscrits dans l'application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {members.slice(0, 5).map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">
                        {member.first_name?.[0]}{member.last_name?.[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{member.first_name} {member.last_name}</p>
                      <p className="text-sm text-gray-600">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {member.is_admin && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        Admin
                      </span>
                    )}
                    {member.is_patriarch && (
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        Patriarche
                      </span>
                    )}
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
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

export default Admin;
