import { useUI } from "@/lib/i18n";
import { CelebrationAnimation } from "@/components/CelebrationAnimation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CongratulatationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CongratulatationsModal({ open, onOpenChange }: CongratulatationsModalProps) {
  const t = useUI();

  return (
    <>
      {open && <CelebrationAnimation />}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md text-center" hideCloseButton>
          <DialogHeader>
            <DialogTitle className="text-3xl text-center">{t.conceptsCompleted}</DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full rounded-xl bg-primary text-primary-foreground px-6 py-3 font-bold text-lg hover:scale-[1.02] transition"
            >
              {t.gotIt}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

