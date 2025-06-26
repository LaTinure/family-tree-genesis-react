
import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***"@/lib/utils";

interface***REMOVED***LoadingSpinnerProps***REMOVED***{
***REMOVED******REMOVED***size?:***REMOVED***'sm'***REMOVED***|***REMOVED***'md'***REMOVED***|***REMOVED***'lg';
***REMOVED******REMOVED***className?:***REMOVED***string;
}

export***REMOVED***const***REMOVED***LoadingSpinner***REMOVED***=***REMOVED***({***REMOVED***size***REMOVED***=***REMOVED***'md',***REMOVED***className***REMOVED***}:***REMOVED***LoadingSpinnerProps)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***sizeClasses***REMOVED***=***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***sm:***REMOVED***'w-4***REMOVED***h-4',
***REMOVED******REMOVED******REMOVED******REMOVED***md:***REMOVED***'w-6***REMOVED***h-6',
***REMOVED******REMOVED******REMOVED******REMOVED***lg:***REMOVED***'w-8***REMOVED***h-8'
***REMOVED******REMOVED***};

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className={cn("flex***REMOVED***items-center***REMOVED***justify-center",***REMOVED***className)}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"animate-spin***REMOVED***rounded-full***REMOVED***border-2***REMOVED***border-gray-300***REMOVED***border-t-primary",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***sizeClasses[size]
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED***);
};
