import { Grid, Skeleton } from "@radix-ui/themes";

export function PlanetListSkeleton() {
  return (
    <Grid
      columns={{ initial: "1", xs: "2", sm: "3", lg: "4" }}
      gapX="4"
      gapY="5"
      mt="6"
    >
      {Array.from({ length: 8 }, (_, index) => (
        <Skeleton height="400px" key={index} />
      ))}
    </Grid>
  );
}
