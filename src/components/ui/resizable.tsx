import***REMOVED***{***REMOVED***GripVertical***REMOVED***}***REMOVED***from***REMOVED***"lucide-react"
import***REMOVED*******REMOVED***as***REMOVED***ResizablePrimitive***REMOVED***from***REMOVED***"react-resizable-panels"

import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils"

const***REMOVED***ResizablePanelGroup***REMOVED***=***REMOVED***({
***REMOVED******REMOVED***className,
***REMOVED******REMOVED***...props
}:***REMOVED***React.ComponentProps<typeof***REMOVED***ResizablePrimitive.PanelGroup>)***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<ResizablePrimitive.PanelGroup
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"flex***REMOVED***h-full***REMOVED***w-full***REMOVED***data-[panel-group-direction=vertical]:flex-col",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***/>
)

const***REMOVED***ResizablePanel***REMOVED***=***REMOVED***ResizablePrimitive.Panel

const***REMOVED***ResizableHandle***REMOVED***=***REMOVED***({
***REMOVED******REMOVED***withHandle,
***REMOVED******REMOVED***className,
***REMOVED******REMOVED***...props
}:***REMOVED***React.ComponentProps<typeof***REMOVED***ResizablePrimitive.PanelResizeHandle>***REMOVED***&***REMOVED***{
***REMOVED******REMOVED***withHandle?:***REMOVED***boolean
})***REMOVED***=>***REMOVED***(
***REMOVED******REMOVED***<ResizablePrimitive.PanelResizeHandle
***REMOVED******REMOVED******REMOVED******REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"relative***REMOVED***flex***REMOVED***w-px***REMOVED***items-center***REMOVED***justify-center***REMOVED***bg-border***REMOVED***after:absolute***REMOVED***after:inset-y-0***REMOVED***after:left-1/2***REMOVED***after:w-1***REMOVED***after:-translate-x-1/2***REMOVED***focus-visible:outline-none***REMOVED***focus-visible:ring-1***REMOVED***focus-visible:ring-ring***REMOVED***focus-visible:ring-offset-1***REMOVED***data-[panel-group-direction=vertical]:h-px***REMOVED***data-[panel-group-direction=vertical]:w-full***REMOVED***data-[panel-group-direction=vertical]:after:left-0***REMOVED***data-[panel-group-direction=vertical]:after:h-1***REMOVED***data-[panel-group-direction=vertical]:after:w-full***REMOVED***data-[panel-group-direction=vertical]:after:-translate-y-1/2***REMOVED***data-[panel-group-direction=vertical]:after:translate-x-0***REMOVED***[&[data-panel-group-direction=vertical]>div]:rotate-90",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***{...props}
***REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED***{withHandle***REMOVED***&&***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="z-10***REMOVED***flex***REMOVED***h-4***REMOVED***w-3***REMOVED***items-center***REMOVED***justify-center***REMOVED***rounded-sm***REMOVED***border***REMOVED***bg-border">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<GripVertical***REMOVED***className="h-2.5***REMOVED***w-2.5"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED***</ResizablePrimitive.PanelResizeHandle>
)

export***REMOVED***{***REMOVED***ResizablePanelGroup,***REMOVED***ResizablePanel,***REMOVED***ResizableHandle***REMOVED***}
