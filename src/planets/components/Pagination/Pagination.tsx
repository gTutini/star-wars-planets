"use client";

import Link from "next/link";
import { Button, Flex, Text } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePagination } from "./usePagination";

export interface PaginationProps {
  hasNext: boolean;
  hasPrevious: boolean;
  currentPage: number;
}

export function Pagination({
  hasNext,
  hasPrevious,
  currentPage,
}: PaginationProps) {
  const { previousPageURL, nextPageURL } = usePagination({
    hasNext,
    hasPrevious,
    currentPage,
  });

  return (
    <Flex justify="center" align="center" gap="4" mt="6">
      <Button variant="soft" disabled={!hasPrevious} asChild={hasPrevious}>
        {hasPrevious && previousPageURL ? (
          <Link href={previousPageURL}>
            <ChevronLeft size={16} />
            Anterior
          </Link>
        ) : (
          <>
            <ChevronLeft size={16} />
            Anterior
          </>
        )}
      </Button>

      <Text size="2" weight="medium">
        Página {currentPage}
      </Text>

      <Button variant="soft" disabled={!hasNext} asChild={hasNext}>
        {hasNext && nextPageURL ? (
          <Link href={nextPageURL}>
            Próxima
            <ChevronRight size={16} />
          </Link>
        ) : (
          <>
            Próxima
            <ChevronRight size={16} />
          </>
        )}
      </Button>
    </Flex>
  );
}
