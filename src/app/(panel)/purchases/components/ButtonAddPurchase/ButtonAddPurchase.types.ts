import { PurchaseModel } from "@/models";
import { Dispatch, SetStateAction } from "react";

export type ButtonAddPurchaseProps = {
  editPurchase?: PurchaseModel;
  setEditPurchase: Dispatch<SetStateAction<PurchaseModel | undefined>>;
  onReload: () => Promise<void>;
};
