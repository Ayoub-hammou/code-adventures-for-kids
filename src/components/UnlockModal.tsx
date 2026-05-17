import { useState, useEffect } from "react";
import { useUI } from "@/lib/i18n";
import { validateUnlockCode } from "@/lib/unlock";
import { CelebrationAnimation } from "@/components/CelebrationAnimation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface UnlockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUnlock: (viaPassword: boolean) => void;
}

export function UnlockModal({ open, onOpenChange, onUnlock }: UnlockModalProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const t = useUI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateUnlockCode(code)) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setCode("");
        setSuccess(false);
        onUnlock(true);
        onOpenChange(false);
      }, 1200);
    } else {
      setError(true);
      setCode("");
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <>
      {success && <CelebrationAnimation />}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t.unlockTitle}</DialogTitle>
            <DialogDescription>{t.unlockDescription}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={t.unlockPlaceholder}
                autoFocus
                className={`w-full rounded-xl border-2 bg-input px-4 py-3 text-lg font-mono focus:outline-none transition-colors ${
                  error
                    ? "border-red-500 focus:border-red-500"
                    : success
                      ? "border-green-500 focus:border-green-500"
                      : "border-border focus:border-primary"
                }`}
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 font-semibold animate-pulse">
                ❌ {t.unlockError}
              </div>
            )}

            {success && (
              <div className="text-sm text-green-500 font-semibold animate-bounce">
                {t.unlockSuccess}
              </div>
            )}            <button
              type="submit"
              disabled={!code.trim() || success}
              className="w-full rounded-xl bg-primary text-primary-foreground px-6 py-3 font-bold text-lg hover:scale-[1.02] transition disabled:opacity-40"
            >
              {t.unlockButton} 🔓
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}





