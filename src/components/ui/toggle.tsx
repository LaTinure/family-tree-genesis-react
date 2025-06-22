import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED*******REMOVED***as***REMOVED***TogglePrimitive***REMOVED***from***REMOVED***"@radix-ui/react-toggle"
import***REMOVED***{***REMOVED***cva,***REMOVED***type***REMOVED***VariantProps***REMOVED***}***REMOVED***from***REMOVED***"class-variance-authority"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***toggleVariants***REMOVED***=***REMOVED***cva(
***REMOVED******REMOVED***"inline-flex***REMOVED***items-center***REMOVED***justify-center***REMOVED***rounded-md***REMOVED***text-sm***REMOVED***font-medium***REMOVED***ring-offset-background***REMOVED***transition-colors***REMOVED***hover:bg-muted***REMOVED***hover:text-muted-foreground***REMOVED***focus-visible:outline-none***REMOVED***focus-visible:ring-2***REMOVED***focus-visible:ring-ring***REMOVED***focus-visible:ring-offset-2***REMOVED***disabled:pointer-events-none***REMOVED***disabled:opacity-50***REMOVED***data-[state=on]:bg-accent***REMOVED***data-[state=on]:text-accent-foreground",
***REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***variants:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***default:***REMOVED***"bg-transparent",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***outline:
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"border***REMOVED***border-input***REMOVED***bg-transparent***REMOVED***hover:bg-accent***REMOVED***hover:text-accent-foreground",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***size:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***default:***REMOVED***"h-10***REMOVED***px-3",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***sm:***REMOVED***"h-9***REMOVED***px-2.5",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***lg:***REMOVED***"h-11***REMOVED***px-5",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***defaultVariants:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***"default",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***size:***REMOVED***"default",
***REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED***}
)

const***REMOVED***Toggle***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***TogglePrimitive.Root>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***TogglePrimitive.Root>***REMOVED***&
***REMOVED******REMOVED******REMOVED******REMOVED***VariantProps<typeof***REMOVED***toggleVariants>
>(({***REMOVED***className,***REMOVED***variant,***REMOVED***size,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<TogglePrimitive.Root
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(toggleVariants({***REMOVED***variant,***REMOVED***size,***REMOVED***className***REMOVED***}))}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))

Toggle.displayName***REMOVED***=***REMOVED***TogglePrimitive.Root.displayName

export***REMOVED***{***REMOVED***Toggle,***REMOVED***toggleVariants***REMOVED***}
