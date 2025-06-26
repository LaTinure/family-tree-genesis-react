import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/shared/Avatar';
import { api } from '@/services/api';

const DashboardProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.profiles.getCurrent()
      .then(setProfile)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20">Chargement...</div>;
  if (!profile) return <div className="text-center py-20 text-red-600">Profil non trouvé.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-8 pt-24">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Mon Profil</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <Avatar size="xl" src={profile.avatar_url || '/images/profile01.png'} />
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <div className="font-semibold text-gray-700">Nom</div>
                  <div className="text-gray-900">{profile.first_name} {profile.last_name}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-700">Email</div>
                  <div className="text-gray-900">{profile.email}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-700">Profession</div>
                  <div className="text-gray-900">{profile.profession || '-'}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-700">Lieu de naissance</div>
                  <div className="text-gray-900">{profile.birth_place || '-'}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-700">Résidence actuelle</div>
                  <div className="text-gray-900">{profile.current_location || '-'}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-700">Téléphone</div>
                  <div className="text-gray-900">{profile.phone || '-'}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardProfile;
