import { Suspense } from "react";
import { Flex, Section } from "@radix-ui/themes";

import {
  PlanetList,
  PlanetListSkeleton,
  SearchInput,
} from "@/planets/components";

interface HomeProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { search, page } = await searchParams;

  return (
    <Section size="1">
      <Flex direction="column" mt="6">
        <SearchInput defaultValue={search} />
      </Flex>
      <Suspense key={`${search}-${page}`} fallback={<PlanetListSkeleton />}>
        <PlanetList search={search} page={page} />
      </Suspense>
    </Section>
  );
}
