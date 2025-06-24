
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { 
  User, 
  LogOut, 
  Settings, 
  Users, 
  TreePine, 
  MessageSquare,
  Bell,
  Menu,
  X,
  Trash2
} from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const Header = () => {
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAll = async () => {
    if (!confirm('⚠️ ATTENTION: Cette action supprimera TOUTES les données. Continuer ?')) {
      return;
    }

    if (!confirm('Dernière confirmation: Voulez-vous vraiment tout supprimer ?')) {
      return;
    }

    setIsDeleting(true);

    try {
      const { data, error } = await supabase.functions.invoke('delete-all-data', {
        method: 'POST'
      });

      if (error) throw error;

      toast({
        title: "Suppression réussie",
        description: "Toutes les données ont été supprimées.",
      });

      await signOut();
      navigate(ROUTES.HOME);
      window.location.reload();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const navigation = [
    { name: 'Accueil', href: ROUTES.HOME },
    { name: 'Dashboard', href: ROUTES.DASHBOARD.ROOT },
    { name: 'Arbre', href: ROUTES.DASHBOARD.TREE },
    { name: 'Membres', href: ROUTES.DASHBOARD.MEMBERS },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-2">
            <TreePine className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-800">Famille Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-green-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <UserAvatar
                      user={{
                        first_name: profile?.first_name,
                        last_name: profile?.last_name,
                        avatar_url: profile?.avatar_url,
                        photo_url: profile?.photo_url,
                      }}
                      size="sm"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{profile?.first_name} {profile?.last_name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {profile?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate(ROUTES.PROFILE)}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(ROUTES.DASHBOARD.MESSAGES)}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Messages</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(ROUTES.DASHBOARD.NOTIFICATIONS)}>
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notifications</span>
                  </DropdownMenuItem>
                  {profile?.is_admin && (
                    <DropdownMenuItem onClick={() => navigate(ROUTES.DASHBOARD.ADMIN)}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Administration</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  {profile?.is_admin && (
                    <DropdownMenuItem
                      onClick={handleDeleteAll}
                      disabled={isDeleting}
                      className="text-red-600 focus:text-red-600"
                    >
                      {isDeleting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2" />
                          Suppression...
                        </>
                      ) : (
                        <>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete All
                        </>
                      )}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={() => navigate(ROUTES.AUTH.LOGIN)}>
                  Connexion
                </Button>
                <Button onClick={() => navigate(ROUTES.AUTH.REGISTER)}>
                  Inscription
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
