
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, MessageCircle, Link, Send, Copy, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Invite = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [inviteForm, setInviteForm] = useState({
    phone: '',
    first_name: '',
    last_name: '',
    relationship_type: 'fils',
    personal_message: '',
  });
  const [inviteLink, setInviteLink] = useState('');
  const [sending, setSending] = useState(false);

  const handleWhatsAppInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      // Créer le message WhatsApp
      const baseMessage = `🌳 *Invitation Famille Connect* 🌳\n\nSalut ${inviteForm.first_name} !\n\nJe t'invite à rejoindre notre arbre familial sur Famille Connect.\n\n`;
      const personalMessage = inviteForm.personal_message ? `💬 Message personnel :\n${inviteForm.personal_message}\n\n` : '';
      const inviteLink = `${window.location.origin}/auth/register?invite=${btoa(JSON.stringify({
        invited_by: profile?.id,
        relationship: inviteForm.relationship_type,
        timestamp: Date.now(),
      }))}`;
      const linkMessage = `🔗 Clique sur ce lien pour t'inscrire :\n${inviteLink}\n\n✨ Rejoins-nous pour partager nos souvenirs de famille !`;
      
      const fullMessage = encodeURIComponent(baseMessage + personalMessage + linkMessage);
      const whatsappUrl = `https://wa.me/${inviteForm.phone.replace(/[^0-9]/g, '')}?text=${fullMessage}`;
      
      // Ouvrir WhatsApp
      window.open(whatsappUrl, '_blank');

      toast({
        title: 'WhatsApp ouvert',
        description: `L'invitation pour ${inviteForm.first_name} est prête à être envoyée`,
      });

      // Reset form
      setInviteForm({
        phone: '',
        first_name: '',
        last_name: '',
        relationship_type: 'fils',
        personal_message: '',
      });

      setSending(false);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de préparer l\'invitation WhatsApp',
        variant: 'destructive',
      });
      setSending(false);
    }
  };

  const generateInviteLink = () => {
    const link = `${window.location.origin}/auth/register?invite=${btoa(JSON.stringify({
      invited_by: profile?.id,
      family_id: 'family_1',
      timestamp: Date.now(),
    }))}`;
    setInviteLink(link);

    toast({
      title: 'Lien généré',
      description: 'Le lien d\'invitation a été créé avec succès',
    });
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast({
      title: 'Lien copié',
      description: 'Le lien d\'invitation a été copié dans le presse-papiers',
    });
  };

  return (
    <div className="pt-16 pb-8">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <UserPlus className="mr-3 h-8 w-8 text-whatsapp-600" />
            Inviter des Membres
          </h1>
          <p className="text-gray-600 mt-2">
            Agrandissez votre famille en invitant de nouveaux membres via WhatsApp
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Invitation par WhatsApp */}
          <Card className="border-whatsapp-200">
            <CardHeader>
              <CardTitle className="flex items-center text-whatsapp-700">
                <MessageCircle className="mr-2 h-5 w-5" />
                Invitation par WhatsApp
              </CardTitle>
              <CardDescription>
                Envoyez une invitation personnalisée via WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWhatsAppInvite} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">Prénom</Label>
                    <Input
                      id="first_name"
                      value={inviteForm.first_name}
                      onChange={(e) => setInviteForm({ ...inviteForm, first_name: e.target.value })}
                      className="border-whatsapp-200 focus:border-whatsapp-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Nom</Label>
                    <Input
                      id="last_name"
                      value={inviteForm.last_name}
                      onChange={(e) => setInviteForm({ ...inviteForm, last_name: e.target.value })}
                      className="border-whatsapp-200 focus:border-whatsapp-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Numéro WhatsApp</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-whatsapp-500 w-4 h-4" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+33 6 12 34 56 78"
                      value={inviteForm.phone}
                      onChange={(e) => setInviteForm({ ...inviteForm, phone: e.target.value })}
                      className="pl-10 border-whatsapp-200 focus:border-whatsapp-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="relationship_type">Relation familiale</Label>
                  <Select
                    value={inviteForm.relationship_type}
                    onValueChange={(value) => setInviteForm({ ...inviteForm, relationship_type: value })}
                  >
                    <SelectTrigger className="border-whatsapp-200 focus:border-whatsapp-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fils">Fils</SelectItem>
                      <SelectItem value="fille">Fille</SelectItem>
                      <SelectItem value="pere">Père</SelectItem>
                      <SelectItem value="mere">Mère</SelectItem>
                      <SelectItem value="cousin">Cousin</SelectItem>
                      <SelectItem value="cousine">Cousine</SelectItem>
                      <SelectItem value="oncle">Oncle</SelectItem>
                      <SelectItem value="tante">Tante</SelectItem>
                      <SelectItem value="epoux">Époux</SelectItem>
                      <SelectItem value="epouse">Épouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="personal_message">Message personnel (optionnel)</Label>
                  <Textarea
                    id="personal_message"
                    value={inviteForm.personal_message}
                    onChange={(e) => setInviteForm({ ...inviteForm, personal_message: e.target.value })}
                    placeholder="Ajoutez un message personnel à votre invitation..."
                    className="border-whatsapp-200 focus:border-whatsapp-500"
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full bg-whatsapp-600 hover:bg-whatsapp-700" disabled={sending}>
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Préparation...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Envoyer via WhatsApp
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Lien d'invitation */}
          <Card className="border-whatsapp-200">
            <CardHeader>
              <CardTitle className="flex items-center text-whatsapp-700">
                <Link className="mr-2 h-5 w-5" />
                Lien d'Invitation
              </CardTitle>
              <CardDescription>
                Générez un lien d'invitation à partager
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Button onClick={generateInviteLink} variant="outline" className="w-full border-whatsapp-300 text-whatsapp-700 hover:bg-whatsapp-50">
                  <Link className="w-4 h-4 mr-2" />
                  Générer un lien d'invitation
                </Button>
              </div>

              {inviteLink && (
                <div className="space-y-3">
                  <Label>Lien d'invitation généré :</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={inviteLink}
                      readOnly
                      className="bg-whatsapp-50 text-sm border-whatsapp-200"
                    />
                    <Button onClick={copyInviteLink} variant="outline" size="icon" className="border-whatsapp-300 text-whatsapp-700 hover:bg-whatsapp-50">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Partagez ce lien avec la personne que vous souhaitez inviter.
                    Le lien est valide pendant 7 jours.
                  </p>
                </div>
              )}

              <div className="bg-whatsapp-50 p-4 rounded-lg border border-whatsapp-200">
                <h4 className="font-semibold text-whatsapp-800 mb-2">
                  Comment utiliser le lien d'invitation :
                </h4>
                <ul className="text-sm text-whatsapp-700 space-y-1">
                  <li>• Copiez le lien généré</li>
                  <li>• Partagez-le via WhatsApp, SMS ou réseaux sociaux</li>
                  <li>• La personne clique sur le lien pour s'inscrire</li>
                  <li>• Elle sera automatiquement ajoutée à votre famille</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invitations récentes */}
        <Card className="mt-8 border-whatsapp-200">
          <CardHeader>
            <CardTitle className="text-whatsapp-700">Invitations Récentes</CardTitle>
            <CardDescription>
              Suivez le statut de vos invitations envoyées
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-whatsapp-400" />
              <p>Aucune invitation récente</p>
              <p className="text-sm">Les invitations que vous enverrez apparaîtront ici</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Invite;
