import***REMOVED***{***REMOVED***Card,***REMOVED***CardHeader,***REMOVED***CardTitle,***REMOVED***CardContent***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/card';
import***REMOVED***{***REMOVED***Input***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/input';
import***REMOVED***{***REMOVED***Users***REMOVED***}***REMOVED***from***REMOVED***'lucide-react';

const***REMOVED***Chat***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<div***REMOVED***className="min-h-screen***REMOVED***bg-gradient-to-br***REMOVED***from-blue-50***REMOVED***via-white***REMOVED***to-green-50***REMOVED***p-8***REMOVED***pt-24">
***REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="max-w-2xl***REMOVED***mx-auto">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Card>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<CardHeader***REMOVED***className="flex***REMOVED***flex-row***REMOVED***items-center***REMOVED***gap-2">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Users***REMOVED***className="w-8***REMOVED***h-8***REMOVED***text-green-600"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<CardTitle>Chat***REMOVED***familial</CardTitle>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</CardHeader>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<CardContent>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Input***REMOVED***placeholder="Rechercher***REMOVED***un***REMOVED***membre..."***REMOVED***className="max-w-xs***REMOVED***mb-4"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="w-full***REMOVED***mt-6***REMOVED***text-center***REMOVED***text-gray-500">Aucun***REMOVED***membre***REMOVED***actif***REMOVED***pour***REMOVED***l'instant.</div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</CardContent>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Card>
***REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED***</div>
);

export***REMOVED***default***REMOVED***Chat;
