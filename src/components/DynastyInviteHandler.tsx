import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/lib/constants/routes';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const DynastyInviteHandler = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [inviteToken, setInviteToken] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('invite');
    if (token) {
      setInviteToken(token);
    } else {
      navigate(ROUTES.HOME);
    }
  }, [searchParams, navigate]);

  const { data: inviteData, isLoading, error } = useQuery({
    queryKey: ['invite', inviteToken],
    queryFn: async () => {
      if (!inviteToken) throw new Error('Token manquant');
      const { data, error } = await supabase
        .from('invites')
        .select('*')
        .eq('token', inviteToken)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!inviteToken,
    retry: false
  });

  const handleAcceptInvite = () => {
    if (!inviteData) return;
    const authUrl = `${ROUTES.AUTH.FAMILY}?invite=${inviteToken}&dynasty_id=${inviteData.dynasty_id}&role=${inviteData.user_role}`;
    navigate(authUrl);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-whatsapp-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Vérification de l'invitation...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !inviteData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-red-600">Invitation Invalide</CardTitle>
            <CardDescription>Cette invitation n'est plus valide ou a expiré.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => navigate(ROUTES.HOME)} className="w-full">
              Retour à la sélection
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
      <Card className="w-full max-w-md border-whatsapp-200">
        <CardHeader className="text-center">
          <Badge className="mb-2 bg-whatsapp-100 text-whatsapp-800">Invitation Valide</Badge>
          <CardTitle className="text-2xl">Invitation à Rejoindre</CardTitle>
          <CardDescription>Vous avez été invité à rejoindre une dynastie familiale</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-whatsapp-50 to-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Dynastie</h4>
            <p className="text-sm text-gray-700">Rôle : {inviteData.user_role}</p>
          </div>

          <div className="space-y-3">
            <Button onClick={handleAcceptInvite} className="w-full bg-whatsapp-600 hover:bg-whatsapp-700">
              Accepter l'Invitation
            </Button>
            <Button onClick={() => navigate(ROUTES.HOME)} variant="outline" className="w-full">
              Décliner
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DynastyInviteHandler;
