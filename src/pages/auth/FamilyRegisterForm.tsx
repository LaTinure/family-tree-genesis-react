
import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar } from '@/components/shared/Avatar';
import { Camera, Eye, EyeOff, Loader2, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { ProfileData } from '@/types/profile';
import { familyApi } from '@/services/api';
import { RelationshipType } from '@/lib/validations/relationshipSchema';
import { getRelationshipTypeOptions } from '@/lib/constants/relationshipTypeOptions';
import type { Title } from '@/types/family';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { passwordValidation } from '@/lib/validations/passwordValidation';

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
  const [adminCode, setAdminCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);

  const methods = useForm<SimpleFamilyRegisterData>({
    resolver: zodResolver(SimpleFamilyRegisterSchema),
    defaultValues: {
      title: 'M.',
      firstName: '',
      lastName: '',
      email: '',
      password: 'M2024@Mano',
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

  const passwordValue = methods.watch('password');
  const passwordScore = getPasswordStrength(passwordValue || '');
  const { label: strengthLabel, color: strengthColor } = getStrengthLabel(passwordScore);

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

  const handleRoleChange = (value: 'user' | 'admin') => {
    if (value === 'admin') {
      setIsAdminDialogOpen(true);
    } else {
      setRole('user');
      setAdminCode('');
      setIsAdmin(false);
    }
    methods.setValue('role', value);
  };

  const onSubmit = async (data: SimpleFamilyRegisterData) => {
    console.log('onSubmit appelé avec les données:', data);
    setIsLoading(true);

    try {
      // 1. Créer le compte d'authentification
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        }
      });

      if (authError) {
        console.error("Erreur lors de l'inscription:", authError);
        toast({
          title: "Erreur d'authentification",
          description: authError.message,
          variant: "destructive",
        });
        return;
      }

      if (!authData.user) {
        throw new Error("Aucun utilisateur créé");
      }

      // 2. Upload de l'avatar si fourni
      let avatarUrl = '';
      if (data.photoUrl && data.photoUrl.startsWith('data:')) {
        try {
          const blob = await fetch(data.photoUrl).then(r => r.blob());
          const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
          avatarUrl = await familyApi.uploadAvatar(file);
        } catch (uploadError) {
          console.warn('Erreur upload avatar, continuons sans:', uploadError);
        }
      }

      // 3. Créer le profil complet
      const profileData: ProfileData = {
        id: authData.user.id,
        user_id: authData.user.id,
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone ? `${data.phoneCode}${data.phone}` : '',
        profession: data.profession || '',
        current_location: data.currentLocation || '',
        birth_place: data.birthPlace || '',
        avatar_url: avatarUrl || data.avatar_url || '',
        photo_url: avatarUrl || data.avatar_url || '',
        relationship_type: role === 'admin' ? 'patriarche' : 'cousin',
        father_name: data.fatherName || '',
        mother_name: data.motherName || '',
        is_admin: isAdmin,
        birth_date: data.birthDate || null,
        title: data.title === 'M.' ? 'Fils' : 'Fille',
        situation: '',
        is_patriarch: false,
        is_parent: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // 4. Sauvegarder le profil
      await familyApi.createProfile(profileData);

      // 5. Connexion automatique
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        console.error("Erreur lors de la connexion:", signInError);
        toast({
          title: "Compte créé",
          description: "Votre compte a été créé. Veuillez vous connecter.",
        });
        navigate('/auth-family');
        return;
      }

      toast({
        title: "Inscription réussie !",
        description: `Félicitations ! Vous êtes maintenant membre de la famille.`,
      });

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Erreur inscription:', error);
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-whatsapp-50 via-white to-whatsapp-100 pt-24 pb-12">
        <div className="mb-8 flex flex-col items-center">
          <img src="/images/profile01.png" alt="Logo" className="w-20 h-20 rounded-full shadow-lg mb-2" />
          <h2 className="text-3xl font-bold text-whatsapp-700 mb-1">Créer un compte Famille</h2>
          <p className="text-gray-600 text-center max-w-md">Rejoignez votre famille connectée et accédez à l'arbre généalogique, aux membres et plus encore !</p>
        </div>

        <form onSubmit={methods.handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg space-y-6">
          {/* Photo de profil */}
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
            <p className="text-xs text-gray-500">Photo de profil</p>
          </div>

          {/* Nom à afficher et Civilité */}
          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <Label htmlFor="civilite" className="font-semibold">Civilité</Label>
              <Select
                value={methods.watch('civilite')}
                onValueChange={(value) => {
                  methods.setValue('civilite', value as 'M.' | 'Mme');
                  methods.setValue('title', value as 'M.' | 'Mme');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez votre civilité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M.">M.</SelectItem>
                  <SelectItem value="Mme">Mme</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Prénom et Nom */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="font-semibold">Prénom</Label>
              <Input
                id="firstName"
                {...methods.register('firstName')}
                placeholder="Prénom"
              />
              {methods.formState.errors.firstName && (
                <p className="text-sm text-red-600 mt-1">{methods.formState.errors.firstName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName" className="font-semibold">Nom</Label>
              <Input
                id="lastName"
                {...methods.register('lastName')}
                placeholder="Nom de famille"
              />
              {methods.formState.errors.lastName && (
                <p className="text-sm text-red-600 mt-1">{methods.formState.errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email et Mot de passe */}
          <div className="grid grid-cols-2 gap-4">
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
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-whatsapp-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordValue && (
                <div className="mt-2">
                  <div className="w-full h-2 rounded bg-gray-200 overflow-hidden">
                    <div
                      className={`h-2 rounded transition-all duration-300 ${strengthColor}`}
                      style={{ width: `${(passwordScore / 6) * 100}%` }}
                    />
                  </div>
                  <p className={`text-xs mt-1 font-semibold text-gray-600`}>Force : {strengthLabel}</p>
                </div>
              )}
              {methods.formState.errors.password && (
                <p className="text-sm text-red-600 mt-1">{methods.formState.errors.password.message}</p>
              )}
            </div>
          </div>

          {/* Téléphone et Profession */}
          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <Label htmlFor="profession" className="font-semibold">Profession</Label>
              <Input
                id="profession"
                {...methods.register('profession')}
                placeholder="Votre profession"
              />
            </div>
          </div>

          {/* Lieu de naissance et Résidence actuelle */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="birthPlace" className="font-semibold">Lieu de naissance</Label>
              <Input
                id="birthPlace"
                {...methods.register('birthPlace')}
                placeholder="Lieu de naissance"
              />
            </div>
            <div>
              <Label htmlFor="currentLocation" className="font-semibold">Résidence actuelle</Label>
              <Input
                id="currentLocation"
                {...methods.register('currentLocation')}
                placeholder="Résidence actuelle"
              />
            </div>
          </div>

          {/* Sélecteur de rôle */}
          <div>
            <Label htmlFor="role" className="font-semibold">Rôle</Label>
            <Select value={role} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choisissez un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Membre</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dialog pour code admin */}
          <Dialog open={isAdminDialogOpen} onOpenChange={(open) => {
            if (!open) {
              setIsAdminDialogOpen(false);
              setRole('user');
              setAdminCode('');
              setIsAdmin(false);
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
                  onChange={(e) => setAdminCode(e.target.value)}
                  placeholder="Code admin"
                  autoFocus
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAdminDialogOpen(false);
                      setRole('user');
                      setAdminCode('');
                      setIsAdmin(false);
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      if (adminCode === '1432') {
                        setRole('admin');
                        setIsAdmin(true);
                        setIsAdminDialogOpen(false);
                      }
                    }}
                    className="bg-whatsapp-600 hover:bg-whatsapp-700"
                  >
                    Valider
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Dialog confirmation photo */}
          <Dialog open={showPhotoConfirm} onOpenChange={setShowPhotoConfirm}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmer la photo</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-center">
                <Avatar src={tempPhoto} size="xl" />
                <p>Voulez-vous utiliser cette photo comme avatar ?</p>
                <div className="flex justify-center space-x-2">
                  <Button variant="outline" onClick={() => setShowPhotoConfirm(false)}>
                    Annuler
                  </Button>
                  <Button onClick={confirmPhoto} className="bg-whatsapp-600 hover:bg-whatsapp-700">
                    Confirmer
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Bouton de soumission */}
          <Button
            type="submit"
            className="w-full bg-whatsapp-600 hover:bg-whatsapp-700 text-white rounded-md py-3 px-4 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:ring-offset-2 disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Inscription...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Créer mon compte
              </>
            )}
          </Button>
        </form>
      </div>
    </FormProvider>
  );
};
