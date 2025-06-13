import { ProductModel } from "@/models";
import { Dispatch, SetStateAction } from "react";

export type ProductProps = {
  product: ProductModel;
  setEditProduct: Dispatch<SetStateAction<ProductModel | undefined>>;
  setDeleteProduct: Dispatch<SetStateAction<ProductModel | undefined>>;
};
