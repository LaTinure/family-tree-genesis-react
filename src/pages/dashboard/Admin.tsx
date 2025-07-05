import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Edit, Trash2, Plus, Search, Shield, Crown, User } from 'lucide-react';
import { formatRelationshipType } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes';

interface AdminMember {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  civilite: string;
  phone?: string;
  profession?: string;
  current_location?: string;
  birth_place?: string;
  birth_date?: string;
  avatar_url?: string;
  photo_url?: string;
  relationship_type: string;
  father_id?: string;
  mother_id?: string;
  father_name?: string;
  mother_name?: string;
  spouse_name?: string;
  is_admin: boolean;
  is_patriarch: boolean;
  is_parent: boolean;
  situation?: string;
  role: 'Simple Membre' | 'Patriarche';
  created_at: string;
  updated_at: string;
}

export const Admin = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [members, setMembers] = useState<AdminMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<AdminMember | null>(null);
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    role: 'Simple Membre' as 'Simple Membre' | 'Patriarche',
    relationship_type: '',
    situation: '',
    profession: '',
    current_location: '',
    phone: ''
  });

  useEffect(() => {
    if (profile?.is_admin) {
      fetchMembers();
    }
  }, [profile]);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const adminMembers: AdminMember[] = data.map(member => ({
        ...member,
        role: (member as any).role || 'Simple Membre'
      }));

      setMembers(adminMembers);
    } catch (error) {
      console.error('Erreur lors du chargement des membres:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les membres',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: AdminMember) => {
    setSelectedMember(member);
    setEditForm({
      first_name: member.first_name,
      last_name: member.last_name,
      email: member.email,
      role: member.role,
      relationship_type: member.relationship_type,
      situation: member.situation || '',
      profession: member.profession || '',
      current_location: member.current_location || '',
      phone: member.phone || ''
    });
    setIsEditDialogOpen(true);
  };

  const handleSave = async () => {
    if (!selectedMember) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: editForm.first_name,
          last_name: editForm.last_name,
          email: editForm.email,
          role: editForm.role,
          relationship_type: editForm.relationship_type,
          situation: editForm.situation,
          profession: editForm.profession,
          current_location: editForm.current_location,
          phone: editForm.phone
        })
        .eq('id', selectedMember.id);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Membre mis à jour avec succès',
      });

      setIsEditDialogOpen(false);
      fetchMembers();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le membre',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (memberId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', memberId);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Membre supprimé avec succès',
      });

      fetchMembers();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le membre',
        variant: 'destructive',
      });
    }
  };

  const filteredMembers = members.filter(member =>
    member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!profile?.is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="text-center">
              <Shield className="w-16 h-16 mx-auto text-red-500 mb-4" />
              <h2 className="text-xl font-bold mb-2">Accès refusé</h2>
              <p className="text-gray-600">
                Vous n'avez pas les permissions nécessaires pour accéder à cette page.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Administration</h1>
        <p className="text-gray-600">Gestion des membres de la famille</p>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher un membre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tableau des membres */}
      <Card>
        <CardHeader>
          <CardTitle>Membres de la famille</CardTitle>
          <CardDescription>
            {filteredMembers.length} membre(s) trouvé(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Chargement...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Membre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Relation</TableHead>
                  <TableHead>Situation</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <UserAvatar
                          user={{
                            first_name: member.first_name,
                            last_name: member.last_name,
                            avatar_url: member.avatar_url,
                            photo_url: member.photo_url,
                          }}
                          size="sm"
                        />
                        <div>
                          <p className="font-medium">
                            {member.first_name} {member.last_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {member.profession || 'Non renseigné'}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>
                      <Badge variant={member.role === 'Patriarche' ? 'default' : 'secondary'}>
                        {member.role === 'Patriarche' ? (
                          <Crown className="w-3 h-3 mr-1" />
                        ) : (
                          <User className="w-3 h-3 mr-1" />
                        )}
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatRelationshipType(member.relationship_type)}</TableCell>
                    <TableCell>{member.situation || 'Non renseigné'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(member)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(member.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Dialog d'édition */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le membre</DialogTitle>
            <DialogDescription>
              Modifiez les informations du membre sélectionné.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">Prénom</Label>
              <Input
                id="first_name"
                value={editForm.first_name}
                onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Nom</Label>
              <Input
                id="last_name"
                value={editForm.last_name}
                onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Select
                value={editForm.role}
                onValueChange={(value: 'Simple Membre' | 'Patriarche') =>
                  setEditForm({ ...editForm, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Simple Membre">Simple Membre</SelectItem>
                  <SelectItem value="Patriarche">Patriarche</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="relationship_type">Type de relation</Label>
              <Input
                id="relationship_type"
                value={editForm.relationship_type}
                onChange={(e) => setEditForm({ ...editForm, relationship_type: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="situation">Situation</Label>
              <Input
                id="situation"
                value={editForm.situation}
                onChange={(e) => setEditForm({ ...editForm, situation: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profession">Profession</Label>
              <Input
                id="profession"
                value={editForm.profession}
                onChange={(e) => setEditForm({ ...editForm, profession: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="current_location">Résidence actuelle</Label>
              <Input
                id="current_location"
                value={editForm.current_location}
                onChange={(e) => setEditForm({ ...editForm, current_location: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave}>
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
