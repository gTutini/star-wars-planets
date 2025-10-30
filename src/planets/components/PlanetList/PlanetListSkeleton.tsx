import { Grid, Skeleton } from "@radix-ui/themes";

export function PlanetListSkeleton() {
  return (
    <Grid
      columns={{ initial: "1", xs: "2", sm: "3", lg: "4" }}
      gapX="4"
      gapY="5"
      mt="6"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Skeleton height="400px" key={item} />
      ))}
    </Grid>
  );
}
