import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***Card***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***HTMLDivElement,
***REMOVED******REMOVED***React.HTMLAttributes<HTMLDivElement>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<div
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"rounded-lg***REMOVED***border***REMOVED***bg-card***REMOVED***text-card-foreground***REMOVED***shadow-sm",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
Card.displayName***REMOVED***=***REMOVED***"Card"

const***REMOVED***CardHeader***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***HTMLDivElement,
***REMOVED******REMOVED***React.HTMLAttributes<HTMLDivElement>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<div
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("flex***REMOVED***flex-col***REMOVED***space-y-1.5***REMOVED***p-6",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
CardHeader.displayName***REMOVED***=***REMOVED***"CardHeader"

const***REMOVED***CardTitle***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***HTMLParagraphElement,
***REMOVED******REMOVED***React.HTMLAttributes<HTMLHeadingElement>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<h3
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"text-2xl***REMOVED***font-semibold***REMOVED***leading-none***REMOVED***tracking-tight",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
CardTitle.displayName***REMOVED***=***REMOVED***"CardTitle"

const***REMOVED***CardDescription***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***HTMLParagraphElement,
***REMOVED******REMOVED***React.HTMLAttributes<HTMLParagraphElement>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<p
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("text-sm***REMOVED***text-muted-foreground",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
CardDescription.displayName***REMOVED***=***REMOVED***"CardDescription"

const***REMOVED***CardContent***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***HTMLDivElement,
***REMOVED******REMOVED***React.HTMLAttributes<HTMLDivElement>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<div***REMOVED***ref={ref}***REMOVED***className={cn("p-6***REMOVED***pt-0",***REMOVED***className)}***REMOVED***{...props}***REMOVED***/>
))
CardContent.displayName***REMOVED***=***REMOVED***"CardContent"

const***REMOVED***CardFooter***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***HTMLDivElement,
***REMOVED******REMOVED***React.HTMLAttributes<HTMLDivElement>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<div
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("flex***REMOVED***items-center***REMOVED***p-6***REMOVED***pt-0",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
CardFooter.displayName***REMOVED***=***REMOVED***"CardFooter"

export***REMOVED***{***REMOVED***Card,***REMOVED***CardHeader,***REMOVED***CardFooter,***REMOVED***CardTitle,***REMOVED***CardDescription,***REMOVED***CardContent***REMOVED***}
