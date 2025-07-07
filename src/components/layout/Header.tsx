
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants/routes';
import { Menu, X, Facebook, Twitter, Instagram, Linkedin, MessageCircle, Star, Settings, UserPlus, Flag, MessageSquare, LogOut, TreePine, Users, Shield, Loader2, Bell, Calendar, User, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const Header = () => {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteCode, setDeleteCode] = useState('');
  const [deleteCodeError, setDeleteCodeError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<'bottom' | 'top'>('bottom');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu si clic en dehors
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

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      navigate('/');
      toast({
        title: 'Déconnexion réussie',
        description: 'Vous avez été déconnecté avec succès.',
      });
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      toast({
        title: 'Erreur de déconnexion',
        description: error instanceof Error ? error.message : 'Erreur inconnue',
        variant: 'destructive',
      });
    } finally {
      setIsLoggingOut(false);
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
      // Call the delete-all-data edge function directly
      const { data, error } = await supabase.functions.invoke('delete-all-data', {
        body: { secretCode: deleteCode }
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        toast({
          title: 'Suppression complète réussie',
          description: `${data.stats?.auth_users ?? data.deletedUsers ?? 0} utilisateurs supprimés.`,
        });
        window.location.href = '/';
      } else {
        toast({
          title: 'Erreur',
          description: data?.message || 'Suppression échouée',
          variant: 'destructive',
        });
      }
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

  const calculateMenuPosition = () => {
    if (userMenuRef.current) {
      const rect = userMenuRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const menuHeight = 400; // Hauteur estimée du menu

      // Si il n'y a pas assez d'espace en bas, positionner en haut
      if (rect.bottom + menuHeight > windowHeight && rect.top > menuHeight) {
        setMenuPosition('top');
      } else {
        setMenuPosition('bottom');
      }
    }
  };

  const toggleUserMenu = () => {
    const newState = !isUserMenuOpen;
    setIsUserMenuOpen(newState);
    if (newState) {
      calculateMenuPosition();
    }
  };

  if (isLoggingOut) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-whatsapp-50 via-green-50 to-emerald-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Famille Connect</h1>
        <div className="w-32 h-32 mb-6">
          <img src="/tree-favicon.svg" alt="Arbre Généalogique" className="w-full h-full object-contain" />
        </div>
        <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gradient-to-r from-whatsapp-700 to-whatsapp-800 shadow-lg' : 'bg-gradient-to-r from-whatsapp-600 to-whatsapp-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Titre et Navigation Commune */}
          <div className="flex items-center space-x-8">
            <div className="relative flex items-center space-x-3">
              {/* Logo du projet */}
              <motion.div
                className="w-12 h-12 rounded-full overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src="/images/profile01.png"
                  alt="Famille Connect Logo"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <div>
                <motion.h1
                  className="header-title text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-whatsapp-100 inline-flex items-center justify-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Famille Connect
                  <sup className="ml-2 align-super">
                    <Star className="w-10 h-10 text-yellow-400 drop-shadow-lg" style={{ filter: 'brightness(1.5)' }} />
                  </sup>
                </motion.h1>
                <motion.p
                  className="header-subtitle text-sm text-whatsapp-100/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Par Thierry Gogo Développeur FullStack
                </motion.p>
              </div>
            </div>

            {/* Navigation Commune - Options partagées par tous les utilisateurs */}
            {user && (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to={ROUTES.DASHBOARD.ROOT}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                    isActive(ROUTES.DASHBOARD.ROOT)
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to={ROUTES.DASHBOARD.TREE}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                    isActive(ROUTES.DASHBOARD.TREE)
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <TreePine className="w-4 h-4" />
                  <span>Arbre</span>
                </Link>
                <Link
                  to={ROUTES.DASHBOARD.MEMBERS}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                    isActive(ROUTES.DASHBOARD.MEMBERS)
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Membres</span>
                </Link>
                <Link
                  to={ROUTES.DASHBOARD.INVITE}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                    isActive(ROUTES.DASHBOARD.INVITE)
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Inviter</span>
                </Link>
              </div>
            )}
          </div>

          {/* Zone Utilisateur */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Conteneur social */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 shadow-lg">
              <div className="flex space-x-3">
                <motion.button type="button" className="social-button text-white/80 hover:text-white transition-colors" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </motion.button>
                <motion.button type="button" className="social-button text-white/80 hover:text-white transition-colors" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </motion.button>
                <motion.button type="button" className="social-button text-white/80 hover:text-white transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </motion.button>
                <motion.button type="button" className="social-button text-white/80 hover:text-white transition-colors" aria-label="Linkedin">
                  <Linkedin className="w-5 h-5" />
                </motion.button>
                <motion.button type="button" className="social-button text-white/80 hover:text-white transition-colors" aria-label="MessageCircle">
                  <MessageCircle className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Avatar utilisateur + menu */}
            {user && (
              <div className="relative flex items-center space-x-3" ref={userMenuRef}>
                <button
                  type="button"
                  className="focus:outline-none flex items-center space-x-2"
                  onClick={toggleUserMenu}
                  aria-haspopup="true"
                  aria-expanded={isUserMenuOpen}
                >
                  <UserAvatar
                    user={{
                      first_name: profile?.first_name || profile?.email?.split('@')[0] || 'U',
                      last_name: profile?.last_name || 'ser',
                      photo_url: profile?.photo_url || profile?.avatar_url || '/images/profile01.png',
                      avatar_url: profile?.avatar_url || profile?.photo_url || '/images/profile01.png',
                    }}
                    size="md"
                    className="user-avatar ring-2 ring-white/20"
                  />
                  <span className="text-white font-medium hidden sm:block">
                    {profile?.first_name || profile?.email?.split('@')[0] || 'Utilisateur'}
                  </span>
                </button>
                {isUserMenuOpen && (
                  <div className={`absolute right-0 ${menuPosition === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2'} w-64 bg-white rounded-lg shadow-xl py-1 z-[9999] border border-gray-200 max-h-96 overflow-y-auto`}>
                    {/* Informations utilisateur */}
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {profile?.first_name || profile?.email?.split('@')[0] || 'Utilisateur'} {profile?.last_name || ''}
                      </p>
                      <p className="text-xs text-gray-500">
                        {profile?.email} - {profile?.user_role === 'Administrateur' || profile?.is_admin ? 'Administrateur' : 'Membre'} (Mode Test)
                      </p>
                      <p className="text-xs text-gray-400">
                        ID: {profile?.id?.substring(0, 8)}...
                      </p>
                    </div>

                    {/* Options personnelles */}
                    <Link
                      to={ROUTES.DASHBOARD.PROFILE}
                      onClick={toggleUserMenu}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profil
                    </Link>
                    <Link
                      to={ROUTES.DASHBOARD.MESSAGES}
                      onClick={toggleUserMenu}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Messages
                    </Link>
                    <Link
                      to={ROUTES.DASHBOARD.CHAT}
                      onClick={toggleUserMenu}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Link>
                    <Link
                      to={ROUTES.DASHBOARD.NOTIFICATIONS}
                      onClick={toggleUserMenu}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Notifications
                    </Link>
                    <Link
                      to={ROUTES.DASHBOARD.EVENTS}
                      onClick={toggleUserMenu}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Événements
                    </Link>
                    <Link
                      to={ROUTES.DASHBOARD.REPORT}
                      onClick={toggleUserMenu}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Flag className="w-4 h-4 mr-2" />
                      Signaler
                    </Link>

                    {/* Séparateur */}
                    <div className="border-t border-gray-100 my-1"></div>

                    {/* Administration - MODE TEST: Visible pour tous */}
                    <Link
                      to={ROUTES.DASHBOARD.ADMIN}
                      onClick={toggleUserMenu}
                      className="flex items-center px-4 py-2 text-red-700 hover:bg-red-50 transition-colors"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Administration
                    </Link>
                    <Link
                      to={ROUTES.DASHBOARD.GESTION}
                      onClick={toggleUserMenu}
                      className="flex items-center px-4 py-2 text-red-700 hover:bg-red-50 transition-colors"
                    >
                      <Database className="w-4 h-4 mr-2" />
                      Gestion
                    </Link>
                    <Link
                      to={ROUTES.DASHBOARD.SETTINGS}
                      onClick={toggleUserMenu}
                      className="flex items-center px-4 py-2 text-red-700 hover:bg-red-50 transition-colors"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Paramètres
                    </Link>
                    <button
                      onClick={() => {
                        setShowDeleteDialog(true);
                        toggleUserMenu();
                      }}
                      className="w-full text-left px-4 py-2 text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center"
                      disabled={isDeleting}
                    >
                      <Flag className="w-4 h-4 mr-2" />
                      {isDeleting ? 'Suppression...' : 'Delete All'}
                    </button>

                    {/* Déconnexion */}
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => {
                        handleSignOut();
                        toggleUserMenu();
                      }}
                      className="w-full text-left px-4 py-2 text-black whitespace-nowrap hover:bg-gray-100 transition-colors flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
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
      <motion.div
        className={`mobile-menu fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
        initial={false}
        animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="px-4 py-6 space-y-4">
          {user ? (
            <>
              <Link
                to={ROUTES.LANDING}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                to={ROUTES.DASHBOARD.ROOT}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to={ROUTES.DASHBOARD.TREE}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Arbre Familial
              </Link>
              <Link
                to={ROUTES.DASHBOARD.MEMBERS}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Membres
              </Link>
              <Link
                to={ROUTES.DASHBOARD.INVITE}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inviter un membre
              </Link>
              <Link
                to={ROUTES.DASHBOARD.PROFILE}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profil
              </Link>
              <Link
                to={ROUTES.DASHBOARD.MESSAGES}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Messages
              </Link>
              <Link
                to={ROUTES.DASHBOARD.CHAT}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Chat
              </Link>
              <Link
                to={ROUTES.DASHBOARD.NOTIFICATIONS}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Notifications
              </Link>
              <Link
                to={ROUTES.DASHBOARD.EVENTS}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Événements
              </Link>
              <Link
                to={ROUTES.DASHBOARD.REPORT}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Signaler
              </Link>
              {/* Administration - MODE TEST: Visible pour tous */}
              <Link
                to={ROUTES.DASHBOARD.ADMIN}
                className="flex items-center px-4 py-2 text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Administration
              </Link>
              <Link
                to={ROUTES.DASHBOARD.GESTION}
                className="flex items-center px-4 py-2 text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gestion
              </Link>
              <Link
                to={ROUTES.DASHBOARD.SETTINGS}
                className="flex items-center px-4 py-2 text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Paramètres
              </Link>
              <button
                onClick={() => {
                  setShowDeleteDialog(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center"
                disabled={isDeleting}
              >
                <Flag className="w-4 h-4 mr-2" />
                {isDeleting ? 'Suppression...' : 'Delete All'}
              </button>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-black whitespace-nowrap hover:bg-gray-100 transition-colors flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Se déconnecter
              </button>
            </>
          ) : (
            <Link
              to={ROUTES.AUTH.FAMILY}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Se connecter
            </Link>
          )}
        </div>
      </motion.div>

      {/* Boîte de dialogue Delete All */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression totale</DialogTitle>
          </DialogHeader>
          <p className="text-red-600 font-semibold mb-4">Cette action supprimera <b>tous les membres, utilisateurs, profils, relations familiales, messages et notifications</b>. Cette action est <b>irréversible</b>.</p>
          <div className="mb-2">
            <label htmlFor="delete-code" className="block text-sm font-medium text-gray-700 mb-1">Code secret</label>
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={isDeleting}>Annuler</Button>
            <Button variant="destructive" onClick={handleDeleteAll} disabled={isDeleting || deleteCode.length === 0}>
              {isDeleting ? 'Suppression...' : 'Confirmer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;

export { Header };
