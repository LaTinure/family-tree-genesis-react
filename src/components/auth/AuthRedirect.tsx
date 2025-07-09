
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface AuthRedirectProps {
  children: React.ReactNode;
}

export const AuthRedirect = ({ children }: AuthRedirectProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && user) {
      // Si l'utilisateur est connecté et sur une page d'auth, rediriger vers le dashboard
      const authPages = ['/auth-family', '/login', '/register'];
      if (authPages.includes(location.pathname)) {
        navigate('/dashboard');
      }
    }
  }, [user, loading, location.pathname, navigate]);

  return <>{children}</>;
};
