import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED*******REMOVED***as***REMOVED***SliderPrimitive***REMOVED***from***REMOVED***"@radix-ui/react-slider"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***Slider***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***SliderPrimitive.Root>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***SliderPrimitive.Root>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<SliderPrimitive.Root
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"relative***REMOVED***flex***REMOVED***w-full***REMOVED***touch-none***REMOVED***select-none***REMOVED***items-center",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED***<SliderPrimitive.Track***REMOVED***className="relative***REMOVED***h-2***REMOVED***w-full***REMOVED***grow***REMOVED***overflow-hidden***REMOVED***rounded-full***REMOVED***bg-secondary">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<SliderPrimitive.Range***REMOVED***className="absolute***REMOVED***h-full***REMOVED***bg-primary"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED***</SliderPrimitive.Track>
***REMOVED******REMOVED******REMOVED******REMOVED***<SliderPrimitive.Thumb***REMOVED***className="block***REMOVED***h-5***REMOVED***w-5***REMOVED***rounded-full***REMOVED***border-2***REMOVED***border-primary***REMOVED***bg-background***REMOVED***ring-offset-background***REMOVED***transition-colors***REMOVED***focus-visible:outline-none***REMOVED***focus-visible:ring-2***REMOVED***focus-visible:ring-ring***REMOVED***focus-visible:ring-offset-2***REMOVED***disabled:pointer-events-none***REMOVED***disabled:opacity-50"***REMOVED***/>
***REMOVED******REMOVED***</SliderPrimitive.Root>
))
Slider.displayName***REMOVED***=***REMOVED***SliderPrimitive.Root.displayName

export***REMOVED***{***REMOVED***Slider***REMOVED***}
