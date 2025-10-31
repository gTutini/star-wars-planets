import { Badge, Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import Link from "next/link";

import { FilmIcon, EarthIcon } from "lucide-react";

import { usePlanetCard } from "./usePlanetCard";

import { Planet } from "@/planets/contracts";
import { Film } from "@/films/contracts";
import { DataList } from "@/ui/components";

import styles from "./PlanetCard.module.scss";
export interface PlanetCardProps {
  planet: Planet;
  films: Film[];
}

export function PlanetCard({ planet, films }: PlanetCardProps) {
  const { filmTitles, planetData, planetId } = usePlanetCard({ planet, films });

  return (
    <Card className={styles.card} title={planet.name} asChild>
      <Link
        href={`/planet/${planetId}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Flex align="center" gap="2">
          <EarthIcon size={32} />
          <Heading as="h3" size="8">
            {planet.name}
          </Heading>
        </Flex>
        <Separator my="3" size="4" />

        <DataList items={planetData} size="2" />

        {filmTitles.length > 0 && (
          <>
            <Flex mt="4" gap="2" align="center">
              <FilmIcon size={16} />
              <Text weight="bold">Featured In:</Text>
            </Flex>
            <Flex mt="2" gap="2" wrap="wrap">
              {filmTitles.map((title) => (
                <Badge variant="soft" radius="full" key={title}>
                  {title}
                </Badge>
              ))}
            </Flex>
          </>
        )}
      </Link>
    </Card>
  );
}
