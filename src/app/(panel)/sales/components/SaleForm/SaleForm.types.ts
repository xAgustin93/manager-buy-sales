import { SaleModel } from "@/models";

export type SaleFormProps = {
  onCloseForm: () => void;
  onReload: () => Promise<void>;
  editSale?: SaleModel;
};
