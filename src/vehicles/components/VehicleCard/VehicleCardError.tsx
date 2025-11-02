"use client";

import { AccessibleIcon, Callout, Card } from "@radix-ui/themes";
import { AlertCircle } from "lucide-react";

interface VehicleCardErrorProps {
  vehicleId: string;
}

export function VehicleCardError({ vehicleId }: VehicleCardErrorProps) {
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
        <Callout.Text>Failed to load vehicle #{vehicleId}</Callout.Text>
      </Callout.Root>
    </Card>
  );
}
