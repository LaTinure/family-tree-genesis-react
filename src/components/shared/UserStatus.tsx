import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Crown, Shield, User, Circle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const UserStatus: React.FC = () => {
  const { profile } = useAuth();

  if (!profile) return null;

  const getRoleIcon = () => {
    if (profile.is_patriarch) {
      return <Crown className="w-4 h-4 text-yellow-600" />;
    }
    if (profile.is_admin) {
      return <Shield className="w-4 h-4 text-blue-600" />;
    }
    return <User className="w-4 h-4 text-gray-600" />;
  };

  const getRoleText = () => {
    if (profile.is_patriarch) {
      return profile.civilite === 'M.' ? 'Patriarche' : 'Matriarche';
    }
    if (profile.is_admin) {
      return 'Administrateur';
    }
    return 'Membre';
  };

  const getRoleColor = () => {
    if (profile.is_patriarch) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
    if (profile.is_admin) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Avatar avec indicateur de statut */}
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={profile.photo_url || profile.avatar_url || "/images/profile01.png"}
            alt={profile.first_name}
          />
          <AvatarFallback className="bg-whatsapp-100 text-whatsapp-700">
            {getInitials(profile.first_name, profile.last_name)}
          </AvatarFallback>
        </Avatar>
        {/* Indicateur de statut en ligne */}
        <div className="absolute -bottom-1 -right-1">
          <Circle className="w-4 h-4 text-green-500 fill-current" />
        </div>
      </div>

      {/* Informations utilisateur */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h4 className="text-sm font-semibold text-gray-900 truncate">
            {profile.first_name} {profile.last_name}
          </h4>
          {getRoleIcon()}
        </div>
        <p className="text-xs text-gray-500 truncate">
          {profile.email}
        </p>
        <div className="flex items-center space-x-2 mt-1">
          <Badge variant="outline" className={`text-xs ${getRoleColor()}`}>
            {getRoleText()}
          </Badge>
          {profile.relationship_type && (
            <Badge variant="secondary" className="text-xs">
              {profile.relationship_type}
            </Badge>
          )}
        </div>
      </div>

      {/* Informations supplémentaires */}
      <div className="text-right text-xs text-gray-500">
        <div className="flex flex-col space-y-1">
          {profile.current_location && (
            <div className="flex items-center space-x-1">
              <span>📍</span>
              <span className="truncate max-w-20">{profile.current_location}</span>
            </div>
          )}
          {profile.profession && (
            <div className="flex items-center space-x-1">
              <span>💼</span>
              <span className="truncate max-w-20">{profile.profession}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
