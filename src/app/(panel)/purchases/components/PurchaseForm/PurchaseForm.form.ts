import { z } from "zod";
import { PurchaseModel } from "@/models";

export function initialValues(data: PurchaseModel | undefined) {
  return {
    productId: data?.productId || "",
    quantity: data?.quantity || 0,
    price: data?.price || 0,
  };
}

export const validationSchame = z.object({
  productId: z.string().min(1, { message: "Campo obligatorio" }),
  quantity: z.number().min(1, { message: "Campo obligatorio" }),
  price: z.number().min(1, { message: "Campo obligatorio" }),
});
