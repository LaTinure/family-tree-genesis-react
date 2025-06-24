
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { Camera, Loader2, Save, Edit, X } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';
import { useToast } from '@/hooks/use-toast';
import { FormHeader } from '@/components/shared/FormHeader';
import { supabase } from '@/integrations/supabase/client';
import { ProfileData } from '@/types/profile';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<ProfileData>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      navigate(ROUTES.HOME);
      return;
    }

    if (profile) {
      setFormData(profile);
      setLoading(false);
    } else {
      // Create profile from user metadata if it doesn't exist
      const metadata = user.user_metadata || {};
      const newProfileData: Partial<ProfileData> = {
        user_id: user.id,
        email: user.email || '',
        first_name: metadata.first_name || '',
        last_name: metadata.last_name || '',
        phone: metadata.phone || '',
        birth_date: metadata.birth_date || null,
        birth_place: metadata.birth_place || '',
        current_location: metadata.current_location || '',
        situation: metadata.situation || '',
        profession: metadata.profession || '',
        photo_url: metadata.photo_url || '',
        avatar_url: metadata.avatar_url || metadata.photo_url || '',
        title: (metadata.title as any) || 'Fils',
        relationship_type: (metadata.relationship_type as any) || 'fils',
        is_admin: metadata.is_admin || false,
        is_patriarch: metadata.is_patriarch || false,
      };

      setFormData(newProfileData);
      setLoading(false);
    }
  }, [user, profile, authLoading, navigate]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData({ 
          ...formData, 
          avatar_url: result, 
          photo_url: result 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSaving(true);
      setError(null);

      // Upsert du profil dans la base de données
      const { data: updatedProfile, error: updateError } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          email: user.email || '',
          first_name: formData.first_name || '',
          last_name: formData.last_name || '',
          phone: formData.phone || '',
          birth_date: formData.birth_date || null,
          birth_place: formData.birth_place || '',
          current_location: formData.current_location || '',
          situation: formData.situation || '',
          profession: formData.profession || '',
          photo_url: formData.photo_url || '',
          avatar_url: formData.avatar_url || formData.photo_url || '',
          title: formData.title || 'Fils',
          relationship_type: formData.relationship_type || 'fils',
          is_admin: formData.is_admin || false,
          is_patriarch: formData.is_patriarch || false,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      // Mettre à jour les métadonnées utilisateur
      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          birth_date: formData.birth_date,
          birth_place: formData.birth_place,
          current_location: formData.current_location,
          situation: formData.situation,
          profession: formData.profession,
          photo_url: formData.photo_url,
          avatar_url: formData.avatar_url,
          updated_at: new Date().toISOString(),
        }
      });

      if (metadataError) {
        console.warn('Erreur mise à jour métadonnées:', metadataError);
      }

      setIsEditing(false);

      toast({
        title: 'Succès',
        description: 'Profil mis à jour avec succès',
      });
    } catch (err) {
      console.error('Erreur sauvegarde:', err);
      const message = err instanceof Error ? err.message : 'Erreur lors de la mise à jour';
      setError(message);
      toast({
        title: 'Erreur',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error && !formData.first_name) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Réessayer</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="family-card p-8 rounded-xl bg-white shadow-lg">
            <FormHeader
              title="Mon Profil"
              subtitle="Gérez vos informations personnelles"
            />

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo de profil */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <UserAvatar
                      user={{
                        first_name: formData.first_name,
                        last_name: formData.last_name,
                        avatar_url: formData.avatar_url,
                        photo_url: formData.photo_url,
                      }}
                      size="xl"
                      className="w-32 h-32"
                    />
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                        <Camera className="w-4 h-4 text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
                {isEditing && (
                  <p className="text-sm text-gray-500">
                    Cliquez sur l'icône caméra pour changer votre photo
                  </p>
                )}
              </div>

              {/* Informations de base */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">Prénom</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name || ''}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Nom</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name || ''}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={formData.email || ''}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>

              {/* Informations personnelles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="birth_date">Date de naissance</Label>
                  <Input
                    id="birth_date"
                    type="date"
                    value={formData.birth_date || ''}
                    onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
                <div>
                  <Label htmlFor="birth_place">Lieu de naissance</Label>
                  <Input
                    id="birth_place"
                    value={formData.birth_place || ''}
                    onChange={(e) => setFormData({ ...formData, birth_place: e.target.value })}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="current_location">Lieu de résidence</Label>
                <Input
                  id="current_location"
                  value={formData.current_location || ''}
                  onChange={(e) => setFormData({ ...formData, current_location: e.target.value })}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="situation">Situation familiale</Label>
                  <Select
                    value={formData.situation || ''}
                    onValueChange={(value) => setFormData({ ...formData, situation: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
                      <SelectValue placeholder="Sélectionnez votre situation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="célibataire">Célibataire</SelectItem>
                      <SelectItem value="marié">Marié(e)</SelectItem>
                      <SelectItem value="divorcé">Divorcé(e)</SelectItem>
                      <SelectItem value="veuf">Veuf/Veuve</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="profession">Profession</Label>
                  <Input
                    id="profession"
                    value={formData.profession || ''}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                {isEditing ? (
                  <>
                    <Button type="submit" disabled={saving} className="flex-1">
                      {saving ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Sauvegarder
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData(profile || {});
                        setError(null);
                      }}
                      className="flex-1"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Annuler
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="w-full"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier le profil
                  </Button>
                )}
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
