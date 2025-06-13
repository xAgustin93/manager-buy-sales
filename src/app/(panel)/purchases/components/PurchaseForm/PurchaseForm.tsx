"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { initialValues, validationSchame } from "./PurchaseForm.form";
import { PurchaseFormProps } from "./PurchaseForm.type";
import styles from "./PurchaseForm.module.scss";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { productCtrl, purchasesCtrl } from "@/api";
import { ProductModel } from "@/models";
import { useEffect, useState } from "react";
import { map } from "lodash";
import { toast } from "sonner";

export function PurchaseForm(props: PurchaseFormProps) {
  const { editPurchase, onCloseForm, onReload } = props;
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await productCtrl.getAll();
      setProducts(response);
    } catch (error) {
      console.error(error);
    }
  };

  const form = useForm({
    defaultValues: initialValues(editPurchase),
    resolver: zodResolver(validationSchame),
  });

  const onSubmit = async (values: z.infer<typeof validationSchame>) => {
    try {
      if (!editPurchase) {
        await purchasesCtrl.create(values);
      } else {
        await purchasesCtrl.update(editPurchase.id, values);
      }

      await onReload();
      onCloseForm();
    } catch (error) {
      console.error(error);
      toast.error("Error al crear la compra");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="productId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Label className={styles.label}>Producto</Label>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger className={styles.selectTrigger}>
                    <SelectValue placeholder="Seleciona un producto" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {map(products, (product) => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <div className={styles.twoInput}>
          <FormField
            name="quantity"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label className={styles.label}>Unidades compradas</Label>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className={styles.input}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label className={styles.label}>Precio de compra</Label>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className={styles.input}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className={styles.btnSubmit}>
          {editPurchase ? "Actualizar compra" : "Crear compra"}
        </Button>
      </form>
    </Form>
  );
}
