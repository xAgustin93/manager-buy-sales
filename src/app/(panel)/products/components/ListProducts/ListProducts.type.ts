import { Dispatch, SetStateAction } from "react";
import { ProductModel } from "@/models";

export type ListProductsProps = {
  products: ProductModel[];
  setEditProduct: Dispatch<SetStateAction<ProductModel | undefined>>;
  onReload: () => void;
};
