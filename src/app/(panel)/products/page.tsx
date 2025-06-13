"use client";

import { ProductModel } from "@/models";
import { useEffect, useState } from "react";
import { productCtrl } from "@/api";
import { Skeleton } from "@/components/shared";
import { ListProducts, ButtonAddProduct } from "./components";

export default function ProductPage() {
  const [products, setProducts] = useState<ProductModel[]>();
  const [editProduct, setEditProduct] = useState<ProductModel>();

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

  if (!products) return <Skeleton.List />;

  return (
    <div>
      <ButtonAddProduct
        onReload={getProducts}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
      />
      <ListProducts
        products={products}
        onReload={getProducts}
        setEditProduct={setEditProduct}
      />
    </div>
  );
}
