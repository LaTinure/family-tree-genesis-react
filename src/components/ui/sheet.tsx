import***REMOVED*******REMOVED***as***REMOVED***SheetPrimitive***REMOVED***from***REMOVED***"@radix-ui/react-dialog"
import***REMOVED***{***REMOVED***cva,***REMOVED***type***REMOVED***VariantProps***REMOVED***}***REMOVED***from***REMOVED***"class-variance-authority"
import***REMOVED***{***REMOVED***X***REMOVED***}***REMOVED***from***REMOVED***"lucide-react"
import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***Sheet***REMOVED***=***REMOVED***SheetPrimitive.Root

const***REMOVED***SheetTrigger***REMOVED***=***REMOVED***SheetPrimitive.Trigger

const***REMOVED***SheetClose***REMOVED***=***REMOVED***SheetPrimitive.Close

const***REMOVED***SheetPortal***REMOVED***=***REMOVED***SheetPrimitive.Portal

const***REMOVED***SheetOverlay***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***SheetPrimitive.Overlay>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***SheetPrimitive.Overlay>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<SheetPrimitive.Overlay
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"fixed***REMOVED***inset-0***REMOVED***z-50***REMOVED***bg-black/80***REMOVED******REMOVED***data-[state=open]:animate-in***REMOVED***data-[state=closed]:animate-out***REMOVED***data-[state=closed]:fade-out-0***REMOVED***data-[state=open]:fade-in-0",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED***/>
))
SheetOverlay.displayName***REMOVED***=***REMOVED***SheetPrimitive.Overlay.displayName

const***REMOVED***sheetVariants***REMOVED***=***REMOVED***cva(
***REMOVED******REMOVED***"fixed***REMOVED***z-50***REMOVED***gap-4***REMOVED***bg-background***REMOVED***p-6***REMOVED***shadow-lg***REMOVED***transition***REMOVED***ease-in-out***REMOVED***data-[state=open]:animate-in***REMOVED***data-[state=closed]:animate-out***REMOVED***data-[state=closed]:duration-300***REMOVED***data-[state=open]:duration-500",
***REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***variants:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***side:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***top:***REMOVED***"inset-x-0***REMOVED***top-0***REMOVED***border-b***REMOVED***data-[state=closed]:slide-out-to-top***REMOVED***data-[state=open]:slide-in-from-top",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***bottom:
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"inset-x-0***REMOVED***bottom-0***REMOVED***border-t***REMOVED***data-[state=closed]:slide-out-to-bottom***REMOVED***data-[state=open]:slide-in-from-bottom",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***left:***REMOVED***"inset-y-0***REMOVED***left-0***REMOVED***h-full***REMOVED***w-3/4***REMOVED***border-r***REMOVED***data-[state=closed]:slide-out-to-left***REMOVED***data-[state=open]:slide-in-from-left***REMOVED***sm:max-w-sm",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***right:
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"inset-y-0***REMOVED***right-0***REMOVED***h-full***REMOVED***w-3/4***REMOVED******REMOVED***border-l***REMOVED***data-[state=closed]:slide-out-to-right***REMOVED***data-[state=open]:slide-in-from-right***REMOVED***sm:max-w-sm",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***defaultVariants:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***side:***REMOVED***"right",
***REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED***}
)

interface***REMOVED***SheetContentProps
***REMOVED******REMOVED***extends***REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***SheetPrimitive.Content>,
***REMOVED******REMOVED***VariantProps<typeof***REMOVED***sheetVariants>***REMOVED***{***REMOVED***}

const***REMOVED***SheetContent***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***SheetPrimitive.Content>,
***REMOVED******REMOVED***SheetContentProps
>(({***REMOVED***side***REMOVED***=***REMOVED***"right",***REMOVED***className,***REMOVED***children,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<SheetPortal>
***REMOVED******REMOVED******REMOVED******REMOVED***<SheetOverlay***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED***<SheetPrimitive.Content
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn(sheetVariants({***REMOVED***side***REMOVED***}),***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{children}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<SheetPrimitive.Close***REMOVED***className="absolute***REMOVED***right-4***REMOVED***top-4***REMOVED***rounded-sm***REMOVED***opacity-70***REMOVED***ring-offset-background***REMOVED***transition-opacity***REMOVED***hover:opacity-100***REMOVED***focus:outline-none***REMOVED***focus:ring-2***REMOVED***focus:ring-ring***REMOVED***focus:ring-offset-2***REMOVED***disabled:pointer-events-none***REMOVED***data-[state=open]:bg-secondary">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<X***REMOVED***className="h-4***REMOVED***w-4"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<span***REMOVED***className="sr-only">Close</span>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</SheetPrimitive.Close>
***REMOVED******REMOVED******REMOVED******REMOVED***</SheetPrimitive.Content>
***REMOVED******REMOVED***</SheetPortal>
))
SheetContent.displayName***REMOVED***=***REMOVED***SheetPrimitive.Content.displayName

const***REMOVED***SheetHeader***REMOVED***=***REMOVED***({
***REMOVED******REMOVED***className,
***REMOVED******REMOVED***...props
}:***REMOVED***React.HTMLAttributes<HTMLDivElement>)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<div
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"flex***REMOVED***flex-col***REMOVED***space-y-2***REMOVED***text-center***REMOVED***sm:text-left",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
)
SheetHeader.displayName***REMOVED***=***REMOVED***"SheetHeader"

const***REMOVED***SheetFooter***REMOVED***=***REMOVED***({
***REMOVED******REMOVED***className,
***REMOVED******REMOVED***...props
}:***REMOVED***React.HTMLAttributes<HTMLDivElement>)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<div
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"flex***REMOVED***flex-col-reverse***REMOVED***sm:flex-row***REMOVED***sm:justify-end***REMOVED***sm:space-x-2",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
)
SheetFooter.displayName***REMOVED***=***REMOVED***"SheetFooter"

const***REMOVED***SheetTitle***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***SheetPrimitive.Title>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***SheetPrimitive.Title>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<SheetPrimitive.Title
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("text-lg***REMOVED***font-semibold***REMOVED***text-foreground",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
SheetTitle.displayName***REMOVED***=***REMOVED***SheetPrimitive.Title.displayName

const***REMOVED***SheetDescription***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***SheetPrimitive.Description>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***SheetPrimitive.Description>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<SheetPrimitive.Description
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("text-sm***REMOVED***text-muted-foreground",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
SheetDescription.displayName***REMOVED***=***REMOVED***SheetPrimitive.Description.displayName

export***REMOVED***{
***REMOVED******REMOVED***Sheet,***REMOVED***SheetClose,
***REMOVED******REMOVED***SheetContent,***REMOVED***SheetDescription,***REMOVED***SheetFooter,***REMOVED***SheetHeader,***REMOVED***SheetOverlay,***REMOVED***SheetPortal,***REMOVED***SheetTitle,***REMOVED***SheetTrigger
}

