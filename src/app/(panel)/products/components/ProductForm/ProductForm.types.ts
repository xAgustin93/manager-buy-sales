import { ProductModel } from "@/models";

export type ProductFormProps = {
  editProduct?: ProductModel;
  onCloseForm: () => void;
  onReload: () => Promise<void>;
};
