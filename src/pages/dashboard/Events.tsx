
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, Plus, MapPin, Clock, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/services/api';
import { FamilyMember } from '@/types/family';
import { UserAvatar } from '@/components/shared/UserAvatar';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface FamilyEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: FamilyMember;
  attendees: FamilyMember[];
}

const Events = () => {
  const { user } = useAuth();
  const [currentProfile, setCurrentProfile] = useState<FamilyMember | null>(null);
  const [events, setEvents] = useState<FamilyEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const profile = await api.profiles.getCurrent();
          setCurrentProfile(profile);
          
          if (profile) {
            const mockEvents: FamilyEvent[] = [
              {
                id: '1',
                title: 'Réunion familiale annuelle',
                description: 'Grande réunion de toute la famille pour célébrer les fêtes',
                date: '2024-12-25',
                location: 'Maison familiale, Paris',
                organizer: profile,
                attendees: [profile]
              },
              {
                id: '2',
                title: 'Anniversaire de Grand-mère',
                description: 'Célébration des 80 ans de notre chère grand-mère',
                date: '2024-07-15',
                location: 'Restaurant Le Jardin',
                organizer: profile,
                attendees: [profile]
              }
            ];
            setEvents(mockEvents);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">Chargement...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-8 h-8 text-green-600" />
              <CardTitle>Événements familiaux</CardTitle>
            </div>
            <Button className="bg-whatsapp-600 hover:bg-whatsapp-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouvel événement
            </Button>
          </CardHeader>
          <CardContent>
            <Input 
              placeholder="Rechercher un événement..." 
              className="max-w-xs mb-6"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {filteredEvents.length === 0 ? (
              <div className="w-full mt-6 text-center text-gray-500">
                {searchQuery ? 'Aucun événement trouvé.' : 'Aucun événement à venir.'}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {event.description}
                          </p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="w-4 h-4 mr-2" />
                              {formatDate(event.date)}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="w-4 h-4 mr-2" />
                              {event.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="w-4 h-4 mr-2" />
                              {event.attendees.length} participant(s)
                            </div>
                          </div>
                        </div>
                        
                        <div className="ml-4">
                          <div className="text-sm text-gray-500 mb-2">Organisé par</div>
                          <div className="flex items-center space-x-2">
                            <UserAvatar
                              user={{
                                first_name: event.organizer.first_name,
                                last_name: event.organizer.last_name,
                                avatar_url: event.organizer.avatar_url,
                                photo_url: event.organizer.photo_url,
                              }}
                              size="sm"
                            />
                            <span className="text-sm font-medium">
                              {event.organizer.first_name} {event.organizer.last_name}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <div className="flex -space-x-2">
                            {event.attendees.slice(0, 3).map((attendee, index) => (
                              <UserAvatar
                                key={attendee.id}
                                user={{
                                  first_name: attendee.first_name,
                                  last_name: attendee.last_name,
                                  avatar_url: attendee.avatar_url,
                                  photo_url: attendee.photo_url,
                                }}
                                size="sm"
                                className="border-2 border-white"
                              />
                            ))}
                            {event.attendees.length > 3 && (
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white">
                                +{event.attendees.length - 3}
                              </div>
                            )}
                          </div>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">
                              Détails
                            </Button>
                            <Button className="bg-whatsapp-600 hover:bg-whatsapp-700" size="sm">
                              Participer
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Events;
