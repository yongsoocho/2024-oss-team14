import React from "react";
import ReportedErrorList from "./reported-error-list";
import Search from "./search";
import { Box, Flex, Separator } from "@radix-ui/themes";
import SSRSafeSuspense from "@/components/SSRSafe";
import DropdownFilter from "./DropdownFilter";
import { CodeEditorWithDialog } from "./CodeEditor";

export default function Main() {
  return (
    <Flex direction="column" width={"100%"} style={{ padding: "20px 0px" }}>
      <div style={{ padding: "0px 40px" }}>
        <Search />
        <Box height={"8px"} />
        <DropdownFilter />
      </div>
      <Separator my="5" size="4" />
      <SSRSafeSuspense fallback={null}>
        <div style={{ padding: "0px 40px" }}>
          <ReportedErrorList />
          <CodeEditorWithDialog />
        </div>
      </SSRSafeSuspense>
    </Flex>
  );
}
