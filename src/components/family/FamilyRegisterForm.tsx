
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar } from '@/components/shared/Avatar';
import { Camera, Eye, EyeOff, Loader2, X, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { ProfileData } from '@/types/profile';
import { api } from '@/services/api';
import { FamilyRegisterSchema, FamilyRegisterData, RelationshipType } from '@/lib/validations/relationshipSchema';
import { getRelationshipTypeOptions } from '@/lib/constants/relationshipTypeOptions';
import type { Title } from '@/types/family';
import { supabase } from '@/integrations/supabase/client';
import { passwordValidation } from '@/lib/validations/passwordValidation';

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
  const [adminCode, setAdminCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [patriarchExists, setPatriarchExists] = useState(false);
  const [hasAnyProfiles, setHasAnyProfiles] = useState(false);
  const [isFirstUser, setIsFirstUser] = useState(false);
  const [roleError, setRoleError] = useState('');
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FamilyRegisterData>({
    resolver: zodResolver(FamilyRegisterSchema),
    defaultValues: {
      civilite: 'M.',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone_code: '+225',
      phone: '',
      profession: '',
      current_location: '',
      birth_place: '',
      avatar_url: '',
      relationship_type: 'fils',
      birth_date: '',
      display_name: '',
      situation: '',
    }
  });

  const watchedTitle = watch('civilite');
  const relationshipOptions = getRelationshipTypeOptions(watchedTitle, patriarchExists);
  const passwordValue = watch('password');
  const passwordScore = getPasswordStrength(passwordValue || '');
  const { label: strengthLabel, color: strengthColor } = getStrengthLabel(passwordScore);

  useEffect(() => {
    const checkProfilesExists = async () => {
      try {
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
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Erreur',
          description: 'L\'image ne peut pas dépasser 5MB',
          variant: 'destructive',
        });
        return;
      }
      
      setProfilePhoto(URL.createObjectURL(file));
      setTempPhoto(URL.createObjectURL(file));
    }
  };

  const confirmPhoto = () => {
    setProfilePhoto(tempPhoto);
    setValue('avatar_url', tempPhoto);
    setTempPhoto('');
    setShowPhotoConfirm(false);
  };

  const cancelPhoto = () => {
    setProfilePhoto('');
    setTempPhoto('');
    setShowPhotoConfirm(false);
  };

  const handleRoleChange = (selectedRole: 'user' | 'admin') => {
    setRole(selectedRole);
    setRoleError('');
    if (selectedRole === 'admin') {
      setIsAdminDialogOpen(true);
    } else {
      setIsAdmin(false);
      setAdminCode('');
    }
  };

  const onSubmit = async (data: FamilyRegisterData) => {
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
      if (data.avatar_url && data.avatar_url.startsWith('data:')) {
        try {
          avatarUrl = await api.profiles.uploadAvatar(authData.user.id, 
            await (await fetch(data.avatar_url)).blob() as File);
        } catch (uploadError) {
          console.warn('Erreur upload avatar, continuons sans:', uploadError);
        }
      }

      // 3. Créer le profil complet
      const isPatriarch = isFirstUser;
      const relationshipType = isFirstUser 
        ? (data.civilite === 'M.' ? 'patriarche' : 'matriarche') 
        : (data.relationship_type || 'fils');

      const profileData: ProfileData = {
        id: authData.user.id,
        user_id: authData.user.id,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone ? `${data.phone_code}${data.phone}` : '',
        profession: data.profession || '',
        current_location: data.current_location || '',
        birth_place: data.birth_place || '',
        avatar_url: avatarUrl || data.avatar_url || '',
        photo_url: avatarUrl || data.avatar_url || '',
        relationship_type: relationshipType as RelationshipType,
        father_name: '',
        mother_name: '',
        is_admin: isAdmin,
        birth_date: data.birth_date || null,
        title: isFirstUser 
          ? (data.civilite === 'M.' ? 'Patriarche' : 'Matriarche') 
          : (data.civilite === 'M.' ? 'Fils' : 'Fille'),
        situation: data.situation || '',
        is_patriarch: isPatriarch,
        is_parent: false,
        civilite: data.civilite,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // 4. Sauvegarder le profil
      await api.profiles.createProfile(profileData);

      // 5. Connexion automatique
      try {
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
      } catch (signInError) {
        console.warn("Erreur lors de la connexion automatique:", signInError);
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
        description: error.message || "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center mb-4">
        Créer votre compte famille
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            {profilePhoto ? (
              <div className="relative">
                <img
                  src={profilePhoto}
                  alt="Aperçu avatar"
                  className="w-20 h-20 rounded-full object-cover border-2 border-whatsapp-200"
                />
                <button
                  type="button"
                  onClick={cancelPhoto}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          
          <div>
            <Label htmlFor="avatar" className="cursor-pointer bg-whatsapp-50 hover:bg-whatsapp-100 text-whatsapp-700 px-4 py-2 rounded-lg transition-colors">
              {profilePhoto ? 'Changer la photo' : 'Ajouter une photo'}
            </Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Informations personnelles */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first_name">Prénom *</Label>
            <Input
              id="first_name"
              {...register('first_name')}
              disabled={isLoading}
            />
            {errors.first_name && (
              <p className="text-sm text-red-600 mt-1">{errors.first_name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="last_name">Nom *</Label>
            <Input
              id="last_name"
              {...register('last_name')}
              disabled={isLoading}
            />
            {errors.last_name && (
              <p className="text-sm text-red-600 mt-1">{errors.last_name.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Mot de passe *</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              disabled={isLoading}
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-whatsapp-600"
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
              <p className={`text-xs mt-1 font-semibold text-gray-600`}>Force : {strengthLabel}</p>
            </div>
          )}
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="civilite">Civilité *</Label>
            <Select
              value={watch('civilite')}
              onValueChange={(value: 'M.' | 'Mme') => setValue('civilite', value)}
              disabled={isLoading}
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
          <div>
            <Label htmlFor="relationship_type">Rôle dans la famille *</Label>
            <Select
              value={watch('relationship_type')}
              onValueChange={(value) => setValue('relationship_type', value as RelationshipType)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {relationshipOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="birth_date">Date de naissance</Label>
          <Input
            id="birth_date"
            type="date"
            {...register('birth_date')}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="birth_place">Lieu de naissance</Label>
          <Input
            id="birth_place"
            {...register('birth_place')}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="current_location">Résidence actuelle</Label>
          <Input
            id="current_location"
            {...register('current_location')}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="profession">Profession</Label>
          <Input
            id="profession"
            {...register('profession')}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="display_name">Nom à afficher *</Label>
          <Input
            id="display_name"
            {...register('display_name')}
            disabled={isLoading}
          />
          {errors.display_name && (
            <p className="text-sm text-red-600 mt-1">{errors.display_name.message}</p>
          )}
        </div>

        {/* Dialog pour code admin */}
        <Dialog open={isAdminDialogOpen} onOpenChange={(open) => {
          if (!open) {
            setIsAdminDialogOpen(false);
            setRole('user');
            setAdminCode('');
            setRoleError('');
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
                      setRoleError('');
                    } else {
                      setRoleError('Code administrateur incorrect');
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

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 hover:from-whatsapp-600 hover:to-whatsapp-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Création du compte...
            </>
          ) : (
            'Créer mon compte'
          )}
        </Button>
      </form>
    </div>
  );
};
