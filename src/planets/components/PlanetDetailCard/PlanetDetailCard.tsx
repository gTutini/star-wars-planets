import type { BadgeProps, CardProps } from "@radix-ui/themes";
import { Badge, Card, Flex, Separator, Text } from "@radix-ui/themes";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface PlanetDetailCardProps {
  icon: LucideIcon;
  title: string;
  value: ReactNode;
  unit?: string;
  size?: CardProps["size"];
  badges?: string[];
  badgeColor?: BadgeProps["color"];
}

export function PlanetDetailCard({
  icon: Icon,
  title,
  value,
  unit,
  size = "3",
  badges,
  badgeColor = "blue",
}: PlanetDetailCardProps) {
  return (
    <Card size={size}>
      <Flex direction="column" gap="3">
        <Flex align="center" gap="2">
          <Icon size={20} />
          <Text weight="bold" size="3">
            {title}
          </Text>
        </Flex>
        <Separator size="4" />
        {badges && badges.length > 0 ? (
          <Flex gap="2" wrap="wrap">
            {badges.map((badge) => (
              <Badge key={badge} variant="soft" size="2" color={badgeColor}>
                {badge}
              </Badge>
            ))}
          </Flex>
        ) : unit ? (
          <Flex align="baseline" gap="2">
            <Text size="7" weight="bold">
              {value}
            </Text>
            <Text size="3" color="gray">
              {unit}
            </Text>
          </Flex>
        ) : (
          <Text size="7" weight="bold">
            {value}
          </Text>
        )}
      </Flex>
    </Card>
  );
}
