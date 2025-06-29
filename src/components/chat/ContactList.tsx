
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/shared/Avatar';
import { Search, MessageCircle } from 'lucide-react';
import { ChatContact } from '@/types/chat';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';

interface ContactListProps {
  contacts: ChatContact[];
  selectedContact: ChatContact | null;
  onSelectContact: (contact: ChatContact) => void;
  isLoading?: boolean;
}

export const ContactList: React.FC<ContactListProps> = ({
  contacts,
  selectedContact,
  onSelectContact,
  isLoading = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    `${contact.profile.first_name} ${contact.profile.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const formatLastMessageTime = (timestamp: Date) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    
    // Même jour
    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
    
    // Hier
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Hier';
    }
    
    // Cette semaine
    const daysDiff = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff < 7) {
      return messageDate.toLocaleDateString('fr-FR', { weekday: 'short' });
    }
    
    // Plus ancien
    return messageDate.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 text-white">
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
            className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/70 focus:bg-white/20"
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-96">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin w-6 h-6 border-2 border-whatsapp-500 border-t-transparent rounded-full mx-auto mb-2"></div>
              Chargement...
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              {searchQuery ? 'Aucun contact trouvé' : 'Aucune conversation'}
            </div>
          ) : (
            <div className="divide-y">
              {filteredContacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedContact?.id === contact.id
                      ? 'bg-whatsapp-50 border-r-4 border-whatsapp-500'
                      : ''
                  }`}
                  onClick={() => onSelectContact(contact)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar
                        src={contact.profile.photo_url || contact.profile.avatar_url}
                        fallback={`${contact.profile.first_name[0]}${contact.profile.last_name[0]}`}
                        className="w-12 h-12"
                      />
                      {contact.profile.is_online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {contact.profile.first_name} {contact.profile.last_name}
                        </h3>
                        {contact.last_message && (
                          <span className="text-xs text-gray-500">
                            {formatLastMessageTime(contact.last_message.timestamp)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">
                          {contact.last_message?.content || 'Aucun message'}
                        </p>
                        {contact.unread_count > 0 && (
                          <div className="bg-whatsapp-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                            {contact.unread_count > 9 ? '9+' : contact.unread_count}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
