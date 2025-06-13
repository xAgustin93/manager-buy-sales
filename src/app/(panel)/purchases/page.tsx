"use client";

import { useEffect, useState } from "react";
import { PurchaseModel } from "@/models";
import { purchasesCtrl } from "@/api";
import { Skeleton } from "@/components/shared";
import { ListPurchases, ButtonAddPurchase } from "./components";
import styles from "./page.module.scss";
import { Button } from "@/components/ui";

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<PurchaseModel[]>();
  const [editPurchase, setEditPurchase] = useState<PurchaseModel>();
  const [hasStock, setHasStock] = useState(true);

  useEffect(() => {
    getPurchases();
  }, [hasStock]);

  const getPurchases = async () => {
    try {
      setPurchases(undefined);
      const response = await purchasesCtrl.getAll(hasStock);
      setPurchases(response);
    } catch (error) {
      console.error(error);
    }
  };

  if (!purchases) return <Skeleton.List />;

  return (
    <div>
      <ButtonAddPurchase
        editPurchase={editPurchase}
        setEditPurchase={setEditPurchase}
        onReload={getPurchases}
      />

      <div className={styles.btnActionContent}>
        <Button onClick={() => setHasStock(!hasStock)}>
          {hasStock ? "Ver sin stock" : "Ver con stock"}
        </Button>
      </div>
      <ListPurchases
        purchases={purchases}
        setEditPurchase={setEditPurchase}
        onReload={getPurchases}
      />
    </div>
  );
}
