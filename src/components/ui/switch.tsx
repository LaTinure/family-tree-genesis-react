import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED*******REMOVED***as***REMOVED***SwitchPrimitives***REMOVED***from***REMOVED***"@radix-ui/react-switch"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***Switch***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***SwitchPrimitives.Root>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***SwitchPrimitives.Root>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<SwitchPrimitives.Root
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"peer***REMOVED***inline-flex***REMOVED***h-6***REMOVED***w-11***REMOVED***shrink-0***REMOVED***cursor-pointer***REMOVED***items-center***REMOVED***rounded-full***REMOVED***border-2***REMOVED***border-transparent***REMOVED***transition-colors***REMOVED***focus-visible:outline-none***REMOVED***focus-visible:ring-2***REMOVED***focus-visible:ring-ring***REMOVED***focus-visible:ring-offset-2***REMOVED***focus-visible:ring-offset-background***REMOVED***disabled:cursor-not-allowed***REMOVED***disabled:opacity-50***REMOVED***data-[state=checked]:bg-primary***REMOVED***data-[state=unchecked]:bg-input",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED***<SwitchPrimitives.Thumb
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"pointer-events-none***REMOVED***block***REMOVED***h-5***REMOVED***w-5***REMOVED***rounded-full***REMOVED***bg-background***REMOVED***shadow-lg***REMOVED***ring-0***REMOVED***transition-transform***REMOVED***data-[state=checked]:translate-x-5***REMOVED***data-[state=unchecked]:translate-x-0"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED***</SwitchPrimitives.Root>
))
Switch.displayName***REMOVED***=***REMOVED***SwitchPrimitives.Root.displayName

export***REMOVED***{***REMOVED***Switch***REMOVED***}
