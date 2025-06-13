import { PurchaseProps } from "./Purchase.types";
import sytles from "./Purchase.module.scss";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  TableCell,
  TableRow,
  DropdownMenuContent,
} from "@/components/ui";
import { MoreHorizontal } from "lucide-react";

export function Purchase(props: PurchaseProps) {
  const { purchase, setEditPurchase, setDeletePurchase } = props;

  return (
    <TableRow>
      <TableCell>{purchase.product.name}</TableCell>
      <TableCell>{purchase.quantity}</TableCell>
      <TableCell>{purchase.price} €</TableCell>
      <TableCell>{purchase.stock}</TableCell>

      <TableCell className={sytles.actions}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setEditPurchase(purchase)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeletePurchase(purchase)}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
