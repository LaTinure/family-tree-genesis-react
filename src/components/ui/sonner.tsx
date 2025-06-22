import***REMOVED***{***REMOVED***useTheme***REMOVED***}***REMOVED***from***REMOVED***"next-themes"
import***REMOVED***{***REMOVED***Toaster***REMOVED***as***REMOVED***Sonner,***REMOVED***toast***REMOVED***}***REMOVED***from***REMOVED***"sonner"

type***REMOVED***ToasterProps***REMOVED***=***REMOVED***React.ComponentProps<typeof***REMOVED***Sonner>

const***REMOVED***Toaster***REMOVED***=***REMOVED***({***REMOVED***...props***REMOVED***}:***REMOVED***ToasterProps)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***theme***REMOVED***=***REMOVED***"system"***REMOVED***}***REMOVED***=***REMOVED***useTheme()

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Sonner
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***theme={theme***REMOVED***as***REMOVED***ToasterProps["theme"]}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className="toaster***REMOVED***group"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toastOptions={{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***classNames:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toast:
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"group***REMOVED***toast***REMOVED***group-[.toaster]:bg-background***REMOVED***group-[.toaster]:text-foreground***REMOVED***group-[.toaster]:border-border***REMOVED***group-[.toaster]:shadow-lg",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***"group-[.toast]:text-muted-foreground",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***actionButton:
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"group-[.toast]:bg-primary***REMOVED***group-[.toast]:text-primary-foreground",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***cancelButton:
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"group-[.toast]:bg-muted***REMOVED***group-[.toast]:text-muted-foreground",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED***)
}

export***REMOVED***{***REMOVED***Toaster,***REMOVED***toast***REMOVED***}
