
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Layout } from '@/components/layout/Layout';
import { AppLoader } from '@/components/shared/AppLoader';
import { ROUTES } from '@/lib/constants/routes';

// Pages
import Index from '@/pages/Index';
import Profile from '@/pages/Profile';
import Dashboard from '@/pages/Dashboard';
import AuthFamily from '@/pages/auth/AuthFamily';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import FamilyTree from '@/pages/dashboard/FamilyTree';
import Members from '@/pages/dashboard/Members';
import Admin from '@/pages/dashboard/Admin';
import Messages from '@/pages/dashboard/Messages';
import Notifications from '@/pages/dashboard/Notifications';
import Invite from '@/pages/dashboard/Invite';

// Configuration React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement de l'application
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AppLoader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Routes publiques */}
            <Route path={ROUTES.HOME} element={<Layout><Index /></Layout>} />
            <Route path={ROUTES.AUTH.FAMILY} element={<AuthFamily />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Routes protégées */}
            <Route path={ROUTES.PROFILE} element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path={ROUTES.DASHBOARD.ROOT} element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path={ROUTES.DASHBOARD.TREE} element={
              <ProtectedRoute>
                <Layout>
                  <FamilyTree />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path={ROUTES.DASHBOARD.MEMBERS} element={
              <ProtectedRoute>
                <Layout>
                  <Members />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path={ROUTES.DASHBOARD.ADMIN} element={
              <ProtectedRoute>
                <Layout>
                  <Admin />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path={ROUTES.DASHBOARD.MESSAGES} element={
              <ProtectedRoute>
                <Layout>
                  <Messages />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path={ROUTES.DASHBOARD.NOTIFICATIONS} element={
              <ProtectedRoute>
                <Layout>
                  <Notifications />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path={ROUTES.DASHBOARD.INVITE} element={
              <ProtectedRoute>
                <Layout>
                  <Invite />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>

          <Toaster />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
