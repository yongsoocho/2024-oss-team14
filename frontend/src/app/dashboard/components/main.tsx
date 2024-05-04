import React from "react";
import ReportedErrorList from "./reported-error-list";
import Search from "./search";
import { Flex, Separator } from "@radix-ui/themes";

export default function Main() {
  return (
    <Flex direction="column" width={"100%"} style={{ padding: "20px 0px" }}>
      <div style={{ padding: "0px 40px" }}>
        <Search />
      </div>
      <Separator my="5" size="4" />
      <div style={{ padding: "0px 40px" }}>
        <ReportedErrorList />
      </div>
    </Flex>
  );
}
