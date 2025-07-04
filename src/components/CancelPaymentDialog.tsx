import***REMOVED***{***REMOVED***useState***REMOVED***}***REMOVED***from***REMOVED***'react';
import***REMOVED***{***REMOVED***Dialog,***REMOVED***DialogContent,***REMOVED***DialogHeader,***REMOVED***DialogTitle,***REMOVED***DialogFooter***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/dialog';
import***REMOVED***{***REMOVED***Button***REMOVED***}***REMOVED***from***REMOVED***'@/components/ui/button';
import***REMOVED***{***REMOVED***useNavigate***REMOVED***}***REMOVED***from***REMOVED***'react-router-dom';

interface***REMOVED***CancelPaymentDialogProps***REMOVED***{
***REMOVED******REMOVED***open:***REMOVED***boolean;
***REMOVED******REMOVED***onClose:***REMOVED***()***REMOVED***=>***REMOVED***void;
***REMOVED******REMOVED***onDeleteAccount:***REMOVED***()***REMOVED***=>***REMOVED***Promise<void>;
}

export***REMOVED***default***REMOVED***function***REMOVED***CancelPaymentDialog({***REMOVED***open,***REMOVED***onClose,***REMOVED***onDeleteAccount***REMOVED***}:***REMOVED***CancelPaymentDialogProps)***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***[loading,***REMOVED***setLoading]***REMOVED***=***REMOVED***useState(false);
***REMOVED******REMOVED***const***REMOVED***navigate***REMOVED***=***REMOVED***useNavigate();

***REMOVED******REMOVED***const***REMOVED***handleDelete***REMOVED***=***REMOVED***async***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***setLoading(true);
***REMOVED******REMOVED******REMOVED******REMOVED***await***REMOVED***onDeleteAccount();
***REMOVED******REMOVED******REMOVED******REMOVED***setLoading(false);
***REMOVED******REMOVED***};

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Dialog***REMOVED***open={open}***REMOVED***onOpenChange={onClose}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DialogContent>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DialogHeader>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DialogTitle>Abandonner***REMOVED***la***REMOVED***création***REMOVED***de***REMOVED***dynastie***REMOVED***?</DialogTitle>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</DialogHeader>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<div***REMOVED***className="py-4***REMOVED***text-center***REMOVED***text-gray-700">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Si***REMOVED***vous***REMOVED***annulez,***REMOVED***votre***REMOVED***compte***REMOVED***sera***REMOVED***supprimé***REMOVED***définitivement.<br***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Voulez-vous***REMOVED***vraiment***REMOVED***abandonner***REMOVED***?
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</div>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DialogFooter***REMOVED***className="flex***REMOVED***flex-col***REMOVED***gap-2">
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Button***REMOVED***variant="destructive"***REMOVED***onClick={handleDelete}***REMOVED***disabled={loading}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{loading***REMOVED***?***REMOVED***'Suppression...'***REMOVED***:***REMOVED***'Oui,***REMOVED***supprimer***REMOVED***mon***REMOVED***compte'}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Button>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Button***REMOVED***variant="outline"***REMOVED***onClick={()***REMOVED***=>***REMOVED***navigate('/dynasty/payment')}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Non,***REMOVED***retenter***REMOVED***le***REMOVED***paiement
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Button>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</DialogFooter>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</DialogContent>
***REMOVED******REMOVED******REMOVED******REMOVED***</Dialog>
***REMOVED******REMOVED***);
}
