
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ROUTES } from '@/lib/constants/routes';
import { supabase } from '@/integrations/supabase/client';
import { api } from '@/services/api';

export const FamilyRegisterForm = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone: '',
    birth_date: '',
    birth_place: '',
    current_location: '',
    situation: '',
    profession: '',
    relationship_type: 'fils' as const,
    civilite: 'M.' as const,
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas',
        variant: 'destructive',
      });
      return;
    }

    if (registerData.password.length < 8) {
      toast({
        title: 'Erreur',
        description: 'Le mot de passe doit contenir au moins 8 caractères',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // 1. Créer le compte utilisateur
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: registerData.email,
        password: registerData.password,
        options: {
          data: {
            first_name: registerData.first_name,
            last_name: registerData.last_name,
            phone: registerData.phone,
            birth_date: registerData.birth_date,
            birth_place: registerData.birth_place,
            current_location: registerData.current_location,
            situation: registerData.situation,
            profession: registerData.profession,
            relationship_type: registerData.relationship_type,
            civilite: registerData.civilite,
            is_patriarch: registerData.relationship_type === 'patriarche',
          },
        },
      });

      if (signUpError) throw signUpError;

      let avatarUrl = '';

      // 2. Upload de l'avatar si présent
      if (avatarFile && authData.user) {
        try {
          avatarUrl = await api.profiles.uploadAvatar(authData.user.id, avatarFile);
        } catch (uploadError) {
          console.error('Erreur upload avatar:', uploadError);
          toast({
            title: 'Attention',
            description: 'Compte créé mais problème avec l\'avatar. Vous pourrez l\'ajouter plus tard.',
            variant: 'default',
          });
        }
      }

      // 3. Créer ou mettre à jour le profil
      if (authData.user) {
        const profileData = {
          id: authData.user.id,
          user_id: authData.user.id,
          email: registerData.email,
          first_name: registerData.first_name,
          last_name: registerData.last_name,
          phone: registerData.phone,
          birth_date: registerData.birth_date,
          birth_place: registerData.birth_place,
          current_location: registerData.current_location,
          situation: registerData.situation,
          profession: registerData.profession,
          relationship_type: registerData.relationship_type,
          civilite: registerData.civilite,
          avatar_url: avatarUrl,
          is_admin: false,
          is_patriarch: registerData.relationship_type === 'patriarche',
          is_parent: ['pere', 'mere'].includes(registerData.relationship_type),
        };

        await api.profiles.createProfile(profileData);
      }

      toast({
        title: 'Succès',
        description: 'Inscription réussie ! Bienvenue dans la famille.',
      });

      navigate(ROUTES.DASHBOARD.ROOT);
    } catch (error: any) {
      console.error('Erreur inscription:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue lors de l\'inscription',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center mb-4">
        Créer votre compte famille
      </h3>
      
      <form onSubmit={handleRegister} className="space-y-4">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            {avatarPreview ? (
              <div className="relative">
                <img
                  src={avatarPreview}
                  alt="Aperçu avatar"
                  className="w-20 h-20 rounded-full object-cover border-2 border-whatsapp-200"
                />
                <button
                  type="button"
                  onClick={removeAvatar}
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
              {avatarPreview ? 'Changer la photo' : 'Ajouter une photo'}
            </Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
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
              value={registerData.first_name}
              onChange={(e) => setRegisterData({ ...registerData, first_name: e.target.value })}
              required
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="last_name">Nom *</Label>
            <Input
              id="last_name"
              value={registerData.last_name}
              onChange={(e) => setRegisterData({ ...registerData, last_name: e.target.value })}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            required
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="password">Mot de passe *</Label>
            <Input
              id="password"
              type="password"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              required
              disabled={loading}
              minLength={8}
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirmer *</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={registerData.confirmPassword}
              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              required
              disabled={loading}
              minLength={8}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            type="tel"
            value={registerData.phone}
            onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="civilite">Civilité *</Label>
            <Select
              value={registerData.civilite}
              onValueChange={(value: 'M.' | 'Mme') => setRegisterData({ ...registerData, civilite: value })}
              disabled={loading}
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
              value={registerData.relationship_type}
              onValueChange={(value) => setRegisterData({ ...registerData, relationship_type: value as any })}
              disabled={loading}
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
            value={registerData.birth_date}
            onChange={(e) => setRegisterData({ ...registerData, birth_date: e.target.value })}
            disabled={loading}
          />
        </div>

        <div>
          <Label htmlFor="birth_place">Lieu de naissance</Label>
          <Input
            id="birth_place"
            value={registerData.birth_place}
            onChange={(e) => setRegisterData({ ...registerData, birth_place: e.target.value })}
            disabled={loading}
          />
        </div>

        <div>
          <Label htmlFor="current_location">Résidence actuelle</Label>
          <Input
            id="current_location"
            value={registerData.current_location}
            onChange={(e) => setRegisterData({ ...registerData, current_location: e.target.value })}
            disabled={loading}
          />
        </div>

        <div>
          <Label htmlFor="profession">Profession</Label>
          <Input
            id="profession"
            value={registerData.profession}
            onChange={(e) => setRegisterData({ ...registerData, profession: e.target.value })}
            disabled={loading}
          />
        </div>

        <div>
          <Label htmlFor="situation">Situation familiale</Label>
          <Select
            value={registerData.situation}
            onValueChange={(value) => setRegisterData({ ...registerData, situation: value })}
            disabled={loading}
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

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 hover:from-whatsapp-600 hover:to-whatsapp-700"
          disabled={loading}
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
