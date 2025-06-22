import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED*******REMOVED***as***REMOVED***ProgressPrimitive***REMOVED***from***REMOVED***"@radix-ui/react-progress"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***Progress***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***ProgressPrimitive.Root>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***ProgressPrimitive.Root>
>(({***REMOVED***className,***REMOVED***value,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<ProgressPrimitive.Root
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"relative***REMOVED***h-4***REMOVED***w-full***REMOVED***overflow-hidden***REMOVED***rounded-full***REMOVED***bg-secondary",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED***<ProgressPrimitive.Indicator
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className="h-full***REMOVED***w-full***REMOVED***flex-1***REMOVED***bg-primary***REMOVED***transition-all"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***style={{***REMOVED***transform:***REMOVED***`translateX(-${100***REMOVED***-***REMOVED***(value***REMOVED***||***REMOVED***0)}%)`***REMOVED***}}
***REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED***</ProgressPrimitive.Root>
))
Progress.displayName***REMOVED***=***REMOVED***ProgressPrimitive.Root.displayName

export***REMOVED***{***REMOVED***Progress***REMOVED***}
