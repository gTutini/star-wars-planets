import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Separator,
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

interface PlanetPageProps {
  params: Promise<{ id: string }>;
}

export default async function PlanetPage({ params }: PlanetPageProps) {
  const { id } = await params;
  const planet = await fetchPlanetById(id);

  return (
    <Container size="3">
      <Box py="6">
        <Section size="2">
          <Button variant="ghost" asChild mb="6">
            <Link href="/">
              <ArrowLeft size={16} />
              Go Back
            </Link>
          </Button>

          <Flex direction="column" gap="2" mb="6">
            <Flex align="center" gap="2">
              <EarthIcon size={48} />
              <Heading size="9" weight="bold">
                {planet.name}
              </Heading>
            </Flex>
            <Text size="3" color="gray">
              Basic details about the planet
            </Text>
          </Flex>

          <Grid columns={{ initial: "1", sm: "2" }} gap="4">
            <Card size="3">
              <Flex direction="column" gap="3">
                <Flex align="center" gap="2">
                  <RotateCw size={20} />
                  <Text weight="bold" size="3">
                    Rotation Period
                  </Text>
                </Flex>
                <Separator size="4" />
                <Flex align="baseline" gap="2">
                  <Text size="7" weight="bold">
                    {planet.rotation_period}
                  </Text>
                  <Text size="3" color="gray">
                    hours
                  </Text>
                </Flex>
              </Flex>
            </Card>

            <Card size="3">
              <Flex direction="column" gap="3">
                <Flex align="center" gap="2">
                  <Circle size={20} />
                  <Text weight="bold" size="3">
                    Diameter
                  </Text>
                </Flex>
                <Separator size="4" />
                <Flex align="baseline" gap="2">
                  <Text size="7" weight="bold">
                    {planet.diameter}
                  </Text>
                  <Text size="3" color="gray">
                    km
                  </Text>
                </Flex>
              </Flex>
            </Card>

            <Card size="3">
              <Flex direction="column" gap="3">
                <Flex align="center" gap="2">
                  <CloudRain size={20} />
                  <Text weight="bold" size="3">
                    Climate
                  </Text>
                </Flex>
                <Separator size="4" />
                <Flex gap="2" wrap="wrap">
                  {planet.climate.split(",").map((climate) => (
                    <Badge
                      key={climate.trim()}
                      variant="soft"
                      size="2"
                      color="blue"
                    >
                      {climate.trim()}
                    </Badge>
                  ))}
                </Flex>
              </Flex>
            </Card>

            <Card size="3">
              <Flex direction="column" gap="3">
                <Flex align="center" gap="2">
                  <Gauge size={20} />
                  <Text weight="bold" size="3">
                    Gravity
                  </Text>
                </Flex>
                <Separator size="4" />
                <Text size="6" weight="bold">
                  {planet.gravity}
                </Text>
              </Flex>
            </Card>

            <Card size="3">
              <Flex direction="column" gap="3">
                <Flex align="center" gap="2">
                  <Users size={20} />
                  <Text weight="bold" size="3">
                    Population
                  </Text>
                </Flex>
                <Separator size="4" />
                <Text size="7" weight="bold">
                  {planet.population === "unknown"
                    ? "Unknown"
                    : Number(planet.population).toLocaleString("pt-BR")}
                </Text>
              </Flex>
            </Card>

            <Card size="3">
              <Flex direction="column" gap="3">
                <Flex align="center" gap="2">
                  <Mountain size={20} />
                  <Text weight="bold" size="3">
                    Terrain
                  </Text>
                </Flex>
                <Separator size="4" />
                <Flex gap="2" wrap="wrap">
                  {planet.terrain.split(",").map((terrain) => (
                    <Badge
                      key={terrain.trim()}
                      variant="soft"
                      size="2"
                      color="green"
                    >
                      {terrain.trim()}
                    </Badge>
                  ))}
                </Flex>
              </Flex>
            </Card>
          </Grid>
        </Section>
        <ResidentsList residentUrls={planet.residents} />
      </Box>
    </Container>
  );
}
