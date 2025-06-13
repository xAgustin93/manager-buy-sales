"use client";

import { Button, Sheet, SheetContent, SheetTrigger } from "@/components/ui";
import styles from "./TopBar.module.scss";
import { LogOut, Menu, Package2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { map } from "lodash";
import { menuData } from "../menu.data";

export function TopBar() {
  const { signOut } = useAuth();

  return (
    <header className={styles.container}>
      <div className={styles.leftContainer}>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={styles.btnMenuMobile}
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className={styles.menuMobile}>
              <Link href="/" className={styles.logoApp}>
                <Package2 />
                <span>Manager Stock</span>
              </Link>

              {map(menuData, (item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className={styles.itemMenu}
                >
                  <item.Icon />
                  {item.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <div>
        <h2 className={styles.nameApp}>Manager Stock</h2>
      </div>

      <div className={styles.rightContent}>
        <Button
          variant="secondary"
          size="icon"
          className={styles.btnLogout}
          onClick={() => signOut()}
        >
          <LogOut className={styles.iconLogout} />
        </Button>
      </div>
    </header>
  );
}
