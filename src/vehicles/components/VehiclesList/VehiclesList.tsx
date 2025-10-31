import { Flex, Skeleton, Text } from "@radix-ui/themes";
import { Suspense } from "react";
import { Car } from "lucide-react";

import { VehicleCard, VehicleCardError } from "@/vehicles/components";
import { ErrorBoundary } from "@/ui/components";
import { useVehiclesList } from "./useVehiclesList";

interface VehiclesListProps {
  vehicleUrls: string[];
}

export function VehiclesList({ vehicleUrls }: VehiclesListProps) {
  const { vehicleIds, hasVehicles } = useVehiclesList({ vehicleUrls });

  if (!hasVehicles) {
    return (
      <Flex gap="2" align="center" mt="2">
        <Car size={14} />
        <Text size="2" color="gray">
          No vehicles
        </Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="2" mt="2">
      <Flex gap="2" align="center">
        <Car size={14} />
        <Text size="2" weight="bold">
          Vehicles:
        </Text>
      </Flex>
      <Flex direction="column" gap="1">
        {vehicleIds.map((id) => (
          <ErrorBoundary
            key={id}
            fallback={<VehicleCardError vehicleId={id} />}
          >
            <Suspense fallback={<Skeleton height="24px" width="150px" />}>
              <VehicleCard vehicleId={id} />
            </Suspense>
          </ErrorBoundary>
        ))}
      </Flex>
    </Flex>
  );
}
