
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { UserAvatar } from '@/components/shared/UserAvatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  User, 
  LogOut, 
  Settings, 
  TreePine,
  Users,
  MessageSquare,
  Calendar,
  UserPlus
} from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';

const Header = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-whatsapp-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo et titre */}
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-gradient-to-br from-whatsapp-500 to-whatsapp-600 rounded-full flex items-center justify-center shadow-lg">
            <TreePine className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-whatsapp-700">Famille Connect</h1>
            <p className="text-xs text-whatsapp-500 -mt-1">Votre arbre familial</p>
          </div>
        </Link>

        {/* Navigation principale */}
        {user && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to={ROUTES.DASHBOARD.ROOT}
              className="flex items-center space-x-2 text-whatsapp-600 hover:text-whatsapp-700 transition-colors"
            >
              <TreePine className="w-4 h-4" />
              <span>Tableau de bord</span>
            </Link>
            <Link
              to={ROUTES.DASHBOARD.MEMBERS}
              className="flex items-center space-x-2 text-whatsapp-600 hover:text-whatsapp-700 transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Membres</span>
            </Link>
            <Link
              to={ROUTES.DASHBOARD.MESSAGES}
              className="flex items-center space-x-2 text-whatsapp-600 hover:text-whatsapp-700 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </Link>
            <Link
              to={ROUTES.DASHBOARD.EVENTS}
              className="flex items-center space-x-2 text-whatsapp-600 hover:text-whatsapp-700 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Événements</span>
            </Link>
            <Button
              onClick={() => navigate(ROUTES.DASHBOARD.INVITE)}
              className="bg-whatsapp-600 hover:bg-whatsapp-700 text-white shadow-md"
              size="sm"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Inviter
            </Button>
          </nav>
        )}

        {/* Menu utilisateur */}
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-whatsapp-200 hover:border-whatsapp-400">
                  <UserAvatar
                    user={{
                      first_name: profile?.first_name,
                      last_name: profile?.last_name,
                      photo_url: profile?.photo_url,
                      avatar_url: profile?.avatar_url,
                    }}
                    size="sm"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 border-whatsapp-200" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <UserAvatar
                        user={{
                          first_name: profile?.first_name,
                          last_name: profile?.last_name,
                          photo_url: profile?.photo_url,
                          avatar_url: profile?.avatar_url,
                        }}
                        size="sm"
                      />
                      <div>
                        <p className="text-sm font-medium leading-none text-whatsapp-700">
                          {profile?.first_name} {profile?.last_name}
                        </p>
                        <p className="text-xs leading-none text-whatsapp-500 mt-1">
                          {profile?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-whatsapp-200" />
                <DropdownMenuItem
                  onClick={() => navigate(ROUTES.PROFILE)}
                  className="hover:bg-whatsapp-50 focus:bg-whatsapp-50"
                >
                  <User className="mr-2 h-4 w-4 text-whatsapp-600" />
                  <span>Mon Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate(ROUTES.DASHBOARD.SETTINGS)}
                  className="hover:bg-whatsapp-50 focus:bg-whatsapp-50"
                >
                  <Settings className="mr-2 h-4 w-4 text-whatsapp-600" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-whatsapp-200" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="hover:bg-red-50 focus:bg-red-50 text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => navigate('/auth/login')}
                className="text-whatsapp-600 hover:text-whatsapp-700 hover:bg-whatsapp-50"
              >
                Se connecter
              </Button>
              <Button
                onClick={() => navigate('/auth/register')}
                className="bg-whatsapp-600 hover:bg-whatsapp-700 text-white shadow-md"
              >
                S'inscrire
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
