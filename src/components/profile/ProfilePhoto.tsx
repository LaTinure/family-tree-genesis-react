
import { useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProfilePhotoProps {
  user: {
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  };
  isEditing: boolean;
  onPhotoUpdate: (url: string) => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ProfilePhoto = ({ user, isEditing, onPhotoUpdate, size = 'xl' }: ProfilePhotoProps) => {
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const { toast } = useToast();

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation du fichier
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Erreur',
        description: 'Veuillez sélectionner une image valide',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast({
        title: 'Erreur',
        description: 'L\'image ne doit pas dépasser 5MB',
        variant: 'destructive',
      });
      return;
    }

    // Prévisualisation
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPreviewUrl(result);
      setShowPreview(true);
    };
    reader.readAsDataURL(file);
  };

  const confirmUpload = async () => {
    if (!previewUrl) return;

    try {
      setUploading(true);
      
      // Convertir le data URL en blob
      const response = await fetch(previewUrl);
      const blob = await response.blob();
      
      // Créer un nom de fichier unique
      const fileExt = blob.type.split('/')[1];
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${(await supabase.auth.getUser()).data.user?.id}/${fileName}`;

      // Upload vers Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob);

      if (uploadError) throw uploadError;

      // Obtenir l'URL publique
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      onPhotoUpdate(data.publicUrl);
      setShowPreview(false);
      setPreviewUrl('');

      toast({
        title: 'Succès',
        description: 'Photo de profil mise à jour avec succès',
      });
    } catch (error) {
      console.error('Erreur upload:', error);
      toast({
        title: 'Erreur',
        description: 'Erreur lors du téléchargement de la photo',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="relative">
        <Avatar className={sizeClasses[size]}>
          <AvatarImage src={user.avatar_url || ''} />
          <AvatarFallback className="text-2xl font-bold">
            {user.first_name?.[0]}{user.last_name?.[0]}
          </AvatarFallback>
        </Avatar>
        
        {isEditing && (
          <label className="absolute bottom-0 right-0 w-10 h-10 bg-whatsapp-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-whatsapp-700 transition-colors shadow-lg">
            <Camera className="w-5 h-5 text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la photo de profil</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center">
              <Avatar className="w-32 h-32">
                <AvatarImage src={previewUrl} />
                <AvatarFallback>
                  {user.first_name?.[0]}{user.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Annuler
              </Button>
              <Button 
                onClick={confirmUpload} 
                disabled={uploading}
                className="bg-whatsapp-600 hover:bg-whatsapp-700"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Upload...
                  </>
                ) : (
                  'Confirmer'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
