import { Flex, Grid, Heading, Section } from "@radix-ui/themes";

import { SvgOrderSymbol } from "@/icons";
import { fetchFilms, fetchPlanets } from "@/planets/services";
import { PlanetCard } from "@/planets/components";

import styles from "./page.module.scss";

export default async function Home() {
  const planets = await fetchPlanets();
  const films = await fetchFilms();

  return (
    <Section size="1">
      <Flex direction="column" align="center" className={styles.content}>
        <SvgOrderSymbol fill="#ff949d" />
        <Heading align="center" size="8">
          The Jedi Archives: Planets
        </Heading>
      </Flex>
      <Grid
        mt="9"
        columns="repeat(auto-fit, minmax(250px, 1fr))"
        gapX="4"
        gapY="5"
      >
        {planets.results.map((planet) => (
          <PlanetCard key={planet.name} planet={planet} films={films.results} />
        ))}
      </Grid>
    </Section>
  );
}
