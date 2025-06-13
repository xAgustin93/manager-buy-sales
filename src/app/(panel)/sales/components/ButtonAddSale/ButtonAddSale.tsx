"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui";
import { ButtonAddSaleProps } from "./ButtonAddSale.types";
import styles from "./ButtonAddSale.module.scss";
import { Plus } from "lucide-react";
import { Modal } from "@/components/shared";
import { SaleForm } from "../SaleForm";

export function ButtonAddSale(props: ButtonAddSaleProps) {
  const { editSale, setEditSale, onReload } = props;
  const [openForm, setOpenForm] = useState(false);

  const onOpenForm = () => {
    setOpenForm(true);
  };

  const onCloseForm = () => {
    setOpenForm(false);
    setEditSale(undefined);
  };

  useEffect(() => {
    if (editSale) onOpenForm();
  }, [editSale]);

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
        title={editSale ? "Editar venta" : "Crear venta"}
        open={openForm}
        onClose={onCloseForm}
      >
        <SaleForm
          editSale={editSale}
          onCloseForm={onCloseForm}
          onReload={onReload}
        />
      </Modal.Basic>
    </>
  );
}
