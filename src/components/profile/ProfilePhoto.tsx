
import***REMOVED***{***REMOVED***useState***REMOVED***}***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***Camera,***REMOVED***Loader2***REMOVED***}***REMOVED***from***REMOVED***'lucide-react';
import***REMOVED***{***REMOVED***Avatar,***REMOVED***AvatarFallback,***REMOVED***AvatarImage***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/avatar';
import***REMOVED***{***REMOVED***Button***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/button';
import***REMOVED***{***REMOVED***Dialog,***REMOVED***DialogContent,***REMOVED***DialogHeader,***REMOVED***DialogTitle***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/dialog';
import***REMOVED***{***REMOVED***useToast***REMOVED***}***REMOVED***from***REMOVED***'@/hooks/use-toast';
import***REMOVED***{***REMOVED***supabase***REMOVED***}***REMOVED***from***REMOVED***'@/integrations/supabase/client';

interface***REMOVED***ProfilePhotoProps***REMOVED***{
***REMOVED******REMOVED***user:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***first_name?:***REMOVED***string;
***REMOVED******REMOVED******REMOVED******REMOVED***last_name?:***REMOVED***string;
***REMOVED******REMOVED******REMOVED******REMOVED***avatar_url?:***REMOVED***string;
***REMOVED******REMOVED***};
***REMOVED******REMOVED***isEditing:***REMOVED***boolean;
***REMOVED******REMOVED***onPhotoUpdate:***REMOVED***(url:***REMOVED***string)***REMOVED***=>***REMOVED***void;
***REMOVED******REMOVED***size?:***REMOVED***'sm'***REMOVED***|***REMOVED***'md'***REMOVED***|***REMOVED***'lg'***REMOVED***|***REMOVED***'xl';
}

export***REMOVED***const***REMOVED***ProfilePhoto***REMOVED***=***REMOVED***({***REMOVED***user,***REMOVED***isEditing,***REMOVED***onPhotoUpdate,***REMOVED***size***REMOVED***=***REMOVED***'xl'***REMOVED***}:***REMOVED***ProfilePhotoProps)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***[uploading,***REMOVED***setUploading]***REMOVED***=***REMOVED***useState(false);
***REMOVED******REMOVED***const***REMOVED***[showPreview,***REMOVED***setShowPreview]***REMOVED***=***REMOVED***useState(false);
***REMOVED******REMOVED***const***REMOVED***[previewUrl,***REMOVED***setPreviewUrl]***REMOVED***=***REMOVED***useState('');
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***toast***REMOVED***}***REMOVED***=***REMOVED***useToast();

***REMOVED******REMOVED***const***REMOVED***sizeClasses***REMOVED***=***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***sm:***REMOVED***'w-16***REMOVED***h-16',
***REMOVED******REMOVED******REMOVED******REMOVED***md:***REMOVED***'w-24***REMOVED***h-24',
***REMOVED******REMOVED******REMOVED******REMOVED***lg:***REMOVED***'w-32***REMOVED***h-32',
***REMOVED******REMOVED******REMOVED******REMOVED***xl:***REMOVED***'w-40***REMOVED***h-40'
***REMOVED******REMOVED***};

