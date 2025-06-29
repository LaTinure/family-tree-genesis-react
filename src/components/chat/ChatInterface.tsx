
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/shared/Avatar';
import { Send, Phone, Video, MoreVertical, Paperclip, Smile, Mic } from 'lucide-react';
import { Message, ChatContact, TypingIndicator } from '@/types/chat';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatInterfaceProps {
  selectedContact: ChatContact | null;
  messages: Message[];
  onSendMessage: (content: string, type?: 'text' | 'image' | 'file') => void;
  onTyping: (isTyping: boolean) => void;
  typingUsers: TypingIndicator[];
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  selectedContact,
  messages,
  onSendMessage,
  onTyping,
  typingUsers
}) => {
  const { user } = useAuth();
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-scroll vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Gestion de la frappe
  const handleInputChange = (value: string) => {
    setMessageInput(value);
    
    if (!isTyping && value.trim()) {
      setIsTyping(true);
      onTyping(true);
    }

    // Reset du timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Arrêter l'indicateur après 3 secondes d'inactivité
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      onTyping(false);
    }, 3000);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      onSendMessage(messageInput.trim());
      setMessageInput('');
      setIsTyping(false);
      onTyping(false);
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageTime = (timestamp: Date) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    
    // Même jour
    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
    
    // Cette semaine
    const daysDiff = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff < 7) {
      return messageDate.toLocaleDateString('fr-FR', { 
        weekday: 'short',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
    
    // Plus ancien
    return messageDate.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isCurrentUserTyping = typingUsers.some(t => 
    t.conversation_id === selectedContact?.conversation_id && 
    t.user_id !== user?.id && 
    t.is_typing
  );

  if (!selectedContact) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center text-gray-500">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-xl font-semibold mb-2">Sélectionnez une conversation</h3>
          <p>Choisissez un contact pour commencer à discuter</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      {/* En-tête du chat */}
      <CardHeader className="border-b bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar
              src={selectedContact.profile.photo_url || selectedContact.profile.avatar_url}
              fallback={`${selectedContact.profile.first_name[0]}${selectedContact.profile.last_name[0]}`}
              className="w-10 h-10"
            />
            <div>
              <h3 className="font-semibold">
                {selectedContact.profile.first_name} {selectedContact.profile.last_name}
              </h3>
              <p className="text-sm text-whatsapp-100">
                {selectedContact.profile.is_online ? (
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                    En ligne
                  </span>
                ) : (
                  selectedContact.profile.last_seen && 
                  `Vu ${formatDistanceToNow(selectedContact.profile.last_seen, { 
                    addSuffix: true, 
                    locale: fr 
                  })}`
                )}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-whatsapp-600">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-whatsapp-600">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-whatsapp-600">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Zone des messages */}
      <CardContent className="flex-1 p-0 relative">
        <ScrollArea className="h-full p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((message) => {
              const isOwn = message.sender_id === user?.id;
              
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                    isOwn 
                      ? 'bg-whatsapp-500 text-white' 
                      : 'bg-white text-gray-800 border'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <div className={`flex items-center justify-end space-x-1 mt-1 ${
                      isOwn ? 'text-whatsapp-100' : 'text-gray-500'
                    }`}>
                      <span className="text-xs">
                        {formatMessageTime(message.timestamp)}
                      </span>
                      {isOwn && (
                        <div className="flex space-x-1">
                          <div className={`w-3 h-3 ${
                            message.is_delivered ? 'text-blue-200' : 'text-gray-300'
                          }`}>
                            ✓
                          </div>
                          {message.is_read && (
                            <div className="w-3 h-3 text-blue-200">✓</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            {/* Indicateur de frappe */}
            <AnimatePresence>
              {isCurrentUserTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-200 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>
      </CardContent>

      {/* Zone de saisie */}
      <div className="border-t p-4 bg-white">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <Paperclip className="w-4 h-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Tapez votre message..."
              value={messageInput}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          
          {messageInput.trim() ? (
            <Button
              onClick={handleSendMessage}
              className="bg-whatsapp-500 hover:bg-whatsapp-600 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <Mic className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
