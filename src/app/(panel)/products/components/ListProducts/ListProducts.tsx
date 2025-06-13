import { map } from "lodash";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { ListProductsProps } from "./ListProducts.type";
import { Product } from "./Product";
import { Modal } from "@/components/shared";
import { ProductModel } from "@/models";
import { useState } from "react";
import { toast } from "sonner";
import { productCtrl } from "@/api";

export function ListProducts(props: ListProductsProps) {
  const { products, setEditProduct, onReload } = props;
  const [deleteProduct, setDeleteProduct] = useState<ProductModel>();

  const onDeleteProduct = async () => {
    if (!deleteProduct) return;

    try {
      await productCtrl.remove(deleteProduct.id);
      setDeleteProduct(undefined);
      onReload();
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el producto");
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Nota</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {map(products, (product) => (
            <Product
              key={product.id}
              product={product}
              setEditProduct={setEditProduct}
              setDeleteProduct={setDeleteProduct}
            />
          ))}
        </TableBody>
      </Table>

      <Modal.Confirm
        title="Eliminar producto"
        description={`¿Estas seguro de que quieres eliminar el producto ${deleteProduct?.name}?`}
        onCancel={() => setDeleteProduct(undefined)}
        onConfirm={onDeleteProduct}
        open={!!deleteProduct}
        danger
      />
    </>
  );
}
