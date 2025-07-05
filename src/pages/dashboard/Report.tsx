
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { AlertTriangle, Flag, Send } from 'lucide-react';

const Report = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [reportType, setReportType] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportTypes = [
    { value: 'inappropriate_content', label: 'Contenu inapproprié' },
    { value: 'spam', label: 'Spam ou contenu indésirable' },
    { value: 'harassment', label: 'Harcèlement' },
    { value: 'privacy_violation', label: 'Violation de la vie privée' },
    { value: 'technical_issue', label: 'Problème technique' },
    { value: 'other', label: 'Autre' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportType || !subject.trim() || !description.trim()) {
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
        description: 'Vous devez être connecté pour signaler un problème',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Créer une notification de signalement pour les administrateurs
      await api.notifications.create({
        title: `Signalement: ${subject}`,
        message: `Type: ${reportTypes.find(t => t.value === reportType)?.label}\n\nDescription: ${description}`,
        type: 'warning',
        user_id: user.id,
        read: false,
        family_id: 'default-family'
      });

      toast({
        title: 'Signalement envoyé',
        description: 'Votre signalement a été transmis aux administrateurs',
      });

      // Réinitialiser le formulaire
      setReportType('');
      setSubject('');
      setDescription('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du signalement:', error);
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
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 to-white p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* En-tête */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-whatsapp-800 mb-2">
            Signaler un Problème
          </h1>
          <p className="text-lg text-whatsapp-600">
            Aidez-nous à maintenir un environnement sûr et respectueux
          </p>
        </div>

        {/* Formulaire de signalement */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Flag className="w-5 h-5" />
              Nouveau Signalement
            </CardTitle>
            <CardDescription>
              Décrivez le problème que vous souhaitez signaler
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="reportType">Type de signalement</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="border-orange-300 focus:border-orange-500">
                    <SelectValue placeholder="Sélectionnez le type de problème" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Résumez le problème en quelques mots"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="border-orange-300 focus:border-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description détaillée</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez le problème en détail, incluez les circonstances, les personnes impliquées, etc..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="border-orange-300 focus:border-orange-500"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-700"
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
            </form>
          </CardContent>
        </Card>

        {/* Avertissement */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
              <div>
                <h3 className="font-medium text-red-800 mb-2">
                  Avertissement
                </h3>
                <p className="text-sm text-red-700">
                  Les signalements abusifs ou répétés sans fondement peuvent entraîner des sanctions. 
                  Assurez-vous que votre signalement est justifié et fourni des informations précises.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Report;
