"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/layouts";
import { purchasesCtrl, saleCtrl } from "@/api";
import { forEach } from "lodash";
import { Box } from "@/components/shared";
import styles from "./home.module.scss";

export function HomePage() {
  const [stock, setStock] = useState(0);
  const [totalSold, setTotalSold] = useState(0);
  const [moneyInvested, setMoneyInvested] = useState(0);

  useEffect(() => {
    getPurchases();
    getSales();
  }, []);

  const getPurchases = async () => {
    try {
      const response = await purchasesCtrl.getAll();
      let stockTemp = 0;
      let moneyInvestedTemp = 0;

      forEach(response, (item) => {
        stockTemp += item.stock;
        moneyInvestedTemp += item.price * item.quantity;
      });

      setStock(stockTemp);
      setMoneyInvested(Number(moneyInvestedTemp.toFixed(2)));
    } catch (error) {
      console.error(error);
    }
  };

  const getSales = async () => {
    try {
      const response = await saleCtrl.getAll();

      let totalSoldTemp = 0;

      forEach(response, (item) => {
        totalSoldTemp += item.price * item.quantity;
      });

      setTotalSold(Number(totalSoldTemp.toFixed(2)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.gridBoxs}>
        <Box.Simple title="Ganancias">{totalSold - moneyInvested}€</Box.Simple>
        <Box.Simple title="Stock">{stock} unidades</Box.Simple>
        <Box.Simple title="Total vendido">{totalSold}€</Box.Simple>
        <Box.Simple title="Dinero gastado">{moneyInvested}€</Box.Simple>
      </div>
    </DashboardLayout>
  );
}
