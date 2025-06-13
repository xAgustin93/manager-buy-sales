import { ProductModel } from "./ProductModel";

export type PurchaseModel = {
  id: string;
  product: ProductModel;
  productId: string;
  quantity: number;
  stock: number;
  price: number;
  createdAt: string;
};
