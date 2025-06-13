import { DateTime } from "luxon";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  TableCell,
  TableRow,
} from "@/components/ui";
import { SaleProps } from "./Sale.types";
import styles from "./Sale.module.scss";
import { MoreHorizontal } from "lucide-react";

export function Sale(props: SaleProps) {
  const { sale, setEditSale, setDeleteSale } = props;
  const date = DateTime.fromISO(sale.createdAt);
  const formattedDate = date.toFormat("dd/MM/yyyy");

  return (
    <TableRow>
      <TableCell>{sale.purchase.product.name}</TableCell>
      <TableCell>{sale.quantity} unidades</TableCell>
      <TableCell>
        {sale.price}€ ({sale.quantity * sale.price}€)
      </TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{sale?.note || ""}</TableCell>

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className={styles.btnOptions}>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setEditSale(sale)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeleteSale(sale)}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
