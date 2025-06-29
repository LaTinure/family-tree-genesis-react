
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { ContactList } from '@/components/chat/ContactList';
import { Message, ChatContact, TypingIndicator } from '@/types/chat';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Chat = () => {
  const { user } = useAuth();
  const { members, isLoading: membersLoading } = useFamilyMembers();
  const { toast } = useToast();
  
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<TypingIndicator[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialiser les contacts depuis les membres de la famille
  useEffect(() => {
    if (members.length > 0 && user) {
      const chatContacts: ChatContact[] = members
        .filter(member => member.user_id !== user.id)
        .map(member => ({
          id: member.id,
          profile: {
            id: member.id,
            user_id: member.user_id,
            first_name: member.first_name,
            last_name: member.last_name,
            avatar_url: member.avatar_url,
            photo_url: member.photo_url,
            phone: member.phone,
            is_online: Math.random() > 0.3, // Simulation statut en ligne
            last_seen: new Date(Date.now() - Math.random() * 3600000) // Dernière connexion aléatoire
          },
          conversation_id: `conv_${user.id}_${member.user_id}`,
          last_message: generateMockMessage(member.user_id, user.id),
          unread_count: Math.floor(Math.random() * 5)
        }));
      
      setContacts(chatContacts);
      setIsLoading(false);
    }
  }, [members, user]);

  // Générer un message factice pour la démo
  const generateMockMessage = (senderId: string, receiverId: string): Message => {
    const mockMessages = [
      "Salut ! Comment ça va ?",
      "On se voit bientôt ?",
      "Merci pour l'invitation !",
      "À bientôt !",
      "Super, merci !",
      "Parfait 👍",
      "D'accord, on fait ça",
      "Bisous 😘"
    ];
    
    return {
      id: `mock_${Date.now()}_${Math.random()}`,
      sender_id: senderId,
      receiver_id: receiverId,
      content: mockMessages[Math.floor(Math.random() * mockMessages.length)],
      message_type: 'text',
      timestamp: new Date(Date.now() - Math.random() * 86400000), // Message aléatoire des dernières 24h
      is_read: Math.random() > 0.3,
      is_delivered: true
    };
  };

  // Charger les messages pour un contact sélectionné
  const loadMessagesForContact = (contact: ChatContact) => {
    // Simulation de messages pour la démo
    const mockMessages: Message[] = [];
    const messageCount = Math.floor(Math.random() * 10) + 5;
    
    for (let i = 0; i < messageCount; i++) {
      const isFromUser = Math.random() > 0.5;
      const timestamp = new Date(Date.now() - (messageCount - i) * 300000); // Messages espacés de 5 min
      
      mockMessages.push({
        id: `msg_${i}_${Date.now()}`,
        sender_id: isFromUser ? user!.id : contact.profile.user_id,
        receiver_id: isFromUser ? contact.profile.user_id : user!.id,
        content: isFromUser 
          ? [`Salut ${contact.profile.first_name} !`, "Comment ça va ?", "Tu es libre ce weekend ?", "Super !"][Math.floor(Math.random() * 4)]
          : ["Salut !", "Ça va bien et toi ?", "Oui, pourquoi ?", "Génial ! 😊"][Math.floor(Math.random() * 4)],
        message_type: 'text',
        timestamp,
        is_read: !isFromUser || Math.random() > 0.3,
        is_delivered: true
      });
    }
    
    setMessages(mockMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()));
  };

  const handleSelectContact = (contact: ChatContact) => {
    setSelectedContact(contact);
    loadMessagesForContact(contact);
    
    // Marquer comme lu
    setContacts(prev => prev.map(c => 
      c.id === contact.id ? { ...c, unread_count: 0 } : c
    ));
  };

  const handleSendMessage = (content: string, type: 'text' | 'image' | 'file' = 'text') => {
    if (!selectedContact || !user) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}_${Math.random()}`,
      sender_id: user.id,
      receiver_id: selectedContact.profile.user_id,
      content,
      message_type: type,
      timestamp: new Date(),
      is_read: false,
      is_delivered: true
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Mettre à jour le dernier message du contact
    setContacts(prev => prev.map(c => 
      c.id === selectedContact.id 
        ? { ...c, last_message: newMessage }
        : c
    ));

    // Simulation de réponse automatique après 2-5 secondes
    setTimeout(() => {
      const responses = [
        "Merci pour ton message !",
        "D'accord 👍",
        "Parfait !",
        "Je vois ça",
        "Super !",
        "Bisous ❤️"
      ];
      
      const responseMessage: Message = {
        id: `response_${Date.now()}_${Math.random()}`,
        sender_id: selectedContact.profile.user_id,
        receiver_id: user.id,
        content: responses[Math.floor(Math.random() * responses.length)],
        message_type: 'text',
        timestamp: new Date(),
        is_read: false,
        is_delivered: true
      };
      
      setMessages(prev => [...prev, responseMessage]);
      setContacts(prev => prev.map(c => 
        c.id === selectedContact.id 
          ? { ...c, last_message: responseMessage, unread_count: c.unread_count + 1 }
          : c
      ));
    }, Math.random() * 3000 + 2000);

    toast({
      title: "Message envoyé",
      description: `Message envoyé à ${selectedContact.profile.first_name}`,
    });
  };

  const handleTyping = (isTyping: boolean) => {
    if (!selectedContact || !user) return;
    
    // Simulation de l'indicateur de frappe
    console.log(`${user.user_metadata?.display_name} is ${isTyping ? 'typing' : 'not typing'}`);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
          {/* Liste des contacts */}
          <div className="lg:col-span-1">
            <ContactList
              contacts={contacts}
              selectedContact={selectedContact}
              onSelectContact={handleSelectContact}
              isLoading={isLoading}
            />
          </div>

          {/* Interface de chat */}
          <div className="lg:col-span-2">
            <ChatInterface
              selectedContact={selectedContact}
              messages={messages}
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
              typingUsers={typingUsers}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
