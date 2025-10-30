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
      <Grid
        columns={{ initial: "1fr", xs: "1fr 150px" }}
        gap="4"
        align="center"
      >
        <TextField.Root
          name="search"
          placeholder="Buscar planetas..."
          size="3"
          defaultValue={defaultValue}
        >
          <TextField.Slot side="left">
            <Search size={16} />
          </TextField.Slot>
        </TextField.Root>
        <Button size="3" type="submit">
          Buscar
        </Button>
      </Grid>
    </Form>
  );
}
