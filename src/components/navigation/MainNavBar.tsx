
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

const MainNavBar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      label: 'Arbre Familial',
      path: ROUTES.DASHBOARD.TREE,
      icon: TreePine,
      forAll: true
    },
    {
      label: 'Membres',
      path: ROUTES.DASHBOARD.MEMBERS,
      icon: Users,
      forAll: true
    },
    {
      label: 'Messages',
      path: ROUTES.DASHBOARD.CHAT,
      icon: MessageSquare,
      forAll: true
    },
    {
      label: 'Invitations',
      path: ROUTES.DASHBOARD.INVITE,
      icon: UserPlus,
      forAll: true
    },
    {
      label: 'Notifications',
      path: ROUTES.DASHBOARD.NOTIFICATIONS,
      icon: Bell,
      forAll: true
    },
    {
      label: 'Événements',
      path: ROUTES.DASHBOARD.EVENTS,
      icon: Calendar,
      forAll: true
    },
    {
      label: 'Profil',
      path: ROUTES.DASHBOARD.PROFILE,
      icon: User,
      forAll: true
    },
    {
      label: 'Paramètres',
      path: ROUTES.DASHBOARD.SETTINGS,
      icon: Settings,
      forAll: true
    },
    {
      label: 'Contacter Admin',
      path: ROUTES.DASHBOARD.CONTACT_ADMIN,
      icon: MessageCircle,
      forAll: true
    },
    {
      label: 'Signaler',
      path: ROUTES.DASHBOARD.REPORT,
      icon: Flag,
      forAll: true
    }
  ];

  const adminItems = [
    {
      label: 'Administration',
      path: ROUTES.DASHBOARD.ADMIN,
      icon: Shield,
      forAll: false
    }
  ];

  const isAdmin = user?.user_metadata?.role === 'admin' || user?.user_metadata?.is_admin;

  if (!user) return null;

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-whatsapp-200 shadow-sm sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide py-2">
            {navItems.map((item) => {
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
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap
                      ${active 
                        ? 'bg-whatsapp-600 text-white shadow-md' 
                        : 'text-gray-700 hover:bg-whatsapp-50 hover:text-whatsapp-700'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
            
            {isAdmin && adminItems.map((item) => {
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
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap
                      ${active 
                        ? 'bg-red-600 text-white shadow-md' 
                        : 'text-red-700 hover:bg-red-50 hover:text-red-800 border border-red-200'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavBar;
