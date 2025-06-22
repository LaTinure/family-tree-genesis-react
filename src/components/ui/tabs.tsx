import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED*******REMOVED***as***REMOVED***TabsPrimitive***REMOVED***from***REMOVED***"@radix-ui/react-tabs"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***Tabs***REMOVED***=***REMOVED***TabsPrimitive.Root

const***REMOVED***TabsList***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***TabsPrimitive.List>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***TabsPrimitive.List>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<TabsPrimitive.List
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"inline-flex***REMOVED***h-10***REMOVED***items-center***REMOVED***justify-center***REMOVED***rounded-md***REMOVED***bg-muted***REMOVED***p-1***REMOVED***text-muted-foreground",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
TabsList.displayName***REMOVED***=***REMOVED***TabsPrimitive.List.displayName

const***REMOVED***TabsTrigger***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***TabsPrimitive.Trigger>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***TabsPrimitive.Trigger>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<TabsPrimitive.Trigger
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"inline-flex***REMOVED***items-center***REMOVED***justify-center***REMOVED***whitespace-nowrap***REMOVED***rounded-sm***REMOVED***px-3***REMOVED***py-1.5***REMOVED***text-sm***REMOVED***font-medium***REMOVED***ring-offset-background***REMOVED***transition-all***REMOVED***focus-visible:outline-none***REMOVED***focus-visible:ring-2***REMOVED***focus-visible:ring-ring***REMOVED***focus-visible:ring-offset-2***REMOVED***disabled:pointer-events-none***REMOVED***disabled:opacity-50***REMOVED***data-[state=active]:bg-background***REMOVED***data-[state=active]:text-foreground***REMOVED***data-[state=active]:shadow-sm",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
TabsTrigger.displayName***REMOVED***=***REMOVED***TabsPrimitive.Trigger.displayName

const***REMOVED***TabsContent***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***TabsPrimitive.Content>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***TabsPrimitive.Content>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<TabsPrimitive.Content
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"mt-2***REMOVED***ring-offset-background***REMOVED***focus-visible:outline-none***REMOVED***focus-visible:ring-2***REMOVED***focus-visible:ring-ring***REMOVED***focus-visible:ring-offset-2",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
TabsContent.displayName***REMOVED***=***REMOVED***TabsPrimitive.Content.displayName

export***REMOVED***{***REMOVED***Tabs,***REMOVED***TabsList,***REMOVED***TabsTrigger,***REMOVED***TabsContent***REMOVED***}
