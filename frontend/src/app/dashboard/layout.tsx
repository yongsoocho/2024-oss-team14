import React from "react";
import Sidebar from "./components/sidebar";
import { Flex } from "@radix-ui/themes";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex>
      <Sidebar />
      {children}
    </Flex>
  );
}
