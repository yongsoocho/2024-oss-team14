import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, Flex, TextField } from "@radix-ui/themes";
import React, { useRef } from "react";

export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchKeyword = ({ keyword }: { keyword: string }) => {
    // filter
  };
  return (
    <Flex gap={"16px"}>
      <TextField.Root
        placeholder="Search for errors and solutions"
        ref={inputRef}
        style={{ minWidth: "320px" }}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      <Button
        onClick={() => {
          if (inputRef.current == null) {
            return;
          }
          searchKeyword({ keyword: inputRef.current.value });
        }}
        style={{ width: "64px" }}
      >
        Search
      </Button>
    </Flex>
  );
}
