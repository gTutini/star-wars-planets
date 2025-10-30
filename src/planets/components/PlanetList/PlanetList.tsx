import { Grid } from "@radix-ui/themes";

import { fetchFilms, fetchPlanets } from "@/planets/services";
import { PlanetCard } from "../PlanetCard";

interface PlanetListProps {
  search?: string;
}

export async function PlanetList({ search }: PlanetListProps) {
  const planets = await fetchPlanets(search);
  const films = await fetchFilms();

  return (
    <Grid
      columns={{ initial: "1", xs: "2", sm: "3", lg: "4" }}
      gapX="4"
      gapY="5"
      mt="6"
    >
      {planets.results.map((planet) => (
        <PlanetCard key={planet.name} planet={planet} films={films.results} />
      ))}
    </Grid>
  );
}
