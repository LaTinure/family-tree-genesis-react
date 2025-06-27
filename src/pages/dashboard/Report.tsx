
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Flag, AlertTriangle } from 'lucide-react';
import { api } from '@/services/api';
import { FamilyMember } from '@/types/family';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const Report = () => {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [reportedMember, setReportedMember] = useState<string>('');
  const [reportType, setReportType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const reportTypes = [
    { value: 'inappropriate_content', label: 'Contenu inapproprié' },
    { value: 'harassment', label: 'Harcèlement' },
    { value: 'fake_profile', label: 'Faux profil' },
    { value: 'spam', label: 'Spam' },
    { value: 'other', label: 'Autre' }
  ];

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
    if (!reportedMember || !reportType || !description) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Créer une notification pour les admins
      await api.notifications.create({
        title: 'Nouveau signalement',
        message: `Membre signalé: ${reportedMember}\nType: ${reportType}\nDescription: ${description}\nSignalé par: ${user?.email}`,
        type: 'warning',
        user_id: 'admin',
        read: false,
      });

      toast({
        title: 'Signalement envoyé',
        description: 'Votre signalement a été transmis aux administrateurs',
      });

      // Reset form
      setReportedMember('');
      setReportType('');
      setDescription('');
    } catch (error) {
      console.error('Erreur lors du signalement:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer le signalement',
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
          <h1 className="text-3xl font-bold text-red-600 flex items-center">
            <Flag className="mr-3 h-8 w-8" />
            Signaler un Problème
          </h1>
          <p className="text-gray-600 mt-2">
            Signalez tout comportement inapproprié ou problème dans la communauté
          </p>
        </div>

        <Card className="max-w-2xl mx-auto border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-700 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Formulaire de Signalement
            </CardTitle>
            <CardDescription>
              Utilisez ce formulaire de manière responsable. Les faux signalements peuvent entraîner des sanctions.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="reported-member" className="block text-sm font-medium text-gray-700 mb-2">
                  Membre à signaler *
                </label>
                <Select value={reportedMember} onValueChange={setReportedMember}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le membre à signaler..." />
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
                <label htmlFor="report-type" className="block text-sm font-medium text-gray-700 mb-2">
                  Type de signalement *
                </label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type de problème..." />
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

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description détaillée *
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez le problème en détail, incluez des dates et contextes si possible..."
                  rows={6}
                  required
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800">Rappel Important</p>
                    <p className="text-yellow-700 mt-1">
                      Ce signalement sera examiné par l'équipe d'administration. 
                      Assurez-vous de fournir des informations exactes et vérifiables.
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? 'Envoi du signalement...' : 'Envoyer le signalement'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Report;
