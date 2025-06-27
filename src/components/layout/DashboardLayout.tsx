
import***REMOVED***{***REMOVED***ReactNode***REMOVED***}***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***Header***REMOVED***}***REMOVED***from***REMOVED***'@/components/layout/Header';
import***REMOVED***MainNavBar***REMOVED***from***REMOVED***'@/components/navigation/MainNavBar';

interface***REMOVED***DashboardLayoutProps***REMOVED***{
***REMOVED******REMOVED***children:***REMOVED***ReactNode;
}

const***REMOVED***DashboardLayout***REMOVED***=***REMOVED***({***REMOVED***children***REMOVED***}:***REMOVED***DashboardLayoutProps)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="min-h-screen***REMOVED***bg-gradient-to-br***REMOVED***from-whatsapp-50***REMOVED***via-green-50***REMOVED***to-emerald-50">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Header***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<MainNavBar***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<main***REMOVED***className="pt-4">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{children}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</main>
***REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED***);
};

export***REMOVED***default***REMOVED***DashboardLayout;
