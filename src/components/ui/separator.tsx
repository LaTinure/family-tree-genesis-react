import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED*******REMOVED***as***REMOVED***SeparatorPrimitive***REMOVED***from***REMOVED***"@radix-ui/react-separator"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***Separator***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***SeparatorPrimitive.Root>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***SeparatorPrimitive.Root>
>(
***REMOVED******REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***{***REMOVED***className,***REMOVED***orientation***REMOVED***=***REMOVED***"horizontal",***REMOVED***decorative***REMOVED***=***REMOVED***true,***REMOVED***...props***REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***ref
***REMOVED******REMOVED***)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<SeparatorPrimitive.Root
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***decorative={decorative}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***orientation={orientation}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"shrink-0***REMOVED***bg-border",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***orientation***REMOVED***===***REMOVED***"horizontal"***REMOVED***?***REMOVED***"h-[1px]***REMOVED***w-full"***REMOVED***:***REMOVED***"h-full***REMOVED***w-[1px]",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED***)
)
Separator.displayName***REMOVED***=***REMOVED***SeparatorPrimitive.Root.displayName

export***REMOVED***{***REMOVED***Separator***REMOVED***}
