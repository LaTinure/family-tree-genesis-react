
import***REMOVED***React***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***Card,***REMOVED***CardContent,***REMOVED***CardHeader,***REMOVED***CardTitle***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/card';
import***REMOVED***{***REMOVED***TreePine***REMOVED***}***REMOVED***from***REMOVED***'lucide-react';
import***REMOVED***{***REMOVED***ImprovedFamilyTreeLayout***REMOVED***}***REMOVED***from***REMOVED***'./ImprovedFamilyTreeLayout';

export***REMOVED***const***REMOVED***FamilyTree***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Card***REMOVED***className="h-full***REMOVED***border-whatsapp-200">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<CardHeader>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<CardTitle***REMOVED***className="flex***REMOVED***items-center***REMOVED***gap-2***REMOVED***text-whatsapp-700">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<TreePine***REMOVED***className="w-5***REMOVED***h-5"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Arbre***REMOVED***Familial***REMOVED***Interactif
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</CardTitle>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</CardHeader>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<CardContent***REMOVED***className="p-4***REMOVED***h-full">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<ImprovedFamilyTreeLayout***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</CardContent>
***REMOVED******REMOVED******REMOVED******REMOVED***</Card>
***REMOVED******REMOVED***);
};
