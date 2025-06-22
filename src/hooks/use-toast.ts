import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"

import***REMOVED***type***REMOVED***{
***REMOVED******REMOVED***ToastActionElement,
***REMOVED******REMOVED***ToastProps,
}***REMOVED***from***REMOVED***"@/components/ui/toast"

const***REMOVED***TOAST_LIMIT***REMOVED***=***REMOVED***1
const***REMOVED***TOAST_REMOVE_DELAY***REMOVED***=***REMOVED***1000000

type***REMOVED***ToasterToast***REMOVED***=***REMOVED***ToastProps***REMOVED***&***REMOVED***{
***REMOVED******REMOVED***id:***REMOVED***string
***REMOVED******REMOVED***title?:***REMOVED***React.ReactNode
***REMOVED******REMOVED***description?:***REMOVED***React.ReactNode
***REMOVED******REMOVED***action?:***REMOVED***ToastActionElement
}

const***REMOVED***actionTypes***REMOVED***=***REMOVED***{
***REMOVED******REMOVED***ADD_TOAST:***REMOVED***"ADD_TOAST",
***REMOVED******REMOVED***UPDATE_TOAST:***REMOVED***"UPDATE_TOAST",
***REMOVED******REMOVED***DISMISS_TOAST:***REMOVED***"DISMISS_TOAST",
***REMOVED******REMOVED***REMOVE_TOAST:***REMOVED***"REMOVE_TOAST",
}***REMOVED***as***REMOVED***const

let***REMOVED***count***REMOVED***=***REMOVED***0

function***REMOVED***genId()***REMOVED***{
***REMOVED******REMOVED***count***REMOVED***=***REMOVED***(count***REMOVED***+***REMOVED***1)***REMOVED***%***REMOVED***Number.MAX_SAFE_INTEGER
***REMOVED******REMOVED***return***REMOVED***count.toString()
}

type***REMOVED***ActionType***REMOVED***=***REMOVED***typeof***REMOVED***actionTypes

type***REMOVED***Action***REMOVED***=
***REMOVED******REMOVED***|***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***type:***REMOVED***ActionType["ADD_TOAST"]
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toast:***REMOVED***ToasterToast
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***|***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***type:***REMOVED***ActionType["UPDATE_TOAST"]
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toast:***REMOVED***Partial<ToasterToast>
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***|***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***type:***REMOVED***ActionType["DISMISS_TOAST"]
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toastId?:***REMOVED***ToasterToast["id"]
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***|***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***type:***REMOVED***ActionType["REMOVE_TOAST"]
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toastId?:***REMOVED***ToasterToast["id"]
***REMOVED******REMOVED******REMOVED******REMOVED***}

interface***REMOVED***State***REMOVED***{
***REMOVED******REMOVED***toasts:***REMOVED***ToasterToast[]
}

const***REMOVED***toastTimeouts***REMOVED***=***REMOVED***new***REMOVED***Map<string,***REMOVED***ReturnType<typeof***REMOVED***setTimeout>>()

const***REMOVED***addToRemoveQueue***REMOVED***=***REMOVED***(toastId:***REMOVED***string)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***if***REMOVED***(toastTimeouts.has(toastId))***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return
***REMOVED******REMOVED***}

***REMOVED******REMOVED***const***REMOVED***timeout***REMOVED***=***REMOVED***setTimeout(()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***toastTimeouts.delete(toastId)
***REMOVED******REMOVED******REMOVED******REMOVED***dispatch({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***type:***REMOVED***"REMOVE_TOAST",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toastId:***REMOVED***toastId,
***REMOVED******REMOVED******REMOVED******REMOVED***})
***REMOVED******REMOVED***},***REMOVED***TOAST_REMOVE_DELAY)

***REMOVED******REMOVED***toastTimeouts.set(toastId,***REMOVED***timeout)
}

