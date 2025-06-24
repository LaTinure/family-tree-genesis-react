
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send, Users } from 'lucide-react';
import { api } from '@/services/api';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { useToast } from '@/hooks/use-toast';

const Messages = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await api.messages.getAll();
        setMessages(data || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !profile) return;

    setSending(true);
    try {
      await api.messages.create({
        content: newMessage,
        sender_id: profile.user_id,
        is_admin_message: profile.is_admin,
      });

      // Refresh messages
      const updatedMessages = await api.messages.getAll();
      setMessages(updatedMessages || []);
      setNewMessage('');
      
      toast({
        title: 'Message envoyé',
        description: 'Votre message a été publié avec succès',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer le message',
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <MessageSquare className="mr-3 h-8 w-8 text-green-600" />
            Messages Familiaux
          </h1>
          <p className="text-gray-600 mt-2">
            Partagez des nouvelles et communiquez avec votre famille
          </p>
        </div>

        {/* Nouveau message */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Nouveau Message</CardTitle>
            <CardDescription>
              Partagez quelque chose avec votre famille
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <Textarea
                placeholder="Que voulez-vous partager avec votre famille ?"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={3}
                required
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={sending || !newMessage.trim()}>
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Publier
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Liste des messages */}
        <div className="space-y-4">
          {messages.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Aucun message
                </h3>
                <p className="text-gray-500">
                  Soyez le premier à partager quelque chose avec votre famille !
                </p>
              </CardContent>
            </Card>
          ) : (
            messages.map((message) => (
              <Card key={message.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <UserAvatar
                      user={{
                        first_name: message.profiles?.first_name || 'Utilisateur',
                        last_name: message.profiles?.last_name || '',
                        avatar_url: message.profiles?.avatar_url,
                      }}
                      size="md"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {message.profiles?.first_name || 'Utilisateur'} {message.profiles?.last_name || ''}
                        </h4>
                        {message.is_admin_message && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            Admin
                          </span>
                        )}
                        <span className="text-sm text-gray-500">
                          {new Date(message.created_at).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
