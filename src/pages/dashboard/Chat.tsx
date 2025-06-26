
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Users, Send, Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/services/api';
import { ProfileData } from '@/types/profile';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { useToast } from '@/hooks/use-toast';

const Chat = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [members, setMembers] = useState<ProfileData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [selectedMember, setSelectedMember] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await api.profiles.getAll();
        setMembers(data.filter(member => member.user_id !== user?.id));
      } catch (error) {
        console.error('Erreur lors de la récupération des membres:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMembers();
    }
  }, [user]);

  const filteredMembers = members.filter(member =>
    `${member.first_name} ${member.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedMember) return;

    try {
      await api.messages.create({
        content: `Message privé pour ${selectedMember.first_name}: ${newMessage}`,
        sender_id: user?.id || '',
        is_admin_message: false,
      });

      setNewMessage('');
      toast({
        title: 'Message envoyé',
        description: `Message envoyé à ${selectedMember.first_name}`,
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer le message',
        variant: 'destructive',
      });
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
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des membres */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center gap-2">
            <Users className="w-8 h-8 text-green-600" />
            <CardTitle>Membres de la famille</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un membre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="space-y-2">
              {filteredMembers.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  {searchQuery ? 'Aucun membre trouvé' : 'Aucun membre actif pour l\'instant.'}
                </div>
              ) : (
                filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedMember?.id === member.id
                        ? 'bg-whatsapp-100 border-whatsapp-300'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <UserAvatar
                      user={{
                        first_name: member.first_name,
                        last_name: member.last_name,
                        avatar_url: member.avatar_url,
                      }}
                      size="md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {member.first_name} {member.last_name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {member.current_location || 'Lieu non renseigné'}
                      </p>
                      {member.is_admin && (
                        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          Admin
                        </span>
                      )}
                      {member.is_patriarch && (
                        <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full ml-2">
                          Patriarche
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Zone de chat */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {selectedMember ? (
                <>
                  <UserAvatar
                    user={{
                      first_name: selectedMember.first_name,
                      last_name: selectedMember.last_name,
                      avatar_url: selectedMember.avatar_url,
                    }}
                    size="sm"
                  />
                  Chat avec {selectedMember.first_name} {selectedMember.last_name}
                </>
              ) : (
                'Sélectionnez un membre pour commencer à chatter'
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMember ? (
              <div className="space-y-4">
                {/* Zone des messages */}
                <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
                  <div className="text-center text-gray-500">
                    Début de la conversation avec {selectedMember.first_name}
                  </div>
                </div>

                {/* Formulaire d'envoi */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Textarea
                    placeholder={`Écrivez votre message à ${selectedMember.first_name}...`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                    rows={2}
                  />
                  <Button type="submit" disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Sélectionnez un membre dans la liste pour commencer une conversation
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
