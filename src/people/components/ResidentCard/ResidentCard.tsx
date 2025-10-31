import { Avatar, Badge, Card, Flex, Text } from "@radix-ui/themes";
import { Eye, Palette, User } from "lucide-react";

import { fetchPeopleById } from "@/people/services";

interface ResidentCardProps {
  residentId: string;
}

export async function ResidentCard({ residentId }: ResidentCardProps) {
  const resident = await fetchPeopleById(residentId);

  return (
    <Card size="2">
      <Flex gap="3" align="center">
        <Avatar
          size="5"
          radius="full"
          fallback={resident.name.charAt(0)}
          color="indigo"
        />
        <Flex direction="column" gap="2" flexGrow="1">
          <Text size="3" weight="bold">
            {resident.name}
          </Text>
          <Flex gap="2" wrap="wrap">
            <Badge variant="soft" color="blue" size="1">
              <Palette size={12} />
              {resident.hair_color}
            </Badge>
            <Badge variant="soft" color="green" size="1">
              <Eye size={12} />
              {resident.eye_color}
            </Badge>
            <Badge variant="soft" color="purple" size="1">
              <User size={12} />
              {resident.gender}
            </Badge>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
