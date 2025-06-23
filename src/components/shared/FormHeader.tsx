
interface***REMOVED***FormHeaderProps***REMOVED***{
***REMOVED******REMOVED***title:***REMOVED***string;
***REMOVED******REMOVED***subtitle?:***REMOVED***string;
}

export***REMOVED***const***REMOVED***FormHeader***REMOVED***=***REMOVED***({***REMOVED***title,***REMOVED***subtitle***REMOVED***}:***REMOVED***FormHeaderProps)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="text-center***REMOVED***mb-6">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<h1***REMOVED***className="text-2xl***REMOVED***font-bold***REMOVED***text-gray-800***REMOVED***mb-2">{title}</h1>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{subtitle***REMOVED***&&***REMOVED***<p***REMOVED***className="text-gray-600">{subtitle}</p>}
***REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED***);
};
