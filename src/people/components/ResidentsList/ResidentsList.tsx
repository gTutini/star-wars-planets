import { Grid, Heading, Separator, Skeleton } from "@radix-ui/themes";
import { Suspense } from "react";

import { ResidentCard } from "@/people/components";

interface ResidentsListProps {
  residentUrls: string[];
}

export function ResidentsList({ residentUrls }: ResidentsListProps) {
  const residentIds = residentUrls.map((url) =>
    url.split("/").filter(Boolean).pop()
  );

  if (residentIds.length === 0) {
    return null;
  }

  return (
    <>
      <Separator size="4" my="6" />
      <Heading size="6" mb="4">
        Residents
      </Heading>
      <Grid columns={{ initial: "1", sm: "2" }} gap="3">
        {residentIds.map((id) => (
          <Suspense key={id} fallback={<Skeleton height="96px" />}>
            <ResidentCard residentId={id!} key={id} />
          </Suspense>
        ))}
      </Grid>
    </>
  );
}
