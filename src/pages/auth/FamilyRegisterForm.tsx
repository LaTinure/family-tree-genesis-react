import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar } from '@/components/shared/Avatar';
import { Camera, Eye, EyeOff, Loader2, Check, X, Crown, Folder, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { ProfileData } from '@/types/profile';
import { api } from '@/services/api';
import { ComboboxMembre } from '@/components/family/ComboboxMembre';
import { FamilyRegisterSchema, FamilyRegisterData, RelationshipType } from '@/lib/validations/relationshipSchema';
import { getRelationshipTypeOptions } from '@/lib/constants/relationshipTypeOptions';
import type { Title } from '@/types/family';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { passwordValidation } from '@/lib/validations/passwordValidation';

// Schéma de validation simplifié pour le formulaire
const SimpleFamilyRegisterSchema = z.object({
  title: z.enum(['M.', 'Mme']),
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  password: passwordValidation,
  phoneCode: z.string().optional(),
  phone: z.string().optional(),
  profession: z.string().optional(),
  currentLocation: z.string().optional(),
  birthPlace: z.string().optional(),
  photoUrl: z.string().optional(),
  relationship: z.string().optional(),
  spouseName: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  birthDate: z.string().optional(),
  display_name: z.string().min(1, "Le nom à afficher est requis"),
  avatar_url: z.string().optional(),
  civilite: z.enum(['M.', 'Mme']),
  role: z.enum(['user', 'admin']),
  phone_code: z.string().max(5, "Le code pays doit être de 1 à 5 chiffres"),
});

type SimpleFamilyRegisterData = z.infer<typeof SimpleFamilyRegisterSchema>;

// Fonction utilitaire pour calculer la force du mot de passe
function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score++;
  if (password.length >= 16) score++;
  if (password.length >= 20) score++;
  return score;
}

function getStrengthLabel(score: number) {
  if (score <= 2) return { label: 'Faible', color: 'bg-red-500' };
  if (score <= 4) return { label: 'Moyen', color: 'bg-yellow-500' };
  if (score <= 5) return { label: 'Fort', color: 'bg-green-500' };
  return { label: 'Très fort', color: 'bg-blue-600' };
}

