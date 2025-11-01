import { usePathname, useSearchParams } from "next/navigation";

interface UsePaginationProps {
  hasNext: boolean;
  hasPrevious: boolean;
  currentPage: number;
}

export function usePagination({
  hasNext,
  hasPrevious,
  currentPage,
}: UsePaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const previousPageURL = hasPrevious
    ? createPageURL(currentPage - 1)
    : undefined;
  const nextPageURL = hasNext ? createPageURL(currentPage + 1) : undefined;

  return {
    previousPageURL,
    nextPageURL,
  };
}
