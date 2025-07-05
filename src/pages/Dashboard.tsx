
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { familyApi } from '@/services/api';
import { FamilyMember } from '@/types/family';
import { 
  Users, 
  TreePine, 
  UserPlus, 
  Crown, 
  Shield, 
  Calendar,
  MessageSquare,
  Bell,
  TrendingUp,
  Activity
} from 'lucide-react';

interface FamilyStats {
  total_members: number;
  active_members: number;
  pending_invitations: number;
  upcoming_events: number;
  recent_messages: number;
  totalGenerations: number;
  totalPatriarchs: number;
  totalAdmins: number;
  recentMembers: FamilyMember[];
  pendingMembers: FamilyMember[];
}

const Dashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<FamilyStats>({
    total_members: 0,
    active_members: 0,
    pending_invitations: 0,
    upcoming_events: 0,
    recent_messages: 0,
    totalGenerations: 0,
    totalPatriarchs: 0,
    totalAdmins: 0,
    recentMembers: [],
    pendingMembers: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const members = await familyApi.getAll();
        
        const totalMembers = members.length;
        const totalGenerations = new Set(members.map(m => m.birth_date?.substring(0, 4) || '0')).size;
        const totalPatriarchs = members.filter(m => m.is_patriarch).length;
        const totalAdmins = members.filter(m => m.is_admin).length;
        
        // Filter recent members (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentMembers = members.filter(m => 
          new Date(m.created_at) > thirtyDaysAgo
        );
        
        // Note: Since we don't have pending status in the current schema,
        // we'll use an empty array for now
        const pendingMembers: FamilyMember[] = [];

        setStats({
          total_members: totalMembers,
          active_members: totalMembers,
          pending_invitations: pendingMembers.length,
          upcoming_events: 0, // Placeholder
          recent_messages: 0, // Placeholder
          totalGenerations,
          totalPatriarchs,
          totalAdmins,
          recentMembers,
          pendingMembers
        });
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    {
      title: 'Voir l\'arbre généalogique',
      description: 'Explorez votre arbre familial',
      icon: TreePine,
      action: () => navigate('/dashboard/tree'),
      color: 'bg-green-100 text-green-700'
    },
    {
      title: 'Gérer les membres',
      description: 'Ajouter ou modifier des membres',
      icon: Users,
      action: () => navigate('/dashboard/members'),
      color: 'bg-blue-100 text-blue-700'
    },
    {
      title: 'Inviter un membre',
      description: 'Inviter de nouveaux membres',
      icon: UserPlus,
      action: () => navigate('/dashboard/invite'),
      color: 'bg-purple-100 text-purple-700'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-whatsapp-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-whatsapp-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 to-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* En-tête de bienvenue */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-whatsapp-800 mb-2">
            Bienvenue, {profile?.first_name} !
          </h1>
          <p className="text-lg text-whatsapp-600">
            Tableau de bord de votre famille
          </p>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Membres</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_members}</div>
              <p className="text-xs text-muted-foreground">
                +{stats.recentMembers.length} ce mois
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Générations</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalGenerations}</div>
              <p className="text-xs text-muted-foreground">
                Différentes générations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Administrateurs</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAdmins}</div>
              <p className="text-xs text-muted-foreground">
                Membres actifs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patriarches</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPatriarchs}</div>
              <p className="text-xs text-muted-foreground">
                Leaders familiaux
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={action.action}>
              <CardHeader>
                <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mb-4`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Membres récents */}
        {stats.recentMembers.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Nouveaux Membres
              </CardTitle>
              <CardDescription>
                Membres ajoutés récemment à votre famille
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentMembers.slice(0, 5).map((member) => (
                  <div key={member.id} className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-whatsapp-100 flex items-center justify-center">
                      <span className="text-whatsapp-700 font-medium">
                        {member.first_name.charAt(0)}{member.last_name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{member.first_name} {member.last_name}</p>
                      <p className="text-sm text-gray-500">{member.relationship_type}</p>
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(member.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
