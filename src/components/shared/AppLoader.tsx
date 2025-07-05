
import React from 'react';
import { Loader2, TreePine } from 'lucide-react';

interface AppLoaderProps {
  onComplete?: () => void;
}

export const AppLoader: React.FC<AppLoaderProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 via-green-50 to-emerald-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <TreePine className="w-16 h-16 text-whatsapp-600 mx-auto mb-4 animate-pulse" />
          <h1 className="text-2xl font-bold text-whatsapp-700 mb-2">Famille Connect</h1>
          <p className="text-gray-600">Chargement de votre espace familial...</p>
        </div>
        <Loader2 className="w-8 h-8 text-whatsapp-600 mx-auto animate-spin" />
      </div>
    </div>
  );
};
