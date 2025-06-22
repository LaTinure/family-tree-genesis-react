
import***REMOVED***React,***REMOVED***{***REMOVED***useState***REMOVED***}***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***useFormContext***REMOVED***}***REMOVED***from***REMOVED***'react-hook-form';
import***REMOVED***{***REMOVED***Input***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/input';
import***REMOVED***{***REMOVED***Label***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/label';

interface***REMOVED***ComboboxMembreProps***REMOVED***{
***REMOVED******REMOVED***name:***REMOVED***string;
***REMOVED******REMOVED***placeholder:***REMOVED***string;
}

export***REMOVED***const***REMOVED***ComboboxMembre:***REMOVED***React.FC<ComboboxMembreProps>***REMOVED***=***REMOVED***({***REMOVED***
***REMOVED******REMOVED***name,***REMOVED***
***REMOVED******REMOVED***placeholder***REMOVED***
})***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***register,***REMOVED***setValue,***REMOVED***watch***REMOVED***}***REMOVED***=***REMOVED***useFormContext();
***REMOVED******REMOVED***const***REMOVED***[inputValue,***REMOVED***setInputValue]***REMOVED***=***REMOVED***useState('');
***REMOVED******REMOVED***
***REMOVED******REMOVED***const***REMOVED***currentValue***REMOVED***=***REMOVED***watch(name);

***REMOVED******REMOVED***const***REMOVED***handleInputChange***REMOVED***=***REMOVED***(e:***REMOVED***React.ChangeEvent<HTMLInputElement>)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***value***REMOVED***=***REMOVED***e.target.value;
***REMOVED******REMOVED******REMOVED******REMOVED***setInputValue(value);
***REMOVED******REMOVED******REMOVED******REMOVED***setValue(name,***REMOVED***value);
***REMOVED******REMOVED***};

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="space-y-1">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Label***REMOVED***htmlFor={name}***REMOVED***className="text-sm***REMOVED***font-medium">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{name***REMOVED***===***REMOVED***'fatherName'***REMOVED***?***REMOVED***'Père'***REMOVED***:***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***name***REMOVED***===***REMOVED***'motherName'***REMOVED***?***REMOVED***'Mère'***REMOVED***:***REMOVED***'Conjoint(e)'}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Label>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Input
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id={name}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...register(name)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***value={currentValue***REMOVED***||***REMOVED***inputValue}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onChange={handleInputChange}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***placeholder={placeholder}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className="w-full"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED***);
};
