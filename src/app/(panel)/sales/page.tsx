"use client";

import { useState, useEffect } from "react";
import { SaleModel } from "@/models";
import { saleCtrl } from "@/api";
import { Skeleton } from "@/components/shared";
import { ListSales } from "./components/ListSales";
import { ButtonAddSale } from "./components";

export default function SalesPage() {
  const [sales, setSales] = useState<SaleModel[]>();
  const [editSale, setEditSale] = useState<SaleModel>();

  useEffect(() => {
    getSales();
  }, []);

  const getSales = async () => {
    try {
      const response = await saleCtrl.getAll();
      setSales(response);
    } catch (error) {
      console.error(error);
    }
  };

  if (!sales) return <Skeleton.List />;

  return (
    <div>
      <ButtonAddSale
        onReload={getSales}
        editSale={editSale}
        setEditSale={setEditSale}
      />
      <ListSales sales={sales} setEditSale={setEditSale} onReload={getSales} />
    </div>
  );
}
