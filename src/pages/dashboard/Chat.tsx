import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Send,
  Search,
  MoreVertical,
  Phone,
  Video,
  Image,
  Paperclip,
  Smile,
  Mic,
  Users,
  Crown,
  Shield,
  Clock,
  Check,
  CheckCheck,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/services/api';
import { ProfileData } from '@/types/profile';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: Date;
  is_read: boolean;
  message_type: 'text' | 'image' | 'file';
  sender?: ProfileData;
}

interface ChatContact {
  id: string;
  profile: ProfileData;
  last_message?: Message;
  unread_count: number;
  is_online: boolean;
}

const Chat = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Simuler des données de chat pour la démo
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const members = await api.profiles.getAll();
        const chatContacts: ChatContact[] = members
          .filter(member => member.id !== profile?.id)
          .map(member => ({
            id: member.id,
            profile: member,
            last_message: {
              id: '1',
              sender_id: member.id,
              receiver_id: profile?.id || '',
              content: `Salut ${profile?.first_name || 'famille'} ! 👋`,
              timestamp: new Date(Date.now() - Math.random() * 86400000),
              is_read: Math.random() > 0.5,
              message_type: 'text'
            },
            unread_count: Math.floor(Math.random() * 5),
            is_online: Math.random() > 0.7
          }));

        setContacts(chatContacts);
        if (chatContacts.length > 0) {
          setSelectedContact(chatContacts[0]);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [profile]);

  // Simuler des messages pour le contact sélectionné
  useEffect(() => {
    if (selectedContact) {
      const demoMessages: Message[] = [
        {
          id: '1',
          sender_id: selectedContact.profile.id,
          receiver_id: profile?.id || '',
          content: `Salut ${profile?.first_name || 'famille'} ! Comment ça va ? 😊`,
          timestamp: new Date(Date.now() - 300000),
          is_read: true,
          message_type: 'text',
          sender: selectedContact.profile
        },
        {
          id: '2',
          sender_id: profile?.id || '',
          receiver_id: selectedContact.profile.id,
          content: 'Très bien merci ! Et toi ?',
          timestamp: new Date(Date.now() - 240000),
          is_read: true,
          message_type: 'text'
        },
        {
          id: '3',
          sender_id: selectedContact.profile.id,
          receiver_id: profile?.id || '',
          content: 'Parfait ! On se voit bientôt ? 🌟',
          timestamp: new Date(Date.now() - 180000),
          is_read: true,
          message_type: 'text',
          sender: selectedContact.profile
        },
        {
          id: '4',
          sender_id: profile?.id || '',
          receiver_id: selectedContact.profile.id,
          content: 'Avec plaisir ! À très vite ! 👋',
          timestamp: new Date(Date.now() - 120000),
          is_read: false,
          message_type: 'text'
        }
      ];
      setMessages(demoMessages);
    }
  }, [selectedContact, profile]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message: Message = {
      id: Date.now().toString(),
      sender_id: profile?.id || '',
      receiver_id: selectedContact.profile.id,
      content: newMessage,
      timestamp: new Date(),
      is_read: false,
      message_type: 'text'
    };

    setMessages(prev => [...prev, message]);
      setNewMessage('');

    // Simuler une réponse après 2 secondes
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        sender_id: selectedContact.profile.id,
        receiver_id: profile?.id || '',
        content: 'Message reçu ! 👍',
        timestamp: new Date(),
        is_read: false,
        message_type: 'text',
        sender: selectedContact.profile
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);

      toast({
        title: 'Message envoyé',
      description: 'Votre message a été envoyé avec succès',
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredContacts = contacts.filter(contact =>
    `${contact.profile.first_name} ${contact.profile.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Aujourd\'hui';
    if (days === 1) return 'Hier';
    if (days < 7) return `${days} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-whatsapp-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50">
      <div className="flex h-full">
        {/* Liste des contacts */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* En-tête */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Chat Familial</h2>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un membre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            </div>

          {/* Liste des contacts */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              <AnimatePresence>
                {filteredContacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedContact?.id === contact.id
                          ? 'bg-whatsapp-50 border border-whatsapp-200'
                        : 'hover:bg-gray-50'
                    }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={contact.profile.photo_url || contact.profile.avatar_url}
                            alt={`${contact.profile.first_name} ${contact.profile.last_name}`}
                          />
                          <AvatarFallback className="bg-whatsapp-100 text-whatsapp-700">
                            {contact.profile.first_name?.[0]}{contact.profile.last_name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        {contact.is_online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                        {contact.profile.is_admin && (
                          <div className="absolute -top-1 -right-1">
                            <Crown className="w-4 h-4 text-yellow-500 fill-current" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {contact.profile.first_name} {contact.profile.last_name}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {contact.last_message && formatTime(contact.last_message.timestamp)}
                        </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {contact.last_message?.content}
                        </p>
                      </div>

                      {contact.unread_count > 0 && (
                        <Badge className="bg-whatsapp-600 text-white text-xs">
                          {contact.unread_count}
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </div>

        {/* Zone de chat */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              {/* En-tête du chat */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={selectedContact.profile.photo_url || selectedContact.profile.avatar_url}
                          alt={`${selectedContact.profile.first_name} ${selectedContact.profile.last_name}`}
                        />
                        <AvatarFallback className="bg-whatsapp-100 text-whatsapp-700">
                          {selectedContact.profile.first_name?.[0]}{selectedContact.profile.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      {selectedContact.is_online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {selectedContact.profile.first_name} {selectedContact.profile.last_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {selectedContact.is_online ? 'En ligne' : 'Hors ligne'}
                        {selectedContact.profile.is_admin && (
                          <span className="ml-2 text-whatsapp-600">• Admin</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => {
                    const isOwnMessage = message.sender_id === profile?.id;
                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          {!isOwnMessage && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={message.sender?.photo_url || message.sender?.avatar_url}
                                alt={`${message.sender?.first_name} ${message.sender?.last_name}`}
                              />
                              <AvatarFallback className="bg-whatsapp-100 text-whatsapp-700 text-xs">
                                {message.sender?.first_name?.[0]}{message.sender?.last_name?.[0]}
                              </AvatarFallback>
                            </Avatar>
                          )}

                          <div className={`rounded-lg px-4 py-2 ${
                            isOwnMessage
                              ? 'bg-whatsapp-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            <div className={`flex items-center justify-end space-x-1 mt-1 ${
                              isOwnMessage ? 'text-whatsapp-200' : 'text-gray-500'
                            }`}>
                              <span className="text-xs">
                                {formatTime(message.timestamp)}
                              </span>
                              {isOwnMessage && (
                                message.is_read ? (
                                  <CheckCheck className="w-3 h-3" />
                                ) : (
                                  <Check className="w-3 h-3" />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Zone de saisie */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Image className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      ref={inputRef}
                      placeholder="Tapez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-20"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Smile className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mic className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-whatsapp-600 hover:bg-whatsapp-700 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            /* Écran d'accueil */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-whatsapp-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-12 h-12 text-whatsapp-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Chat Familial
                </h3>
                <p className="text-gray-600">
                  Sélectionnez un membre pour commencer à discuter
                </p>
              </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
