
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Send, Search, HelpCircle, Bug, MessageSquare } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/services/api';
import { ProfileData } from '@/types/profile';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { useToast } from '@/hooks/use-toast';

const ContactAdmin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentProfile, setCurrentProfile] = useState<ProfileData | null>(null);
  const [admins, setAdmins] = useState<ProfileData[]>([]);
  const [messageType, setMessageType] = useState('');
  const [subject, setSubject] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const messageTypes = [
    { value: 'question', label: 'Question générale', icon: HelpCircle },
    { value: 'bug_report', label: 'Signaler un bug', icon: Bug },
    { value: 'feedback', label: 'Suggestion d\'amélioration', icon: MessageSquare },
    { value: 'account_issue', label: 'Problème de compte', icon: Shield },
    { value: 'other', label: 'Autre', icon: MessageSquare }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const profile = await api.profiles.getCurrent();
          setCurrentProfile(profile);
          
          const allProfiles = await api.profiles.getAll();
          const adminProfiles = allProfiles.filter(p => p.is_admin);
          setAdmins(adminProfiles);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageType || !subject.trim() || !messageContent.trim()) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs obligatoires',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      // Envoyer un message aux admins
      await api.messages.create({
        content: `[${messageTypes.find(t => t.value === messageType)?.label}] ${subject}\n\n${messageContent}`,
        sender_id: user?.id || '',
        is_admin_message: false,
      });

      // Créer une notification pour tous les admins
      for (const admin of admins) {
        await api.notifications.create({
          user_id: admin.user_id,
          type: 'admin_contact',
          title: 'Nouveau message pour l\'administration',
          message: `${currentProfile?.first_name} ${currentProfile?.last_name} a envoyé un message: ${subject}`,
          data: {
            sender_id: user?.id,
            sender_name: `${currentProfile?.first_name} ${currentProfile?.last_name}`,
            message_type: messageType,
            subject: subject
          }
        });
      }

      toast({
        title: 'Message envoyé',
        description: 'Votre message a été transmis aux administrateurs',
      });

      // Reset du formulaire
      setMessageType('');
      setSubject('');
      setMessageContent('');
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer le message',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-8 pt-24">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations sur les admins */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                Administrateurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              {admins.length === 0 ? (
                <p className="text-gray-500 text-center">Aucun administrateur disponible</p>
              ) : (
                <div className="space-y-3">
                  {admins.map((admin) => (
                    <div key={admin.id} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <UserAvatar
                        user={{
                          first_name: admin.first_name,
                          last_name: admin.last_name,
                          avatar_url: admin.avatar_url,
                        }}
                        size="md"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {admin.first_name} {admin.last_name}
                        </h4>
                        <p className="text-sm text-blue-600">Administrateur</p>
                        {admin.is_patriarch && (
                          <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full mt-1">
                            Patriarche
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Formulaire de contact */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center gap-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <CardTitle>Contacter l'Administration</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Posez vos questions ou signalez un problème aux administrateurs
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitMessage} className="space-y-6">
                {/* Type de message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de message *
                  </label>
                  <Select value={messageType} onValueChange={setMessageType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez le type de votre message" />
                    </SelectTrigger>
                    <SelectContent>
                      {messageTypes.map((type) => {
                        const IconComponent = type.icon;
                        return (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center space-x-2">
                              <IconComponent className="w-4 h-4" />
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sujet */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <Input
                    placeholder="Résumez votre demande en quelques mots..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    placeholder="Décrivez votre demande de manière détaillée..."
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    rows={6}
                    required
                  />
                </div>

                {/* Informations du demandeur */}
                {currentProfile && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Vos informations</h4>
                    <div className="flex items-center space-x-3">
                      <UserAvatar
                        user={{
                          first_name: currentProfile.first_name,
                          last_name: currentProfile.last_name,
                          avatar_url: currentProfile.avatar_url,
                        }}
                        size="sm"
                      />
                      <div>
                        <p className="font-medium">
                          {currentProfile.first_name} {currentProfile.last_name}
                        </p>
                        <p className="text-sm text-gray-600">{currentProfile.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bouton d'envoi */}
                <div className="flex justify-end">
                  <Button 
                    type="submit"
                    disabled={submitting || !messageType || !subject.trim() || !messageContent.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Envoi...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactAdmin;
