import***REMOVED***React***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***useAuth***REMOVED***}***REMOVED***from***REMOVED***'@/hooks/useAuth';
import***REMOVED***{***REMOVED***useNavigate***REMOVED***}***REMOVED***from***REMOVED***'react-router-dom';
import***REMOVED***{***REMOVED***ROUTES***REMOVED***}***REMOVED***from***REMOVED***'@/lib/constants/routes';
import***REMOVED***{***REMOVED***Loader2***REMOVED***}***REMOVED***from***REMOVED***'lucide-react';

interface***REMOVED***ProtectedRouteProps***REMOVED***{
***REMOVED******REMOVED***children:***REMOVED***React.ReactNode;
}

export***REMOVED***const***REMOVED***ProtectedRoute:***REMOVED***React.FC<ProtectedRouteProps>***REMOVED***=***REMOVED***({***REMOVED***children***REMOVED***})***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***user,***REMOVED***loading***REMOVED***}***REMOVED***=***REMOVED***useAuth();
***REMOVED******REMOVED***const***REMOVED***navigate***REMOVED***=***REMOVED***useNavigate();

***REMOVED******REMOVED***if***REMOVED***(loading)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="min-h-screen***REMOVED***flex***REMOVED***items-center***REMOVED***justify-center***REMOVED***bg-gradient-to-br***REMOVED***from-whatsapp-50***REMOVED***via-green-50***REMOVED***to-emerald-50">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="text-center">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Loader2***REMOVED***className="w-8***REMOVED***h-8***REMOVED***animate-spin***REMOVED***mx-auto***REMOVED***mb-4***REMOVED***text-whatsapp-600"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<p***REMOVED***className="text-gray-600">Chargement...</p>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED***);
***REMOVED******REMOVED***}

***REMOVED******REMOVED***if***REMOVED***(!user)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***navigate(ROUTES.AUTH.FAMILY);
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***null;
***REMOVED******REMOVED***}

***REMOVED******REMOVED***return***REMOVED***<>{children}</>;
};
