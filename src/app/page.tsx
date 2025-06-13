"use client";

import { useUser } from "@clerk/nextjs";
import { Loading } from "@/components/shared";
import { Login } from "./components";
import { HomePage } from "./(panel)/home";

export default function AppPage() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <Loading full />;
  if (!isSignedIn) return <Login />;

  return <HomePage />;
}
