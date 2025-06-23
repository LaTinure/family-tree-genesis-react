
import***REMOVED***{***REMOVED***Toaster***REMOVED***}***REMOVED***from***REMOVED***"@/components/ui/toaster";
import***REMOVED***{***REMOVED***Toaster***REMOVED***as***REMOVED***Sonner***REMOVED***}***REMOVED***from***REMOVED***"@/components/ui/sonner";
import***REMOVED***{***REMOVED***TooltipProvider***REMOVED***}***REMOVED***from***REMOVED***"@/components/ui/tooltip";
import***REMOVED***{***REMOVED***QueryClient,***REMOVED***QueryClientProvider***REMOVED***}***REMOVED***from***REMOVED***"@tanstack/react-query";
import***REMOVED***{***REMOVED***BrowserRouter,***REMOVED***Routes,***REMOVED***Route***REMOVED***}***REMOVED***from***REMOVED***"react-router-dom";
import***REMOVED***{***REMOVED***AuthProvider***REMOVED***}***REMOVED***from***REMOVED***"@/hooks/useAuth";
import***REMOVED***Index***REMOVED***from***REMOVED***"./pages/Index";
import***REMOVED***Dashboard***REMOVED***from***REMOVED***"./pages/Dashboard";
import***REMOVED***Profile***REMOVED***from***REMOVED***"./pages/Profile";
import***REMOVED***NotFound***REMOVED***from***REMOVED***"./pages/NotFound";

const***REMOVED***queryClient***REMOVED***=***REMOVED***new***REMOVED***QueryClient();

const***REMOVED***App***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<QueryClientProvider***REMOVED***client={queryClient}>
***REMOVED******REMOVED******REMOVED******REMOVED***<AuthProvider>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<TooltipProvider>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Toaster***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Sonner***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<BrowserRouter>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Routes>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Route***REMOVED***path="/"***REMOVED***element={<Index***REMOVED***/>}***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Route***REMOVED***path="/dashboard"***REMOVED***element={<Dashboard***REMOVED***/>}***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Route***REMOVED***path="/profile"***REMOVED***element={<Profile***REMOVED***/>}***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{/****REMOVED***ADD***REMOVED***ALL***REMOVED***CUSTOM***REMOVED***ROUTES***REMOVED***ABOVE***REMOVED***THE***REMOVED***CATCH-ALL***REMOVED***"*"***REMOVED***ROUTE***REMOVED****/}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Route***REMOVED***path="*"***REMOVED***element={<NotFound***REMOVED***/>}***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Routes>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</BrowserRouter>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</TooltipProvider>
***REMOVED******REMOVED******REMOVED******REMOVED***</AuthProvider>
***REMOVED******REMOVED***</QueryClientProvider>
);

export***REMOVED***default***REMOVED***App;
