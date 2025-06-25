
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Save, X } from 'lucide-react';
import { ProfileData } from '@/types/profile';
import { ProfilePhoto } from './ProfilePhoto';

const profileSchema = z.object({
  first_name: z.string().min(1, 'Le prénom est requis'),
  last_name: z.string().min(1, 'Le nom est requis'),
  phone: z.string().optional(),
  birth_date: z.string().optional(),
  birth_place: z.string().optional(),
  current_location: z.string().optional(),
  situation: z.string().optional(),
  profession: z.string().optional(),
  father_name: z.string().optional(),
  mother_name: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  profile: ProfileData;
  onSave: (data: Partial<ProfileData>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const ProfileForm = ({ profile, onSave, onCancel, loading = false }: ProfileFormProps) => {
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || '');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: profile.first_name || '',
      last_name: profile.last_name || '',
      phone: profile.phone || '',
      birth_date: profile.birth_date || '',
      birth_place: profile.birth_place || '',
      current_location: profile.current_location || '',
      situation: profile.situation || '',
      profession: profile.profession || '',
      father_name: profile.father_name || '',
      mother_name: profile.mother_name || '',
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    await onSave({
      ...data,
      avatar_url: avatarUrl,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modifier le profil</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Photo de profil */}
          <div className="flex justify-center">
            <ProfilePhoto
              user={{
                first_name: watch('first_name'),
                last_name: watch('last_name'),
                avatar_url: avatarUrl,
              }}
              isEditing={true}
              onPhotoUpdate={setAvatarUrl}
              size="lg"
            />
          </div>

          {/* Informations de base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first_name">Prénom *</Label>
              <Input
                id="first_name"
                {...register('first_name')}
                className={errors.first_name ? 'border-red-500' : ''}
              />
              {errors.first_name && (
                <p className="text-sm text-red-500 mt-1">{errors.first_name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="last_name">Nom *</Label>
              <Input
                id="last_name"
                {...register('last_name')}
                className={errors.last_name ? 'border-red-500' : ''}
              />
              {errors.last_name && (
                <p className="text-sm text-red-500 mt-1">{errors.last_name.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Téléphone</Label>
            <Input id="phone" {...register('phone')} />
          </div>

          {/* Informations personnelles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="birth_date">Date de naissance</Label>
              <Input id="birth_date" type="date" {...register('birth_date')} />
            </div>

            <div>
              <Label htmlFor="birth_place">Lieu de naissance</Label>
              <Input id="birth_place" {...register('birth_place')} />
            </div>
          </div>

          <div>
            <Label htmlFor="current_location">Lieu de résidence</Label>
            <Input id="current_location" {...register('current_location')} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="situation">Situation familiale</Label>
              <Select
                value={watch('situation') || ''}
                onValueChange={(value) => setValue('situation', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre situation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="célibataire">Célibataire</SelectItem>
                  <SelectItem value="marié">Marié(e)</SelectItem>
                  <SelectItem value="divorcé">Divorcé(e)</SelectItem>
                  <SelectItem value="veuf">Veuf/Veuve</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="profession">Profession</Label>
              <Input id="profession" {...register('profession')} />
            </div>
          </div>

          {/* Informations familiales */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-4">Informations familiales</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="father_name">Nom du père</Label>
                <Input id="father_name" {...register('father_name')} />
              </div>

              <div>
                <Label htmlFor="mother_name">Nom de la mère</Label>
                <Input id="mother_name" {...register('mother_name')} />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !isDirty}
              className="bg-whatsapp-600 hover:bg-whatsapp-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
