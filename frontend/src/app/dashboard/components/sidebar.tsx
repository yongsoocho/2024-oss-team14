"use client";

import { Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import { useGetProjectListQuery } from "../remote";
import { useAtom } from "jotai";
import SSRSafeSuspense from "@/components/SSRSafe";
import { selectedProjectAtom } from "../store/selected-project";

export default function Sidebar() {
  return (
    <div
      style={{
        backgroundColor: "#271a37",
        height: "100vh",
        minWidth: "320px",
        width: "20%",
        paddingTop: 20,
        paddingLeft: 20,
      }}
    >
      <ProjectInfo />
      <Box height={"40px"} />
      <SSRSafeSuspense fallback={null}>
        <ProjectList />
      </SSRSafeSuspense>
    </div>
  );
}

function ProjectInfo() {
  return (
    <Flex gap={"12px"}>
      <Image src="/cau-logo.png" alt="" width="48" height={48} />
      <Flex direction="column" gap={"4px"} style={{ paddingRight: 8 }}>
        <Text style={{ color: "white" }}>Open Source Inc.</Text>
        <Text style={{ color: "lightgray" }}>team 14</Text>
      </Flex>
    </Flex>
  );
}

function ProjectList() {
  const products = useGetProjectListQuery().data;
  const [selectedProduct, setSelectedProduct] = useAtom(
    selectedProjectAtom(products[0])
  );

  return (
    <>
      <Text size="4" style={{ color: "white" }} weight="bold">
        Projects
      </Text>
      <Box height={"16px"} />
      <Flex direction="column" gap={"8px"}>
        {products.map((p) => {
          const isSelected = p.projectId === selectedProduct.projectId;
          const color = isSelected === true ? "white" : "gray";
          return (
            <Text
              style={{ color }}
              weight="bold"
              key={p.projectId}
              onClick={() => setSelectedProduct(p)}
            >
              {p.name}
            </Text>
          );
        })}
      </Flex>
    </>
  );
}
