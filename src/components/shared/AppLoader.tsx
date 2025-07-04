
import***REMOVED***React***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***Loader2,***REMOVED***TreePine***REMOVED***}***REMOVED***from***REMOVED***'lucide-react';

interface***REMOVED***AppLoaderProps***REMOVED***{
***REMOVED******REMOVED***onComplete?:***REMOVED***()***REMOVED***=>***REMOVED***void;
}

export***REMOVED***const***REMOVED***AppLoader:***REMOVED***React.FC<AppLoaderProps>***REMOVED***=***REMOVED***({***REMOVED***onComplete***REMOVED***})***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="min-h-screen***REMOVED***bg-gradient-to-br***REMOVED***from-whatsapp-50***REMOVED***via-green-50***REMOVED***to-emerald-50***REMOVED***flex***REMOVED***items-center***REMOVED***justify-center">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="text-center">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="mb-8">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<TreePine***REMOVED***className="w-16***REMOVED***h-16***REMOVED***text-whatsapp-600***REMOVED***mx-auto***REMOVED***mb-4***REMOVED***animate-pulse"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<h1***REMOVED***className="text-2xl***REMOVED***font-bold***REMOVED***text-whatsapp-700***REMOVED***mb-2">Famille***REMOVED***Connect</h1>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<p***REMOVED***className="text-gray-600">Chargement***REMOVED***de***REMOVED***votre***REMOVED***espace***REMOVED***familial...</p>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Loader2***REMOVED***className="w-8***REMOVED***h-8***REMOVED***text-whatsapp-600***REMOVED***mx-auto***REMOVED***animate-spin"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED***);
};
