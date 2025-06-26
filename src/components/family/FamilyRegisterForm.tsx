import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, Eye, EyeOff, Upload, Camera, Clipboard, ClipboardCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ROUTES } from '@/lib/constants/routes';
import { familyRegisterSchema, FamilyRegisterFormData } from '@/lib/validations/familySchema';
import { relationshipTypeOptions } from '@/lib/constants/relationshipTypeOptions';
import { supabase } from '@/integrations/supabase/client';

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

// Fonction pour générer un UUID
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const FamilyRegisterForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [copiedDate, setCopiedDate] = useState(false);

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
  const watchedRole = watch('role');

  // Fonction pour gérer le changement de rôle
  const handleRoleChange = (value: string) => {
    console.log('👑 [handleRoleChange] Changement de rôle:', value);
    if (value === 'Administrateur') {
      setShowRoleModal(true);
    } else {
      setValue('role', value as 'Membre' | 'Administrateur');
    }
  };

  // Fonction pour valider le code administrateur
  const validateAdminCode = () => {
    console.log('🔐 [validateAdminCode] Validation du code admin');
    if (adminCode === '1432') {
      setValue('role', 'Administrateur' as const);
      setShowRoleModal(false);
      setAdminCode('');
      toast({
        title: 'Code validé',
        description: 'Rôle administrateur activé',
      });
    } else {
      toast({
        title: 'Code incorrect',
        description: 'Le code administrateur est incorrect',
        variant: 'destructive',
      });
    }
  };

  // Fonction signUp manquante
  const signUp = async (email: string, password: string, profileData: any) => {
    console.log('🚀 [signUp] Début de l\'inscription avec:', { email, profileData });

    try {
      // Créer l'utilisateur dans Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log('🔐 [signUp] Réponse auth:', { authData, authError });

      if (authError) {
        console.error('❌ [signUp] Erreur auth:', authError);
        return { error: authError };
      }

      if (!authData.user) {
        console.error('❌ [signUp] Aucun utilisateur créé');
        return { error: { message: 'Erreur lors de la création du compte' } };
      }

      console.log('✅ [signUp] Utilisateur créé avec succès:', authData.user.id);

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

      console.log('👤 [signUp] Données du profil à insérer:', profileDataToInsert);

      const { data: profileResult, error: profileError } = await supabase
        .from('profiles')
        .insert(profileDataToInsert as any)
        .select()
        .maybeSingle();

      console.log('👤 [signUp] Réponse profil:', { profileResult, profileError });

      if (profileError) {
        console.error('❌ [signUp] Erreur profil:', profileError);
        return { error: profileError };
      }

      console.log('✅ [signUp] Profil créé avec succès');
      return { data: profileResult, error: null };

    } catch (error) {
      console.error('❌ [signUp] Erreur générale:', error);
      return { error: { message: 'Erreur inattendue lors de l\'inscription' } };
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('📸 [handlePhotoChange] Changement de photo');
    const file = event.target.files?.[0];
    if (file) {
      console.log('📸 [handlePhotoChange] Fichier sélectionné:', file.name);
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadPhoto = async (file: File): Promise<string | null> => {
    console.log('📤 [uploadPhoto] Début upload photo:', file.name);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      console.log('📤 [uploadPhoto] Chemin du fichier:', filePath);

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        console.error('❌ [uploadPhoto] Erreur upload:', uploadError);
        return null;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      console.log('✅ [uploadPhoto] Photo uploadée avec succès:', data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error('❌ [uploadPhoto] Erreur générale:', error);
      return null;
    }
  };

  const pasteDateFromClipboard = async () => {
    console.log('📋 [pasteDateFromClipboard] Collage depuis presse-papier');
    try {
      const text = await navigator.clipboard.readText();
      const dateMatch = text.match(/\d{4}-\d{2}-\d{2}/);
      if (dateMatch) {
        setValue('birth_date', dateMatch[0]);
        setCopiedDate(true);
        setTimeout(() => setCopiedDate(false), 2000);
        toast({
          title: 'Date collée',
          description: 'La date a été collée depuis le presse-papier',
        });
      } else {
        toast({
          title: 'Format invalide',
          description: 'Aucune date valide trouvée dans le presse-papier',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'accéder au presse-papier',
        variant: 'destructive',
      });
    }
  };

  const onSubmit = async (data: FamilyRegisterFormData) => {
    console.log('🚀 [onSubmit] Début soumission formulaire');
    console.log('📝 [onSubmit] Données du formulaire:', data);

    setLoading(true);

    try {
      let photoUrl = null;
      if (photoFile) {
        console.log('📸 [onSubmit] Upload de la photo...');
        photoUrl = await uploadPhoto(photoFile);
        console.log('📸 [onSubmit] URL de la photo:', photoUrl);
      }

      console.log('🔐 [onSubmit] Appel signUp...');

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

      console.log('🔐 [onSubmit] Réponse signUp:', { error });

      if (error) {
        console.error('❌ [onSubmit] Erreur signUp:', error);
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

      console.log('✅ [onSubmit] Inscription réussie');
      toast({
        title: 'Inscription réussie',
        description: 'Votre demande a été envoyée. Un administrateur validera votre compte.',
      });

      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('❌ [onSubmit] Erreur générale:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'inscription',
        variant: 'destructive',
      });
    } finally {
      console.log('🏁 [onSubmit] Fin soumission');
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Rejoindre la Famille
        </CardTitle>
        <CardDescription className="text-gray-600">
          Créez votre profil pour rejoindre l'arbre familial
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Photo de profil */}
          <div className="space-y-2">
            <Label>Photo de profil</Label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Aperçu"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-gray-400" />
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
                  onClick={() => document.getElementById('photo-upload')?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choisir une photo
                </Button>
              </div>
            </div>
          </div>

          {/* Rôle */}
          <div className="space-y-2">
            <Label htmlFor="role">Rôle *</Label>
            <Select
              value={watchedRole}
              onValueChange={(value) => handleRoleChange(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Membre">Membre</SelectItem>
                <SelectItem value="Administrateur">Administrateur</SelectItem>
              </SelectContent>
            </Select>
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
              <div className="relative">
                <Input
                  id="birth_date"
                  type="date"
                  {...register('birth_date')}
                  className="rounded-lg pr-10"
                />
                <button
                  type="button"
                  onClick={pasteDateFromClipboard}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {copiedDate ? <ClipboardCheck className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
                </button>
              </div>
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
              <Label htmlFor="profession">Sit. professionnelle </Label>
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
              <Label htmlFor="situation">Situation Matrimoniale </Label>
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
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
            Votre demande sera examinée par un administrateur avant validation.
          </p>
        </div>
      </CardContent>

      {/* Modal pour le code administrateur */}
      <Dialog open={showRoleModal} onOpenChange={setShowRoleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Code Administrateur</DialogTitle>
            <DialogDescription>
              Veuillez saisir le code administrateur pour confirmer votre rôle.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Code administrateur"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && validateAdminCode()}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRoleModal(false)}>
              Annuler
            </Button>
            <Button onClick={validateAdminCode}>
              Valider
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
