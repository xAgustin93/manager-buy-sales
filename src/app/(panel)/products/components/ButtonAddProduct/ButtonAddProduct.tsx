import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui";
import { Modal } from "@/components/shared";
import { ProductForm } from "../ProductForm";
import { ButtonAddProductProps } from "./ButtonAddProduct.types";
import styles from "./ButtonAddProduct.module.scss";

export function ButtonAddProduct(props: ButtonAddProductProps) {
  const { editProduct, setEditProduct, onReload } = props;
  const [openForm, setOpenForm] = useState(false);

  const onOpenForm = () => setOpenForm(true);

  const onCloseForm = () => {
    setEditProduct(undefined);
    setOpenForm(false);
  };

  useEffect(() => {
    if (editProduct) onOpenForm();
  }, [editProduct]);

  return (
    <>
      <Button size="icon" className={styles.button} onClick={onOpenForm}>
        <Plus />
      </Button>

      <Modal.Basic
        title={editProduct ? "Editar producto" : "Crear producto"}
        open={openForm}
        onClose={onCloseForm}
      >
        <ProductForm
          editProduct={editProduct}
          onCloseForm={onCloseForm}
          onReload={onReload}
        />
      </Modal.Basic>
    </>
  );
}
