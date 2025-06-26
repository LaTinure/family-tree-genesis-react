
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Flag, AlertTriangle, Send, Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/services/api';
import { ProfileData } from '@/types/profile';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { useToast } from '@/hooks/use-toast';

const Report = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [members, setMembers] = useState<ProfileData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<ProfileData | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const reportReasons = [
    { value: 'inappropriate_content', label: 'Contenu inapproprié' },
    { value: 'harassment', label: 'Harcèlement' },
    { value: 'spam', label: 'Spam' },
    { value: 'fake_profile', label: 'Faux profil' },
    { value: 'other', label: 'Autre' }
  ];

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

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember || !reportReason || !reportDescription.trim()) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs obligatoires',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      // Créer une notification pour les admins
      await api.notifications.create({
        user_id: user?.id || '',
        type: 'report',
        title: 'Nouveau signalement',
        message: `Signalement de ${selectedMember.first_name} ${selectedMember.last_name} pour: ${reportReasons.find(r => r.value === reportReason)?.label}`,
        data: {
          reported_user_id: selectedMember.id,
          reported_user_name: `${selectedMember.first_name} ${selectedMember.last_name}`,
          reason: reportReason,
          description: reportDescription,
          reporter_id: user?.id
        }
      });

      toast({
        title: 'Signalement envoyé',
        description: 'Votre signalement a été transmis aux administrateurs',
      });

      // Reset du formulaire
      setSelectedMember(null);
      setReportReason('');
      setReportDescription('');
      setSearchQuery('');
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer le signalement',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
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
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Flag className="w-8 h-8 text-red-600" />
            <div>
              <CardTitle>Signaler un membre</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Utilisez ce formulaire pour signaler un comportement inapproprié
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Alerte d'information */}
              <div className="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Information importante</p>
                  <p>
                    Les signalements sont traités de manière confidentielle par notre équipe d'administration. 
                    Veillez à fournir des informations précises et détaillées.
                  </p>
                </div>
              </div>

              {/* Recherche de membre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rechercher le membre à signaler
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Nom, prénom ou email du membre..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Liste des membres filtrés */}
              {searchQuery && (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => {
                        setSelectedMember(member);
                        setSearchQuery(`${member.first_name} ${member.last_name}`);
                      }}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedMember?.id === member.id
                          ? 'bg-red-50 border border-red-200'
                          : 'hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <UserAvatar
                        user={{
                          first_name: member.first_name,
                          last_name: member.last_name,
                          avatar_url: member.avatar_url,
                        }}
                        size="sm"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {member.first_name} {member.last_name}
                        </p>
                        <p className="text-sm text-gray-600">{member.email}</p>
                      </div>
                    </div>
                  ))}
                  {filteredMembers.length === 0 && (
                    <p className="text-center text-gray-500 py-4">Aucun membre trouvé</p>
                  )}
                </div>
              )}

              {/* Formulaire de signalement */}
              {selectedMember && (
                <form onSubmit={handleSubmitReport} className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800">
                    Signalement de {selectedMember.first_name} {selectedMember.last_name}
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Motif du signalement *
                    </label>
                    <Select value={reportReason} onValueChange={setReportReason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un motif" />
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description détaillée *
                    </label>
                    <Textarea
                      placeholder="Décrivez précisément le comportement ou le contenu que vous souhaitez signaler..."
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setSelectedMember(null);
                        setReportReason('');
                        setReportDescription('');
                        setSearchQuery('');
                      }}
                    >
                      Annuler
                    </Button>
                    <Button 
                      type="submit"
                      disabled={submitting || !reportReason || !reportDescription.trim()}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Envoi...
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
              )}

              {!selectedMember && !searchQuery && (
                <div className="w-full mt-6 text-center text-gray-500">
                  Recherchez d'abord le membre que vous souhaitez signaler
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Report;
