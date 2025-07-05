
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProfileData } from '@/types/profile';
import { useToast } from '@/hooks/use-toast';

interface EditUserDialogProps {
  user: ProfileData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EditUserDialog = ({ user, isOpen, onClose }: EditUserDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: async (updates: Partial<ProfileData>) => {
      if (!user) throw new Error('Aucun utilisateur sélectionné');
      
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: 'Succès',
        description: 'Utilisateur modifié avec succès',
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Erreur',
        description: 'Erreur lors de la modification de l\'utilisateur',
        variant: 'destructive',
      });
    },
  });

  const handleSave = async (data: Partial<ProfileData>) => {
    setLoading(true);
    try {
      await updateUserMutation.mutateAsync(data);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Modifier l'utilisateur - {user.first_name} {user.last_name}
          </DialogTitle>
        </DialogHeader>
        <ProfileForm
          profile={user}
          onSave={handleSave}
          onCancel={onClose}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
};
