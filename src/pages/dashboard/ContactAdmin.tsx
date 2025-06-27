import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/services/api';
import { FamilyMember } from '@/types/family';
import { ProfileData } from '@/types/profile';
import { MessageCircle, Send, AlertCircle, CheckCircle } from 'lucide-react';

const ContactAdmin = () => {
  const { user, profile: currentProfile } = useAuth();
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('normal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [admins, setAdmins] = useState<ProfileData[]>([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const allMembers = await api.profiles.getAll();
        const adminMembers = allMembers.filter((member: FamilyMember) => member.is_admin);
        setAdmins(adminMembers);
      } catch (error) {
        console.error('Erreur lors de la récupération des admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject.trim() || !message.trim()) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs obligatoires.',
        variant: 'destructive',
      });
      return;
    }

    if (!currentProfile) {
      toast({
        title: 'Erreur',
        description: 'Profil utilisateur non trouvé.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Envoyer le message aux admins
      for (const admin of admins) {
        await api.notifications.create({
          user_id: admin.user_id,
          type: 'info',
          title: 'Nouveau message pour l\'administration',
          message: `${currentProfile?.first_name} ${currentProfile?.last_name} a envoyé un message: ${subject}`,
          read: false,
          data: {
            sender_id: currentProfile.user_id,
            sender_name: `${currentProfile.first_name} ${currentProfile.last_name}`,
            message_type: 'admin_contact',
            subject: subject,
          },
        });
      }

      toast({
        title: 'Message envoyé',
        description: 'Votre message a été envoyé aux administrateurs.',
      });

      // Réinitialiser le formulaire
      setSubject('');
      setMessage('');
      setPriority('normal');
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
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
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 via-green-50 to-emerald-50 p-6">
      <div className="container mx-auto max-w-2xl">
        <Card className="border-whatsapp-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-whatsapp-700">
              <MessageCircle className="w-6 h-6" />
              Contacter l'Administration
            </CardTitle>
            <CardDescription>
              Envoyez un message aux administrateurs de la famille. Ils vous répondront dans les plus brefs délais.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Sujet *</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Objet de votre message"
                  required
                  className="border-whatsapp-200 focus:border-whatsapp-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priorité</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="border-whatsapp-200 focus:border-whatsapp-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Basse</SelectItem>
                    <SelectItem value="normal">Normale</SelectItem>
                    <SelectItem value="high">Haute</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décrivez votre demande ou question..."
                  required
                  rows={6}
                  className="border-whatsapp-200 focus:border-whatsapp-500"
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  Votre message sera envoyé à tous les administrateurs de la famille. 
                  Vous recevrez une réponse par notification.
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-whatsapp-600 hover:bg-whatsapp-700 text-white"
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
              </div>
            </form>

            {admins.length > 0 && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Administrateurs disponibles ({admins.length})
                  </span>
                </div>
                <div className="text-xs text-green-700">
                  {admins.map(admin => `${admin.first_name} ${admin.last_name}`).join(', ')}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactAdmin;
