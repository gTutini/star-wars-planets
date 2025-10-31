import { Grid, Heading, Section, Skeleton } from "@radix-ui/themes";
import { Suspense } from "react";

import { ResidentCard, ResidentCardError } from "@/people/components";
import { ErrorBoundary } from "@/ui/components";
import { useResidentsList } from "./useResidentsList";

interface ResidentsListProps {
  residentUrls: string[];
}

export function ResidentsList({ residentUrls }: ResidentsListProps) {
  const { residentIds, hasResidents } = useResidentsList({ residentUrls });

  if (!hasResidents) {
    return null;
  }

  return (
    <Section size="2">
      <Heading size="6" mb="4">
        Residents
      </Heading>
      <Grid columns={{ initial: "1", xs: "2", md: "3" }} gap="3">
        {residentIds.map((id) => (
          <ErrorBoundary
            key={id}
            fallback={<ResidentCardError residentId={id} />}
          >
            <Suspense fallback={<Skeleton height="150px" />}>
              <ResidentCard residentId={id} />
            </Suspense>
          </ErrorBoundary>
        ))}
      </Grid>
    </Section>
  );
}
