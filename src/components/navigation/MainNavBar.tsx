
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/constants/routes';
import { motion } from 'framer-motion';
import { 
  TreePine, 
  Users, 
  MessageSquare, 
  UserPlus, 
  Settings, 
  Flag, 
  Shield, 
  MessageCircle,
  Bell,
  Calendar,
  User
} from 'lucide-react';
import { UserAvatar } from '@/components/shared/UserAvatar';

const MainNavBar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Éléments visibles par TOUS les utilisateurs connectés
  const publicNavItems = [
    {
      label: 'Arbre Familial',
      path: ROUTES.DASHBOARD.TREE,
      icon: TreePine,
      color: 'whatsapp'
    },
    {
      label: 'Membres',
      path: ROUTES.DASHBOARD.MEMBERS,
      icon: Users,
      color: 'whatsapp'
    },
    {
      label: 'Messages',
      path: ROUTES.DASHBOARD.CHAT,
      icon: MessageSquare,
      color: 'whatsapp'
    },
    {
      label: 'Invitations',
      path: ROUTES.DASHBOARD.INVITE,
      icon: UserPlus,
      color: 'whatsapp'
    },
    {
      label: 'Notifications',
      path: ROUTES.DASHBOARD.NOTIFICATIONS,
      icon: Bell,
      color: 'whatsapp'
    },
    {
      label: 'Événements',
      path: ROUTES.DASHBOARD.EVENTS,
      icon: Calendar,
      color: 'whatsapp'
    },
    {
      label: 'Profil',
      path: ROUTES.DASHBOARD.PROFILE,
      icon: User,
      color: 'whatsapp'
    },
    {
      label: 'Contacter Admin',
      path: ROUTES.DASHBOARD.CONTACT_ADMIN,
      icon: MessageCircle,
      color: 'whatsapp'
    },
    {
      label: 'Signaler',
      path: ROUTES.DASHBOARD.REPORT,
      icon: Flag,
      color: 'whatsapp'
    }
  ];

  // Éléments réservés aux administrateurs
  const adminNavItems = [
    {
      label: 'Administration',
      path: ROUTES.DASHBOARD.ADMIN,
      icon: Shield,
      color: 'red'
    },
    {
      label: 'Paramètres',
      path: ROUTES.DASHBOARD.SETTINGS,
      icon: Settings,
      color: 'red'
    }
  ];

  const isAdmin = user?.user_metadata?.role === 'admin' || user?.user_metadata?.is_admin;

  if (!user) return null;

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-whatsapp-200 shadow-sm sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Avatar utilisateur connecté */}
          <div className="flex items-center gap-3">
            <UserAvatar
              user={{
                first_name: user.user_metadata?.first_name || 'U',
                last_name: user.user_metadata?.last_name || 'ser',
                photo_url: user.user_metadata?.photo_url,
                avatar_url: user.user_metadata?.avatar_url,
              }}
              size="md"
              className="ring-2 ring-whatsapp-200"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">
                {user.user_metadata?.first_name} {user.user_metadata?.last_name}
              </p>
              <p className="text-xs text-gray-500">
                {isAdmin ? 'Administrateur' : 'Membre'}
              </p>
            </div>
          </div>

          {/* Navigation horizontale */}
          <div className="flex items-center">
            <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
              {/* Éléments publics */}
              {publicNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <motion.div
                    key={item.path}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.path}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap text-sm
                        ${active 
                          ? 'bg-whatsapp-600 text-white shadow-md' 
                          : 'text-gray-700 hover:bg-whatsapp-50 hover:text-whatsapp-700'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden md:inline font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
              
              {/* Éléments admin */}
              {isAdmin && adminNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <motion.div
                    key={item.path}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.path}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap text-sm border
                        ${active 
                          ? 'bg-red-600 text-white shadow-md border-red-600' 
                          : 'text-red-700 hover:bg-red-50 hover:text-red-800 border-red-200'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden md:inline font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavBar;
