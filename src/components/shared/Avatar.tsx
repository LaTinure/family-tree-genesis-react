
import***REMOVED***React***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***'@/lib/utils';

interface***REMOVED***AvatarProps***REMOVED***{
***REMOVED******REMOVED***src?:***REMOVED***string;
***REMOVED******REMOVED***fallback:***REMOVED***string;
***REMOVED******REMOVED***size?:***REMOVED***'sm'***REMOVED***|***REMOVED***'md'***REMOVED***|***REMOVED***'lg'***REMOVED***|***REMOVED***'xl';
***REMOVED******REMOVED***className?:***REMOVED***string;
}

const***REMOVED***sizeClasses***REMOVED***=***REMOVED***{
***REMOVED******REMOVED***sm:***REMOVED***'w-8***REMOVED***h-8***REMOVED***text-xs',
***REMOVED******REMOVED***md:***REMOVED***'w-12***REMOVED***h-12***REMOVED***text-sm',
***REMOVED******REMOVED***lg:***REMOVED***'w-16***REMOVED***h-16***REMOVED***text-lg',
***REMOVED******REMOVED***xl:***REMOVED***'w-24***REMOVED***h-24***REMOVED***text-xl'
};

export***REMOVED***const***REMOVED***Avatar:***REMOVED***React.FC<AvatarProps>***REMOVED***=***REMOVED***({***REMOVED***
***REMOVED******REMOVED***src,***REMOVED***
***REMOVED******REMOVED***fallback,***REMOVED***
***REMOVED******REMOVED***size***REMOVED***=***REMOVED***'md',***REMOVED***
***REMOVED******REMOVED***className***REMOVED***
})***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'rounded-full***REMOVED***bg-gradient-to-br***REMOVED***from-blue-400***REMOVED***to-blue-600***REMOVED***flex***REMOVED***items-center***REMOVED***justify-center***REMOVED***text-white***REMOVED***font-semibold***REMOVED***border-2***REMOVED***border-white***REMOVED***shadow-md',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***sizeClasses[size],
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{src***REMOVED***?***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<img***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***src={src}***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***alt="Avatar"***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className="w-full***REMOVED***h-full***REMOVED***rounded-full***REMOVED***object-cover"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)***REMOVED***:***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<span>{fallback}</span>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED***);
};
