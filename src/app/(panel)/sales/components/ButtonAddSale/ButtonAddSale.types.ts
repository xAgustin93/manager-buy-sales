import { SaleModel } from "@/models";
import { Dispatch, SetStateAction } from "react";

export type ButtonAddSaleProps = {
  editSale?: SaleModel;
  setEditSale: Dispatch<SetStateAction<SaleModel | undefined>>;
  onReload: () => Promise<void>;
};
