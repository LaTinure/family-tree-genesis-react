import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED***{***REMOVED***type***REMOVED***DialogProps***REMOVED***}***REMOVED***from***REMOVED***"@radix-ui/react-dialog"
import***REMOVED***{***REMOVED***Command***REMOVED***as***REMOVED***CommandPrimitive***REMOVED***}***REMOVED***from***REMOVED***"cmdk"
import***REMOVED***{***REMOVED***Search***REMOVED***}***REMOVED***from***REMOVED***"lucide-react"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"
import***REMOVED***{***REMOVED***Dialog,***REMOVED***DialogContent***REMOVED***}***REMOVED***from***REMOVED***"@/components/ui/dialog"

const***REMOVED***Command***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***CommandPrimitive>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***CommandPrimitive>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<CommandPrimitive
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"flex***REMOVED***h-full***REMOVED***w-full***REMOVED***flex-col***REMOVED***overflow-hidden***REMOVED***rounded-md***REMOVED***bg-popover***REMOVED***text-popover-foreground",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
Command.displayName***REMOVED***=***REMOVED***CommandPrimitive.displayName

interface***REMOVED***CommandDialogProps***REMOVED***extends***REMOVED***DialogProps***REMOVED***{}

const***REMOVED***CommandDialog***REMOVED***=***REMOVED***({***REMOVED***children,***REMOVED***...props***REMOVED***}:***REMOVED***CommandDialogProps)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Dialog***REMOVED***{...props}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DialogContent***REMOVED***className="overflow-hidden***REMOVED***p-0***REMOVED***shadow-lg">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Command***REMOVED***className="[&_[cmdk-group-heading]]:px-2***REMOVED***[&_[cmdk-group-heading]]:font-medium***REMOVED***[&_[cmdk-group-heading]]:text-muted-foreground***REMOVED***[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0***REMOVED***[&_[cmdk-group]]:px-2***REMOVED***[&_[cmdk-input-wrapper]_svg]:h-5***REMOVED***[&_[cmdk-input-wrapper]_svg]:w-5***REMOVED***[&_[cmdk-input]]:h-12***REMOVED***[&_[cmdk-item]]:px-2***REMOVED***[&_[cmdk-item]]:py-3***REMOVED***[&_[cmdk-item]_svg]:h-5***REMOVED***[&_[cmdk-item]_svg]:w-5">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{children}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Command>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</DialogContent>
***REMOVED******REMOVED******REMOVED******REMOVED***</Dialog>
***REMOVED******REMOVED***)
}

const***REMOVED***CommandInput***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***CommandPrimitive.Input>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***CommandPrimitive.Input>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<div***REMOVED***className="flex***REMOVED***items-center***REMOVED***border-b***REMOVED***px-3"***REMOVED***cmdk-input-wrapper="">
***REMOVED******REMOVED******REMOVED******REMOVED***<Search***REMOVED***className="mr-2***REMOVED***h-4***REMOVED***w-4***REMOVED***shrink-0***REMOVED***opacity-50"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED***<CommandPrimitive.Input
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"flex***REMOVED***h-11***REMOVED***w-full***REMOVED***rounded-md***REMOVED***bg-transparent***REMOVED***py-3***REMOVED***text-sm***REMOVED***outline-none***REMOVED***placeholder:text-muted-foreground***REMOVED***disabled:cursor-not-allowed***REMOVED***disabled:opacity-50",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED***</div>
))

CommandInput.displayName***REMOVED***=***REMOVED***CommandPrimitive.Input.displayName

const***REMOVED***CommandList***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***CommandPrimitive.List>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***CommandPrimitive.List>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<CommandPrimitive.List
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("max-h-[300px]***REMOVED***overflow-y-auto***REMOVED***overflow-x-hidden",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))

CommandList.displayName***REMOVED***=***REMOVED***CommandPrimitive.List.displayName

const***REMOVED***CommandEmpty***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***CommandPrimitive.Empty>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***CommandPrimitive.Empty>
>((props,***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<CommandPrimitive.Empty
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className="py-6***REMOVED***text-center***REMOVED***text-sm"
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))

CommandEmpty.displayName***REMOVED***=***REMOVED***CommandPrimitive.Empty.displayName

const***REMOVED***CommandGroup***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***CommandPrimitive.Group>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***CommandPrimitive.Group>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<CommandPrimitive.Group
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"overflow-hidden***REMOVED***p-1***REMOVED***text-foreground***REMOVED***[&_[cmdk-group-heading]]:px-2***REMOVED***[&_[cmdk-group-heading]]:py-1.5***REMOVED***[&_[cmdk-group-heading]]:text-xs***REMOVED***[&_[cmdk-group-heading]]:font-medium***REMOVED***[&_[cmdk-group-heading]]:text-muted-foreground",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))

CommandGroup.displayName***REMOVED***=***REMOVED***CommandPrimitive.Group.displayName

const***REMOVED***CommandSeparator***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***CommandPrimitive.Separator>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***CommandPrimitive.Separator>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<CommandPrimitive.Separator
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("-mx-1***REMOVED***h-px***REMOVED***bg-border",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
CommandSeparator.displayName***REMOVED***=***REMOVED***CommandPrimitive.Separator.displayName

const***REMOVED***CommandItem***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***CommandPrimitive.Item>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***CommandPrimitive.Item>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<CommandPrimitive.Item
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"relative***REMOVED***flex***REMOVED***cursor-default***REMOVED***select-none***REMOVED***items-center***REMOVED***rounded-sm***REMOVED***px-2***REMOVED***py-1.5***REMOVED***text-sm***REMOVED***outline-none***REMOVED***data-[disabled=true]:pointer-events-none***REMOVED***data-[selected='true']:bg-accent***REMOVED***data-[selected=true]:text-accent-foreground***REMOVED***data-[disabled=true]:opacity-50",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))

CommandItem.displayName***REMOVED***=***REMOVED***CommandPrimitive.Item.displayName

const***REMOVED***CommandShortcut***REMOVED***=***REMOVED***({
***REMOVED******REMOVED***className,
***REMOVED******REMOVED***...props
}:***REMOVED***React.HTMLAttributes<HTMLSpanElement>)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<span
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"ml-auto***REMOVED***text-xs***REMOVED***tracking-widest***REMOVED***text-muted-foreground",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED***)
}
CommandShortcut.displayName***REMOVED***=***REMOVED***"CommandShortcut"

export***REMOVED***{
***REMOVED******REMOVED***Command,
***REMOVED******REMOVED***CommandDialog,
***REMOVED******REMOVED***CommandInput,
***REMOVED******REMOVED***CommandList,
***REMOVED******REMOVED***CommandEmpty,
***REMOVED******REMOVED***CommandGroup,
***REMOVED******REMOVED***CommandItem,
***REMOVED******REMOVED***CommandShortcut,
***REMOVED******REMOVED***CommandSeparator,
}
