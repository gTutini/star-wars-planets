import { Suspense } from "react";
import { Flex, Heading, Section } from "@radix-ui/themes";

import { SvgOrderSymbol } from "@/icons";
import {
  PlanetList,
  PlanetListSkeleton,
  SearchInput,
} from "@/planets/components";

import styles from "./page.module.scss";

interface HomeProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { search } = await searchParams;

  return (
    <Section size="1">
      <Flex direction="column" align="center" className={styles.content}>
        <SvgOrderSymbol fill="#ff949d" />
        <Heading align="center" size="8">
          The Jedi Archives: Planets
        </Heading>
      </Flex>
      <Flex direction="column" mt="6">
        <SearchInput defaultValue={search} />
      </Flex>
      <Suspense key={search} fallback={<PlanetListSkeleton />}>
        <PlanetList search={search} />
      </Suspense>
    </Section>
  );
}
