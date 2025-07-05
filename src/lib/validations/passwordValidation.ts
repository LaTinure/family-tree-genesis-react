import { z } from 'zod';

// Liste de mots de passe courants à bloquer
export const commonPasswords = [
  'password', 'password123', '123456', '123456789', 'qwerty', 'admin', 'letmein', 'welcome', 'monkey', 'abc123',
  '111111', '123123', 'iloveyou', '000000', '1234', 'azerty', 'motdepasse', 'passw0rd', 'admin123', 'root'
];

// Regex de complexité stricte :
// - 12 caractères minimum
// - au moins 1 minuscule, 1 majuscule, 1 chiffre, 1 symbole
export const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

export const passwordValidation = z.string()
  .min(6, 'Le mot de passe doit contenir au moins 6 caractères.')
  .regex(passwordComplexityRegex, 'Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un symbole.')
  .refine((val) => !commonPasswords.includes(val.toLowerCase()), {
    message: 'Ce mot de passe est trop courant ou facilement devinable.'
  });
