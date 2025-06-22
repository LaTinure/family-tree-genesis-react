import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED*******REMOVED***as***REMOVED***RadioGroupPrimitive***REMOVED***from***REMOVED***"@radix-ui/react-radio-group"
import***REMOVED***{***REMOVED***Circle***REMOVED***}***REMOVED***from***REMOVED***"lucide-react"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***RadioGroup***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***RadioGroupPrimitive.Root>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***RadioGroupPrimitive.Root>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<RadioGroupPrimitive.Root
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn("grid***REMOVED***gap-2",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED***)
})
RadioGroup.displayName***REMOVED***=***REMOVED***RadioGroupPrimitive.Root.displayName

const***REMOVED***RadioGroupItem***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***RadioGroupPrimitive.Item>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***RadioGroupPrimitive.Item>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<RadioGroupPrimitive.Item
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"aspect-square***REMOVED***h-4***REMOVED***w-4***REMOVED***rounded-full***REMOVED***border***REMOVED***border-primary***REMOVED***text-primary***REMOVED***ring-offset-background***REMOVED***focus:outline-none***REMOVED***focus-visible:ring-2***REMOVED***focus-visible:ring-ring***REMOVED***focus-visible:ring-offset-2***REMOVED***disabled:cursor-not-allowed***REMOVED***disabled:opacity-50",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<RadioGroupPrimitive.Indicator***REMOVED***className="flex***REMOVED***items-center***REMOVED***justify-center">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Circle***REMOVED***className="h-2.5***REMOVED***w-2.5***REMOVED***fill-current***REMOVED***text-current"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</RadioGroupPrimitive.Indicator>
***REMOVED******REMOVED******REMOVED******REMOVED***</RadioGroupPrimitive.Item>
***REMOVED******REMOVED***)
})
RadioGroupItem.displayName***REMOVED***=***REMOVED***RadioGroupPrimitive.Item.displayName

export***REMOVED***{***REMOVED***RadioGroup,***REMOVED***RadioGroupItem***REMOVED***}
