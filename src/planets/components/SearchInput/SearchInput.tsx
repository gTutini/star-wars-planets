"use client";

import { Flex, TextField } from "@radix-ui/themes";
import { Search } from "lucide-react";

import { useSearchInput } from "./useSearchInput";

export interface SearchInputProps {
  defaultValue?: string;
}

export function SearchInput({ defaultValue }: SearchInputProps) {
  const { searchValue, handleChange } = useSearchInput({ defaultValue });

  return (
    <Flex justify="center" align="center">
      <TextField.Root
        placeholder="Search planets..."
        size="3"
        value={searchValue}
        onChange={handleChange}
        style={{ maxWidth: "300px", width: "100%" }}
      >
        <TextField.Slot side="left">
          <Search size={16} />
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  );
}
