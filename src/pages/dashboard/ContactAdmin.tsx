
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { Send, MessageSquare, AlertCircle } from 'lucide-react';

const ContactAdmin = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !message.trim()) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs',
        variant: 'destructive',
      });
      return;
    }

    if (!user) {
      toast({
        title: 'Erreur',
        description: 'Vous devez être connecté pour contacter un administrateur',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Créer une notification pour l'administrateur
      await api.notifications.create({
        title: `Contact Admin: ${subject}`,
        message: message,
        type: 'info',
        user_id: user.id,
        read: false,
        family_id: 'default-family'
      });

      toast({
        title: 'Message envoyé',
        description: 'Votre message a été envoyé aux administrateurs',
      });

      // Réinitialiser le formulaire
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer le message. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 to-white p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* En-tête */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-whatsapp-800 mb-2">
            Contacter un Administrateur
          </h1>
          <p className="text-lg text-whatsapp-600">
            Envoyez un message aux administrateurs de votre famille
          </p>
        </div>

        {/* Formulaire de contact */}
        <Card className="border-whatsapp-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-whatsapp-700">
              <MessageSquare className="w-5 h-5" />
              Nouveau Message
            </CardTitle>
            <CardDescription>
              Décrivez votre demande ou problème en détail
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Résumez votre demande en quelques mots"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="border-whatsapp-300 focus:border-whatsapp-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Décrivez votre demande, problème ou suggestion en détail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="border-whatsapp-300 focus:border-whatsapp-500"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-whatsapp-600 hover:bg-whatsapp-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer le message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Informations supplémentaires */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium text-blue-800 mb-2">
                  Informations importantes
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Les administrateurs recevront une notification de votre message</li>
                  <li>• Vous recevrez une réponse dans les plus brefs délais</li>
                  <li>• Pour les urgences, contactez directement un administrateur</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactAdmin;
