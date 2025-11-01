import { Flex, Skeleton, Text } from "@radix-ui/themes";
import { Suspense } from "react";
import { Car } from "lucide-react";

import { VehicleCard, VehicleCardError } from "@/vehicles/components";
import { useVehiclesList } from "./useVehiclesList";
import { ErrorBoundary } from "react-error-boundary";

interface VehiclesListProps {
  vehicleUrls: string[];
}

export function VehiclesList({ vehicleUrls }: VehiclesListProps) {
  const { vehicleIds, hasVehicles } = useVehiclesList({ vehicleUrls });

  if (!hasVehicles) {
    return (
      <Flex gap="2" align="center" mt="2" role="status" aria-live="polite">
        <Car size={14} aria-hidden="true" />
        <Text size="2" color="gray">
          No vehicles
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      gap="2"
      mt="2"
      role="region"
      aria-label="Vehicles list"
    >
      <Flex gap="2" align="center">
        <Car size={14} aria-hidden="true" />
        <Text size="2" weight="bold">
          Vehicles:
        </Text>
      </Flex>
      <Flex
        direction="column"
        gap="1"
        role="list"
        aria-label={`${vehicleIds.length} vehicle(s) found`}
      >
        {vehicleIds.map((id) => (
          <div key={id} role="listitem">
            <ErrorBoundary fallback={<VehicleCardError vehicleId={id} />}>
              <Suspense fallback={<Skeleton height="24px" width="150px" />}>
                <VehicleCard vehicleId={id} />
              </Suspense>
            </ErrorBoundary>
          </div>
        ))}
      </Flex>
    </Flex>
  );
}
