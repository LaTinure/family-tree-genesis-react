
import { useState, useEffect } from 'react';
import { TreePine } from 'lucide-react';

export const AppLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-whatsapp-50 via-white to-whatsapp-100">
      <div className="text-center space-y-8">
        {/* Logo animé */}
        <div className="relative">
          <TreePine 
            className={`w-20 h-20 mx-auto text-whatsapp-600 transition-all duration-1000 ${
              isComplete ? 'scale-110 rotate-12' : 'animate-pulse'
            }`} 
          />
          <div className="absolute -inset-4 rounded-full border-2 border-whatsapp-200 animate-spin opacity-30"></div>
        </div>

        {/* Titre */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-whatsapp-700 animate-fade-in">
            Famille Connect
          </h1>
          <p className="text-whatsapp-600 animate-fade-in delay-300">
            Chargement de votre arbre généalogique...
          </p>
        </div>

        {/* Barre de progression */}
        <div className="w-64 mx-auto space-y-2">
          <div className="w-full bg-whatsapp-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm text-whatsapp-500 font-mono">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Messages de chargement */}
        <div className="text-sm text-whatsapp-600 h-4">
          {progress < 30 && "Initialisation..."}
          {progress >= 30 && progress < 60 && "Chargement des données..."}
          {progress >= 60 && progress < 90 && "Préparation de l'interface..."}
          {progress >= 90 && "Finalisation..."}
        </div>
      </div>
    </div>
  );
};
