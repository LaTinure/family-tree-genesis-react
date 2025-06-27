
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle } from 'lucide-react';
import { api } from '@/services/api';
import { FamilyMember } from '@/types/family';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const ContactAdmin = () => {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const fetchedMembers = await api.profiles.getAll();
        setMembers(fetchedMembers);
      } catch (error) {
        console.error('Erreur lors de la récupération des membres:', error);
      }
    };
    fetchMembers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember || !subject || !message) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Créer une notification pour l'admin
      await api.notifications.create({
        title: `Contact Admin: ${subject}`,
        message: `De: ${user?.email}\nMembre concerné: ${selectedMember}\n\n${message}`,
        type: 'info',
        user_id: selectedMember,
        read: false,
      });

      toast({
        title: 'Message envoyé',
        description: 'Votre message a été envoyé à l\'administrateur',
      });

      // Reset form
      setSelectedMember('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer le message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-whatsapp-700 flex items-center">
            <MessageCircle className="mr-3 h-8 w-8" />
            Contacter l'Administrateur
          </h1>
          <p className="text-gray-600 mt-2">
            Envoyez un message directement aux administrateurs de la famille
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Formulaire de Contact</CardTitle>
            <CardDescription>
              Remplissez ce formulaire pour contacter l'équipe d'administration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="member" className="block text-sm font-medium text-gray-700 mb-2">
                  Membre concerné (optionnel)
                </label>
                <Select value={selectedMember} onValueChange={setSelectedMember}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un membre..." />
                  </SelectTrigger>
                  <SelectContent>
                    {members.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.first_name} {member.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Sujet *
                </label>
                <Input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Objet de votre message"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décrivez votre demande ou problème en détail..."
                  rows={6}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-whatsapp-600 hover:bg-whatsapp-700"
                disabled={isLoading}
              >
                {isLoading ? 'Envoi en cours...' : 'Envoyer le message'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ContactAdmin;
