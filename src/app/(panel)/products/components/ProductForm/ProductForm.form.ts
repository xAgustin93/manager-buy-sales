import { z } from "zod";
import { ProductModel } from "@/models";

export function initialValues(product: ProductModel | undefined) {
  return {
    name: product?.name || "",
    note: product?.note || "",
  };
}

export const validationSchame = z.object({
  name: z.string().min(2, { message: "Minimo 2 caracteres" }),
  note: z.string(),
});
