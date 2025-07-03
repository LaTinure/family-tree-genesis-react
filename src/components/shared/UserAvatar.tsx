import***REMOVED***{***REMOVED***Avatar***REMOVED***}***REMOVED***from***REMOVED***'@/components/shared/Avatar';

interface***REMOVED***UserAvatarProps***REMOVED***{
***REMOVED******REMOVED***user:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***first_name?:***REMOVED***string;
***REMOVED******REMOVED******REMOVED******REMOVED***last_name?:***REMOVED***string;
***REMOVED******REMOVED******REMOVED******REMOVED***avatar_url?:***REMOVED***string;
***REMOVED******REMOVED******REMOVED******REMOVED***photo_url?:***REMOVED***string;
***REMOVED******REMOVED***}***REMOVED***|***REMOVED***null***REMOVED***|***REMOVED***undefined;
***REMOVED******REMOVED***size?:***REMOVED***'sm'***REMOVED***|***REMOVED***'md'***REMOVED***|***REMOVED***'lg'***REMOVED***|***REMOVED***'xl';
***REMOVED******REMOVED***className?:***REMOVED***string;
}

export***REMOVED***const***REMOVED***UserAvatar***REMOVED***=***REMOVED***({***REMOVED***user,***REMOVED***size***REMOVED***=***REMOVED***'md',***REMOVED***className***REMOVED***}:***REMOVED***UserAvatarProps)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***//***REMOVED***Vérification***REMOVED***que***REMOVED***user***REMOVED***existe
***REMOVED******REMOVED***if***REMOVED***(!user)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Avatar
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***src={undefined}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***fallback="U"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***size={size}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={className}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED***);
***REMOVED******REMOVED***}

***REMOVED******REMOVED***//***REMOVED***Gestion***REMOVED***des***REMOVED***URLs***REMOVED***Supabase
***REMOVED******REMOVED***let***REMOVED***avatarUrl***REMOVED***=***REMOVED***user.avatar_url***REMOVED***||***REMOVED***user.photo_url;

***REMOVED******REMOVED***//***REMOVED***Si***REMOVED***l'URL***REMOVED***existe***REMOVED***mais***REMOVED***n'est***REMOVED***pas***REMOVED***complète,***REMOVED***construire***REMOVED***l'URL***REMOVED***Supabase
***REMOVED******REMOVED***if***REMOVED***(avatarUrl***REMOVED***&&***REMOVED***!avatarUrl.startsWith('http')***REMOVED***&&***REMOVED***!avatarUrl.startsWith('data:')***REMOVED***&&***REMOVED***!avatarUrl.startsWith('/'))***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Construire***REMOVED***l'URL***REMOVED***complète***REMOVED***Supabase
***REMOVED******REMOVED******REMOVED******REMOVED***const***REMOVED***supabaseUrl***REMOVED***=***REMOVED***'https://aaxfvyorhasbwlaovrdf.supabase.co/storage/v1/object/public/avatars/';
***REMOVED******REMOVED******REMOVED******REMOVED***avatarUrl***REMOVED***=***REMOVED***`${supabaseUrl}${avatarUrl}`;
***REMOVED******REMOVED***}

***REMOVED******REMOVED***//***REMOVED***Si***REMOVED***pas***REMOVED***d'URL***REMOVED***d'avatar,***REMOVED***utiliser***REMOVED***l'image***REMOVED***par***REMOVED***défaut
***REMOVED******REMOVED***if***REMOVED***(!avatarUrl)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***avatarUrl***REMOVED***=***REMOVED***'/images/profile01.png';
***REMOVED******REMOVED***}

***REMOVED******REMOVED***const***REMOVED***fallback***REMOVED***=***REMOVED***`${user.first_name?.[0]***REMOVED***||***REMOVED***''}${user.last_name?.[0]***REMOVED***||***REMOVED***''}`***REMOVED***||***REMOVED***'U';

***REMOVED******REMOVED***//***REMOVED***Debug:***REMOVED***afficher***REMOVED***les***REMOVED***informations***REMOVED***de***REMOVED***l'avatar
***REMOVED******REMOVED***console.log('UserAvatar***REMOVED***Debug:',***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***user:***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***first_name:***REMOVED***user.first_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***last_name:***REMOVED***user.last_name,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***avatar_url:***REMOVED***user.avatar_url,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***photo_url:***REMOVED***user.photo_url
***REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED***finalAvatarUrl:***REMOVED***avatarUrl,
***REMOVED******REMOVED******REMOVED******REMOVED***fallback,
***REMOVED******REMOVED******REMOVED******REMOVED***hasAvatar:***REMOVED***!!avatarUrl
***REMOVED******REMOVED***});

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Avatar
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***src={avatarUrl}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***fallback={fallback}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***size={size}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={className}
***REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED***);
};
