import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED***useEmblaCarousel,***REMOVED***{
***REMOVED******REMOVED***type***REMOVED***UseEmblaCarouselType,
}***REMOVED***from***REMOVED***"embla-carousel-react"
import***REMOVED***{***REMOVED***ArrowLeft,***REMOVED***ArrowRight***REMOVED***}***REMOVED***from***REMOVED***"lucide-react"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"
import***REMOVED***{***REMOVED***Button***REMOVED***}***REMOVED***from***REMOVED***"@/components/ui/button"

type***REMOVED***CarouselApi***REMOVED***=***REMOVED***UseEmblaCarouselType[1]
type***REMOVED***UseCarouselParameters***REMOVED***=***REMOVED***Parameters<typeof***REMOVED***useEmblaCarousel>
type***REMOVED***CarouselOptions***REMOVED***=***REMOVED***UseCarouselParameters[0]
type***REMOVED***CarouselPlugin***REMOVED***=***REMOVED***UseCarouselParameters[1]

type***REMOVED***CarouselProps***REMOVED***=***REMOVED***{
***REMOVED******REMOVED***opts?:***REMOVED***CarouselOptions
***REMOVED******REMOVED***plugins?:***REMOVED***CarouselPlugin
***REMOVED******REMOVED***orientation?:***REMOVED***"horizontal"***REMOVED***|***REMOVED***"vertical"
***REMOVED******REMOVED***setApi?:***REMOVED***(api:***REMOVED***CarouselApi)***REMOVED***=>***REMOVED***void
}

type***REMOVED***CarouselContextProps***REMOVED***=***REMOVED***{
***REMOVED******REMOVED***carouselRef:***REMOVED***ReturnType<typeof***REMOVED***useEmblaCarousel>[0]
***REMOVED******REMOVED***api:***REMOVED***ReturnType<typeof***REMOVED***useEmblaCarousel>[1]
***REMOVED******REMOVED***scrollPrev:***REMOVED***()***REMOVED***=>***REMOVED***void
***REMOVED******REMOVED***scrollNext:***REMOVED***()***REMOVED***=>***REMOVED***void
***REMOVED******REMOVED***canScrollPrev:***REMOVED***boolean
***REMOVED******REMOVED***canScrollNext:***REMOVED***boolean
}***REMOVED***&***REMOVED***CarouselProps

const***REMOVED***CarouselContext***REMOVED***=***REMOVED***React.createContext<CarouselContextProps***REMOVED***|***REMOVED***null>(null)

function***REMOVED***useCarousel()***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***context***REMOVED***=***REMOVED***React.useContext(CarouselContext)

***REMOVED******REMOVED***if***REMOVED***(!context)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***new***REMOVED***Error("useCarousel***REMOVED***must***REMOVED***be***REMOVED***used***REMOVED***within***REMOVED***a***REMOVED***<Carousel***REMOVED***/>")
***REMOVED******REMOVED***}

***REMOVED******REMOVED***return***REMOVED***context
}

const***REMOVED***Carousel***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***HTMLDivElement,
***REMOVED******REMOVED***React.HTMLAttributes<HTMLDivElement>***REMOVED***&***REMOVED***CarouselProps
>(
***REMOVED******REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***orientation***REMOVED***=***REMOVED***"horizontal",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***opts,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setApi,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***plugins,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***children,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...props
***REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***ref
***REMOVED******REMOVED***)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***[carouselRef,***REMOVED***api]***REMOVED***=***REMOVED***useEmblaCarousel(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...opts,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***axis:***REMOVED***orientation***REMOVED***===***REMOVED***"horizontal"***REMOVED***?***REMOVED***"x"***REMOVED***:***REMOVED***"y",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***plugins
***REMOVED******REMOVED******REMOVED******REMOVED***)
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***[canScrollPrev,***REMOVED***setCanScrollPrev]***REMOVED***=***REMOVED***React.useState(false)
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***[canScrollNext,***REMOVED***setCanScrollNext]***REMOVED***=***REMOVED***React.useState(false)

***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***onSelect***REMOVED***=***REMOVED***React.useCallback((api:***REMOVED***CarouselApi)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!api)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setCanScrollPrev(api.canScrollPrev())
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setCanScrollNext(api.canScrollNext())
***REMOVED******REMOVED******REMOVED******REMOVED***},***REMOVED***[])

***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***scrollPrev***REMOVED***=***REMOVED***React.useCallback(()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***api?.scrollPrev()
***REMOVED******REMOVED******REMOVED******REMOVED***},***REMOVED***[api])

***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***scrollNext***REMOVED***=***REMOVED***React.useCallback(()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***api?.scrollNext()
***REMOVED******REMOVED******REMOVED******REMOVED***},***REMOVED***[api])

***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***handleKeyDown***REMOVED***=***REMOVED***React.useCallback(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***(event:***REMOVED***React.KeyboardEvent<HTMLDivElement>)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(event.key***REMOVED***===***REMOVED***"ArrowLeft")***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***event.preventDefault()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***scrollPrev()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***else***REMOVED***if***REMOVED***(event.key***REMOVED***===***REMOVED***"ArrowRight")***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***event.preventDefault()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***scrollNext()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***[scrollPrev,***REMOVED***scrollNext]
***REMOVED******REMOVED******REMOVED******REMOVED***)

***REMOVED******REMOVED******REMOVED******REMOVED***React.useEffect(()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!api***REMOVED***||***REMOVED***!setApi)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setApi(api)
***REMOVED******REMOVED******REMOVED******REMOVED***},***REMOVED***[api,***REMOVED***setApi])

