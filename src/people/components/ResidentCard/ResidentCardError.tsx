"use client";

import { AccessibleIcon, Callout, Card } from "@radix-ui/themes";
import { AlertCircle } from "lucide-react";

interface ResidentCardErrorProps {
  residentId: string;
}

export function ResidentCardError({ residentId }: ResidentCardErrorProps) {
  return (
    <Card size="2">
      <Callout.Root
        color="red"
        size="1"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <Callout.Icon>
          <AccessibleIcon label="Error">
            <AlertCircle size={14} aria-hidden="true" />
          </AccessibleIcon>
        </Callout.Icon>
        <Callout.Text>Failed to load resident #{residentId}</Callout.Text>
      </Callout.Root>
    </Card>
  );
}
