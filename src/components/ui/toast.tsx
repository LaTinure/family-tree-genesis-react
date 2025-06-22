import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED*******REMOVED***as***REMOVED***ToastPrimitives***REMOVED***from***REMOVED***"@radix-ui/react-toast"
import***REMOVED***{***REMOVED***cva,***REMOVED***type***REMOVED***VariantProps***REMOVED***}***REMOVED***from***REMOVED***"class-variance-authority"
import***REMOVED***{***REMOVED***X***REMOVED***}***REMOVED***from***REMOVED***"lucide-react"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***ToastProvider***REMOVED***=***REMOVED***ToastPrimitives.Provider

const***REMOVED***ToastViewport***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***ToastPrimitives.Viewport>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***ToastPrimitives.Viewport>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<ToastPrimitives.Viewport
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"fixed***REMOVED***top-0***REMOVED***z-[100]***REMOVED***flex***REMOVED***max-h-screen***REMOVED***w-full***REMOVED***flex-col-reverse***REMOVED***p-4***REMOVED***sm:bottom-0***REMOVED***sm:right-0***REMOVED***sm:top-auto***REMOVED***sm:flex-col***REMOVED***md:max-w-[420px]",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
ToastViewport.displayName***REMOVED***=***REMOVED***ToastPrimitives.Viewport.displayName

const***REMOVED***toastVariants***REMOVED***=***REMOVED***cva(
***REMOVED******REMOVED***"group***REMOVED***pointer-events-auto***REMOVED***relative***REMOVED***flex***REMOVED***w-full***REMOVED***items-center***REMOVED***justify-between***REMOVED***space-x-4***REMOVED***overflow-hidden***REMOVED***rounded-md***REMOVED***border***REMOVED***p-6***REMOVED***pr-8***REMOVED***shadow-lg***REMOVED***transition-all***REMOVED***data-[swipe=cancel]:translate-x-0***REMOVED***data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]***REMOVED***data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]***REMOVED***data-[swipe=move]:transition-none***REMOVED***data-[state=open]:animate-in***REMOVED***data-[state=closed]:animate-out***REMOVED***data-[swipe=end]:animate-out***REMOVED***data-[state=closed]:fade-out-80***REMOVED***data-[state=closed]:slide-out-to-right-full***REMOVED***data-[state=open]:slide-in-from-top-full***REMOVED***data-[state=open]:sm:slide-in-from-bottom-full",
***REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***variants:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***default:***REMOVED***"border***REMOVED***bg-background***REMOVED***text-foreground",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***destructive:
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"destructive***REMOVED***group***REMOVED***border-destructive***REMOVED***bg-destructive***REMOVED***text-destructive-foreground",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***defaultVariants:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***"default",
***REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED***}
)

const***REMOVED***Toast***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***ToastPrimitives.Root>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***ToastPrimitives.Root>***REMOVED***&
***REMOVED******REMOVED******REMOVED******REMOVED***VariantProps<typeof***REMOVED***toastVariants>
>(({***REMOVED***className,***REMOVED***variant,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<ToastPrimitives.Root
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn(toastVariants({***REMOVED***variant***REMOVED***}),***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED***)
})
Toast.displayName***REMOVED***=***REMOVED***ToastPrimitives.Root.displayName

const***REMOVED***ToastAction***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***ToastPrimitives.Action>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***ToastPrimitives.Action>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<ToastPrimitives.Action
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"inline-flex***REMOVED***h-8***REMOVED***shrink-0***REMOVED***items-center***REMOVED***justify-center***REMOVED***rounded-md***REMOVED***border***REMOVED***bg-transparent***REMOVED***px-3***REMOVED***text-sm***REMOVED***font-medium***REMOVED***ring-offset-background***REMOVED***transition-colors***REMOVED***hover:bg-secondary***REMOVED***focus:outline-none***REMOVED***focus:ring-2***REMOVED***focus:ring-ring***REMOVED***focus:ring-offset-2***REMOVED***disabled:pointer-events-none***REMOVED***disabled:opacity-50***REMOVED***group-[.destructive]:border-muted/40***REMOVED***group-[.destructive]:hover:border-destructive/30***REMOVED***group-[.destructive]:hover:bg-destructive***REMOVED***group-[.destructive]:hover:text-destructive-foreground***REMOVED***group-[.destructive]:focus:ring-destructive",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
ToastAction.displayName***REMOVED***=***REMOVED***ToastPrimitives.Action.displayName

const***REMOVED***ToastClose***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***ToastPrimitives.Close>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***ToastPrimitives.Close>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<ToastPrimitives.Close
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"absolute***REMOVED***right-2***REMOVED***top-2***REMOVED***rounded-md***REMOVED***p-1***REMOVED***text-foreground/50***REMOVED***opacity-0***REMOVED***transition-opacity***REMOVED***hover:text-foreground***REMOVED***focus:opacity-100***REMOVED***focus:outline-none***REMOVED***focus:ring-2***REMOVED***group-hover:opacity-100***REMOVED***group-[.destructive]:text-red-300***REMOVED***group-[.destructive]:hover:text-red-50***REMOVED***group-[.destructive]:focus:ring-red-400***REMOVED***group-[.destructive]:focus:ring-offset-red-600",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***toast-close=""
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED***<X***REMOVED***className="h-4***REMOVED***w-4"***REMOVED***/>
***REMOVED******REMOVED***</ToastPrimitives.Close>
))
ToastClose.displayName***REMOVED***=***REMOVED***ToastPrimitives.Close.displayName

const***REMOVED***ToastTitle***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***ToastPrimitives.Title>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***ToastPrimitives.Title>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<ToastPrimitives.Title
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("text-sm***REMOVED***font-semibold",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
ToastTitle.displayName***REMOVED***=***REMOVED***ToastPrimitives.Title.displayName

const***REMOVED***ToastDescription***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***ToastPrimitives.Description>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***ToastPrimitives.Description>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<ToastPrimitives.Description
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("text-sm***REMOVED***opacity-90",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
ToastDescription.displayName***REMOVED***=***REMOVED***ToastPrimitives.Description.displayName

type***REMOVED***ToastProps***REMOVED***=***REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***Toast>

type***REMOVED***ToastActionElement***REMOVED***=***REMOVED***React.ReactElement<typeof***REMOVED***ToastAction>

export***REMOVED***{
***REMOVED******REMOVED***type***REMOVED***ToastProps,
***REMOVED******REMOVED***type***REMOVED***ToastActionElement,
***REMOVED******REMOVED***ToastProvider,
***REMOVED******REMOVED***ToastViewport,
***REMOVED******REMOVED***Toast,
***REMOVED******REMOVED***ToastTitle,
***REMOVED******REMOVED***ToastDescription,
***REMOVED******REMOVED***ToastClose,
***REMOVED******REMOVED***ToastAction,
}
