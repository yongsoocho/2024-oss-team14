import React from "react";
import Sidebar from "./components/sidebar";
import { Flex } from "@radix-ui/themes";
import BottomIcon from "../../components/bottom-icon";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex>
      <Sidebar />
      {children}

      <BottomIcon />
    </Flex>
  );
}
