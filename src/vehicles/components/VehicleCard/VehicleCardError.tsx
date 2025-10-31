"use client";

import { Callout, Card } from "@radix-ui/themes";
import { AlertCircle } from "lucide-react";

interface VehicleCardErrorProps {
  vehicleId: string;
}

export function VehicleCardError({ vehicleId }: VehicleCardErrorProps) {
  return (
    <Card size="2">
      <Callout.Root color="red" size="1">
        <Callout.Icon>
          <AlertCircle size={14} />
        </Callout.Icon>
        <Callout.Text>Failed to load vehicle #{vehicleId}</Callout.Text>
      </Callout.Root>
    </Card>
  );
}
