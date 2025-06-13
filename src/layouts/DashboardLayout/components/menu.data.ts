import { Home, Package, ShoppingBasket, ShoppingCart } from "lucide-react";

export const menuData = [
  {
    id: 1,
    title: "Dashboard",
    link: "/",
    Icon: Home,
  },
  {
    id: 2,
    title: "Productos",
    link: "/products",
    Icon: Package,
  },
  {
    id: 3,
    title: "Compras",
    link: "/purchases",
    Icon: ShoppingBasket,
  },
  {
    id: 4,
    title: "Ventas",
    link: "/sales",
    Icon: ShoppingCart,
  },
];
