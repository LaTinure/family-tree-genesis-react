import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED*******REMOVED***as***REMOVED***LabelPrimitive***REMOVED***from***REMOVED***"@radix-ui/react-label"
import***REMOVED***{***REMOVED***Slot***REMOVED***}***REMOVED***from***REMOVED***"@radix-ui/react-slot"
import***REMOVED***{
***REMOVED******REMOVED***Controller,
***REMOVED******REMOVED***ControllerProps,
***REMOVED******REMOVED***FieldPath,
***REMOVED******REMOVED***FieldValues,
***REMOVED******REMOVED***FormProvider,
***REMOVED******REMOVED***useFormContext,
}***REMOVED***from***REMOVED***"react-hook-form"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"
import***REMOVED***{***REMOVED***Label***REMOVED***}***REMOVED***from***REMOVED***"@/components/ui/label"

const***REMOVED***Form***REMOVED***=***REMOVED***FormProvider

type***REMOVED***FormFieldContextValue<
***REMOVED******REMOVED***TFieldValues***REMOVED***extends***REMOVED***FieldValues***REMOVED***=***REMOVED***FieldValues,
***REMOVED******REMOVED***TName***REMOVED***extends***REMOVED***FieldPath<TFieldValues>***REMOVED***=***REMOVED***FieldPath<TFieldValues>
>***REMOVED***=***REMOVED***{
***REMOVED******REMOVED***name:***REMOVED***TName
}

const***REMOVED***FormFieldContext***REMOVED***=***REMOVED***React.createContext<FormFieldContextValue>(
***REMOVED******REMOVED***{}***REMOVED***as***REMOVED***FormFieldContextValue
)

const***REMOVED***FormField***REMOVED***=***REMOVED***<
***REMOVED******REMOVED***TFieldValues***REMOVED***extends***REMOVED***FieldValues***REMOVED***=***REMOVED***FieldValues,
***REMOVED******REMOVED***TName***REMOVED***extends***REMOVED***FieldPath<TFieldValues>***REMOVED***=***REMOVED***FieldPath<TFieldValues>
>({
***REMOVED******REMOVED***...props
}:***REMOVED***ControllerProps<TFieldValues,***REMOVED***TName>)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<FormFieldContext.Provider***REMOVED***value={{***REMOVED***name:***REMOVED***props.name***REMOVED***}}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Controller***REMOVED***{...props}***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED***</FormFieldContext.Provider>
***REMOVED******REMOVED***)
}

const***REMOVED***useFormField***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***fieldContext***REMOVED***=***REMOVED***React.useContext(FormFieldContext)
***REMOVED******REMOVED***const***REMOVED***itemContext***REMOVED***=***REMOVED***React.useContext(FormItemContext)
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***getFieldState,***REMOVED***formState***REMOVED***}***REMOVED***=***REMOVED***useFormContext()

***REMOVED******REMOVED***const***REMOVED***fieldState***REMOVED***=***REMOVED***getFieldState(fieldContext.name,***REMOVED***formState)

***REMOVED******REMOVED***if***REMOVED***(!fieldContext)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***new***REMOVED***Error("useFormField***REMOVED***should***REMOVED***be***REMOVED***used***REMOVED***within***REMOVED***<FormField>")
***REMOVED******REMOVED***}

***REMOVED******REMOVED***const***REMOVED***{***REMOVED***id***REMOVED***}***REMOVED***=***REMOVED***itemContext

***REMOVED******REMOVED***return***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***id,
***REMOVED******REMOVED******REMOVED******REMOVED***name:***REMOVED***fieldContext.name,
***REMOVED******REMOVED******REMOVED******REMOVED***formItemId:***REMOVED***`${id}-form-item`,
***REMOVED******REMOVED******REMOVED******REMOVED***formDescriptionId:***REMOVED***`${id}-form-item-description`,
***REMOVED******REMOVED******REMOVED******REMOVED***formMessageId:***REMOVED***`${id}-form-item-message`,
***REMOVED******REMOVED******REMOVED******REMOVED***...fieldState,
***REMOVED******REMOVED***}
}

