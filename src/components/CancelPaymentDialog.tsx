
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface CancelPaymentDialogProps {
  open: boolean;
  onClose: () => void;
  onDeleteAccount: () => Promise<void>;
}

export default function CancelPaymentDialog({ open, onClose, onDeleteAccount }: CancelPaymentDialogProps) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    await onDeleteAccount();
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Abandonner la création de dynastie ?</DialogTitle>
        </DialogHeader>
        <div className="py-4 text-center text-gray-700">
          Si vous annulez, votre compte sera supprimé définitivement.<br/>
          Voulez-vous vraiment abandonner ?
        </div>
        <DialogFooter className="flex flex-col gap-2">
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? 'Suppression...' : 'Oui, supprimer mon compte'}
          </Button>
          <Button variant="outline" onClick={() => navigate('/dynasty/payment')}>
            Non, retenter le paiement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
