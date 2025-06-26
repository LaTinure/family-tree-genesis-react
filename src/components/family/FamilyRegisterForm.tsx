import { useState, useEffect } from 'react';
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
import { api } from '@/services/api';
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
    setTempPhoto('');
    setShowPhotoConfirm(false);
  };

  const cancelPhoto = () => {
    setProfilePhoto('');
    setTempPhoto('');
    setShowPhotoConfirm(false);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value as 'user' | 'admin';
    setRole(selectedRole);
    setRoleError('');
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
          avatarUrl = await api.profiles.uploadAvatar(authData.user.id, 
            await (await fetch(data.photoUrl)).blob() as File);
        } catch (uploadError) {
          console.warn('Erreur upload avatar, continuons sans:', uploadError);
        }
      }

      // 3. Créer le profil complet
      const isPatriarch = isFirstUser;
      const relationshipType = isFirstUser 
        ? (data.title === 'M.' ? 'patriarche' : 'matriarche') 
        : (data.relationship || 'fils');

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
        relationship_type: relationshipType as RelationshipType,
        father_name: data.fatherName || '',
        mother_name: data.motherName || '',
        is_admin: isAdmin,
        birth_date: data.birthDate || null,
        title: isFirstUser 
          ? (data.title === 'M.' ? 'Patriarche' : 'Matriarche') 
          : (data.title === 'M.' ? 'Fils' : 'Fille'),
        situation: '',
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
      
      <form onSubmit={onSubmit} className="space-y-4">
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
              value={methods.watch('firstName')}
              onChange={methods.register}
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="last_name">Nom *</Label>
            <Input
              id="last_name"
              value={methods.watch('lastName')}
              onChange={methods.register}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={methods.watch('email')}
            onChange={methods.register}
            required
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="password">Mot de passe *</Label>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={methods.watch('password')}
              onChange={methods.register}
              required
              disabled={isLoading}
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute -top-2 -right-2 text-whatsapp-700"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirmer *</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={methods.watch('password')}
              onChange={methods.register}
              required
              disabled={isLoading}
              minLength={8}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            type="tel"
            value={methods.watch('phone')}
            onChange={methods.register}
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="civilite">Civilité *</Label>
            <Select
              value={methods.watch('title')}
              onValueChange={(value: 'M.' | 'Mme') => methods.setValue('title', value)}
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
              value={methods.watch('relationship')}
              onValueChange={(value) => methods.setValue('relationship', value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patriarche">Patriarche</SelectItem>
                <SelectItem value="matriarche">Matriarche</SelectItem>
                <SelectItem value="fils">Fils</SelectItem>
                <SelectItem value="fille">Fille</SelectItem>
                <SelectItem value="pere">Père</SelectItem>
                <SelectItem value="mere">Mère</SelectItem>
                <SelectItem value="conjoint">Conjoint(e)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="birth_date">Date de naissance</Label>
          <Input
            id="birth_date"
            type="date"
            value={methods.watch('birthDate')}
            onChange={methods.register}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="birth_place">Lieu de naissance</Label>
          <Input
            id="birth_place"
            value={methods.watch('birthPlace')}
            onChange={methods.register}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="current_location">Résidence actuelle</Label>
          <Input
            id="current_location"
            value={methods.watch('currentLocation')}
            onChange={methods.register}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="profession">Profession</Label>
          <Input
            id="profession"
            value={methods.watch('profession')}
            onChange={methods.register}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="situation">Situation familiale</Label>
          <Select
            value={methods.watch('relationship')}
            onValueChange={(value) => methods.setValue('relationship', value)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Célibataire">Célibataire</SelectItem>
              <SelectItem value="Marié(e)">Marié(e)</SelectItem>
              <SelectItem value="Divorcé(e)">Divorcé(e)</SelectItem>
              <SelectItem value="Veuf/Veuve">Veuf/Veuve</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="display_name">Nom à afficher</Label>
          <Input
            id="display_name"
            value={methods.watch('display_name')}
            onChange={methods.register}
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="role">Rôle</Label>
          <Select
            value={role}
            onValueChange={handleRoleChange}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">Utilisateur</SelectItem>
              <SelectItem value="admin">Administrateur</SelectItem>
            </SelectContent>
          </Select>
          {roleError && <p className="text-red-500 mt-1">{roleError}</p>}
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 hover:from-whatsapp-600 hover:to-whatsapp-700"
          disabled={isLoading}
        >
          {loading ? (
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
