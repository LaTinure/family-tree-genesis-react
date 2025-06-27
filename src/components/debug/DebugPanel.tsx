import React from 'react';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Database, Users, AlertTriangle } from 'lucide-react';

export const DebugPanel = () => {
  const { members, isLoading, error, fetchMembers } = useFamilyMembers();

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <Database className="w-5 h-5" />
          Panel de Debug - Données des Membres
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="font-medium">Membres chargés: {members.length}</span>
          </div>
          <div className="flex items-center gap-2">
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <div className="w-4 h-4 rounded-full bg-green-500" />
            )}
            <span>{isLoading ? 'Chargement...' : 'Prêt'}</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={fetchMembers}
            disabled={isLoading}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-100 border border-red-300 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-red-800 text-sm">{error}</span>
          </div>
        )}

        {members.length > 0 ? (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            <h4 className="font-medium text-orange-800">Détails des membres:</h4>
            {members.map((member, index) => (
              <div key={member.id} className="p-3 bg-white border border-orange-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {index + 1}. {member.first_name} {member.last_name}
                    </p>
                    <p className="text-sm text-gray-600">{member.email}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p>ID: {member.id.substring(0, 8)}...</p>
                    <p>Rôle: {member.role}</p>
                    <p>Patriarche: {member.is_patriarch ? 'Oui' : 'Non'}</p>
                    <p>Admin: {member.is_admin ? 'Oui' : 'Non'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-orange-700">
            Aucun membre trouvé dans la base de données
          </div>
        )}
      </CardContent>
    </Card>
  );
};
