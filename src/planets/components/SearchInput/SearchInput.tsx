"use client";

import { Button, Grid, TextField } from "@radix-ui/themes";
import { Search } from "lucide-react";
import Form from "next/form";

export interface SearchInputProps {
  defaultValue?: string;
}

export function SearchInput({ defaultValue }: SearchInputProps) {
  return (
    <Form action="/">
      <Grid mx="auto" gap="4" align="center" maxWidth="300px">
        <TextField.Root
          name="search"
          placeholder="Search planets from this galaxy..."
          size="3"
          defaultValue={defaultValue}
        >
          <TextField.Slot side="left">
            <Search size={16} />
          </TextField.Slot>
        </TextField.Root>
        <Button type="submit">Search</Button>
      </Grid>
    </Form>
  );
}
