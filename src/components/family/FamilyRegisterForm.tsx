import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Eye, EyeOff, Upload, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ROUTES } from '@/lib/constants/routes';
import { familyRegisterSchema, FamilyRegisterFormData } from '@/lib/validations/familySchema';
import { relationshipTypeOptions } from '@/lib/constants/relationshipTypeOptions';
import { supabase } from '@/integrations/supabase/client';

interface FamilyRegisterFormProps {
  onSuccess?: () => void;
}

// Options pour les listes de sélection
const professionOptions = [
  'Fonction',
  'Retraite',
  'Etude'
];

const situationOptions = [
  'En couple',
  'Célibataire',
  'Veuf(ve)'
];

export const FamilyRegisterForm = ({ onSuccess }: FamilyRegisterFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<FamilyRegisterFormData>({
    resolver: zodResolver(familyRegisterSchema),
    defaultValues: {
      civilite: 'M.',
      relationship_type: 'patriarche',
      role: 'Membre'
    }
  });

  const watchedCivilite = watch('civilite');

  // Fonction pour uploader une photo
  const uploadPhoto = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Erreur upload:', uploadError);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Erreur upload photo:', error);
      return null;
    }
  };

  // Fonction pour gérer le changement de photo
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fonction d'inscription simplifiée
  const signUp = async (email: string, password: string, profileData: any) => {
    try {
      // Créer l'utilisateur dans Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        return { error: authError };
      }

      if (!authData.user) {
        return { error: { message: 'Erreur lors de la création du compte' } };
      }

      // Créer le profil dans la table profiles
      const profileDataToInsert = {
        id: authData.user.id,
        user_id: authData.user.id,
        email: email,
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        phone: profileData.phone,
        profession: profileData.profession,
        current_location: profileData.current_location,
        birth_place: profileData.birth_place,
        birth_date: profileData.birth_date,
        photo_url: profileData.photo_url,
        civilite: profileData.civilite,
        relationship_type: profileData.relationship_type,
        situation: profileData.situation,
        role: profileData.role,
        is_admin: profileData.role === 'Administrateur'
      };

      const { error: profileError } = await supabase
        .from('profiles')
        .insert(profileDataToInsert)
        .select()
        .maybeSingle();

      if (profileError) {
        return { error: profileError };
      }

      return { data: authData.user, error: null };

    } catch (error) {
      console.error('Erreur inscription:', error);
      return { error: { message: 'Erreur inattendue lors de l\'inscription' } };
    }
  };

  // Fonction de soumission du formulaire
  const onSubmit = async (data: FamilyRegisterFormData) => {
    setLoading(true);

    try {
      let photoUrl = null;
      if (photoFile) {
        photoUrl = await uploadPhoto(photoFile);
      }

      const { error } = await signUp(data.email, data.password, {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        profession: data.profession,
        current_location: data.current_location,
        birth_place: data.birth_place,
        birth_date: data.birth_date,
        photo_url: photoUrl,
        civilite: data.civilite,
        relationship_type: data.relationship_type,
        situation: data.situation,
        role: data.role,
        is_admin: data.role === 'Administrateur'
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: 'Email déjà enregistré',
            description: 'Cette adresse email est déjà utilisée. Veuillez vous connecter ou utiliser une autre adresse.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Erreur d\'inscription',
            description: error.message,
            variant: 'destructive',
          });
        }
        return;
      }

      toast({
        title: 'Inscription réussie',
        description: 'Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.',
      });

      if (onSuccess) {
        onSuccess();
      } else {
        navigate(ROUTES.HOME);
      }
    } catch (error) {
      console.error('Erreur générale:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'inscription',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">Créer votre profil familial</h3>
        <p className="text-sm text-gray-600 mt-1">
          Remplissez les informations pour rejoindre votre famille
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Photo de profil */}
        <div className="space-y-2">
          <Label>Photo de profil (optionnel)</Label>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Aperçu"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                id="photo-upload"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('photo-upload')?.click()}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choisir une photo
              </Button>
            </div>
          </div>
        </div>

        {/* Civilité */}
        <div className="space-y-2">
          <Label htmlFor="civilite">Civilité *</Label>
          <Select
            value={watchedCivilite}
            onValueChange={(value) => setValue('civilite', value as 'M.' | 'Mme')}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M.">Monsieur</SelectItem>
              <SelectItem value="Mme">Madame</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Type de relation */}
        <div className="space-y-2">
          <Label htmlFor="relationship_type">Type de relation *</Label>
          <Select
            onValueChange={(value) => setValue('relationship_type', value as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner votre relation" />
            </SelectTrigger>
            <SelectContent>
              {relationshipTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Nom et prénom */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">Prénom *</Label>
            <Input
              id="first_name"
              {...register('first_name')}
              placeholder="Votre prénom"
              className="rounded-lg"
            />
            {errors.first_name && (
              <p className="text-sm text-red-600">{errors.first_name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Nom *</Label>
            <Input
              id="last_name"
              {...register('last_name')}
              placeholder="Votre nom de famille"
              className="rounded-lg"
            />
            {errors.last_name && (
              <p className="text-sm text-red-600">{errors.last_name.message}</p>
            )}
          </div>
        </div>

        {/* Email et mot de passe */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="votre@email.com"
              className="rounded-lg"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Mot de passe sécurisé"
                className="rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
        </div>

        {/* Date de naissance et lieu de naissance */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="birth_date">Date de naissance</Label>
            <Input
              id="birth_date"
              type="date"
              {...register('birth_date')}
              className="rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birth_place">Lieu de naissance</Label>
            <Input
              id="birth_place"
              {...register('birth_place')}
              placeholder="Ville, Pays"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Résidence actuelle et situation professionnelle */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="current_location">Résidence actuelle</Label>
            <Input
              id="current_location"
              {...register('current_location')}
              placeholder="Ville actuelle"
              className="rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profession">Sit. professionnelle</Label>
            <Select
              onValueChange={(value) => setValue('profession', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une situation" />
              </SelectTrigger>
              <SelectContent>
                {professionOptions.map((profession) => (
                  <SelectItem key={profession} value={profession}>
                    {profession}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Téléphone et situation matrimoniale */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="+33 6 12 34 56 78"
              className="rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="situation">Situation Matrimoniale</Label>
            <Select
              onValueChange={(value) => setValue('situation', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une situation" />
              </SelectTrigger>
              <SelectContent>
                {situationOptions.map((situation) => (
                  <SelectItem key={situation} value={situation}>
                    {situation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 hover:from-whatsapp-600 hover:to-whatsapp-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Inscription en cours...
            </>
          ) : (
            'Créer mon profil'
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-gray-600">
        <p>
          En créant votre compte, vous acceptez nos conditions d'utilisation.
        </p>
      </div>
    </div>
  );
};