***REMOVED******REMOVED***const***REMOVED***handleFileUpload***REMOVED***=***REMOVED***async***REMOVED***(e:***REMOVED***React.ChangeEvent<HTMLInputElement>)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***file***REMOVED***=***REMOVED***e.target.files?.[0];
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!file)***REMOVED***return;

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Validation***REMOVED***du***REMOVED***fichier
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!file.type.startsWith('image/'))***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toast({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***title:***REMOVED***'Erreur',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***'Veuillez***REMOVED***sélectionner***REMOVED***une***REMOVED***image***REMOVED***valide',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***'destructive',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return;
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(file.size***REMOVED***>***REMOVED***5***REMOVED*******REMOVED***1024***REMOVED*******REMOVED***1024)***REMOVED***{***REMOVED***//***REMOVED***5MB
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toast({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***title:***REMOVED***'Erreur',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***'L\'image***REMOVED***ne***REMOVED***doit***REMOVED***pas***REMOVED***dépasser***REMOVED***5MB',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***'destructive',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return;
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Prévisualisation
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***reader***REMOVED***=***REMOVED***new***REMOVED***FileReader();
***REMOVED******REMOVED******REMOVED******REMOVED***reader.onload***REMOVED***=***REMOVED***(event)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***result***REMOVED***=***REMOVED***event.target?.result***REMOVED***as***REMOVED***string;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setPreviewUrl(result);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setShowPreview(true);
***REMOVED******REMOVED******REMOVED******REMOVED***};
***REMOVED******REMOVED******REMOVED******REMOVED***reader.readAsDataURL(file);
***REMOVED******REMOVED***};

***REMOVED******REMOVED***const***REMOVED***confirmUpload***REMOVED***=***REMOVED***async***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!previewUrl)***REMOVED***return;

***REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setUploading(true);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Convertir***REMOVED***le***REMOVED***data***REMOVED***URL***REMOVED***en***REMOVED***blob
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***response***REMOVED***=***REMOVED***await***REMOVED***fetch(previewUrl);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***blob***REMOVED***=***REMOVED***await***REMOVED***response.blob();
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Créer***REMOVED***un***REMOVED***nom***REMOVED***de***REMOVED***fichier***REMOVED***unique
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***fileExt***REMOVED***=***REMOVED***blob.type.split('/')[1];
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***fileName***REMOVED***=***REMOVED***`${Date.now()}.${fileExt}`;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***filePath***REMOVED***=***REMOVED***`${(await***REMOVED***supabase.auth.getUser()).data.user?.id}/${fileName}`;

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Upload***REMOVED***vers***REMOVED***Supabase***REMOVED***Storage
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***error:***REMOVED***uploadError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase.storage
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('avatars')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.upload(filePath,***REMOVED***blob);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(uploadError)***REMOVED***throw***REMOVED***uploadError;

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Obtenir***REMOVED***l'URL***REMOVED***publique
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data***REMOVED***}***REMOVED***=***REMOVED***supabase.storage
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('avatars')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.getPublicUrl(filePath);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onPhotoUpdate(data.publicUrl);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setShowPreview(false);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setPreviewUrl('');

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toast({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***title:***REMOVED***'Succès',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***'Photo***REMOVED***de***REMOVED***profil***REMOVED***mise***REMOVED***à***REMOVED***jour***REMOVED***avec***REMOVED***succès',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('Erreur***REMOVED***upload:',***REMOVED***error);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toast({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***title:***REMOVED***'Erreur',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***'Erreur***REMOVED***lors***REMOVED***du***REMOVED***téléchargement***REMOVED***de***REMOVED***la***REMOVED***photo',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***'destructive',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***finally***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setUploading(false);
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***};

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="relative">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Avatar***REMOVED***className={sizeClasses[size]}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<AvatarImage***REMOVED***src={user.avatar_url***REMOVED***||***REMOVED***''}***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<AvatarFallback***REMOVED***className="text-2xl***REMOVED***font-bold">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{user.first_name?.[0]}{user.last_name?.[0]}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</AvatarFallback>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Avatar>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{isEditing***REMOVED***&&***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<label***REMOVED***className="absolute***REMOVED***bottom-0***REMOVED***right-0***REMOVED***w-10***REMOVED***h-10***REMOVED***bg-whatsapp-600***REMOVED***rounded-full***REMOVED***flex***REMOVED***items-center***REMOVED***justify-center***REMOVED***cursor-pointer***REMOVED***hover:bg-whatsapp-700***REMOVED***transition-colors***REMOVED***shadow-lg">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Camera***REMOVED***className="w-5***REMOVED***h-5***REMOVED***text-white"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<input
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***type="file"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***accept="image/*"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onChange={handleFileUpload}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className="hidden"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***disabled={uploading}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</label>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Dialog***REMOVED***open={showPreview}***REMOVED***onOpenChange={setShowPreview}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DialogContent>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DialogHeader>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DialogTitle>Confirmer***REMOVED***la***REMOVED***photo***REMOVED***de***REMOVED***profil</DialogTitle>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</DialogHeader>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="space-y-4">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="flex***REMOVED***justify-center">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Avatar***REMOVED***className="w-32***REMOVED***h-32">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<AvatarImage***REMOVED***src={previewUrl}***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<AvatarFallback>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{user.first_name?.[0]}{user.last_name?.[0]}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</AvatarFallback>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Avatar>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="flex***REMOVED***justify-end***REMOVED***space-x-2">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Button***REMOVED***variant="outline"***REMOVED***onClick={()***REMOVED***=>***REMOVED***setShowPreview(false)}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Annuler
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Button>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Button***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onClick={confirmUpload}***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***disabled={uploading}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className="bg-whatsapp-600***REMOVED***hover:bg-whatsapp-700"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{uploading***REMOVED***?***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Loader2***REMOVED***className="w-4***REMOVED***h-4***REMOVED***mr-2***REMOVED***animate-spin"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Upload...
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)***REMOVED***:***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***'Confirmer'
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Button>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</DialogContent>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Dialog>
***REMOVED******REMOVED******REMOVED******REMOVED***</>
***REMOVED******REMOVED***);
};
