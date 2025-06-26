import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fonction pour formater l'affiliation/relationship_type
export const formatRelationshipType = (relationshipType: string): string => {
  const relationshipMap: Record<string, string> = {
    'fils': 'Fils',
    'fille': 'Fille',
    'père': 'Père',
    'mère': 'Mère',
    'cousin': 'Cousin',
    'cousine': 'Cousine',
    'tante': 'Tante',
    'oncle': 'Oncle',
    'neveu': 'Neveu',
    'nièce': 'Nièce',
    'petit-fils': 'Petit-fils',
    'petite-fille': 'Petite-fille',
    'grand-père': 'Grand-père',
    'grande-mère': 'Grand-mère',
    'époux': 'Époux',
    'épouse': 'Épouse',
    'patriarche': 'Patriarche',
    'matriarche': 'Matriarche',
    'conjoint': 'Conjoint',
    'beau-fils': 'Beau-fils',
    'belle-fille': 'Belle-fille',
    'beau-père': 'Beau-père',
    'belle-mère': 'Belle-mère',
    'frère': 'Frère',
    'sœur': 'Sœur'
  };

  return relationshipMap[relationshipType.toLowerCase()] || relationshipType;
};