***REMOVED******REMOVED******REMOVED******REMOVED***React.useEffect(()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!api)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onSelect(api)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***api.on("reInit",***REMOVED***onSelect)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***api.on("select",***REMOVED***onSelect)

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***api?.off("select",***REMOVED***onSelect)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***},***REMOVED***[api,***REMOVED***onSelect])

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<CarouselContext.Provider
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***value={{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***carouselRef,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***api:***REMOVED***api,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***opts,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***orientation:
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***orientation***REMOVED***||***REMOVED***(opts?.axis***REMOVED***===***REMOVED***"y"***REMOVED***?***REMOVED***"vertical"***REMOVED***:***REMOVED***"horizontal"),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***scrollPrev,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***scrollNext,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***canScrollPrev,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***canScrollNext,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onKeyDownCapture={handleKeyDown}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn("relative",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***role="region"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***aria-roledescription="carousel"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{children}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</CarouselContext.Provider>
***REMOVED******REMOVED******REMOVED******REMOVED***)
***REMOVED******REMOVED***}
)
Carousel.displayName***REMOVED***=***REMOVED***"Carousel"

const***REMOVED***CarouselContent***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***HTMLDivElement,
***REMOVED******REMOVED***React.HTMLAttributes<HTMLDivElement>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***carouselRef,***REMOVED***orientation***REMOVED***}***REMOVED***=***REMOVED***useCarousel()

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***ref={carouselRef}***REMOVED***className="overflow-hidden">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"flex",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***orientation***REMOVED***===***REMOVED***"horizontal"***REMOVED***?***REMOVED***"-ml-4"***REMOVED***:***REMOVED***"-mt-4***REMOVED***flex-col",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED***)
})
CarouselContent.displayName***REMOVED***=***REMOVED***"CarouselContent"

const***REMOVED***CarouselItem***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***HTMLDivElement,
***REMOVED******REMOVED***React.HTMLAttributes<HTMLDivElement>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***orientation***REMOVED***}***REMOVED***=***REMOVED***useCarousel()

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<div
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***role="group"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***aria-roledescription="slide"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"min-w-0***REMOVED***shrink-0***REMOVED***grow-0***REMOVED***basis-full",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***orientation***REMOVED***===***REMOVED***"horizontal"***REMOVED***?***REMOVED***"pl-4"***REMOVED***:***REMOVED***"pt-4",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED***)
})
CarouselItem.displayName***REMOVED***=***REMOVED***"CarouselItem"

const***REMOVED***CarouselPrevious***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***HTMLButtonElement,
***REMOVED******REMOVED***React.ComponentProps<typeof***REMOVED***Button>
>(({***REMOVED***className,***REMOVED***variant***REMOVED***=***REMOVED***"outline",***REMOVED***size***REMOVED***=***REMOVED***"icon",***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***orientation,***REMOVED***scrollPrev,***REMOVED***canScrollPrev***REMOVED***}***REMOVED***=***REMOVED***useCarousel()

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Button
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant={variant}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***size={size}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"absolute***REMOVED******REMOVED***h-8***REMOVED***w-8***REMOVED***rounded-full",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***orientation***REMOVED***===***REMOVED***"horizontal"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***?***REMOVED***"-left-12***REMOVED***top-1/2***REMOVED***-translate-y-1/2"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***:***REMOVED***"-top-12***REMOVED***left-1/2***REMOVED***-translate-x-1/2***REMOVED***rotate-90",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***disabled={!canScrollPrev}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onClick={scrollPrev}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<ArrowLeft***REMOVED***className="h-4***REMOVED***w-4"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<span***REMOVED***className="sr-only">Previous***REMOVED***slide</span>
***REMOVED******REMOVED******REMOVED******REMOVED***</Button>
***REMOVED******REMOVED***)
})
CarouselPrevious.displayName***REMOVED***=***REMOVED***"CarouselPrevious"

const***REMOVED***CarouselNext***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***HTMLButtonElement,
***REMOVED******REMOVED***React.ComponentProps<typeof***REMOVED***Button>
>(({***REMOVED***className,***REMOVED***variant***REMOVED***=***REMOVED***"outline",***REMOVED***size***REMOVED***=***REMOVED***"icon",***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***orientation,***REMOVED***scrollNext,***REMOVED***canScrollNext***REMOVED***}***REMOVED***=***REMOVED***useCarousel()

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Button
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant={variant}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***size={size}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"absolute***REMOVED***h-8***REMOVED***w-8***REMOVED***rounded-full",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***orientation***REMOVED***===***REMOVED***"horizontal"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***?***REMOVED***"-right-12***REMOVED***top-1/2***REMOVED***-translate-y-1/2"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***:***REMOVED***"-bottom-12***REMOVED***left-1/2***REMOVED***-translate-x-1/2***REMOVED***rotate-90",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***disabled={!canScrollNext}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onClick={scrollNext}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<ArrowRight***REMOVED***className="h-4***REMOVED***w-4"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<span***REMOVED***className="sr-only">Next***REMOVED***slide</span>
***REMOVED******REMOVED******REMOVED******REMOVED***</Button>
***REMOVED******REMOVED***)
})
CarouselNext.displayName***REMOVED***=***REMOVED***"CarouselNext"

export***REMOVED***{
***REMOVED******REMOVED***type***REMOVED***CarouselApi,
***REMOVED******REMOVED***Carousel,
***REMOVED******REMOVED***CarouselContent,
***REMOVED******REMOVED***CarouselItem,
***REMOVED******REMOVED***CarouselPrevious,
***REMOVED******REMOVED***CarouselNext,
}
