import***REMOVED***React,***REMOVED***{***REMOVED***useEffect***REMOVED***}***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***useNavigate,***REMOVED***useLocation***REMOVED***}***REMOVED***from***REMOVED***'react-router-dom';
import***REMOVED***{***REMOVED***useAuth***REMOVED***}***REMOVED***from***REMOVED***'@/hooks/useAuth';
import***REMOVED***{***REMOVED***useQuery***REMOVED***}***REMOVED***from***REMOVED***'@tanstack/react-query';
import***REMOVED***{***REMOVED***supabase***REMOVED***}***REMOVED***from***REMOVED***'@/integrations/supabase/client';
import***REMOVED***{***REMOVED***ROUTES***REMOVED***}***REMOVED***from***REMOVED***'@/lib/constants/routes';
import***REMOVED***{***REMOVED***AppLoader***REMOVED***}***REMOVED***from***REMOVED***'@/components/shared/AppLoader';

interface***REMOVED***AuthRedirectProps***REMOVED***{
***REMOVED******REMOVED***children:***REMOVED***React.ReactNode;
}

export***REMOVED***const***REMOVED***AuthRedirect:***REMOVED***React.FC<AuthRedirectProps>***REMOVED***=***REMOVED***({***REMOVED***children***REMOVED***})***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***navigate***REMOVED***=***REMOVED***useNavigate();
***REMOVED******REMOVED***const***REMOVED***location***REMOVED***=***REMOVED***useLocation();
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***user,***REMOVED***loading:***REMOVED***authLoading***REMOVED***}***REMOVED***=***REMOVED***useAuth();

***REMOVED******REMOVED***//***REMOVED***Vérifier***REMOVED***si***REMOVED***l'utilisateur***REMOVED***a***REMOVED***une***REMOVED***dynastie
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***hasDynasty,***REMOVED***isLoading:***REMOVED***dynastyLoading***REMOVED***}***REMOVED***=***REMOVED***useQuery({
***REMOVED******REMOVED******REMOVED******REMOVED***queryKey:***REMOVED***['user-dynasty',***REMOVED***user?.id],
***REMOVED******REMOVED******REMOVED******REMOVED***queryFn:***REMOVED***async***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!user)***REMOVED***return***REMOVED***false;

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***TODO:***REMOVED***Implémenter***REMOVED***la***REMOVED***vraie***REMOVED***vérification***REMOVED***de***REMOVED***dynastie
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Pour***REMOVED***l'instant,***REMOVED***on***REMOVED***considère***REMOVED***que***REMOVED***l'utilisateur***REMOVED***a***REMOVED***une***REMOVED***dynastie***REMOVED***s'il***REMOVED***a***REMOVED***un***REMOVED***profil
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('id')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('user_id',***REMOVED***user.id)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('Error***REMOVED***checking***REMOVED***profile:',***REMOVED***error);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***false;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***TODO:***REMOVED***Vérifier***REMOVED***si***REMOVED***le***REMOVED***profil***REMOVED***a***REMOVED***une***REMOVED***dynastie***REMOVED***associée
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Pour***REMOVED***l'instant,***REMOVED***on***REMOVED***retourne***REMOVED***true***REMOVED***si***REMOVED***le***REMOVED***profil***REMOVED***existe
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***!!data;
***REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***enabled:***REMOVED***!!user,
***REMOVED******REMOVED***});

***REMOVED******REMOVED***//***REMOVED***Routes***REMOVED***qui***REMOVED***ne***REMOVED***nécessitent***REMOVED***pas***REMOVED***de***REMOVED***redirection
***REMOVED******REMOVED***const***REMOVED***publicRoutes***REMOVED***=***REMOVED***[
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.LANDING,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.ABOUT,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.HELP,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.AUTH.FAMILY,
***REMOVED******REMOVED******REMOVED******REMOVED***'/login',
***REMOVED******REMOVED******REMOVED******REMOVED***'/register',
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.HOME,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.DYNASTY.CREATE,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.INVITE,
***REMOVED******REMOVED***];

