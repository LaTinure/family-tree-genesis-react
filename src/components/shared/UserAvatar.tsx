
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

***REMOVED******REMOVED***const***REMOVED***avatarUrl***REMOVED***=***REMOVED***user.avatar_url***REMOVED***||***REMOVED***user.photo_url;
***REMOVED******REMOVED***const***REMOVED***fallback***REMOVED***=***REMOVED***`${user.first_name?.[0]***REMOVED***||***REMOVED***''}${user.last_name?.[0]***REMOVED***||***REMOVED***''}`***REMOVED***||***REMOVED***'U';

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Avatar
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***src={avatarUrl}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***fallback={fallback}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***size={size}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***className={className}
***REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED***);
};
