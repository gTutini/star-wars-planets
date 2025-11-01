import {
  AccessibleIcon,
  Avatar,
  Badge,
  Card,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import { Eye, Palette, User } from "lucide-react";
import { Suspense } from "react";

import { fetchPeopleById } from "@/people/services";
import { VehiclesList } from "@/vehicles/components";

interface ResidentCardProps {
  residentId: string;
}

export async function ResidentCard({ residentId }: ResidentCardProps) {
  const resident = await fetchPeopleById(residentId);

  return (
    <Card size="2" asChild>
      <article aria-labelledby={`resident-${residentId}-name`}>
        <Flex direction="column" gap="3">
          <Flex gap="3" align="center">
            <Avatar
              size="5"
              radius="full"
              fallback={resident.name.charAt(0)}
              color="indigo"
              aria-label={`${resident.name} avatar`}
            />
            <Flex direction="column" gap="2" flexGrow="1">
              <Heading
                as="h3"
                size="3"
                weight="bold"
                id={`resident-${residentId}-name`}
              >
                {resident.name}
              </Heading>
              <Flex
                gap="2"
                wrap="wrap"
                role="list"
                aria-label="Characteristics"
              >
                <Badge variant="soft" color="blue" size="1" role="listitem">
                  <AccessibleIcon label="Hair color">
                    <Palette size={12} />
                  </AccessibleIcon>
                  {resident.hair_color}
                </Badge>
                <Badge variant="soft" color="green" size="1" role="listitem">
                  <AccessibleIcon label="Eye color">
                    <Eye size={12} />
                  </AccessibleIcon>
                  {resident.eye_color}
                </Badge>
                <Badge variant="soft" color="purple" size="1" role="listitem">
                  <AccessibleIcon label="Gender">
                    <User size={12} />
                  </AccessibleIcon>
                  {resident.gender}
                </Badge>
              </Flex>
            </Flex>
          </Flex>

          <Separator size="4" decorative />

          <Suspense
            fallback={
              <Text size="2" color="gray" role="status" aria-live="polite">
                Loading vehicles...
              </Text>
            }
          >
            <VehiclesList vehicleUrls={resident.vehicles} />
          </Suspense>
        </Flex>
      </article>
    </Card>
  );
}
