import***REMOVED*******REMOVED***as***REMOVED***React***REMOVED***from***REMOVED***"react"

const***REMOVED***MOBILE_BREAKPOINT***REMOVED***=***REMOVED***768

export***REMOVED***function***REMOVED***useIsMobile()***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***[isMobile,***REMOVED***setIsMobile]***REMOVED***=***REMOVED***React.useState<boolean***REMOVED***|***REMOVED***undefined>(undefined)

***REMOVED******REMOVED***React.useEffect(()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***mql***REMOVED***=***REMOVED***window.matchMedia(`(max-width:***REMOVED***${MOBILE_BREAKPOINT***REMOVED***-***REMOVED***1}px)`)
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***onChange***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setIsMobile(window.innerWidth***REMOVED***<***REMOVED***MOBILE_BREAKPOINT)
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***mql.addEventListener("change",***REMOVED***onChange)
***REMOVED******REMOVED******REMOVED******REMOVED***setIsMobile(window.innerWidth***REMOVED***<***REMOVED***MOBILE_BREAKPOINT)
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***()***REMOVED***=>***REMOVED***mql.removeEventListener("change",***REMOVED***onChange)
***REMOVED******REMOVED***},***REMOVED***[])

***REMOVED******REMOVED***return***REMOVED***!!isMobile
}
