
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ZoomIn, ZoomOut, RotateCcw, Search, Crown, Phone, MapPin } from 'lucide-react';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { FamilyMember } from '@/types/family';
import { ImprovedFamilyTreeLayout } from './ImprovedFamilyTreeLayout';

export const EnhancedFamilyTree = () => {
  return (
    <div className="h-full">
      <ImprovedFamilyTreeLayout />
    </div>
  );
};
