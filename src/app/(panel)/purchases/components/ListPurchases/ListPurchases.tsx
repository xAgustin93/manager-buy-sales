import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { map } from "lodash";
import { Purchase } from "./Purchase";
import { ListPurchasesProps } from "./ListPurchases.type";
import { PurchaseModel } from "@/models";
import { useState } from "react";
import { Modal } from "@/components/shared";
import { toast } from "sonner";
import { purchasesCtrl } from "@/api";

export function ListPurchases(props: ListPurchasesProps) {
  const { purchases, setEditPurchase, onReload } = props;
  const [deletePurchase, setDeletePurchase] = useState<PurchaseModel>();

  const onDeletePurchase = async () => {
    if (!deletePurchase) return;

    try {
      await purchasesCtrl.remove(deletePurchase.id);
      setDeletePurchase(undefined);
      onReload();
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar la compra");
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Producto</TableHead>
            <TableHead>Unidades compradas</TableHead>
            <TableHead>Precio de compra</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {map(purchases, (purchase) => (
            <Purchase
              key={purchase.id}
              purchase={purchase}
              setEditPurchase={setEditPurchase}
              setDeletePurchase={setDeletePurchase}
            />
          ))}
        </TableBody>
      </Table>

      <Modal.Confirm
        title="Eliminar compra"
        description="¿Estas seguro de que quieres eliminar la compra?"
        onCancel={() => setDeletePurchase(undefined)}
        onConfirm={onDeletePurchase}
        open={!!deletePurchase}
        danger
      />
    </>
  );
}
