
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

  const avatarUrl = user.avatar_url || user.photo_url;
  const fallback = `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}` || 'U';

  return (
    <Avatar
      src={avatarUrl}
      fallback={fallback}
      size={size}
      className={className}
    />
  );
};
