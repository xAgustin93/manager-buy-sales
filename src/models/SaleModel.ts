import { PurchaseModel } from "./PurchaseModel";

export type SaleModel = {
  id: string;
  purchase: PurchaseModel;
  purchaseId: string;
  quantity: number;
  price: number;
  note?: string;
  createdAt: string;
};
