
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TreePine } from 'lucide-react';
import { ImprovedFamilyTreeLayout } from './ImprovedFamilyTreeLayout';

export const FamilyTree = () => {
  return (
    <Card className="h-full border-whatsapp-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-whatsapp-700">
          <TreePine className="w-5 h-5" />
          Arbre Familial Interactif
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 h-full">
        <ImprovedFamilyTreeLayout />
      </CardContent>
    </Card>
  );
};
