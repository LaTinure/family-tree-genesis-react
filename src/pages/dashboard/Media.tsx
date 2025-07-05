
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Media } from '@/types/family';
import { Play, Plus, Clock, Calendar, User, Trash2, Upload, Video, Eye, ThumbsUp, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const MediaPage = () => {
  const { profile, user } = useAuth();
  const { toast } = useToast();
  const [medias, setMedias] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newMedia, setNewMedia] = useState({
    title: '',
    description: '',
    video_url: '',
    thumbnail_url: ''
  });
  const [uploading, setUploading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    fetchMedias();
  }, []);

  const fetchMedias = async () => {
    try {
      const { data, error } = await supabase
        .from('medias')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedias(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des médias:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les médias',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addMedia = async () => {
    if (!user || !newMedia.title || !newMedia.video_url) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir au moins le titre et l\'URL de la vidéo',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    try {
      const { error } = await supabase
        .from('medias')
        .insert([{
          title: newMedia.title,
          description: newMedia.description,
          video_url: newMedia.video_url,
          thumbnail_url: newMedia.thumbnail_url,
          created_by: user.id
        }]);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Média ajouté avec succès',
      });

      setNewMedia({ title: '', description: '', video_url: '', thumbnail_url: '' });
      setShowAddDialog(false);
      fetchMedias();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du média:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'ajouter le média',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const deleteMedia = async (mediaId: string) => {
    if (!canManageMedia()) {
      toast({
        title: 'Erreur',
        description: 'Vous n\'avez pas les permissions pour supprimer des médias',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('medias')
        .delete()
        .eq('id', mediaId);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Média supprimé avec succès',
      });

      fetchMedias();
    } catch (error) {
      console.error('Erreur lors de la suppression du média:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le média',
        variant: 'destructive',
      });
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getVideoThumbnail = (videoUrl: string, thumbnailUrl?: string) => {
    if (thumbnailUrl) return thumbnailUrl;
    
    // Générer une vignette pour YouTube
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      const videoId = videoUrl.includes('youtu.be') 
        ? videoUrl.split('/').pop()?.split('?')[0]
        : videoUrl.split('v=')[1]?.split('&')[0];
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    }
    
    return '/images/video-placeholder.jpg';
  };

  const getEmbedUrl = (videoUrl: string) => {
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      const videoId = videoUrl.includes('youtu.be') 
        ? videoUrl.split('/').pop()?.split('?')[0]
        : videoUrl.split('v=')[1]?.split('&')[0];
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    return videoUrl;
  };

  const canManageMedia = () => {
    return profile?.user_role && ['Administrateur', 'Patriarche', 'Matriarche'].includes(profile.user_role);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-red-600 font-medium">Chargement des médias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
      {/* Header inspiré YouTube */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Video className="w-8 h-8 text-red-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Médiathèque Familiale
                </h1>
                <p className="text-sm text-gray-600">
                  {medias.length} vidéo{medias.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            {canManageMedia() && (
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une vidéo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Ajouter une nouvelle vidéo
                    </DialogTitle>
                    <DialogDescription>
                      Ajoutez une vidéo à la médiathèque familiale
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Titre *</Label>
                      <Input
                        id="title"
                        value={newMedia.title}
                        onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                        placeholder="Titre de la vidéo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newMedia.description}
                        onChange={(e) => setNewMedia({ ...newMedia, description: e.target.value })}
                        placeholder="Description de la vidéo"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="video_url">URL de la vidéo *</Label>
                      <Input
                        id="video_url"
                        value={newMedia.video_url}
                        onChange={(e) => setNewMedia({ ...newMedia, video_url: e.target.value })}
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="thumbnail_url">URL de la vignette (optionnel)</Label>
                      <Input
                        id="thumbnail_url"
                        value={newMedia.thumbnail_url}
                        onChange={(e) => setNewMedia({ ...newMedia, thumbnail_url: e.target.value })}
                        placeholder="https://example.com/thumbnail.jpg"
                      />
                    </div>
                    <Button 
                      onClick={addMedia} 
                      className="w-full bg-red-600 hover:bg-red-700" 
                      disabled={uploading || !newMedia.title || !newMedia.video_url}
                    >
                      {uploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Ajout en cours...
                        </>
                      ) : (
                        <>
                          <Video className="w-4 h-4 mr-2" />
                          Ajouter la vidéo
                        </>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {medias.length === 0 ? (
          <div className="text-center py-20">
            <Video className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Aucune vidéo disponible
            </h3>
            <p className="text-gray-500 text-lg">
              {canManageMedia() 
                ? "Commencez par ajouter votre première vidéo familiale !" 
                : "Les vidéos seront bientôt disponibles."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            <AnimatePresence>
              {medias.map((media) => (
                <motion.div
                  key={media.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredCard(media.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setSelectedMedia(media)}
                >
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src={getVideoThumbnail(media.video_url, media.thumbnail_url)}
                        alt={media.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/video-placeholder.jpg';
                        }}
                      />
                      
                      {/* Overlay de lecture */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                        </motion.div>
                      </div>

                      {/* Durée */}
                      {media.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                          {formatDuration(media.duration)}
                        </div>
                      )}

                      {/* Bouton supprimer */}
                      {canManageMedia() && (
                        <motion.button
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMedia(media.id);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </motion.button>
                      )}
                    </div>

                    {/* Informations de la vidéo */}
                    <div className="p-3">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-red-600 transition-colors">
                        {media.title}
                      </h3>
                      {media.description && (
                        <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                          {media.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(media.created_at).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Eye className="w-3 h-3" />
                          <span>0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Modal de lecture vidéo */}
        {selectedMedia && (
          <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
              <div className="bg-black">
                <div className="aspect-video">
                  {selectedMedia.video_url.includes('youtube.com') || selectedMedia.video_url.includes('youtu.be') ? (
                    <iframe
                      src={getEmbedUrl(selectedMedia.video_url)}
                      className="w-full h-full"
                      allowFullScreen
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : (
                    <video
                      src={selectedMedia.video_url}
                      controls
                      className="w-full h-full"
                      preload="metadata"
                    />
                  )}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{selectedMedia.title}</h2>
                {selectedMedia.description && (
                  <p className="text-gray-600 mb-4">{selectedMedia.description}</p>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(selectedMedia.created_at).toLocaleDateString('fr-FR', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    {selectedMedia.duration && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Durée: {formatDuration(selectedMedia.duration)}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      J'aime
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-1" />
                      Partager
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default MediaPage;
