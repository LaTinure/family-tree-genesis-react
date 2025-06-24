
import***REMOVED***{***REMOVED***useEffect***REMOVED***}***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***useNavigate***REMOVED***}***REMOVED***from***REMOVED***'react-router-dom';
import***REMOVED***{***REMOVED***useAuth***REMOVED***}***REMOVED***from***REMOVED***'@/hooks/useAuth';
import***REMOVED***{***REMOVED***Loader2***REMOVED***}***REMOVED***from***REMOVED***'lucide-react';
import***REMOVED***{***REMOVED***ROUTES***REMOVED***}***REMOVED***from***REMOVED***'@/lib/constants/routes';

interface***REMOVED***ProtectedRouteProps***REMOVED***{
***REMOVED******REMOVED***children:***REMOVED***React.ReactNode;
***REMOVED******REMOVED***requireAuth?:***REMOVED***boolean;
}

export***REMOVED***const***REMOVED***ProtectedRoute***REMOVED***=***REMOVED***({***REMOVED***children,***REMOVED***requireAuth***REMOVED***=***REMOVED***true***REMOVED***}:***REMOVED***ProtectedRouteProps)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***user,***REMOVED***loading***REMOVED***}***REMOVED***=***REMOVED***useAuth();
***REMOVED******REMOVED***const***REMOVED***navigate***REMOVED***=***REMOVED***useNavigate();

***REMOVED******REMOVED***useEffect(()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!loading***REMOVED***&&***REMOVED***requireAuth***REMOVED***&&***REMOVED***!user)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***navigate(ROUTES.AUTH.LOGIN);
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***},***REMOVED***[user,***REMOVED***loading,***REMOVED***requireAuth,***REMOVED***navigate]);

***REMOVED******REMOVED***if***REMOVED***(loading)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="flex***REMOVED***items-center***REMOVED***justify-center***REMOVED***min-h-screen***REMOVED***bg-gradient-to-br***REMOVED***from-blue-50***REMOVED***via-white***REMOVED***to-green-50">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Loader2***REMOVED***className="w-8***REMOVED***h-8***REMOVED***animate-spin***REMOVED***text-blue-600"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED***);
***REMOVED******REMOVED***}

***REMOVED******REMOVED***if***REMOVED***(requireAuth***REMOVED***&&***REMOVED***!user)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***null;
***REMOVED******REMOVED***}

***REMOVED******REMOVED***return***REMOVED***<>{children}</>;
};
