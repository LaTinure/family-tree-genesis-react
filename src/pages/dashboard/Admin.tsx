
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes';
import { FormHeader } from '@/components/shared/FormHeader';
import { UserManagementTable } from '@/components/admin/UserManagementTable';
import { EditUserDialog } from '@/components/admin/EditUserDialog';
import { ProfileData } from '@/types/profile';

const Admin = () => {
  const { user, loading } = useAuth();
  const [selectedUser, setSelectedUser] = useState<ProfileData | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Redirection si pas admin
  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  // TODO: Vérifier si l'utilisateur est admin
  // Pour l'instant, on suppose que tous les utilisateurs connectés peuvent accéder
  // En production, il faudrait vérifier le rôle admin

  const handleEditUser = (user: ProfileData) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedUser(null);
    setIsEditDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <FormHeader
            title="Administration"
            subtitle="Gestion des utilisateurs et de la famille"
          />

          <UserManagementTable onEditUser={handleEditUser} />

          <EditUserDialog
            user={selectedUser}
            isOpen={isEditDialogOpen}
            onClose={handleCloseEditDialog}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
