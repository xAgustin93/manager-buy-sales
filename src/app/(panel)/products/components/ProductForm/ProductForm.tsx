import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  Textarea,
} from "@/components/ui";
import { toast } from "sonner";
import { productCtrl } from "@/api";
import { initialValues, validationSchame } from "./ProductForm.form";
import { ProductFormProps } from "./ProductForm.types";
import styles from "./ProductForm.module.scss";

export function ProductForm(props: ProductFormProps) {
  const { editProduct, onCloseForm, onReload } = props;

  const form = useForm({
    defaultValues: initialValues(editProduct),
    resolver: zodResolver(validationSchame),
  });

  const onSubmit = async (values: z.infer<typeof validationSchame>) => {
    try {
      if (editProduct) {
        await productCtrl.update(editProduct.id, values);
        toast.success("Producto editado correctamente");
      } else {
        await productCtrl.create(values);
        toast.success("Producto creado correctamente");
      }

      await onReload();
      onCloseForm();
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el producto");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Nombre del producto"
                  className={styles.input}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="note"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Escribe una nota sobre el producto"
                  className={styles.input}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className={styles.btnSubmit}>
          {editProduct ? "Actualizar producto" : "Crear producto"}
        </Button>
      </form>
    </Form>
  );
}
