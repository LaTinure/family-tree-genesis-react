import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Flag } from 'lucide-react';

const Report = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-8 pt-24">
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Flag className="w-8 h-8 text-red-600" />
          <CardTitle>Dénoncer un membre</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Rechercher un membre à signaler..." className="max-w-xs mb-4" />
          <div className="w-full mt-6 text-center text-gray-500">Formulaire de signalement à venir...</div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Report;
