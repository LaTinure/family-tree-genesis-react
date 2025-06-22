import***REMOVED***{***REMOVED***useLocation***REMOVED***}***REMOVED***from***REMOVED***"react-router-dom";
import***REMOVED***{***REMOVED***useEffect***REMOVED***}***REMOVED***from***REMOVED***"react";

const***REMOVED***NotFound***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***location***REMOVED***=***REMOVED***useLocation();

***REMOVED******REMOVED***useEffect(()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***console.error(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"404***REMOVED***Error:***REMOVED***User***REMOVED***attempted***REMOVED***to***REMOVED***access***REMOVED***non-existent***REMOVED***route:",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***location.pathname
***REMOVED******REMOVED******REMOVED******REMOVED***);
***REMOVED******REMOVED***},***REMOVED***[location.pathname]);

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="min-h-screen***REMOVED***flex***REMOVED***items-center***REMOVED***justify-center***REMOVED***bg-gray-100">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="text-center">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<h1***REMOVED***className="text-4xl***REMOVED***font-bold***REMOVED***mb-4">404</h1>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<p***REMOVED***className="text-xl***REMOVED***text-gray-600***REMOVED***mb-4">Oops!***REMOVED***Page***REMOVED***not***REMOVED***found</p>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<a***REMOVED***href="/"***REMOVED***className="text-blue-500***REMOVED***hover:text-blue-700***REMOVED***underline">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Return***REMOVED***to***REMOVED***Home
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</a>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED***);
};

export***REMOVED***default***REMOVED***NotFound;
