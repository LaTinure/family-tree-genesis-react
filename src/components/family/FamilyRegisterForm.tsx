
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Eye, EyeOff, Upload, Camera, Crown, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ROUTES } from '@/lib/constants/routes';
import { familyRegisterSchema, FamilyRegisterFormData, userRoles } from '@/lib/validations/familySchema';
import { supabase } from '@/integrations/supabase/client';

interface InvitationData {
  id: string;
  token: string;
  dynasty_id: string;
  dynasty_name: string;
  user_role: string;
  expires_at: string;
  used: boolean;
}

interface FamilyRegisterFormProps {
  onSuccess?: () => void;
  invitationData?: InvitationData | null;
  mode?: string | null;
}

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

export const FamilyRegisterForm = ({ onSuccess, invitationData, mode }: FamilyRegisterFormProps) => {
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
      user_role: mode === 'create' ? 'Patriarche' : (invitationData?.user_role as any || 'Membre')
    }
  });

  // Préremplir les champs si une invitation est présente
  useEffect(() => {
    if (invitationData) {
      setValue('user_role', invitationData.user_role as any);
      // Ajuster la civilité selon le rôle si nécessaire
      if (invitationData.user_role === 'Matriarche') {
        setValue('civilite', 'Mme');
      } else if (invitationData.user_role === 'Patriarche') {
        setValue('civilite', 'M.');
      }
    }
  }, [invitationData, setValue]);

  const watchedCivilite = watch('civilite');
  const watchedUserRole = watch('user_role');

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

  const signUp = async (email: string, password: string, profileData: any) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (authError) {
        return { error: authError };
      }

      if (!authData.user) {
        return { error: { message: 'Erreur lors de la création du compte' } };
      }

      let dynastyId = null;

      // Si mode create, créer une nouvelle dynastie
      if (mode === 'create') {
        // TODO: Implémenter la création de dynastie avec les vraies tables
        console.log('Mode création de dynastie activé');
        dynastyId = 'temp-dynasty-id';
      }

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
        user_role: profileData.user_role,
        is_admin: profileData.user_role === 'Administrateur',
        is_patriarch: profileData.user_role === 'Patriarche' || profileData.user_role === 'Matriarche',
        // Ajouter l'ID de la dynastie si une invitation est présente ou si on crée une dynastie
        ...(invitationData && { dynasty_id: invitationData.dynasty_id }),
        ...(dynastyId && { dynasty_id: dynastyId })
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
        user_role: data.user_role
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
        title: mode === 'create' ? 'Dynastie créée avec succès' : 'Inscription réussie',
        description: mode === 'create'
          ? 'Votre dynastie a été créée avec succès ! Vous pouvez maintenant vous connecter.'
          : 'Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.',
      });

      if (onSuccess) {
        onSuccess();
      } else {
        navigate(ROUTES.LANDING);
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

  // Obtenir les options de conjoints selon la civilité
  const getSpouseLabel = () => {
    return watchedCivilite === 'Mme' ? 'Époux' : 'Épouse';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          {mode === 'create' ? 'Créer une nouvelle dynastie' : 'Créer votre profil familial'}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {mode === 'create'
            ? 'Créez votre propre dynastie familiale et devenez le patriarche'
            : invitationData
            ? `Rejoindre la dynastie ${invitationData.dynasty_name}`
            : 'Remplissez les informations pour rejoindre votre famille'
          }
        </p>
      </div>

      {/* Affichage de l'invitation si présente */}
      {invitationData && (
        <Alert className="border-green-200 bg-green-50">
          <Crown className="h-4 w-4" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span>Vous rejoignez la dynastie <strong>{invitationData.dynasty_name}</strong></span>
              <Badge variant="secondary" className="ml-2">
                <Crown className="w-3 h-3 mr-1" />
                {invitationData.user_role}
              </Badge>
            </div>
          </AlertDescription>
        </Alert>
      )}

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
            disabled={invitationData?.user_role === 'Matriarche' || invitationData?.user_role === 'Patriarche'}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M.">Monsieur</SelectItem>
              <SelectItem value="Mme">Madame</SelectItem>
            </SelectContent>
          </Select>
          {invitationData?.user_role === 'Matriarche' && (
            <p className="text-sm text-blue-600 flex items-center">
              <Lock className="w-3 h-3 mr-1" />
              Civilité verrouillée pour le rôle Matriarche
            </p>
          )}
          {invitationData?.user_role === 'Patriarche' && (
            <p className="text-sm text-blue-600 flex items-center">
              <Lock className="w-3 h-3 mr-1" />
              Civilité verrouillée pour le rôle Patriarche
            </p>
          )}
        </div>

        {/* Rôle dans la famille */}
        <div className="space-y-2">
          <Label htmlFor="user_role">Rôle dans la famille *</Label>
          <Select
            onValueChange={(value) => setValue('user_role', value as any)}
            disabled={!!invitationData}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner votre rôle" />
            </SelectTrigger>
            <SelectContent>
              {userRoles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {invitationData && (
            <p className="text-sm text-blue-600 flex items-center">
              <Lock className="w-3 h-3 mr-1" />
              Rôle verrouillé par l'invitation
            </p>
          )}
          {!invitationData && watchedUserRole === 'Patriarche' && watchedCivilite === 'Mme' && (
            <p className="text-sm text-amber-600">
              Attention: Vous avez sélectionné "Patriarche" avec la civilité "Mme". Considérez "Matriarche" à la place.
            </p>
          )}
          {!invitationData && watchedUserRole === 'Matriarche' && watchedCivilite === 'M.' && (
            <p className="text-sm text-amber-600">
              Attention: Vous avez sélectionné "Matriarche" avec la civilité "M.". Considérez "Patriarche" à la place.
            </p>
          )}
        </div>

        {/* Type de relation - conditionnel selon le rôle */}
        {!['Patriarche', 'Matriarche'].includes(watchedUserRole) && (
          <div className="space-y-2">
            <Label htmlFor="relationship_type">Relation familiale *</Label>
            <Select
              onValueChange={(value) => setValue('relationship_type', value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner votre relation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conjoint">{getSpouseLabel()}</SelectItem>
                <SelectItem value="fils">Fils</SelectItem>
                <SelectItem value="fille">Fille</SelectItem>
                <SelectItem value="frere">Frère</SelectItem>
                <SelectItem value="soeur">Sœur</SelectItem>
                <SelectItem value="pere">Père</SelectItem>
                <SelectItem value="mere">Mère</SelectItem>
                <SelectItem value="grand-pere">Grand-père</SelectItem>
                <SelectItem value="grand-mere">Grand-mère</SelectItem>
                <SelectItem value="petit-fils">Petit-fils</SelectItem>
                <SelectItem value="petite-fille">Petite-fille</SelectItem>
                <SelectItem value="oncle">Oncle</SelectItem>
                <SelectItem value="tante">Tante</SelectItem>
                <SelectItem value="neveu">Neveu</SelectItem>
                <SelectItem value="niece">Nièce</SelectItem>
                <SelectItem value="cousin">Cousin</SelectItem>
                <SelectItem value="cousine">Cousine</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

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
              {mode === 'create' ? 'Création en cours...' : 'Inscription en cours...'}
            </>
          ) : (
            mode === 'create' ? 'Créer ma dynastie' : 'Créer mon profil'
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
