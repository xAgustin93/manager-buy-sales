import { useState, useEffect } from "react";
import { ConfimModalProps } from "./ConfimModal.type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui";
import styles from "./ConfimModal.module.scss";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib";

export function ConfimModal(props: ConfimModalProps) {
  const { title, description, open, onConfirm, onCancel, danger } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) setLoading(false);
  }, [open]);

  const onConfirmAction = () => {
    setLoading(true);
    onConfirm();
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirmAction}
            className={cn(danger && styles.btnDanger)}
          >
            {loading ? <LoaderCircle className={styles.load} /> : "Continuar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
