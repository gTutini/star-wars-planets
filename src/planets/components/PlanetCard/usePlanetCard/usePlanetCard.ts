import { Circle, CloudRain, Mountain, Users } from "lucide-react";
import { PlanetCardProps } from "../PlanetCard";

export type UsePlanetCardProps = Pick<PlanetCardProps, "planet" | "films">;

export function usePlanetCard({ planet, films }: UsePlanetCardProps) {
  const filmTitles = films
    .filter((film) => film.planets.includes(planet.url))
    .map((film) => film.title);

  const planetData = [
    {
      label: "Climate",
      value: planet.climate,
      icon: CloudRain,
    },
    {
      label: "Terrain",
      value: planet.terrain,
      icon: Mountain,
    },
    {
      label: "Population",
      value: planet.population,
      icon: Users,
    },
    {
      label: "Diameter",
      value: `${planet.diameter}km`,
      icon: Circle,
    },
  ];

  return { filmTitles, planetData };
}
