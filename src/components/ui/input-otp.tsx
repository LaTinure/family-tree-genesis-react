import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"
import***REMOVED***{***REMOVED***OTPInput,***REMOVED***OTPInputContext***REMOVED***}***REMOVED***from***REMOVED***"input-otp"
import***REMOVED***{***REMOVED***Dot***REMOVED***}***REMOVED***from***REMOVED***"lucide-react"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***InputOTP***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<typeof***REMOVED***OTPInput>,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<typeof***REMOVED***OTPInput>
>(({***REMOVED***className,***REMOVED***containerClassName,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<OTPInput
***REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED***containerClassName={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"flex***REMOVED***items-center***REMOVED***gap-2***REMOVED***has-[:disabled]:opacity-50",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***containerClassName
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn("disabled:cursor-not-allowed",***REMOVED***className)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
))
InputOTP.displayName***REMOVED***=***REMOVED***"InputOTP"

const***REMOVED***InputOTPGroup***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<"div">,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<"div">
>(({***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<div***REMOVED***ref={ref}***REMOVED***className={cn("flex***REMOVED***items-center",***REMOVED***className)}***REMOVED***{...props}***REMOVED***/>
))
InputOTPGroup.displayName***REMOVED***=***REMOVED***"InputOTPGroup"

const***REMOVED***InputOTPSlot***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<"div">,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<"div">***REMOVED***&***REMOVED***{***REMOVED***index:***REMOVED***number***REMOVED***}
>(({***REMOVED***index,***REMOVED***className,***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***inputOTPContext***REMOVED***=***REMOVED***React.useContext(OTPInputContext)
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***char,***REMOVED***hasFakeCaret,***REMOVED***isActive***REMOVED***}***REMOVED***=***REMOVED***inputOTPContext.slots[index]

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<div
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***ref={ref}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"relative***REMOVED***flex***REMOVED***h-10***REMOVED***w-10***REMOVED***items-center***REMOVED***justify-center***REMOVED***border-y***REMOVED***border-r***REMOVED***border-input***REMOVED***text-sm***REMOVED***transition-all***REMOVED***first:rounded-l-md***REMOVED***first:border-l***REMOVED***last:rounded-r-md",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***isActive***REMOVED***&&***REMOVED***"z-10***REMOVED***ring-2***REMOVED***ring-ring***REMOVED***ring-offset-background",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{char}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{hasFakeCaret***REMOVED***&&***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="pointer-events-none***REMOVED***absolute***REMOVED***inset-0***REMOVED***flex***REMOVED***items-center***REMOVED***justify-center">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="h-4***REMOVED***w-px***REMOVED***animate-caret-blink***REMOVED***bg-foreground***REMOVED***duration-1000"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED***)
})
InputOTPSlot.displayName***REMOVED***=***REMOVED***"InputOTPSlot"

const***REMOVED***InputOTPSeparator***REMOVED***=***REMOVED***React.forwardRef<
***REMOVED******REMOVED***React.ElementRef<"div">,
***REMOVED******REMOVED***React.ComponentPropsWithoutRef<"div">
>(({***REMOVED***...props***REMOVED***},***REMOVED***ref)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<div***REMOVED***ref={ref}***REMOVED***role="separator"***REMOVED***{...props}>
***REMOVED******REMOVED******REMOVED******REMOVED***<Dot***REMOVED***/>
***REMOVED******REMOVED***</div>
))
InputOTPSeparator.displayName***REMOVED***=***REMOVED***"InputOTPSeparator"

export***REMOVED***{***REMOVED***InputOTP,***REMOVED***InputOTPGroup,***REMOVED***InputOTPSlot,***REMOVED***InputOTPSeparator***REMOVED***}
