import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';

const Events = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-8 pt-24">
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Calendar className="w-8 h-8 text-green-600" />
          <CardTitle>Événements familiaux</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Rechercher un événement..." className="max-w-xs mb-4" />
          <div className="w-full mt-6 text-center text-gray-500">Aucun événement à venir.</div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Events;
