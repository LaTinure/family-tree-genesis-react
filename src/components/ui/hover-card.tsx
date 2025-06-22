import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED*******REMOVED***as***REMOVED***HoverCardPrimitive***REMOVED***from***REMOVED***"@radix-ui/react-hover-card"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***HoverCard***REMOVED***=***REMOVED***HoverCardPrimitive.Root

const***REMOVED***HoverCardTrigger***REMOVED***=***REMOVED***HoverCardPrimitive.Trigger

const***REMOVED***HoverCardContent***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***HoverCardPrimitive.Content>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***HoverCardPrimitive.Content>
>(({***REMOVED***className,***REMOVED***align***REMOVED***=***REMOVED***"center",***REMOVED***sideOffset***REMOVED***=***REMOVED***4,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<HoverCardPrimitive.Content
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***align={align}
***REMOVED******REMOVED******REMOVED******REMOVED***sideOffset={sideOffset}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"z-50***REMOVED***w-64***REMOVED***rounded-md***REMOVED***border***REMOVED***bg-popover***REMOVED***p-4***REMOVED***text-popover-foreground***REMOVED***shadow-md***REMOVED***outline-none***REMOVED***data-[state=open]:animate-in***REMOVED***data-[state=closed]:animate-out***REMOVED***data-[state=closed]:fade-out-0***REMOVED***data-[state=open]:fade-in-0***REMOVED***data-[state=closed]:zoom-out-95***REMOVED***data-[state=open]:zoom-in-95***REMOVED***data-[side=bottom]:slide-in-from-top-2***REMOVED***data-[side=left]:slide-in-from-right-2***REMOVED***data-[side=right]:slide-in-from-left-2***REMOVED***data-[side=top]:slide-in-from-bottom-2",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
HoverCardContent.displayName***REMOVED***=***REMOVED***HoverCardPrimitive.Content.displayName

export***REMOVED***{***REMOVED***HoverCard,***REMOVED***HoverCardTrigger,***REMOVED***HoverCardContent***REMOVED***}
