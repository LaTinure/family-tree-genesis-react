import***REMOVED***React,***REMOVED***{***REMOVED***useEffect,***REMOVED***useRef***REMOVED***}***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***useNavigate,***REMOVED***useLocation***REMOVED***}***REMOVED***from***REMOVED***'react-router-dom';
import***REMOVED***{***REMOVED***useAuth***REMOVED***}***REMOVED***from***REMOVED***'@/hooks/useAuth';
import***REMOVED***{***REMOVED***useQuery***REMOVED***}***REMOVED***from***REMOVED***'@tanstack/react-query';
import***REMOVED***{***REMOVED***supabase***REMOVED***}***REMOVED***from***REMOVED***'@/lib/supabaseClient';
import***REMOVED***{***REMOVED***ROUTES***REMOVED***}***REMOVED***from***REMOVED***'@/lib/constants/routes';
import***REMOVED***{***REMOVED***AppLoader***REMOVED***}***REMOVED***from***REMOVED***'@/components/shared/AppLoader';

interface***REMOVED***AuthRedirectProps***REMOVED***{
***REMOVED******REMOVED***children:***REMOVED***React.ReactNode;
}

export***REMOVED***const***REMOVED***AuthRedirect:***REMOVED***React.FC<AuthRedirectProps>***REMOVED***=***REMOVED***({***REMOVED***children***REMOVED***})***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***user,***REMOVED***loading***REMOVED***}***REMOVED***=***REMOVED***useAuth();
***REMOVED******REMOVED***const***REMOVED***location***REMOVED***=***REMOVED***useLocation();
***REMOVED******REMOVED***const***REMOVED***navigate***REMOVED***=***REMOVED***useNavigate();
***REMOVED******REMOVED***const***REMOVED***hasRedirected***REMOVED***=***REMOVED***useRef(false);

***REMOVED******REMOVED***//***REMOVED***Vérifier***REMOVED***si***REMOVED***l'utilisateur***REMOVED***a***REMOVED***une***REMOVED***dynastie***REMOVED***et***REMOVED***son***REMOVED***rôle
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***profile,***REMOVED***isLoading:***REMOVED***profileLoading***REMOVED***}***REMOVED***=***REMOVED***useQuery({
***REMOVED******REMOVED******REMOVED******REMOVED***queryKey:***REMOVED***['user-profile',***REMOVED***user?.id],
***REMOVED******REMOVED******REMOVED******REMOVED***queryFn:***REMOVED***async***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!user)***REMOVED***return***REMOVED***null;

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('dynasty_id,***REMOVED***user_role')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('user_id',***REMOVED***user.id)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('Error***REMOVED***checking***REMOVED***profile:',***REMOVED***error);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***null;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***data;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('Error***REMOVED***in***REMOVED***profile***REMOVED***query:',***REMOVED***error);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***null;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***enabled:***REMOVED***!!user,
***REMOVED******REMOVED******REMOVED******REMOVED***retry:***REMOVED***1,
***REMOVED******REMOVED***});

***REMOVED******REMOVED***//***REMOVED***Routes***REMOVED***qui***REMOVED***ne***REMOVED***nécessitent***REMOVED***pas***REMOVED***de***REMOVED***redirection***REMOVED***(routes***REMOVED***publiques)
***REMOVED******REMOVED***const***REMOVED***publicRoutes***REMOVED***=***REMOVED***[
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.LANDING,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.HOME,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.DYNASTY.SELECTOR,
***REMOVED******REMOVED******REMOVED******REMOVED***'/dynasty',
***REMOVED******REMOVED******REMOVED******REMOVED***'/index',
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.ABOUT,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.HELP,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.AUTH.FAMILY,
***REMOVED******REMOVED******REMOVED******REMOVED***'/login',
***REMOVED******REMOVED******REMOVED******REMOVED***'/register',
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.DYNASTY.CREATE,
***REMOVED******REMOVED******REMOVED******REMOVED***'/dynasty/payment',
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.INVITE,
***REMOVED******REMOVED******REMOVED******REMOVED***'/register-before-payment',
***REMOVED******REMOVED******REMOVED******REMOVED***'/dynasty/checkout/success',
***REMOVED******REMOVED***];

***REMOVED******REMOVED***//***REMOVED***Routes***REMOVED***protégées***REMOVED***nécessitant***REMOVED***une***REMOVED***dynastie
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
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.DASHBOARD.MEDIA,
***REMOVED******REMOVED******REMOVED******REMOVED***ROUTES.PROFILE,
***REMOVED******REMOVED***];

