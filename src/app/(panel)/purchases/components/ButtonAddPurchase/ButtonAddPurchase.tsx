"use client";

import { ButtonAddPurchaseProps } from "./ButtonAddPurchase.types";
import styles from "./ButtonAddPurchase.module.scss";
import { Button } from "@/components/ui";
import { Plus } from "lucide-react";
import { Modal } from "@/components/shared";
import { useEffect, useState } from "react";
import { PurchaseForm } from "../PurchaseForm";

export function ButtonAddPurchase(props: ButtonAddPurchaseProps) {
  const { editPurchase, setEditPurchase, onReload } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (editPurchase) setOpen(true);
  }, [editPurchase]);

  const onOpenForm = () => {
    setOpen(true);
  };

  const onCloseForm = () => {
    setOpen(false);
    setEditPurchase(undefined);
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className={styles.button}
        onClick={onOpenForm}
      >
        <Plus className={styles.icon} />
      </Button>

      <Modal.Basic
        title={editPurchase ? "Editar compra" : "Crear compra"}
        open={open}
        onClose={onCloseForm}
      >
        <PurchaseForm
          editPurchase={editPurchase}
          onCloseForm={onCloseForm}
          onReload={onReload}
        />
      </Modal.Basic>
    </>
  );
}
