import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED***{***REMOVED***Drawer***REMOVED***as***REMOVED***DrawerPrimitive***REMOVED***}***REMOVED***from***REMOVED***"vaul"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***Drawer***REMOVED***=***REMOVED***({
***REMOVED******REMOVED***shouldScaleBackground***REMOVED***=***REMOVED***true,
***REMOVED******REMOVED***...props
}:***REMOVED***React.ComponentProps<typeof***REMOVED***DrawerPrimitive.Root>)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<DrawerPrimitive.Root
***REMOVED******REMOVED******REMOVED******REMOVED***shouldScaleBackground={shouldScaleBackground}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
)
Drawer.displayName***REMOVED***=***REMOVED***"Drawer"

const***REMOVED***DrawerTrigger***REMOVED***=***REMOVED***DrawerPrimitive.Trigger

const***REMOVED***DrawerPortal***REMOVED***=***REMOVED***DrawerPrimitive.Portal

const***REMOVED***DrawerClose***REMOVED***=***REMOVED***DrawerPrimitive.Close

const***REMOVED***DrawerOverlay***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***DrawerPrimitive.Overlay>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***DrawerPrimitive.Overlay>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<DrawerPrimitive.Overlay
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("fixed***REMOVED***inset-0***REMOVED***z-50***REMOVED***bg-black/80",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
DrawerOverlay.displayName***REMOVED***=***REMOVED***DrawerPrimitive.Overlay.displayName

const***REMOVED***DrawerContent***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***DrawerPrimitive.Content>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***DrawerPrimitive.Content>
>(({***REMOVED***className,***REMOVED***children,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<DrawerPortal>
***REMOVED******REMOVED******REMOVED******REMOVED***<DrawerOverlay***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED***<DrawerPrimitive.Content
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"fixed***REMOVED***inset-x-0***REMOVED***bottom-0***REMOVED***z-50***REMOVED***mt-24***REMOVED***flex***REMOVED***h-auto***REMOVED***flex-col***REMOVED***rounded-t-[10px]***REMOVED***border***REMOVED***bg-background",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="mx-auto***REMOVED***mt-4***REMOVED***h-2***REMOVED***w-[100px]***REMOVED***rounded-full***REMOVED***bg-muted"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{children}
***REMOVED******REMOVED******REMOVED******REMOVED***</DrawerPrimitive.Content>
***REMOVED******REMOVED***</DrawerPortal>
))
DrawerContent.displayName***REMOVED***=***REMOVED***"DrawerContent"

const***REMOVED***DrawerHeader***REMOVED***=***REMOVED***({
***REMOVED******REMOVED***className,
***REMOVED******REMOVED***...props
}:***REMOVED***React.HTMLAttributes<HTMLDivElement>)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<div
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("grid***REMOVED***gap-1.5***REMOVED***p-4***REMOVED***text-center***REMOVED***sm:text-left",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
)
DrawerHeader.displayName***REMOVED***=***REMOVED***"DrawerHeader"

const***REMOVED***DrawerFooter***REMOVED***=***REMOVED***({
***REMOVED******REMOVED***className,
***REMOVED******REMOVED***...props
}:***REMOVED***React.HTMLAttributes<HTMLDivElement>)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<div
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("mt-auto***REMOVED***flex***REMOVED***flex-col***REMOVED***gap-2***REMOVED***p-4",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
)
DrawerFooter.displayName***REMOVED***=***REMOVED***"DrawerFooter"

const***REMOVED***DrawerTitle***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***DrawerPrimitive.Title>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***DrawerPrimitive.Title>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<DrawerPrimitive.Title
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"text-lg***REMOVED***font-semibold***REMOVED***leading-none***REMOVED***tracking-tight",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
DrawerTitle.displayName***REMOVED***=***REMOVED***DrawerPrimitive.Title.displayName

const***REMOVED***DrawerDescription***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***DrawerPrimitive.Description>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***DrawerPrimitive.Description>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<DrawerPrimitive.Description
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("text-sm***REMOVED***text-muted-foreground",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
DrawerDescription.displayName***REMOVED***=***REMOVED***DrawerPrimitive.Description.displayName

export***REMOVED***{
***REMOVED******REMOVED***Drawer,
***REMOVED******REMOVED***DrawerPortal,
***REMOVED******REMOVED***DrawerOverlay,
***REMOVED******REMOVED***DrawerTrigger,
***REMOVED******REMOVED***DrawerClose,
***REMOVED******REMOVED***DrawerContent,
***REMOVED******REMOVED***DrawerHeader,
***REMOVED******REMOVED***DrawerFooter,
***REMOVED******REMOVED***DrawerTitle,
***REMOVED******REMOVED***DrawerDescription,
}
