import { ProductModel } from "@/models";
import { Dispatch, SetStateAction } from "react";

export type ButtonAddProductProps = {
  editProduct?: ProductModel;
  setEditProduct: Dispatch<SetStateAction<ProductModel | undefined>>;
  onReload: () => Promise<void>;
};
