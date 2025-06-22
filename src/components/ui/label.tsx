import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED*******REMOVED***as***REMOVED***LabelPrimitive***REMOVED***from***REMOVED***"@radix-ui/react-label"
import***REMOVED***{***REMOVED***cva,***REMOVED***type***REMOVED***VariantProps***REMOVED***}***REMOVED***from***REMOVED***"class-variance-authority"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***labelVariants***REMOVED***=***REMOVED***cva(
***REMOVED******REMOVED***"text-sm***REMOVED***font-medium***REMOVED***leading-none***REMOVED***peer-disabled:cursor-not-allowed***REMOVED***peer-disabled:opacity-70"
)

const***REMOVED***Label***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***LabelPrimitive.Root>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***LabelPrimitive.Root>***REMOVED***&
***REMOVED******REMOVED******REMOVED******REMOVED***VariantProps<typeof***REMOVED***labelVariants>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<LabelPrimitive.Root
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(labelVariants(),***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
Label.displayName***REMOVED***=***REMOVED***LabelPrimitive.Root.displayName

export***REMOVED***{***REMOVED***Label***REMOVED***}
