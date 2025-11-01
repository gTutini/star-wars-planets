import {
  AccessibleIcon,
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";

import { FilmIcon, EarthIcon } from "lucide-react";

import { usePlanetCard } from "./usePlanetCard";

import { Planet } from "@/planets/contracts";
import { Film } from "@/films/contracts";
import { DataList } from "@/ui/components";

export interface PlanetCardProps {
  planet: Planet;
  films: Film[];
}

export function PlanetCard({ planet, films }: PlanetCardProps) {
  const { filmTitles, planetData, planetId } = usePlanetCard({ planet, films });

  return (
    <Box asChild maxWidth="400px">
      <Card role="listitem" title={planet.name} asChild>
        <article aria-label={`${planet.name} planet information`}>
          <Link href={`/planet/${planetId}`}>
            <Flex align="center" gap="2">
              <AccessibleIcon label={`${planet.name} planet icon`}>
                <EarthIcon size={32} />
              </AccessibleIcon>
              <Heading as="h3" size="8">
                {planet.name}
              </Heading>
            </Flex>
            <Separator my="3" size="4" aria-hidden="true" />

            <DataList items={planetData} size="2" />

            {filmTitles.length > 0 && (
              <>
                <Flex mt="4" gap="2" align="center">
                  <AccessibleIcon label="Films">
                    <FilmIcon size={16} />
                  </AccessibleIcon>
                  <Text weight="bold">Featured In:</Text>
                </Flex>
                <Flex
                  mt="2"
                  gap="2"
                  wrap="wrap"
                  role="list"
                  aria-label={`Films featuring ${planet.name}`}
                >
                  {filmTitles.map((title) => (
                    <Badge
                      variant="soft"
                      radius="full"
                      key={title}
                      role="listitem"
                    >
                      {title}
                    </Badge>
                  ))}
                </Flex>
              </>
            )}
          </Link>
        </article>
      </Card>
    </Box>
  );
}
