import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/lib/constants/routes';
import {
  Home,
  TreePine,
  Users,
  MessageSquare,
  Bell,
  Calendar,
  Shield,
  Crown,
  Settings,
  User
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  requiresAuth?: boolean;
  adminOnly?: boolean;
}

export const MainNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuth();

  const navItems: NavItem[] = [
    {
      path: ROUTES.DASHBOARD.ROOT,
      label: 'Accueil',
      icon: <Home className="w-4 h-4" />,
      requiresAuth: true
    },
    {
      path: ROUTES.DASHBOARD.TREE,
      label: 'Arbre',
      icon: <TreePine className="w-4 h-4" />,
      requiresAuth: true
    },
    {
      path: ROUTES.DASHBOARD.MEMBERS,
      label: 'Membres',
      icon: <Users className="w-4 h-4" />,
      requiresAuth: true
    },
    {
      path: ROUTES.DASHBOARD.MESSAGES,
      label: 'Messages',
      icon: <MessageSquare className="w-4 h-4" />,
      badge: 3, // Exemple de badge
      requiresAuth: true
    },
    {
      path: ROUTES.DASHBOARD.NOTIFICATIONS,
      label: 'Notifications',
      icon: <Bell className="w-4 h-4" />,
      badge: 5, // Exemple de badge
      requiresAuth: true
    },
    {
      path: ROUTES.DASHBOARD.EVENTS,
      label: 'Événements',
      icon: <Calendar className="w-4 h-4" />,
      requiresAuth: true
    },
    {
      path: ROUTES.DASHBOARD.ADMIN,
      label: 'Admin',
      icon: <Shield className="w-4 h-4" />,
      requiresAuth: true,
      adminOnly: true
    }
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const canAccessItem = (item: NavItem) => {
    if (item.requiresAuth && !user) return false;
    if (item.adminOnly && !profile?.is_admin && !profile?.is_patriarch) return false;
    return true;
  };

  const filteredNavItems = navItems.filter(canAccessItem);

  return (
    <nav className="flex items-center space-x-1">
      {filteredNavItems.map((item) => (
        <Button
          key={item.path}
          variant={isActiveRoute(item.path) ? "default" : "ghost"}
          size="sm"
          onClick={() => navigate(item.path)}
          className="relative flex items-center space-x-2 px-3 py-2"
        >
          {item.icon}
          <span className="hidden sm:inline">{item.label}</span>
          {item.badge && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
            >
              {item.badge}
            </Badge>
          )}
          {/* Indicateur de rôle pour les items admin */}
          {item.adminOnly && (profile?.is_patriarch ? (
            <Crown className="w-3 h-3 text-yellow-600" />
          ) : (
            <Shield className="w-3 h-3 text-blue-600" />
          ))}
        </Button>
      ))}
    </nav>
  );
};
