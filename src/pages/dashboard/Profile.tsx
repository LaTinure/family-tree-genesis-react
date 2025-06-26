import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/shared/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { Edit, User, Mail, Phone, MapPin, Briefcase, Calendar, Crown, Shield } from 'lucide-react';
import { formatRelationshipType } from '@/lib/utils';

const DashboardProfile = () => {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Profil non trouvé.</p>
          <Button onClick={() => navigate('/dashboard')}>
            Retour au dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Profil</h1>
          <p className="text-gray-600">Gérez vos informations personnelles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Carte principale du profil */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Informations Personnelles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold text-gray-700 mb-1">Prénom</div>
                      <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {profile.first_name || 'Non renseigné'}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700 mb-1">Nom</div>
                      <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {profile.last_name || 'Non renseigné'}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </div>
                      <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {profile.email || 'Non renseigné'}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Téléphone
                      </div>
                      <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {profile.phone || 'Non renseigné'}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        Profession
                      </div>
                      <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {profile.profession || 'Non renseigné'}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Résidence actuelle
                      </div>
                      <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {profile.current_location || 'Non renseigné'}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date de naissance
                      </div>
                      <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {profile.birth_date ? new Date(profile.birth_date).toLocaleDateString('fr-FR') : 'Non renseigné'}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700 mb-1">Lieu de naissance</div>
                      <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {profile.birth_place || 'Non renseigné'}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar avec avatar et statuts */}
          <div className="space-y-6">
            {/* Avatar et infos principales */}
            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar
                    size="xl"
                    src={profile.photo_url || profile.avatar_url || '/images/profile01.png'}
                    className="w-24 h-24"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {profile.first_name} {profile.last_name}
                    </h3>
                    <p className="text-gray-600">{profile.email}</p>
                  </div>

                  {/* Badges de statut */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {profile.is_admin && (
                      <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        <Shield className="w-3 h-3" />
                        Administrateur
                      </div>
                    )}
                    {profile.is_patriarch && (
                      <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                        <Crown className="w-3 h-3" />
                        Patriarche
                      </div>
                    )}
                    {profile.relationship_type && (
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {formatRelationshipType(profile.relationship_type)}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full"
                  onClick={() => navigate('/profile')}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier le profil
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/dashboard')}
                >
                  Retour au dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
