import type { BadgeProps, CardProps } from "@radix-ui/themes";
import {
  AccessibleIcon,
  Badge,
  Card,
  Flex,
  Separator,
  Text,
} from "@radix-ui/themes";
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
    <Card size={size} role="article" aria-label={`${title} information`}>
      <Flex direction="column" gap="3">
        <Flex align="center" gap="2">
          <AccessibleIcon label={Icon.displayName}>
            <Icon size={20} />
          </AccessibleIcon>
          <Text
            weight="bold"
            size="3"
            id={`title-${title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {title}
          </Text>
        </Flex>
        <Separator size="4" aria-hidden="true" />
        {badges && badges.length > 0 ? (
          <Flex gap="2" wrap="wrap" role="list" aria-label={`${title} badges`}>
            {badges.map((badge) => (
              <Badge
                key={badge}
                variant="soft"
                size="2"
                color={badgeColor}
                role="listitem"
              >
                {badge}
              </Badge>
            ))}
          </Flex>
        ) : unit ? (
          <Flex align="baseline" gap="2">
            <Text size="7" weight="bold" aria-label={`${value} ${unit}`}>
              {value}
            </Text>
            <Text size="3" color="gray" aria-hidden="true">
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
