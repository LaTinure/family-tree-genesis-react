
import***REMOVED***React,***REMOVED***{***REMOVED***useState,***REMOVED***useEffect***REMOVED***}***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***useNavigate,***REMOVED***useSearchParams***REMOVED***}***REMOVED***from***REMOVED***'react-router-dom';
import***REMOVED***{***REMOVED***useForm***REMOVED***}***REMOVED***from***REMOVED***'react-hook-form';
import***REMOVED***{***REMOVED***zodResolver***REMOVED***}***REMOVED***from***REMOVED***'@hookform/resolvers/zod';
import***REMOVED***{***REMOVED***z***REMOVED***}***REMOVED***from***REMOVED***'zod';
import***REMOVED***{***REMOVED***Card,***REMOVED***CardContent,***REMOVED***CardHeader,***REMOVED***CardTitle***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/card';
import***REMOVED***{***REMOVED***Button***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/button';
import***REMOVED***{***REMOVED***Input***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/input';
import***REMOVED***{***REMOVED***Label***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/label';
import***REMOVED***{***REMOVED***Textarea***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/textarea';
import***REMOVED***{***REMOVED***Alert,***REMOVED***AlertDescription***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/alert';
import***REMOVED***{***REMOVED***Crown,***REMOVED***Loader2,***REMOVED***AlertTriangle,***REMOVED***CheckCircle***REMOVED***}***REMOVED***from***REMOVED***'lucide-react';
import***REMOVED***{***REMOVED***useToast***REMOVED***}***REMOVED***from***REMOVED***'@/hooks/use-toast';
import***REMOVED***{***REMOVED***supabase***REMOVED***}***REMOVED***from***REMOVED***'@/integrations/supabase/client';
import***REMOVED***{***REMOVED***useAuth***REMOVED***}***REMOVED***from***REMOVED***'@/hooks/useAuth';

const***REMOVED***dynastySchema***REMOVED***=***REMOVED***z.object({
***REMOVED******REMOVED***name:***REMOVED***z.string().min(2,***REMOVED***'Le***REMOVED***nom***REMOVED***doit***REMOVED***contenir***REMOVED***au***REMOVED***moins***REMOVED***2***REMOVED***caractères'),
***REMOVED******REMOVED***location:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***description:***REMOVED***z.string().optional(),
***REMOVED******REMOVED***founding_year:***REMOVED***z.string().optional(),
});

type***REMOVED***DynastyFormData***REMOVED***=***REMOVED***z.infer<typeof***REMOVED***dynastySchema>;

const***REMOVED***DynastyCreateForm***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***navigate***REMOVED***=***REMOVED***useNavigate();
***REMOVED******REMOVED***const***REMOVED***[searchParams]***REMOVED***=***REMOVED***useSearchParams();
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***toast***REMOVED***}***REMOVED***=***REMOVED***useToast();
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***user***REMOVED***}***REMOVED***=***REMOVED***useAuth();
***REMOVED******REMOVED***const***REMOVED***[isSubmitting,***REMOVED***setIsSubmitting]***REMOVED***=***REMOVED***useState(false);
***REMOVED******REMOVED***const***REMOVED***[tokenValid,***REMOVED***setTokenValid]***REMOVED***=***REMOVED***useState(false);
***REMOVED******REMOVED***const***REMOVED***[tokenChecking,***REMOVED***setTokenChecking]***REMOVED***=***REMOVED***useState(true);
***REMOVED******REMOVED***const***REMOVED***[tokenData,***REMOVED***setTokenData]***REMOVED***=***REMOVED***useState<any>(null);

***REMOVED******REMOVED***const***REMOVED***createToken***REMOVED***=***REMOVED***searchParams.get('create_token');

***REMOVED******REMOVED***const***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***register,
***REMOVED******REMOVED******REMOVED******REMOVED***handleSubmit,
***REMOVED******REMOVED******REMOVED******REMOVED***formState:***REMOVED***{***REMOVED***errors***REMOVED***},
***REMOVED******REMOVED***}***REMOVED***=***REMOVED***useForm<DynastyFormData>({
***REMOVED******REMOVED******REMOVED******REMOVED***resolver:***REMOVED***zodResolver(dynastySchema),
***REMOVED******REMOVED***});

***REMOVED******REMOVED***//***REMOVED***Vérifier***REMOVED***le***REMOVED***token***REMOVED***au***REMOVED***chargement***REMOVED***de***REMOVED***la***REMOVED***page
***REMOVED******REMOVED***useEffect(()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***validateCreateToken***REMOVED***=***REMOVED***async***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!createToken)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toast({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***title:***REMOVED***'Token***REMOVED***manquant',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***'Aucun***REMOVED***token***REMOVED***de***REMOVED***création***REMOVED***valide***REMOVED***trouvé.***REMOVED***Veuillez***REMOVED***effectuer***REMOVED***un***REMOVED***paiement***REMOVED***d\'abord.',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***'destructive',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***navigate('/dynasty/payment');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data,***REMOVED***error***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('dynasty_creation_tokens')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select('*')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('token',***REMOVED***createToken)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('is_used',***REMOVED***false)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.gt('expires_at',***REMOVED***new***REMOVED***Date().toISOString())
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error***REMOVED***||***REMOVED***!data)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toast({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***title:***REMOVED***'Token***REMOVED***invalide',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***'Ce***REMOVED***token***REMOVED***de***REMOVED***création***REMOVED***a***REMOVED***expiré***REMOVED***ou***REMOVED***a***REMOVED***déjà***REMOVED***été***REMOVED***utilisé.',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***'destructive',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***navigate('/dynasty/payment');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setTokenData(data);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setTokenValid(true);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('Erreur***REMOVED***validation***REMOVED***token:',***REMOVED***error);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toast({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***title:***REMOVED***'Erreur',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***'Une***REMOVED***erreur***REMOVED***est***REMOVED***survenue***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***validation***REMOVED***du***REMOVED***token.',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***'destructive',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***navigate('/dynasty/payment');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***finally***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setTokenChecking(false);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED***};

***REMOVED******REMOVED******REMOVED******REMOVED***validateCreateToken();
***REMOVED******REMOVED***},***REMOVED***[createToken,***REMOVED***navigate,***REMOVED***toast]);

***REMOVED******REMOVED***const***REMOVED***onSubmit***REMOVED***=***REMOVED***async***REMOVED***(data:***REMOVED***DynastyFormData)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!user***REMOVED***||***REMOVED***!tokenValid***REMOVED***||***REMOVED***!tokenData)***REMOVED***return;

***REMOVED******REMOVED******REMOVED******REMOVED***setIsSubmitting(true);
***REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***1.***REMOVED***Créer***REMOVED***la***REMOVED***dynastie
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***dynasty,***REMOVED***error:***REMOVED***dynastyError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('dynasties')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.insert({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***name:***REMOVED***data.name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***location:***REMOVED***data.location,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***data.description,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***founding_year:***REMOVED***data.founding_year,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_by:***REMOVED***user.id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***})
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.select()
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.single();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(dynastyError***REMOVED***||***REMOVED***!dynasty)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***new***REMOVED***Error('Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***création***REMOVED***de***REMOVED***la***REMOVED***dynastie');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***2.***REMOVED***Marquer***REMOVED***le***REMOVED***token***REMOVED***comme***REMOVED***utilisé
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***error:***REMOVED***tokenError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('dynasty_creation_tokens')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.update({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***is_used:***REMOVED***true,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***used_at:***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***})
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.eq('token',***REMOVED***createToken);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(tokenError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('Erreur***REMOVED***mise***REMOVED***à***REMOVED***jour***REMOVED***token:',***REMOVED***tokenError);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***3.***REMOVED***Créer***REMOVED***une***REMOVED***invitation***REMOVED***pour***REMOVED***le***REMOVED***fondateur
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***inviteToken***REMOVED***=***REMOVED***crypto.randomUUID();
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***error:***REMOVED***inviteError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('invites')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.insert({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***dynasty_id:***REMOVED***dynasty.id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***token:***REMOVED***inviteToken,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***user_role:***REMOVED***'Administrateur',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***affiliation:***REMOVED***'Fondateur',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***expires_at:***REMOVED***new***REMOVED***Date(Date.now()***REMOVED***+***REMOVED***24***REMOVED*******REMOVED***60***REMOVED*******REMOVED***60***REMOVED*******REMOVED***1000).toISOString(),***REMOVED***//***REMOVED***24h
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***invited_by:***REMOVED***null,***REMOVED***//***REMOVED***System
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(inviteError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('Erreur***REMOVED***création***REMOVED***invitation:',***REMOVED***inviteError);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***new***REMOVED***Error('Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***création***REMOVED***de***REMOVED***l\'invitation');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toast({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***title:***REMOVED***'Dynastie***REMOVED***créée***REMOVED***avec***REMOVED***succès***REMOVED***!',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***'Redirection***REMOVED***vers***REMOVED***la***REMOVED***création***REMOVED***de***REMOVED***votre***REMOVED***profil***REMOVED***d\'administrateur...',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***4.***REMOVED***Rediriger***REMOVED***vers***REMOVED***l'inscription***REMOVED***avec***REMOVED***le***REMOVED***token***REMOVED***d'invitation
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setTimeout(()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***navigate(`/auth-family?mode=register&token=${inviteToken}`);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},***REMOVED***1500);

***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(error:***REMOVED***any)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('Erreur***REMOVED***création***REMOVED***dynastie:',***REMOVED***error);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toast({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***title:***REMOVED***'Erreur',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***error.message***REMOVED***||***REMOVED***'Une***REMOVED***erreur***REMOVED***est***REMOVED***survenue***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***création***REMOVED***de***REMOVED***la***REMOVED***dynastie.',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***'destructive',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***finally***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setIsSubmitting(false);
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***};

***REMOVED******REMOVED***if***REMOVED***(tokenChecking)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="min-h-screen***REMOVED***bg-gradient-to-br***REMOVED***from-whatsapp-50***REMOVED***via-green-50***REMOVED***to-emerald-50***REMOVED***flex***REMOVED***items-center***REMOVED***justify-center">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="text-center">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Loader2***REMOVED***className="w-8***REMOVED***h-8***REMOVED***animate-spin***REMOVED***mx-auto***REMOVED***mb-4***REMOVED***text-whatsapp-600"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<p***REMOVED***className="text-gray-600">Vérification***REMOVED***de***REMOVED***votre***REMOVED***autorisation...</p>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED***);
***REMOVED******REMOVED***}

***REMOVED******REMOVED***if***REMOVED***(!tokenValid)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***null;***REMOVED***//***REMOVED***La***REMOVED***redirection***REMOVED***est***REMOVED***déjà***REMOVED***gérée***REMOVED***dans***REMOVED***useEffect
***REMOVED******REMOVED***}

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="min-h-screen***REMOVED***bg-gradient-to-br***REMOVED***from-whatsapp-50***REMOVED***via-green-50***REMOVED***to-emerald-50***REMOVED***flex***REMOVED***items-center***REMOVED***justify-center***REMOVED***px-4***REMOVED***py-8">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="w-full***REMOVED***max-w-2xl">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="text-center***REMOVED***mb-8">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Crown***REMOVED***className="w-16***REMOVED***h-16***REMOVED***text-whatsapp-600***REMOVED***mx-auto***REMOVED***mb-4"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<h1***REMOVED***className="text-3xl***REMOVED***font-bold***REMOVED***text-whatsapp-700***REMOVED***mb-2">Créer***REMOVED***votre***REMOVED***Dynastie</h1>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<p***REMOVED***className="text-gray-600">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Félicitations***REMOVED***!***REMOVED***Vous***REMOVED***allez***REMOVED***devenir***REMOVED***le***REMOVED***fondateur***REMOVED***de***REMOVED***votre***REMOVED***propre***REMOVED***dynastie***REMOVED***familiale.
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</p>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Card***REMOVED***className="shadow-xl***REMOVED***border-0***REMOVED***bg-white/80***REMOVED***backdrop-blur-sm">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<CardHeader>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<CardTitle***REMOVED***className="text-center***REMOVED***text-xl***REMOVED***text-gray-900">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Informations***REMOVED***de***REMOVED***votre***REMOVED***dynastie
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</CardTitle>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Alert***REMOVED***className="border-green-200***REMOVED***bg-green-50">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<CheckCircle***REMOVED***className="h-4***REMOVED***w-4"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<AlertDescription***REMOVED***className="text-green-800">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Token***REMOVED***validé***REMOVED***!***REMOVED***Vous***REMOVED***êtes***REMOVED***autorisé***REMOVED***à***REMOVED***créer***REMOVED***votre***REMOVED***dynastie.
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</AlertDescription>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Alert>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</CardHeader>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<CardContent>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<form***REMOVED***onSubmit={handleSubmit(onSubmit)}***REMOVED***className="space-y-6">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="space-y-2">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Label***REMOVED***htmlFor="name">Nom***REMOVED***de***REMOVED***la***REMOVED***dynastie***REMOVED****</Label>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Input
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id="name"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...register('name')}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***placeholder="ex:***REMOVED***Famille***REMOVED***Martin,***REMOVED***Les***REMOVED***Dubois,***REMOVED***etc."
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className="text-lg***REMOVED***font-medium"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{errors.name***REMOVED***&&***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<p***REMOVED***className="text-sm***REMOVED***text-red-600">{errors.name.message}</p>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="space-y-2">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Label***REMOVED***htmlFor="location">Localisation***REMOVED***d'origine</Label>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Input
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id="location"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...register('location')}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***placeholder="ex:***REMOVED***Paris,***REMOVED***Lyon,***REMOVED***Région***REMOVED***Provence,***REMOVED***etc."
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="space-y-2">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Label***REMOVED***htmlFor="founding_year">Année***REMOVED***de***REMOVED***fondation***REMOVED***(optionnel)</Label>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Input
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id="founding_year"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...register('founding_year')}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***placeholder="ex:***REMOVED***1950,***REMOVED***1875,***REMOVED***etc."
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***type="number"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***min="1800"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***max={new***REMOVED***Date().getFullYear()}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="space-y-2">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Label***REMOVED***htmlFor="description">Description***REMOVED***de***REMOVED***la***REMOVED***dynastie</Label>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Textarea
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id="description"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...register('description')}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***placeholder="Racontez***REMOVED***l'histoire***REMOVED***de***REMOVED***votre***REMOVED***famille,***REMOVED***ses***REMOVED***origines,***REMOVED***ses***REMOVED***valeurs..."
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***rows={4}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Alert***REMOVED***className="border-blue-200***REMOVED***bg-blue-50">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<AlertTriangle***REMOVED***className="h-4***REMOVED***w-4"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<AlertDescription***REMOVED***className="text-blue-800***REMOVED***text-sm">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Une***REMOVED***fois***REMOVED***votre***REMOVED***dynastie***REMOVED***créée,***REMOVED***vous***REMOVED***deviendrez***REMOVED***automatiquement***REMOVED***le***REMOVED***premier***REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***administrateur***REMOVED***et***REMOVED***pourrez***REMOVED***inviter***REMOVED***d'autres***REMOVED***membres***REMOVED***de***REMOVED***votre***REMOVED***famille.
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</AlertDescription>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Alert>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Button
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***type="submit"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***disabled={isSubmitting}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className="w-full***REMOVED***bg-gradient-to-r***REMOVED***from-whatsapp-500***REMOVED***to-whatsapp-600***REMOVED***hover:from-whatsapp-600***REMOVED***hover:to-whatsapp-700***REMOVED***text-white***REMOVED***py-3***REMOVED***text-lg***REMOVED***font-semibold"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{isSubmitting***REMOVED***?***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Loader2***REMOVED***className="w-5***REMOVED***h-5***REMOVED***mr-2***REMOVED***animate-spin"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Création***REMOVED***de***REMOVED***votre***REMOVED***dynastie...
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)***REMOVED***:***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Crown***REMOVED***className="w-5***REMOVED***h-5***REMOVED***mr-2"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Créer***REMOVED***ma***REMOVED***Dynastie
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Button>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</form>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</CardContent>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Card>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="text-center***REMOVED***mt-6">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Button
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant="ghost"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onClick={()***REMOVED***=>***REMOVED***navigate('/dynasty')}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className="text-whatsapp-600***REMOVED***hover:text-whatsapp-700"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***disabled={isSubmitting}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***←***REMOVED***Retour***REMOVED***à***REMOVED***l'accueil
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Button>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED***);
};

export***REMOVED***default***REMOVED***DynastyCreateForm;
