import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Edit, Loader2 } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';
import { useToast } from '@/hooks/use-toast';
import { FormHeader } from '@/components/shared/FormHeader';
import { supabase } from '@/integrations/supabase/client';
import { ProfileData } from '@/types/profile';
import { ProfilePhoto } from '@/components/profile/ProfilePhoto';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { FamilyCard } from '@/components/shared/FamilyCard';
import { User } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate(ROUTES.LANDING);
      return;
    }

    loadProfile();
  }, [user, authLoading, navigate]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        const newProfile: Partial<ProfileData> = {
          user_id: user.id,
          email: user.email || '',
          first_name: user.user_metadata?.first_name || '',
          last_name: user.user_metadata?.last_name || '',
          phone: user.user_metadata?.phone || '',
          avatar_url: user.user_metadata?.avatar_url || '',
          is_admin: user.user_metadata?.is_admin || false,
          is_patriarch: user.user_metadata?.is_patriarch || false,
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{
            id: user.id,
            user_id: user.id,
            ...newProfile,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }])
          .select()
          .maybeSingle();

        if (createError) throw createError;
        setProfile(createdProfile as ProfileData);
      } else {
        setProfile(data as ProfileData);
      }
    } catch (err) {
      console.error('Erreur chargement profil:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData: Partial<ProfileData>) => {
    if (!user || !profile) return;

    try {
      setSaving(true);
      setError(null);

      const { data: updatedProfile, error } = await supabase
        .from('profiles')
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id)
        .select()
        .maybeSingle();

      if (error) throw error;

      setProfile(updatedProfile as ProfileData);
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

  if (error && !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Réessayer</Button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <p>Aucun profil trouvé</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <FormHeader
            title="Mon Profil"
            subtitle="Gérez vos informations personnelles et familiales"
          />

          {isEditing ? (
            <ProfileForm
              profile={profile}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
              loading={saving}
            />
          ) : (
            <div className="space-y-6">
              <FamilyCard
                title="Profil"
                description="Vos informations principales"
                icon={User}
                actions={
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-whatsapp-600 hover:bg-whatsapp-700"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                }
              >
                <div className="flex flex-col md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-8">
                  <div className="flex justify-center md:justify-start">
                    <ProfilePhoto
                      user={profile}
                      isEditing={false}
                      onPhotoUpdate={() => {}}
                      size="xl"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-center md:text-left">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {profile.first_name} {profile.last_name}
                      </h2>
                      <p className="text-gray-600 mt-1">{profile.email}</p>
                      {profile.profession && (
                        <p className="text-whatsapp-600 font-medium mt-2">
                          {profile.profession}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </FamilyCard>

              <ProfileInfo profile={profile} />
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
