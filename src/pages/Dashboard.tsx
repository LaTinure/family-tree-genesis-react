import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/ui/stats-card';
import { FamilyTree } from '@/components/family/FamilyTree';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';
import { useAuth } from '@/hooks/useAuth';
import { formatRelationshipType } from '@/lib/utils';
import {
  Users,
  Crown,
  TreePine,
  UserPlus,
  MessageSquare,
  Calendar,
  Bell,
  Activity,
  TrendingUp,
  Shield,
  Database,
  RefreshCw
} from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';
import { FamilyStats } from '@/types/family';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { members, isLoading } = useFamilyMembers();
  const [stats, setStats] = useState<FamilyStats>({
    totalMembers: 0,
    totalGenerations: 0,
    totalPatriarchs: 0,
    totalAdmins: 0,
    recentMembers: [],
    pendingMembers: []
  });

  useEffect(() => {
    if (members.length > 0) {
      const patriarchs = members.filter(m => m.is_patriarch);
      const admins = members.filter(m => m.is_admin);
      const pending = members.filter(m => m.role === 'pending');
      const recent = members
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

      // Calculer les générations (simplifié)
      const generations = new Set(members.map(m => m.relationship_type)).size;

      setStats({
        totalMembers: members.length,
        totalGenerations: generations,
        totalPatriarchs: patriarchs.length,
        totalAdmins: admins.length,
        recentMembers: recent,
        pendingMembers: pending
      });
    }
  }, [members]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Tableau de Bord Familial
            </h1>
            <p className="text-lg text-gray-600">
              Bienvenue dans votre espace famille connecté
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate(ROUTES.DASHBOARD.INVITE)} className="bg-primary hover:bg-primary/90">
              <UserPlus className="w-4 h-4 mr-2" />
              Inviter un membre
            </Button>
            {user && (
              <Button variant="outline" onClick={() => navigate(ROUTES.PROFILE)}>
                <Shield className="w-4 h-4 mr-2" />
                Mon Profil
              </Button>
            )}
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Membres Total"
            value={stats.totalMembers}
            icon={Users}
            trend={{ value: 12, label: "ce mois" }}
          />
          <StatsCard
            title="Générations"
            value={stats.totalGenerations}
            icon={TreePine}
            trend={{ value: 0, label: "stable" }}
          />
          <StatsCard
            title="Patriarches"
            value={stats.totalPatriarchs}
            icon={Crown}
          />
          <StatsCard
            title="Administrateurs"
            value={stats.totalAdmins}
            icon={Shield}
          />
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Arbre familial */}
          <div className="lg:col-span-2">
            <FamilyTree />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Panel de Debug */}
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Database className="w-5 h-5" />
                  Debug - Membres
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">Membres: {members.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-green-500" />
                    )}
                    <span>{isLoading ? 'Chargement...' : 'Prêt'}</span>
                  </div>
                </div>

                {members.length > 0 ? (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    <h4 className="font-medium text-orange-800">Membres trouvés:</h4>
                    {members.map((member, index) => (
                      <div key={member.id} className="p-2 bg-white border border-orange-200 rounded text-sm">
                        <p className="font-medium">
                          {index + 1}. {member.first_name} {member.last_name}
                        </p>
                        <p className="text-xs text-gray-600">{member.email}</p>
                        <p className="text-xs">Rôle: {member.role} | Patriarche: {member.is_patriarch ? 'Oui' : 'Non'}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-2 text-orange-700 text-sm">
                    Aucun membre trouvé
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Membres récents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Membres Récents
                </CardTitle>
                <CardDescription>
                  Les derniers membres ajoutés à la famille
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.recentMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {member.photo_url ? (
                        <img
                          src={member.photo_url}
                          alt={`${member.first_name} ${member.last_name}`}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <Users className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {member.first_name} {member.last_name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {formatRelationshipType(member.relationship_type)}
                      </p>
                    </div>
                    {member.is_patriarch && (
                      <Crown className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* En attente de validation */}
            {stats.pendingMembers.length > 0 && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <Bell className="w-5 h-5" />
                    En Attente de Validation
                  </CardTitle>
                  <CardDescription className="text-orange-700">
                    {stats.pendingMembers.length} membre(s) en attente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {stats.pendingMembers.slice(0, 3).map((member) => (
                      <div key={member.id} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                        <span>{member.first_name} {member.last_name}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full border-orange-300 text-orange-800 hover:bg-orange-100"
                    onClick={() => navigate(ROUTES.DASHBOARD.ADMIN)}
                  >
                    Gérer les validations
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Actions Rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate(ROUTES.DASHBOARD.MEMBERS)}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Voir tous les membres
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate(ROUTES.DASHBOARD.MESSAGES)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Messages familiaux
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate(ROUTES.DASHBOARD.EVENTS)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Événements à venir
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
