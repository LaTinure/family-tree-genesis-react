
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatsCard } from '@/components/ui/stats-card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  Users, 
  Shield, 
  UserCheck, 
  UserX, 
  Search, 
  Filter,
  MoreHorizontal,
  Crown,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FamilyMember } from '@/types/family';

const Admin = () => {
  const { user, loading } = useAuth();
  const { members, isLoading, updateMember } = useFamilyMembers();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('pending');
  const [processingMembers, setProcessingMembers] = useState<Set<string>>(new Set());

  // Redirection si pas admin
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  // Filtrage des membres
  const pendingMembers = members.filter(m => m.role === 'pending');
  const activeMembers = members.filter(m => m.role === 'user' || m.role === 'admin');
  const adminMembers = members.filter(m => m.is_admin);

  const filteredMembers = (memberList: FamilyMember[]) => {
    return memberList.filter(member => 
      member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleMemberAction = async (
    memberId: string, 
    action: 'approve' | 'reject' | 'promote' | 'demote'
  ) => {
    if (processingMembers.has(memberId)) return;

    setProcessingMembers(prev => new Set([...prev, memberId]));

    try {
      let updateData: Partial<FamilyMember> = {};

      switch (action) {
        case 'approve':
          updateData = { role: 'user' };
          break;
        case 'reject':
          updateData = { role: 'pending' }; // ou supprimer le membre
          break;
        case 'promote':
          updateData = { is_admin: true, role: 'admin' };
          break;
        case 'demote':
          updateData = { is_admin: false, role: 'user' };
          break;
      }

      await updateMember(memberId, updateData);
      
      toast({
        title: 'Succès',
        description: `Action effectuée avec succès`,
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'opération',
        variant: 'destructive',
      });
    } finally {
      setProcessingMembers(prev => {
        const newSet = new Set(prev);
        newSet.delete(memberId);
        return newSet;
      });
    }
  };

  const MemberCard = ({ member, actions }: { member: FamilyMember; actions: React.ReactNode }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
              {member.first_name[0]}{member.last_name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">
                  {member.first_name} {member.last_name}
                </h3>
                {member.is_patriarch && <Crown className="w-4 h-4 text-yellow-500" />}
                {member.is_admin && <Shield className="w-4 h-4 text-blue-500" />}
              </div>
              <p className="text-sm text-gray-600">{member.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {member.relationship_type}
                </Badge>
                <Badge 
                  variant={
                    member.role === 'pending' ? 'destructive' : 
                    member.role === 'admin' ? 'default' : 'secondary'
                  }
                  className="text-xs"
                >
                  {member.role}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {actions}
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
              Administration Familiale
            </h1>
            <p className="text-lg text-gray-600">
              Gérez les membres, validations et paramètres de la famille
            </p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Membres en attente"
            value={pendingMembers.length}
            icon={AlertTriangle}
            className={pendingMembers.length > 0 ? "border-orange-200 bg-orange-50" : ""}
          />
          <StatsCard
            title="Membres actifs"
            value={activeMembers.length}
            icon={Users}
          />
          <StatsCard
            title="Administrateurs"
            value={adminMembers.length}
            icon={Shield}
          />
          <StatsCard
            title="Total membres"
            value={members.length}
            icon={UserCheck}
          />
        </div>

        {/* Interface de gestion */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Gestion des Membres</CardTitle>
                <CardDescription>
                  Validez les nouveaux membres et gérez les permissions
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher un membre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending" className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  En attente ({pendingMembers.length})
                </TabsTrigger>
                <TabsTrigger value="active" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Membres actifs ({activeMembers.length})
                </TabsTrigger>
                <TabsTrigger value="admins" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Administrateurs ({adminMembers.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4 mt-6">
                {filteredMembers(pendingMembers).length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Aucun membre en attente
                    </h3>
                    <p className="text-gray-600">
                      Toutes les demandes ont été traitées.
                    </p>
                  </div>
                ) : (
                  filteredMembers(pendingMembers).map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      actions={
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleMemberAction(member.id, 'approve')}
                            disabled={processingMembers.has(member.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {processingMembers.has(member.id) ? (
                              <LoadingSpinner size="sm" />
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approuver
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleMemberAction(member.id, 'reject')}
                            disabled={processingMembers.has(member.id)}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Rejeter
                          </Button>
                        </div>
                      }
                    />
                  ))
                )}
              </TabsContent>

              <TabsContent value="active" className="space-y-4 mt-6">
                {filteredMembers(activeMembers).map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    actions={
                      <div className="flex gap-2">
                        {!member.is_admin && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMemberAction(member.id, 'promote')}
                            disabled={processingMembers.has(member.id)}
                          >
                            <Shield className="w-4 h-4 mr-1" />
                            Promouvoir admin
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    }
                  />
                ))}
              </TabsContent>

              <TabsContent value="admins" className="space-y-4 mt-6">
                {filteredMembers(adminMembers).map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    actions={
                      <div className="flex gap-2">
                        {!member.is_patriarch && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMemberAction(member.id, 'demote')}
                            disabled={processingMembers.has(member.id)}
                          >
                            <UserX className="w-4 h-4 mr-1" />
                            Rétrograder
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    }
                  />
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
