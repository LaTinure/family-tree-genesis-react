import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED*******REMOVED***as***REMOVED***ToggleGroupPrimitive***REMOVED***from***REMOVED***"@radix-ui/react-toggle-group"
import***REMOVED***{***REMOVED***type***REMOVED***VariantProps***REMOVED***}***REMOVED***from***REMOVED***"class-variance-authority"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"
import***REMOVED***{***REMOVED***toggleVariants***REMOVED***}***REMOVED***from***REMOVED***"@/components/ui/toggle"

const***REMOVED***ToggleGroupContext***REMOVED***=***REMOVED***React.createContext<
***REMOVED******REMOVED***VariantProps<typeof***REMOVED***toggleVariants>
>({
***REMOVED******REMOVED***size:***REMOVED***"default",
***REMOVED******REMOVED***variant:***REMOVED***"default",
})

const***REMOVED***ToggleGroup***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***ToggleGroupPrimitive.Root>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***ToggleGroupPrimitive.Root>***REMOVED***&
***REMOVED******REMOVED******REMOVED******REMOVED***VariantProps<typeof***REMOVED***toggleVariants>
>(({***REMOVED***className,***REMOVED***variant,***REMOVED***size,***REMOVED***children,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<ToggleGroupPrimitive.Root
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("flex***REMOVED***items-center***REMOVED***justify-center***REMOVED***gap-1",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED***<ToggleGroupContext.Provider***REMOVED***value={{***REMOVED***variant,***REMOVED***size***REMOVED***}}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{children}
***REMOVED******REMOVED******REMOVED******REMOVED***</ToggleGroupContext.Provider>
***REMOVED******REMOVED***</ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName***REMOVED***=***REMOVED***ToggleGroupPrimitive.Root.displayName

const***REMOVED***ToggleGroupItem***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***ToggleGroupPrimitive.Item>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***ToggleGroupPrimitive.Item>***REMOVED***&
***REMOVED******REMOVED******REMOVED******REMOVED***VariantProps<typeof***REMOVED***toggleVariants>
>(({***REMOVED***className,***REMOVED***children,***REMOVED***variant,***REMOVED***size,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***context***REMOVED***=***REMOVED***React.useContext(ToggleGroupContext)

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<ToggleGroupPrimitive.Item
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toggleVariants({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***context.variant***REMOVED***||***REMOVED***variant,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***size:***REMOVED***context.size***REMOVED***||***REMOVED***size,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{children}
***REMOVED******REMOVED******REMOVED******REMOVED***</ToggleGroupPrimitive.Item>
***REMOVED******REMOVED***)
})

ToggleGroupItem.displayName***REMOVED***=***REMOVED***ToggleGroupPrimitive.Item.displayName

export***REMOVED***{***REMOVED***ToggleGroup,***REMOVED***ToggleGroupItem***REMOVED***}
