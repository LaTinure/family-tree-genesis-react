import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED*******REMOVED***as***REMOVED***CheckboxPrimitive***REMOVED***from***REMOVED***"@radix-ui/react-checkbox"
import***REMOVED***{***REMOVED***Check***REMOVED***}***REMOVED***from***REMOVED***"lucide-react"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***Checkbox***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***CheckboxPrimitive.Root>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***CheckboxPrimitive.Root>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<CheckboxPrimitive.Root
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"peer***REMOVED***h-4***REMOVED***w-4***REMOVED***shrink-0***REMOVED***rounded-sm***REMOVED***border***REMOVED***border-primary***REMOVED***ring-offset-background***REMOVED***focus-visible:outline-none***REMOVED***focus-visible:ring-2***REMOVED***focus-visible:ring-ring***REMOVED***focus-visible:ring-offset-2***REMOVED***disabled:cursor-not-allowed***REMOVED***disabled:opacity-50***REMOVED***data-[state=checked]:bg-primary***REMOVED***data-[state=checked]:text-primary-foreground",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED***<CheckboxPrimitive.Indicator
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn("flex***REMOVED***items-center***REMOVED***justify-center***REMOVED***text-current")}
***REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Check***REMOVED***className="h-4***REMOVED***w-4"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED***</CheckboxPrimitive.Indicator>
***REMOVED******REMOVED***</CheckboxPrimitive.Root>
))
Checkbox.displayName***REMOVED***=***REMOVED***CheckboxPrimitive.Root.displayName

export***REMOVED***{***REMOVED***Checkbox***REMOVED***}
