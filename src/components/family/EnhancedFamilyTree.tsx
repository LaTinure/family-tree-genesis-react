
import***REMOVED***React,***REMOVED***{***REMOVED***useEffect,***REMOVED***useRef,***REMOVED***useState***REMOVED***}***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***Card,***REMOVED***CardContent,***REMOVED***CardHeader,***REMOVED***CardTitle***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/card';
import***REMOVED***{***REMOVED***Button***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/button';
import***REMOVED***{***REMOVED***Input***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/input';
import***REMOVED***{***REMOVED***ZoomIn,***REMOVED***ZoomOut,***REMOVED***RotateCcw,***REMOVED***Search,***REMOVED***Crown,***REMOVED***Phone,***REMOVED***MapPin***REMOVED***}***REMOVED***from***REMOVED***'lucide-react';
import***REMOVED***{***REMOVED***useFamilyMembers***REMOVED***}***REMOVED***from***REMOVED***'@/hooks/useFamilyMembers';
import***REMOVED***{***REMOVED***LoadingSpinner***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/loading-spinner';
import***REMOVED***{***REMOVED***FamilyMember***REMOVED***}***REMOVED***from***REMOVED***'@/types/family';
import***REMOVED***{***REMOVED***ImprovedFamilyTreeLayout***REMOVED***}***REMOVED***from***REMOVED***'./ImprovedFamilyTreeLayout';

export***REMOVED***const***REMOVED***EnhancedFamilyTree***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="h-full">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<ImprovedFamilyTreeLayout***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED***);
};