***REMOVED******REMOVED***//***REMOVED***Routes***REMOVED***protégées***REMOVED***qui***REMOVED***nécessitent***REMOVED***une***REMOVED***dynastie
***REMOVED******REMOVED***const***REMOVED***protectedRoutes***REMOVED***=***REMOVED***[
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.DASHBOARD.ROOT,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.DASHBOARD.TREE,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.DASHBOARD.MEMBERS,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.DASHBOARD.ADMIN,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.DASHBOARD.MESSAGES,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.DASHBOARD.NOTIFICATIONS,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.DASHBOARD.INVITE,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.DASHBOARD.PROFILE,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.DASHBOARD.CHAT,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.DASHBOARD.EVENTS,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.DASHBOARD.REPORT,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.DASHBOARD.CONTACT_ADMIN,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.DASHBOARD.SETTINGS,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.DASHBOARD.GESTION,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.PROFILE,
***REMOVED******REMOVED***];

***REMOVED******REMOVED***const***REMOVED***isPublicRoute***REMOVED***=***REMOVED***publicRoutes.includes(location.pathname);
***REMOVED******REMOVED***const***REMOVED***isProtectedRoute***REMOVED***=***REMOVED***protectedRoutes.some(route***REMOVED***=>***REMOVED***location.pathname.startsWith(route));

***REMOVED******REMOVED***useEffect(()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Attendre***REMOVED***que***REMOVED***l'authentification***REMOVED***et***REMOVED***la***REMOVED***vérification***REMOVED***de***REMOVED***dynastie***REMOVED***soient***REMOVED***terminées
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(authLoading***REMOVED***||***REMOVED***(user***REMOVED***&&***REMOVED***dynastyLoading))***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return;
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Si***REMOVED***l'utilisateur***REMOVED***n'est***REMOVED***pas***REMOVED***connecté
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!user)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Si***REMOVED***on***REMOVED***est***REMOVED***sur***REMOVED***une***REMOVED***route***REMOVED***protégée,***REMOVED***rediriger***REMOVED***vers***REMOVED***la***REMOVED***page***REMOVED***d'accueil
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(isProtectedRoute)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***navigate(ROUTES.LANDING);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return;
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Si***REMOVED***l'utilisateur***REMOVED***est***REMOVED***connecté
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(user)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Si***REMOVED***l'utilisateur***REMOVED***n'a***REMOVED***pas***REMOVED***de***REMOVED***dynastie
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!hasDynasty)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Si***REMOVED***on***REMOVED***n'est***REMOVED***pas***REMOVED***déjà***REMOVED***sur***REMOVED***la***REMOVED***page***REMOVED***de***REMOVED***sélection***REMOVED***de***REMOVED***dynastie
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(location.pathname***REMOVED***!==***REMOVED***ROUTES.HOME)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***navigate(ROUTES.HOME);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Si***REMOVED***l'utilisateur***REMOVED***a***REMOVED***une***REMOVED***dynastie
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(hasDynasty)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Si***REMOVED***on***REMOVED***est***REMOVED***sur***REMOVED***une***REMOVED***route***REMOVED***publique***REMOVED***(sauf***REMOVED***les***REMOVED***pages***REMOVED***d'aide),***REMOVED***rediriger***REMOVED***vers***REMOVED***le***REMOVED***dashboard
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(isPublicRoute***REMOVED***&&***REMOVED***location.pathname***REMOVED***!==***REMOVED***ROUTES.ABOUT***REMOVED***&&***REMOVED***location.pathname***REMOVED***!==***REMOVED***ROUTES.HELP)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***navigate(ROUTES.DASHBOARD.ROOT);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***},***REMOVED***[user,***REMOVED***hasDynasty,***REMOVED***authLoading,***REMOVED***dynastyLoading,***REMOVED***location.pathname,***REMOVED***navigate,***REMOVED***isPublicRoute,***REMOVED***isProtectedRoute]);

***REMOVED******REMOVED***//***REMOVED***Afficher***REMOVED***le***REMOVED***loader***REMOVED***pendant***REMOVED***le***REMOVED***chargement
***REMOVED******REMOVED***if***REMOVED***(authLoading***REMOVED***||***REMOVED***(user***REMOVED***&&***REMOVED***dynastyLoading))***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***<AppLoader***REMOVED***/>;
***REMOVED******REMOVED***}

***REMOVED******REMOVED***return***REMOVED***<>{children}</>;
};
