"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { ListSalesProps } from "./ListSales.types";
import { map } from "lodash";
import { Sale } from "./Sale";
import { SaleModel } from "@/models";
import { useState } from "react";
import { Modal } from "@/components/shared";
import { purchasesCtrl, saleCtrl } from "@/api";

export function ListSales(props: ListSalesProps) {
  const { sales, setEditSale, onReload } = props;
  const [deleteSale, setDeleteSale] = useState<SaleModel>();

  const onDeleteSale = async () => {
    if (!deleteSale) return;

    try {
      await saleCtrl.remove(deleteSale.id);
      await purchasesCtrl.update(deleteSale.purchaseId, {
        stock: deleteSale.purchase.stock + deleteSale.quantity,
      });
      await onReload();
      setDeleteSale(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Producto</TableHead>
            <TableHead>Cantidad vendida</TableHead>
            <TableHead>Precio de venta</TableHead>
            <TableHead>Fecha de venta</TableHead>
            <TableHead>Nota</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {map(sales, (sale) => (
            <Sale
              key={sale.id}
              sale={sale}
              setEditSale={setEditSale}
              setDeleteSale={setDeleteSale}
            />
          ))}
        </TableBody>
      </Table>

      <Modal.Confirm
        title="Eliminar venta"
        description="¿Estas seguro de que quieres eliminar la venta?"
        onCancel={() => setDeleteSale(undefined)}
        onConfirm={onDeleteSale}
        open={!!deleteSale}
        danger
      />
    </>
  );
}
