import { useState } from "react";
import { AlertTriangle, ExternalLink, Shield } from "lucide-react";
import { useLanguage } from "@/i18n/useLanguage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ExternalLinkWarningProps {
  url: string;
  children: React.ReactNode;
  className?: string;
}

export function ExternalLinkWarning({ url, children, className }: ExternalLinkWarningProps) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleConfirm = () => {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <>
      <a href={url} onClick={handleClick} className={className}>
        {children}
      </a>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <AlertDialogTitle className="text-center">{t("external.leaving")}</AlertDialogTitle>
            <AlertDialogDescription className="text-center space-y-3">
              <p>{t("external.visiting")}</p>
              <p className="font-mono text-sm bg-muted px-3 py-2 rounded-lg break-all">
                {url}
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 my-2">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                <p className="font-medium">{t("external.safetyTitle")}</p>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• {t("external.tip1")}</li>
                  <li>• {t("external.tip2")}</li>
                  <li>• {t("external.tip3")}</li>
                  <li>• {t("external.tip4")}</li>
                </ul>
              </div>
            </div>
          </div>

          <AlertDialogFooter className="sm:flex-col gap-2">
            <AlertDialogAction 
              onClick={handleConfirm}
              className="w-full bg-muted text-foreground hover:bg-muted/80"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {t("external.confirm")}
            </AlertDialogAction>
            <AlertDialogCancel className="w-full mt-0">
              {t("external.cancel")}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