export***REMOVED***const***REMOVED***reducer***REMOVED***=***REMOVED***(state:***REMOVED***State,***REMOVED***action:***REMOVED***Action):***REMOVED***State***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***switch***REMOVED***(action.type)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***case***REMOVED***"ADD_TOAST":
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...state,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toasts:***REMOVED***[action.toast,***REMOVED***...state.toasts].slice(0,***REMOVED***TOAST_LIMIT),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***case***REMOVED***"UPDATE_TOAST":
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...state,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toasts:***REMOVED***state.toasts.map((t)***REMOVED***=>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***t.id***REMOVED***===***REMOVED***action.toast.id***REMOVED***?***REMOVED***{***REMOVED***...t,***REMOVED***...action.toast***REMOVED***}***REMOVED***:***REMOVED***t
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***case***REMOVED***"DISMISS_TOAST":***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***toastId***REMOVED***}***REMOVED***=***REMOVED***action

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***!***REMOVED***Side***REMOVED***effects***REMOVED***!***REMOVED***-***REMOVED***This***REMOVED***could***REMOVED***be***REMOVED***extracted***REMOVED***into***REMOVED***a***REMOVED***dismissToast()***REMOVED***action,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***but***REMOVED***I'll***REMOVED***keep***REMOVED***it***REMOVED***here***REMOVED***for***REMOVED***simplicity
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(toastId)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***addToRemoveQueue(toastId)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***else***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***state.toasts.forEach((toast)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***addToRemoveQueue(toast.id)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***})
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...state,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toasts:***REMOVED***state.toasts.map((t)***REMOVED***=>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***t.id***REMOVED***===***REMOVED***toastId***REMOVED***||***REMOVED***toastId***REMOVED***===***REMOVED***undefined
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***?***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...t,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***open:***REMOVED***false,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***:***REMOVED***t
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***case***REMOVED***"REMOVE_TOAST":
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(action.toastId***REMOVED***===***REMOVED***undefined)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...state,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toasts:***REMOVED***[],
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...state,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toasts:***REMOVED***state.toasts.filter((t)***REMOVED***=>***REMOVED***t.id***REMOVED***!==***REMOVED***action.toastId),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***}
}

const***REMOVED***listeners:***REMOVED***Array<(state:***REMOVED***State)***REMOVED***=>***REMOVED***void>***REMOVED***=***REMOVED***[]

let***REMOVED***memoryState:***REMOVED***State***REMOVED***=***REMOVED***{***REMOVED***toasts:***REMOVED***[]***REMOVED***}

function***REMOVED***dispatch(action:***REMOVED***Action)***REMOVED***{
***REMOVED******REMOVED***memoryState***REMOVED***=***REMOVED***reducer(memoryState,***REMOVED***action)
***REMOVED******REMOVED***listeners.forEach((listener)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***listener(memoryState)
***REMOVED******REMOVED***})
}

type***REMOVED***Toast***REMOVED***=***REMOVED***Omit<ToasterToast,***REMOVED***"id">

function***REMOVED***toast({***REMOVED***...props***REMOVED***}:***REMOVED***Toast)***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***id***REMOVED***=***REMOVED***genId()

***REMOVED******REMOVED***const***REMOVED***update***REMOVED***=***REMOVED***(props:***REMOVED***ToasterToast)***REMOVED***=>
***REMOVED******REMOVED******REMOVED******REMOVED***dispatch({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***type:***REMOVED***"UPDATE_TOAST",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toast:***REMOVED***{***REMOVED***...props,***REMOVED***id***REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***})
***REMOVED******REMOVED***const***REMOVED***dismiss***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***dispatch({***REMOVED***type:***REMOVED***"DISMISS_TOAST",***REMOVED***toastId:***REMOVED***id***REMOVED***})

***REMOVED******REMOVED***dispatch({
***REMOVED******REMOVED******REMOVED******REMOVED***type:***REMOVED***"ADD_TOAST",
***REMOVED******REMOVED******REMOVED******REMOVED***toast:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***...props,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***open:***REMOVED***true,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onOpenChange:***REMOVED***(open)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!open)***REMOVED***dismiss()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED***})

***REMOVED******REMOVED***return***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***id:***REMOVED***id,
***REMOVED******REMOVED******REMOVED******REMOVED***dismiss,
***REMOVED******REMOVED******REMOVED******REMOVED***update,
***REMOVED******REMOVED***}
}

function***REMOVED***useToast()***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***[state,***REMOVED***setState]***REMOVED***=***REMOVED***React.useState<State>(memoryState)

***REMOVED******REMOVED***React.useEffect(()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***listeners.push(setState)
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***index***REMOVED***=***REMOVED***listeners.indexOf(setState)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(index***REMOVED***>***REMOVED***-1)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***listeners.splice(index,***REMOVED***1)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***},***REMOVED***[state])

***REMOVED******REMOVED***return***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***...state,
***REMOVED******REMOVED******REMOVED******REMOVED***toast,
***REMOVED******REMOVED******REMOVED******REMOVED***dismiss:***REMOVED***(toastId?:***REMOVED***string)***REMOVED***=>***REMOVED***dispatch({***REMOVED***type:***REMOVED***"DISMISS_TOAST",***REMOVED***toastId***REMOVED***}),
***REMOVED******REMOVED***}
}

export***REMOVED***{***REMOVED***useToast,***REMOVED***toast***REMOVED***}
