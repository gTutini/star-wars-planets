"use client";

import { AccessibleIcon, Box, TextField } from "@radix-ui/themes";
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
        name="search"
        aria-label="Search for planets by name"
        role="searchbox"
      >
        <TextField.Slot side="left">
          <AccessibleIcon label="Search icon">
            <Search size={16} />
          </AccessibleIcon>
        </TextField.Slot>
      </TextField.Root>
    </Box>
  );
}
