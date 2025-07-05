
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Briefcase, Calendar, Crown } from 'lucide-react';
import { ProfileData } from '@/types/profile';

interface ProfileInfoProps {
  profile: ProfileData;
}

export const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Non renseigné';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Informations personnelles</span>
          {profile.is_patriarch && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              <Crown className="w-3 h-3 mr-1" />
              Patriarche
            </Badge>
          )}
          {profile.is_admin && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Administrateur
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-sm">{profile.email}</p>
            </div>
          </div>

          {profile.phone && (
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Téléphone</p>
                <p className="text-sm">{profile.phone}</p>
              </div>
            </div>
          )}

          {profile.birth_date && (
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Date de naissance</p>
                <p className="text-sm">{formatDate(profile.birth_date)}</p>
              </div>
            </div>
          )}

          {profile.birth_place && (
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Lieu de naissance</p>
                <p className="text-sm">{profile.birth_place}</p>
              </div>
            </div>
          )}

          {profile.current_location && (
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Lieu de résidence</p>
                <p className="text-sm">{profile.current_location}</p>
              </div>
            </div>
          )}

          {profile.profession && (
            <div className="flex items-center space-x-3">
              <Briefcase className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Profession</p>
                <p className="text-sm">{profile.profession}</p>
              </div>
            </div>
          )}
        </div>

        {(profile.father_name || profile.mother_name) && (
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-2">Famille</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.father_name && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Père</p>
                  <p className="text-sm">{profile.father_name}</p>
                </div>
              )}
              {profile.mother_name && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Mère</p>
                  <p className="text-sm">{profile.mother_name}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
