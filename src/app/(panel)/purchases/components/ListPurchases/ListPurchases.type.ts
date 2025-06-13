import { PurchaseModel } from "@/models";
import { Dispatch, SetStateAction } from "react";

export type ListPurchasesProps = {
  purchases: PurchaseModel[];
  setEditPurchase: Dispatch<SetStateAction<PurchaseModel | undefined>>;
  onReload: () => Promise<void>;
};
