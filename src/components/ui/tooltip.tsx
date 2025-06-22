import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED*******REMOVED***as***REMOVED***TooltipPrimitive***REMOVED***from***REMOVED***"@radix-ui/react-tooltip"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***TooltipProvider***REMOVED***=***REMOVED***TooltipPrimitive.Provider

const***REMOVED***Tooltip***REMOVED***=***REMOVED***TooltipPrimitive.Root

const***REMOVED***TooltipTrigger***REMOVED***=***REMOVED***TooltipPrimitive.Trigger

const***REMOVED***TooltipContent***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***TooltipPrimitive.Content>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***TooltipPrimitive.Content>
>(({***REMOVED***className,***REMOVED***sideOffset***REMOVED***=***REMOVED***4,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<TooltipPrimitive.Content
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***sideOffset={sideOffset}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"z-50***REMOVED***overflow-hidden***REMOVED***rounded-md***REMOVED***border***REMOVED***bg-popover***REMOVED***px-3***REMOVED***py-1.5***REMOVED***text-sm***REMOVED***text-popover-foreground***REMOVED***shadow-md***REMOVED***animate-in***REMOVED***fade-in-0***REMOVED***zoom-in-95***REMOVED***data-[state=closed]:animate-out***REMOVED***data-[state=closed]:fade-out-0***REMOVED***data-[state=closed]:zoom-out-95***REMOVED***data-[side=bottom]:slide-in-from-top-2***REMOVED***data-[side=left]:slide-in-from-right-2***REMOVED***data-[side=right]:slide-in-from-left-2***REMOVED***data-[side=top]:slide-in-from-bottom-2",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
TooltipContent.displayName***REMOVED***=***REMOVED***TooltipPrimitive.Content.displayName

export***REMOVED***{***REMOVED***Tooltip,***REMOVED***TooltipTrigger,***REMOVED***TooltipContent,***REMOVED***TooltipProvider***REMOVED***}
