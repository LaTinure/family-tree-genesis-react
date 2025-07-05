
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ROUTES } from '@/lib/constants/routes';
import { AppLoader } from '@/components/shared/AppLoader';

interface AuthRedirectProps {
  children: React.ReactNode;
}

export const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();

  // Vérifier si l'utilisateur a une dynastie
  const { data: hasDynasty, isLoading: dynastyLoading } = useQuery({
    queryKey: ['user-dynasty', user?.id],
    queryFn: async () => {
      if (!user) return false;

      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error checking profile:', error);
        return false;
      }

      return !!data;
    },
    enabled: !!user,
  });

  // Routes qui ne nécessitent pas de redirection
  const publicRoutes = [
    ROUTES.HOME,
    ROUTES.DYNASTY.SELECTOR,
    '/index',
    ROUTES.ABOUT,
    ROUTES.HELP,
    ROUTES.AUTH.FAMILY,
    '/login',
    '/register',
    ROUTES.DYNASTY.CREATE,
    '/dynasty/payment',
    ROUTES.INVITE,
  ];

  // Routes protégées qui nécessitent une dynastie
  const protectedRoutes = [
    ROUTES.DASHBOARD.ROOT,
    ROUTES.DASHBOARD.TREE,
    ROUTES.DASHBOARD.MEMBERS,
    ROUTES.DASHBOARD.ADMIN,
    ROUTES.DASHBOARD.MESSAGES,
    ROUTES.DASHBOARD.NOTIFICATIONS,
    ROUTES.DASHBOARD.INVITE,
    ROUTES.DASHBOARD.PROFILE,
    ROUTES.DASHBOARD.CHAT,
    ROUTES.DASHBOARD.EVENTS,
    ROUTES.DASHBOARD.REPORT,
    ROUTES.DASHBOARD.CONTACT_ADMIN,
    ROUTES.DASHBOARD.SETTINGS,
    ROUTES.DASHBOARD.GESTION,
    ROUTES.DASHBOARD.MEDIA,
    ROUTES.PROFILE,
  ];

  const isPublicRoute = publicRoutes.includes(location.pathname);
  const isProtectedRoute = protectedRoutes.some(route => location.pathname.startsWith(route));

  useEffect(() => {
    // Attendre que l'authentification et la vérification de dynastie soient terminées
    if (authLoading || (user && dynastyLoading)) {
      return;
    }

    // Si l'utilisateur n'est pas connecté
    if (!user) {
      // Si on est sur une route protégée, rediriger vers la page d'accueil (/dynasty)
      if (isProtectedRoute) {
        navigate(ROUTES.HOME);
      }
      return;
    }

    // Si l'utilisateur est connecté
    if (user) {
      // Si l'utilisateur n'a pas de dynastie
      if (!hasDynasty) {
        // Si on n'est pas déjà sur la page de sélection de dynastie
        if (location.pathname !== ROUTES.HOME) {
          navigate(ROUTES.HOME);
        }
        return;
      }

      // Si l'utilisateur a une dynastie et tente d'accéder aux pages publiques
      if (hasDynasty) {
        // Rediriger vers le dashboard si on essaie d'accéder aux pages publiques principales
        const redirectRoutes = [ROUTES.LANDING, ROUTES.HOME, ROUTES.DYNASTY.SELECTOR];
        if (redirectRoutes.includes(location.pathname)) {
          navigate(ROUTES.DASHBOARD.ROOT);
        }
        return;
      }
    }
  }, [user, hasDynasty, authLoading, dynastyLoading, location.pathname, navigate, isPublicRoute, isProtectedRoute]);

  // Afficher le loader pendant le chargement
  if (authLoading || (user && dynastyLoading)) {
    return <AppLoader onComplete={() => {}} />;
  }

  return <>{children}</>;
};
