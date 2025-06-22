import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED***{***REMOVED***cva,***REMOVED***type***REMOVED***VariantProps***REMOVED***}***REMOVED***from***REMOVED***"class-variance-authority"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***badgeVariants***REMOVED***=***REMOVED***cva(
***REMOVED******REMOVED***"inline-flex***REMOVED***items-center***REMOVED***rounded-full***REMOVED***border***REMOVED***px-2.5***REMOVED***py-0.5***REMOVED***text-xs***REMOVED***font-semibold***REMOVED***transition-colors***REMOVED***focus:outline-none***REMOVED***focus:ring-2***REMOVED***focus:ring-ring***REMOVED***focus:ring-offset-2",
***REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***variants:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***default:
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"border-transparent***REMOVED***bg-primary***REMOVED***text-primary-foreground***REMOVED***hover:bg-primary/80",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***secondary:
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"border-transparent***REMOVED***bg-secondary***REMOVED***text-secondary-foreground***REMOVED***hover:bg-secondary/80",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***destructive:
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"border-transparent***REMOVED***bg-destructive***REMOVED***text-destructive-foreground***REMOVED***hover:bg-destructive/80",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***outline:***REMOVED***"text-foreground",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***defaultVariants:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***"default",
***REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED***}
)

export***REMOVED***interface***REMOVED***BadgeProps
***REMOVED******REMOVED***extends***REMOVED***React.HTMLAttributes<HTMLDivElement>,
***REMOVED******REMOVED******REMOVED******REMOVED***VariantProps<typeof***REMOVED***badgeVariants>***REMOVED***{}

function***REMOVED***Badge({***REMOVED***className,***REMOVED***variant,***REMOVED***...props***REMOVED***}:***REMOVED***BadgeProps)***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className={cn(badgeVariants({***REMOVED***variant***REMOVED***}),***REMOVED***className)}***REMOVED***{...props}***REMOVED***/>
***REMOVED******REMOVED***)
}

export***REMOVED***{***REMOVED***Badge,***REMOVED***badgeVariants***REMOVED***}
