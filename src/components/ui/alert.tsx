import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED***{***REMOVED***cva,***REMOVED***type***REMOVED***VariantProps***REMOVED***}***REMOVED***from***REMOVED***"class-variance-authority"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***alertVariants***REMOVED***=***REMOVED***cva(
***REMOVED******REMOVED***"relative***REMOVED***w-full***REMOVED***rounded-lg***REMOVED***border***REMOVED***p-4***REMOVED***[&>svg~*]:pl-7***REMOVED***[&>svg+div]:translate-y-[-3px]***REMOVED***[&>svg]:absolute***REMOVED***[&>svg]:left-4***REMOVED***[&>svg]:top-4***REMOVED***[&>svg]:text-foreground",
***REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***variants:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***default:***REMOVED***"bg-background***REMOVED***text-foreground",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***destructive:
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"border-destructive/50***REMOVED***text-destructive***REMOVED***dark:border-destructive***REMOVED***[&>svg]:text-destructive",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***defaultVariants:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***"default",
***REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED***}
)

const***REMOVED***Alert***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***HTMLDivElement,
***REMOVED******REMOVED***React.HTMLAttributes<HTMLDivElement>***REMOVED***&***REMOVED***VariantProps<typeof***REMOVED***alertVariants>
>(({***REMOVED***className,***REMOVED***variant,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<div
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***role="alert"
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(alertVariants({***REMOVED***variant***REMOVED***}),***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
Alert.displayName***REMOVED***=***REMOVED***"Alert"

const***REMOVED***AlertTitle***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***HTMLParagraphElement,
***REMOVED******REMOVED***React.HTMLAttributes<HTMLHeadingElement>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<h5
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("mb-1***REMOVED***font-medium***REMOVED***leading-none***REMOVED***tracking-tight",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
AlertTitle.displayName***REMOVED***=***REMOVED***"AlertTitle"

const***REMOVED***AlertDescription***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***HTMLParagraphElement,
***REMOVED******REMOVED***React.HTMLAttributes<HTMLParagraphElement>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<div
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("text-sm***REMOVED***[&_p]:leading-relaxed",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
AlertDescription.displayName***REMOVED***=***REMOVED***"AlertDescription"

export***REMOVED***{***REMOVED***Alert,***REMOVED***AlertTitle,***REMOVED***AlertDescription***REMOVED***}
