
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ComboboxMembreProps {
  name: string;
  placeholder: string;
}

export const ComboboxMembre: React.FC<ComboboxMembreProps> = ({ 
  name, 
  placeholder 
}) => {
  const { register, setValue, watch } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  
  const currentValue = watch(name);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setValue(name, value);
  };

  return (
    <div className="space-y-1">
      <Label htmlFor={name} className="text-sm font-medium">
        {name === 'fatherName' ? 'Père' : 
         name === 'motherName' ? 'Mère' : 'Conjoint(e)'}
      </Label>
      <Input
        id={name}
        {...register(name)}
        value={currentValue || inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full"
      />
    </div>
  );
};
