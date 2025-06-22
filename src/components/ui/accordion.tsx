import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED*******REMOVED***as***REMOVED***AccordionPrimitive***REMOVED***from***REMOVED***"@radix-ui/react-accordion"
import***REMOVED***{***REMOVED***ChevronDown***REMOVED***}***REMOVED***from***REMOVED***"lucide-react"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***Accordion***REMOVED***=***REMOVED***AccordionPrimitive.Root

const***REMOVED***AccordionItem***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***AccordionPrimitive.Item>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***AccordionPrimitive.Item>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<AccordionPrimitive.Item
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("border-b",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
AccordionItem.displayName***REMOVED***=***REMOVED***"AccordionItem"

const***REMOVED***AccordionTrigger***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***AccordionPrimitive.Trigger>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***AccordionPrimitive.Trigger>
>(({***REMOVED***className,***REMOVED***children,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<AccordionPrimitive.Header***REMOVED***className="flex">
***REMOVED******REMOVED******REMOVED******REMOVED***<AccordionPrimitive.Trigger
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"flex***REMOVED***flex-1***REMOVED***items-center***REMOVED***justify-between***REMOVED***py-4***REMOVED***font-medium***REMOVED***transition-all***REMOVED***hover:underline***REMOVED***[&[data-state=open]>svg]:rotate-180",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{children}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<ChevronDown***REMOVED***className="h-4***REMOVED***w-4***REMOVED***shrink-0***REMOVED***transition-transform***REMOVED***duration-200"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED***</AccordionPrimitive.Trigger>
***REMOVED******REMOVED***</AccordionPrimitive.Header>
))
AccordionTrigger.displayName***REMOVED***=***REMOVED***AccordionPrimitive.Trigger.displayName

const***REMOVED***AccordionContent***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***AccordionPrimitive.Content>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***AccordionPrimitive.Content>
>(({***REMOVED***className,***REMOVED***children,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<AccordionPrimitive.Content
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className="overflow-hidden***REMOVED***text-sm***REMOVED***transition-all***REMOVED***data-[state=closed]:animate-accordion-up***REMOVED***data-[state=open]:animate-accordion-down"
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className={cn("pb-4***REMOVED***pt-0",***REMOVED***className)}>{children}</div>
***REMOVED******REMOVED***</AccordionPrimitive.Content>
))

AccordionContent.displayName***REMOVED***=***REMOVED***AccordionPrimitive.Content.displayName

export***REMOVED***{***REMOVED***Accordion,***REMOVED***AccordionItem,***REMOVED***AccordionTrigger,***REMOVED***AccordionContent***REMOVED***}
