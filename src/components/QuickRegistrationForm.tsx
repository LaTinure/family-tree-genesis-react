import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Shield, Mail, Phone, Loader2, ArrowLeft } from 'lucide-react';

interface QuickRegistrationFormProps {
  onRegistrationSuccess: (userData: { user_id: string; email: string; phone: string }) => void;
  onBack: () => void;
}

const countryCodes = [
  { code: '+33', country: 'France' },
  { code: '+225', country: 'Côte d\'Ivoire' },
  { code: '+32', country: 'Belgique' },
  { code: '+41', country: 'Suisse' },
  { code: '+1', country: 'Canada/États-Unis' },
  { code: '+212', country: 'Maroc' },
  { code: '+213', country: 'Algérie' },
  { code: '+216', country: 'Tunisie' },
  { code: '+221', country: 'Sénégal' },
  { code: '+237', country: 'Cameroun' },
  { code: '+243', country: 'RDC' },
  { code: '+261', country: 'Madagascar' },
  { code: '+250', country: 'Rwanda' },
  { code: '+255', country: 'Tanzanie' },
  { code: '+256', country: 'Ouganda' },
  { code: '+254', country: 'Kenya' },
  { code: '+234', country: 'Nigeria' },
  { code: '+233', country: 'Ghana' },
  { code: '+27', country: 'Afrique du Sud' },
  { code: '+20', country: 'Égypte' },
  { code: '+49', country: 'Allemagne' },
  { code: '+44', country: 'Royaume-Uni' },
  { code: '+39', country: 'Italie' },
  { code: '+34', country: 'Espagne' },
  { code: '+31', country: 'Pays-Bas' },
  { code: '+46', country: 'Suède' },
  { code: '+47', country: 'Norvège' },
  { code: '+45', country: 'Danemark' },
  { code: '+358', country: 'Finlande' },
  { code: '+48', country: 'Pologne' },
  { code: '+420', country: 'République tchèque' },
  { code: '+36', country: 'Hongrie' },
  { code: '+40', country: 'Roumanie' },
  { code: '+30', country: 'Grèce' },
  { code: '+351', country: 'Portugal' },
  { code: '+380', country: 'Ukraine' },
  { code: '+7', country: 'Russie' },
  { code: '+90', country: 'Turquie' },
  { code: '+81', country: 'Japon' },
  { code: '+82', country: 'Corée du Sud' },
  { code: '+86', country: 'Chine' },
  { code: '+91', country: 'Inde' },
  { code: '+65', country: 'Singapour' },
  { code: '+60', country: 'Malaisie' },
  { code: '+66', country: 'Thaïlande' },
  { code: '+84', country: 'Vietnam' },
  { code: '+61', country: 'Australie' },
  { code: '+64', country: 'Nouvelle-Zélande' },
  { code: '+55', country: 'Brésil' },
  { code: '+54', country: 'Argentine' },
  { code: '+56', country: 'Chili' },
  { code: '+57', country: 'Colombie' },
  { code: '+58', country: 'Venezuela' },
  { code: '+51', country: 'Pérou' },
  { code: '+593', country: 'Équateur' },
  { code: '+595', country: 'Paraguay' },
  { code: '+598', country: 'Uruguay' },
  { code: '+591', country: 'Bolivie' },
  { code: '+502', country: 'Guatemala' },
  { code: '+503', country: 'El Salvador' },
  { code: '+504', country: 'Honduras' },
  { code: '+505', country: 'Nicaragua' },
  { code: '+506', country: 'Costa Rica' },
  { code: '+507', country: 'Panama' },
  { code: '+52', country: 'Mexique' }
];

export default function QuickRegistrationForm({ onRegistrationSuccess, onBack }: QuickRegistrationFormProps) {
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+33');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !phone) {
      toast({
        title: 'Champs requis',
        description: 'Veuillez remplir tous les champs.',
        variant: 'destructive',
      });
      return;
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: 'Email invalide',
        description: 'Veuillez saisir une adresse email valide.',
        variant: 'destructive',
      });
      return;
    }

    // Validation téléphone basique
    const phoneRegex = /^[0-9]{8,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      toast({
        title: 'Numéro invalide',
        description: 'Veuillez saisir un numéro de téléphone valide (8-15 chiffres).',
        variant: 'destructive',
      });
      return;
    }

        setIsLoading(true);

    try {
      // Créer un utilisateur temporaire ou enregistrer les informations
      const fullPhone = `${countryCode}${phone.replace(/\s/g, '')}`;

      // Générer un user_id temporaire (UUID)
      const user_id = crypto.randomUUID();

      // Créer les données utilisateur temporaires
      const userData = {
        user_id,
        email,
        phone: fullPhone
      };

      // Stocker les informations en localStorage pour la session
      const sessionData = {
        ...userData,
        registration_step: 'quick_registration'
      };

      localStorage.setItem('temp_user_data', JSON.stringify(sessionData));

      toast({
        title: 'Inscription réussie',
        description: 'Vos informations ont été enregistrées. Redirection vers le paiement...',
      });

      // Appeler le callback avec les données utilisateur
      onRegistrationSuccess(userData);

    } catch (error: any) {
      console.error('Erreur inscription:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue lors de l\'inscription.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 via-green-50 to-emerald-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-whatsapp-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-whatsapp-700 mb-2">Inscription Rapide</h1>
          <p className="text-gray-600">
            Créez votre identifiant sécurisé pour accéder au paiement
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-gray-900">
              Vos informations de contact
            </CardTitle>
            <CardDescription>
              Ces informations sont nécessaires pour créer votre dynastie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Adresse email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {/* Téléphone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Numéro de téléphone
                </Label>
                <div className="flex space-x-2">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="6 12 34 56 78"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Bouton de soumission */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 hover:from-whatsapp-600 hover:to-whatsapp-700 text-white py-3 text-lg font-semibold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Génération de votre ID sécurisé...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Générer mon ID sécurisé
                  </>
                )}
              </Button>

              {/* Note sécurité */}
              <div className="text-xs text-gray-500 text-center">
                Vos informations sont sécurisées et ne seront utilisées que pour votre dynastie.
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-whatsapp-600 hover:text-whatsapp-700"
            disabled={isLoading}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>
      </div>
    </div>
  );
}
