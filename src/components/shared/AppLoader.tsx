
import***REMOVED***{***REMOVED***useState,***REMOVED***useEffect***REMOVED***}***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***TreePine***REMOVED***}***REMOVED***from***REMOVED***'lucide-react';

export***REMOVED***const***REMOVED***AppLoader***REMOVED***=***REMOVED***({***REMOVED***onComplete***REMOVED***}:***REMOVED***{***REMOVED***onComplete:***REMOVED***()***REMOVED***=>***REMOVED***void***REMOVED***})***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***[progress,***REMOVED***setProgress]***REMOVED***=***REMOVED***useState(0);
***REMOVED******REMOVED***const***REMOVED***[isComplete,***REMOVED***setIsComplete]***REMOVED***=***REMOVED***useState(false);

***REMOVED******REMOVED***useEffect(()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***interval***REMOVED***=***REMOVED***setInterval(()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setProgress(prev***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(prev***REMOVED***>=***REMOVED***100)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***clearInterval(interval);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setIsComplete(true);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setTimeout(()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onComplete();
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},***REMOVED***500);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***100;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***prev***REMOVED***+***REMOVED***Math.random()***REMOVED*******REMOVED***15;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED***},***REMOVED***100);

***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***()***REMOVED***=>***REMOVED***clearInterval(interval);
***REMOVED******REMOVED***},***REMOVED***[onComplete]);

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="fixed***REMOVED***inset-0***REMOVED***z-50***REMOVED***flex***REMOVED***items-center***REMOVED***justify-center***REMOVED***bg-gradient-to-br***REMOVED***from-whatsapp-50***REMOVED***via-white***REMOVED***to-whatsapp-100">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="text-center***REMOVED***space-y-8">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{/****REMOVED***Logo***REMOVED***animé***REMOVED****/}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="relative">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<TreePine***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={`w-20***REMOVED***h-20***REMOVED***mx-auto***REMOVED***text-whatsapp-600***REMOVED***transition-all***REMOVED***duration-1000***REMOVED***${
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***isComplete***REMOVED***?***REMOVED***'scale-110***REMOVED***rotate-12'***REMOVED***:***REMOVED***'animate-pulse'
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}`}***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="absolute***REMOVED***-inset-4***REMOVED***rounded-full***REMOVED***border-2***REMOVED***border-whatsapp-200***REMOVED***animate-spin***REMOVED***opacity-30"></div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{/****REMOVED***Titre***REMOVED****/}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="space-y-2">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<h1***REMOVED***className="text-3xl***REMOVED***font-bold***REMOVED***text-whatsapp-700***REMOVED***animate-fade-in">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Famille***REMOVED***Connect
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</h1>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<p***REMOVED***className="text-whatsapp-600***REMOVED***animate-fade-in***REMOVED***delay-300">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Chargement***REMOVED***de***REMOVED***votre***REMOVED***arbre***REMOVED***généalogique...
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</p>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{/****REMOVED***Barre***REMOVED***de***REMOVED***progression***REMOVED****/}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="w-64***REMOVED***mx-auto***REMOVED***space-y-2">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="w-full***REMOVED***bg-whatsapp-200***REMOVED***rounded-full***REMOVED***h-2***REMOVED***overflow-hidden">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className="h-full***REMOVED***bg-gradient-to-r***REMOVED***from-whatsapp-500***REMOVED***to-whatsapp-600***REMOVED***transition-all***REMOVED***duration-300***REMOVED***ease-out"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***style={{***REMOVED***width:***REMOVED***`${progress}%`***REMOVED***}}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="text-sm***REMOVED***text-whatsapp-500***REMOVED***font-mono">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{Math.round(progress)}%
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{/****REMOVED***Messages***REMOVED***de***REMOVED***chargement***REMOVED****/}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="text-sm***REMOVED***text-whatsapp-600***REMOVED***h-4">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{progress***REMOVED***<***REMOVED***30***REMOVED***&&***REMOVED***"Initialisation..."}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{progress***REMOVED***>=***REMOVED***30***REMOVED***&&***REMOVED***progress***REMOVED***<***REMOVED***60***REMOVED***&&***REMOVED***"Chargement***REMOVED***des***REMOVED***données..."}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{progress***REMOVED***>=***REMOVED***60***REMOVED***&&***REMOVED***progress***REMOVED***<***REMOVED***90***REMOVED***&&***REMOVED***"Préparation***REMOVED***de***REMOVED***l'interface..."}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{progress***REMOVED***>=***REMOVED***90***REMOVED***&&***REMOVED***"Finalisation..."}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED***);
};
