import***REMOVED***{***REMOVED***useForm***REMOVED***}***REMOVED***from***REMOVED***'react-hook-form';
import***REMOVED***{***REMOVED***yupResolver***REMOVED***}***REMOVED***from***REMOVED***'@hookform/resolvers/yup';
import***REMOVED*******REMOVED***as***REMOVED***yup***REMOVED***from***REMOVED***'yup';
import***REMOVED***{***REMOVED***useState***REMOVED***}***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***supabase***REMOVED***}***REMOVED***from***REMOVED***'@/lib/supabaseClient';
import***REMOVED***{***REMOVED***Input***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/input';
import***REMOVED***{***REMOVED***Button***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/button';
import***REMOVED***{***REMOVED***Card,***REMOVED***CardContent,***REMOVED***CardDescription,***REMOVED***CardHeader,***REMOVED***CardTitle***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/card';
import***REMOVED***{***REMOVED***useToast***REMOVED***}***REMOVED***from***REMOVED***'@/hooks/use-toast';
import***REMOVED***{***REMOVED***UserPlus,***REMOVED***Loader2,***REMOVED***CheckCircle,***REMOVED***Eye,***REMOVED***EyeOff***REMOVED***}***REMOVED***from***REMOVED***'lucide-react';

const***REMOVED***schema***REMOVED***=***REMOVED***yup.object().shape({
***REMOVED******REMOVED***email:***REMOVED***yup.string().email('Email***REMOVED***invalide').required('Email***REMOVED***requis'),
***REMOVED******REMOVED***password:***REMOVED***yup.string().min(6,***REMOVED***'Le***REMOVED***mot***REMOVED***de***REMOVED***passe***REMOVED***doit***REMOVED***contenir***REMOVED***au***REMOVED***moins***REMOVED***6***REMOVED***caractères').required('Mot***REMOVED***de***REMOVED***passe***REMOVED***requis'),
***REMOVED******REMOVED***confirmPassword:***REMOVED***yup.string().oneOf([yup.ref('password')],***REMOVED***'Les***REMOVED***mots***REMOVED***de***REMOVED***passe***REMOVED***doivent***REMOVED***être***REMOVED***identiques').required('Confirmation***REMOVED***requise'),
});

export***REMOVED***default***REMOVED***function***REMOVED***DynastyUserRegistration({***REMOVED***onSuccess***REMOVED***}:***REMOVED***{***REMOVED***onSuccess:***REMOVED***()***REMOVED***=>***REMOVED***void***REMOVED***})***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***toast***REMOVED***}***REMOVED***=***REMOVED***useToast();
***REMOVED******REMOVED***const***REMOVED***[loading,***REMOVED***setLoading]***REMOVED***=***REMOVED***useState(false);
***REMOVED******REMOVED***const***REMOVED***[showPassword,***REMOVED***setShowPassword]***REMOVED***=***REMOVED***useState(false);
***REMOVED******REMOVED***const***REMOVED***[showConfirmPassword,***REMOVED***setShowConfirmPassword]***REMOVED***=***REMOVED***useState(false);
***REMOVED******REMOVED***const***REMOVED***[error,***REMOVED***setError]***REMOVED***=***REMOVED***useState<string***REMOVED***|***REMOVED***null>(null);

***REMOVED******REMOVED***const***REMOVED***form***REMOVED***=***REMOVED***useForm({
***REMOVED******REMOVED******REMOVED******REMOVED***resolver:***REMOVED***yupResolver(schema),
***REMOVED******REMOVED******REMOVED******REMOVED***defaultValues:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***email:***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***password:***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***confirmPassword:***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED***});

***REMOVED******REMOVED***const***REMOVED***onSubmit***REMOVED***=***REMOVED***async***REMOVED***(values:***REMOVED***any)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***setLoading(true);
***REMOVED******REMOVED******REMOVED******REMOVED***setError(null);

***REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('🚀***REMOVED***Début***REMOVED***de***REMOVED***l\'inscription...');

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***1.***REMOVED***Créer***REMOVED***le***REMOVED***compte***REMOVED***utilisateur***REMOVED***Supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***authData,***REMOVED***error:***REMOVED***signUpError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase.auth.signUp({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***email:***REMOVED***values.email,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***password:***REMOVED***values.password,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(signUpError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('❌***REMOVED***Erreur***REMOVED***inscription:',***REMOVED***signUpError);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***new***REMOVED***Error(signUpError.message);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!authData.user)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***new***REMOVED***Error('Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***création***REMOVED***du***REMOVED***compte');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('✅***REMOVED***Compte***REMOVED***créé:',***REMOVED***authData.user.id);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***2.***REMOVED***Se***REMOVED***connecter***REMOVED***automatiquement
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***data:***REMOVED***signInData,***REMOVED***error:***REMOVED***signInError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase.auth.signInWithPassword({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***email:***REMOVED***values.email,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***password:***REMOVED***values.password,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(signInError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('❌***REMOVED***Erreur***REMOVED***connexion:',***REMOVED***signInError);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***new***REMOVED***Error(signInError.message);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!signInData.user)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***new***REMOVED***Error('Erreur***REMOVED***lors***REMOVED***de***REMOVED***la***REMOVED***connexion');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('✅***REMOVED***Utilisateur***REMOVED***connecté:',***REMOVED***signInData.user.id);

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***3.***REMOVED***Créer***REMOVED***le***REMOVED***profil***REMOVED***utilisateur***REMOVED***(avec***REMOVED***gestion***REMOVED***d'erreur***REMOVED***RLS)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***try***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***{***REMOVED***error:***REMOVED***profileError***REMOVED***}***REMOVED***=***REMOVED***await***REMOVED***supabase
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.from('profiles')
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***.insert({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***id:***REMOVED***signInData.user.id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***user_id:***REMOVED***signInData.user.id,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***email:***REMOVED***values.email,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***first_name:***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***last_name:***REMOVED***'',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***user_role:***REMOVED***'Membre',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***created_at:***REMOVED***new***REMOVED***Date().toISOString(),
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(profileError)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('❌***REMOVED***Erreur***REMOVED***création***REMOVED***profil:',***REMOVED***profileError);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Si***REMOVED***erreur***REMOVED***RLS,***REMOVED***on***REMOVED***continue***REMOVED***quand***REMOVED***même***REMOVED***(profil***REMOVED***sera***REMOVED***créé***REMOVED***plus***REMOVED***tard)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(profileError.message.includes('infinite***REMOVED***recursion')***REMOVED***||***REMOVED***profileError.message.includes('42P17'))***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('⚠️***REMOVED***Erreur***REMOVED***RLS***REMOVED***détectée,***REMOVED***on***REMOVED***continue***REMOVED***sans***REMOVED***profil***REMOVED***pour***REMOVED***l\'instant');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***else***REMOVED***if***REMOVED***(!profileError.message.includes('duplicate***REMOVED***key'))***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***throw***REMOVED***profileError;
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***else***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('✅***REMOVED***Profil***REMOVED***créé');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(profileErr)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.log('⚠️***REMOVED***Erreur***REMOVED***profil***REMOVED***ignorée,***REMOVED***on***REMOVED***continue:',***REMOVED***profileErr);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***4.***REMOVED***Rediriger***REMOVED***vers***REMOVED***la***REMOVED***page***REMOVED***de***REMOVED***tarification
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toast({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***title:***REMOVED***'Compte***REMOVED***créé***REMOVED***avec***REMOVED***succès***REMOVED***!',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***'Vous***REMOVED***allez***REMOVED***être***REMOVED***redirigé***REMOVED***vers***REMOVED***la***REMOVED***page***REMOVED***de***REMOVED***tarification.',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Fermer***REMOVED***le***REMOVED***modal***REMOVED***et***REMOVED***rediriger
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onSuccess();

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Redirection***REMOVED***vers***REMOVED***la***REMOVED***page***REMOVED***de***REMOVED***tarification
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setTimeout(()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***window.location.href***REMOVED***=***REMOVED***'/dynasty/payment';
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},***REMOVED***1500);

***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***catch***REMOVED***(e:***REMOVED***any)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***console.error('❌***REMOVED***Erreur:',***REMOVED***e);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setError(e.message***REMOVED***||***REMOVED***'Erreur***REMOVED***inconnue');
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***toast({
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***title:***REMOVED***'Erreur',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***e.message***REMOVED***||***REMOVED***'Erreur***REMOVED***inconnue',
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant:***REMOVED***'destructive'
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***});
***REMOVED******REMOVED******REMOVED******REMOVED***}***REMOVED***finally***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setLoading(false);
***REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED***};

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<form***REMOVED***onSubmit={form.handleSubmit(onSubmit)}***REMOVED***className="space-y-4">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Card***REMOVED***className="shadow-none***REMOVED***border-0***REMOVED***bg-transparent">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<CardHeader***REMOVED***className="pb-2">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<CardTitle***REMOVED***className="text-xl">Inscription***REMOVED***rapide</CardTitle>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<CardDescription>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Créez***REMOVED***votre***REMOVED***identifiant***REMOVED***pour***REMOVED***accéder***REMOVED***à***REMOVED***toutes***REMOVED***les***REMOVED***fonctionnalités***REMOVED***de***REMOVED***votre***REMOVED***dynastie***REMOVED***familiale.
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</CardDescription>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</CardHeader>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<CardContent***REMOVED***className="space-y-4">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<label***REMOVED***className="block***REMOVED***text-sm***REMOVED***font-medium***REMOVED***mb-1">Email***REMOVED****</label>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Input
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***type="email"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...form.register('email')}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***placeholder="votre@email.com"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{form.formState.errors.email***REMOVED***&&***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<p***REMOVED***className="text-red-500***REMOVED***text-xs***REMOVED***mt-1">{form.formState.errors.email.message***REMOVED***as***REMOVED***string}</p>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<label***REMOVED***className="block***REMOVED***text-sm***REMOVED***font-medium***REMOVED***mb-1">Mot***REMOVED***de***REMOVED***passe***REMOVED****</label>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="relative">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Input
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***type={showPassword***REMOVED***?***REMOVED***'text'***REMOVED***:***REMOVED***'password'}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...form.register('password')}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***placeholder="••••••••"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Button
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***type="button"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant="ghost"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***size="sm"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className="absolute***REMOVED***right-0***REMOVED***top-0***REMOVED***h-full***REMOVED***px-3***REMOVED***py-2***REMOVED***hover:bg-transparent"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onClick={()***REMOVED***=>***REMOVED***setShowPassword(!showPassword)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{showPassword***REMOVED***?***REMOVED***<EyeOff***REMOVED***className="h-4***REMOVED***w-4"***REMOVED***/>***REMOVED***:***REMOVED***<Eye***REMOVED***className="h-4***REMOVED***w-4"***REMOVED***/>}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Button>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{form.formState.errors.password***REMOVED***&&***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<p***REMOVED***className="text-red-500***REMOVED***text-xs***REMOVED***mt-1">{form.formState.errors.password.message***REMOVED***as***REMOVED***string}</p>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<label***REMOVED***className="block***REMOVED***text-sm***REMOVED***font-medium***REMOVED***mb-1">Confirmer***REMOVED***le***REMOVED***mot***REMOVED***de***REMOVED***passe***REMOVED****</label>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="relative">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Input
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***type={showConfirmPassword***REMOVED***?***REMOVED***'text'***REMOVED***:***REMOVED***'password'}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{...form.register('confirmPassword')}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***placeholder="••••••••"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Button
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***type="button"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant="ghost"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***size="sm"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className="absolute***REMOVED***right-0***REMOVED***top-0***REMOVED***h-full***REMOVED***px-3***REMOVED***py-2***REMOVED***hover:bg-transparent"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onClick={()***REMOVED***=>***REMOVED***setShowConfirmPassword(!showConfirmPassword)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{showConfirmPassword***REMOVED***?***REMOVED***<EyeOff***REMOVED***className="h-4***REMOVED***w-4"***REMOVED***/>***REMOVED***:***REMOVED***<Eye***REMOVED***className="h-4***REMOVED***w-4"***REMOVED***/>}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Button>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{form.formState.errors.confirmPassword***REMOVED***&&***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<p***REMOVED***className="text-red-500***REMOVED***text-xs***REMOVED***mt-1">{form.formState.errors.confirmPassword.message***REMOVED***as***REMOVED***string}</p>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{error***REMOVED***&&***REMOVED***<div***REMOVED***className="text-red-600***REMOVED***text-sm">{error}</div>}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Button
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***type="submit"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className="w-full"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***disabled={loading}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{loading***REMOVED***?***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Loader2***REMOVED***className="w-4***REMOVED***h-4***REMOVED***mr-2***REMOVED***animate-spin"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Création***REMOVED***en***REMOVED***cours...
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)***REMOVED***:***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<UserPlus***REMOVED***className="w-4***REMOVED***h-4***REMOVED***mr-2"***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Créer***REMOVED***mon***REMOVED***identifiant
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Button>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="text-xs***REMOVED***text-gray-500***REMOVED***text-center">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***En***REMOVED***créant***REMOVED***votre***REMOVED***identifiant,***REMOVED***vous***REMOVED***acceptez***REMOVED***nos***REMOVED***conditions***REMOVED***d'utilisation***REMOVED***et***REMOVED***notre***REMOVED***politique***REMOVED***de***REMOVED***confidentialité.
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</CardContent>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Card>
***REMOVED******REMOVED******REMOVED******REMOVED***</form>
***REMOVED******REMOVED***);
}
