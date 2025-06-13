import { SaleModel } from "@/models";
import { Dispatch, SetStateAction } from "react";

export type SaleProps = {
  sale: SaleModel;
  setDeleteSale: Dispatch<SetStateAction<SaleModel | undefined>>;
  setEditSale: Dispatch<SetStateAction<SaleModel | undefined>>;
};
