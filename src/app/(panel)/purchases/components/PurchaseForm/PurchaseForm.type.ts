import { PurchaseModel } from "@/models";

export type PurchaseFormProps = {
  editPurchase?: PurchaseModel;
  onCloseForm: () => void;
  onReload: () => Promise<void>;
};
