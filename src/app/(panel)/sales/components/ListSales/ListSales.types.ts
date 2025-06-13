import { Dispatch, SetStateAction } from "react";
import { SaleModel } from "@/models";

export type ListSalesProps = {
  sales: SaleModel[];
  onReload: () => Promise<void>;
  setEditSale: Dispatch<SetStateAction<SaleModel | undefined>>;
};
