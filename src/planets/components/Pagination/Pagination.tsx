"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button, Flex, Text } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Flex justify="center" align="center" gap="4" mt="6">
      <Button variant="soft" disabled={!hasPrevious} asChild={hasPrevious}>
        {hasPrevious ? (
          <Link href={createPageURL(currentPage - 1)}>
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
        {hasNext ? (
          <Link href={createPageURL(currentPage + 1)}>
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
