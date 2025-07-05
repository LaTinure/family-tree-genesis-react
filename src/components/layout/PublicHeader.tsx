import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/constants/routes';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  LogOut,
  User,
  Settings,
  TreePine,
  Menu,
  X,
  Users,
  UserPlus,
  Crown,
  ChevronDown,
  Trash2,
  Database,
  Shield,
  Star,
  HelpCircle,
  Info,
  Smartphone
} from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

export const PublicHeader: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteCode, setDeleteCode] = useState('');
  const [deleteCodeError, setDeleteCodeError] = useState('');
  const [isStarVisible, setIsStarVisible] = useState(false);

  // Animation de l'étoile
  useEffect(() => {
    const interval = setInterval(() => {
      setIsStarVisible(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate(ROUTES.LANDING);
      toast({
        title: 'Déconnexion réussie',
        description: 'Vous avez été déconnecté avec succès',
      });
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      toast({
        title: 'Erreur de déconnexion',
        description: 'Une erreur est survenue lors de la déconnexion',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteAll = async () => {
    setDeleteCodeError('');
    if (deleteCode !== '1432') {
      setDeleteCodeError('Code secret incorrect');
      return;
    }
    setShowDeleteDialog(false);
    setIsDeleting(true);
    try {
      const { error } = await supabase.functions.invoke('delete-all-data', {
        body: { code: deleteCode }
      });

      if (error) throw error;

      toast({
        title: 'Suppression complète réussie',
        description: 'Toutes les données ont été supprimées.',
      });
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Erreur inconnue',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setDeleteCode('');
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getUserRoleIcon = () => {
    if (profile?.is_patriarch) {
      return <Crown className="w-4 h-4 text-yellow-400" />;
    }
    if (profile?.is_admin) {
      return <Shield className="w-4 h-4 text-blue-400" />;
    }
    return <User className="w-4 h-4 text-white/80" />;
  };

  const getUserRoleText = () => {
    if (profile?.is_patriarch) {
      return profile?.civilite === 'M.' ? 'Patriarche' : 'Matriarche';
    }
    if (profile?.is_admin) {
      return 'Administrateur';
    }
    return 'Membre';
  };

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gradient-to-r from-whatsapp-700 to-whatsapp-800 shadow-lg' : 'bg-gradient-to-r from-whatsapp-600 to-whatsapp-700'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo et titre adapté pour mobile */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <motion.div
                className="relative flex items-center space-x-2 md:space-x-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Logo adaptatif */}
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden shadow-lg">
                  <img
                    src="/images/profile01.png"
                    alt="Famille Connect Logo"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1 className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-whatsapp-100 flex items-center">
                      {isMobile ? (
                        <>
                          <Smartphone className="w-4 h-4 mr-1" />
                          Famille
                        </>
                      ) : (
                        'Connections Familiales'
                      )}
                      <Star
                        className={`w-4 h-4 md:w-6 md:h-6 ml-1 md:ml-2 text-yellow-400 drop-shadow-lg transition-opacity duration-500 ${
                          isStarVisible ? 'opacity-100' : 'opacity-50'
                        }`}
                        style={{ filter: 'brightness(1.5)' }}
                      />
                    </h1>
                  </motion.div>
                  {!isMobile && (
                    <motion.p
                      className="text-xs md:text-sm text-whatsapp-100/80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      Par Thierry Gogo Développeur FullStack
                    </motion.p>
                  )}
                </div>
              </motion.div>

              {/* Navigation Desktop - Simplifiée */}
              {!isMobile && user && (
                <div className="hidden lg:flex items-center space-x-2">
                  <Button
                    variant={isActiveRoute(ROUTES.DASHBOARD.ROOT) ? "default" : "ghost"}
                    onClick={() => navigate(ROUTES.DASHBOARD.ROOT)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                      isActiveRoute(ROUTES.DASHBOARD.ROOT)
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Button>
                  <Button
                    variant={isActiveRoute(ROUTES.DASHBOARD.TREE) ? "default" : "ghost"}
                    onClick={() => navigate(ROUTES.DASHBOARD.TREE)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                      isActiveRoute(ROUTES.DASHBOARD.TREE)
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <TreePine className="w-4 h-4" />
                    <span>Arbre</span>
                  </Button>
                </div>
              )}

              {/* Navigation publique Desktop - Déplacée vers la zone utilisateur */}
            </div>

            {/* Zone Utilisateur */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Liens Aide et À propos - Extrême droite */}
              {!isMobile && (
                <div className="flex items-center space-x-2 mr-4">
                  <Button
                    variant={isActiveRoute(ROUTES.HELP) ? "default" : "ghost"}
                    onClick={() => navigate(ROUTES.HELP)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                      isActiveRoute(ROUTES.HELP)
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Aide</span>
                  </Button>
                  <Button
                    variant={isActiveRoute(ROUTES.ABOUT) ? "default" : "ghost"}
                    onClick={() => navigate(ROUTES.ABOUT)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                      isActiveRoute(ROUTES.ABOUT)
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Info className="w-4 h-4" />
                    <span>À propos</span>
                  </Button>
                </div>
              )}

            </div>

            {/* Zone Utilisateur */}
            <div className="flex items-center gap-2 md:gap-4">

              {/* Avatar et menu utilisateur - Pour utilisateurs connectés */}
              {user && profile && !isMobile && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-auto px-2 md:px-3 py-2 rounded-full hover:bg-white/10 text-white">
                      <Avatar className="h-6 w-6 md:h-8 md:w-8 mr-1 md:mr-2 ring-2 ring-white/20">
                        <AvatarImage src={profile.photo_url || profile.avatar_url || "/images/profile01.png"} alt={profile.first_name} />
                        <AvatarFallback className="bg-whatsapp-100 text-whatsapp-700 text-xs">
                          {getInitials(profile.first_name, profile.last_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <span className="text-xs md:text-sm font-medium text-white">
                          {profile.first_name}
                        </span>
                        <div className="flex items-center space-x-1">
                          {getUserRoleIcon()}
                          <span className="text-xs text-white/80">{getUserRoleText()}</span>
                        </div>
                      </div>
                      <ChevronDown className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 text-white/60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64" align="end" forceMount>

                    <DropdownMenuLabel className="font-normal">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={profile.photo_url || profile.avatar_url || "/images/profile01.png"} alt={profile.first_name} />
                          <AvatarFallback className="bg-whatsapp-100 text-whatsapp-700">
                            {getInitials(profile.first_name, profile.last_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">
                            {profile.first_name} {profile.last_name}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {profile.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 pt-1">
                        {getUserRoleIcon()}
                        <span className="text-xs text-gray-600">{getUserRoleText()}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => navigate(ROUTES.DASHBOARD.PROFILE)}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Mon Profil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(ROUTES.DASHBOARD.SETTINGS)}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Paramètres</span>
                    </DropdownMenuItem>

                    {(profile?.is_patriarch || profile?.is_admin) && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate(ROUTES.DASHBOARD.ADMIN)}>
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Administration</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(ROUTES.DASHBOARD.GESTION)}>
                          <Database className="mr-2 h-4 w-4" />
                          <span>Gestion données</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setShowDeleteDialog(true)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete All</span>
                        </DropdownMenuItem>
                      </>
                    )}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Se déconnecter</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Menu Mobile - Burger button */}
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white p-2"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Menu Mobile Overlay */}
        {isMobile && isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-white/20 z-40">
            <div className="px-4 py-3 space-y-2">
              {/* Navigation publique mobile */}
              <Button
                variant={isActiveRoute(ROUTES.HELP) ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  navigate(ROUTES.HELP);
                  setIsMobileMenuOpen(false);
                }}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Aide
              </Button>
              <Button
                variant={isActiveRoute(ROUTES.ABOUT) ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  navigate(ROUTES.ABOUT);
                  setIsMobileMenuOpen(false);
                }}
              >
                <Info className="w-4 h-4 mr-2" />
                À propos
              </Button>

              {user ? (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Button
                    variant={isActiveRoute(ROUTES.DASHBOARD.ROOT) ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      navigate(ROUTES.DASHBOARD.ROOT);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button
                    variant={isActiveRoute(ROUTES.DASHBOARD.TREE) ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      navigate(ROUTES.DASHBOARD.TREE);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <TreePine className="w-4 h-4 mr-2" />
                    Arbre généalogique
                  </Button>
                  <Button
                    variant={isActiveRoute(ROUTES.DASHBOARD.MEMBERS) ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      navigate(ROUTES.DASHBOARD.MEMBERS);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Membres
                  </Button>
                  <Button
                    variant={isActiveRoute(ROUTES.DASHBOARD.INVITE) ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      navigate(ROUTES.DASHBOARD.INVITE);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Inviter un membre
                  </Button>

                  {(profile?.is_patriarch || profile?.is_admin) && (
                    <>
                      <div className="border-t border-gray-200 my-2"></div>
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Administration
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-blue-600"
                        onClick={() => {
                          navigate(ROUTES.DASHBOARD.ADMIN);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Gestion utilisateurs
                      </Button>
                    </>
                  )}

                  <div className="border-t border-gray-200 my-2"></div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600"
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Se déconnecter
                  </Button>
                </>
              ) : (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate(ROUTES.AUTH.FAMILY);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Se connecter
                  </Button>
                  <Button
                    variant="default"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate(ROUTES.AUTH.FAMILY);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Rejoindre ma famille
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Modal de confirmation Delete All */}
        {showDeleteDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center space-x-3 mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">Confirmer la suppression totale</h3>
              </div>
              <p className="text-red-600 font-semibold mb-4">
                Cette action supprimera <b>tous les membres, utilisateurs, profils, relations familiales, messages et notifications</b>. Cette action est <b>irréversible</b>.
              </p>
              <div className="mb-4">
                <label htmlFor="delete-code" className="block text-sm font-medium text-gray-700 mb-1">
                  Code secret
                </label>
                <input
                  id="delete-code"
                  type="password"
                  value={deleteCode}
                  onChange={e => { setDeleteCode(e.target.value); setDeleteCodeError(''); }}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Entrer le code secret pour confirmer"
                  disabled={isDeleting}
                  autoFocus
                />
                {deleteCodeError && <p className="text-red-500 text-xs mt-1">{deleteCodeError}</p>}
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                  disabled={isDeleting}
                >
                  Annuler
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAll}
                  disabled={isDeleting || deleteCode.length === 0}
                >
                  {isDeleting ? 'Suppression...' : 'Confirmer'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer pour compenser la hauteur du header fixe */}
      <div className="h-16 md:h-20"></div>
    </>
  );
};
