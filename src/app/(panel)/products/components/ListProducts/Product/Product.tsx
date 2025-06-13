import {
  TableCell,
  TableRow,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui";
import { ProductProps } from "./Product.types";
import styles from "./Product.module.scss";
import { MoreHorizontal } from "lucide-react";

export function Product(props: ProductProps) {
  const { product, setEditProduct, setDeleteProduct } = props;

  return (
    <TableRow>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.note}</TableCell>

      <TableCell className={styles.actions}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal className={styles.btnOptions} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setEditProduct(product)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeleteProduct(product)}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
