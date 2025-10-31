"use client";

import { Callout, Card } from "@radix-ui/themes";
import { AlertCircle } from "lucide-react";

interface ResidentCardErrorProps {
  residentId: string;
}

export function ResidentCardError({ residentId }: ResidentCardErrorProps) {
  return (
    <Card size="2">
      <Callout.Root color="red" size="1">
        <Callout.Icon>
          <AlertCircle size={14} />
        </Callout.Icon>
        <Callout.Text>Failed to load resident #{residentId}</Callout.Text>
      </Callout.Root>
    </Card>
  );
}
