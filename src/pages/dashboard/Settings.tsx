import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import {
  Settings,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Save,
  User,
  Lock,
  Palette,
  Globe,
  Smartphone,
  Mail,
  Trash2,
  Download,
  Upload
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const SettingsPage = () => {
  const { profile, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // États pour les paramètres
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      familyUpdates: true,
      events: true,
      messages: true
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false,
      showLocation: true,
      allowContact: true
    },
    appearance: {
      theme: 'light',
      language: 'fr',
      fontSize: 'medium'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      autoLogout: true
    }
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [loading, setLoading] = useState(false);

  // Gestionnaires pour les paramètres
  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const handleAppearanceChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [key]: value
      }
    }));
  };

  const handleSecurityChange = (key: string, value: boolean | number) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value
      }
    }));
  };

  // Sauvegarder les paramètres
  const saveSettings = async () => {
    setLoading(true);
    try {
      // Ici vous pouvez sauvegarder les paramètres dans Supabase
      // Par exemple, dans une table user_settings

      toast({
        title: 'Paramètres sauvegardés',
        description: 'Vos préférences ont été mises à jour avec succès.',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de sauvegarder les paramètres.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Changer le mot de passe
  const changePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: 'Erreur',
        description: 'Les nouveaux mots de passe ne correspondent pas.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.new
      });

      if (error) throw error;

      toast({
        title: 'Mot de passe mis à jour',
        description: 'Votre mot de passe a été changé avec succès.',
      });

      setPasswords({ current: '', new: '', confirm: '' });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de changer le mot de passe.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Supprimer le compte
  const deleteAccount = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.admin.deleteUser(user?.id || '');

      if (error) throw error;

      toast({
        title: 'Compte supprimé',
        description: 'Votre compte a été supprimé avec succès.',
      });

      navigate('/');
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le compte.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-8 pt-24">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* En-tête */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            <Settings className="w-8 h-8 text-blue-600" />
            Paramètres
          </h1>
          <p className="text-gray-600">Gérez vos préférences et votre compte</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Notifications */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                Notifications
              </CardTitle>
              <CardDescription>
                Configurez vos préférences de notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <Label>Notifications par email</Label>
                </div>
                <Switch
                  checked={settings.notifications.email}
                  onCheckedChange={(value) => handleNotificationChange('email', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-gray-500" />
                  <Label>Notifications push</Label>
                </div>
                <Switch
                  checked={settings.notifications.push}
                  onCheckedChange={(value) => handleNotificationChange('push', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <Label>Mises à jour familiales</Label>
                </div>
                <Switch
                  checked={settings.notifications.familyUpdates}
                  onCheckedChange={(value) => handleNotificationChange('familyUpdates', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <Label>Événements familiaux</Label>
                </div>
                <Switch
                  checked={settings.notifications.events}
                  onCheckedChange={(value) => handleNotificationChange('events', value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Confidentialité */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Confidentialité
              </CardTitle>
              <CardDescription>
                Contrôlez la visibilité de vos informations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Profil visible</Label>
                <Switch
                  checked={settings.privacy.profileVisible}
                  onCheckedChange={(value) => handlePrivacyChange('profileVisible', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Afficher l'email</Label>
                <Switch
                  checked={settings.privacy.showEmail}
                  onCheckedChange={(value) => handlePrivacyChange('showEmail', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Afficher le téléphone</Label>
                <Switch
                  checked={settings.privacy.showPhone}
                  onCheckedChange={(value) => handlePrivacyChange('showPhone', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Afficher la localisation</Label>
                <Switch
                  checked={settings.privacy.showLocation}
                  onCheckedChange={(value) => handlePrivacyChange('showLocation', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Autoriser les contacts</Label>
                <Switch
                  checked={settings.privacy.allowContact}
                  onCheckedChange={(value) => handlePrivacyChange('allowContact', value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Apparence */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-600" />
                Apparence
              </CardTitle>
              <CardDescription>
                Personnalisez l'interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Thème</Label>
                <Select
                  value={settings.appearance.theme}
                  onValueChange={(value) => handleAppearanceChange('theme', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Clair</SelectItem>
                    <SelectItem value="dark">Sombre</SelectItem>
                    <SelectItem value="auto">Automatique</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Langue</Label>
                <Select
                  value={settings.appearance.language}
                  onValueChange={(value) => handleAppearanceChange('language', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Taille de police</Label>
                <Select
                  value={settings.appearance.fontSize}
                  onValueChange={(value) => handleAppearanceChange('fontSize', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Petite</SelectItem>
                    <SelectItem value="medium">Moyenne</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-600" />
                Sécurité
              </CardTitle>
              <CardDescription>
                Protégez votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Authentification à deux facteurs</Label>
                <Switch
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(value) => handleSecurityChange('twoFactorAuth', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Déconnexion automatique</Label>
                <Switch
                  checked={settings.security.autoLogout}
                  onCheckedChange={(value) => handleSecurityChange('autoLogout', value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Délai de session (minutes)</Label>
                <Select
                  value={settings.security.sessionTimeout.toString()}
                  onValueChange={(value) => handleSecurityChange('sessionTimeout', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 heure</SelectItem>
                    <SelectItem value="120">2 heures</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Changement de mot de passe */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-600" />
              Changer le mot de passe
            </CardTitle>
            <CardDescription>
              Mettez à jour votre mot de passe pour plus de sécurité
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Mot de passe actuel</Label>
                <div className="relative">
                  <Input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwords.current}
                    onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                    placeholder="Mot de passe actuel"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Nouveau mot de passe</Label>
                <div className="relative">
                  <Input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwords.new}
                    onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                    placeholder="Nouveau mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Confirmer le nouveau mot de passe</Label>
                <div className="relative">
                  <Input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwords.confirm}
                    onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                    placeholder="Confirmer le mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <Button onClick={changePassword} disabled={loading} className="w-full md:w-auto">
              <Save className="w-4 h-4 mr-2" />
              Changer le mot de passe
            </Button>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex gap-4">
            <Button onClick={saveSettings} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder les paramètres
            </Button>

            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Retour au dashboard
            </Button>
          </div>

          <Button
            variant="destructive"
            onClick={deleteAccount}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Supprimer le compte
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
