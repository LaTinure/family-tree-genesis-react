
import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-lg',
  xl: 'w-24 h-24 text-xl'
};

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  fallback, 
  size = 'md', 
  className 
}) => {
  return (
    <div className={cn(
      'rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold border-2 border-white shadow-md',
      sizeClasses[size],
      className
    )}>
      {src ? (
        <img 
          src={src} 
          alt="Avatar" 
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
};
