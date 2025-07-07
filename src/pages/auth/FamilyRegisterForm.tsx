
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UserPlus } from 'lucide-react';
import { relationshipTypes, civiliteOptions } from '@/lib/validations/familySchema';

interface FamilyRegisterFormProps {
  onSuccess?: () => void;
}

export const FamilyRegisterForm: React.FC<FamilyRegisterFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    civilite: 'M.' as 'M.' | 'Mme',
    phone: '',
    profession: '',
    current_location: '',
    birth_place: '',
    birth_date: '',
    photo_url: '',
    relationship_type: 'fils' as typeof relationshipTypes[number],
    situation: '',
    user_role: 'Membre' as 'Administrateur' | 'Patriarche' | 'Matriarche' | 'Membre' | 'Visiteur' | 'Invité'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Erreur de validation",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      console.log('🚀 Début de l\'inscription famille', formData);

      // 1. Créer l'utilisateur avec Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dynasty`,
          data: {
            first_name: formData.first_name,
            last_name: formData.last_name,
            civilite: formData.civilite,
            phone: formData.phone,
            profession: formData.profession,
            current_location: formData.current_location,
            birth_place: formData.birth_place,
            birth_date: formData.birth_date,
            photo_url: formData.photo_url,
            relationship_type: formData.relationship_type,
            situation: formData.situation,
            user_role: formData.user_role
          }
        }
      });

      if (authError) {
        console.error('❌ Erreur lors de l\'inscription:', authError);
        throw authError;
      }

      console.log('✅ Inscription réussie:', authData);

      toast({
        title: "Inscription réussie !",
        description: "Un email de confirmation vous a été envoyé. Veuillez vérifier votre boîte mail.",
      });

      // Redirection ou callback de succès
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/dynasty');
      }

    } catch (error: any) {
      console.error('❌ Erreur complète:', error);
      
      let errorMessage = 'Une erreur est survenue lors de l\'inscription';
      
      if (error.message?.includes('already registered')) {
        errorMessage = 'Cette adresse email est déjà utilisée';
      } else if (error.message?.includes('Invalid email')) {
        errorMessage = 'Format d\'email invalide';
      } else if (error.message?.includes('Password')) {
        errorMessage = 'Le mot de passe ne respecte pas les critères requis';
      }

      toast({
        title: "Erreur d'inscription",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-2xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Inscription Famille
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations personnelles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">Prénom *</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange('first_name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="last_name">Nom *</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange('last_name', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email et mot de passe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Mot de passe *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Civilité et téléphone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Civilité *</Label>
                <RadioGroup
                  value={formData.civilite}
                  onValueChange={(value) => handleInputChange('civilite', value)}
                  className="flex flex-row space-x-4 mt-2"
                >
                  {civiliteOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </div>

            {/* Relation familiale */}
            <div>
              <Label htmlFor="relationship_type">Relation familiale *</Label>
              <Select
                value={formData.relationship_type}
                onValueChange={(value) => handleInputChange('relationship_type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre relation" />
                </SelectTrigger>
                <SelectContent>
                  {relationshipTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Informations complémentaires */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="profession">Profession</Label>
                <Input
                  id="profession"
                  value={formData.profession}
                  onChange={(e) => handleInputChange('profession', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="current_location">Résidence actuelle</Label>
                <Input
                  id="current_location"
                  value={formData.current_location}
                  onChange={(e) => handleInputChange('current_location', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birth_place">Lieu de naissance</Label>
                <Input
                  id="birth_place"
                  value={formData.birth_place}
                  onChange={(e) => handleInputChange('birth_place', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="birth_date">Date de naissance</Label>
                <Input
                  id="birth_date"
                  type="date"
                  value={formData.birth_date}
                  onChange={(e) => handleInputChange('birth_date', e.target.value)}
                />
              </div>
            </div>

            {/* Situation */}
            <div>
              <Label htmlFor="situation">Situation familiale</Label>
              <Textarea
                id="situation"
                value={formData.situation}
                onChange={(e) => handleInputChange('situation', e.target.value)}
                placeholder="Décrivez votre situation familiale..."
              />
            </div>

            {/* Bouton de soumission */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Inscription en cours...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  S'inscrire
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FamilyRegisterForm;
