"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";
import { initialValues, validationSchema } from "./SaleForm.form";
import { SaleFormProps } from "./SaleForm.types";
import styles from "./SaleForm.module.scss";
import { PurchaseModel } from "@/models";
import { purchasesCtrl, saleCtrl } from "@/api";
import { map } from "lodash";
import { useAuth } from "@clerk/nextjs";

export function SaleForm(props: SaleFormProps) {
  const { editSale, onCloseForm, onReload } = props;
  const [purchases, setPurchases] = useState<PurchaseModel[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    getPurchases();
  }, []);

  const getPurchases = async () => {
    try {
      const response = await purchasesCtrl.getAll(true);
      setPurchases(response);
    } catch (error) {
      console.error(error);
    }
  };

  const form = useForm({
    defaultValues: initialValues(editSale),
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (values: z.infer<typeof validationSchema>) => {
    if (editSale) {
      await saleCtrl.update(editSale.id, values);
    } else {
      const purchase = purchases.find(
        (purchase) => purchase.id === values.purchaseId
      );

      if (purchase) {
        await saleCtrl.create({ ...values, userId });
        await purchasesCtrl.update(values.purchaseId, {
          stock: purchase.stock - values.quantity,
        });
      }
    }

    await onReload();
    onCloseForm();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {!editSale && (
          <>
            <FormField
              control={form.control}
              name="purchaseId"
              render={({ field }) => (
                <FormItem>
                  <Label>¿Que has vendido?</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                    onOpenChange={setIsOpen}
                  >
                    <FormControl>
                      <SelectTrigger className={styles.selectTrigger}>
                        <SelectValue placeholder="Selecciona un producto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {map(purchases, (purchase) => (
                        <SelectItem
                          key={purchase.id}
                          value={purchase.id.toString()}
                        >
                          <p>{purchase.product.name}</p>

                          {isOpen && (
                            <div className={styles.stockPurchase}>
                              <span>En stock: {purchase.stock}</span>
                              <span>
                                Precio de compra: {purchase.price}€ / unidad
                              </span>
                              <hr className="my-1" />
                              {purchase.product.note && (
                                <span>Nota: {purchase.product.note}</span>
                              )}
                            </div>
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <Label>¿Cuantos has vendido?</Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="¿Cuantos has vendido?"
                      className={styles.input}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <Label>Precio de venta</Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Precio de venta"
                      className={styles.input}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <Label>Nota sobre la venta</Label>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Escribe una nota sobre la venta"
                  className={styles.input}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className={styles.btnSubmit}>
          {editSale ? "Editar venta" : "Crear venta"}
        </Button>
      </form>
    </Form>
  );
}
