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
import { UserAvatar } from '@/components/shared/UserAvatar';
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
  Shield
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
      <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 to-white flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 to-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-whatsapp-800 mb-2">
              Tableau de Bord Familial
            </h1>
            <p className="text-lg text-whatsapp-600">
              Bienvenue dans votre espace famille connecté
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate(ROUTES.DASHBOARD.INVITE)} className="bg-whatsapp-600 hover:bg-whatsapp-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Inviter un membre
            </Button>
            {user && (
              <Button variant="outline" onClick={() => navigate(ROUTES.PROFILE)} className="border-whatsapp-300 text-whatsapp-700 hover:bg-whatsapp-50">
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
            {/* Membres récents */}
            <Card className="border-whatsapp-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-whatsapp-700">
                  <Activity className="w-5 h-5" />
                  Membres Récents
                </CardTitle>
                <CardDescription>
                  Les derniers membres ajoutés à la famille
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.recentMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg bg-whatsapp-50 hover:bg-whatsapp-100 transition-colors border border-whatsapp-100">
                    <UserAvatar
                      user={{
                        first_name: member.first_name,
                        last_name: member.last_name,
                        photo_url: member.photo_url,
                        avatar_url: member.avatar_url,
                      }}
                      size="sm"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-whatsapp-800">
                        {member.first_name} {member.last_name}
                      </p>
                      <p className="text-xs text-whatsapp-600">
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
                        <UserAvatar
                          user={{
                            first_name: member.first_name,
                            last_name: member.last_name,
                            photo_url: member.photo_url,
                          }}
                          size="sm"
                        />
                        <span className="text-orange-800">{member.first_name} {member.last_name}</span>
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
            <Card className="border-whatsapp-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-whatsapp-700">
                  <TrendingUp className="w-5 h-5" />
                  Actions Rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-whatsapp-300 text-whatsapp-700 hover:bg-whatsapp-50"
                  onClick={() => navigate(ROUTES.DASHBOARD.MEMBERS)}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Voir tous les membres
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-whatsapp-300 text-whatsapp-700 hover:bg-whatsapp-50"
                  onClick={() => navigate(ROUTES.DASHBOARD.MESSAGES)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Messages familiaux
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-whatsapp-300 text-whatsapp-700 hover:bg-whatsapp-50"
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
