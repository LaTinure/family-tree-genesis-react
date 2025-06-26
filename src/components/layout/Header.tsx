import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants/routes';
import { Menu, X, MessageCircle, Users, Shield, LogOut, TreePine, Home, UserCheck, Settings, Bell, Search, Star, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isUserMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.clear();
      sessionStorage.clear();
      navigate(ROUTES.AUTH.FAMILY);
      toast({
        title: 'Déconnexion réussie',
        description: 'Vous avez été déconnecté avec succès',
      });
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      toast({
        title: 'Erreur',
        description: 'Erreur lors de la déconnexion',
        variant: 'destructive',
      });
    }
  };

  const navItems = [
    { path: ROUTES.HOME, label: 'Accueil', icon: Home },
    { path: ROUTES.DASHBOARD.MEMBERS, label: 'Membres', icon: Users },
    { path: ROUTES.DASHBOARD.TREE, label: 'Arbre', icon: TreePine },
  ];

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-gradient-to-r from-whatsapp-600 to-whatsapp-700 shadow-xl backdrop-blur-sm' : 'bg-gradient-to-r from-whatsapp-500 to-whatsapp-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo et Titre avec animation */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="/images/papagogo.png"
                alt="Papagogo Logo"
                className="h-14 w-14 object-contain rounded-full drop-shadow-2xl filter brightness-110 contrast-125"
                style={{
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3)) drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                  transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                }}
              />
              {/* Étoile brillante animée en haut */}
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Star className="h-5 w-5 text-yellow-400 fill-current drop-shadow-lg" />
              </motion.div>
            </motion.div>
            <div className="relative">
              <h1 className="text-xl font-bold text-white flex items-center gap-1">
                <motion.span
                  animate={{
                    scale: [1, 1.05, 1],
                    textShadow: [
                      "0 0 5px rgba(255,255,255,0.5)",
                      "0 0 20px rgba(255,255,255,0.8)",
                      "0 0 5px rgba(255,255,255,0.5)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Connections Familiales
                </motion.span>
                {/* Étoile brillante animée en exposant */}
                <motion.div
                  className="text-yellow-400"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Star className="h-3 w-3 fill-current" />
                </motion.div>
              </h1>
              <p className="text-xs text-whatsapp-100">
                Par Thierry Gogo Consultant - Développeur
              </p>
              {/* Étoile brillante animée en bas */}
              <motion.div
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <Star className="h-2 w-2 text-yellow-400 fill-current" />
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation Desktop avec icônes et animations */}
          <nav className="hidden md:flex items-center space-x-1">
            {user && (
              <>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActiveRoute(item.path);
                  return (
                    <motion.div
                      key={item.path}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                          isActive
                            ? 'bg-white/20 text-white shadow-lg'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{item.label}</span>
                        {isActive && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                            layoutId="activeTab"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </>
            )}
          </nav>

          {/* Menu utilisateur et boutons d'action */}
          <div className="flex items-center space-x-2">
            {user ? (
              <>
                {/* Notifications */}
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                  >
                    <Bell className="w-4 h-4" />
                  </Button>
                </motion.div>

                {/* Menu utilisateur */}
                <div className="relative" ref={userMenuRef}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 text-white hover:bg-white/10"
                    >
                      {profile && <UserAvatar user={profile} size="sm" />}
                      <span className="hidden sm:block font-medium">
                        {profile?.first_name || user.email}
                      </span>
                    </Button>
                  </motion.div>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50"
                      >
                        <Link
                          to={ROUTES.DASHBOARD.ROOT}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Home className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          to={ROUTES.DASHBOARD.PROFILE}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <UserCheck className="w-4 h-4" />
                          <span>Profil</span>
                        </Link>
                        <Link
                          to={ROUTES.DASHBOARD.CHAT}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Chat</span>
                        </Link>
                        <Link
                          to={ROUTES.DASHBOARD.INVITE}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <UserPlus className="w-4 h-4" />
                          <span>Inviter</span>
                        </Link>

                        {/* Menu administrateur */}
                        {profile?.is_admin && (
                          <>
                            <div className="border-t border-gray-200 my-1" />
                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                              Administration
                            </div>
                            <Link
                              to={ROUTES.DASHBOARD.ADMIN}
                              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Shield className="w-4 h-4" />
                              <span>Gestion</span>
                            </Link>
                            <Link
                              to={ROUTES.DASHBOARD.SETTINGS}
                              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Settings className="w-4 h-4" />
                              <span>Paramètres</span>
                            </Link>
                            <Link
                              to={ROUTES.DASHBOARD.REPORT}
                              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Search className="w-4 h-4" />
                              <span>Rapports</span>
                            </Link>
                            <Link
                              to={ROUTES.DASHBOARD.CONTACT_ADMIN}
                              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span>Support</span>
                            </Link>
                          </>
                        )}

                        <div className="border-t border-gray-200 my-1" />
                        <button
                          onClick={handleSignOut}
                          className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Déconnexion</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              // Pas de bouton de connexion visible - l'utilisateur doit aller sur la page d'auth
              <div className="flex items-center space-x-4 text-white/80 text-sm">
                <Link to={ROUTES.ABOUT} className="hover:text-white transition-colors">
                  À propos
                </Link>
                <Link to={ROUTES.AUTH.FAMILY} className="hover:text-white transition-colors">
                  Accès Famille
                </Link>
              </div>
            )}

            {/* Menu mobile */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:bg-white/10"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/20 py-4"
            >
              <nav className="space-y-2">
                {user && navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActiveRoute(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                {user && (
                  <>
                    <div className="border-t border-white/20 pt-2 mt-2">
                      <Link
                        to={ROUTES.DASHBOARD.PROFILE}
                        className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <UserCheck className="w-4 h-4" />
                        <span>Profil</span>
                      </Link>
                      <Link
                        to={ROUTES.DASHBOARD.SETTINGS}
                        className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Paramètres</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 px-4 py-2 text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-lg transition-all duration-300 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  </>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
