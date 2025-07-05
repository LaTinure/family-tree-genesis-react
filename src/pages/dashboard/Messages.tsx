
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/services/api';
import { Message } from '@/types/profile';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Messages = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const isAdmin = user?.user_metadata?.role === 'admin' || user?.user_metadata?.is_admin;

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const fetchedMessages = await api.messages.getAll();
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les messages',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      await api.messages.create({
        content: newMessage,
        sender_id: user?.id || '',
        is_admin_message: isAdmin
      });
      
      setNewMessage('');
      await fetchMessages();
      
      toast({
        title: 'Message envoyé',
        description: 'Votre message a été publié avec succès',
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer le message',
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">Chargement...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-whatsapp-700 flex items-center">
            <MessageSquare className="mr-3 h-8 w-8" />
            Messages de la famille
          </h1>
          <p className="text-gray-600 mt-2">
            Espace de communication pour tous les membres de la famille
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Zone de composition */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Nouveau message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Écrivez votre message à la famille..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={sending || !newMessage.trim()}
                  className="w-full bg-whatsapp-600 hover:bg-whatsapp-700"
                >
                  {sending ? 'Envoi...' : 'Envoyer le message'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Liste des messages */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Messages récents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Aucun message pour le moment</p>
                    <p className="text-sm">Soyez le premier à partager quelque chose !</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 rounded-lg border-l-4 ${
                        message.is_admin_message
                          ? 'bg-red-50 border-red-500'
                          : 'bg-gray-50 border-whatsapp-500'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {message.is_admin_message && (
                            <Shield className="w-4 h-4 text-red-600" />
                          )}
                          <span className={`font-medium ${
                            message.is_admin_message ? 'text-red-700' : 'text-whatsapp-700'
                          }`}>
                            {message.is_admin_message ? 'Administrateur' : 'Membre'}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatDate(message.created_at || '')}
                        </span>
                      </div>
                      <p className="text-gray-800 whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
