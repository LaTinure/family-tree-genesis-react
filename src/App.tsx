
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Layout } from '@/components/layout/Layout';
import { AppLoader } from '@/components/shared/AppLoader';
import { AuthRedirect } from '@/components/auth/AuthRedirect';
import { ROUTES } from '@/lib/constants/routes';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
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
import DashboardProfile from '@/pages/dashboard/Profile';
import Chat from '@/pages/dashboard/Chat';
import Events from '@/pages/dashboard/Events';
import Report from '@/pages/dashboard/Report';
import ContactAdmin from '@/pages/dashboard/ContactAdmin';
import Settings from '@/pages/dashboard/Settings';
import Gestion from '@/pages/dashboard/Gestion';
import Help from '@/pages/Help';
import DynastyCreate from '@/pages/DynastyCreate';
import DynastyInviteHandler from '@/components/DynastyInviteHandler';
import Media from '@/pages/dashboard/Media';

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
          <AuthRedirect>
            <Routes>
              {/* Page d'accueil */}
              <Route path="/" element={<Layout><Home /></Layout>} />
              
              {/* Routes publiques */}
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/help" element={<Layout><Help /></Layout>} />
              <Route path="/auth-family" element={<Layout><AuthFamily /></Layout>} />
              <Route path="/login" element={<Layout><Login /></Layout>} />
              <Route path="/register" element={<Layout><Register /></Layout>} />
              
              {/* Création de dynastie */}
              <Route path="/dynasty/create" element={<Layout><DynastyCreate /></Layout>} />
              
              {/* Gestion des invitations */}
              <Route path="/invite" element={<Layout><DynastyInviteHandler /></Layout>} />

              {/* Routes protégées */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Layout><Profile /></Layout>
                </ProtectedRoute>
              } />

              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layout><Dashboard /></Layout>
                </ProtectedRoute>
              } />

              <Route path="/dashboard/tree" element={
                <ProtectedRoute>
                  <Layout><FamilyTree /></Layout>
                </ProtectedRoute>
              } />

              <Route path="/dashboard/members" element={
                <ProtectedRoute>
                  <Layout><Members /></Layout>
                </ProtectedRoute>
              } />

              <Route path="/dashboard/admin" element={
                <ProtectedRoute>
                  <Layout><Admin /></Layout>
                </ProtectedRoute>
              } />

              <Route path="/dashboard/messages" element={
                <ProtectedRoute>
                  <Layout><Messages /></Layout>
                </ProtectedRoute>
              } />

              <Route path="/dashboard/notifications" element={
                <ProtectedRoute>
                  <Layout><Notifications /></Layout>
                </ProtectedRoute>
              } />

              <Route path="/dashboard/invite" element={
                <ProtectedRoute>
                  <Layout><Invite /></Layout>
                </ProtectedRoute>
              } />

              <Route path="/dashboard/profile" element={
                <ProtectedRoute>
                  <Layout><DashboardProfile /></Layout>
                </ProtectedRoute>
              } />

              <Route path="/dashboard/media" element={
                <ProtectedRoute>
                  <Layout><Media /></Layout>
                </ProtectedRoute>
              } />

              <Route path="/dashboard/chat" element={
                <ProtectedRoute>
                  <Layout><Chat /></Layout>
                </ProtectedRoute>
              } />

              <Route path="/dashboard/events" element={
                <ProtectedRoute>
                  <Layout><Events /></Layout>
                </ProtectedRoute>
              } />

              <Route path="/dashboard/report" element={
                <ProtectedRoute>
                  <Layout><Report /></Layout>
                </ProtectedRoute>
              } />

              <Route path="/dashboard/contact-admin" element={
                <ProtectedRoute>
                  <Layout><ContactAdmin /></Layout>
                </ProtectedRoute>
              } />

              <Route path="/dashboard/settings" element={
                <ProtectedRoute>
                  <Layout><Settings /></Layout>
                </ProtectedRoute>
              } />

              <Route path="/dashboard/gestion" element={
                <ProtectedRoute>
                  <Layout><Gestion /></Layout>
                </ProtectedRoute>
              } />
            </Routes>
          </AuthRedirect>

          <Toaster />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
