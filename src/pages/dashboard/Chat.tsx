
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send, Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/services/api';
import { FamilyMember } from '@/types/family';
import { ChatContact } from '@/types/profile';
import { UserAvatar } from '@/components/shared/UserAvatar';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Chat = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const members = await api.profiles.getAll();
        const currentProfile = await api.profiles.getCurrent();
        
        // Créer des contacts de chat factices
        const chatContacts: ChatContact[] = members
          .filter(member => member.id !== currentProfile?.id)
          .map(member => ({
            id: member.id,
            profile: {
              id: member.id,
              user_id: member.user_id,
              email: member.email,
              first_name: member.first_name,
              last_name: member.last_name,
              phone: member.phone,
              birth_date: member.birth_date,
              birth_place: member.birth_place,
              current_location: member.current_location,
              situation: member.situation,
              profession: member.profession,
              avatar_url: member.avatar_url,
              photo_url: member.photo_url,
              relationship_type: member.relationship_type as any,
              father_name: member.father_name,
              mother_name: member.mother_name,
              spouse_name: member.spouse_name,
              is_admin: member.is_admin,
              is_parent: member.is_parent,
              is_patriarch: member.is_patriarch,
              created_at: member.created_at,
              updated_at: member.updated_at,
              civilite: member.civilite,
              father_id: member.father_id,
              mother_id: member.mother_id,
              role: member.role,
            },
            last_message: {
              id: `msg-${member.id}`,
              sender_id: member.id,
              receiver_id: currentProfile?.id || '',
              content: 'Dernier message...',
              timestamp: new Date(),
              is_read: false,
              message_type: 'text' as const,
            },
            unread_count: Math.floor(Math.random() * 5),
            is_online: Math.random() > 0.5,
          }));
        
        setContacts(chatContacts);
      } catch (error) {
        console.error('Erreur lors de la récupération des contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [user]);

  const filteredContacts = contacts.filter(contact =>
    `${contact.profile.first_name} ${contact.profile.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (message.trim() && selectedContact) {
      console.log('Envoi du message:', message);
      setMessage('');
    }
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Liste des contacts */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Conversations
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher un contact..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-3 cursor-pointer hover:bg-gray-50 border-l-4 ${
                      selectedContact?.id === contact.id
                        ? 'border-whatsapp-600 bg-whatsapp-50'
                        : 'border-transparent'
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <UserAvatar
                          user={{
                            first_name: contact.profile.first_name,
                            last_name: contact.profile.last_name,
                            avatar_url: contact.profile.avatar_url,
                            photo_url: contact.profile.photo_url,
                          }}
                          size="md"
                        />
                        {contact.is_online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {contact.profile.first_name} {contact.profile.last_name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {contact.last_message?.content}
                        </p>
                      </div>
                      {contact.unread_count > 0 && (
                        <div className="bg-whatsapp-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {contact.unread_count}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Zone de chat */}
          <Card className="lg:col-span-2">
            {selectedContact ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center space-x-3">
                    <UserAvatar
                      user={{
                        first_name: selectedContact.profile.first_name,
                        last_name: selectedContact.profile.last_name,
                        avatar_url: selectedContact.profile.avatar_url,
                        photo_url: selectedContact.profile.photo_url,
                      }}
                      size="md"
                    />
                    <div>
                      <h3 className="font-semibold">
                        {selectedContact.profile.first_name} {selectedContact.profile.last_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {selectedContact.is_online ? 'En ligne' : 'Hors ligne'}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col h-96">
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="text-center text-gray-500 text-sm">
                      Début de la conversation avec {selectedContact.profile.first_name}
                    </div>
                  </div>
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Tapez votre message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-whatsapp-600 hover:bg-whatsapp-700"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Sélectionnez une conversation pour commencer</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
