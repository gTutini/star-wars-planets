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
    <Flex
      justify="center"
      align="center"
      gap="4"
      mt="6"
      role="navigation"
      aria-label="Pagination"
    >
      <Button variant="soft" disabled={!hasPrevious} asChild={hasPrevious}>
        {hasPrevious && previousPageURL ? (
          <Link
            href={previousPageURL}
            aria-label={`Go to page ${currentPage - 1}`}
          >
            <ChevronLeft size={16} />
            Prev
          </Link>
        ) : (
          <>
            <ChevronLeft size={16} />
            Prev
          </>
        )}
      </Button>

      <Text
        size="2"
        weight="medium"
        aria-current="page"
        aria-label={`Current page, page ${currentPage}`}
      >
        Page {currentPage}
      </Text>

      <Button variant="soft" disabled={!hasNext} asChild={hasNext}>
        {hasNext && nextPageURL ? (
          <Link href={nextPageURL} aria-label={`Go to page ${currentPage + 1}`}>
            Next
            <ChevronRight size={16} />
          </Link>
        ) : (
          <>
            Next
            <ChevronRight size={16} />
          </>
        )}
      </Button>
    </Flex>
  );
}
