"use client";

import { Box, TextField } from "@radix-ui/themes";
import { Search } from "lucide-react";

import { useSearchInput } from "./useSearchInput";

export interface SearchInputProps {
  defaultValue?: string;
}

export function SearchInput({ defaultValue }: SearchInputProps) {
  const { searchValue, handleChange } = useSearchInput({ defaultValue });

  return (
    <Box maxWidth="300px" asChild>
      <TextField.Root
        placeholder="Search planets..."
        size="3"
        value={searchValue}
        onChange={handleChange}
      >
        <TextField.Slot side="left">
          <Search size={16} />
        </TextField.Slot>
      </TextField.Root>
    </Box>
  );
}
