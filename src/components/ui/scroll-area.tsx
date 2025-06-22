import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED*******REMOVED***as***REMOVED***ScrollAreaPrimitive***REMOVED***from***REMOVED***"@radix-ui/react-scroll-area"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***ScrollArea***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***ScrollAreaPrimitive.Root>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***ScrollAreaPrimitive.Root>
>(({***REMOVED***className,***REMOVED***children,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<ScrollAreaPrimitive.Root
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("relative***REMOVED***overflow-hidden",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED***<ScrollAreaPrimitive.Viewport***REMOVED***className="h-full***REMOVED***w-full***REMOVED***rounded-[inherit]">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{children}
***REMOVED******REMOVED******REMOVED******REMOVED***</ScrollAreaPrimitive.Viewport>
***REMOVED******REMOVED******REMOVED******REMOVED***<ScrollBar***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED***<ScrollAreaPrimitive.Corner***REMOVED***/>
***REMOVED******REMOVED***</ScrollAreaPrimitive.Root>
))
ScrollArea.displayName***REMOVED***=***REMOVED***ScrollAreaPrimitive.Root.displayName

const***REMOVED***ScrollBar***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***ScrollAreaPrimitive.ScrollAreaScrollbar>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({***REMOVED***className,***REMOVED***orientation***REMOVED***=***REMOVED***"vertical",***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<ScrollAreaPrimitive.ScrollAreaScrollbar
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***orientation={orientation}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"flex***REMOVED***touch-none***REMOVED***select-none***REMOVED***transition-colors",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***orientation***REMOVED***===***REMOVED***"vertical"***REMOVED***&&
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"h-full***REMOVED***w-2.5***REMOVED***border-l***REMOVED***border-l-transparent***REMOVED***p-[1px]",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***orientation***REMOVED***===***REMOVED***"horizontal"***REMOVED***&&
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"h-2.5***REMOVED***flex-col***REMOVED***border-t***REMOVED***border-t-transparent***REMOVED***p-[1px]",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED***<ScrollAreaPrimitive.ScrollAreaThumb***REMOVED***className="relative***REMOVED***flex-1***REMOVED***rounded-full***REMOVED***bg-border"***REMOVED***/>
***REMOVED******REMOVED***</ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName***REMOVED***=***REMOVED***ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export***REMOVED***{***REMOVED***ScrollArea,***REMOVED***ScrollBar***REMOVED***}
