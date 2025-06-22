import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED*******REMOVED***as***REMOVED***AvatarPrimitive***REMOVED***from***REMOVED***"@radix-ui/react-avatar"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***Avatar***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***AvatarPrimitive.Root>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***AvatarPrimitive.Root>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<AvatarPrimitive.Root
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"relative***REMOVED***flex***REMOVED***h-10***REMOVED***w-10***REMOVED***shrink-0***REMOVED***overflow-hidden***REMOVED***rounded-full",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
Avatar.displayName***REMOVED***=***REMOVED***AvatarPrimitive.Root.displayName

const***REMOVED***AvatarImage***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***AvatarPrimitive.Image>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***AvatarPrimitive.Image>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<AvatarPrimitive.Image
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("aspect-square***REMOVED***h-full***REMOVED***w-full",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
AvatarImage.displayName***REMOVED***=***REMOVED***AvatarPrimitive.Image.displayName

const***REMOVED***AvatarFallback***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***AvatarPrimitive.Fallback>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***AvatarPrimitive.Fallback>
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<AvatarPrimitive.Fallback
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"flex***REMOVED***h-full***REMOVED***w-full***REMOVED***items-center***REMOVED***justify-center***REMOVED***rounded-full***REMOVED***bg-muted",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
AvatarFallback.displayName***REMOVED***=***REMOVED***AvatarPrimitive.Fallback.displayName

export***REMOVED***{***REMOVED***Avatar,***REMOVED***AvatarImage,***REMOVED***AvatarFallback***REMOVED***}