type***REMOVED***FormItemContextValue***REMOVED***=***REMOVED***{
***REMOVED******REMOVED***id:***REMOVED***string
}

const***REMOVED***FormItemContext***REMOVED***=***REMOVED***React.createContext<FormItemContextValue>(
***REMOVED******REMOVED***{}***REMOVED***as***REMOVED***FormItemContextValue
)

const***REMOVED***FormItem***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***HTMLDivElement,
***REMOVED******REMOVED***React.HTMLAttributes<HTMLDivElement>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***id***REMOVED***=***REMOVED***React.useId()

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<FormItemContext.Provider***REMOVED***value={{***REMOVED***id***REMOVED***}}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***ref={ref}***REMOVED***className={cn("space-y-2",***REMOVED***className)}***REMOVED***{...props}***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED***</FormItemContext.Provider>
***REMOVED******REMOVED***)
})
FormItem.displayName***REMOVED***=***REMOVED***"FormItem"

const***REMOVED***FormLabel***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***LabelPrimitive.Root>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***LabelPrimitive.Root>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***error,***REMOVED***formItemId***REMOVED***}***REMOVED***=***REMOVED***useFormField()

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Label
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn(error***REMOVED***&&***REMOVED***"text-destructive",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***htmlFor={formItemId}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED***)
})
FormLabel.displayName***REMOVED***=***REMOVED***"FormLabel"

const***REMOVED***FormControl***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***Slot>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***Slot>
>(({***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***error,***REMOVED***formItemId,***REMOVED***formDescriptionId,***REMOVED***formMessageId***REMOVED***}***REMOVED***=***REMOVED***useFormField()

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Slot
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id={formItemId}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***aria-describedby={
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***!error
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***?***REMOVED***`${formDescriptionId}`
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***:***REMOVED***`${formDescriptionId}***REMOVED***${formMessageId}`
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***aria-invalid={!!error}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED***)
})
FormControl.displayName***REMOVED***=***REMOVED***"FormControl"

const***REMOVED***FormDescription***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***HTMLParagraphElement,
***REMOVED******REMOVED***React.HTMLAttributes<HTMLParagraphElement>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***formDescriptionId***REMOVED***}***REMOVED***=***REMOVED***useFormField()

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<p
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id={formDescriptionId}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn("text-sm***REMOVED***text-muted-foreground",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED***)
})
FormDescription.displayName***REMOVED***=***REMOVED***"FormDescription"

const***REMOVED***FormMessage***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***HTMLParagraphElement,
***REMOVED******REMOVED***React.HTMLAttributes<HTMLParagraphElement>
>(({***REMOVED***className,***REMOVED***children,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***error,***REMOVED***formMessageId***REMOVED***}***REMOVED***=***REMOVED***useFormField()
***REMOVED******REMOVED***const***REMOVED***body***REMOVED***=***REMOVED***error***REMOVED***?***REMOVED***String(error?.message)***REMOVED***:***REMOVED***children

***REMOVED******REMOVED***if***REMOVED***(!body)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***null
***REMOVED******REMOVED***}

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<p
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id={formMessageId}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn("text-sm***REMOVED***font-medium***REMOVED***text-destructive",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{body}
***REMOVED******REMOVED******REMOVED******REMOVED***</p>
***REMOVED******REMOVED***)
})
FormMessage.displayName***REMOVED***=***REMOVED***"FormMessage"

export***REMOVED***{
***REMOVED******REMOVED***useFormField,
***REMOVED******REMOVED***Form,
***REMOVED******REMOVED***FormItem,
***REMOVED******REMOVED***FormLabel,
***REMOVED******REMOVED***FormControl,
***REMOVED******REMOVED***FormDescription,
***REMOVED******REMOVED***FormMessage,
***REMOVED******REMOVED***FormField,
}
