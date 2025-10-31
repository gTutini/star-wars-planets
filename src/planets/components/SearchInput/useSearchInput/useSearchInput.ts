import { useState, useEffect, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface UseSearchInputProps {
  defaultValue?: string;
}

export function useSearchInput({ defaultValue }: UseSearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(defaultValue || "");

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    // Remove page param para resetar para a primeira página ao buscar
    params.delete("page");

    const queryString = params.toString();
    router.push(queryString ? `/?${queryString}` : "/");
  }, 500);

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return {
    searchValue,
    handleChange,
  };
}
