import***REMOVED***Header***REMOVED***from***REMOVED***'./Header';
import***REMOVED***{***REMOVED***Footer***REMOVED***}***REMOVED***from***REMOVED***'./Footer';

interface***REMOVED***LayoutProps***REMOVED***{
***REMOVED******REMOVED***children:***REMOVED***React.ReactNode;
***REMOVED******REMOVED***showFooter?:***REMOVED***boolean;
}

export***REMOVED***const***REMOVED***Layout***REMOVED***=***REMOVED***({***REMOVED***children,***REMOVED***showFooter***REMOVED***=***REMOVED***true***REMOVED***}:***REMOVED***LayoutProps)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="min-h-screen***REMOVED***flex***REMOVED***flex-col***REMOVED***bg-gray-50">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Header***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<main***REMOVED***className="flex-1***REMOVED***pt-16***REMOVED***pb-8">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{children}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</main>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{showFooter***REMOVED***&&***REMOVED***<Footer***REMOVED***/>}
***REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED***);
};
