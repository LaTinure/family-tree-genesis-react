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
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/constants/routes';
import { familyRegisterSchema, FamilyRegisterFormData, relationshipTypes } from '@/lib/validations/familySchema';
import { supabase } from '@/integrations/supabase/client';

// Options pour les listes de sélection
const professionOptions = [
  'Agriculteur',
  'Architecte',
  'Avocat',
  'Comptable',
  'Dentiste',
  'Électricien',
  'Enseignant',
  'Ingénieur',
  'Médecin',
  'Plombier',
  'Policier',
  'Pompier',
  'Vendeur',
  'Autre'
];

const situationOptions = [
  'Célibataire',
  'Marié(e)',
  'Divorcé(e)',
  'Veuf/Veuve',
  'En couple',
  'Séparé(e)'
];

export const FamilyRegisterForm = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [isAdminCodeValid, setIsAdminCodeValid] = useState(false);
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
      relationship_type: 'fils',
      role: 'membre'
    }
  });

  const watchedCivilite = watch('civilite');
  const watchedRelationshipType = watch('relationship_type');
  const watchedRole = watch('role');

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

  const uploadPhoto = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return null;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Photo upload failed:', error);
      return null;
    }
  };

  const handleRoleChange = (value: string) => {
    if (value === 'administrateur') {
      setShowRoleModal(true);
    } else {
      setValue('role', value);
    }
  };

  const validateAdminCode = () => {
    if (adminCode === '1432') {
      setIsAdminCodeValid(true);
      setValue('role', 'administrateur');
      setShowRoleModal(false);
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

  const pasteDateFromClipboard = async () => {
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
        role: data.role
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
        description: 'Votre demande a été envoyée. Un administrateur validera votre compte.',
      });

      navigate(ROUTES.HOME);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'inscription',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les types de relation selon la civilité
  const getAvailableRelationshipTypes = () => {
    const baseTypes = relationshipTypes.filter(type => {
      if (watchedCivilite === 'M.') {
        return !['fille', 'mere', 'grand-mere', 'petite-fille', 'tante', 'niece', 'cousine', 'epouse', 'belle-mere', 'belle-fille'].includes(type);
      } else {
        return !['fils', 'pere', 'grand-pere', 'petit-fils', 'oncle', 'neveu', 'cousin', 'epoux', 'beau-pere', 'beau-fils'].includes(type);
      }
    });
    return baseTypes;
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
          {/* Rôle */}
          <div className="space-y-2">
            <Label htmlFor="role">Rôle *</Label>
            <Select
              value={watchedRole}
              onValueChange={handleRoleChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="membre">Membre</SelectItem>
                <SelectItem value="administrateur">Administrateur</SelectItem>
              </SelectContent>
            </Select>
          </div>

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

          {/* Type de parenté */}
          <div className="space-y-2">
            <Label htmlFor="relationship_type">Type de parenté *</Label>
            <Select
              value={watchedRelationshipType}
              onValueChange={(value) => setValue('relationship_type', value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getAvailableRelationshipTypes().map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.relationship_type && (
              <p className="text-sm text-red-600">{errors.relationship_type.message}</p>
            )}
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

          {/* Résidence actuelle et profession */}
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
              <Label htmlFor="profession">Profession</Label>
              <Select
                onValueChange={(value) => setValue('profession', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une profession" />
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

          {/* Téléphone et situation familiale */}
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
              <Label htmlFor="situation">Situation familiale</Label>
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
