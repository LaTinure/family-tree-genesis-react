
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants/routes';
import { Menu, X, MessageCircle, Users, Shield, LogOut, TreePine } from 'lucide-react';
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-whatsapp-600 shadow-lg' : 'bg-whatsapp-500'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo et Titre */}
          <div className="flex items-center space-x-3">
            <TreePine className="h-8 w-8 text-white" />
            <div>
              <h1 className="text-xl font-bold text-white">
                Famille Connect
              </h1>
              <p className="text-xs text-whatsapp-100">
                Gestion familiale
              </p>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {user && (
              <>
                <Link
                  to={ROUTES.HOME}
                  className="text-white hover:text-whatsapp-100 transition-colors"
                >
                  Accueil
                </Link>
                <Link
                  to={ROUTES.DASHBOARD.MEMBERS}
                  className="text-white hover:text-whatsapp-100 transition-colors"
                >
                  Membres
                </Link>
                <Link
                  to={ROUTES.DASHBOARD.TREE}
                  className="text-white hover:text-whatsapp-100 transition-colors"
                >
                  Arbre
                </Link>
              </>
            )}
          </nav>

          {/* Zone Utilisateur */}
          <div className="flex items-center space-x-4">
            {user && profile ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  className="focus:outline-none"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <UserAvatar
                    user={{
                      first_name: profile.first_name,
                      last_name: profile.last_name,
                      avatar_url: profile.avatar_url,
                      photo_url: profile.photo_url,
                    }}
                    size="md"
                    className="ring-2 ring-white/20"
                  />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">
                        {profile.first_name} {profile.last_name}
                      </p>
                      <p className="text-xs text-gray-500">{profile.email}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        navigate('/dashboard');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Dashboard
                    </button>
                    
                    {profile.is_admin && (
                      <button
                        onClick={() => {
                          navigate('/dashboard/admin');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Administration
                      </button>
                    )}
                    
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to={ROUTES.AUTH.FAMILY}>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-whatsapp-600">
                  Connexion
                </Button>
              </Link>
            )}

            {/* Menu Mobile */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-whatsapp-600 border-t border-whatsapp-500"
          >
            <div className="px-4 py-4 space-y-2">
              {user ? (
                <>
                  <Link
                    to={ROUTES.HOME}
                    className="block px-4 py-2 text-white hover:bg-whatsapp-700 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Accueil
                  </Link>
                  <Link
                    to={ROUTES.DASHBOARD.MEMBERS}
                    className="block px-4 py-2 text-white hover:bg-whatsapp-700 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Membres
                  </Link>
                  <Link
                    to={ROUTES.DASHBOARD.TREE}
                    className="block px-4 py-2 text-white hover:bg-whatsapp-700 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Arbre
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-white hover:bg-whatsapp-700 rounded-lg transition-colors"
                  >
                    Se déconnecter
                  </button>
                </>
              ) : (
                <Link
                  to={ROUTES.AUTH.FAMILY}
                  className="block px-4 py-2 text-white hover:bg-whatsapp-700 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Se connecter
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
export { Header };
