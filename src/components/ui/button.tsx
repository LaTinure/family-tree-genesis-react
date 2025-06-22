import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED***{***REMOVED***Slot***REMOVED***}***REMOVED***from***REMOVED***"@radix-ui/react-slot"
import***REMOVED***{***REMOVED***cva,***REMOVED***type***REMOVED***VariantProps***REMOVED***}***REMOVED***from***REMOVED***"class-variance-authority"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***buttonVariants***REMOVED***=***REMOVED***cva(
***REMOVED******REMOVED***"inline-flex***REMOVED***items-center***REMOVED***justify-center***REMOVED***gap-2***REMOVED***whitespace-nowrap***REMOVED***rounded-md***REMOVED***text-sm***REMOVED***font-medium***REMOVED***ring-offset-background***REMOVED***transition-colors***REMOVED***focus-visible:outline-none***REMOVED***focus-visible:ring-2***REMOVED***focus-visible:ring-ring***REMOVED***focus-visible:ring-offset-2***REMOVED***disabled:pointer-events-none***REMOVED***disabled:opacity-50***REMOVED***[&_svg]:pointer-events-none***REMOVED***[&_svg]:size-4***REMOVED***[&_svg]:shrink-0",
***REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***variants:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***default:***REMOVED***"bg-primary***REMOVED***text-primary-foreground***REMOVED***hover:bg-primary/90",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***destructive:
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"bg-destructive***REMOVED***text-destructive-foreground***REMOVED***hover:bg-destructive/90",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***outline:
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"border***REMOVED***border-input***REMOVED***bg-background***REMOVED***hover:bg-accent***REMOVED***hover:text-accent-foreground",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***secondary:
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"bg-secondary***REMOVED***text-secondary-foreground***REMOVED***hover:bg-secondary/80",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ghost:***REMOVED***"hover:bg-accent***REMOVED***hover:text-accent-foreground",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***link:***REMOVED***"text-primary***REMOVED***underline-offset-4***REMOVED***hover:underline",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***size:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***default:***REMOVED***"h-10***REMOVED***px-4***REMOVED***py-2",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***sm:***REMOVED***"h-9***REMOVED***rounded-md***REMOVED***px-3",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***lg:***REMOVED***"h-11***REMOVED***rounded-md***REMOVED***px-8",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***icon:***REMOVED***"h-10***REMOVED***w-10",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***defaultVariants:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***"default",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***size:***REMOVED***"default",
***REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED***}
)

export***REMOVED***interface***REMOVED***ButtonProps
***REMOVED******REMOVED***extends***REMOVED***React.ButtonHTMLAttributes<HTMLButtonElement>,
***REMOVED******REMOVED******REMOVED******REMOVED***VariantProps<typeof***REMOVED***buttonVariants>***REMOVED***{
***REMOVED******REMOVED***asChild?:***REMOVED***boolean
}

const***REMOVED***Button***REMOVED***=***REMOVED***React.forwardRef<HTMLButtonElement,***REMOVED***ButtonProps>(
***REMOVED******REMOVED***({***REMOVED***className,***REMOVED***variant,***REMOVED***size,***REMOVED***asChild***REMOVED***=***REMOVED***false,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***Comp***REMOVED***=***REMOVED***asChild***REMOVED***?***REMOVED***Slot***REMOVED***:***REMOVED***"button"
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Comp
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn(buttonVariants({***REMOVED***variant,***REMOVED***size,***REMOVED***className***REMOVED***}))}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED***)
***REMOVED******REMOVED***}
)
Button.displayName***REMOVED***=***REMOVED***"Button"

export***REMOVED***{***REMOVED***Button,***REMOVED***buttonVariants***REMOVED***}
