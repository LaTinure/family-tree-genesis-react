import***REMOVED***{***REMOVED***TreePine,***REMOVED***Star***REMOVED***}***REMOVED***from***REMOVED***'lucide-react';

export***REMOVED***function***REMOVED***FormHeader({***REMOVED***title,***REMOVED***subtitle***REMOVED***}:***REMOVED***{***REMOVED***title:***REMOVED***string,***REMOVED***subtitle?:***REMOVED***string***REMOVED***})***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="text-center***REMOVED***mb-8">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<TreePine***REMOVED***className="w-12***REMOVED***h-12***REMOVED***mx-auto***REMOVED***mb-4***REMOVED***text-green-600***REMOVED***animate-pulse"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<h2***REMOVED***className="text-2xl***REMOVED***font-bold***REMOVED***mb-2***REMOVED***text-green-700***REMOVED***inline-flex***REMOVED***items-center***REMOVED***justify-center">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{title}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{/****REMOVED******REMOVED***<sup***REMOVED***className="ml-2***REMOVED***align-super">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Star***REMOVED***className="w-10***REMOVED***h-10***REMOVED***text-yellow-400***REMOVED***drop-shadow-lg"***REMOVED***style={{***REMOVED***filter:***REMOVED***'brightness(1.5)'***REMOVED***}}***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</sup>***REMOVED****/}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</h2>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{subtitle***REMOVED***&&***REMOVED***<p***REMOVED***className="text-muted-foreground">{subtitle}</p>}
***REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED***);
}
