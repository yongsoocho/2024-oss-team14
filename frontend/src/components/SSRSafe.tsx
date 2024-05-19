"use client";

import { isServer } from "@/utils/isServer";
import React, {
  ComponentProps,
  PropsWithChildren,
  Suspense,
  useEffect,
  useState,
} from "react";

export default function SSRSafeSuspense({
  children,
  fallback = null,
}: PropsWithChildren<{
  fallback?: ComponentProps<typeof Suspense>["fallback"];
}>) {
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);
  }, []);
  if (isServer() === true || isMount !== true) {
    return null;
  }
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
