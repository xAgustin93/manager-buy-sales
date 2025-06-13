import { DashboardLayout } from "@/layouts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manager Stock",
};

export default function PanelLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const { children } = props;

  return <DashboardLayout>{children}</DashboardLayout>;
}
