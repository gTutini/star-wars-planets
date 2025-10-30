import { Flex, Grid } from "@radix-ui/themes";

import { fetchFilms, fetchPlanets } from "@/planets/services";
import { PlanetCard, Pagination } from "@/planets/components";

export interface PlanetListProps {
  search?: string;
  page?: string;
}

export async function PlanetList({ search, page }: PlanetListProps) {
  const planets = await fetchPlanets(search, page);
  const films = await fetchFilms();

  const currentPage = parseInt(page || "1", 10);
  const hasNext = planets.next !== null;
  const hasPrevious = planets.previous !== null;

  return (
    <Flex mt="6" direction="column" gap="4">
      <Grid
        columns={{ initial: "1", xs: "2", sm: "3", lg: "4" }}
        gapX="4"
        gapY="5"
      >
        {planets.results.map((planet) => (
          <PlanetCard key={planet.name} planet={planet} films={films.results} />
        ))}
      </Grid>

      <Pagination
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        currentPage={currentPage}
      />
    </Flex>
  );
}
