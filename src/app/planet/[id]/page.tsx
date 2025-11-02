import {
  AccessibleIcon,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import {
  ArrowLeft,
  Circle,
  CloudRain,
  EarthIcon,
  Gauge,
  Mountain,
  RotateCw,
  Users,
} from "lucide-react";

import { fetchPlanetById } from "@/planets/services";
import { ResidentsList } from "@/people/components";
import { PlanetDetailCard } from "@/planets/components";

interface PlanetPageProps {
  params: Promise<{ id: string }>;
}

export default async function PlanetPage({ params }: PlanetPageProps) {
  const { id } = await params;
  const planet = await fetchPlanetById(id);

  return (
    <Container size="3">
      <Box py="6">
        <Section size="2" aria-labelledby="planet-name">
          <Button variant="ghost" asChild mb="6">
            <Link href="/" aria-label="Return to planets list">
              <AccessibleIcon label="Back arrow">
                <ArrowLeft size={16} aria-hidden="true" />
              </AccessibleIcon>
              Go Back
            </Link>
          </Button>

          <Flex direction="column" gap="2" mb="6">
            <Flex align="center" gap="2">
              <AccessibleIcon label={`${planet.name} planet icon`}>
                <EarthIcon size={48} aria-hidden="true" />
              </AccessibleIcon>
              <Heading size="9" weight="bold" id="planet-name">
                {planet.name}
              </Heading>
            </Flex>
            <Text size="3" color="gray" id="planet-description">
              Basic details about the planet
            </Text>
          </Flex>

          <Grid
            columns={{ initial: "1", xs: "2", md: "3" }}
            gap="4"
            role="list"
            aria-labelledby="planet-name"
            aria-describedby="planet-description"
          >
            <PlanetDetailCard
              icon={RotateCw}
              title="Rotation Period"
              value={planet.rotation_period}
              unit="hours"
            />

            <PlanetDetailCard
              icon={Circle}
              title="Diameter"
              value={planet.diameter}
              unit="km"
            />

            <PlanetDetailCard
              icon={CloudRain}
              title="Climate"
              value=""
              badges={planet.climate.split(",").map((c) => c.trim())}
              badgeColor="blue"
            />

            <PlanetDetailCard
              icon={Gauge}
              title="Gravity"
              value={planet.gravity}
            />

            <PlanetDetailCard
              icon={Users}
              title="Population"
              value={planet.population}
            />

            <PlanetDetailCard
              icon={Mountain}
              title="Terrain"
              value=""
              badges={planet.terrain.split(",").map((t) => t.trim())}
              badgeColor="green"
            />
          </Grid>
        </Section>
        <ResidentsList residentUrls={planet.residents} />
      </Box>
    </Container>
  );
}
