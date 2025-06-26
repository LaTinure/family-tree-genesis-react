import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';
import { formatRelationshipType } from '@/lib/utils';
import {
  Users,
  Plus,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  UserPlus,
  Edit,
  Trash2,
  Crown,
  Shield,
  Eye
} from 'lucide-react';
import { api } from '@/services/api';
import { FamilyMember } from '@/types/family';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ROUTES } from '@/lib/constants/routes';

const Members = () => {
  const { profile } = useAuth();
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await api.profiles.getAll();
        setMembers(data);
        setFilteredMembers(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des membres:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const filtered = members.filter(member =>
      `${member.first_name} ${member.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.profession && member.profession.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredMembers(filtered);
  }, [searchTerm, members]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête avec thème famille */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Users className="mr-3 h-8 w-8 text-whatsapp-600" />
              Membres de la Famille
            </h1>
            <p className="text-gray-600 mt-2">
              Gérez et consultez tous les membres de votre famille
            </p>
          </div>
          <Button className="bg-whatsapp-600 hover:bg-whatsapp-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Inviter un membre
          </Button>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un membre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="border-whatsapp-600 text-whatsapp-600 hover:bg-whatsapp-50">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Users className="h-4 w-4 text-whatsapp-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-whatsapp-700">{members.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Users className="h-4 w-4 text-whatsapp-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-whatsapp-700">
              {members.filter(m => m.is_admin).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Parents</CardTitle>
            <Users className="h-4 w-4 text-whatsapp-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-whatsapp-700">
              {members.filter(m => m.is_parent).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Résultats</CardTitle>
            <Search className="h-4 w-4 text-whatsapp-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-whatsapp-700">{filteredMembers.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des membres */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-whatsapp-600">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <UserAvatar
                  user={{
                    first_name: member.first_name,
                    last_name: member.last_name,
                    avatar_url: member.avatar_url,
                    photo_url: member.photo_url,
                  }}
                  size="lg"
                />
                <div className="flex-1">
                  <CardTitle className="text-lg text-gray-900">
                    {member.first_name} {member.last_name}
                  </CardTitle>
                  <CardDescription className="text-whatsapp-600">
                    {formatRelationshipType(member.relationship_type)}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {member.email && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4 text-whatsapp-600" />
                    <span>{member.email}</span>
                  </div>
                )}
                {member.phone && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4 text-whatsapp-600" />
                    <span>{member.phone}</span>
                  </div>
                )}
                {member.current_location && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-whatsapp-600" />
                    <span>{member.current_location}</span>
                  </div>
                )}
                {member.profession && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Briefcase className="h-4 w-4 text-whatsapp-600" />
                    <span>{member.profession}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {member.is_patriarch && (
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                    Patriarche
                  </span>
                )}
                {member.is_admin && (
                  <span className="px-2 py-1 text-xs bg-whatsapp-100 text-whatsapp-800 rounded-full">
                    Admin
                  </span>
                )}
                {member.is_parent && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    Parent
                  </span>
                )}
              </div>

              {profile?.is_admin && (
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1 border-whatsapp-600 text-whatsapp-600 hover:bg-whatsapp-50">
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-whatsapp-600 text-whatsapp-600 hover:bg-whatsapp-50">
                    Contacter
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Aucun membre trouvé
            </h3>
            <p className="text-gray-500">
              Essayez de modifier votre recherche ou d'inviter de nouveaux membres
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Members;
