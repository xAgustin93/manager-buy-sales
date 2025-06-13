import { z } from "zod";
import { SaleModel } from "@/models";

export function initialValues(editSale?: SaleModel) {
  return {
    purchaseId: editSale?.purchaseId || "",
    price: editSale?.price || 0,
    quantity: editSale?.quantity || 0,
    note: editSale?.note || "",
  };
}

export const validationSchema = z.object({
  purchaseId: z.string().min(1, { message: "Campo obrigatório" }),
  price: z.number().min(1, { message: "Campo obrigatório" }),
  quantity: z.number().min(1, { message: "Campo obrigatório" }),
  note: z.string(),
});
