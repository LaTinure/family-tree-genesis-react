
import { ProfileData, CreateProfileData, UpdateProfileData } from '@/types/profile';

// Simulation d'une API pour les profils
export const api = {
  profiles: {
    async createProfile(profileData: CreateProfileData): Promise<ProfileData> {
      console.log('Creating profile:', profileData);
      // Simulation de création de profil
      return {
        ...profileData,
        id: profileData.user_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    },

    async updateProfile(userId: string, updates: UpdateProfileData): Promise<ProfileData> {
      console.log('Updating profile:', userId, updates);
      // Simulation de mise à jour de profil
      throw new Error('Profile not found'); // Simulation pour déclencher la création
    },

    async getProfileById(userId: string): Promise<ProfileData> {
      console.log('Getting profile by ID:', userId);
      // Simulation - toujours retourner une erreur pour déclencher la création
      const error = new Error('Profile not found');
      (error as any).code = 'PGRST116';
      throw error;
    },

    async getAllProfiles(): Promise<ProfileData[]> {
      console.log('Getting all profiles');
      return [];
    }
  },

  async uploadAvatar(userId: string, file: File): Promise<string> {
    console.log('Uploading avatar for user:', userId, file);
    // Simulation d'upload d'avatar
    return URL.createObjectURL(file);
  }
};
