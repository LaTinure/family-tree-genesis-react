import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/services/api';
import { ProfileData } from '@/types/profile';
import { Flag, Send, AlertTriangle, Users } from 'lucide-react';

const reportReasons = [
  { value: 'spam', label: 'Spam ou contenu indésirable' },
  { value: 'harassment', label: 'Harcèlement' },
  { value: 'inappropriate', label: 'Contenu inapproprié' },
  { value: 'fake', label: 'Fausses informations' },
  { value: 'privacy', label: 'Violation de la vie privée' },
  { value: 'other', label: 'Autre' },
];

const Report = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [members, setMembers] = useState<ProfileData[]>([]);
  const [selectedMember, setSelectedMember] = useState<ProfileData | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const allMembers = await api.profiles.getAll();
        setMembers(allMembers);
      } catch (error) {
        console.error('Erreur lors de la récupération des membres:', error);
      }
    };

    fetchMembers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMember || !reportReason || !description.trim()) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs obligatoires.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Créer une notification pour les admins
      await api.notifications.create({
        user_id: user?.id || '',
        type: 'warning',
        title: 'Nouveau signalement',
        message: `Signalement de ${selectedMember.first_name} ${selectedMember.last_name} pour: ${reportReasons.find(r => r.value === reportReason)?.label}`,
        read: false,
        data: {
          reported_user_id: selectedMember.user_id,
          reported_user_name: `${selectedMember.first_name} ${selectedMember.last_name}`,
          reason: reportReason,
          description: description,
          reporter_id: user?.id || '',
        },
      });

      toast({
        title: 'Signalement envoyé',
        description: 'Votre signalement a été transmis aux administrateurs.',
      });

      // Réinitialiser le formulaire
      setSelectedMember(null);
      setReportReason('');
      setDescription('');
    } catch (error) {
      console.error('Erreur lors du signalement:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer le signalement. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-6">
      <div className="container mx-auto max-w-2xl">
        <Card className="border-red-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-red-700">
              <Flag className="w-6 h-6" />
              Signaler un membre
            </CardTitle>
            <CardDescription>
              Signalez un comportement inapproprié ou du contenu problématique. 
              Votre signalement sera examiné par les administrateurs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="member">Membre à signaler *</Label>
                <Select value={selectedMember?.id || ''} onValueChange={(value) => {
                  const member = members.find(m => m.id === value);
                  setSelectedMember(member || null);
                }}>
                  <SelectTrigger className="border-red-200 focus:border-red-500">
                    <SelectValue placeholder="Sélectionner un membre" />
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

              <div className="space-y-2">
                <Label htmlFor="reason">Raison du signalement *</Label>
                <Select value={reportReason} onValueChange={setReportReason}>
                  <SelectTrigger className="border-red-200 focus:border-red-500">
                    <SelectValue placeholder="Sélectionner une raison" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportReasons.map((reason) => (
                      <SelectItem key={reason.value} value={reason.value}>
                        {reason.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description détaillée *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez en détail le problème rencontré..."
                  required
                  rows={5}
                  className="border-red-200 focus:border-red-500"
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  Les signalements abusifs ou répétés peuvent entraîner des sanctions. 
                  Utilisez cette fonction de manière responsable.
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer le signalement
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Membres disponibles ({members.length})
                </span>
              </div>
              <p className="text-xs text-blue-700">
                Vous pouvez signaler tout membre de la famille en cas de comportement inapproprié.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Report;
