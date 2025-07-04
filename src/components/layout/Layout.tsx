
import***REMOVED***React***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***Header***REMOVED***}***REMOVED***from***REMOVED***'./Header';
import***REMOVED***{***REMOVED***Footer***REMOVED***}***REMOVED***from***REMOVED***'./Footer';

interface***REMOVED***LayoutProps***REMOVED***{
***REMOVED******REMOVED***children:***REMOVED***React.ReactNode;
***REMOVED******REMOVED***showHeader?:***REMOVED***boolean;
***REMOVED******REMOVED***showFooter?:***REMOVED***boolean;
}

export***REMOVED***const***REMOVED***Layout:***REMOVED***React.FC<LayoutProps>***REMOVED***=***REMOVED***({
***REMOVED******REMOVED***children,
***REMOVED******REMOVED***showHeader***REMOVED***=***REMOVED***true,
***REMOVED******REMOVED***showFooter***REMOVED***=***REMOVED***true,
})***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="min-h-screen***REMOVED***flex***REMOVED***flex-col***REMOVED***bg-gradient-to-br***REMOVED***from-whatsapp-50***REMOVED***via-green-50***REMOVED***to-emerald-50">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{showHeader***REMOVED***&&***REMOVED***<Header***REMOVED***/>}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<main***REMOVED***className={`flex-1***REMOVED***${showHeader***REMOVED***?***REMOVED***'pt-20'***REMOVED***:***REMOVED***''}`}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{children}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</main>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{showFooter***REMOVED***&&***REMOVED***<Footer***REMOVED***/>}
***REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED***);
};