***REMOVED******REMOVED***const***REMOVED***isPublicRoute***REMOVED***=***REMOVED***publicRoutes.includes(location.pathname);
***REMOVED******REMOVED***const***REMOVED***isProtectedRoute***REMOVED***=***REMOVED***protectedRoutes.some(route***REMOVED***=>***REMOVED***location.pathname.startsWith(route));

***REMOVED******REMOVED***useEffect(()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Reset***REMOVED***redirect***REMOVED***flag***REMOVED***when***REMOVED***user***REMOVED***or***REMOVED***profile***REMOVED***changes
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(user***REMOVED***!==***REMOVED***null***REMOVED***||***REMOVED***profile***REMOVED***!==***REMOVED***null)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***hasRedirected.current***REMOVED***=***REMOVED***false;
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***},***REMOVED***[user,***REMOVED***profile]);

***REMOVED******REMOVED***useEffect(()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(loading***REMOVED***||***REMOVED***profileLoading***REMOVED***||***REMOVED***hasRedirected.current)***REMOVED***return;

***REMOVED******REMOVED******REMOVED******REMOVED***console.log('🔍***REMOVED***AuthRedirect***REMOVED***-***REMOVED***User:',***REMOVED***!!user,***REMOVED***'Profile:',***REMOVED***profile,***REMOVED***'Path:',***REMOVED***location.pathname);

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Utilisateur***REMOVED***non***REMOVED***connecté
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!user)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(isProtectedRoute)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('🚫***REMOVED***User***REMOVED***non***REMOVED***connecté,***REMOVED***redirection***REMOVED***vers***REMOVED***login');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***hasRedirected.current***REMOVED***=***REMOVED***true;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***navigate(ROUTES.AUTH.FAMILY,***REMOVED***{***REMOVED***replace:***REMOVED***true***REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return;
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Utilisateur***REMOVED***connecté
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(profile?.dynasty_id)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***S'il***REMOVED***a***REMOVED***une***REMOVED***dynastie,***REMOVED***rediriger***REMOVED***vers***REMOVED***dashboard***REMOVED***sauf***REMOVED***si***REMOVED***déjà***REMOVED***sur***REMOVED***une***REMOVED***route***REMOVED***de***REMOVED***création
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(isPublicRoute***REMOVED***&&
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***!location.pathname.includes('/dynasty/create')***REMOVED***&&
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***!location.pathname.includes('/dynasty/payment')***REMOVED***&&
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***!location.pathname.includes('/dynasty/checkout/success'))***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('✅***REMOVED***User***REMOVED***avec***REMOVED***dynastie,***REMOVED***redirection***REMOVED***vers***REMOVED***dashboard');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***hasRedirected.current***REMOVED***=***REMOVED***true;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***navigate(ROUTES.DASHBOARD.ROOT,***REMOVED***{***REMOVED***replace:***REMOVED***true***REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***else***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Pas***REMOVED***de***REMOVED***dynastie***REMOVED***:***REMOVED***rediriger***REMOVED***vers***REMOVED***/dynasty***REMOVED***sauf***REMOVED***si***REMOVED***déjà***REMOVED***sur***REMOVED***une***REMOVED***route***REMOVED***de***REMOVED***création
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(isProtectedRoute)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('⚠️***REMOVED***User***REMOVED***sans***REMOVED***dynastie,***REMOVED***redirection***REMOVED***vers***REMOVED***/dynasty');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***hasRedirected.current***REMOVED***=***REMOVED***true;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***navigate(ROUTES.DYNASTY.SELECTOR,***REMOVED***{***REMOVED***replace:***REMOVED***true***REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***},***REMOVED***[user,***REMOVED***loading,***REMOVED***profile,***REMOVED***profileLoading,***REMOVED***location.pathname,***REMOVED***navigate,***REMOVED***isPublicRoute,***REMOVED***isProtectedRoute]);

***REMOVED******REMOVED***//***REMOVED***Afficher***REMOVED***loader***REMOVED***pendant***REMOVED***chargement***REMOVED***user/profile
***REMOVED******REMOVED***if***REMOVED***(loading***REMOVED***||***REMOVED***(user***REMOVED***&&***REMOVED***profileLoading))***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***<AppLoader***REMOVED***onComplete={()***REMOVED***=>***REMOVED***{}}***REMOVED***/>;
***REMOVED******REMOVED***}

***REMOVED******REMOVED***return***REMOVED***<>{children}</>;
};

export***REMOVED***default***REMOVED***AuthRedirect;
