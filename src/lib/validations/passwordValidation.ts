import***REMOVED***{***REMOVED***z***REMOVED***}***REMOVED***from***REMOVED***'zod';

//***REMOVED***Liste***REMOVED***de***REMOVED***mots***REMOVED***de***REMOVED***passe***REMOVED***courants***REMOVED***à***REMOVED***bloquer
export***REMOVED***const***REMOVED***commonPasswords***REMOVED***=***REMOVED***[
***REMOVED******REMOVED***'password',***REMOVED***'password123',***REMOVED***'123456',***REMOVED***'123456789',***REMOVED***'qwerty',***REMOVED***'admin',***REMOVED***'letmein',***REMOVED***'welcome',***REMOVED***'monkey',***REMOVED***'abc123',
***REMOVED******REMOVED***'111111',***REMOVED***'123123',***REMOVED***'iloveyou',***REMOVED***'000000',***REMOVED***'1234',***REMOVED***'azerty',***REMOVED***'motdepasse',***REMOVED***'passw0rd',***REMOVED***'admin123',***REMOVED***'root'
];

//***REMOVED***Regex***REMOVED***de***REMOVED***complexité***REMOVED***stricte***REMOVED***:
//***REMOVED***-***REMOVED***12***REMOVED***caractères***REMOVED***minimum
//***REMOVED***-***REMOVED***au***REMOVED***moins***REMOVED***1***REMOVED***minuscule,***REMOVED***1***REMOVED***majuscule,***REMOVED***1***REMOVED***chiffre,***REMOVED***1***REMOVED***symbole
export***REMOVED***const***REMOVED***passwordComplexityRegex***REMOVED***=***REMOVED***/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

export***REMOVED***const***REMOVED***passwordValidation***REMOVED***=***REMOVED***z.string()
***REMOVED******REMOVED***.min(6,***REMOVED***'Le***REMOVED***mot***REMOVED***de***REMOVED***passe***REMOVED***doit***REMOVED***contenir***REMOVED***au***REMOVED***moins***REMOVED***6***REMOVED***caractères.')
***REMOVED******REMOVED***.regex(passwordComplexityRegex,***REMOVED***'Le***REMOVED***mot***REMOVED***de***REMOVED***passe***REMOVED***doit***REMOVED***contenir***REMOVED***au***REMOVED***moins***REMOVED***une***REMOVED***minuscule,***REMOVED***une***REMOVED***majuscule,***REMOVED***un***REMOVED***chiffre***REMOVED***et***REMOVED***un***REMOVED***symbole.')
***REMOVED******REMOVED***.refine((val)***REMOVED***=>***REMOVED***!commonPasswords.includes(val.toLowerCase()),***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***message:***REMOVED***'Ce***REMOVED***mot***REMOVED***de***REMOVED***passe***REMOVED***est***REMOVED***trop***REMOVED***courant***REMOVED***ou***REMOVED***facilement***REMOVED***devinable.'
***REMOVED******REMOVED***});
