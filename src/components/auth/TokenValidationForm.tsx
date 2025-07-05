
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';

interface TokenValidationFormProps {
  onTokenValidated: (token: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const TokenValidationForm: React.FC<TokenValidationFormProps> = ({
  onTokenValidated,
  isLoading,
  error
}) => {
  const [token, setToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      onTokenValidated(token.trim());
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto p-3 bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <Key className="w-8 h-8 text-blue-600" />
        </div>
        <CardTitle className="text-xl">Token d'invitation requis</CardTitle>
        <CardDescription>
          Saisissez le token d'invitation que vous avez reçu pour rejoindre votre dynastie familiale.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="token">Token d'invitation</Label>
            <Input
              id="token"
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Collez votre token d'invitation ici"
              disabled={isLoading}
              className="font-mono text-sm"
            />
          </div>

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-red-800">
                {error === 'Invitation invalide' 
                  ? 'Token d\'invitation invalide ou expiré. Contactez l\'administrateur de la dynastie.'
                  : error
                }
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={!token.trim() || isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Validation en cours...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Valider le token
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="mb-2">Le token vous a été envoyé par :</p>
          <ul className="space-y-1 text-xs">
            <li>• Email d'invitation</li>
            <li>• Message WhatsApp</li>
            <li>• Lien partagé par un membre</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
