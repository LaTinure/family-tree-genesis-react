
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Edit, 
  Trash2, 
  Crown, 
  Shield, 
  User,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ProfileData } from '@/types/profile';
import { SearchWithAutocomplete } from '@/components/shared/SearchWithAutocomplete';
import { FamilyCard } from '@/components/shared/FamilyCard';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface UserManagementTableProps {
  onEditUser: (user: ProfileData) => void;
}

export const UserManagementTable = ({ onEditUser }: UserManagementTableProps) => {
  const [userToDelete, setUserToDelete] = useState<ProfileData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Récupérer tous les utilisateurs
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as ProfileData[];
    },
  });

  // Mutation pour supprimer un utilisateur
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: 'Succès',
        description: 'Utilisateur supprimé avec succès',
      });
      setUserToDelete(null);
    },
    onError: (error) => {
      toast({
        title: 'Erreur',
        description: 'Erreur lors de la suppression de l\'utilisateur',
        variant: 'destructive',
      });
    },
  });

  // Mutation pour changer le rôle
  const changeRoleMutation = useMutation({
    mutationFn: async ({ userId, updates }: { userId: string; updates: Partial<ProfileData> }) => {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: 'Succès',
        description: 'Rôle modifié avec succès',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erreur',
        description: 'Erreur lors de la modification du rôle',
        variant: 'destructive',
      });
    },
  });

  const handleRoleChange = (user: ProfileData, role: 'admin' | 'patriarch' | 'member') => {
    const updates: Partial<ProfileData> = {};
    
    switch (role) {
      case 'admin':
        updates.is_admin = !user.is_admin;
        break;
      case 'patriarch':
        updates.is_patriarch = !user.is_patriarch;
        break;
    }

    changeRoleMutation.mutate({ userId: user.id, updates });
  };

  const getRoleBadges = (user: ProfileData) => {
    const badges = [];
    
    if (user.is_patriarch) {
      badges.push(
        <Badge key="patriarch" variant="secondary" className="bg-yellow-100 text-yellow-800">
          <Crown className="w-3 h-3 mr-1" />
          Patriarche
        </Badge>
      );
    }
    
    if (user.is_admin) {
      badges.push(
        <Badge key="admin" variant="secondary" className="bg-blue-100 text-blue-800">
          <Shield className="w-3 h-3 mr-1" />
          Admin
        </Badge>
      );
    }
    
    if (badges.length === 0) {
      badges.push(
        <Badge key="member" variant="outline">
          <User className="w-3 h-3 mr-1" />
          Membre
        </Badge>
      );
    }
    
    return badges;
  };

  return (
    <>
      <FamilyCard
        title="Gestion des utilisateurs"
        description={`${users.length} utilisateur${users.length > 1 ? 's' : ''} dans la famille`}
        icon={Shield}
        actions={
          <SearchWithAutocomplete
            onSelect={(member) => setSearchTerm(member.first_name || '')}
            placeholder="Rechercher un utilisateur..."
            className="w-64"
          />
        }
      >
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôles</TableHead>
                <TableHead>Profession</TableHead>
                <TableHead>Inscription</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Chargement...
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Aucun utilisateur trouvé
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.avatar_url || ''} />
                          <AvatarFallback>
                            {user.first_name?.[0]}{user.last_name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {user.first_name} {user.last_name}
                          </div>
                          {user.phone && (
                            <div className="text-sm text-gray-500">{user.phone}</div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {getRoleBadges(user)}
                      </div>
                    </TableCell>
                    <TableCell>{user.profession || '-'}</TableCell>
                    <TableCell>
                      {user.created_at ? 
                        new Date(user.created_at).toLocaleDateString('fr-FR') : 
                        '-'
                      }
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRoleChange(user, 'admin')}
                          className={user.is_admin ? 'bg-blue-50' : ''}
                        >
                          <Shield className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRoleChange(user, 'patriarch')}
                          className={user.is_patriarch ? 'bg-yellow-50' : ''}
                        >
                          <Crown className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onEditUser(user)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setUserToDelete(user)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </FamilyCard>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>Confirmer la suppression</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l'utilisateur{' '}
              <strong>{userToDelete?.first_name} {userToDelete?.last_name}</strong> ?
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => userToDelete && deleteUserMutation.mutate(userToDelete.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
