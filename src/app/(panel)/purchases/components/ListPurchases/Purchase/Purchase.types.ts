import { PurchaseModel } from "@/models";
import { Dispatch, SetStateAction } from "react";

export type PurchaseProps = {
  purchase: PurchaseModel;
  setEditPurchase: Dispatch<SetStateAction<PurchaseModel | undefined>>;
  setDeletePurchase: Dispatch<SetStateAction<PurchaseModel | undefined>>;
};
