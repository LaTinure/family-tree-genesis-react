
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
import Index from '@/pages/Index';
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
import DynastySelector from '@/pages/DynastySelector';
import DynastyCreateForm from '@/pages/DynastyCreateForm';
import DynastyPayment from '@/pages/DynastyPayment';
import DynastyPaymentSuccess from '@/pages/DynastyPaymentSuccess';
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
            {/* Routes publiques - /dynasty devient la page d'accueil par défaut */}
            <Route path={ROUTES.LANDING} element={<Layout><DynastySelector /></Layout>} />
            <Route path={ROUTES.HOME} element={<Layout><DynastySelector /></Layout>} />
            <Route path="/index" element={<Layout><Index /></Layout>} />
            <Route path={ROUTES.ABOUT} element={<Layout><About /></Layout>} />
            <Route path={ROUTES.AUTH.FAMILY} element={<Layout><AuthFamily /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/register" element={<Layout><Register /></Layout>} />
            <Route path={ROUTES.HELP} element={<Layout><Help /></Layout>} />
            <Route path={ROUTES.DYNASTY.SELECTOR} element={<Layout><DynastySelector /></Layout>} />
            <Route path={ROUTES.DYNASTY.CREATE} element={<Layout><DynastyCreateForm /></Layout>} />
            <Route path="/dynasty/payment" element={<Layout><DynastyPayment /></Layout>} />
            <Route path="/dynasty/checkout/success" element={<Layout><DynastyPaymentSuccess /></Layout>} />
            <Route path={ROUTES.INVITE} element={<Layout><DynastyInviteHandler /></Layout>} />

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

            <Route path={ROUTES.DASHBOARD.PROFILE} element={
              <ProtectedRoute>
                <Layout>
                  <DashboardProfile />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path={ROUTES.DASHBOARD.MEDIA} element={
              <ProtectedRoute>
                <Layout>
                  <Media />
                </Layout>
              </ProtectedRoute>
            } />

            {/* Nouvelles routes pour les pages du dashboard */}
            <Route path={ROUTES.DASHBOARD.CHAT} element={
              <ProtectedRoute>
                <Layout>
                  <Chat />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path={ROUTES.DASHBOARD.EVENTS} element={
              <ProtectedRoute>
                <Layout>
                  <Events />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path={ROUTES.DASHBOARD.REPORT} element={
              <ProtectedRoute>
                <Layout>
                  <Report />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path={ROUTES.DASHBOARD.CONTACT_ADMIN} element={
              <ProtectedRoute>
                <Layout>
                  <ContactAdmin />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path={ROUTES.DASHBOARD.SETTINGS} element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            } />

            <Route path={ROUTES.DASHBOARD.GESTION} element={
              <ProtectedRoute>
                <Layout>
                  <Gestion />
                </Layout>
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
