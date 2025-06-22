import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED*******REMOVED***as***REMOVED***DialogPrimitive***REMOVED***from***REMOVED***"@radix-ui/react-dialog"
import***REMOVED***{***REMOVED***X***REMOVED***}***REMOVED***from***REMOVED***"lucide-react"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***Dialog***REMOVED***=***REMOVED***DialogPrimitive.Root

const***REMOVED***DialogTrigger***REMOVED***=***REMOVED***DialogPrimitive.Trigger

const***REMOVED***DialogPortal***REMOVED***=***REMOVED***DialogPrimitive.Portal

const***REMOVED***DialogClose***REMOVED***=***REMOVED***DialogPrimitive.Close

const***REMOVED***DialogOverlay***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***DialogPrimitive.Overlay>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***DialogPrimitive.Overlay>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<DialogPrimitive.Overlay
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"fixed***REMOVED***inset-0***REMOVED***z-50***REMOVED***bg-black/80***REMOVED******REMOVED***data-[state=open]:animate-in***REMOVED***data-[state=closed]:animate-out***REMOVED***data-[state=closed]:fade-out-0***REMOVED***data-[state=open]:fade-in-0",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
DialogOverlay.displayName***REMOVED***=***REMOVED***DialogPrimitive.Overlay.displayName

const***REMOVED***DialogContent***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***DialogPrimitive.Content>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***DialogPrimitive.Content>
>(({***REMOVED***className,***REMOVED***children,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<DialogPortal>
***REMOVED******REMOVED******REMOVED******REMOVED***<DialogOverlay***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED***<DialogPrimitive.Content
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"fixed***REMOVED***left-[50%]***REMOVED***top-[50%]***REMOVED***z-50***REMOVED***grid***REMOVED***w-full***REMOVED***max-w-lg***REMOVED***translate-x-[-50%]***REMOVED***translate-y-[-50%]***REMOVED***gap-4***REMOVED***border***REMOVED***bg-background***REMOVED***p-6***REMOVED***shadow-lg***REMOVED***duration-200***REMOVED***data-[state=open]:animate-in***REMOVED***data-[state=closed]:animate-out***REMOVED***data-[state=closed]:fade-out-0***REMOVED***data-[state=open]:fade-in-0***REMOVED***data-[state=closed]:zoom-out-95***REMOVED***data-[state=open]:zoom-in-95***REMOVED***data-[state=closed]:slide-out-to-left-1/2***REMOVED***data-[state=closed]:slide-out-to-top-[48%]***REMOVED***data-[state=open]:slide-in-from-left-1/2***REMOVED***data-[state=open]:slide-in-from-top-[48%]***REMOVED***sm:rounded-lg",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{children}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DialogPrimitive.Close***REMOVED***className="absolute***REMOVED***right-4***REMOVED***top-4***REMOVED***rounded-sm***REMOVED***opacity-70***REMOVED***ring-offset-background***REMOVED***transition-opacity***REMOVED***hover:opacity-100***REMOVED***focus:outline-none***REMOVED***focus:ring-2***REMOVED***focus:ring-ring***REMOVED***focus:ring-offset-2***REMOVED***disabled:pointer-events-none***REMOVED***data-[state=open]:bg-accent***REMOVED***data-[state=open]:text-muted-foreground">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<X***REMOVED***className="h-4***REMOVED***w-4"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<span***REMOVED***className="sr-only">Close</span>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</DialogPrimitive.Close>
***REMOVED******REMOVED******REMOVED******REMOVED***</DialogPrimitive.Content>
***REMOVED******REMOVED***</DialogPortal>
))
DialogContent.displayName***REMOVED***=***REMOVED***DialogPrimitive.Content.displayName

const***REMOVED***DialogHeader***REMOVED***=***REMOVED***({
***REMOVED******REMOVED***className,
***REMOVED******REMOVED***...props
}:***REMOVED***React.HTMLAttributes<HTMLDivElement>)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<div
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"flex***REMOVED***flex-col***REMOVED***space-y-1.5***REMOVED***text-center***REMOVED***sm:text-left",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
)
DialogHeader.displayName***REMOVED***=***REMOVED***"DialogHeader"

const***REMOVED***DialogFooter***REMOVED***=***REMOVED***({
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
DialogFooter.displayName***REMOVED***=***REMOVED***"DialogFooter"

const***REMOVED***DialogTitle***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***DialogPrimitive.Title>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***DialogPrimitive.Title>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<DialogPrimitive.Title
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"text-lg***REMOVED***font-semibold***REMOVED***leading-none***REMOVED***tracking-tight",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
DialogTitle.displayName***REMOVED***=***REMOVED***DialogPrimitive.Title.displayName

const***REMOVED***DialogDescription***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***DialogPrimitive.Description>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***DialogPrimitive.Description>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<DialogPrimitive.Description
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("text-sm***REMOVED***text-muted-foreground",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
DialogDescription.displayName***REMOVED***=***REMOVED***DialogPrimitive.Description.displayName

export***REMOVED***{
***REMOVED******REMOVED***Dialog,
***REMOVED******REMOVED***DialogPortal,
***REMOVED******REMOVED***DialogOverlay,
***REMOVED******REMOVED***DialogClose,
***REMOVED******REMOVED***DialogTrigger,
***REMOVED******REMOVED***DialogContent,
***REMOVED******REMOVED***DialogHeader,
***REMOVED******REMOVED***DialogFooter,
***REMOVED******REMOVED***DialogTitle,
***REMOVED******REMOVED***DialogDescription,
}
