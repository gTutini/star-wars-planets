import { Badge, Flex, Text } from "@radix-ui/themes";
import { Car } from "lucide-react";

import { fetchVehicleById } from "@/vehicles/services";

interface VehicleCardProps {
  vehicleId: string;
}

export async function VehicleCard({ vehicleId }: VehicleCardProps) {
  const vehicle = await fetchVehicleById(vehicleId);

  return (
    <Flex gap="2" align="center" wrap="wrap">
      <Badge variant="soft" color="orange" size="2">
        <Car size={12} />
        {vehicle.name}
      </Badge>
      <Text size="1" color="gray">
        {vehicle.model}
      </Text>
    </Flex>
  );
}
