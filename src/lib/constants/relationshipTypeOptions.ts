
import { RelationshipType } from '@/types/family';

interface RelationshipOption {
  value: RelationshipType;
  label: string;
}

export const getRelationshipTypeOptions = (
  title: 'M.' | 'Mme',
  patriarchExists: boolean
): RelationshipOption[] => {
  const baseOptions: RelationshipOption[] = [
    { value: 'fils', label: title === 'M.' ? 'Fils' : 'Fille' },
    { value: 'conjoint', label: title === 'M.' ? 'Époux' : 'Épouse' },
    { value: 'frere', label: title === 'M.' ? 'Frère' : 'Sœur' },
    { value: 'pere', label: title === 'M.' ? 'Père' : 'Mère' },
    { value: 'grand-père', label: title === 'M.' ? 'Grand-père' : 'Grand-mère' },
    { value: 'petit-fils', label: title === 'M.' ? 'Petit-fils' : 'Petite-fille' },
    { value: 'oncle', label: title === 'M.' ? 'Oncle' : 'Tante' },
    { value: 'neveu', label: title === 'M.' ? 'Neveu' : 'Nièce' },
    { value: 'cousin', label: title === 'M.' ? 'Cousin' : 'Cousine' },
  ];

  if (!patriarchExists) {
    baseOptions.unshift({
      value: title === 'M.' ? 'patriarche' : 'matriarche',
      label: title === 'M.' ? 'Patriarche' : 'Matriarche'
    });
  }

  return baseOptions;
};
