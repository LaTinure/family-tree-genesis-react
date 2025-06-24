
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Mail, Link, Send, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Invite = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [inviteForm, setInviteForm] = useState({
    email: '',
    first_name: '',
    last_name: '',
    relationship_type: 'fils',
    personal_message: '',
  });
  const [inviteLink, setInviteLink] = useState('');
  const [sending, setSending] = useState(false);

  const handleEmailInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      // Simuler l'envoi d'invitation par email
      setTimeout(() => {
        toast({
          title: 'Invitation envoyée',
          description: `Une invitation a été envoyée à ${inviteForm.email}`,
        });
        
        // Reset form
        setInviteForm({
          email: '',
          first_name: '',
          last_name: '',
          relationship_type: 'fils',
          personal_message: '',
        });
        
        setSending(false);
      }, 1000);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer l\'invitation',
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <UserPlus className="mr-3 h-8 w-8 text-green-600" />
            Inviter des Membres
          </h1>
          <p className="text-gray-600 mt-2">
            Agrandissez votre famille en invitant de nouveaux membres
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Invitation par email */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Invitation par Email
              </CardTitle>
              <CardDescription>
                Envoyez une invitation personnalisée par email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailInvite} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">Prénom</Label>
                    <Input
                      id="first_name"
                      value={inviteForm.first_name}
                      onChange={(e) => setInviteForm({ ...inviteForm, first_name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Nom</Label>
                    <Input
                      id="last_name"
                      value={inviteForm.last_name}
                      onChange={(e) => setInviteForm({ ...inviteForm, last_name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="relationship_type">Relation familiale</Label>
                  <Select
                    value={inviteForm.relationship_type}
                    onValueChange={(value) => setInviteForm({ ...inviteForm, relationship_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fils">Fils</SelectItem>
                      <SelectItem value="fille">Fille</SelectItem>
                      <SelectItem value="père">Père</SelectItem>
                      <SelectItem value="mère">Mère</SelectItem>
                      <SelectItem value="cousin">Cousin</SelectItem>
                      <SelectItem value="cousine">Cousine</SelectItem>
                      <SelectItem value="oncle">Oncle</SelectItem>
                      <SelectItem value="tante">Tante</SelectItem>
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
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={sending}>
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer l'invitation
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Lien d'invitation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Link className="mr-2 h-5 w-5" />
                Lien d'Invitation
              </CardTitle>
              <CardDescription>
                Générez un lien d'invitation à partager
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Button onClick={generateInviteLink} variant="outline" className="w-full">
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
                      className="bg-gray-50 text-sm"
                    />
                    <Button onClick={copyInviteLink} variant="outline" size="icon">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Partagez ce lien avec la personne que vous souhaitez inviter. 
                    Le lien est valide pendant 7 jours.
                  </p>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Comment utiliser le lien d'invitation :
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Copiez le lien généré</li>
                  <li>• Partagez-le par email, SMS ou réseaux sociaux</li>
                  <li>• La personne clique sur le lien pour s'inscrire</li>
                  <li>• Elle sera automatiquement ajoutée à votre famille</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invitations récentes */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Invitations Récentes</CardTitle>
            <CardDescription>
              Suivez le statut de vos invitations envoyées
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <UserPlus className="h-12 w-12 mx-auto mb-4 text-gray-400" />
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
