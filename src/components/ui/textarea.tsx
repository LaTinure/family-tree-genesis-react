import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

export***REMOVED***interface***REMOVED***TextareaProps
***REMOVED******REMOVED***extends***REMOVED***React.TextareaHTMLAttributes<HTMLTextAreaElement>***REMOVED***{}

const***REMOVED***Textarea***REMOVED***=***REMOVED***React.forwardRef<HTMLTextAreaElement,***REMOVED***TextareaProps>(
***REMOVED******REMOVED***({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<textarea
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"flex***REMOVED***min-h-[80px]***REMOVED***w-full***REMOVED***rounded-md***REMOVED***border***REMOVED***border-input***REMOVED***bg-background***REMOVED***px-3***REMOVED***py-2***REMOVED***text-sm***REMOVED***ring-offset-background***REMOVED***placeholder:text-muted-foreground***REMOVED***focus-visible:outline-none***REMOVED***focus-visible:ring-2***REMOVED***focus-visible:ring-ring***REMOVED***focus-visible:ring-offset-2***REMOVED***disabled:cursor-not-allowed***REMOVED***disabled:opacity-50",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED***)
***REMOVED******REMOVED***}
)
Textarea.displayName***REMOVED***=***REMOVED***"Textarea"

export***REMOVED***{***REMOVED***Textarea***REMOVED***}
