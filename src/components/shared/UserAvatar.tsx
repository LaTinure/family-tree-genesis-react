import { Avatar } from '@/components/shared/Avatar';

interface UserAvatarProps {
  user: {
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
    photo_url?: string;
  } | null | undefined;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const UserAvatar = ({ user, size = 'md', className }: UserAvatarProps) => {
  // Vérification que user existe
  if (!user) {
    return (
      <Avatar
        src={undefined}
        fallback="U"
        size={size}
        className={className}
      />
    );
  }

  // Gestion des URLs Supabase
  let avatarUrl = user.avatar_url || user.photo_url;

  // Si l'URL existe mais n'est pas complète, construire l'URL Supabase
  if (avatarUrl && !avatarUrl.startsWith('http') && !avatarUrl.startsWith('data:') && !avatarUrl.startsWith('/')) {
    // Construire l'URL complète Supabase
    const supabaseUrl = 'https://aaxfvyorhasbwlaovrdf.supabase.co/storage/v1/object/public/avatars/';
    avatarUrl = `${supabaseUrl}${avatarUrl}`;
  }

  // Si pas d'URL d'avatar, utiliser l'image par défaut
  if (!avatarUrl) {
    avatarUrl = '/images/profile01.png';
  }

  const fallback = `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}` || 'U';

  // Debug: afficher les informations de l'avatar
  console.log('UserAvatar Debug:', {
    user: {
      first_name: user.first_name,
      last_name: user.last_name,
      avatar_url: user.avatar_url,
      photo_url: user.photo_url
    },
    finalAvatarUrl: avatarUrl,
    fallback,
    hasAvatar: !!avatarUrl
  });

  return (
    <Avatar
      src={avatarUrl}
      fallback={fallback}
      size={size}
      className={className}
    />
  );
};