export const FamilyRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string>('');
  const [showPhotoConfirm, setShowPhotoConfirm] = useState(false);
  const [tempPhoto, setTempPhoto] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [patriarchExists, setPatriarchExists] = useState(false);
  const [hasAnyProfiles, setHasAnyProfiles] = useState(false);
  const [isFirstUser, setIsFirstUser] = useState(false);
  const [roleError, setRoleError] = useState('');
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);

  const methods = useForm<SimpleFamilyRegisterData>({
    resolver: zodResolver(SimpleFamilyRegisterSchema),
    defaultValues: {
      title: 'M.',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneCode: '+225',
      phone: '',
      profession: '',
      currentLocation: '',
      birthPlace: '',
      photoUrl: '',
      relationship: 'fils',
      spouseName: '',
      fatherName: '',
      motherName: '',
      birthDate: '',
      display_name: '',
      avatar_url: '',
      civilite: 'M.',
      role: 'user',
      phone_code: '+225',
    }
  });

  const watchedTitle = methods.watch('title');
  const relationshipOptions = getRelationshipTypeOptions(watchedTitle, patriarchExists);
  const passwordValue = methods.watch('password');
  const passwordScore = getPasswordStrength(passwordValue || '');
  const { label: strengthLabel, color: strengthColor } = getStrengthLabel(passwordScore);

  useEffect(() => {
    const checkProfilesExists = async () => {
      try {
        // 1️⃣ Vérification du nombre de profils
        const { data: profilesData, error: profilesError } = await supabase
          .from("profiles")
          .select("id");

        if (profilesError) {
          console.error("Erreur lors de la vérification des profils:", profilesError);
          return;
        }

        const hasAnyProfiles = profilesData && profilesData.length > 0;
        setHasAnyProfiles(hasAnyProfiles);
        setIsFirstUser(!hasAnyProfiles);

        // 2️⃣ Si des profils existent, vérification du patriarche
        if (hasAnyProfiles) {
          const { data: patriarchData, error: patriarchError } = await supabase
            .from("profiles")
            .select("id")
            .eq("is_patriarch", true)
            .limit(1);

          if (patriarchError) {
            console.error("Erreur lors de la vérification du patriarche:", patriarchError);
          } else {
            setPatriarchExists(!!(patriarchData && patriarchData.length > 0));
          }
        } else {
          setPatriarchExists(false);
        }
      } catch (err) {
        console.error("Erreur lors de la vérification des profils:", err);
      }
    };
    checkProfilesExists();
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setTempPhoto(result);
        setShowPhotoConfirm(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmPhoto = () => {
    setProfilePhoto(tempPhoto);
    methods.setValue('photoUrl', tempPhoto);
    methods.setValue('avatar_url', tempPhoto);
    setShowPhotoConfirm(false);
    setTempPhoto('');
    toast({
      title: "Photo confirmée",
      description: "Votre photo de profil a été sélectionnée avec succès.",
    });
  };

  const cancelPhoto = () => {
    setShowPhotoConfirm(false);
    setTempPhoto('');
    // Réinitialiser l'input file
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleRoleChange = (value: 'user' | 'admin') => {
    setRoleError('');
    if (value === 'admin') {
      setIsAdminDialogOpen(true);
    } else {
      setRole('user');
      setAdminCode('');
      setRoleError('');
    }
    methods.setValue('role', value);
  };

  const onSubmit = async (data: SimpleFamilyRegisterData) => {
    console.log('onSubmit appelé avec les données:', data);
    setIsLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone ? `${data.phoneCode}${data.phone}` : '',
            profession: data.profession || '',
            current_location: data.currentLocation || '',
            birth_place: data.birthPlace || '',
            photo_url: '',
            relationship_type: isFirstUser
              ? (data.title === 'M.' ? 'patriarche' : 'matriarche') as RelationshipType
              : data.relationship as RelationshipType,
            father_name: data.fatherName || '',
            mother_name: data.motherName || '',
            is_admin: isAdmin,
            is_patriarch: isFirstUser,
            birth_date: data.birthDate || null,
            situation: '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            display_name: data.display_name,
            avatar_url: data.avatar_url,
            civilite: data.civilite,
            phone_code: data.phone_code,
          }
        }
      });

      if (authError) {
        console.error("Erreur lors de l'inscription (supabase auth):", authError);
        toast({
          title: "Erreur d'authentification",
          description: "Erreur lors de l'enregistrement de l'utilisateur. Veuillez réessayer.",
          variant: "destructive",
        });
        return;
      }

      const signInData = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInData.error) {
        console.error("Erreur lors de la connexion:", signInData.error);
        toast({
          title: "Erreur de connexion",
          description: "Erreur lors de la connexion après l'inscription. Veuillez réessayer.",
          variant: "destructive",
        });
        return;
      }

      let avatarUrl = '';
      if (data.photoUrl && data.photoUrl.startsWith('data:')) {
        try {
          const res = await fetch(data.photoUrl);
          const blob = await res.blob();
          const file = new File([blob], `avatar_${signInData.data.user?.id}.png`, { type: blob.type });
          avatarUrl = await api.uploadAvatar(signInData.data.user?.id as string, file);
        } catch (uploadError) {
          console.error('Erreur upload avatar:', uploadError);
        }
      }

      let profileTitle: string;
      let isPatriarch: boolean;

      if (isFirstUser) {
        // Premier utilisateur = automatiquement patriarche
        isPatriarch = true;
        profileTitle = data.title === 'M.' ? 'Fils' : 'Fille';
      } else {
        // Utilisateur suivant = jamais patriarche
        isPatriarch = false;
        profileTitle = data.title === 'Mme' ? 'Fille' : 'Fils';
      }

      const profileData: ProfileData = {
        id: signInData.data.user?.id as string,
        user_id: signInData.data.user?.id as string,
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone ? `${data.phoneCode}${data.phone}` : '',
        profession: data.profession || '',
        current_location: data.currentLocation || '',
        birth_place: data.birthPlace || '',
        avatar_url: avatarUrl,
        photo_url: avatarUrl,
        relationship_type: isFirstUser
          ? (data.title === 'M.' ? 'patriarche' : 'matriarche') as RelationshipType
          : data.relationship as RelationshipType,
        father_name: data.fatherName || '',
        mother_name: data.motherName || '',
        is_admin: isAdmin,
        birth_date: data.birthDate || null,
        title: profileTitle as Title,
        situation: '',
        is_patriarch: isPatriarch,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        display_name: data.display_name,
        avatar_url: data.avatar_url,
        civilite: data.civilite,
        phone_code: data.phone_code,
      };

      try {
        await api.profiles.createProfile(profileData);
        console.log('Profil créé avec succès');
      } catch (error) {
        console.error('Erreur lors de la création du profil:', error);
        throw error;
      }

      toast({
        title: "Inscription réussie !",
        description: `Félicitations ! Vous êtes maintenant ${isFirstUser ? 'la racine de l\'arbre familial' : 'membre de la famille'}.`,
      });

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Erreur inscription:', error);
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-12">
        {/* Header visuel du formulaire */}
        <div className="mb-8 flex flex-col items-center">
          <img src="/images/profile01.png" alt="Logo" className="w-20 h-20 rounded-full shadow-lg mb-2" />
          <h2 className="text-3xl font-bold text-whatsapp-700 mb-1">Créer un compte Famille</h2>
          <p className="text-gray-600 text-center max-w-md">Rejoignez votre famille connectée et accédez à l'arbre généalogique, aux membres et plus encore !</p>
        </div>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg space-y-6">
          {/* Photo de profil obligatoire */}
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <div className="relative">
                <Avatar
                  src={profilePhoto}
                  size="lg"
                  fallback={methods.watch('display_name') ? methods.watch('display_name')[0].toUpperCase() : '?'}
                />
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-whatsapp-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-whatsapp-600 transition-colors shadow-lg">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <p className="text-xs text-gray-500">Photo de profil <span className="text-red-500">*</span></p>
            {methods.formState.errors.avatar_url && (
              <p className="text-sm text-red-600 mt-1">{methods.formState.errors.avatar_url.message}</p>
            )}
          </div>
          {/* Nom à afficher */}
          <div>
            <Label htmlFor="display_name" className="font-semibold">Nom à afficher</Label>
            <Input
              id="display_name"
              {...methods.register('display_name')}
              placeholder="Nom à afficher"
            />
            {methods.formState.errors.display_name && (
              <p className="text-sm text-red-600 mt-1">{methods.formState.errors.display_name.message}</p>
            )}
          </div>
          {/* Email */}
          <div>
            <Label htmlFor="email" className="font-semibold">Email</Label>
            <Input
              id="email"
              type="email"
              {...methods.register('email')}
              placeholder="votre@email.com"
            />
            {methods.formState.errors.email && (
              <p className="text-sm text-red-600 mt-1">{methods.formState.errors.email.message}</p>
            )}
          </div>
          {/* Mot de passe + indicateur de force */}
          <div>
            <Label htmlFor="password" className="font-semibold">Mot de passe</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...methods.register('password')}
                placeholder="Mot de passe"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-whatsapp-600 bg-transparent p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-whatsapp-500"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Indicateur de force du mot de passe */}
            {passwordValue && (
              <div className="mt-2">
                <div className="w-full h-2 rounded bg-gray-200 overflow-hidden">
                  <div
                    className={`h-2 rounded transition-all duration-300 ${strengthColor}`}
                    style={{ width: `${(passwordScore / 6) * 100}%` }}
                  />
                </div>
                <p className={`text-xs mt-1 font-semibold ${strengthColor.replace('bg-', 'text-')}`}>Force : {strengthLabel}</p>
              </div>
            )}
            {methods.formState.errors.password && (
              <p className="text-sm text-red-600 mt-1">{methods.formState.errors.password.message}</p>
            )}
          </div>
          {/* Indicatif pays + téléphone */}
          <div className="flex gap-2">
            <div className="w-1/3">
              <Label htmlFor="phone_code" className="font-semibold">Indicatif</Label>
              <Input
                id="phone_code"
                {...methods.register('phone_code')}
                placeholder="+225"
                maxLength={5}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="phone" className="font-semibold">Téléphone</Label>
              <Input
                id="phone"
                {...methods.register('phone')}
                placeholder="ex: 0700000000"
              />
            </div>
          </div>
          {methods.formState.errors.phone && (
            <p className="text-sm text-red-600 mt-1">{methods.formState.errors.phone.message}</p>
          )}
          {/* Civilité */}
          <div>
            <Label htmlFor="civilite" className="font-semibold">Civilité</Label>
            <Select
              value={methods.watch('civilite')}
              onValueChange={(value) => methods.setValue('civilite', value as 'M.' | 'Mme')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisissez votre civilité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M.">M.</SelectItem>
                <SelectItem value="Mme">Mme</SelectItem>
              </SelectContent>
            </Select>
            {methods.formState.errors.civilite && (
              <p className="text-sm text-red-600 mt-1">{methods.formState.errors.civilite.message}</p>
            )}
          </div>
          {/* Sélecteur de rôle */}
          <div>
            <Label htmlFor="role" className="font-semibold">Rôle</Label>
            <Select value={role} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choisissez un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Utilisateur</SelectItem>
                <SelectItem value="admin">Administrateur</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isAdminDialogOpen} onOpenChange={open => {
            if (!open) {
              setIsAdminDialogOpen(false);
              setRole('user');
              setAdminCode('');
              setRoleError('');
            }
          }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Code Administrateur</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Label htmlFor="admin-code" className="font-semibold">Veuillez entrer le code secret pour devenir administrateur :</Label>
                <Input
                  id="admin-code"
                  type="password"
                  value={adminCode}
                  onChange={e => setAdminCode(e.target.value)}
                  placeholder="Code admin"
                  autoFocus
                />
                {roleError && <p className="text-sm text-red-600 mt-1">{roleError}</p>}
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAdminDialogOpen(false);
                      setRole('user');
                      setAdminCode('');
                      setRoleError('');
                    }}
                  >Annuler</Button>
                  <Button
                    type="button"
                    onClick={() => {
                      if (adminCode === '1432') {
                        setRole('admin');
                        setIsAdminDialogOpen(false);
                        setRoleError('');
                      } else {
                        setRoleError('Code administrateur incorrect');
                      }
                    }}
                  >Valider</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            type="submit"
            className="w-full bg-whatsapp-600 hover:bg-whatsapp-700 text-white rounded-md py-2 px-4 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:ring-offset-2 disabled:opacity-60"
            disabled={isLoading || (role === 'admin' && adminCode !== '1432')}
          >
            {isLoading ? (
              <span className="mr-2">Inscription...</span>
            ) : (
              <><UserPlus className="inline-block w-5 h-5 mr-2 align-middle" />Créer mon compte</>
            )}
          </Button>
        </form>
      </div>
    </FormProvider>
  );
};
