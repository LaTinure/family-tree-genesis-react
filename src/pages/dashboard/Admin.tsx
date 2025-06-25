
import***REMOVED***{***REMOVED***useState***REMOVED***}***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***useAuth***REMOVED***}***REMOVED***from***REMOVED***'@/hooks/useAuth';
import***REMOVED***{***REMOVED***Navigate***REMOVED***}***REMOVED***from***REMOVED***'react-router-dom';
import***REMOVED***{***REMOVED***ROUTES***REMOVED***}***REMOVED***from***REMOVED***'@/lib/constants/routes';
import***REMOVED***{***REMOVED***FormHeader***REMOVED***}***REMOVED***from***REMOVED***'@/components/shared/FormHeader';
import***REMOVED***{***REMOVED***UserManagementTable***REMOVED***}***REMOVED***from***REMOVED***'@/components/admin/UserManagementTable';
import***REMOVED***{***REMOVED***EditUserDialog***REMOVED***}***REMOVED***from***REMOVED***'@/components/admin/EditUserDialog';
import***REMOVED***{***REMOVED***ProfileData***REMOVED***}***REMOVED***from***REMOVED***'@/types/profile';

const***REMOVED***Admin***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***{***REMOVED***user,***REMOVED***loading***REMOVED***}***REMOVED***=***REMOVED***useAuth();
***REMOVED******REMOVED***const***REMOVED***[selectedUser,***REMOVED***setSelectedUser]***REMOVED***=***REMOVED***useState<ProfileData***REMOVED***|***REMOVED***null>(null);
***REMOVED******REMOVED***const***REMOVED***[isEditDialogOpen,***REMOVED***setIsEditDialogOpen]***REMOVED***=***REMOVED***useState(false);

***REMOVED******REMOVED***//***REMOVED***Redirection***REMOVED***si***REMOVED***pas***REMOVED***admin
***REMOVED******REMOVED***if***REMOVED***(loading)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***<div>Chargement...</div>;
***REMOVED******REMOVED***}

***REMOVED******REMOVED***if***REMOVED***(!user)***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***return***REMOVED***<Navigate***REMOVED***to={ROUTES.AUTH.LOGIN}***REMOVED***replace***REMOVED***/>;
***REMOVED******REMOVED***}

***REMOVED******REMOVED***//***REMOVED***TODO:***REMOVED***Vérifier***REMOVED***si***REMOVED***l'utilisateur***REMOVED***est***REMOVED***admin
***REMOVED******REMOVED***//***REMOVED***Pour***REMOVED***l'instant,***REMOVED***on***REMOVED***suppose***REMOVED***que***REMOVED***tous***REMOVED***les***REMOVED***utilisateurs***REMOVED***connectés***REMOVED***peuvent***REMOVED***accéder
***REMOVED******REMOVED***//***REMOVED***En***REMOVED***production,***REMOVED***il***REMOVED***faudrait***REMOVED***vérifier***REMOVED***le***REMOVED***rôle***REMOVED***admin

***REMOVED******REMOVED***const***REMOVED***handleEditUser***REMOVED***=***REMOVED***(user:***REMOVED***ProfileData)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***setSelectedUser(user);
***REMOVED******REMOVED******REMOVED******REMOVED***setIsEditDialogOpen(true);
***REMOVED******REMOVED***};

***REMOVED******REMOVED***const***REMOVED***handleCloseEditDialog***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***setSelectedUser(null);
***REMOVED******REMOVED******REMOVED******REMOVED***setIsEditDialogOpen(false);
***REMOVED******REMOVED***};

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="min-h-screen***REMOVED***bg-gradient-to-br***REMOVED***from-blue-50***REMOVED***via-white***REMOVED***to-green-50">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="container***REMOVED***mx-auto***REMOVED***px-4***REMOVED***py-8">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="max-w-7xl***REMOVED***mx-auto***REMOVED***space-y-6">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<FormHeader
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***title="Administration"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***subtitle="Gestion***REMOVED***des***REMOVED***utilisateurs***REMOVED***et***REMOVED***de***REMOVED***la***REMOVED***famille"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<UserManagementTable***REMOVED***onEditUser={handleEditUser}***REMOVED***/>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<EditUserDialog
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***user={selectedUser}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***isOpen={isEditDialogOpen}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onClose={handleCloseEditDialog}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED***);
};

export***REMOVED***default***REMOVED***Admin;
