
import***REMOVED***{***REMOVED***useState***REMOVED***}***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***User***REMOVED***}***REMOVED***from***REMOVED***'lucide-react';
import***REMOVED***{***REMOVED***cn***REMOVED***}***REMOVED***from***REMOVED***'@/lib/utils';

interface***REMOVED***AvatarProps***REMOVED***{
***REMOVED******REMOVED***src?:***REMOVED***string;
***REMOVED******REMOVED***alt?:***REMOVED***string;
***REMOVED******REMOVED***size?:***REMOVED***'sm'***REMOVED***|***REMOVED***'md'***REMOVED***|***REMOVED***'lg'***REMOVED***|***REMOVED***'xl';
***REMOVED******REMOVED***className?:***REMOVED***string;
***REMOVED******REMOVED***fallback?:***REMOVED***string;
}

export***REMOVED***const***REMOVED***Avatar***REMOVED***=***REMOVED***({***REMOVED***src,***REMOVED***alt,***REMOVED***size***REMOVED***=***REMOVED***'md',***REMOVED***className,***REMOVED***fallback***REMOVED***}:***REMOVED***AvatarProps)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***[imageError,***REMOVED***setImageError]***REMOVED***=***REMOVED***useState(false);

***REMOVED******REMOVED***const***REMOVED***sizeClasses***REMOVED***=***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***sm:***REMOVED***'w-8***REMOVED***h-8',
***REMOVED******REMOVED******REMOVED******REMOVED***md:***REMOVED***'w-12***REMOVED***h-12',
***REMOVED******REMOVED******REMOVED******REMOVED***lg:***REMOVED***'w-16***REMOVED***h-16',
***REMOVED******REMOVED******REMOVED******REMOVED***xl:***REMOVED***'w-24***REMOVED***h-24'
***REMOVED******REMOVED***};

***REMOVED******REMOVED***const***REMOVED***iconSizes***REMOVED***=***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***sm:***REMOVED***'w-4***REMOVED***h-4',
***REMOVED******REMOVED******REMOVED******REMOVED***md:***REMOVED***'w-6***REMOVED***h-6',
***REMOVED******REMOVED******REMOVED******REMOVED***lg:***REMOVED***'w-8***REMOVED***h-8',
***REMOVED******REMOVED******REMOVED******REMOVED***xl:***REMOVED***'w-12***REMOVED***h-12'
***REMOVED******REMOVED***};

***REMOVED******REMOVED***const***REMOVED***textSizes***REMOVED***=***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***sm:***REMOVED***'text-xs',
***REMOVED******REMOVED******REMOVED******REMOVED***md:***REMOVED***'text-sm',
***REMOVED******REMOVED******REMOVED******REMOVED***lg:***REMOVED***'text-base',
***REMOVED******REMOVED******REMOVED******REMOVED***xl:***REMOVED***'text-xl'
***REMOVED******REMOVED***};

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'relative***REMOVED***rounded-full***REMOVED***overflow-hidden***REMOVED***bg-gradient-to-br***REMOVED***from-whatsapp-100***REMOVED***to-whatsapp-200***REMOVED***flex***REMOVED***items-center***REMOVED***justify-center***REMOVED***border-2***REMOVED***border-white***REMOVED***shadow-md',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***sizeClasses[size],
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className
***REMOVED******REMOVED******REMOVED******REMOVED***)}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{src***REMOVED***&&***REMOVED***!imageError***REMOVED***?***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<img
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***src={src}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***alt={alt***REMOVED***||***REMOVED***'Avatar'}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className="w-full***REMOVED***h-full***REMOVED***object-cover"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onError={()***REMOVED***=>***REMOVED***setImageError(true)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)***REMOVED***:***REMOVED***fallback***REMOVED***?***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className={cn(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'flex***REMOVED***items-center***REMOVED***justify-center***REMOVED***w-full***REMOVED***h-full***REMOVED***bg-gradient-to-br***REMOVED***from-whatsapp-400***REMOVED***to-whatsapp-500***REMOVED***text-white***REMOVED***font-semibold',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***textSizes[size]
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{fallback.toUpperCase()}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)***REMOVED***:***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<User***REMOVED***className={cn('text-whatsapp-600',***REMOVED***iconSizes[size])}***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED***);
};
