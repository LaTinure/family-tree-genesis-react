
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/constants/routes';
import {
  Home,
  TreePine,
  Users,
  UserPlus,
  HelpCircle,
  Info,
  LogIn,
  UserCheck,
  Play
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  requiresAuth?: boolean;
  publicOnly?: boolean;
}

export const MobileNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const navItems: NavItem[] = [
    // Public items (always visible)
    {
      path: ROUTES.HELP,
      label: 'Aide',
      icon: <HelpCircle className="w-4 h-4" />,
    },
    {
      path: ROUTES.ABOUT,
      label: 'À propos',
      icon: <Info className="w-4 h-4" />,
    },
    // Auth items (only when not authenticated)
    {
      path: ROUTES.AUTH.FAMILY,
      label: 'Se connecter',
      icon: <LogIn className="w-4 h-4" />,
      publicOnly: true,
    },
    {
      path: ROUTES.AUTH.FAMILY,
      label: 'Rejoindre',
      icon: <UserCheck className="w-4 h-4" />,
      publicOnly: true,
    },
    // Authenticated items
    {
      path: ROUTES.DASHBOARD.ROOT,
      label: 'Dashboard',
      icon: <Home className="w-4 h-4" />,
      requiresAuth: true,
    },
    {
      path: ROUTES.DASHBOARD.TREE,
      label: 'Arbre',
      icon: <TreePine className="w-4 h-4" />,
      requiresAuth: true,
    },
    {
      path: ROUTES.DASHBOARD.MEMBERS,
      label: 'Membres',
      icon: <Users className="w-4 h-4" />,
      requiresAuth: true,
    },
    {
      path: ROUTES.DASHBOARD.MEDIA,
      label: 'Média',
      icon: <Play className="w-4 h-4" />,
      requiresAuth: true,
    },
    {
      path: ROUTES.DASHBOARD.INVITE,
      label: 'Inviter',
      icon: <UserPlus className="w-4 h-4" />,
      requiresAuth: true,
    },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const canShowItem = (item: NavItem) => {
    if (item.requiresAuth && !user) return false;
    if (item.publicOnly && user) return false;
    return true;
  };

  const filteredNavItems = navItems.filter(canShowItem);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center space-x-1">
        {filteredNavItems.slice(0, 5).map((item) => (
          <Button
            key={item.path}
            variant={isActiveRoute(item.path) ? "default" : "ghost"}
            size="sm"
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center space-y-1 px-2 py-1 h-auto min-w-0 ${
              isActiveRoute(item.path) 
                ? 'bg-whatsapp-600 text-white' 
                : 'text-gray-600 hover:text-whatsapp-600'
            }`}
          >
            {item.icon}
            <span className="text-xs leading-none">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
