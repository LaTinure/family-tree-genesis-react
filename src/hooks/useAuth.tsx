
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { ProfileData } from '@/types/profile';
import { api } from '@/services/api';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: ProfileData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<ProfileData>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  updateProfile: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile when user logs in
          setTimeout(async () => {
            try {
              const userProfile = await api.profiles.getCurrent();
              setProfile(userProfile);
            } catch (error) {
              console.log('Profile not found, creating from metadata...');
              // Create profile from user metadata if it doesn't exist
              const metadata = session.user.user_metadata || {};
              try {
                const newProfile = await api.profiles.create({
                  user_id: session.user.id,
                  email: session.user.email || '',
                  first_name: metadata.first_name || '',
                  last_name: metadata.last_name || '',
                  phone: metadata.phone || '',
                  birth_date: metadata.birth_date || null,
                  birth_place: metadata.birth_place || '',
                  current_location: metadata.current_location || '',
                  situation: metadata.situation || '',
                  profession: metadata.profession || '',
                  photo_url: metadata.photo_url || '',
                  avatar_url: metadata.avatar_url || metadata.photo_url || '',
                  title: metadata.title || 'Fils',
                  relationship_type: metadata.relationship_type || 'fils',
                  is_admin: metadata.is_admin || false,
                  is_patriarch: metadata.is_patriarch || false,
                });
                setProfile(newProfile);
              } catch (createError) {
                console.error('Error creating profile:', createError);
              }
            }
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: metadata,
      }
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<ProfileData>) => {
    if (!profile) throw new Error('No profile found');
    
    const updatedProfile = await api.profiles.update(profile.id, updates);
    setProfile(updatedProfile);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      signIn,
      signUp,
      signOut,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
